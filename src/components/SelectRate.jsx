import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import OrangeLabelSelect from '../pages/images/OrangeLabelSelect';
// import logoStart from '../pages/images/logoForCardStart.png';
// import logoPro from '../pages/images/logoForCardPro.png';
import logoProPlus from '../pages/images/logoForCardProPlus.png';
import Steps from '../pages/images/Steps';
import OneRuble from '../pages/images/OneRuble.svg';
import BlueSwich from '../pages/images/BlueSwich.svg';
// import StartLogo from '../assets/startlogo.svg';
// import FireLogo from '../assets/firelogo.svg';
import AuthContext from '../service/AuthContext';
import axios from 'axios';
import ReviewsUsers from '../components/ReviewsUsers';
import BlockImg_x1 from "../pages/images/Dashboard_x1.png";
import BlockImg_x2 from "../pages/images/Dashboard_x2.png";
import SolLabelStartBsn from '../pages/images/SolLabelStartBsn';
import YellowRadarPoint from '../pages/images/YellowRadarPoint';
import CustomButton from './utilsComponents/CustomButton';
import { URL } from '../service/config';
import lowResImage from '../pages/images/imageFonStartBsn_comp.png'; // the low-res image
import highResImage from '../pages/images/imageFonStartBsn.png'; // the high-res image
import styles from '../pages/TariffsPage.module.css';
import thumbup from '../pages/images/thumbup.png';
import ImageComponent from './utilsComponents/ImageComponent ';
import { ServiceFunctions } from '../service/serviceFunctions';
import { periodStringFormat } from '../service/utils'

