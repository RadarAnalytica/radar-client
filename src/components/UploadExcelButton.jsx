import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { useDemoMode } from "@/app/providers";

const UploadExcelButton = ({ onClick, loading, disabled = false, title }) => {
  const { isDemoMode } = useDemoMode();

  const isDisabled = isDemoMode || disabled;
  const buttonTitle = isDemoMode
    ? 'Загрузка доступна после активации подписки'
    : (title || 'Загрузить Excel-файл');

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
          onClick={() => !loading && onClick()}
          disabled={isDisabled}
          title={buttonTitle}
          style={{ fontWeight: 600, height: 38, width: 158, fontSize: 14 }}
        >
          {!loading && <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto'}}>
            <path d="M7.9987 12.4375C8.37839 12.4375 8.6862 12.1297 8.6862 11.75V7.9098L9.34589 8.56947C9.61438 8.83795 10.0497 8.83795 10.3182 8.56947C10.5867 8.30098 10.5867 7.86567 10.3182 7.59718L8.48483 5.76385C8.41892 5.69794 8.34295 5.64819 8.26186 5.61468C8.1808 5.58112 8.09192 5.5625 7.9987 5.5625C7.90548 5.5625 7.8166 5.58112 7.73553 5.61468C7.65445 5.64819 7.57848 5.69794 7.51256 5.76385L5.67923 7.59718C5.41074 7.86567 5.41074 8.30098 5.67923 8.56947C5.94771 8.83795 6.38301 8.83795 6.6515 8.56947L7.3112 7.9098L7.3112 11.75C7.3112 12.1297 7.619 12.4375 7.9987 12.4375Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0.894531 4.41667C0.894531 2.01193 2.84396 0.0625 5.2487 0.0625H9.22991C10.3847 0.0625 11.4922 0.521241 12.3088 1.33781L13.8276 2.85659C14.6441 3.67316 15.1029 4.78065 15.1029 5.93545V13.5833C15.1029 15.9881 13.1534 17.9375 10.7487 17.9375H5.2487C2.84396 17.9375 0.894531 15.9881 0.894531 13.5833V4.41667ZM5.2487 1.4375C3.60335 1.4375 2.26953 2.77132 2.26953 4.41667V13.5833C2.26953 15.2287 3.60335 16.5625 5.2487 16.5625H10.7487C12.394 16.5625 13.7279 15.2287 13.7279 13.5833V5.93545C13.7279 5.14533 13.414 4.38756 12.8553 3.82886L11.3365 2.31008C10.7778 1.75138 10.02 1.4375 9.22991 1.4375H5.2487Z" fill="white" />
          </svg>}
          Загрузить Excel
        </Button>
      </ConfigProvider>
    </>
  );
};

export default UploadExcelButton;
