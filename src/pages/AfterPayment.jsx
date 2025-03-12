import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './styles.css';
import LimitedFooter from '../components/LimitedFooter';
import NavbarMainHome from '../components/NavbarMainHome';
import SuccessPayment from './images/SuccessPayment.svg';
import SuccessPaymentLight from './images/SuccessPayment.png';
import ImageComponent from '../components/utilsComponents/ImageComponent ';
import CustomButton from '../components/utilsComponents/CustomButton';

const AfterPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentStatus } = location.state;

  const status = paymentStatus === 'success' ? true : false;

  useEffect(() => {
    setTimeout(() => {
      if (status) {
        navigate('/');
      } else {
        navigate('/tariffs');
      }
    }, 5000);
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
    console.log('Try again');
  };

  const renderMessage = (message) =>
    message.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        {index < message.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div className='page-white'>
      <div className='container widbody-container container-xlwidth column-container'>
        <NavbarMainHome onlyLogo />
        <div
          className={`result-payment ${
            status ? 'result-payment_success' : 'result-payment_fail'
          }`}
        >
          <div className='result-payment-box'>
            <div className='result-payment-img'>
              <ImageComponent
                heavyImageSrc={SuccessPayment}
                lightImageSrc={SuccessPaymentLight}
              />
            </div>

            <p className='result-payment-box-title'>
              {renderMessage(paymentMessage)}
            </p>
          </div>
          <div className='result-payment-box result-payment-box_right'>
            <p className='result-payment-box-title result-payment-box-title_blue'>
              {renderMessage(boxTitle)}
            </p>
            <p className='result-payment-box-text'>{renderMessage(boxText)}</p>
            {!status && (
              <CustomButton
                text={'Попробовать еще раз'}
                action={tryAgain}
                className={'prime-btn try-again-btn'}
              />
            )}
          </div>
        </div>
        <LimitedFooter />
      </div>
    </div>
  );
};

export default AfterPayment;
