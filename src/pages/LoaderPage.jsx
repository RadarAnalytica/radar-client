import React from 'react';

const LoaderPage = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center loader-overlay'>
      <div className='loader'></div>
      <div style={{ marginTop: "40px", fontSize: "22px" }}>Идет загрузка сервиса</div>
    </div>
  );
};

export default LoaderPage;
