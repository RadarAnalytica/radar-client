import React, { useState, useEffect, lazy, Suspense } from "react";
import LoaderPage from "../pages/LoaderPage";
import VideoComponent from "../components/utilsComponents/VideoComponent";
import ImageComponent from "./utilsComponents/ImageComponent "

const AdaptiveMedia = ({ videoMp4, poster, heavyImageSrc, lightImageSrc, style, setIsVideoLoaded }) => {
    const [showVideo, setShowVideo] = useState(window.innerWidth > 1080);


    useEffect(() => {
        const handleResize = () => {
            setShowVideo(window.innerWidth > 1080);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return showVideo ? (
        <VideoComponent videoMp4={videoMp4} poster={poster} style={style} setIsVideoLoaded={setIsVideoLoaded} />
    ) : (
        <ImageComponent heavyImageSrc={heavyImageSrc} lightImageSrc={lightImageSrc} style={style} />
    );
};

export default AdaptiveMedia;
