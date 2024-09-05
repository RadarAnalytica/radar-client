import React from "react";
const LimitedFooter = () => {
  return (
    <div className='row footerRow' style={{ marginBottom: "45px" }}>
      <div className='col-5'>
        <div
          className='mb-3'
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            alignItems: "center",
            // marginTop: '34px',
          }}
        >
          <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M24 34.6667V11.5555H30.7046C33.3307 11.5555 35.1582 11.6766 36.1872 11.9186C37.2269 12.1502 38.1219 12.5448 38.8722 13.1026C39.719 13.734 40.3675 14.5391 40.8177 15.5179C41.2786 16.4966 41.509 17.5754 41.509 18.7541C41.509 20.5432 41.0589 22.0008 40.1585 23.1269C39.2688 24.2424 37.9665 24.9844 36.2515 25.3527L42.6667 34.6667H35.4154L30.0132 25.6211V34.6667H24ZM30.0132 22.4796H31.203C32.5857 22.4796 33.5933 22.2481 34.2257 21.785C34.8688 21.322 35.1904 20.5958 35.1904 19.6065C35.1904 18.4489 34.8902 17.628 34.29 17.1439C33.7004 16.6492 32.7036 16.4019 31.2995 16.4019H30.0132V22.4796Z'
              fill='#1A1A1A'
            />
            <path
              d='M17.0918 39.0179C15.9673 39.3478 14.7616 38.7756 14.4473 37.7269C11.7541 28.7389 11.7773 19.2416 14.5145 10.2648C14.8339 9.21748 16.0424 8.65034 17.1652 8.9849C18.288 9.31946 18.8995 10.429 18.5838 11.4773C16.1162 19.6707 16.095 28.3278 18.5225 36.5313C18.833 37.5809 18.2162 38.688 17.0918 39.0179Z'
              fill='#F0AD00'
            />
            <path
              d='M8.07128 34.617C6.90049 34.8509 5.7234 34.2364 5.49284 33.2355C4.15877 27.4445 4.09722 21.4942 5.31128 15.6843C5.5211 14.6802 6.68529 14.0483 7.86074 14.2647C9.03618 14.4811 9.7774 15.4639 9.57139 16.4686C8.4905 21.7398 8.5463 27.1337 9.73607 32.3881C9.96284 33.3895 9.24207 34.3832 8.07128 34.617Z'
              fill='#F0AD00'
            />
          </svg>
          <span
            style={{
              maxWidth: "400px",
              fontSize: "14px",
              lineHeight: "15px",
              fontWeight: "600",
            }}
          >
            Комплексный инструмент для роста продаж на маркетплейсах
          </span>
        </div>
      </div>
      <div className='col footer-col'>
        <a
          href='https://t.me/SpyRadar_bot'
          className='fw-bold footer-col-text-a'
        >
          Telegram-бот
        </a>
      </div>
      <div className='col footer-col'>
        <a href='/offer' className='fw-bold footer-col-text-a'>
          Публичная оферта
        </a>
      </div>
      <div className='col-3 footer-col'>
        <a href='/politics' className='fw-bold footer-col-text-a'>
          Политика конфиденцильности
        </a>
      </div>
    </div>
  );
};
export default LimitedFooter;
