import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import BG from "../images/doctorfull1.jpg";
import VideoIcon from "../images/video-icon.png";

function HomeVideo({ video }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className="HomeVideo text-center content-block1 position-relative"
      style={{
        backgroundImage: `url(${
          video && video.video_image ? video.video_image : BG
        })`,
      }}
    >
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={video?.video_url.split("=")[1]}
        onClose={() => setOpen(false)}
      />
      <a onClick={() => setOpen(true)}>
        <img src={VideoIcon} alt="" />
      </a>
    </div>
  );
}
export default HomeVideo;
