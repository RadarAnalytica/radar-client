import React, { useRef, useEffect } from "react";
import styles from "../../pages/MainPage.module.css";

const VideoComponent = ({
    style,
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

        // Log when the video can be played through
        const handleCanPlayThrough = () => {
            setIsVideoLoaded(true);
            console.log('Видео полностью загружено и готово к воспроизведению');
        };

        video.addEventListener('canplaythrough', handleCanPlayThrough);

        return () => {
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                ...style,
                position: 'relative',
                overflow: 'hidden'
            }}
            className={className}
        >
            <video
                className={styles.video}
                ref={videoRef}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                }}
                poster={poster}
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                webkit-playsinline="true"
                onLoadedData={() => setIsVideoLoaded()}
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
