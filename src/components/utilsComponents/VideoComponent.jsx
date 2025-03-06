import React, { useRef, useEffect, useState } from "react";
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
    const [currentSource, setCurrentSource] = useState('/video_400.webm');
    const [currentTime, setCurrentTime] = useState(0); // Сохраняем текущее время воспроизведен

    useEffect(() => {
        const videoElement = videoRef && videoRef.current ? videoRef.current : null;
        const handleTimeUpdate = () => {
            console.log('c time: ' + currentTime)
            setCurrentTime(videoElement.currentTime);
        };
    
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        
        const highQualityVideo = document.createElement('video');
        highQualityVideo.src = '/video_full.webm';
        
        const handleCanPlayThrough = () => {
            console.log('source updated');
            if (currentSource !== '/video_full.webm') {
                setCurrentSource('/video_full.webm');
            }
        };
    
        // Добавляем обработчик события после установки src
        highQualityVideo.addEventListener('canplaythrough', handleCanPlayThrough);
        highQualityVideo.load(); // Загружаем видео, чтобы сработало событие canplaythrough
    
        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            highQualityVideo.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, [currentSource]); 


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
                src={currentSource}
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