const SelectRate = ({ redirect, isShowText }) => {
  const { user, authToken } = useContext(AuthContext);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('1month');
  const [trialExpired, setTrialExpired] = useState(user?.is_test_used);
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(
    user?.is_subscription_discount
  );

  const navigate = useNavigate();
  if (user?.is_test_used !== trialExpired) {
    user?.is_test_used ? setTrialExpired(true) : setTrialExpired(false);
  }
  if (user?.is_subscription_discount !== subscriptionDiscount) {
    user?.is_subscription_discount
      ? setSubscriptionDiscount(true)
      : setSubscriptionDiscount(false);
  }

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };
  const userIdInvoiceHardCode = 'radar-51-20240807-161128';

  const currentPath = window.location.pathname;
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const loadCloudPaymentsScript = () => {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudpayments.ru/bundles/cloudpayments.js';
      script.async = true;

      script.onload = () => {
        setIsScriptLoaded(true);
      };

      document.body.appendChild(script);
    };

    if (!window.cp) {
      loadCloudPaymentsScript();
    } else {
      setIsScriptLoaded(true);
    }

    return () => {
      const script = document.querySelector('script[src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = highResImage;

  //   img.onload = () => {
  //     // When high-res image is fully loaded, change
  //     setHighResLoaded(true);
  //   };
  // }, [highResImage]);

  useEffect(() => {
    const img = new Image();
    img.src = highResImage;

    img.onload = () => {
      setHighResLoaded(true); // High-res image is fully loaded
    };
  }, []);

  const refreshUserToken = async () => {
    try {
      // const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${URL}/api/user/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'JWT ' + authToken,
        },
      });
      // console.log('response', response);

      if (response.status === 200) {
        const data = await response.json();
        // localStorage.setItem("authToken", data.token);
        // user?.is_test_used ? setTrialExpired(true) : setTrialExpired(false)
        return data.token;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const pay = async (_user, _period, _trial) => {
    const refresh_result = await refreshUserToken();
    // console.log('refresh_result', refresh_result);

    // localStorage.setItem("authToken", refresh_result);
    const decodedUser = jwtDecode(refresh_result);
    console.log('decodedUser:', decodedUser);
    let newTrialExpired;
    if (decodedUser.is_test_used) {
      setTrialExpired(true);
      newTrialExpired = true;
    } else {
      setTrialExpired(false);
      newTrialExpired = false;
    }

    // console.log('user', user);
    // console.log('selectedPeriod', selectedPeriod);
    // console.log('trialExpired', trialExpired);
    // console.log('newTrialExpired', newTrialExpired);

    let periodSubscribe = '';
    let amountSubscribe = 0;
    let firstAmount = 0;
    let startDateSubscribe = new Date();
    // проверяем время с 10:10 по 10 мск
    if (startDateSubscribe.getUTCHours() > 7 || (startDateSubscribe.getUTCHours() == 7 && startDateSubscribe.getUTCMinutes() < 10)) {
      startDateSubscribe.setDate(startDateSubscribe.getDate() + 1);
    }
    // ставим время платежа на 10 мск
    startDateSubscribe.setUTCHours(7, 0, 0, 0);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const invoiceId = `radar-${user.id}-${new Date()
      .toLocaleString('ru', options)
      .replaceAll('.', '')
      .replaceAll(', ', '-')
      .replaceAll(':', '')}`;

    if (selectedPeriod === '1month') {
      amountSubscribe = 2990;
      firstAmount = newTrialExpired ? 2990 : 1;
      periodSubscribe = 1;
      if (!!newTrialExpired) {
        startDateSubscribe.setMonth(
          startDateSubscribe.getMonth() + periodSubscribe
        );
      } else {
        startDateSubscribe.setDate(startDateSubscribe.getDate() + (user?.test_days || 3));
      }
    }
    if (selectedPeriod === '3month') {
      amountSubscribe = 8073;
      firstAmount = !subscriptionDiscount ? 8073 : 4485;
      periodSubscribe = 3;
      startDateSubscribe.setMonth(
        startDateSubscribe.getMonth() + periodSubscribe
      );
    }
    if (selectedPeriod === '6month') {
      amountSubscribe = 10764;
      firstAmount = !subscriptionDiscount ? 10764 : 5382;
      periodSubscribe = 6;
      startDateSubscribe.setMonth(
        startDateSubscribe.getMonth() + periodSubscribe
      );
    }
    // console.log('periodSubscribe', periodSubscribe);
    // console.log('firstAmount', firstAmount);
    // console.log('amountSubscribe', amountSubscribe);
    // console.log(
    //   'startDateSubscribe',
    //   startDateSubscribe.toISOString().split('T')[0]
    // );
    startDateSubscribe = startDateSubscribe.toISOString().split('T')[0];
    startDateSubscribe = `${startDateSubscribe}T07:00:00`
    // console.log('startDateSubscribe', startDateSubscribe);
    // eslint-disable-next-line no-undef
    var widget = new cp.CloudPayments({
      language: 'ru-RU',
      email: user.email,
      applePaySupport: false,
      googlePaySupport: false,
      yandexPaySupport: true,
      tinkoffPaySupport: true,
      tinkoffInstallmentSupport: false,
      sbpSupport: true,
      // sberSupport: true,
      // sberPaySupport: true,
    });

    const receipt = {
      Items: [
        //товарные позиции
        {
          label: 'Подписка Радар Аналитика', //наименование товара
          price: amountSubscribe, //цена
          quantity: 1.0, //количество
          amount: amountSubscribe, //сумма
          vat: 20, //ставка НДС
          method: 0, // тег-1214 признак способа расчета - признак способа расчета
          object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
        },
      ],
      email: user.email, //e-mail покупателя, если нужно отправить письмо с чеком
      phone: '', //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
      isBso: false, //чек является бланком строгой отчетности
      amounts: {
        electronic: amountSubscribe, // Сумма оплаты электронными деньгами
        advancePayment: 0.0, // Сумма из предоплаты (зачетом аванса) (2 знака после точки)
        credit: 0.0, // Сумма постоплатой(в кредит) (2 знака после точки)
        provision: 0.0, // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после точки)
      },
    };

    const data = {};
    data.CloudPayments = {
      CustomerReceipt: receipt, //чек для первого платежа
      recurrent: {
        interval: 'Month',
        period: periodSubscribe,
        startDate: startDateSubscribe,
        amount: amountSubscribe,
        customerReceipt: receipt, //чек для регулярных платежей
      },
    };

    await widget.charge(
      {
        // options
        publicId: 'pk_1359b4923cc282c6f76e05d9f138a', //id из личного кабинета
        description: 'Оплата подписки в Radar Analityca', //назначение
        amount: firstAmount, //сумма
        currency: 'RUB', //валюта
        invoiceId: invoiceId, //номер заказа  (необязательно)
        email: user.email,
        accountId: `radar-${user.id}`, //идентификатор плательщика (обязательно для создания подписки)
        data: data,
      },
      function (options) {
        // success - действие при успешной оплате
        // TODO отправка запроса в сервис бэкенда на обновление данных user
        // (/api/user Patch subscription_status: ['Test', 'Month 1', 'Month 3', 'Month 6'],
        // subscription_start_date: TODAY, is_test_used: true (если выбран тестовый период, если нет - не передавать))

        // Helper function to map selectedPeriod to the correct string
        const mapPeriodToStatus = (period) => {
          switch (period) {
            case 'test':
              return 'Test';
            case '1month':
              return 'Month 1';
            case '3months':
              return 'Month 3';
            case '6months':
              return 'Month 6';
            default:
              return period; // fallback to original value if no match
          }
        };

        // Prepare the update data
        const updateData = {
          subscription_status: [mapPeriodToStatus(selectedPeriod)],
          subscription_start_date: new Date().toISOString().split('T')[0],
          invoice_id: invoiceId,
        };

        // Add is_test_used only if it's a test period
        if (selectedPeriod === '1month') {
          updateData.is_test_used = true;
        }
        // Send PATCH request
        axios
          .post(`${URL}/api/user/subscription`, updateData, {
            headers: {
              'content-type': 'application/json',
              authorization: 'JWT ' + authToken,
            },
          })
          .then((res) => {
            console.log('patch /api/user', res.data);
            // localStorage.setItem('authToken', res.data.auth_token);
            navigate('/after-payment', { state: { paymentStatus: 'success' } });
          })
          .catch((err) => console.log('patch /api/user', err));
        // console.log('Payment success:', 'options', options);
      },

      function (reason, options) {
        // fail
        //действие при неуспешной оплате

        ServiceFunctions.getFailPaymentStatus(authToken)
          .then(res => {
            if (res.message === 'No correct subscription') {
              widget.close();
            } else if (res.id && res.auth_token) {
              widget.close();
              navigate('/after-payment', { state: { paymentStatus: 'success' } });
            }
          }).catch(err => {
            console.log('Payment verification failed:', err);
            widget.close();
            navigate('/after-payment', { state: { paymentStatus: 'error' } });
          });

        // console.log('Payment fail:', 'reason', reason, 'options', options);
      }
    );

    //   widget.pay('charge', // или 'charge'
    //       { //options
    //           publicId: 'pk_1359b4923cc282c6f76e05d9f138a', //id из личного кабинета
    //           description: 'Оплата подписки в Radar Analityca', //назначение
    //           amount: amount, //сумма
    //           currency: 'RUB', //валюта
    //           accountId: user.id, //идентификатор плательщика (необязательно)
    //         //  invoiceId: '1234567', //номер заказа  (необязательно)
    //           email: user.email, //email плательщика (необязательно)
    //           skin: "modern", //дизайн виджета (необязательно)
    //       },
    //       {
    //           onSuccess: function (options) { // success
    //               //действие при успешной оплате
    //               console.log('Payment success:', 'options', options);

    //           },
    //           onFail: function (reason, options) { // fail
    //               //действие при неуспешной оплате
    //               console.log('Payment fail:', 'reason', reason, 'options', options);

    //           },
    //           onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
    //               //например вызов вашей аналитики Facebook Pixel
    //               console.log('Payment complete:', 'paymentResult', paymentResult, 'options', options);
    //           }
    //       }
    //   )
  };

  return (
    <>
      {isShowText && (
        <>
          <div className={styles.upBlockWrapper}>
            <div className={styles.leftBlock}>
              <div className={styles.imageBox}>
                <img src={thumbup} alt='thumbup' />
                <div className={styles.imageText}>
                  Спасибо
                  <br /> за регистрацию
                  <br /> в сервисе Radar!
                </div>
              </div>
              <div className={styles.downTextblock}>
                <span className={styles.downText}>
                  Желаем вам успехов и надеемся, что вы останетесь довольны
                  нашим сервисом!
                </span>
              </div>
            </div>
            {user.is_test_used ? (
              <div></div>
            ) : (
              <div className={styles.rightBlock}>
                <div className={styles.blockBackground}>
                  <div className={styles.accessTitle}>
                    <span className={styles.activateAccess}>
                      На этой странице вы можете активировать тестовый доступ на {periodStringFormat(user?.test_days)}
                    </span>
                  </div>
                  <div className={styles.accessPrice}>
                    <div
                      className={styles.accessPeriod}
                      style={{ marginRight: '24px' }}
                    >
                      Доступ:
                      <span className={styles.accessPeriodBold}>{periodStringFormat(user?.test_days)}</span>
                    </div>
                    <div className={styles.accessPeriod}>
                      Стоимость:
                      <span className={styles.accessPeriodBold}>1 ₽</span>
                    </div>
                  </div>
                  <div className={styles.accessButton}>
                    <button
                      onClick={() => {
                        pay(user.id, selectedPeriod, trialExpired);
                      }}
                    >
                      Активировать тестовый период за 1₽
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
          {user.is_test_used ? (
            <div></div>
          ) : (

            <div className={styles.infoBlockWrapper}>
              <div className={styles.infoBlockTitle}>
                Почему активация тестового периода стоит 1₽?
              </div>
              <div className={styles.infoBlockTextSimple}>
                Предоставление тестового доступа без ограничений по функционалу
                требует затрат со стороны сервиса. Поэтому мы взимаем
                символическую плату в размере 1₽ за активацию тестового периода,
                чтобы наши ресурсы расходовались только на тех продавцов, кто
                действительно заинтересован в тестировании аналитики. Оплата
                доступна всеми возможными способами и занимает не более 45 секунд.
              </div>
            </div>
          )}

        </>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
        }}
      >
        {/* <div className='doughnut-content'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(83, 41, 255, 1)',
              padding: '20px',
              borderRadius: '20px',
              width: '50%',
            }}
          >
            <div
              style={{
                fontWeight: '700',
                fontSize: '32px',
                color: 'white',
                width: '100%',
              }}
            >
              Здесь есть всё, что нужно любому бизнесу на маркетплейсе
            </div>
            <div className='OrangeLabel'>
              <OrangeLabelSelect />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: '46px', fontWeight: '700' }}>
              Выберите тариф, который подойдет{' '}
              <span style={{ color: '#F0AD00', fontWeight: '800' }}>
                именно Вам
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#1A1A1A08',
                padding: '5px',
                borderRadius: '10px',
              }}
            >
              <button
                onClick={() => handlePeriodChange('1month')}
                className={
                  selectedPeriod === '1month' ? 'prime-btn' : 'secondary-btn'
                }
                id='btnDop'
              >
                {selectedPeriod === '1month' ? <Steps.Circle /> : <span></span>}
                1 месяц
              </button>
              <button
                onClick={() => handlePeriodChange('3month')}
                className={
                  selectedPeriod === '3month' ? 'prime-btn' : 'secondary-btn'
                }
                id='btnDop'
              >
                {selectedPeriod === '3month' ? <Steps.Circle /> : <span></span>}
                3 месяца <span>-10%</span>
              </button>
              <button
                onClick={() => handlePeriodChange('6month')}
                className={
                  selectedPeriod === '6month' ? 'prime-btn' : 'secondary-btn'
                }
                id='btnDop'
              >
                {selectedPeriod === '6month' ? <Steps.Circle /> : <span></span>}
                6 месяцев <span>до -60%</span>
              </button>
            </div>
          </div>
        </div> */}
        <div className={`price-wrap ${styles.priceWrap}`}>
          <div className={`landing-price-wrap ${styles.landingPriceWrap}`}>
            <div className={`landing-price-wrap-main ${styles.landingPriceWrapMain}`}>
              <div className={`landing-price-wrap-header ${styles.landingPriceWrapHeader}`}>
                Здесь есть всё, что нужно любому бизнесу на маркетплейсе
              </div>
              <div className={`OrangeLabel  ${styles.orangeLabel}`}>
                <img src={BlueSwich} label='swich' />
              </div>
            </div>
            <div className='landing-price'>
              <p className={`landing-price-text ${styles.landingPriceText}`}>
                Это то, что подойдет
                <br />
                именно
                <span> Вам!</span>
              </p>
              <p className={`landing-price-text-main ${styles.landingPriceTextMain}`}>
                Мы предлагаем один тариф,
                <br /> который даст полный доступ к<br /> нашей аналитике и ко
                всему ее функционалу!
              </p>
              <div className='landing-price-btn'>
                <p className={`landing-price-btn-text ${styles.landingPriceBtnText}`}>
                  Мы дарим тестовый доступ на {periodStringFormat(user?.test_days)} <br />
                  <span> всего за</span>
                </p>
                <p className='landing-price-btn-text-mobile'>
                  Мы дарим тестовый доступ на {periodStringFormat(user?.test_days)} <br />
                  <span> всего за</span>
                </p>
                <img src={OneRuble} alt='ruble'></img>
              </div>
            </div>
          </div>
          {/* Не удалять!!! */}
          {/* <div className='cardPrice'>
            <div className='HeadCardStart'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                <div
                  style={{
                    color: '#F0AD00',
                    fontWeight: '700',
                    fontSize: '30px',
                  }}
                >
                  Start
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#F0AD00',
                    borderRadius: '10px',
                    padding: '4px',
                    color: 'white',
                    fontSize: '18px',
                  }}
                >
                  <img src={StartLogo} style={{ width: '20%' }} />{' '}
                  <div>Для начала</div>
                </div>
              </div>
              <div className='selectPrice'>
                {' '}
                {selectedPeriod === '1month' && (
                  <span className='priceCardOne'>2 990 ₽</span>
                )}
                {selectedPeriod === '3month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>8 073 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      8 970 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -10%
                    </span>
                  </span>
                )}
                {selectedPeriod === '6month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>10 764 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      17 940 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -40%
                    </span>
                  </span>
                )}
                <div>В месяц</div>
              </div>

              <button
                className='btn-warning'
                style={{
                  minHeight: '64px',
                  fontSize: '18px',
                  marginTop: '15px',
                }}
                onClick={() => redirect()}
              >
                Попробовать бесплатно
              </button>
            </div>
            <div className='bodyCardStart'>
              <div className='labelCard'>
                Оборот селлера:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  До 1 млн Р / мес
                </div>
              </div>
              <div className='labelCard'>
                Функционал
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  Полный функционал
                </div>
              </div>
              <div className='labelCard'>
                Количество магазинов:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>1</div>
              </div>
            </div>
          </div> */}
          {/* <div className='cardPrice'>
            <div className='HeadCardPro'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                <div
                  style={{
                    color: '#5329FF',
                    fontWeight: '700',
                    fontSize: '30px',
                  }}
                >
                  PRO
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#5329FF',
                    borderRadius: '10px',
                    padding: '4px',
                    color: 'white',
                    fontSize: '18px',
                  }}
                >
                  <img src={FireLogo} style={{ width: '20%' }} />{' '}
                  <div>Популярно</div>
                </div>
              </div>
              <div className='selectPrice'>
                {' '}
                {selectedPeriod === '1month' && (
                  <span className='priceCardOne'>4 490 ₽</span>
                )}
                {selectedPeriod === '3month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>12 123 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      13 470 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -10%
                    </span>
                  </span>
                )}
                {selectedPeriod === '6month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>13 470 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      26 940 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -50%
                    </span>
                  </span>
                )}
                <div>В месяц</div>
              </div>

              <button
                className='prime-btn'
                style={{
                  minHeight: '64px',
                  fontSize: '18px',
                  marginTop: '15px',
                }}
                onClick={() => redirect()}
              >
                Попробовать бесплатно
              </button>
            </div>
            <div className='bodyCardStart'>
              <div className='labelCard'>
                Оборот селлера:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  До 6 млн Р / мес
                </div>
              </div>
              <div className='labelCard'>
                Функционал
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  Полный функционал
                </div>
              </div>
              <div className='labelCard'>
                Количество магазинов:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>До 3</div>
              </div>
              <div className='bonusPro'>
                Бонус:
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '500',
                  }}
                >
                  <Steps.CircleOkBlue />
                  <span style={{ marginLeft: '5px' }}>Личный менеджер</span>
                </div>
              </div>
            </div>
          </div> */}
          <div className={`cardsBlockMain ${styles.cardsBlockMain}`}>
            <div className='cardPrice cardPrice_color'>
              <div className='HeadCardProPlus'>
                <div className='HeadCardProPlusMain'>
                  <div className='HeadCardProPlusMainText'>Smart</div>
                  <div className={`HeadCardProPlusBestDes ${styles.HeadCardProPlusBestDes}`}>
                    <img src={logoProPlus} />
                    <div className='TextBestDes'>Лучший выбор</div>
                  </div>
                </div>
                <div className='selectPrice'>
                  {selectedPeriod === '1month' && (
                    <>
                      {subscriptionDiscount ? (
                        <>
                          <span className='priceCardOne'>
                            {!trialExpired ? '1 ₽' : '1 495 ₽'}
                          </span>
                          <span
                            style={{
                              marginLeft: '10px',
                              textDecoration: 'line-through',
                            }}
                          >
                            2 990 ₽
                          </span>
                          <span
                            style={{
                              marginLeft: '10px',
                              color: '#5329FF',
                              backgroundColor: '#5329FF1A',
                              fontWeight: '700',
                            }}
                          >
                            {!trialExpired ? '-99%' : '-50%'}
                          </span>
                          <div>За месяц</div>
                        </>
                      ) : (
                        <>
                          <span className='priceCardOne'>
                            {!trialExpired ? '1 ₽' : '2 990 ₽'}
                          </span>
                          {!trialExpired && (
                            <>
                              <span
                                style={{
                                  marginLeft: '10px',
                                  textDecoration: 'line-through',
                                }}
                              >
                                2 990 ₽
                              </span>
                              <span
                                style={{
                                  marginLeft: '10px',
                                  color: '#5329FF',
                                  backgroundColor: '#5329FF1A',
                                  fontWeight: '700',
                                }}
                              >
                                -99%
                              </span>
                            </>
                          )}
                          <div>
                            {!trialExpired
                              ? `Тестовый доступ на ${periodStringFormat(user?.test_days)}`
                              : 'За месяц'}
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {selectedPeriod === '3month' && (
                    <>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <span className='priceCardOne'>
                          {!subscriptionDiscount ? '8 073 ₽' : '4 485 ₽'}
                        </span>
                        <span
                          style={{
                            marginLeft: '10px',
                            textDecoration: 'line-through',
                          }}
                        >
                          {!subscriptionDiscount ? '8 970 ₽' : '8 073 ₽'}
                        </span>
                        <span
                          style={{
                            marginLeft: '10px',
                            color: '#5329FF',
                            backgroundColor: '#5329FF1A',
                            fontWeight: '700',
                          }}
                        >
                          {!subscriptionDiscount ? '-10%' : '-50%'}
                        </span>
                      </span>
                      <div>За 3 месяцев</div>
                    </>
                  )}
                  {selectedPeriod === '6month' && (
                    <>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <span className='priceCardOne'>
                          {!subscriptionDiscount ? '10 764 ₽' : '5 382 ₽'}
                        </span>
                        <span
                          style={{
                            marginLeft: '10px',
                            textDecoration: 'line-through',
                          }}
                        >
                          {!subscriptionDiscount ? '17 940 ₽' : '10 764 ₽'}
                        </span>
                        <span
                          style={{
                            marginLeft: '10px',
                            color: '#5329FF',
                            backgroundColor: '#5329FF1A',
                            fontWeight: '700',
                          }}
                        >
                          {!subscriptionDiscount ? '-40%' : '-50%'}
                        </span>
                      </span>
                      <div>За 6 месяцев</div>
                    </>
                  )}
                </div>

                <button
                  className='btn-black'
                  style={{
                    minHeight: '64px',
                    fontSize: '18px',
                    marginTop: '15px',
                  }}
                  onClick={() => {
                    if (currentPath === '/') {
                      if (user) {
                        window.open('/tariffs', '_blank');
                      }
                      if (!user) {
                        navigate('/signup');
                      }
                    } else {
                      pay(user.id, selectedPeriod, trialExpired);
                    }
                  }}
                >
                  Активировать сервис
                </button>
              </div>
              <div className='bodyCardProPlus'>
                <div className='labelCard'>
                  <p>Оборот селлера:</p>
                  <div style={{ fontSize: '20px', fontWeight: '500' }}>
                    Любой. Без лимитов и ограничений
                  </div>
                </div>
                <div className='labelCard'>
                  <p>Функционал</p>
                  <div style={{ fontSize: '20px', fontWeight: '500' }}>
                    Полный доступ. Без ограничений
                  </div>
                </div>
                <div className='labelCard'>
                  <p>Количество магазинов:</p>
                  <div style={{ fontSize: '20px', fontWeight: '500' }}>
                    Можно подключить одновременно до 20 магазинов
                  </div>
                </div>
                <div className='bonusProPlus'>
                  Бонус:
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: '500',
                    }}
                  >
                    <div>
                      <Steps.CircleOkWhite />
                      <span style={{ marginLeft: '5px' }}>личный менеджер</span>
                    </div>
                    <div>
                      <Steps.CircleOkWhite />
                      <span style={{ marginLeft: '5px' }}>
                        приоритетная поддержка
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#1A1A1A08',
                padding: '5px',
                borderRadius: '10px',
                marginTop: '20px',
              }}
            >
              <button
                onClick={() => handlePeriodChange('1month')}
                className={` ${selectedPeriod === '1month' ? 'prime-btn' : 'secondary-btn'
                  }`}
                style={{
                  fontSize: window.innerWidth < 768 ? '15px' : '18px', // Динамический размер шрифта
                }}
                id='btnDop'
              >
                {selectedPeriod === '1month' ? <Steps.Circle /> : <span></span>}
                1 месяц{' '}
                <span className='saleTextMobile'>
                  {!subscriptionDiscount ? '' : '-50%'}
                </span>
              </button>
              <button
                onClick={() => handlePeriodChange('3month')}
                className={`monthesText ${selectedPeriod === '3month' ? 'prime-btn' : 'secondary-btn'
                  }`}
                style={{
                  fontSize: window.innerWidth < 768 ? '15px' : '18px', // Динамический размер шрифта
                }}
                id='btnDop'
              >
                {selectedPeriod === '3month' ? <Steps.Circle /> : <span></span>}
                3 месяца{' '}
                <span className='saleTextMobile'>
                  {!subscriptionDiscount ? '-10%' : '-50%'}
                </span>
              </button>
              <button
                onClick={() => handlePeriodChange('6month')}
                className={`monthesTextBtn ${selectedPeriod === '6month' ? 'prime-btn' : 'secondary-btn'
                  }`}
                style={{
                  fontSize: window.innerWidth < 768 ? '15px' : '18px',
                }}
                id='btnDop'
              >
                {selectedPeriod === '6month' ? <Steps.Circle /> : <span></span>}
                <span>6 месяцев </span>
                <span className='saleTextMobile'>
                  {!subscriptionDiscount ? 'до -40%' : '-50%'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {currentPath === '/tariffs' && (
        <>
          <ReviewsUsers />
          <div
            className={`${styles.widSolutionMainImg} wid-solutionMain ${isHighResLoaded ? 'highResMain' : 'lowResMain'}`}
          >
            <div className={` ${styles.solDescription} sol-description col`} style={{ padding: 0 }}>
              <div className='headStartBsn'>
                <SolLabelStartBsn />
                <div className='wid-solutionMainReady'>Готовы начать?</div>
                <div className='wid-solutionMainText'>
                  Найдите прибыльные товары на маркетплейсе и развивайте свой
                  бизнес.
                </div>
                <div className='YellowRadarPoint' style={{ marginTop: '20px' }}>
                  <YellowRadarPoint />
                </div>
              </div>

              <div className='d-flex flex-column gap-3'>
                <CustomButton
                  text={'Активировать сервис'}
                  action={() => {
                    pay(user.id, selectedPeriod, trialExpired);
                  }}
                  className={`white-btn ${styles.whiteBtn}`}
                />
              </div>
            </div>
            <div className={`sol-screenshot sol-screenshot_bottom ${styles.solScreenshotBbottom}`}>
              <ImageComponent
                heavyImageSrc={BlockImg_x2}
                lightImageSrc={BlockImg_x1}
              />
            </div>
          </div>
        </>
      )
      }
    </>
  );
};
export default SelectRate;
