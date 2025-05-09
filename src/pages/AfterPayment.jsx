import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import styles from './AfterPayment.module.css'
import NavbarMainHome from '../components/NavbarMainHome';
//import SuccessPayment from './images/SuccessPayment.svg';
import successPaymentImg from './images/SuccessPayment.png';
import errorPaymentImg from './images/errorPayment.png';
import CustomButton from '../components/utilsComponents/CustomButton';
import AuthContext from '../service/AuthContext'
import { URL } from '../service/config';


const AfterPayment = () => {
  const { authToken, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const status = location?.state?.paymentStatus && location?.state?.paymentStatus === 'success' ? true : false;

  const refreshUserToken = async () => {
    try {
      const response = await fetch(`${URL}/api/user/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'JWT ' + authToken,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      refreshUserToken().then((res) => {
      navigate('/main')})
    }, 5000);

    return () => {clearTimeout(timeout)}
  }, []);

  const paymentMessage = status
    ? 'Оплата прошла\n успешно!'
    : 'Упс! Что-то пошло\nне так';

  const boxTitle = status
    ? 'Благодарим вас за подключение\n к Radar–аналитике'
    : 'Не беда';

  const boxText = status
    ? 'Через несколько секунд вы будете\n перенаправлены на страницу сервиса и сможете\n подключить свой первый магазин'
    : 'Попробуйте вернуться и провести оплату еще раз';

  const tryAgain = () => {
    navigate('/main')
  };

  return (
    <div className={styles.page}>
      <section className={styles.page__headerWrapper}>
        <NavbarMainHome onlyLogo />
      </section>
      <section className={styles.page__content}>

        <div className={status ? `${styles.infoBox} ${styles.infoBox_success}` : `${styles.infoBox} ${styles.infoBox_error}`}>
          <div className={styles.infoBox__header}>
            <div className={styles.infoBox__headerImgWrapper}>
              <img src={status ? successPaymentImg : errorPaymentImg} alt='' className={styles.infoBox__img} />
            </div>
            <h1 className={`${styles.infoBox__title} ${styles.infoBox__title_header}`}>{paymentMessage}</h1>
          </div>

          <div className={styles.infoBox__boxContent}>
            <h2 className={`${styles.infoBox__title} ${styles.infoBox__title_blue}`}>{boxTitle}</h2>
            <p className={styles.infoBox__text}>{boxText}</p>
            {!status && (
              <CustomButton
                text={'Попробовать еще раз'}
                action={tryAgain}
                className={'prime-btn try-again-btn'}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AfterPayment;
