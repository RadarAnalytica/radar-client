import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import styles from './RestoreError.module.css'
import NavbarMainHome from '../components/NavbarMainHome';
//import SuccessPayment from './images/SuccessPayment.svg';
import successPaymentImg from './images/SuccessPayment.png';
import errorPaymentImg from './images/errorPayment.png';
import CustomButton from '../components/utilsComponents/CustomButton';
import AuthContext from '../service/AuthContext'
import { URL } from '../service/config';


const RestoreError = () => {
  const navigate = useNavigate();

  const tryAgain = () => {
    navigate('/reset')
  };

  return (
    <div className={styles.page}>
      <section className={styles.page__headerWrapper}>
        <NavbarMainHome onlyLogo />
      </section>
      <section className={styles.page__content}>

        <div className={`${styles.infoBox} ${styles.infoBox_error}`}>
          <div className={styles.infoBox__header}>
            <div className={styles.infoBox__headerImgWrapper}>
              <img src={errorPaymentImg} alt='' className={styles.infoBox__img} />
            </div>
            {/* <h1 className={`${styles.infoBox__title} ${styles.infoBox__title_header}`}>Упс!</h1> */}
          </div>

          <div className={styles.infoBox__boxContent}>
            <h2 className={`${styles.infoBox__title} ${styles.infoBox__title_blue}`}>Ссылка не действительна :(</h2>
            <p className={styles.infoBox__text}>
              Похоже что эта ссылка не действительна, но вы можете попробовать еще раз перейдя кликнув на кнопку ниже!
            </p>
              <CustomButton
                text={'Попробовать еще раз'}
                action={tryAgain}
                className={'prime-btn try-again-btn'}
              />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestoreError;
