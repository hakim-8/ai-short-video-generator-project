"use client";

import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionVideo = ({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  if (!Array.isArray(imageList)) {
    console.error("imageList is not an array or is undefined:", imageList);
    return null; // Prevent rendering if imageList is invalid
  }

  const getDurationFrames = () => {
    setDurationInFrame((captions?.[captions.length - 1]?.end / 1000) * fps);
    return (captions?.[captions.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; //convert frame to ms (30fps)
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption?.text : "";
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        display: "flex", // Enable flexbox to center
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      {imageList.map((item, index) => {
        const startTime = (index * getDurationFrames()) / imageList?.length;
        const duration = getDurationFrames();

        const scale = (index) =>
          interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration], //zoom in and out logic
            index % 2 == 0 ? [1, 1.4, 1] : [1.4, 1, 1.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
        return (
          <Sequence
            key={index}
            from={startTime}
            durationInFrames={getDurationFrames()}
          >
            <AbsoluteFill
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Img
                src={item}
                style={{
                  width: "100%", // Let the image take up full width
                  height: "100%", // Let the image take up full height
                  objectFit: "cover", // Ensure the image covers the container
                  objectPosition: "center", // Center the image if it overflows
                  transform: `scale(${scale(index)})`,
                }}
              />
              <AbsoluteFill
                style={{
                  color: "white",
                  justifyContent: "center",
                  top: undefined,
                  bottom: 50,
                  height: 150,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
