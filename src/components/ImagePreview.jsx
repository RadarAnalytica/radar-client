import React, {useState} from 'react';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ images, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    const goToNext = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
    return (
        <div className={styles.previewOverlay}>
      <button className={styles.closeButton} onClick={onClose}>
        &#10005;
      </button>
      <div className={styles.carouselContainer}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={goToPrevious}>
          &#8249;
        </button>
        <img 
          src={images[currentIndex]} 
          alt={`Preview ${currentIndex + 1}`} 
          className={styles.carouselImage}
        />
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={goToNext}>
          &#8250;
        </button>
      </div>
      <div className={styles.imageCounter}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
    );
  };
  
  export default ImagePreview;