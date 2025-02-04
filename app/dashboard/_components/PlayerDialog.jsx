import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { videoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (videoId) {
      GetVideoData();
      setOpenDialog(true); // Open dialog only if videoId exists
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(videoData)
      .where(eq(videoData.id, videoId));
    setVideoDetails(result[0]); // Assuming you want the first item in the result array
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0, // Remove default padding if needed
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <DialogDescription
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {videoDetails ? (
              <Player
                component={RemotionVideo}
                durationInFrames={Number(
                  (durationInFrame + 30 + 0.1).toFixed(0)
                )}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  script: videoDetails.script,
                  imageList: videoDetails.imageList,
                  audioFileUrl: videoDetails.audioFileUrl,
                  captions: videoDetails.captions,
                  setDurationInFrame: (frameValue) =>
                    setDurationInFrame(frameValue),
                }}
              />
            ) : (
              <div>Loading video...</div>
            )}
            <div className="flex justify-center gap-10 mt-10 mb-5">
              <Button
                className="bg-red-500 text-white hover:bg-gray-400"
                onClick={() => {
                  router.replace("/dashboard");
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
