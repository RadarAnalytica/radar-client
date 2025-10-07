import React, { useEffect, useState } from 'react';

import styles from "../../pages/MainPage.module.css";
const ImageComponent = ({ heavyImageSrc, lightImageSrc, style }) => {
  const [heavyImageLoaded, setHeavyImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heavyImageSrc;
    img.onload = () => setHeavyImageLoaded(true);

    return () => {
      setHeavyImageLoaded(false); // Reset on source change
    };
  }, [heavyImageSrc]); // Only re-run effect if heavyImageSrc changes

  return (
    <div>
      <img
        className={styles.imageMain}
        src={heavyImageLoaded ? heavyImageSrc : lightImageSrc}
        alt="dynamic-icon"
        style={style}
      />
    </div>
  );
};

export default ImageComponent;

