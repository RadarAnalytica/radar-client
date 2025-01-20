import React, { useEffect, useState } from "react";

const ImageComponent = ({ highQualitySrc, lowQualitySrc, style }) => {
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = highQualitySrc;
    video.oncanplaythrough = () => setHighQualityLoaded(true);
  }, [highQualitySrc]);


  return (
    <div>
      {highQualityLoaded ? (
        <video
          src={highQualitySrc}
          autoPlay
          loop
          muted
          playsInline
          style={{ ...style, objectFit: "cover" }}
        />
      ) : (
        <video
          src={lowQualitySrc}
          autoPlay
          loop
          muted
          playsInline
          style={{ ...style, objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default ImageComponent;
