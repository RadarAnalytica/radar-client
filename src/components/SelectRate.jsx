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
    if (startDateSubscribe.getUTCHours() > 10 || (startDateSubscribe.getUTCHours() == 10 && startDateSubscribe.getUTCMinutes() > 10)) {
      startDateSubscribe.setDate(startDateSubscribe.getDate() + 1);
    }
    // ставим время платежа на 10 мск
    startDateSubscribe.setUTCHours(10, 0, 0, 0);
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
      firstAmount = 2990;
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
    startDateSubscribe = `${startDateSubscribe}T10:00:00`
    // console.log('startDateSubscribe', startDateSubscribe);
    // eslint-disable-next-line no-undef
    var widget = new cp.CloudPayments({
      language: 'ru-RU',
      email: user.email,
      // applePaySupport: false,
      // googlePaySupport: false,
      // yandexPaySupport: true,
      tinkoffPaySupport: true,
      tinkoffInstallmentSupport: false,
      // sberSupport: true,
      sberPaySupport: true,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
        }}
      >
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
                <svg width="134" height="110" viewBox="0 0 94 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9.99023" width="84.6472" height="55.2027" rx="8" transform="rotate(10.4261 9.99023 0)" fill="#1A1A1A" />
                  <path d="M55.5153 47.5523L56.3175 43.1925L53.8784 42.7437L54.3553 40.1522L56.7943 40.601L57.1983 38.4059L54.7592 37.9571L55.2417 35.3351L57.6807 35.7839L59.4703 26.0582L66.9094 27.427C68.4948 27.7187 69.7858 28.24 70.7824 28.9907C71.779 29.7414 72.4739 30.6468 72.8673 31.7068C73.2644 32.7465 73.3507 33.8761 73.1263 35.0957C72.8907 36.3762 72.406 37.4112 71.6724 38.2008C70.9387 38.9904 69.9883 39.53 68.8213 39.8196C67.6581 40.0889 66.2939 40.0795 64.7288 39.7915L61.9239 39.2754L61.52 41.4706L66.1847 42.3289L65.7079 44.9204L61.0432 44.0621L60.2409 48.4219L55.5153 47.5523ZM62.3454 36.6422L64.571 37.0518C65.7296 37.2649 66.6605 37.1735 67.3638 36.7776C68.0874 36.3854 68.5483 35.6507 68.7465 34.5734C68.9484 33.4759 68.7793 32.6252 68.2389 32.0215C67.7227 31.4011 66.8853 30.9844 65.7267 30.7712L63.5011 30.3617L62.3454 36.6422Z" fill="white" />
                  <path d="M43.239 45.6401C40.6577 45.1651 38.8434 43.8331 37.7963 41.6441C36.7732 39.4386 36.587 36.5675 37.2377 33.0309C37.8997 29.4333 39.0938 26.8266 40.82 25.211C42.5703 23.5788 44.7361 23.0002 47.3174 23.4752C49.9191 23.9539 51.7371 25.2655 52.7714 27.4101C53.8094 29.5344 53.9993 32.3852 53.3411 35.9624C52.6866 39.5194 51.4888 42.1463 49.7476 43.8432C48.0102 45.5198 45.8406 46.1188 43.239 45.6401ZM43.9458 41.7986C45.1247 42.0155 46.1053 41.597 46.8876 40.5432C47.6939 39.4728 48.3309 37.6672 48.7984 35.1265C49.2659 32.5859 49.3077 30.7023 48.924 29.476C48.5606 28.2534 47.7895 27.5336 46.6106 27.3167C45.4317 27.0998 44.4447 27.496 43.6496 28.5055C42.8747 29.5186 42.2555 31.2854 41.7917 33.8058C41.3205 36.3668 41.2711 38.2909 41.6436 39.5783C42.0199 40.8453 42.7873 41.5854 43.9458 41.7986Z" fill="white" />
                  <path d="M18.9532 40.8247L19.6713 36.9222L24.5494 37.8198L27.057 24.1916L29.2827 24.6011L21.9904 27.2309L22.8094 22.7796L29.1583 20.4806L32.5425 21.1033L29.3055 38.695L33.8787 39.5365L33.1607 43.439L18.9532 40.8247Z" fill="white" />
                </svg>

                {/* <img src={OneRuble} alt='ruble'></img> */}
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
                            1 495 ₽
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
                            -50%
                          </span>
                          <div>За месяц</div>
                        </>
                      ) : (
                        <>
                          <span className='priceCardOne'>
                            2 990 ₽
                          </span>

                          <div>
                            За месяц
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
