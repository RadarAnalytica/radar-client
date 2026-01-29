import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { useDemoMode } from "@/app/providers";

interface DownloadButtonProps {
  handleDownload: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ handleDownload, loading = false, disabled = false }) => {
  const { isDemoMode } = useDemoMode();
  const isDisabled = isDemoMode || disabled;

  return (
    <>
      <ConfigProvider
        wave={{ disabled: true }}
        theme={{
          token: {
            colorPrimary: '#5329FF',
            colorTextLightSolid: 'white',
            fontSize: 14,
            controlHeightLG: 38,
            fontWeight: 600,
          },
          Button: {
            defaultShadow: 'none',
            primaryShadow: 'none',
            paddingInlineLG: 12,
            controlHeightLG: 38,
          }
        }}
      >
        <Button
          type='primary'
          size='large'
          loading={loading}
          onClick={() => !loading && handleDownload()}
          disabled={isDisabled}
          title={isDemoMode ? 'Скачивание доступно после активации подписки' : 'Скачать таблицу в виде Excel-файла'}
          style={{ fontWeight: 600, height: 38, width: 149, fontSize: 14 }}
        >
          {!loading && <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto'}}>
            <path d="M7.9987 5.5625C8.37839 5.5625 8.6862 5.8703 8.6862 6.25V10.0902L9.34589 9.43053C9.61438 9.16205 10.0497 9.16205 10.3182 9.43053C10.5867 9.69902 10.5867 10.1343 10.3182 10.4028L8.48483 12.2361C8.41892 12.3021 8.34295 12.3518 8.26186 12.3853C8.1808 12.4189 8.09192 12.4375 7.9987 12.4375C7.90548 12.4375 7.8166 12.4189 7.73553 12.3853C7.65445 12.3518 7.57848 12.3021 7.51256 12.2361L5.67923 10.4028C5.41074 10.1343 5.41074 9.69902 5.67923 9.43053C5.94771 9.16205 6.38301 9.16205 6.6515 9.43053L7.3112 10.0902L7.3112 6.25C7.3112 5.8703 7.619 5.5625 7.9987 5.5625Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0.894531 4.41667C0.894531 2.01193 2.84396 0.0625 5.2487 0.0625H9.22991C10.3847 0.0625 11.4922 0.521241 12.3088 1.33781L13.8276 2.85659C14.6441 3.67316 15.1029 4.78065 15.1029 5.93545V13.5833C15.1029 15.9881 13.1534 17.9375 10.7487 17.9375H5.2487C2.84396 17.9375 0.894531 15.9881 0.894531 13.5833V4.41667ZM5.2487 1.4375C3.60335 1.4375 2.26953 2.77132 2.26953 4.41667V13.5833C2.26953 15.2287 3.60335 16.5625 5.2487 16.5625H10.7487C12.394 16.5625 13.7279 15.2287 13.7279 13.5833V5.93545C13.7279 5.14533 13.414 4.38756 12.8553 3.82886L11.3365 2.31008C10.7778 1.75138 10.02 1.4375 9.22991 1.4375H5.2487Z" fill="white" />
          </svg>}
          Скачать Excel
        </Button>
      </ConfigProvider>
    </>
  );
};

export default DownloadButton;
