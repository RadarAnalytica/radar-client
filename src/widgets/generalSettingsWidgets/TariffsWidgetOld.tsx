import React, { useEffect, useContext, useState, useMemo } from 'react';
import styles from './TariffsWidget.module.css';
import { ConfigProvider, Button, Switch, Input, Radio, Select, InputNumber } from 'antd';
import { formatPrice } from '@/service/utils';
import AuthContext from '@/service/AuthContext';
import cover from './calc_cover.png'
import { useDemoMode } from '@/app/providers';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { URL } from '@/service/config';
import { ServiceFunctions } from '@/service/serviceFunctions';
import fakePaymentObject from './fakePaymentObject.json'
import { Modal, Tooltip } from 'antd';
import { getWordDeclension } from '@/service/utils';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features';
import { PricingModal } from '@/pages/tariffsPage/features';
import { v4 as uuid } from 'uuid';
import moment from 'moment';


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
];

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const tabs = [
    { title: '1 месяц', discount: null },
    { title: '3 месяца', discount: '-15%' },
    { title: '6 месяцев', discount: '-15%' },
    { title: '12 месяцев', discount: '-15%' },
]


export const TariffsWidgetOld = () => {
    // ------------ states and vars ---------------//
    const { user, logout, authToken } = useContext(AuthContext);
    const [activatedSubscription, setActivatedSubscription] = useState(null)
    const [modalItem, setModalItem] = useState(undefined);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isWidgetActive, setIsWidgetActive] = useState(false);
    const { isDemoUser } = useDemoMode();
    const [trialExpired, setTrialExpired] = useState(user?.is_test_used);
    const [subscriptionDiscount, setSubscriptionDiscount] = useState(
        user?.is_subscription_discount
    );
    const [fakePaymentDataObject, setFakePaymentDataObject] = useState(null)
    const [fakeRequestStatus, setFakeRequestStatus] = useState(initRequestStatus)
    const [activeTab, setActiveTab] = useState('1 месяц')
    const [isCalculatorModalVisible, setIsCalculatorModalVisible] = useState(false)
    const [descriptionItem, setDescriptionItem] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();
    const userIdInvoiceHardCode = 'radar-51-20240807-161128';
    const currentPath = window.location.pathname;

    const isProductionMode = useMemo(() => {
        return import.meta.env.PROD && URL === 'https://radar-analytica.ru'
    }, [])

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
        redirect();
    }, [user]);


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
        //@ts-ignore
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
    // -------------------------------- pay function -------------------------------//
    const pay = async (_) => {
        if (isDemoUser) {
            await logout();
            return;
        }
        const selectedPeriod = _.value;
        const refresh_result = await refreshUserToken();

        const decodedUser = jwtDecode(refresh_result);
        let newTrialExpired;

        //@ts-ignore
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
            //@ts-ignore
            .toLocaleString('ru', options)
            //@ts-ignore
            .replaceAll('.', '')
            .replaceAll(', ', '-')
            .replaceAll(':', '')}`;

        if (selectedPeriod === '1month') {
            amountSubscribe = _.price;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 1;
            if (newTrialExpired) {
                startDateSubscribe.setMonth(
                    //@ts-ignore
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
            //@ts-ignore
            periodSubscribe = 3;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe
            );
        }
        if (selectedPeriod === '6month') {
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 10764 : 5382;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 6;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe
            );
        }
        if (selectedPeriod === '12month') {
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 10764 : 5382;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 12;
            startDateSubscribe.setMonth(
                //@ts-ignore
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
        //@ts-ignore
        startDateSubscribe = startDateSubscribe.toISOString().split('T')[0];
        //@ts-ignore
        startDateSubscribe = `${startDateSubscribe}T10:00:00`;
        // console.log('startDateSubscribe', startDateSubscribe);
        // eslint-disable-next-line no-undef
        //@ts-ignore
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

        let data = {};
        //@ts-ignore
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

        data = {
            ...data,
            "testProp1": 'testString',
            "testProp2": {testKey: 'testString2'},
            "testProp3": ['testString']
        }

        await widget.charge(
            {
                // options
                publicId: 'pk_1359b4923cc282c6f76e05d9f138a', //id из личного кабинета
                description: 'Оплата подписки в Radar Analytica', //назначение
                amount: firstAmount, //сумма
                currency: 'RUB', //валюта
                invoiceId: invoiceId, //номер заказа  (необязательно)
                email: user.email,
                accountId: `radar-${user.id}`, //идентификатор плательщика (обязательно для создания подписки)
                data: data,
                СustomFields: {testKey: 'testString', testKey2: {testkey2: 'testString'}, testKey3: ['testArray3']}
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
                    //@ts-ignore
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
        //           description: 'Оплата подписки в Radar Analytica', //назначение
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

    // -------------------------------- fake pay function (for dev or test purposes only) -------------------------------//
    const fakePayFunction = async (_) => {
        if (isDemoUser) {
            await logout();
            return;
        }
        const selectedPeriod = _.value;
        const refresh_result = await refreshUserToken();

        const decodedUser = jwtDecode(refresh_result);
        let newTrialExpired;

        //@ts-ignore
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
            //@ts-ignore
            .toLocaleString('ru', options)
            //@ts-ignore
            .replaceAll('.', '')
            .replaceAll(', ', '-')
            .replaceAll(':', '')}`;

        if (selectedPeriod === '1month') {
            amountSubscribe = _.price;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 1;
            if (newTrialExpired) {
                startDateSubscribe.setMonth(
                    //@ts-ignore
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
            //@ts-ignore
            periodSubscribe = 3;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe
            );
        }
        if (selectedPeriod === '6month') {
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 10764 : 5382;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 6;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe
            );
        }
        if (selectedPeriod === '12month') {
            amountSubscribe = _.price;
            //firstAmount = !subscriptionDiscount ? 10764 : 5382;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 12;
            startDateSubscribe.setMonth(
                //@ts-ignore
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
        //@ts-ignore
        startDateSubscribe = startDateSubscribe.toISOString().split('T')[0];
        //@ts-ignore
        startDateSubscribe = `${startDateSubscribe}T10:00:00`;
        // console.log('startDateSubscribe', startDateSubscribe);

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
        //@ts-ignore
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

        let fakeRequestObject = JSON.parse(JSON.stringify(fakePaymentObject))
        fakeRequestObject = {
            ...fakeRequestObject,
            TransactionId: uuid(),
            Amount: amountSubscribe,
            InvoiceId: invoiceId,
            PaymentAmount: amountSubscribe,
            AccountId: `radar-${user?.id}`,
            SubscriptionId: `sc_${invoiceId}`,
            Data: data,
            Email: user?.email,
            DateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            Token: `tk_${invoiceId}`,
        }

        setFakePaymentDataObject(fakeRequestObject)
    }
    //-------------------------------- fake payment result ------------------------//
    const getPaymentResult = async () => {
        setFakeRequestStatus({ ...initRequestStatus, isLoading: true })
        try {
            let res = await fetch(`${URL}/api/admin/webhook/payments`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
                body: JSON.stringify(fakePaymentDataObject)
            })

            if (!res?.ok) {
                setFakeRequestStatus({ ...initRequestStatus, isError: true, message: 'Something went wrong' });
                return;
            }

            setFakeRequestStatus(initRequestStatus);
            setActivatedSubscription(null)
            setIsWidgetActive(false)
            setFakePaymentDataObject(null)

            navigate('/after-payment', { state: { paymentStatus: 'success' } })

        } catch (e) {
            setFakeRequestStatus({ ...initRequestStatus, isError: true, message: e || 'Something went wrong' })
            console.error(e)
        }
    }
    // ----------------------------------------------------------------------------//
    return (
        <>
            {/* <div className={styles.widget__tabs}>
                {tabs.map(_ => {
                    return (
                        <button
                            className={_.title === activeTab ? `${styles.widget__tab} ${styles.widget__tab_active}` : styles.widget__tab}
                            onClick={() => setActiveTab(_.title)}
                            key={_.title}
                        >
                            {_.title}
                            {_.discount &&
                                <div className={_.title === activeTab ? styles.widget__tabDiscount_active : styles.widget__tabDiscount}>{_.discount}</div>
                            }
                        </button>
                    )
                })}
            </div> */}
            {!isProductionMode &&
                <div className={styles.testButtons}>
                    <button
                        title='КИРИЛЛ НЕ НАЖИМАТЬ! // Здесь customFields - объект'
                        onClick={() => {
                            setActivatedSubscription('customField test');
                            setIsWidgetActive(true);
                            pay({
                                title: 'customField test',
                                discount: null,
                                price: 10,
                                oldPrice: null,
                                color: '#8F8F8F',
                                value: '1month',
                                customField: { testField: 'testValue' }
                            });
                        }}
                    >Боевой тест оплаты (OBJECT)</button>
                    <button
                        title='КИРИЛЛ НЕ НАЖИМАТЬ! // Здесь customFields - массив'
                        onClick={() => {
                            setActivatedSubscription('customField test');
                            setIsWidgetActive(true);
                            pay({
                                title: 'customField test',
                                discount: null,
                                price: 10,
                                oldPrice: null,
                                color: '#8F8F8F',
                                value: '1month',
                                customField: [{ testField: 'testValue' }]
                            });
                        }}
                    >Боевой тест оплаты (ARRAY)</button>
                </div>
            }
            <div className={styles.page__tariffsListOld}>
                {pricing.map((item, index) => (
                    <TariffCard
                        key={index}
                        item={item}
                        activatedSubscription={activatedSubscription}
                        isWidgetActive={isWidgetActive}
                        activeTab={activeTab}
                        setDescriptionItem={setDescriptionItem}
                        action={() => {
                            if (import.meta.env.PROD && URL === 'https://radar-analytica.ru') {
                                setActivatedSubscription(item.title);
                                setIsWidgetActive(true);
                                pay(item);
                            } else {
                                setActivatedSubscription(item.title);
                                setIsWidgetActive(true);
                                fakePayFunction(item)
                            }
                        }}
                    />
                ))}

                {/* <div className={styles.calcBlock}>
                    <div className={styles.calcBlock__header}>
                        <h3 className={styles.calcBlock__title}>Калькулятор тарифа</h3>
                        <p className={styles.calcBlock__text}>
                            Соберите свой тариф, добавив только необходимые разделы. Экономьте на выбранных опциях
                        </p>
                        <hr />
                        <p className={styles.calcBlock__title}>От 500 ₽</p>
                    </div>

                    <button className={styles.calcBlock__button} onClick={() => setIsCalculatorModalVisible(true)}>
                        Настроить
                    </button>

                    <div className={styles.calcBlock__imageWrapper}>
                        <img src={cover} alt='' />
                    </div>
                </div> */}
            </div>

            {/* <TariffCalculator
                open={isCalculatorModalVisible}
                setIsOpen={setIsCalculatorModalVisible}
            /> */}

            <Modal
                open={fakePaymentDataObject && isWidgetActive ? true : false}
                //open
                onCancel={() => {
                    setFakePaymentDataObject(null);
                    setIsWidgetActive(false)
                    setActivatedSubscription(null)
                }}
                centered
                width={454}
                footer={null}
            >
                <div className={styles.fakePaymentModal}>
                    <p className={styles.fakePaymentModal__smallText}>
                        Это виджет для тестирования оплаты.
                    </p>
                    <p className={styles.fakePaymentModal__text}>
                        Оплата подписки RADAR ANALYTICA — {pricing?.find(_ => _.title === activatedSubscription)?.price}
                    </p>
                    <button
                        className={styles.fakePaymentModal__button}
                        onClick={getPaymentResult}
                    >
                        Оплатить
                    </button>
                </div>
            </Modal>


            {/* modal */}
            <PricingModal
                visible={descriptionItem ? true : false}
                setIsModalVisible={() => setDescriptionItem(null)}
                item={descriptionItem}
                isWidgetActive={isWidgetActive}
                action={() => {
                    if (import.meta.env.PROD && URL === 'https://radar-analytica.ru') {
                        setActivatedSubscription(descriptionItem.title);
                        setIsWidgetActive(true);
                        pay(descriptionItem);
                    } else {
                        setActivatedSubscription(descriptionItem.title);
                        setIsWidgetActive(true);
                        fakePayFunction(descriptionItem)
                    }
                }}
            />
        </>
    )
}



