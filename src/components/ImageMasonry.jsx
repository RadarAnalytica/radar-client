import React from 'react';
import styles from './ImageMasonry.module.css';

const ImageMasonry = ({ images, onImageClick, selectedImages }) => {
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


// import React from 'react';

// const ImageMasonry = ({ images }) => {
//   if (!images || images.length === 0) return null;

//   return (
//     <div className="grid grid-cols-3 gap-2 mt-2">
//       {images.length > 3 ? (
//         <>
//           <img src={images[0]} alt="First image" className="col-span-3 w-full h-48 object-cover rounded" />
//           <div className="col-span-3 grid grid-cols-3 gap-2">
//             {images.slice(1).map((image, index) => (
//               <img key={index} src={image} alt={`Image ${index + 2}`} className="w-full h-24 object-cover rounded" />
//             ))}
//           </div>
//         </>
//       ) : (
//         images.map((image, index) => (
//           <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-24 object-cover rounded" />
//         ))
//       )}
//     </div>
//   );
// };

// export default ImageMasonry;

// import React from 'react';
// import styles from './ImageMasonry.module.css';

// const ImageMasonry = ({ images }) => {
//   return (
//     <div className={styles.imageMasonry}>
//       {images.map((image, index) => (
//         <img key={index} src={image} alt={`Image ${index + 1}`} className={styles.masonryImage} />
//       ))}
//     </div>
//   );
// };

// export default ImageMasonry;