import React from 'react';
import styles from './FooterNewVersion.module.css';
import faviconBig from '../pages/images/faviconBig.svg';

const FooterNewVersion = () => {
  const handleOpenPage = (url) => {
    window.open(url, '_blank');
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footerHalvesLeft}>
        <div className={styles.footerLogoText}>
          <img src={faviconBig} alt='logo' className={styles.logo} />
          <div className={styles.textFat}>
            Комплексный инструмент для роста
            <br /> продаж на маркетплейсах
          </div>
        </div>
        <div className={styles.linkTextContainer}>
          <span className={styles.linkText} onClick={() => handleOpenPage('how-to-connect-api')}>Подключение к API сервиса</span>
        </div>
        <div>
          <span className={styles.copyrightText}>
            Radar – Analytica © {new Date().getFullYear()}. Все права защищены
          </span>
        </div>
      </div>
      <div className={styles.footerHalvesRight}>
        <div className={styles.navLinks}>
          <a href='https://t.me/SpyRadar_bot' style={{}}>Telegram-бот</a>
          <span onClick={() => handleOpenPage('offer')}>Публичная оферта</span>
          <span onClick={() => handleOpenPage('politics')}>Политика конфиденциальности</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.contactSection}>
          <span>
            ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ СКОРИЧЕНКО ЛИАНА СЕРГЕЕВНА. ИНН
            230307181320. ОГРН 322237500349495. Адрес: 125171 Москва, 5-ый
            Войковский проезд дом 14, помещ 115.
          </span>
          <span>Контакты: radar-analytica@inbox.ru </span>
          <span>
            Данный сайт носит информационно-справочный характер и не является
            публичной офертой
          </span>
        </div>
      </div>
      <div className={styles.footerMobile}>
      <div className={styles.footerLogoTextMobile}>
          <img src={faviconBig} alt='logo' className={styles.logo} />
          <div className={styles.textFatMobile}>
            Комплексный инструмент для роста продаж на маркетплейсах
          </div>
        </div>
        <div className={styles.navLinksMobile}>
        <a href='https://t.me/SpyRadar_bot' style={{}}>Telegram-бот</a>
          <span onClick={() => handleOpenPage('offer')}>Публичная оферта</span>
          <span onClick={() => handleOpenPage('politics')}>Политика конфиденциальности</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.linkTextContainerMobile}>
          <span className={styles.linkTextMobile} onClick={() => handleOpenPage('how-to-connect-api')}>Подключение к API сервиса</span>
        </div>
        <div className={styles.contactSection}>
          <span>
            ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ СКОРИЧЕНКО ЛИАНА СЕРГЕЕВНА. ИНН
            230307181320. ОГРН 322237500349495. Адрес: 125171 Москва, 5-ый
            Войковский проезд дом 14, помещ 115.
          </span>
          <span>Контакты: radar-analytica@inbox.ru </span>
          <span>
            Данный сайт носит информационно-справочный характер и не является
            публичной офертой.
          </span>
        </div>
        <div style={{marginTop: '20px'}}>
          <span className={styles.copyrightText}>
            Radar – Analytica © {new Date().getFullYear()}. Все права защищены
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterNewVersion;