const cardFeaturesIcons = [
    (
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.34167 0.380004L1.175 2.98417C0.444048 3.44102 0 4.24219 0 5.10417V10.6663C0 11.5282 0.444049 12.3294 1.175 12.7863L5.34167 15.3904C6.15235 15.8971 7.18099 15.8971 7.99166 15.3904L12.1583 12.7863C12.8893 12.3294 13.3333 11.5282 13.3333 10.6663V5.10417C13.3333 4.24219 12.8893 3.44102 12.1583 2.98417L7.99166 0.380004C7.18099 -0.126668 6.15234 -0.126668 5.34167 0.380004ZM7.70833 7.88208C7.70833 7.30678 7.24196 6.84041 6.66667 6.84041C6.09137 6.84041 5.625 7.30678 5.625 7.88208V7.88808C5.625 8.46338 6.09137 8.92975 6.66667 8.92975C7.24196 8.92975 7.70833 8.46338 7.70833 7.88808V7.88208Z" fill="#363538" />
        </svg>
    ),
    (
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.29167 9.79167H1.45833V8.54167H2.29167C2.63684 8.54167 2.91667 8.26184 2.91667 7.91667C2.91667 7.57149 2.63684 7.29167 2.29167 7.29167H1.45833V6.04167H2.29167C2.63684 6.04167 2.91667 5.76184 2.91667 5.41667C2.91667 5.07149 2.63684 4.79167 2.29167 4.79167H1.45833V3.54167H2.29167C2.63684 3.54167 2.91667 3.26184 2.91667 2.91667C2.91667 2.57149 2.63684 2.29167 2.29167 2.29167H1.62432C2.06174 0.960862 3.31449 0 4.79167 0H8.95833C10.7993 0 12.2917 1.49238 12.2917 3.33333V10C12.2917 11.8409 10.7993 13.3333 8.95833 13.3333H4.79167C3.31449 13.3333 2.06174 12.3725 1.62432 11.0417H2.29167C2.63684 11.0417 2.91667 10.7618 2.91667 10.4167C2.91667 10.0715 2.63684 9.79167 2.29167 9.79167Z" fill="#363538" />
            <path d="M1.62432 2.29167H0.625C0.279822 2.29167 0 2.57149 0 2.91667C0 3.26184 0.279822 3.54167 0.625 3.54167H1.45833V3.33333C1.45833 2.96956 1.51661 2.6194 1.62432 2.29167Z" fill="#363538" />
            <path d="M1.45833 4.79167H0.625C0.279822 4.79167 0 5.07149 0 5.41667C0 5.76184 0.279822 6.04167 0.625 6.04167H1.45833V4.79167Z" fill="#363538" />
            <path d="M1.45833 7.29167H0.625C0.279822 7.29167 0 7.57149 0 7.91667C0 8.26184 0.279822 8.54167 0.625 8.54167H1.45833V7.29167Z" fill="#363538" />
            <path d="M1.62432 11.0417H0.625C0.279822 11.0417 0 10.7618 0 10.4167C0 10.0715 0.279822 9.79167 0.625 9.79167H1.45833V10C1.45833 10.3638 1.51661 10.7139 1.62432 11.0417Z" fill="#363538" />
        </svg>
    ),
    (
        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66667 0C2.98477 0 0 2.91667 0 6.66667C0 9.52258 1.93333 11.4118 2.85523 12.1504C3.14378 12.3815 3.33333 12.7246 3.33333 13.0943C3.33333 13.6866 3.81343 14.1667 4.40566 14.1667H8.92767C9.5199 14.1667 10 13.6866 10 13.0943C10 12.7246 10.1895 12.3815 10.4781 12.1504C11.4 11.4118 13.3333 9.52258 13.3333 6.66667C13.3333 2.91667 10.3486 0 6.66667 0Z" fill="#363538" />
            <path d="M4.26942 14.8002C3.92893 14.7434 3.60692 14.9734 3.55017 15.3139C3.49342 15.6544 3.72344 15.9764 4.06392 16.0332C5.7872 16.3204 7.54613 16.3204 9.26941 16.0332C9.6099 15.9764 9.83991 15.6544 9.78316 15.3139C9.72642 14.9734 9.4044 14.7434 9.06392 14.8002C7.4767 15.0647 5.85664 15.0647 4.26942 14.8002Z" fill="#363538" />
        </svg>
    )
]



