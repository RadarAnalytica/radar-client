import React from 'react';
import downloadIcon from '../pages/images/Download.svg';

const DownloadButton = ({ handleDownload, isLoading }) => {
  return (
    <div
      className={`download-button ${isLoading ? 'disabled' : ''}`}
      onClick={() => !isLoading && handleDownload()}
      style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
    >
      {!isLoading ? (
        <img src={downloadIcon} />
      ) : (
        <span className='small-loader'></span>
      )}
      Скачать Excel
    </div>
  );
};

export default DownloadButton;
