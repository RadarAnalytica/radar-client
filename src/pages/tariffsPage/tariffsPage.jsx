import React, { useState, useContext, useEffect } from "react";
import styles from './tariffsPage.module.css'
import { Link } from "react-router-dom";
import { formatPrice } from "../../service/utils";
import MobilePlug from "../../components/sharedComponents/mobilePlug/mobilePlug";
import { useNavigate, useLocation } from "react-router-dom";
import { URL } from "../../service/config";
import AuthContext from "../../service/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


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




const TariffsPage = () => {
    const { user, logout, authToken } = useContext(AuthContext);
    const [modalItem, setModalItem] = useState()
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('1month');
    const [trialExpired, setTrialExpired] = useState(user?.is_test_used);
    const [subscriptionDiscount, setSubscriptionDiscount] = useState(
        user?.is_subscription_discount
    );
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = () => {
        if (!user) {
            navigate('/signup');
        } else {
            if (user?.is_onboarded) {
                user?.subscription_status === 'expired'
                    ? navigate('/tariffs')
                    : navigate('/dashboard');
            } else {
                navigate('/onboarding');
            }
        }
    };
    if (!user) {
        window.location.href = `${URL}/signup`;
    }

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
        if (location.search) {
            checkIdQueryParam();
        }
    }, [location.search]);

    // fron selectRate

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

    //   useEffect(() => {
    //     const img = new Image();
    //     img.src = highResImage;

    //     img.onload = () => {
    //       setHighResLoaded(true); // High-res image is fully loaded
    //     };
    //   }, []);

    //   const refreshUserToken = async () => {
    //     try {
    //       // const authToken = localStorage.getItem("authToken");
    //       const response = await fetch(`${URL}/api/user/refresh`, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           authorization: 'JWT ' + authToken,
    //         },
    //       });
    //       // console.log('response', response);

    //       if (response.status === 200) {
    //         const data = await response.json();
    //         // localStorage.setItem("authToken", data.token);
    //         // user?.is_test_used ? setTrialExpired(true) : setTrialExpired(false)
    //         return data.token;
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     return null;
    //   };

    const pay = async (_user, _, _trial) => {
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
    };

    return (
        <main className={styles.page}>
            <MobilePlug />
            <div className={styles.page__wrapper}>
                <header className={styles.header}>
                    <section className={styles.header__container}>
                        <Link
                            to='/'
                            aria-label="На главную страницу Radar-Analytica"
                        >
                            <svg width="158" height="58" viewBox="0 0 158 58" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.logo} ${styles.logo_adaptive}`}>
                                <path d="M126.91 32.5679V12.3391H133.694V17.1059C134.393 15.3701 135.349 14.0682 136.56 13.2003C137.771 12.3324 139.238 11.8984 140.961 11.8984C141.244 11.8984 141.526 11.9118 141.809 11.9385C142.105 11.9519 142.401 11.9785 142.697 12.0186L142.011 18.5079C141.58 18.361 141.156 18.2542 140.739 18.1874C140.322 18.1207 139.918 18.0873 139.528 18.0873C137.778 18.0873 136.426 18.6213 135.47 19.6896C134.528 20.7444 134.057 22.2466 134.057 24.196V32.5679H126.91Z" fill="#1A1A1A" />
                                <path d="M116.361 22.4345C116.361 20.8589 115.937 19.6105 115.089 18.6892C114.241 17.7678 113.084 17.3072 111.617 17.3072C110.15 17.3072 108.992 17.7678 108.145 18.6892C107.31 19.5971 106.893 20.8456 106.893 22.4345C106.893 24.0101 107.317 25.2519 108.165 26.1598C109.013 27.0678 110.164 27.5218 111.617 27.5218C113.084 27.5218 114.241 27.0678 115.089 26.1598C115.937 25.2519 116.361 24.0101 116.361 22.4345ZM122.68 12.3401V32.5689H116.078V29.2843C115.136 30.6863 114.073 31.7144 112.888 32.3687C111.718 33.0229 110.338 33.3501 108.75 33.3501C106.032 33.3501 103.858 32.3687 102.23 30.4059C100.602 28.4297 99.7871 25.7859 99.7871 22.4746C99.7871 19.1765 100.635 16.5595 102.331 14.6234C104.04 12.6739 106.335 11.6992 109.215 11.6992C110.749 11.6992 112.068 12.0264 113.171 12.6806C114.288 13.3215 115.244 14.3163 116.038 15.6649V12.3401H122.68Z" fill="#1A1A1A" />
                                <path d="M90.3477 22.4753C90.3477 20.8997 89.9242 19.6579 89.0765 18.75C88.2415 17.842 87.0976 17.388 85.644 17.388C84.1912 17.388 83.0473 17.842 82.2122 18.75C81.378 19.6579 80.9609 20.8997 80.9609 22.4753C80.9609 24.0642 81.3717 25.3127 82.1925 26.2206C83.0267 27.1152 84.1778 27.5625 85.644 27.5625C87.0976 27.5625 88.2415 27.1086 89.0765 26.2006C89.9242 25.2926 90.3477 24.0509 90.3477 22.4753ZM96.7269 1.52539V32.5696H90.1059V29.285C89.1903 30.6469 88.1609 31.6684 87.017 32.3493C85.8731 33.017 84.6012 33.3508 83.2013 33.3508C80.3352 33.3508 78.0539 32.3694 76.3582 30.4066C74.6624 28.4438 73.8145 25.8 73.8145 22.4753C73.8145 19.2573 74.6556 16.6603 76.338 14.6842C78.0337 12.6946 80.2412 11.6999 82.9596 11.6999C84.6818 11.6999 86.0817 12.007 87.1584 12.6213C88.2486 13.2354 89.2172 14.2636 90.0656 15.7056C89.985 15.2249 89.9242 14.6842 89.8839 14.0833C89.8436 13.4691 89.8231 12.8082 89.8231 12.1005V1.52539H96.7269Z" fill="#1A1A1A" />
                                <path d="M64.2555 22.4345C64.2555 20.8589 63.8316 19.6105 62.9837 18.6892C62.1359 17.7678 60.9784 17.3072 59.5115 17.3072C58.0445 17.3072 56.8871 17.7678 56.0393 18.6892C55.2049 19.5971 54.7876 20.8456 54.7876 22.4345C54.7876 24.0101 55.2116 25.2519 56.0594 26.1598C56.9073 27.0678 58.058 27.5218 59.5115 27.5218C60.9784 27.5218 62.1359 27.0678 62.9837 26.1598C63.8316 25.2519 64.2555 24.0101 64.2555 22.4345ZM70.5742 12.3401V32.5689H63.9729V29.2843C63.0309 30.6863 61.9676 31.7144 60.7833 32.3687C59.6125 33.0229 58.233 33.3501 56.6449 33.3501C53.9264 33.3501 51.7528 32.3687 50.1243 30.4059C48.4959 28.4297 47.6816 25.7859 47.6816 22.4746C47.6816 19.1765 48.5295 16.5595 50.2253 14.6234C51.9345 12.6739 54.2292 11.6992 57.1092 11.6992C58.6434 11.6992 59.9623 12.0264 61.0659 12.6806C62.183 13.3215 63.1385 14.3163 63.9326 15.6649V12.3401H70.5742Z" fill="#1A1A1A" />
                                <path d="M23.9297 32.5679V3.24609H32.3478C35.6452 3.24609 37.9398 3.39964 39.2318 3.70675C40.5372 4.0005 41.661 4.50121 42.6031 5.20889C43.6663 6.01004 44.4805 7.03149 45.0458 8.27325C45.6244 9.515 45.9138 10.8836 45.9138 12.3791C45.9138 14.649 45.3486 16.4984 44.2181 17.927C43.101 19.3424 41.4659 20.2837 39.3125 20.7511L47.3673 32.5679H38.2627L31.4798 21.0916V32.5679H23.9297ZM31.4798 17.1059H32.9737C34.7098 17.1059 35.9748 16.8121 36.7689 16.2246C37.5764 15.6371 37.9802 14.7158 37.9802 13.4606C37.9802 11.9919 37.6033 10.9504 36.8497 10.3362C36.1094 9.70867 34.8578 9.39485 33.0948 9.39485H31.4798V17.1059Z" fill="#1A1A1A" />
                                <path d="M52.0443 42.2703C51.8116 38.9682 54.321 36.1042 57.6492 35.8733L150.455 29.4348C153.784 29.2039 156.67 31.6935 156.903 34.9956L157.578 44.562C157.81 47.8641 155.301 50.7281 151.973 50.959L59.1663 57.3976C55.8381 57.6285 52.9513 55.1389 52.7186 51.8368L52.0443 42.2703Z" fill="#F0AD00" />
                                <path d="M15.0353 36.8283C13.7579 37.2315 12.3882 36.5321 12.0312 35.2503C8.97172 24.2638 8.9981 12.6546 12.1075 1.68187C12.4703 0.401627 13.8432 -0.29163 15.1187 0.117326C16.3942 0.526282 17.0888 1.88259 16.7301 3.16398C13.9271 13.1792 13.903 23.7613 16.6605 33.7888C17.0134 35.0718 16.3126 36.425 15.0353 36.8283Z" fill="#F0AD00" />
                                <path d="M4.04174 32.3862C2.73706 32.6911 1.42535 31.8897 1.16842 30.5845C-0.318223 23.0324 -0.386818 15.2726 0.96609 7.69581C1.19991 6.38633 2.49724 5.56219 3.80713 5.84442C5.117 6.12665 5.94299 7.40831 5.71341 8.71856C4.50891 15.5927 4.57109 22.6271 5.89693 29.4793C6.14964 30.7854 5.34644 32.0812 4.04174 32.3862Z" fill="#F0AD00" />
                                <path d="M142.108 42.1384L145.168 41.926L143.759 38.3118C143.715 38.2021 143.654 38.0245 143.574 37.779C143.495 37.5334 143.393 37.2177 143.267 36.8319C143.22 37.1119 143.172 37.3791 143.123 37.6336C143.079 37.8877 143.031 38.1317 142.981 38.3658L142.108 42.1384ZM138.094 46.6207L141.197 35.1541L145.051 34.8867L149.741 45.8127L146.681 46.0249L145.969 44.0608L141.598 44.364L141.153 46.4084L138.094 46.6207Z" fill="white" />
                                <path d="M136.928 35.8889L137.164 39.2234C136.709 38.7886 136.264 38.4788 135.828 38.2939C135.396 38.1035 134.941 38.0249 134.463 38.0581C133.579 38.1194 132.883 38.47 132.376 39.1098C131.873 39.7441 131.656 40.5431 131.724 41.5067C131.787 42.4041 132.117 43.1292 132.714 43.6821C133.315 44.2347 134.048 44.481 134.911 44.4211C135.389 44.388 135.829 44.2499 136.23 44.0069C136.636 43.7584 137.033 43.385 137.422 42.8867L137.657 46.2289C137.186 46.4972 136.712 46.7068 136.238 46.8576C135.763 47.0084 135.279 47.1009 134.785 47.1352C134.169 47.1779 133.593 47.1435 133.058 47.0321C132.529 46.9253 132.036 46.7393 131.578 46.4738C130.696 45.9715 130.004 45.3099 129.501 44.489C129 43.6682 128.711 42.725 128.636 41.6594C128.575 40.8029 128.66 40.0157 128.888 39.2979C129.121 38.5747 129.5 37.908 130.025 37.2977C130.521 36.7151 131.093 36.2655 131.743 35.9489C132.397 35.632 133.135 35.445 133.957 35.388C134.451 35.3537 134.943 35.3785 135.434 35.4623C135.926 35.546 136.423 35.6882 136.928 35.8889Z" fill="white" />
                                <path d="M123.91 47.6053L123.121 36.4088L126.227 36.1934L127.017 47.3899L123.91 47.6053Z" fill="white" />
                                <path d="M116.72 48.1029L116.118 39.5525L113.589 39.728L113.402 37.0818L121.535 36.5176L121.722 39.1638L119.193 39.3392L119.796 47.8895L116.72 48.1029Z" fill="white" />
                                <path d="M107.661 48.731L107.302 43.6222L102.926 37.8082L106.456 37.5633L108.178 40.3412C108.19 40.3558 108.207 40.3828 108.23 40.4221C108.411 40.7119 108.541 40.9923 108.622 41.2634C108.656 41.01 108.747 40.7244 108.895 40.4067C108.922 40.3485 108.94 40.3088 108.949 40.2877L110.248 37.3002L113.787 37.0547L110.269 43.4163L110.629 48.5251L107.661 48.731Z" fill="white" />
                                <path d="M98.1173 49.3942L97.3281 38.1977L100.404 37.9844L101.009 46.5652L104.832 46.3L105.016 48.9156L98.1173 49.3942Z" fill="white" />
                                <path d="M89.3988 45.7946L92.4592 45.5823L91.0507 41.968C91.0064 41.8584 90.9448 41.6808 90.8658 41.4352C90.786 41.1896 90.6841 40.8739 90.5585 40.4882C90.5111 40.7681 90.4629 41.0353 90.4139 41.2897C90.3697 41.5438 90.3223 41.788 90.2717 42.022L89.3988 45.7946ZM85.3848 50.2769L88.4887 38.8103L92.3423 38.543L97.0325 49.4688L93.9721 49.6812L93.2603 47.717L88.89 48.0202L88.4452 50.0646L85.3848 50.2769Z" fill="white" />
                                <path d="M73.2501 51.12L72.4609 39.9235L75.4287 39.7176L80.0974 45.1807C80.1882 45.2923 80.3383 45.5201 80.5485 45.8641C80.7633 46.2028 81.0011 46.6089 81.2618 47.0827C81.167 46.623 81.092 46.2133 81.0359 45.8534C80.9845 45.4931 80.949 45.1729 80.9292 44.8924L80.5398 39.363L83.492 39.1582L84.2812 50.3547L81.329 50.5595L76.6583 45.0734C76.5627 44.9623 76.4074 44.7373 76.1925 44.3987C75.9823 44.0547 75.7498 43.6506 75.4951 43.1867C75.5898 43.6515 75.6628 44.064 75.714 44.4242C75.7703 44.7841 75.8084 45.1042 75.8281 45.3847L76.2178 50.9141L73.2501 51.12Z" fill="white" />
                                <path d="M64.5298 47.5192L67.5901 47.3069L66.1812 43.6927C66.1373 43.583 66.0758 43.4054 65.9965 43.1598C65.9172 42.9143 65.8149 42.5986 65.6896 42.2128C65.6422 42.4927 65.5939 42.7599 65.5447 43.0144C65.5007 43.2685 65.4533 43.5126 65.4026 43.7467L64.5298 47.5192ZM60.5156 52.0016L63.6193 40.535L67.4735 40.2676L72.1632 51.1935L69.1029 51.4058L68.3913 49.4416L64.0205 49.7449L63.5759 51.7893L60.5156 52.0016Z" fill="white" />
                            </svg>
                        </Link>
                    </section>
                </header>


                {/* Tariffs */}


                <section className={styles.screen}>
                    <div className={styles.screen__mainWrapper}>
                        <h2 className={`${styles.screen__title} ${styles.screen__title_secondary}`}>
                            Тарифы
                        </h2>

                        <div className={styles.screen__cards}>
                            {pricing.map((_, id) => {
                                return (
                                    <div
                                        className={styles.card}
                                        style={{ borderColor: _.color }}
                                        key={id}
                                    >
                                        <div className={styles.card__header}>
                                            <h3 className={`${styles.card__title} ${styles.card__title_qt}`}>
                                                {_.title}
                                            </h3>
                                            {_.discount && <div className={styles.card__bullet}>{_.discount}</div>}
                                        </div>
                                        <div className={styles.card__body}>
                                            <div className={styles.card__infoBlock}>
                                                <div className={styles.card__priceWrapper}>
                                                    <h4
                                                        className={`${styles.card__title} ${styles.card__title_tt}`}
                                                    >
                                                        {formatPrice(_.price.toString(), '₽')}
                                                    </h4>

                                                    {_.oldPrice &&
                                                        <div className={styles.card__oldPrice}>{formatPrice(_.oldPrice.toString(), '₽')}</div>
                                                    }
                                                </div>
                                                {/* <button className={styles.card__modalButton} onClick={() => setModalItem(_)}>
                                                    Что входит?
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.5" d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z" fill="#6083E7" />
                                                        <path d="M12 18.25C12.4142 18.25 12.75 17.9142 12.75 17.5V11.5C12.75 11.0858 12.4142 10.75 12 10.75C11.5858 10.75 11.25 11.0858 11.25 11.5V17.5C11.25 17.9142 11.5858 18.25 12 18.25Z" fill="white" />
                                                        <path d="M12 7.5C12.5523 7.5 13 7.94771 13 8.5C13 9.05229 12.5523 9.5 12 9.5C11.4477 9.5 11 9.05229 11 8.5C11 7.94771 11.4477 7.5 12 7.5Z" fill="white" />
                                                    </svg>
                                                </button> */}
                                            </div>
                                            <button
                                                className={styles.card__actionButton}
                                                style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
                                                onClick={() => { pay(user.id, _, trialExpired); }}
                                            >
                                                Активировать
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </section>


                {/* modals */}
                {/* <section
                    className={cx('backdrop', { 'backdrop--visible': visible, 'backdrop--invisible': !visible })}
                    id='pricing-modal'
                    onClick={(e) => {
                        if (e.target.id === 'pricing-modal') {
                            setIsModalVisible(false)
                        }
                    }}
                >
                    <div className={cx('modal', { 'modal--visible': visible })}>
                        <button className={cx('modal__closeButton')} onClick={() => setIsModalVisible(false)} aria-label='Закрыть модальное окно тарифов Radar-Analytica'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill='currentColor' xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7157 1.28711L1.28711 16.7157M1.28711 1.28711L16.7157 16.7157" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill='currentColor' />
                            </svg>
                        </button>


                        <header className={cx('modal__header')}>
                            <Title tagType='h5' style={{ position: 'relative', zIndex: 1 }}>Smart</Title>
                        </header>

                        <div className={cx('modal__body')}>
                            <div className={cx('modal__priceWrapper')}>
                                <div className={cx('modal__container')}>
                                    <Title.Secondary>
                                        {formatter(item?.price.toString() || '', '₽')}
                                    </Title.Secondary>
                                    {item?.oldPrice &&
                                        <div className={cx('modal__oldPrice')}>
                                            {formatter(item.oldPrice.toString(), '₽')}
                                        </div>
                                    }
                                </div>
                                <Button.WLink
                                    variant='filled'
                                    color='blu'
                                    text='Активировать сервис'
                                    href={`${URL}/signup`}
                                />
                            </div>

                            <div className={cx('modal__listWrapper')}>
                                <Title.Quaternary tagType='p'>
                                    Что включено:
                                </Title.Quaternary>

                                <ul className={cx('modal__featuresList')}>
                                    {FEATURES.map((_, id) => {

                                        return (
                                            <li
                                                key={id}
                                                className={cx('modal__listItem')}
                                            >
                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="30" height="30" rx="6" fill="#E0EBFF" />
                                                    <path d="M19.3219 8.5C19.0394 8.5 18.7003 8.54384 18.2671 8.60961C17.8339 8.6973 17.5325 8.785 17.363 8.89461C17.1747 9.00423 16.911 9.28921 16.5343 9.74958C16.1764 10.188 15.7055 10.9115 15.1404 11.8322C14.5753 12.7749 14.0856 13.6737 13.6712 14.5506C13.2945 15.3179 12.9178 16.1729 12.5411 17.0717C12.2774 16.6771 11.9949 16.3702 11.7123 16.129C11.3544 15.844 10.9966 15.6906 10.6764 15.6906C10.3562 15.6906 9.97944 15.8659 9.60273 16.1948C9.20718 16.5455 9 16.9401 9 17.3567C9 17.6855 9.16952 18.0582 9.5274 18.4966C10.036 19.1543 10.4503 19.7681 10.7517 20.3162C10.9777 20.7108 11.1284 20.9739 11.2226 21.1054C11.3356 21.2369 11.4675 21.3465 11.6181 21.4123C11.7688 21.4781 12.0325 21.5 12.3904 21.5C12.899 21.5 13.238 21.4342 13.4452 21.3027C13.6524 21.1712 13.8031 20.9958 13.9161 20.7546C14.0103 20.5354 14.1798 20.1189 14.4058 19.4612C14.9709 17.817 15.7431 16.0852 16.7038 14.3314C17.6644 12.5776 18.5873 11.2184 19.4726 10.2538C19.6986 10.0346 19.8305 9.85919 19.887 9.74958C19.9623 9.61805 20 9.44266 20 9.26728C20 9.04806 19.9247 8.85076 19.7928 8.69731C19.7175 8.58769 19.5291 8.5 19.3219 8.5Z" fill="#737C92" />
                                                </svg>

                                                {_}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        </main>
    )
}

export default TariffsPage;