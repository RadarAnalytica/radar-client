import React from 'react';
import downloadIcon from '../pages/images/Download.svg';
import { Button, ConfigProvider } from 'antd';

const DownloadButton = ({ handleDownload, loading, styles }) => {
  return (
    <>
      {/* <button
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
      </button> */}
      <ConfigProvider
        wave={{ disabled: true }}
        theme={{
          token: {
            colorPrimary: '#5329FF',
            colorTextLightSolid: 'white',
            fontSize: 14,
          },
          Button: {
            defaultShadow: 'none',
            primaryShadow: 'none'
          }
        }}
      >
        <Button
          type='primary'
          size='large'
          loading={loading}
          onClick={() => !loading && handleDownload()}
          style={{ fontWeight: 600, height: 45, padding: 6 }}
        >
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.9 6.69999H14.4L9 12.1L3.6 6.69999H8.1V0.399994H9.9V6.69999ZM1.8 14.8H16.2V8.49999H18V15.7C18 15.9387 17.9052 16.1676 17.7364 16.3364C17.5676 16.5052 17.3387 16.6 17.1 16.6H0.9C0.661305 16.6 0.432387 16.5052 0.263604 16.3364C0.0948211 16.1676 0 15.9387 0 15.7V8.49999H1.8V14.8Z" fill="white" />
            </svg>
          Скачать Excel
        </Button>
      </ConfigProvider>
    </>
  )
};

export default DownloadButton;
