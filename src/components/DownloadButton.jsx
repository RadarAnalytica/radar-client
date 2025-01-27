import React from 'react';
import downloadIcon from '../pages/images/Download.svg';

const DownloadButton = ({ handleDownload, isLoading }) => {
  return (
    <div className='download-button' onClick={() => handleDownload()}>
     {!isLoading ? (
      <img src={downloadIcon} />
    ) : (
      <span  className="small-loader"></span>
    )}
    Скачать Excel
  </div>
  )
};

export default DownloadButton;