const TariffCard = ({ item, isWidgetActive, action, activatedSubscription, activeTab, setDescriptionItem }) => {

    // const currentPrice = useMemo(() => {
    //     return item?.priceList[activeTab]
    // }, [activeTab, item])

    // const hiddenFeatures = useMemo(() => {
    //     return item.features.slice(3)
    // }, [item])

    return (
        <div className={styles.tariffCard}>
            <div className={styles.tariffCard__header}>
                <div className={styles.tariffCard__title}>
                    {item.title}
                </div>
                {item.discount && <div className={styles.tariffCard__discount}>{item.discount}</div>}
            </div>
            <div className={styles.tariffCard__priceBlock}>
                <div className={styles.tariffCard__price}>
                    <p className={styles.tariffCard__newPrice} style={{ color: item.oldPrice ? '#5329FF' : '#1A1A1A' }}>{formatPrice(item.price.toString(), '₽')}</p>
                    {item.oldPrice && <div className={styles.tariffCard__oldPrice}>{item.oldPrice}</div>}
                </div>
            </div>
            <hr className={styles.tariffCard__divider} style={{ margin: 0, padding: 0 }} />

            <div className={styles.tariffCard__features}>
                <button className={styles.tariffCard__infoButton} onClick={() => setDescriptionItem(item)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="#5329FF" strokeOpacity="0.1" strokeWidth="1.5" />
                        <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#5329FF" fillOpacity="0.5" />
                    </svg>
                    Что входит?
                </button>
                {/* <div className={`${styles.tariffCard__feature} ${styles.tariffCard__feature_visible}`}>
                    {item.description}
                </div> */}
                <div className={`${styles.tariffCard__feature} ${styles.tariffCard__feature_visible}`}>
                    Подписка предоставляет доступ к сервису на весь оплаченный период.
                </div>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#5329FF1A',
                        colorPrimaryHover: '#5329FF1A',
                        fontSize: 12,
                        //@ts-ignore
                        fontWeight: 700,
                        height: 46,
                        width: '100%',
                        controlHeightLG: 46,
                    },
                    components: {
                        Button: {
                            primaryShadow: 'transparent',
                            primaryColor: '#5329FF'
                        }
                    }
                }}
            >
                <Button
                    size='large'
                    type='primary'
                    onClick={() => action()}
                    loading={isWidgetActive && activatedSubscription && activatedSubscription === item.title}
                    disabled={activatedSubscription && activatedSubscription !== item.title && isWidgetActive}
                    style={{ color: '#5329FF', fontWeight: 600 }}
                >
                    Активировать
                </Button>
            </ConfigProvider>


        </div>
    );
};


