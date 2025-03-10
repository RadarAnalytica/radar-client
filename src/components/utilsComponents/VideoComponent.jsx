import React, { useRef, useEffect, useState } from "react";
import styles from './VideoComponent.module.css'
import 'moment/locale/ru'
const VideoComponent = () => {
    const videoRef = useRef(null);
    const [ isHiresActive, setHiresActive ] = useState(false)
    const [ isFirstStart, setIsFirstStart ] = useState(true)
    const [ hiresSource, setHiresSource ] = useState(null)

    return (
        <div
            className={styles.videoContainer}
        >   
                <video
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
                            const newSourceUrl = URL.createObjectURL(blob)
                            videoElement.src = newSourceUrl
                            setHiresSource(blob)
                            setIsFirstStart(false)
                        } 
                        
                        // if (!isFirstStart && hiresSource && videoElement && !isHiresActive) {
                        //     const newSourceUrl = URL.createObjectURL(hiresSource)
                        //     videoElement.src = newSourceUrl
                        //     setHiresActive(true)
                        // }

                        // if (!isFirstStart && hiresSource && videoElement && !isHiresActive) {
                        //     const newSourceUrl = URL.createObjectURL(hiresSource)
                        //     videoElement.loop = true;
                        //     videoElement.src = newSourceUrl;
                        //     videoElement.play()
                        //     setHiresActive(true)
                        // }
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
