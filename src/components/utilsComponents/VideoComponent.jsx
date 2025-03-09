import React, { useRef, useEffect, useState } from "react";
import styles from './VideoComponent.module.css'
import 'moment/locale/ru'
const VideoComponent = () => {
    const videoRef = useRef(null);
    const hiresVideoRef = useRef(null);
    const [ isMainVideoActive, setIsMainVideoActive ] = useState(false)


    useEffect(() => {
        const videoElement = videoRef.current;
        const hiResVideoElement = hiresVideoRef.current;
        const handleTime = () => {
            const timeStamp = videoElement.currentTime
            if (isMainVideoActive) {
                hiResVideoElement.currentTime = timeStamp;
                videoElement.style.opacity = 0
                videoElement.style.display = 'none'
                videoElement.pause()
            }
        }
       videoElement.addEventListener('timeupdate', handleTime);
       return () => {videoElement.removeEventListener('timeupdate', handleTime)}

    }, [isMainVideoActive])

    return (
        <div
            className={styles.videoContainer}
        >   
                {/* <video
                    className={styles.video}
                    ref={videoRef}
                    src='/video_300.webm'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                    }}
                    onEnded={() => {
                        const videoElement = videoRef.current;
                        if (!isFirstStart && hiresSource && videoElement && !isHiresActive) {
                            const newSourceUrl = URL.createObjectURL(hiresSource)
                            videoElement.loop = true;
                            videoElement.src = newSourceUrl;
                            videoElement.play()
                            setHiresActive(true)
                        }
                    }}
                    onPlaying={async function () {
                        const videoElement = videoRef.current;
                        if (videoElement && isFirstStart && !hiresSource) {
                            const arrayBuffer = await fetch('/video_full.webm').then(r => r.arrayBuffer());
                            const blob = new Blob([arrayBuffer]);
                            setHiresSource(blob)
                            setIsFirstStart(false)
                        } 
                        
                        if (!isFirstStart && hiresSource && videoElement && !isHiresActive) {
                            const newSourceUrl = URL.createObjectURL(hiresSource)
                            videoElement.src = newSourceUrl
                            setHiresActive(true)
                        }
                    }}
                    loading='eager'
                    decoding='async'
                    fetchpriority='high'
                    poster='/firstShot.jpg'
                    playsInline
                    autoPlay
                    muted
                    //preload="metadata"
                    webkit-playsinline="true"
                /> */}
                <video
                    className={styles.videoSD}
                    ref={videoRef}
                    src='/video_300.webm'
                    loading='eager'
                    decoding='async'
                    fetchpriority='high'
                    poster='/firstShot.jpg'
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    webkit-playsinline="true"
                />
                <video
                    className={styles.videoHD}
                    ref={hiresVideoRef}
                    src='/video_full.webm'
                    onPlaying={() => {!isMainVideoActive && setIsMainVideoActive(true)}}
                    loading='async'
                    decoding='async'
                    fetchpriority='low'
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    webkit-playsinline="true"
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
