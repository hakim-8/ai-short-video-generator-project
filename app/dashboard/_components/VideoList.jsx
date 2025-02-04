// /components/VideoList.jsx
import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

const VideoList = ({ videoList }) => {
  const [openPlayer, setOpenPlayer] = useState(false);
  const [videoId, setVideoId] = useState();
  const [videoDetails, setVideoDetails] = useState(null);

  const handleThumbnailClick = async (videoId) => {
    setVideoId(videoId);
    setOpenPlayer(true); // Open the PlayerDialog

    // Fetch video details from your database or API
    const video = videoList.find((video) => video.id === videoId);
    setVideoDetails(video);
  };

  return (
    <div
      className="mt-10 grid grid-cols-2 
    md:grid-cols-3 lg:grid-cols-4 gap-7"
    >
      {videoList.map((video) => (
        <div
          key={video.id}
          className="cursor-pointer 
          hover:scale-105 transition-all"
          onClick={() => handleThumbnailClick(video.id)}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={225}
            compositionHeight={325}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(v),
            }}
          />
        </div>
      ))}
      {openPlayer && (
        <PlayerDialog
          playVideo={openPlayer}
          videoId={videoId}
          videoDetails={videoDetails}
          onClose={() => setOpenPlayer(false)} // Close the dialog
        />
      )}
    </div>
  );
};

export default VideoList;
