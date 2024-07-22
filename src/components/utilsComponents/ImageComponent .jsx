import React, { useEffect, useState } from 'react';

const ImageComponent = ({ heavyImageSrc, lightImageSrc, style }) => {
  const [heavyImageLoaded, setHeavyImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heavyImageSrc;
    img.onload = () => setHeavyImageLoaded(true);
  }, [heavyImageSrc]);

  return (
    <img
      src={heavyImageLoaded ? heavyImageSrc : lightImageSrc}
      alt='dynamic-icon'
      style={style}
    />
  );
};

export default ImageComponent;
