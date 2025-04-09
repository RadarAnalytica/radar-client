import React from 'react';
import downloadIcon from '../pages/images/Download.svg';

const DownloadButton = ({ handleDownload, isLoading, styles }) => {
  return (
    <button
      className={styles}
      disabled={isLoading}
      onClick={() => !isLoading && handleDownload()}
      style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
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
