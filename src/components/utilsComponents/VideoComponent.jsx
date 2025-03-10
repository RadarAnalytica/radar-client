import React, { useRef, useEffect, useState } from "react";
import styles from './VideoComponent.module.css'
import 'moment/locale/ru'
const VideoComponent = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    return (
        <div
            className={styles.videoContainer}
            ref={containerRef}
        >   
                <video
                    className={styles.videoSD}
                    ref={videoRef}
                    src='/video_300.webm'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                    }}
                    loading='eager'
                    decoding='async'
                    fetchpriority='high'
                    poster='/firstShot.jpg'
                    playsInline
                    autoPlay
                    muted
                    preload="auto"
                    webkit-playsinline="true"
                    loop
                />
                 <video
                    className={styles.videoHD}
                    src='/video_full.webm'
                    onCanPlayThrough={() => {
                        const videoElement = videoRef.current;
                        if (videoElement && videoElement.style.display !== 'none') {
                            videoElement.style.display = 'none'
                            videoElement.style.zIndex = 0
                        }
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                    }}
                    loading='eager'
                    decoding='async'
                    fetchpriority='high'
                    poster='/firstShot.jpg'
                    playsInline
                    autoPlay
                    muted
                    preload="auto"
                    webkit-playsinline="true"
                    loop
                />
               
        </div>
    );
};

VideoComponent.defaultProps = {
    style: {},
    className: '',
    videoMp4: null,
    videoWebm: null,
    poster: null
};

export default VideoComponent;
