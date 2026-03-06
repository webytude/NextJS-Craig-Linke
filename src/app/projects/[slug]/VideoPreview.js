"use client";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";
import styles from "./videoPreview.module.css";
import { createPortal } from "react-dom";
import Loading from "@/components/common/Loading";

export default function VideoPreview({ videoData, thumbnail }) {
  const [open, setOpen] = useState(false);

  if (!videoData) return null;

  const { EnableMuxVideo, MP4_Video, MuxVideo, VideoThumbnail } = videoData;

  const videoExists =
    (EnableMuxVideo && MuxVideo?.playback_id) || MP4_Video?.url;

  const thumbnailUrl =
    EnableMuxVideo && MuxVideo?.playback_id
      ? `https://image.mux.com/${MuxVideo.playback_id}/thumbnail.webp`
      : VideoThumbnail?.url || thumbnail;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);



  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {videoExists && (
        <div className={styles.previewWrapper}>
          <button onClick={handleOpen} className={styles.playBtn}>
            ▶ PLAY VIDEO
          </button>

          {thumbnailUrl && (
            <img
              onClick={handleOpen}
              src={thumbnailUrl}
              alt="Video Preview"
              width={124}
              height={70}
            />
          )}
        </div>
      )}

      {open &&
        createPortal(
          <div className={styles.modal}>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>CLOSE</button>

            <div className={styles.videoContainer}>
              {EnableMuxVideo && MuxVideo?.playback_id && (
                <MuxPlayer
                  playbackId={MuxVideo.playback_id}
                  streamType="on-demand"
                  autoPlay
                  playsInline
                  preload="auto"
                  controls
                  style={{
                    // width: "100%",
                    maxWidth: '70%',
                    height: "70%",
                    "--media-object-fit": "cover",
                    "--media-object-position": "center",
                    objectFit: "cover",
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto'
                  }}
                />
              )}

              {!EnableMuxVideo && MP4_Video?.url && (
                <video
                  src={MP4_Video.url}
                  autoPlay
                  controls
                  playsInline
                  className={styles.video}
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}