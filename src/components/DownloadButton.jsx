import React from 'react';
import downloadIcon from '../pages/images/Download.svg';

const DownloadButton = ({ handleDownload }) => {
  return (
    <div className='download-button' onClick={handleDownload}>
    <img src={downloadIcon} />
    Скачать Excel
  </div>
  )
};

export default DownloadButton;