const sections = [
    { id: 'competitors', name: 'Анализ конкурентов', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'niches', name: 'Анализ ниш и трендов', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'finances', name: 'Мои финансы', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'advertising', name: 'Моя реклама', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'seo', name: 'SEO', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'rnp', name: 'РНП (Рука на пульсе)', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isNew: true },
];

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        },
        Select: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
        }
    }
}

const TariffCalculator = ({ open, setIsOpen }) => {

    const [activeTab, setActiveTab] = useState('3 месяца')
    const [selectedSections, setSelectedSections] = useState<string[]>([])
    const [promocode, setPromocode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('instant')

    const toggleSection = (sectionId: string) => {
        setSelectedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        )
    }

    const removeSection = (sectionId: string) => {
        setSelectedSections(prev => prev.filter(id => id !== sectionId))
    }

    const selectedSectionsData = sections.filter(s => selectedSections.includes(s.id))
    const totalPrice = selectedSectionsData.reduce((sum, s) => sum + s.price, 0)
    const totalDiscount = selectedSectionsData.reduce((sum, s) => sum + (s.oldPrice - s.price), 0)

    return (
        <Modal
            open={open}
            footer={null}
            width={960}
            onCancel={() => setIsOpen(false)}
            closeIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                </svg>
            }
        >
            <div className={styles.tariffCalc}>
                <p className={styles.tariffCalc__title}>Калькулятор тарифа</p>

                <div className={styles.widget__tabs}>
                    {tabs.map(_ => {
                        return (
                            <button
                                className={_.title === activeTab ? `${styles.widget__tab} ${styles.widget__tab_active}` : styles.widget__tab}
                                onClick={() => setActiveTab(_.title)}
                                key={_.title}
                            >
                                {_.title}
                                {_.discount &&
                                    <div className={_.title === activeTab ? styles.widget__tabDiscount_active : styles.widget__tabDiscount}>{_.discount}</div>
                                }
                            </button>
                        )
                    })}
                </div>

                <div className={styles.tariffCalc__body}>
                    <div className={styles.tariffCalc__bodyLeft}>
                        <div className={styles.tariffCalc__params}>
                            <p className={styles.tariffCalc__subtitle}>Разделы</p>

                            <div className={styles.tariffCalc__sections}>
                                {sections.map(section => {
                                    const isSelected = selectedSections.includes(section.id)
                                    return (
                                        <CalcOptionItem
                                            key={section.id}
                                            section={section}
                                            onChange={() => toggleSection(section.id)}
                                            isSelected={isSelected}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className={styles.tariffCalc__limits}>
                            <p className={styles.tariffCalc__subtitle}>Лимиты</p>
                            <div className={styles.tariffCalc__selectWrapper}>
                                <div>
                                    <PlainSelect
                                        optionsData={[
                                            { value: 0, label: 'до 3 магазинов' },
                                            { value: 1, label: 'до 5 магазинов' },
                                            { value: 2, label: 'до 10 магазинов' },
                                            { value: 3, label: 'более 10 магазинов' },
                                        ]}
                                        value={0}
                                        label='Лимит магазинов'
                                        selectId='shopLimit'
                                        handler={() => { }}
                                        disabled={false}
                                        allowClear={false}
                                        style={{ maxWidth: 'unset' }}
                                        mode=''
                                    />
                                </div>
                                <div>
                                    <PlainSelect
                                        optionsData={[
                                            { value: 0, label: 'до 1 000 000 рублей' },
                                            { value: 1, label: 'до 3 000 000 рублейти' },
                                            { value: 2, label: 'до 5 000 000 рублей' },
                                            { value: 3, label: 'до 10 000 000 рублей' },
                                            { value: 4, label: 'более 10 000 000 рублей' },
                                        ]}
                                        value={0}
                                        label=' Лимит выручки'
                                        selectId='shopLimit'
                                        handler={() => { }}
                                        disabled={false}
                                        allowClear={false}
                                        style={{ maxWidth: 'unset' }}
                                        mode=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tariffCalc__cart}>
                        <p className={styles.tariffCalc__subtitle}>Корзина</p>

                        <div className={styles.tariffCalc__cartContent}>

                            <div className={styles.tariffCalc__selectedSections}>
                                {selectedSectionsData?.map(section => (
                                    <div key={section.id} className={styles.tariffCalc__cartItem}>
                                        <div className={styles.tariffCalc__cartItemLeft}>
                                            <span className={styles.tariffCalc__cartItemPeriod}>{activeTab}</span>
                                            <span className={styles.tariffCalc__cartItemName}>{section.name}</span>
                                            <div className={styles.tariffCalc__cartItemPrices}>
                                                <span className={styles.tariffCalc__cartItemPrice}>
                                                    {formatPrice(section.price.toString(), '₽')}
                                                </span>
                                                <span className={styles.tariffCalc__cartItemOldPrice}>
                                                    {formatPrice(section.oldPrice.toString(), '₽')}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className={styles.tariffCalc__removeButton}
                                            onClick={() => removeSection(section.id)}
                                        >
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.0459 0.219727C8.3388 -0.0731134 8.81357 -0.0731489 9.10645 0.219727C9.39923 0.512609 9.39926 0.987406 9.10645 1.28027L5.72363 4.66309L9.10645 8.0459C9.3992 8.3388 9.39929 8.8136 9.10645 9.10645C8.8136 9.39929 8.3388 9.3992 8.0459 9.10645L4.66309 5.72363L1.28027 9.10645C0.987424 9.39924 0.512614 9.39918 0.219727 9.10645C-0.0730958 8.81357 -0.0730958 8.33878 0.219727 8.0459L3.60254 4.66309L0.219727 1.28027C-0.0731667 0.98738 -0.0731667 0.51262 0.219727 0.219727C0.51262 -0.0731666 0.98738 -0.0731666 1.28027 0.219727L4.66309 3.60254L8.0459 0.219727Z" fill="#8C8C8C" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {selectedSectionsData.length > 0 &&
                                <>
                                    <div className={styles.tariffCalc__promocode}>
                                        <p className={styles.tariffCalc__promocodeLabel}>Промокод</p>
                                        <ConfigProvider
                                            theme={inputTheme}
                                        >
                                            <Input
                                                placeholder="Если есть"
                                                value={promocode}
                                                onChange={(e) => setPromocode(e.target.value)}
                                                style={{
                                                    height: '38px',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    border: '1px solid #E8E8E8'
                                                }}
                                            />
                                        </ConfigProvider>
                                    </div>



                                    <div className={styles.tariffCalc__calculations}>
                                        <p className={styles.tariffCalc__calculationsLabel}>Расчеты</p>
                                        <div className={styles.tariffCalc__calculationRow}>
                                            <span>Оплата за разделы</span>
                                            <span>{formatPrice((totalPrice + totalDiscount).toString(), '₽')}</span>
                                        </div>
                                        <div className={styles.tariffCalc__calculationRow} style={{ color: '#00B69B' }}>
                                            <span>Скидки</span>
                                            <span>−{formatPrice(totalDiscount.toString(), '₽')}</span>
                                        </div>
                                    </div>


                                    <div className={styles.tariffCalc__paymentMethod}>
                                        <p className={styles.tariffCalc__paymentMethodLabel}>Способ получения</p>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: '#5329FF',
                                                }
                                            }}
                                        >
                                            <Radio.Group
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                style={{ width: '100%' }}
                                            >
                                                <Radio value="instant" style={{ width: '100%', marginBottom: '12px' }}>
                                                    <div>
                                                        <div style={{ fontWeight: 500, fontSize: '14px', color: '#1A1A1A' }}>
                                                            Моментально
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#8C8C8C' }}>
                                                            Применить подписку сразу после оплаты
                                                        </div>
                                                    </div>
                                                </Radio>
                                                <Radio value="after_subscription">
                                                    <div>
                                                        <div style={{ fontWeight: 500, fontSize: '14px', color: '#1A1A1A' }}>
                                                            После текущей подписки
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#8C8C8C' }}>
                                                            Применить подписку после окончания текущей
                                                        </div>
                                                    </div>
                                                </Radio>
                                            </Radio.Group>
                                        </ConfigProvider>
                                    </div>
                                </>
                            }

                            <div className={styles.tariffCalc__total}>
                                <div className={styles.tariffCalc__totalRow}>
                                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Итого</span>
                                    <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                        {formatPrice(totalPrice.toString(), '₽')}
                                    </span>
                                </div>
                            </div>

                            {selectedSectionsData.length > 0 &&
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                            fontSize: 12,
                                            controlHeightLG: 38,
                                        },
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        disabled={selectedSectionsData.length === 0}
                                        style={{
                                            marginTop: '16px',
                                            borderRadius: '8px',
                                            fontWeight: 600
                                        }}
                                    >
                                        К оплате
                                    </Button>
                                </ConfigProvider>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


const CalcOptionItem = ({
    section,
    isSelected,
    onChange,
}) => {

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

    return (
        <div className={styles.tariffCalc__sectionWrapper}>
            <div className={styles.tariffCalc__section}>
                <div className={styles.tariffCalc__sectionLeft}>
                    <button className={isDescriptionOpen ? `${styles.tariffCalc__accButton} ${styles.tariffCalc__accButton_active}` : styles.tariffCalc__accButton} onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.223128 0.223128C0.520632 -0.074376 1.00298 -0.074376 1.30048 0.223128L5.33264 4.25529L9.3648 0.223128C9.6623 -0.074376 10.1447 -0.074376 10.4422 0.223128C10.7397 0.520632 10.7397 1.00298 10.4422 1.30048L5.33264 6.41L0.223128 1.30048C-0.074376 1.00298 -0.074376 0.520632 0.223128 0.223128Z" fill="#8C8C8C" />
                        </svg>
                    </button>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                            },
                            components: {
                                Switch: {
                                    trackMinWidth: 32
                                }
                            }
                        }}
                    >
                        <Switch
                            checked={isSelected}
                            onChange={onChange}
                        />
                    </ConfigProvider>
                    <div className={styles.tariffCalc__sectionInfo}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={styles.tariffCalc__sectionName}>{section.name}</span>
                            {section.isNew && (
                                <span className={styles.tariffCalc__newBadge}>New!</span>
                            )}
                        </div>
                        {/* <span className={styles.tariffCalc__sectionDescription}>
                    Описание что входит в раздел
                </span> */}
                    </div>
                </div>
                <div className={styles.tariffCalc__sectionPrices}>
                    <span className={styles.tariffCalc__oldPrice}>{formatPrice(section.oldPrice.toString(), '₽')}</span>
                    <div className={styles.tariffCalc__priceWrapper}>
                        <span className={styles.tariffCalc__newPrice} style={{ color: !isSelected ? '#1A1A1A' : '' }}>{formatPrice(section.price.toString(), '₽')}</span>
                        <span className={styles.tariffCalc__pricePerMonth}>
                            {formatPrice(section.pricePerMonth.toString(), '₽/мес')}
                        </span>
                    </div>
                </div>
            </div>
            {isDescriptionOpen &&
                <div className={styles.tariffCalc__sectionDescriptionWrapper}>
                    <span className={styles.tariffCalc__sectionDescription}>
                        Описание что входит в раздел
                    </span>
                </div>
            }
        </div>
    )
}



