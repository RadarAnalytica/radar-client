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

    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (!video) return;

    //     // Log when the video can be played through
    //     const handleCanPlayThrough = () => {
    //         setIsVideoLoaded(true);
    //         console.log('Видео полностью загружено и готово к воспроизведению');
    //     };

    //     video.addEventListener('canplaythrough', handleCanPlayThrough);

    //     return () => {
    //         video.removeEventListener('canplaythrough', handleCanPlayThrough);
    //     };
    // }, []);

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
                loading='eager'
                decoding='async'
                fetchpriority='high'
                poster='/firstShot.jpg'
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                webkit-playsinline="true"
            >
                <source src='/Webm_1920.webm' type="video/webm" />
                <source src='/WebmLow.webm' type="video/webm" />
                Ваш браузер не поддерживает видео.
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
