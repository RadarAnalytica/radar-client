import React, { useState, useContext, useEffect } from 'react'
import styles from './pricingScreen.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { PricingCard, PricingModal } from '../../features'
import { URL } from '../../../../service/config'
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AuthContext from '../../../../service/AuthContext'
import { ServiceFunctions } from '../../../../service/serviceFunctions'


export const pricing = [
    {
        title: '1 месяц',
        discount: null,
        price: 3990,
        oldPrice: null,
        color: '#8F8F8F',
        value: '1month'
    },
    {
        title: '3 месяца',
        discount: '-15%',
        price: 10174,
        oldPrice: 11970,
        color: '#222222',
        value: '3month'
    },
    {
        title: '6 месяцев',
        discount: '-30%',
        price: 16758,
        oldPrice: 23940,
        color: '#6083E7',
        value: '6month'
    },
    {
        title: '12 месяцев',
        discount: '-50%',
        price: 23940,
        oldPrice: 47880,
        color: '#F8BE72',
        value: '12month'
    },
]

export const PricingScreen = () => {
    

    // ------------ states and vars ---------------//
    const { user, logout, authToken } = useContext(AuthContext);
    const [ modalItem, setModalItem ] = useState(undefined)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [ isWidgetActive, setIsWidgetActive] = useState(false);
    // const [selectedPeriod, setSelectedPeriod] = useState('1month');
    const [trialExpired, setTrialExpired] = useState(user?.is_test_used);
    const [subscriptionDiscount, setSubscriptionDiscount] = useState(
        user?.is_subscription_discount
    );
    
    const navigate = useNavigate();
    const location = useLocation();
    const userIdInvoiceHardCode = 'radar-51-20240807-161128';
    const currentPath = window.location.pathname;

    if (user?.is_test_used !== trialExpired) {
        user?.is_test_used ? setTrialExpired(true) : setTrialExpired(false);
    }
    if (user?.is_subscription_discount !== subscriptionDiscount) {
        user?.is_subscription_discount
            ? setSubscriptionDiscount(true)
            : setSubscriptionDiscount(false);
    }

    


    // -------------- redirect -------------//

    useEffect(() => {
        const redirect = () => {
            if (!user) {
                navigate('/signup');
            }
        };
        redirect()
    }, [user])


    // ---------- idk what is this ------------ //
    const checkIdQueryParam = () => {
        const searchParams = new URLSearchParams(location.search);
        const idQueryParam = searchParams.get('id');
        if (idQueryParam && parseInt(idQueryParam) !== user.id) {
            logout();
            navigate('/signin');
        } else {
            return;
        }
    };

    useEffect(() => {
        if (location.search) {
            checkIdQueryParam();
        }
    }, [location.search]);

    // ------------------------------------------//

    // ------------ refresh token ----------------//
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
        if (user) {
            const refreshToken = async () => {
                await refreshUserToken();
            };

            // Initial token refresh
            refreshToken();

            // Set up interval to refresh token every minute
            const intervalId = setInterval(refreshToken, 60000);

            // Clean up interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, []);

     // ------------------------------------------//



     // ----------- cloudpayments script -----------------//
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

     // ------------------------------------------//




     // -------------------------------- pay function -------------------------------//
     const pay = async (_) => {
        const selectedPeriod = _.value
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
            amountSubscribe = _.price;
            firstAmount = _.price;
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
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 8073 : 4485;
            firstAmount = _.price;
            periodSubscribe = 3;
            startDateSubscribe.setMonth(
                startDateSubscribe.getMonth() + periodSubscribe
            );
        }
        if (selectedPeriod === '6month') {
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 10764 : 5382;
            firstAmount = _.price;
            periodSubscribe = 6;
            startDateSubscribe.setMonth(
                startDateSubscribe.getMonth() + periodSubscribe
            );
        }
        if (selectedPeriod === '12month') {
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 10764 : 5382;
            firstAmount = _.price;
            periodSubscribe = 12;
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
                        case '12months':
                            return 'Month 12';
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

        setIsWidgetActive(false);
    };
     // ----------------------------------------------------------------------------//
    

    return (
        <section className={styles.screen}>
            <div className={styles.screen__mainWrapper}>
                <h2 className={`${styles.screen__title} ${styles.screen__title_secondary}`}>
                    Тарифы
                </h2>

                <div className={styles.screen__cards}>
                    {pricing.map((_, id) => {
                        return (
                            <PricingCard key={id} item={_} setModalItem={setModalItem} action={() => {setIsWidgetActive(true); pay(_)}} isWidgetActive={isWidgetActive} />
                        )
                    })}
                </div>
            </div>
            
            {/* modal */}
            <PricingModal
                 visible={!!modalItem}
                 setIsModalVisible={() => setModalItem(undefined)}
                 item={modalItem}
                 action={() => {
                    if (modalItem) {
                        setIsWidgetActive(true);
                        pay(modalItem);
                        setModalItem(undefined)
                    }
                }}
            />
        </section>
    )
}