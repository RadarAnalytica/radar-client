import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrangeLabelSelect from '../pages/images/OrangeLabelSelect';
import logoStart from '../pages/images/logoForCardStart.png';
import logoPro from '../pages/images/logoForCardPro.png';
import logoProPlus from '../pages/images/logoForCardProPlus.png';
import Steps from '../pages/images/Steps';
import OneRuble from '../pages/images/OneRuble.svg';
import BlueSwich from '../pages/images/BlueSwich.svg';
import StartLogo from '../assets/startlogo.svg';
import FireLogo from '../assets/firelogo.svg';
import AuthContext from '../service/AuthContext';
import axios from 'axios';
import ReviewsUsers from '../components/ReviewsUsers';
import BlockImg_x2 from '../pages/images/Dashboard_x2.png';
import SolLabelStartBsn from '../pages/images/SolLabelStartBsn';
import YellowRadarPoint from '../pages/images/YellowRadarPoint';
import CustomButton from './utilsComponents/CustomButton';
import { URL } from '../service/config';

const SelectRate = ({ redirect }) => {
  const { user, authToken } = useContext(AuthContext);
  const [selectedPeriod, setSelectedPeriod] = useState('1month');
  const [trialExpired, setTrialExpired] = useState(user?.is_test_used);
  const navigate = useNavigate();

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };
  const userIdInvoiceHardCode = 'radar-51-20240807-161128'

  const currentPath = window.location.pathname;

  const pay = (_user, _period, _trial) => {
    console.log('user.email', user);
    console.log('selectedPeriod', selectedPeriod)
    console.log('trialExpired', trialExpired)
    let periodSubscribe = ''
    let amountSubscribe = 0
    let firstAmount = 0
    let startDateSubscribe = ''
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    const invoiceId = `radar-${user.id}-${new Date().toLocaleString("ru", options).replaceAll('.', '').replaceAll(', ', '-').replaceAll(':', '')}`

    if (selectedPeriod === '1month') {
      amountSubscribe = 2990
      firstAmount = !!trialExpired ? 2990 : 1
      periodSubscribe = 1
      startDateSubscribe = new Date()
      if (!!trialExpired) {
        startDateSubscribe.setMonth(startDateSubscribe.getMonth() + periodSubscribe)
        startDateSubscribe.setUTCHours(7, 0, 0, 0)
      } else {
        startDateSubscribe.setDate(startDateSubscribe.getDate() + 3)
        startDateSubscribe.setUTCHours(7, 0, 0, 0)
      }
    } else if ((selectedPeriod === '3month')) {
      amountSubscribe = 8073
      firstAmount = 8073
      periodSubscribe = 3
      startDateSubscribe = new Date()
      startDateSubscribe.setMonth(startDateSubscribe.getMonth() + periodSubscribe)
    } else if ((selectedPeriod === '6month')) {
      amountSubscribe = 10764
      firstAmount = 10764
      periodSubscribe = 6
      startDateSubscribe = new Date()
      startDateSubscribe.setMonth(startDateSubscribe.getMonth() + periodSubscribe)
    }
    console.log('periodSubscribe', periodSubscribe);
    console.log('firstAmount', firstAmount);
    console.log('amountSubscribe', amountSubscribe);
    console.log('startDateSubscribe', startDateSubscribe.toISOString().split('T')[0]);
    startDateSubscribe = startDateSubscribe.toISOString().split('T')[0]
    
    // eslint-disable-next-line no-undef
    var widget = new cp.CloudPayments({
      language: "ru-RU",
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
      Items: [//товарные позиции
        {
           label: 'Подписка Радар Аналитика', //наименование товара
           price: amountSubscribe, //цена
           quantity: 1.00, //количество
           amount: amountSubscribe, //сумма
           vat: 20, //ставка НДС
           method: 0, // тег-1214 признак способа расчета - признак способа расчета
           object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
       }
      ],
      email: user.email, //e-mail покупателя, если нужно отправить письмо с чеком
      phone: '', //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
      isBso: false, //чек является бланком строгой отчетности
      amounts:
      {
          electronic: amountSubscribe, // Сумма оплаты электронными деньгами
          advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после точки)
          credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после точки)
          provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после точки)
      }
    }

    const data ={}
    data.CloudPayments = {
      CustomerReceipt: receipt, //чек для первого платежа
      recurrent: {
       interval: 'Month',
       period: periodSubscribe, 
       startDate: startDateSubscribe,
       amount: amountSubscribe,
       customerReceipt: receipt //чек для регулярных платежей
      }
    }

    widget.charge({ // options
      publicId: 'pk_1359b4923cc282c6f76e05d9f138a', //id из личного кабинета
      description: 'Оплата подписки в Radar Analityca', //назначение
      amount: firstAmount, //сумма
      currency: 'RUB', //валюта
      invoiceId: invoiceId, //номер заказа  (необязательно)
      email: user.email,
      accountId: `radar-${user.id}`, //идентификатор плательщика (обязательно для создания подписки)
      data: data
      },
      function (options) {
        // success - действие при успешной оплате
        // TODO отправка запроса в сервис бэкенда на обновление данных user
        // (/api/user Patch subscription_status: ['Test', 'Month 1', 'Month 3', 'Month 6'],
        // subscription_start_date: TODAY, is_test_used: true (если выбран тестовый период, если нет - не передавать))

        // Helper function to map selectedPeriod to the correct string
        const mapPeriodToStatus = (period) => {
          switch (period) {
            case "test":
              return "Test";
            case "1month":
              return "Month 1";
            case "3months":
              return "Month 3";
            case "6months":
              return "Month 6";
            default:
              return period; // fallback to original value if no match
          }
        };

        // Prepare the update data
        const updateData = {
          subscription_status: [mapPeriodToStatus(selectedPeriod)],
          subscription_start_date: new Date().toISOString().split("T")[0],
          invoice_id: invoiceId,
        };

        // Add is_test_used only if it's a test period
        if (selectedPeriod === "1month") {
          updateData.is_test_used = true;
        }
        // Send PATCH request
        axios
          .post(`${URL}/api/user/subscription`, updateData, {
            headers: {
              "content-type": "application/json",
              authorization: "JWT " + authToken,
            },
          })
          .then((res) => {
            console.log("patch /api/user", res.data);         
            localStorage.setItem("authToken", res.data.auth_token);
            navigate('/after-payment', {state: {paymentStatus:'success'}});
          })
          .catch((err) => console.log("patch /api/user", err));
          console.log("Payment success:", "options", options);
      },


     
      function (reason, options) { // fail
        //действие при неуспешной оплате
        navigate('/after-payment', {state: {paymentStatus:'not-success'}});
        console.log('Payment fail:', 'reason', reason, 'options', options);
    });

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
        <div className='price-wrap'>
          <div className='landing-price-wrap'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(83, 41, 255, 1)',
                padding: '20px',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '30px',
                  lineHeight: '40px',
                  color: 'white',
                  width: '100%',
                  paddingBottom: '16px',
                }}
              >
                Здесь есть всё, что нужно любому бизнесу на маркетплейсе
              </div>
              <div className='OrangeLabel'>
                <img src={BlueSwich} label='swich' />
              </div>
            </div>
            <div className='landing-price'>
              <p
                style={{
                  fontSize: '42px',
                  fontWeight: '700',
                  lineHeight: '58px',
                  margin: 0,
                }}
              >
                Это то, что подойдет
                <br />
                {'именно '}
                <span style={{ color: '#F0AD00', fontWeight: '800' }}>Вам</span>
              </p>
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '45px',
                  margin: 0,
                }}
              >
                Мы предлагаем один тариф,
                <br /> который даст полный доступ к<br /> нашей аналитике и ко
                всему ее функционалу!
              </p>
              <div className='landing-price-btn'>
                <p className='landing-price-btn-text'>
                  Мы дарим тестовый доступ
                  <br /> на 3 дня всего за
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
          <div style={{ width: '100%', borderRadius: '20px' }}>
            <div className='cardPrice cardPrice_color'>
              <div className='HeadCardProPlus'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {' '}
                  <div
                    style={{
                      color: '#0069FF',
                      fontWeight: '700',
                      fontSize: '30px',
                    }}
                  >
                    Smart
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: 'black',
                      borderRadius: '10px',
                      padding: '4px',
                      color: 'white',
                      fontSize: '18px',
                    }}
                  >
                    <img src={logoProPlus} style={{ width: '20%' }} />{' '}
                    <div>Лучший выбор</div>
                  </div>
                </div>
                <div className='selectPrice'>
                  {' '}
                  {selectedPeriod === '1month' && (
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
                          ? 'Тестовый доступ на 3 дня'
                          : 'За месяц'}
                      </div>
                    </>
                  )}
                  {selectedPeriod === '3month' && (
                    <>
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
                      <div>За 3 месяцев</div>
                    </>
                  )}
                  {selectedPeriod === '6month' && (
                    <>
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
                      navigate('tariffs');
                    } else {
                      pay(user.id, selectedPeriod, trialExpired)
                      redirect(); 
                    }
                    
                    }}
                >
                  Начать работать
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
                      <span style={{ marginLeft: '5px' }}>Личный менеджер</span>
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
        </div>
      </div>
     { currentPath === '/tariffs' && (
      <>
      <ReviewsUsers />
      <div className='wid-solutionMain'>
        <div className='sol-description col' style={{ padding: 0 }}>
          <div className='headStartBsn'>
            <SolLabelStartBsn />
            <div style={{ fontSize: '34px', fontWeight: '700' }}>
              Готовы начать?
            </div>
            <div style={{ fontSize: '22px' }}>
              Найдите прибыльные товары на маркетплейсе и развивайте свой
              бизнес.
            </div>
            <div className='YellowRadarPoint' style={{ marginTop: '20px' }}>
              <YellowRadarPoint />
            </div>
          </div>

          <div className='d-flex flex-column gap-3'>
            <CustomButton
              text={'Начать работать'}
              action={() => {
                pay(user.id, selectedPeriod, trialExpired)
                redirect(); 
                }}
              className={'white-btn'}
            />
          </div>
        </div>
        <div className='sol-screenshot sol-screenshot_bottom'>
          <img src={BlockImg_x2} alt='' />
        </div>
      </div>
      </>
      )}
    </>
  );
};
export default SelectRate;
