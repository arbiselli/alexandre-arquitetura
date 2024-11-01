"use client";

import React, { useEffect, useRef, useState } from "react";
import { useColor } from "../contexts/ColorContext";
import styles from "./BackgroundVideo.module.css";

const videos = [
  "/video1.mp4",
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4",
  "/video5.mp4",
  "/video6.mp4",
  "/video7.mp4",
  "/video8.mp4",
];

const BackgroundVideo: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showVideo } = useColor();

  useEffect(() => {
    // Set loading to false after component mounts
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const currentVideo = currentVideoRef.current;
    const nextVideo = nextVideoRef.current;

    if (!currentVideo || !nextVideo) return;

    const handleVideoEnd = () => {
      // Start fading out the current video
      currentVideo.classList.remove(styles.fadeIn);
      currentVideo.classList.add(styles.fadeOut);

      // Start playing and fading in the next video
      nextVideo.play();
      nextVideo.classList.remove(styles.fadeOut);
      nextVideo.classList.add(styles.fadeIn);

      // Update indices
      setCurrentVideoIndex(nextVideoIndex);
      setNextVideoIndex((nextVideoIndex + 1) % videos.length);
    };

    currentVideo.addEventListener("ended", handleVideoEnd);

    // Preload the next video
    nextVideo.src = videos[nextVideoIndex];
    nextVideo.load();

    if (!showVideo) {
      currentVideo.pause();
      nextVideo.pause();
    } else {
      currentVideo.play().catch((error) => {
        console.log("Video playback failed:", error);
      });
    }

    return () => {
      currentVideo.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentVideoIndex, nextVideoIndex, showVideo]);

  // Return white background immediately if loading or showVideo is false
  if (isLoading || !showVideo) {
    return <div className={styles.whiteBackground} />;
  }

  return (
    <div className={styles.videoContainer}>
      <video
        ref={currentVideoRef}
        key={`current-${videos[currentVideoIndex]}`}
        className={`${styles.backgroundVideo} ${styles.fadeIn}`}
        autoPlay
        muted
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        ref={nextVideoRef}
        key={`next-${videos[nextVideoIndex]}`}
        className={`${styles.backgroundVideo} ${styles.fadeOut}`}
        muted
      >
        <source src={videos[nextVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
