import React, { useRef, useEffect } from "react";
import styles from "../../pages/MainPage.module.css";

const VideoComponent = ({ style,
    poster,
    videoMp4,
    videoWebm,
    className,
    setIsVideoLoaded
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlayThrough = () => {
            setIsVideoLoaded(true);
        };

        video.addEventListener("canplaythrough", handleCanPlayThrough);

        return () => {
            video.removeEventListener("canplaythrough", handleCanPlayThrough);
        };
    }, [setIsVideoLoaded]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                ...style,
                position: "relative",
                overflow: "hidden"
            }}
        >
            <video
                className={styles.video}
                ref={videoRef}
                poster={poster}
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                }}
            >
                {videoMp4 && <source src={videoMp4} type="video/mp4" />}
                {videoWebm && <source src={videoWebm} type="video/webm" />}
            </video>
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
