"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./videoPreview.module.css";
import { createPortal } from "react-dom";
import Loading from "@/components/common/Loading";

export default function VideoPreview({ videoData, thumbnail }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  if (!videoData) return null;

  const { EnableMuxVideo, MP4_Video, MuxVideo } = videoData;

  let videoUrl = "";

  if (EnableMuxVideo && MuxVideo?.playback_id) {
    videoUrl = `https://stream.mux.com/${MuxVideo.playback_id}.m3u8`;
  } else if (MP4_Video?.url) {
    videoUrl = MP4_Video.url;
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLoaded = () => {
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
  };

  return (
    <>
      {/* Preview Section */}
      <div className={styles.previewWrapper}>
        <button onClick={handleOpen} className={styles.playBtn}>
          ▶ PLAY VIDEO
        </button>

        {thumbnail && <img onClick={handleOpen} src={thumbnail} alt="Video Preview" width={124} height={70} />}
      </div>

      {/* Modal */}
      {open &&
        createPortal(
            <div className={styles.modal}>
              <button onClick={() => setOpen(false)} className={styles.closeBtn}>CLOSE</button>

              <div className={styles.videoContainer}>
                  {loading && <Loading />}

                  {videoUrl && (
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      autoPlay
                      muted
                      playsInline
                      loop
                      onLoadedData={handleLoaded}
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