import React from 'react';
import downloadIcon from '../pages/images/Download.svg';

const DownloadButton = ({ handleDownload, isLoading, styles }) => {
  return (
    <button
      className={styles ? styles : `download-button ${isLoading ? 'disabled' : ''}`}
      disabled={isLoading}
      onClick={() => !isLoading && handleDownload()}
      style={{ cursor: isLoading ? 'not-allowed' : 'pointer', border: 'none' }}
    >
      {!isLoading ? (
        <img src={downloadIcon} />
      ) : (
        <span className='small-loader'></span>
      )}
      Скачать Excel
    </button>
  )
};

export default DownloadButton;
