import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import styles from "../../pages/MainPage.module.css";
import moment from "moment/moment";
import 'moment/locale/ru'
const VideoComponent = ({
    style,
    poster,
    videoMp4,
    videoWebm,
    className,
    setIsVideoLoaded
}) => {
    const videoRef = useRef(null);
    const [currentSource, setCurrentSource] = useState('/video_300.webm');
    //console.log(currentSource)
    const [currentTime, setCurrentTime] = useState(0); // Сохраняем текущее время воспроизведен
    useLayoutEffect(() => {
        console.log(videoRef.current)
        console.log('ule')
        videoRef.current.play();
    }, [])
    useEffect(() => {
        const videoElement = videoRef && videoRef.current ? videoRef.current : null;
        const handleTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);
        };
    
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        
        const highQualityVideo = document.createElement('video');
        highQualityVideo.src = '/video_full.webm';
        
        const handleCanPlayThrough = () => {
            if (currentSource !== '/video_full.webm' && currentTime >= 1) {
                console.log(currentTime)
                setCurrentSource('/video_full.webm');
            }
        };
    
        highQualityVideo.addEventListener('canplaythrough', handleCanPlayThrough);
        highQualityVideo.load();
    
        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            highQualityVideo.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, [currentTime, currentSource]); 


    useEffect(() => {
        const videoElement = videoRef && videoRef.current ? videoRef.current : null;
        videoElement.currentTime = currentTime
    }, [currentSource])


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
