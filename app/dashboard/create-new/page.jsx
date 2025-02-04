"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import LoadingModal from "./_components/LoadingModal";
import { useUser } from "@clerk/nextjs";
import { VideoInfoContext } from "@/app/_context/VideoInfoContext";
import { Users, videoData } from "@/configs/schema";
import { db } from "@/configs/db";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const CreateNew = () => {
  const [formData, setFormData] = useState({
    topic: "",
    imageStyle: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(3);
  const { videoInfo, setVideoInfo } = useContext(VideoInfoContext);
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    if (userDetail?.credits <= 0) {
      toast("Unfortunately you can only create one video per user");
      return;
    }
    GetVideoScript();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoScript && audioFileUrl && captions && imageList) {
        SaveVideoData();
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [videoScript, audioFileUrl, captions, imageList]);

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Generate a script for a ${formData.duration} video on the topic: ${formData.topic}. Along with AI image prompts in ${formData.imageStyle} format for each scene and give me the result in JSON format with the fields imagePrompt and contentText.`;
    try {
      const resp = await axios.post("/api/get-video-script", { prompt });
      setVideoScript(resp.data.result);
      GenerateAudioFile(resp.data.result);
    } catch (error) {
      console.error("Error fetching video script:", error);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    const script = videoScriptData?.scenes
      ?.map((scene) => scene.contentText)
      .join(" ");
    const id = uuidv4();
    try {
      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id,
      });
      setAudioFileUrl(resp.data.result);
      if (resp.data.result) {
        await GenerateAudioCaption(resp.data.result, videoScriptData.scenes);
      }
    } catch (error) {
      console.error("Error generating audio file:", error);
    }
  };

  const GenerateAudioCaption = async (fileUrl, scenes) => {
    try {
      const resp = await axios.post("/api/generate-captions", {
        audioFileUrl: fileUrl,
      });
      setCaptions(resp?.data?.result);
      if (resp.data.result) {
        GenerateImage(scenes);
      }
    } catch (error) {
      console.error("Error generating captions:", error);
    }
  };

  const GenerateImage = async (videoScriptData) => {
    const images = [];
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post("/api/generate-images", {
          prompt: element?.imagePrompt,
        });
        if (resp.data.image) {
          images.push(resp.data.image);
        }
      } catch (error) {
        console.error(
          "Error generating image for prompt:",
          element?.imagePrompt,
          error
        );
      }
    }
    setImageList(images);
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const SaveVideoData = async () => {
    try {
      const transformedData = {
        script: videoScript,
        audioFileUrl,
        captions,
        imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      };
      const result = await db
        .insert(videoData)
        .values(transformedData)
        .returning({ id: videoData?.id });
      updateUserCredits();
      setVideoId(result[0].id);
      setPlayVideo(true);
      setLoading(false);
    } catch (error) {
      console.error("Error saving video data:", error);
      setLoading(false);
    }
  };

  const isButtonDisabled =
    !formData.topic || !formData.imageStyle || !formData.duration;

  const handleClosePlayerDialog = () => {
    setPlayVideo(false);
  };

  const updateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits - 10,
      })
      .where(eq(Users?.email, user?.primaryEmailAddress.emailAddress));
    console.log(result);
    setUserDetail((prev) => ({
      ...prev,
      credits: userDetail?.credits - 10,
    }));
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <div
          className="relative group"
          style={{
            cursor: isButtonDisabled ? "not-allowed" : "default",
            marginTop: "20px",
          }}
        >
          <Button
            className="mt-10 w-full"
            onClick={onCreateClickHandler}
            disabled={isButtonDisabled}
            style={{
              backgroundColor: "#ff2625",
              opacity: isButtonDisabled ? 0.5 : 1,
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
              color: "white",
            }}
          >
            Create Short Video
          </Button>
          {isButtonDisabled && (
            <span
              className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ cursor: "not-allowed" }}
            >
              You must select all 3 fields to generate a video
            </span>
          )}
        </div>
      </div>
      <LoadingModal loading={loading} />
      {playVideo && (
        <PlayerDialog
          playVideo={playVideo}
          videoId={videoId}
          onClose={handleClosePlayerDialog}
        />
      )}
    </div>
  );
};

export default CreateNew;
