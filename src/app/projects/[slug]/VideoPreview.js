"use client";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";
import styles from "./videoPreview.module.css";
import { createPortal } from "react-dom";
import Loading from "@/components/common/Loading";

export default function VideoPreview({ videoData, thumbnail }) {
  const [open, setOpen] = useState(false);

  if (!videoData) return null;

  const { EnableMuxVideo, MP4_Video, MuxVideo } = videoData;


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);



  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={styles.previewWrapper}>
        <button onClick={handleOpen} className={styles.playBtn}>
          ▶ PLAY VIDEO
        </button>

        {thumbnail && <img onClick={handleOpen} src={thumbnail} alt="Video Preview" width={124} height={70} />}
      </div>

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
                      muted
                      loop
                      playsInline
                      preload="auto"
                      controls={false}
                      style={{
                        // width: "100%",
                        maxWidth: '70%',
                        height: "70%",
                        "--controls": "none",
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
                      muted
                      loop
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