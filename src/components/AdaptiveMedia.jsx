import React, { useState, useEffect } from "react";
import VideoComponent from "../components/utilsComponents/VideoComponent";
import ImageComponent from "../components/utilsComponents/ImageComponent ";

const AdaptiveMedia = ({ videoMp4, videoWebm, poster, heavyImageSrc, lightImageSrc, style }) => {
    const [showVideo, setShowVideo] = useState(window.innerWidth > 1080);

    useEffect(() => {
        const handleResize = () => {
            setShowVideo(window.innerWidth > 1080);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return showVideo ? (
        <VideoComponent videoMp4={videoMp4} videoWebm={videoWebm} poster={poster} style={style} />
    ) : (
        <ImageComponent heavyImageSrc={heavyImageSrc} lightImageSrc={lightImageSrc} style={style} />
    );
};

export default AdaptiveMedia;
