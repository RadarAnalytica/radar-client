import React, { useRef, useState, useEffect } from "react";

const VideoComponent = ({ heavyVideoSrc, lightVideoSrc, preview, style }) => {
    const lightVideoRef = useRef(null);
    const heavyVideoRef = useRef(null);
    const [isHeavyLoaded, setIsHeavyLoaded] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
   

    useEffect(() => {
        // Add performance monitoring
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            // Log LCP metrics
            console.log('LCP Element:', entry.element);
            console.log('LCP Timing:', entry.startTime);
            console.log('LCP Size:', entry.size);
            console.log('LCP ID:', entry.id);
          });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }, []);
    const handleUserInteraction = () => {
        setIsUserInteracted(true);

        if (lightVideoRef.current) {
            lightVideoRef.current.muted = true;
            lightVideoRef.current.play().catch(() => { });
        }
        if (heavyVideoRef.current && isHeavyLoaded) {
            heavyVideoRef.current.muted = true;
            heavyVideoRef.current.play().catch(() => { });
        }
    };

    useEffect(() => {
        const heavyVideo = heavyVideoRef.current;

        if (heavyVideo) {
            heavyVideo.preload = "auto";

            const handleCanPlayThrough = () => {
                setIsHeavyLoaded(true);

                if (lightVideoRef.current && isUserInteracted) {
                    heavyVideo.currentTime = lightVideoRef.current.currentTime; // Sync time
                    heavyVideo.muted = true; // Ensure muted before playing
                    heavyVideo.play().catch(() => { });
                }
            };

            heavyVideo.addEventListener("canplaythrough", handleCanPlayThrough);

            return () => {
                heavyVideo.removeEventListener("canplaythrough", handleCanPlayThrough);
            };
        }
    }, [heavyVideoSrc, isUserInteracted]);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'fetch';
        link.href = lightVideoSrc;
        link.type = 'video/mp4';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
      }, [lightVideoSrc]);

    return (
        <div style={{ width: "100%", height: "100%", ...style }} onClick={handleUserInteraction}>
            {/* Low-quality video (starts immediately) */}
            <video
                ref={lightVideoRef}
                src={lightVideoSrc}
                poster={preview}
                style={{
                    width: "100%",
                    height: "100%",
                    display: isHeavyLoaded ? "none" : "block",
                    contentVisibility: 'auto',
                    containIntrinsicSize: '16/9'
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                fetchpriority="high"
            />

            {/* High-quality video (hidden initially, appears when ready) */}
            <video
                ref={heavyVideoRef}
                src={heavyVideoSrc}
                style={{
                    width: "100%",
                    height: "100%",
                    display: isHeavyLoaded ? "block" : "none",
                }}
                autoPlay
                loop
                muted
                playsInline
            />
        </div>
    );
};

export default VideoComponent;
