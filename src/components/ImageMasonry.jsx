import React from 'react';
import styles from './ImageMasonry.module.css';

const ImageMasonry = ({ images, onImageClick, selectedImages, onImageDoubleClick }) => {
  if (!images || images.length === 0) return null;

  const handleImageClick = (image, event) => {
    if (event.type === 'contextmenu') {
      event.preventDefault();
      onImageClick(image, event);
    } else if (event.type === 'click') {
      onImageClick(image, null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {images.length > 1 ? (
          <>
            <img 
              src={images[0]} 
              alt="First image" 
              className={`${styles.mainImage} ${selectedImages.includes(images[0]) ? styles.selected : ''}`}
              onClick={(e) => handleImageClick(images[0], e)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleImageClick(images[0], e)
              }}
              onDoubleClick={() => onImageDoubleClick(images[0])}
            />
            <div className={styles.smallImagesGrid}>
              {images.slice(1, 4).map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Image ${index + 2}`} 
                  className={`${styles.smallImage} ${selectedImages.includes(image) ? styles.selected : ''}`}
                  onClick={(e) => handleImageClick(image, e)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleImageClick(image, e)
                  }}
                  onDoubleClick={() => onImageDoubleClick(image)}
                />
              ))}
            </div>
          </>
        ) : (
          <img 
            src={images[0]} 
            alt="Single image" 
            className={`${styles.mainImage} ${selectedImages.includes(images[0]) ? styles.selected : ''}`}
            onClick={(e) => handleImageClick(images[0], e)}
            onContextMenu={(e) => {
              e.preventDefault(); 
              handleImageClick(images[0], e)
            }}
            onDoubleClick={() => onImageDoubleClick(images[0])}
          />
        )}
      </div>
      {images.length > 4 && (
        <div className={styles.imageCount}>
          +{images.length - 4}
        </div>
      )}
    </div>
  );
};

export default ImageMasonry;
