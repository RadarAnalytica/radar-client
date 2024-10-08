import React from 'react';
import '../pages/styles.css';

const Footer = ({ isWide }) => {
  return (
    <div className='footer'>
      <div
        className={`footer-container ${
          isWide ? 'wide_container' : 'container'
        }`}
      >
        <div className='row'>
          <div className='col-5' style={{ marginTop: '17px' }}>
            <div
              className='mb-3'
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
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
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Комплексный инструмент для роста продаж на маркетплейсах
              </span>
            </div>
            <div>
              <p className='fw-bold'>Следите за новостями</p>
              <div className='d-flex' style={{ gap: '12px' }}>
                <svg
                  width='35'
                  height='35'
                  viewBox='0 0 35 35'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    width='35'
                    height='35'
                    rx='5'
                    fill='black'
                    fillOpacity='0.05'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.3749 16.9956C12.7436 14.5965 16.3236 13.0149 18.1148 12.2508C23.2292 10.0689 24.2919 9.68989 24.9846 9.67738C25.1369 9.67463 25.4776 9.71335 25.6982 9.89699C25.8845 10.052 25.9358 10.2615 25.9603 10.4085C25.9848 10.5555 26.0154 10.8904 25.9911 11.1521C25.714 14.1389 24.5147 21.387 23.9046 24.7323C23.6465 26.1478 23.1382 26.6224 22.6461 26.6688C21.5766 26.7698 20.7645 25.9439 19.7287 25.2475C18.1078 24.1577 17.1921 23.4793 15.6188 22.4159C13.8005 21.187 14.9792 20.5115 16.0154 19.4076C16.2866 19.1187 20.9987 14.7227 21.0899 14.3239C21.1013 14.2741 21.1119 14.0881 21.0042 13.99C20.8965 13.8918 20.7376 13.9254 20.6229 13.9521C20.4604 13.9899 17.871 15.7453 12.8549 19.2183C12.1199 19.7359 11.4542 19.9881 10.8577 19.9749C10.2001 19.9603 8.93528 19.5936 7.99498 19.2801C6.84166 18.8955 5.92503 18.6923 6.00485 18.0392C6.04642 17.6991 6.5031 17.3512 7.3749 16.9956Z'
                    fill='#000100'
                  />
                </svg>
                <svg
                  width='35'
                  height='35'
                  viewBox='0 0 35 35'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    width='35'
                    height='35'
                    rx='5'
                    fill='black'
                    fillOpacity='0.05'
                  />
                  <path
                    d='M17.8999 24.1647C11.0624 24.1647 7.1625 19.4772 7 11.6772H10.425C10.5375 17.4022 13.0624 19.8272 15.0624 20.3272V11.6772H18.2876V16.6147C20.2626 16.4022 22.3373 14.1522 23.0373 11.6772H26.2624C25.7249 14.7272 23.4749 16.9772 21.8749 17.9022C23.4749 18.6522 26.0375 20.6147 27.0125 24.1647H23.4624C22.6999 21.7897 20.8001 19.9522 18.2876 19.7022V24.1647H17.8999Z'
                    fill='#000100'
                  />
                </svg>
                <svg
                  width='35'
                  height='35'
                  viewBox='0 0 35 35'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    width='35'
                    height='35'
                    rx='5'
                    fill='black'
                    fillOpacity='0.05'
                  />
                  <path
                    d='M27.5818 12.8631C27.4687 12.4403 27.2459 12.0545 26.9356 11.7442C26.6253 11.4339 26.2384 11.21 25.8136 11.095C24.25 10.6772 18 10.6772 18 10.6772C18 10.6772 11.75 10.6772 10.1864 11.095C9.76161 11.21 9.37472 11.4339 9.06441 11.7442C8.7541 12.0545 8.53125 12.4403 8.41818 12.8631C8 14.4234 8 17.6772 8 17.6772C8 17.6772 8 20.9311 8.41818 22.4914C8.53125 22.9142 8.7541 23.3 9.06441 23.6103C9.37472 23.9206 9.76161 24.1445 10.1864 24.2595C11.75 24.6772 18 24.6772 18 24.6772C18 24.6772 24.25 24.6772 25.8136 24.2595C26.2384 24.1445 26.6253 23.9206 26.9356 23.6103C27.2459 23.3 27.4687 22.9142 27.5818 22.4914C28 20.9311 28 17.6772 28 17.6772C28 17.6772 28 14.4234 27.5818 12.8631Z'
                    fill='#000100'
                  />
                  <path
                    d='M16 20.6772V14.6772L21 17.6772L16 20.6772Z'
                    fill='#FEFEFE'
                  />
                </svg>
                <svg
                  width='35'
                  height='35'
                  viewBox='0 0 35 35'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    width='35'
                    height='35'
                    rx='5'
                    fill='black'
                    fillOpacity='0.05'
                  />
                  <g clipPath='url(#clip0_117_3423)'>
                    <path
                      d='M18 9.47803C20.6719 9.47803 20.9883 9.48975 22.0391 9.53662C23.0156 9.57959 23.543 9.74365 23.8945 9.88037C24.3594 10.0601 24.6953 10.2788 25.043 10.6265C25.3945 10.978 25.6094 11.3101 25.7891 11.7749C25.9258 12.1265 26.0898 12.6577 26.1328 13.6304C26.1797 14.6851 26.1914 15.0015 26.1914 17.6694C26.1914 20.3413 26.1797 20.6577 26.1328 21.7085C26.0898 22.6851 25.9258 23.2124 25.7891 23.564C25.6094 24.0288 25.3906 24.3647 25.043 24.7124C24.6914 25.064 24.3594 25.2788 23.8945 25.4585C23.543 25.5952 23.0117 25.7593 22.0391 25.8022C20.9844 25.8491 20.668 25.8608 18 25.8608C15.3281 25.8608 15.0117 25.8491 13.9609 25.8022C12.9844 25.7593 12.457 25.5952 12.1055 25.4585C11.6406 25.2788 11.3047 25.0601 10.957 24.7124C10.6055 24.3608 10.3906 24.0288 10.2109 23.564C10.0742 23.2124 9.91016 22.6812 9.86719 21.7085C9.82031 20.6538 9.80859 20.3374 9.80859 17.6694C9.80859 14.9976 9.82031 14.6812 9.86719 13.6304C9.91016 12.6538 10.0742 12.1265 10.2109 11.7749C10.3906 11.3101 10.6094 10.9741 10.957 10.6265C11.3086 10.2749 11.6406 10.0601 12.1055 9.88037C12.457 9.74365 12.9883 9.57959 13.9609 9.53662C15.0117 9.48975 15.3281 9.47803 18 9.47803ZM18 7.67725C15.2852 7.67725 14.9453 7.68896 13.8789 7.73584C12.8164 7.78271 12.0859 7.95459 11.4531 8.20068C10.793 8.4585 10.2344 8.79834 9.67969 9.35693C9.12109 9.91162 8.78125 10.4702 8.52344 11.1265C8.27734 11.7632 8.10547 12.4897 8.05859 13.5522C8.01172 14.6226 8 14.9624 8 17.6772C8 20.3921 8.01172 20.7319 8.05859 21.7983C8.10547 22.8608 8.27734 23.5913 8.52344 24.2241C8.78125 24.8843 9.12109 25.4429 9.67969 25.9976C10.2344 26.5522 10.793 26.896 11.4492 27.1499C12.0859 27.396 12.8125 27.5679 13.875 27.6147C14.9414 27.6616 15.2812 27.6733 17.9961 27.6733C20.7109 27.6733 21.0508 27.6616 22.1172 27.6147C23.1797 27.5679 23.9102 27.396 24.543 27.1499C25.1992 26.896 25.7578 26.5522 26.3125 25.9976C26.8672 25.4429 27.2109 24.8843 27.4648 24.228C27.7109 23.5913 27.8828 22.8647 27.9297 21.8022C27.9766 20.7358 27.9883 20.396 27.9883 17.6812C27.9883 14.9663 27.9766 14.6265 27.9297 13.5601C27.8828 12.4976 27.7109 11.7671 27.4648 11.1343C27.2188 10.4702 26.8789 9.91162 26.3203 9.35693C25.7656 8.80225 25.207 8.4585 24.5508 8.20459C23.9141 7.9585 23.1875 7.78662 22.125 7.73975C21.0547 7.68896 20.7148 7.67725 18 7.67725Z'
                      fill='#000100'
                    />
                    <path
                      d='M18 12.5405C15.1641 12.5405 12.8633 14.8413 12.8633 17.6772C12.8633 20.5132 15.1641 22.814 18 22.814C20.8359 22.814 23.1367 20.5132 23.1367 17.6772C23.1367 14.8413 20.8359 12.5405 18 12.5405ZM18 21.0093C16.1602 21.0093 14.668 19.5171 14.668 17.6772C14.668 15.8374 16.1602 14.3452 18 14.3452C19.8398 14.3452 21.332 15.8374 21.332 17.6772C21.332 19.5171 19.8398 21.0093 18 21.0093Z'
                      fill='#000100'
                    />
                    <path
                      d='M24.5391 12.3374C24.5391 13.0015 24 13.5366 23.3398 13.5366C22.6758 13.5366 22.1406 12.9976 22.1406 12.3374C22.1406 11.6733 22.6797 11.1382 23.3398 11.1382C24 11.1382 24.5391 11.6772 24.5391 12.3374Z'
                      fill='#000100'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_117_3423'>
                      <rect
                        width='20'
                        height='20'
                        fill='white'
                        transform='translate(8 7.67725)'
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className='col pt-1 footer-col'>
            <h6 className='fw-bold'>Услуги</h6>
            <a className='footer-link' href='#'>
              START на Маркетплейсах{' '}
            </a>
            <a className='footer-link' href='#'>
              SEO-продвижение{' '}
            </a>
            <a className='footer-link' href='#'>
              Сопровождение{' '}
            </a>
            <a className='footer-link' href='#'>
              Комплексный маркетинг{' '}
            </a>
            <a className='footer-link' href='#'>
              Спец.проекты{' '}
            </a>
            <a className='footer-link' href='#'>
              Тарифы{' '}
            </a>
          </div>
          <div className='col pt-1 footer-col'>
            <h6 className='fw-bold'>Сервис</h6>
            <a className='footer-link' href='#'>
              Расширение{' '}
            </a>
            <a className='footer-link' href='#'>
              Telegram-бот{' '}
            </a>
            <a className='footer-link' href='#'>
              Партнерская программа{' '}
            </a>
          </div>
          <div className='col pt-1 footer-col'>
            <h6 className='fw-bold'>Обучение</h6>
            <a className='footer-link' href='#'>
              Бесплатная база знаний
            </a>
            <a className='footer-link' href='#'>
              Авторские курсы от экспертов «Radar Analytica»
            </a>
            <a className='footer-link' href='#'>
              Вебинары{' '}
            </a>
          </div>
          <div className='col pt-1 footer-col'>
            <h6 className='fw-bold'>О компании</h6>
            <a className='footer-link' href='#'>
              О нас
            </a>
            <a className='footer-link' href='#'>
              Контакты
            </a>
            <a className='footer-link' href='#'>
              Вакансии
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