/**
 * {
  "TransactionId": "3261706281", // -- засунуть что-нить рандомное (uuid?)
  "Amount": "10.00", // -- сумма подписки
  "Currency": "RUB",
  "PaymentAmount": "10.00", // -- сумма подписки
  "PaymentCurrency": "RUB",
  "OperationType": "Payment",
  "InvoiceId": "radar-2424-05012026-104726", // -- см строку 306
  "AccountId": "radar-2424", // -- radar-${user.id}
  "SubscriptionId": "sc_d475206edbee8ee7bb9b8888e6594", // -- sc_invoiceId - строка 1335
  "Name": "",
  "Email": "aam051@yandex.ru", // -- почта юзера
  "DateTime": "2026-01-05 05:49:44", // -- текущая
  "IpAddress": "38.97.7.143",
  "IpCountry": "US",
  "IpCity": "Остин",
  "IpRegion": "Техас",
  "IpDistrict": "Остин",
  "IpLatitude": "30.26715",
  "IpLongitude": "-97.74306",
  "CardId": "",
  "CardFirstSix": "220070",
  "CardLastFour": "4377",
  "CardType": "MIR",
  "CardExpDate": "07/34",
  "Issuer": "T-Bank (Tinkoff)",
  "IssuerBankCountry": "RU",
  "Description": "Оплата подписки в Radar Analytica",
  "AuthCode": "085458",
  "Token": "tk_80040cbc23c68dbf209009d56aa2c", // tk_invoiceId
  "TestMode": "0",
  "Status": "Completed",
  "GatewayName": "Tbank",
  "Data": {
    "CloudPayments": {
      "CustomerReceipt": {
        "Items": [
          {
            "label": "Подписка Радар Аналитика",
            "price": 5460,
            "quantity": 1,
            "amount": 5460,
            "vat": 20,
            "method": 0,
            "object": 0
          }
        ],
        "email": "staf118@mail.ru",
        "phone": "",
        "isBso": false,
        "amounts": {
          "electronic": 5460,
          "advancePayment": 0,
          "credit": 0,
          "provision": 0
        }
      },
      "recurrent": {
        "interval": "Month",
        "period": 6,
        "startDate": "2026-07-07T10:00:00",
        "amount": 5460,
        "customerReceipt": {
          "Items": [
            {
              "label": "Подписка Радар Аналитика",
              "price": 5460,
              "quantity": 1,
              "amount": 5460,
              "vat": 20,
              "method": 0,
              "object": 0
            }
          ],
          "email": "staf118@mail.ru",
          "phone": "",
          "isBso": false,
          "amounts": {
            "electronic": 5460,
            "advancePayment": 0,
            "credit": 0,
            "provision": 0
          }
        }
      }
    }
  },
  "TotalFee": "3.90",
  "CardProduct": "TKN",
  "PaymentMethod": "TinkoffPay",
  "Rrn": "135021423974",
  "InstallmentTerm": "",
  "InstallmentMonthlyPayment": "",
  "CustomFields": ""
}
 */