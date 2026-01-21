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
import { v4 as uuid } from 'uuid';
import moment from 'moment';

export const tariffsList = [
    {
        title: 'Старт',
        id: 'start',
        priceList: {
            "1 месяц": { price: 1300, oldPrice: null },
            "3 месяца": { price: 3315, oldPrice: 3900 },
            "6 месяцев": { price: 5460, oldPrice: 7800 },
            "12 месяцев": { price: 7800, oldPrice: 15600 },
        },
        discount: null,
        price: 1300,
        oldPrice: null,
        value: 'start',
        primaryColor: '#00B69B',
        secondaryColor: '#00B69B12',
        newFeatures: [
            { title: 'API', text: '1 подключенный магазин', iconIndex: 0 },
            { title: 'Продажи до 1,5 млн рублей ', text: 'Без учета СПП и WB кошелька', iconIndex: 1 },
        ],
        whatsInside: [
            {
                title: 'Мои финансы',
                children: [
                    { title: 'Сводка продаж', isIncluded: true },
                    { title: 'Отчет по неделям', isIncluded: true },
                    { title: 'РНП', isIncluded: false },
                    { title: 'Отчет о прибыли и убытках', isIncluded: false }
                ]
            },
            {
                title: 'Анализ конкурентов',
                children: [
                    { title: 'Калькулятор Unit-экономики', isIncluded: true },
                    { title: 'Анализ артикула', isIncluded: false },
                    { title: 'Анализ поставщика', isIncluded: false }
                ]
            },
            {
                title: 'Мои товары',
                children: [
                    { title: 'Аналитика по товарам', isIncluded: true },
                    { title: 'Контроль СПП', isIncluded: true },
                    { title: 'Создание до 5 групп товаров', isIncluded: true },
                    { title: 'АВС - анализ', isIncluded: false }
                ]
            },
            {
                title: 'Моя реклама',
                children: [
                    { title: 'Контроль ДРР', isIncluded: true },
                    { title: 'Аналитика РК', isIncluded: false }
                ]
            },
            {
                title: 'Анализ ниши и трендов',
                children: [
                    { title: 'Поиск прибыльной ниши', isIncluded: false },
                    { title: 'Поиск трендовых запросов', isIncluded: false },
                    { title: 'Анализ трендовой динамики запросов', isIncluded: false }
                ]
            },
            {
                title: 'SEO',
                children: [
                    { title: 'Трекинг позиций', isIncluded: false },
                    { title: 'Проверка выдачи SERP', isIncluded: false },
                    { title: 'Проверка позиций', isIncluded: false },
                    { title: 'Подбор ключевых запросов', isIncluded: false },
                    { title: 'Сравнение SEO с ТОПами', isIncluded: false }
                ]
            }
        ]
    },
    {
        title: 'Оптимальный',
        id: 'optimal',
        priceList: {
            "1 месяц": { price: 1300, oldPrice: null },
            "3 месяца": { price: 3315, oldPrice: 3900 },
            "6 месяцев": { price: 5460, oldPrice: 7800 },
            "12 месяцев": { price: 7800, oldPrice: 15600 },
        },
        discount: '-15%',
        primaryColor: '#00B69B',
        secondaryColor: '#00B69B12',
        price: 1300,
        oldPrice: null,
        value: 'start',
        newFeatures: [
            { title: 'API', text: '1 подключенный магазин', iconIndex: 0 },
            { title: 'Продажи до 1,5 млн рублей ', text: 'Без учета СПП и WB кошелька', iconIndex: 1 },
        ],
        whatsInside: [
            {
                title: 'Мои финансы',
                children: [
                    { title: 'Сводка продаж', isIncluded: true },
                    { title: 'Отчет по неделям', isIncluded: true },
                    { title: 'РНП', isIncluded: false },
                    { title: 'Отчет о прибыли и убытках', isIncluded: false }
                ]
            },
            {
                title: 'Анализ конкурентов',
                children: [
                    { title: 'Калькулятор Unit-экономики', isIncluded: true },
                    { title: 'Анализ артикула', isIncluded: false },
                    { title: 'Анализ поставщика', isIncluded: false }
                ]
            },
            {
                title: 'Мои товары',
                children: [
                    { title: 'Аналитика по товарам', isIncluded: true },
                    { title: 'Контроль СПП', isIncluded: true },
                    { title: 'Создание до 5 групп товаров', isIncluded: true },
                    { title: 'АВС - анализ', isIncluded: false }
                ]
            },
            {
                title: 'Моя реклама',
                children: [
                    { title: 'Контроль ДРР', isIncluded: true },
                    { title: 'Аналитика РК', isIncluded: false }
                ]
            },
            {
                title: 'Анализ ниши и трендов',
                children: [
                    { title: 'Поиск прибыльной ниши', isIncluded: false },
                    { title: 'Поиск трендовых запросов', isIncluded: false },
                    { title: 'Анализ трендовой динамики запросов', isIncluded: false }
                ]
            },
            {
                title: 'SEO',
                children: [
                    { title: 'Трекинг позиций', isIncluded: false },
                    { title: 'Проверка выдачи SERP', isIncluded: false },
                    { title: 'Проверка позиций', isIncluded: false },
                    { title: 'Подбор ключевых запросов', isIncluded: false },
                    { title: 'Сравнение SEO с ТОПами', isIncluded: false }
                ]
            }
        ]
    },
    {
        title: 'Расширенный',
        id: 'maximum',
        priceList: {
            "1 месяц": { price: 1300, oldPrice: null },
            "3 месяца": { price: 3315, oldPrice: 3900 },
            "6 месяцев": { price: 5460, oldPrice: 7800 },
            "12 месяцев": { price: 7800, oldPrice: 15600 },
        },
        discount: null,
        price: 1300,
        oldPrice: null,
        primaryColor: '#00B69B',
        secondaryColor: '#00B69B12',
        value: 'start',
        newFeatures: [
            { title: 'API', text: '1 подключенный магазин', iconIndex: 0 },
            { title: 'Продажи до 1,5 млн рублей ', text: 'Без учета СПП и WB кошелька', iconIndex: 1 },
        ],
        whatsInside: [
            {
                title: 'Мои финансы',
                children: [
                    { title: 'Сводка продаж', isIncluded: true },
                    { title: 'Отчет по неделям', isIncluded: true },
                    { title: 'РНП', isIncluded: false },
                    { title: 'Отчет о прибыли и убытках', isIncluded: false }
                ]
            },
            {
                title: 'Анализ конкурентов',
                children: [
                    { title: 'Калькулятор Unit-экономики', isIncluded: true },
                    { title: 'Анализ артикула', isIncluded: false },
                    { title: 'Анализ поставщика', isIncluded: false }
                ]
            },
            {
                title: 'Мои товары',
                children: [
                    { title: 'Аналитика по товарам', isIncluded: true },
                    { title: 'Контроль СПП', isIncluded: true },
                    { title: 'Создание до 5 групп товаров', isIncluded: true },
                    { title: 'АВС - анализ', isIncluded: false }
                ]
            },
            {
                title: 'Моя реклама',
                children: [
                    { title: 'Контроль ДРР', isIncluded: true },
                    { title: 'Аналитика РК', isIncluded: false }
                ]
            },
            {
                title: 'Анализ ниши и трендов',
                children: [
                    { title: 'Поиск прибыльной ниши', isIncluded: false },
                    { title: 'Поиск трендовых запросов', isIncluded: false },
                    { title: 'Анализ трендовой динамики запросов', isIncluded: false }
                ]
            },
            {
                title: 'SEO',
                children: [
                    { title: 'Трекинг позиций', isIncluded: false },
                    { title: 'Проверка выдачи SERP', isIncluded: false },
                    { title: 'Проверка позиций', isIncluded: false },
                    { title: 'Подбор ключевых запросов', isIncluded: false },
                    { title: 'Сравнение SEO с ТОПами', isIncluded: false }
                ]
            }
        ]
    },
    {
        title: 'Премиум',
        id: 'premium',
        priceList: {
            "1 месяц": { price: 1300, oldPrice: null },
            "3 месяца": { price: 3315, oldPrice: 3900 },
            "6 месяцев": { price: 5460, oldPrice: 7800 },
            "12 месяцев": { price: 7800, oldPrice: 15600 },
        },
        discount: null,
        price: 1300,
        oldPrice: null,
        primaryColor: '#0080FF',
        secondaryColor: '#0080FF12',
        value: 'start',
        newFeatures: [
            { title: 'API', text: '1 подключенный магазин', iconIndex: 0 },
            { title: 'Продажи до 1,5 млн рублей ', text: 'Без учета СПП и WB кошелька', iconIndex: 1 },
        ],
        description: 'Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель.'
    },
    {
        title: 'Агентский',
        id: 'agency',
        priceList: {
            "1 месяц": { price: 1300, oldPrice: null },
            "3 месяца": { price: 3315, oldPrice: 3900 },
            "6 месяцев": { price: 5460, oldPrice: 7800 },
            "12 месяцев": { price: 7800, oldPrice: 15600 },
        },
        discount: null,
        primaryColor: '#F0AD00',
        secondaryColor: '#F0AD0012',
        price: 1300,
        oldPrice: null,
        value: 'start',
        newFeatures: [
            { title: 'API', text: '1 подключенный магазин', iconIndex: 0 },
            { title: 'Продажи до 1,5 млн рублей ', text: 'Без учета СПП и WB кошелька', iconIndex: 1 },
        ],
        description: `Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель. Lorem Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель. Lorem Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель. Lorem
        Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель. `
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


export const TariffsWidget = () => {
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
    const [isCartModalVisible, setIsCartModalVisible] = useState(false)
    const [activeCartTariff, setActiveCartTariff] = useState(null)

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
            <div className={styles.page__tariffsList}>
                {tariffsList.map((item, index) => (
                    <TariffCard
                        key={index}
                        item={item}
                        activatedSubscription={activatedSubscription}
                        isWidgetActive={isWidgetActive}
                        activeTab={activeTab}
                        action={() => {
                            // if (import.meta.env.PROD && URL === 'https://radar-analytica.ru') {
                            //     setActivatedSubscription(item.title);
                            //     setIsWidgetActive(true);
                            //     pay(item);
                            // } else {
                            //     setActivatedSubscription(item.title);
                            //     setIsWidgetActive(true);
                            //     fakePayFunction(item)
                            // }
                            setIsCartModalVisible(true)
                            setActiveCartTariff(item)
                        }}
                    />
                ))}

                <div className={styles.calcBlock}>
                    <div className={styles.calcBlock__header}>
                        <h3 className={styles.calcBlock__title}>Калькулятор тарифа</h3>
                        <p className={styles.calcBlock__text}>
                            Соберите свой тариф, добавив только необходимые разделы. Экономьте на выбранных опциях
                        </p>
                        <hr />
                        <p className={styles.calcBlock__title}>От 500 ₽</p>
                    </div>

                    <button className={styles.calcBlock__button} onClick={() => setIsCartModalVisible(true)}>
                        Настроить
                    </button>

                    <div className={styles.calcBlock__imageWrapper}>
                        <img src={cover} alt='' />
                    </div>
                </div>
            </div>

            <Cart
                open={isCartModalVisible}
                setIsOpen={setIsCartModalVisible}
                activeCartTariff={activeCartTariff}
                setActiveCartTariff={setActiveCartTariff}
            />

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
                        Оплата подписки RADAR ANALYTICA — {tariffsList?.find(_ => _.title === activatedSubscription)?.price}
                    </p>
                    <button
                        className={styles.fakePaymentModal__button}
                        onClick={getPaymentResult}
                    >
                        Оплатить
                    </button>
                </div>
            </Modal>
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



const TariffCard = ({ item, isWidgetActive, action, activatedSubscription, activeTab }) => {

    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const currentPrice = useMemo(() => {
        return item?.priceList[activeTab]
    }, [activeTab, item])

    return (
        <>
            <div className={styles.tariffCard}>
                <div className={styles.tariffCard__mainWrapper} style={{ height: item.whatsInside ? 'auto' : '100%' }}>
                    <div className={styles.tariffCard__wrapper}>
                        <div className={styles.tariffCard__header} style={{ backgroundColor: item.secondaryColor }}>
                            <div className={styles.tariffCard__title} style={{ '--pseudo-bg-color': item.primaryColor } as React.CSSProperties}>
                                {item.title}
                            </div>
                            {item.discount && <div className={styles.tariffCard__discount} style={{ backgroundColor: item.primaryColor }}>{item.discount}</div>}
                        </div>
                        <div className={styles.tariffCard__priceBlock}>
                            <div className={styles.tariffCard__price}>
                                <p className={styles.tariffCard__newPrice} style={{ color: currentPrice.oldPrice ? '#5329FF' : '#1A1A1A' }}>{formatPrice(currentPrice.price.toString(), '₽')}</p>
                                {currentPrice.oldPrice && <div className={styles.tariffCard__oldPrice}>{currentPrice.oldPrice}</div>}
                            </div>
                        </div>
                        <hr className={styles.tariffCard__divider} style={{ margin: 0, padding: 0 }} />

                        <div className={styles.tariffCard__features}>
                            {item?.newFeatures?.map((f) => {
                                return (
                                    <div key={f.title} className={styles.tariffCard__featuresListWrapper}>
                                        <div className={styles.tariffCard__featuresList} key={f.title}>
                                            {cardFeaturesIcons[f.iconIndex]}
                                            {f.title}
                                        </div>
                                        <span>{f.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className={styles.tariffCard__wrapper}>
                        {item.description &&
                            <div className={`${styles.tariffCard__feature} ${styles.tariffCard__feature_visible}`}>
                                {item.description}
                            </div>
                        }
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
                </div>

                {item.whatsInside &&
                    <div className={styles.tariffCard__mainWrapper} style={{ gap: 0 }}>
                        <div className={styles.tariffCard__accordSummary} onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                            Что входит?
                            <span>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                                </svg>
                                7 разделов
                            </span>
                        </div>
                        <ul className={isDetailsOpen ? `${styles.tariffCard__accordContent} ${styles.tariffCard__accordContent_open}` : styles.tariffCard__accordContent}>
                            {item.whatsInside.map((_, idx) => (
                                <li key={idx}>
                                    {_.title}
                                    <ul className={styles.tariffCard__innerList}>
                                        {_.children.map(child => (
                                            <li key={child.title} style={{ color: child.isIncluded ? '#1A1A1A' : '#8C8C8C' }}>
                                                {child.isIncluded &&
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                                                    </svg>
                                                }
                                                {!child.isIncluded &&
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM3.85095 3.32062C3.7045 3.17417 3.46706 3.17417 3.32062 3.32062C3.17417 3.46707 3.17417 3.7045 3.32062 3.85095L4.46967 5L3.32062 6.14905C3.17417 6.2955 3.17417 6.53293 3.32062 6.67938C3.46706 6.82583 3.7045 6.82583 3.85095 6.67938L5 5.53033L6.14905 6.67938C6.29549 6.82583 6.53293 6.82583 6.67938 6.67938C6.82582 6.53293 6.82582 6.2955 6.67938 6.14905L5.53033 5L6.67938 3.85095C6.82582 3.7045 6.82582 3.46707 6.67938 3.32062C6.53293 3.17417 6.29549 3.17418 6.14905 3.32062L5 4.46967L3.85095 3.32062Z" fill="#B0B0B0" />
                                                    </svg>
                                                }
                                                {child.title}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </>
    );
};


const sections = [
    {
        id: 'competitors', title: 'Анализ конкурентов', price: 3000, oldPrice: 3900, pricePerMonth: 1000,
        children: [
            { id: 'calc', title: 'Калькулятор Unit-экономики', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, },
            { id: 'skuAnalysis', title: 'Анализ артикула', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false },
            { id: 'supplierAnalysis', title: 'ААнализ поставщика', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false },
        ]
    },
    { id: 'niches', title: 'Анализ ниш и трендов', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'finances', title: 'Мои финансы', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'advertising', title: 'Моя реклама', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'seo', title: 'SEO', price: 3000, oldPrice: 3900, pricePerMonth: 1000 },
    { id: 'rnp', title: 'РНП (Рука на пульсе)', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isNew: true },
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

const Cart = ({ open, setIsOpen, activeCartTariff, setActiveCartTariff }) => {

    const [activeTab, setActiveTab] = useState('3 месяца')
    const [selectedSections, setSelectedSections] = useState<any[]>([{ id: 'api', title: 'API', price: 3000, oldPrice: 3900, pricePerMonth: 1000, value: 1 }])
    const [promocode, setPromocode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('instant')

    const toggleSection = (sectionId: string, childId?: string) => {

        if (!childId) {
            let currSection = sections.find(_ => _.id === sectionId)
            if (!currSection) return;
            setSelectedSections((prev) => {
                const includeIndex = prev.findIndex(_ => _.id === sectionId);
                if (includeIndex !== -1) {
                    const prevCopy = [...prev]
                    prevCopy.splice(includeIndex, 1)
                    return prevCopy
                } else {
                    if (currSection.children) {
                        currSection.children = currSection.children.map(child => ({...child, isActive: true}))
                    }
                    return [...prev, currSection]
                }
            })
        } 
    }

    const removeSection = (sectionId: string) => {
        setSelectedSections(prev => prev.filter(id => id !== sectionId))
    }

    // const selectedSectionsData = sections.filter(s => selectedSections.includes(s.id))
    const totalSelectionsPrice = selectedSections.reduce((sum, s) => sum + s.price, 0)
    const totalSelectionsDiscount = selectedSections.reduce((sum, s) => sum + (s.oldPrice - s.price), 0)

    return (
        <Modal
            open={open}
            footer={null}
            width={960}
            onCancel={() => { setIsOpen(false); setActiveCartTariff(null); setSelectedSections([]) }}
            closeIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                </svg>
            }
        >
            <div className={styles.tariffCalc}>
                <p className={styles.tariffCalc__title}>
                    {activeCartTariff && `Тариф ${activeCartTariff.title}`}
                    {!activeCartTariff && `Калькулятор тарифа`}
                </p>

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
                    {/* если кликнули на регулярный тариф (предустановленный) то просто показываем его описание */}
                    {activeCartTariff &&
                        <div className={styles.tariffCalc__bodyLeft}>
                            <div className={styles.tariffCalc__params}>
                                <div className={styles.tariffCard__features}>
                                    {activeCartTariff?.newFeatures?.map((f) => {
                                        return (
                                            <div key={f.title} className={styles.tariffCard__featuresListWrapper}>
                                                <div className={styles.tariffCard__featuresList} key={f.title}>
                                                    {cardFeaturesIcons[f.iconIndex]}
                                                    {f.title}
                                                </div>
                                                <span>{f.text}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                {activeCartTariff.whatsInside &&
                                    <div
                                        className={styles.tariffCard__mainWrapper}
                                        style={{
                                            gap: 0,
                                            backgroundColor: 'transparent',
                                            padding: '12px 0',
                                            borderTop: '1px solid #E8E8E8',
                                            borderRadius: 0
                                        }}
                                    >
                                        <div className={styles.tariffCard__accordSummary}>
                                            Что входит?
                                        </div>
                                        <ul className={styles.tariffCard__accordContent} style={{ maxHeight: '2000px', opacity: 1 }}>
                                            {activeCartTariff.whatsInside.map((_, idx) => (
                                                <li key={idx} style={{ border: idx === 0 && 'none' }}>
                                                    {_.title}
                                                    <ul className={styles.tariffCard__innerList}>
                                                        {_.children.map(child => (
                                                            <li key={child.title} style={{ color: child.isIncluded ? '#1A1A1A' : '#8C8C8C' }}>
                                                                {child.isIncluded &&
                                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                                                                    </svg>
                                                                }
                                                                {!child.isIncluded &&
                                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM3.85095 3.32062C3.7045 3.17417 3.46706 3.17417 3.32062 3.32062C3.17417 3.46707 3.17417 3.7045 3.32062 3.85095L4.46967 5L3.32062 6.14905C3.17417 6.2955 3.17417 6.53293 3.32062 6.67938C3.46706 6.82583 3.7045 6.82583 3.85095 6.67938L5 5.53033L6.14905 6.67938C6.29549 6.82583 6.53293 6.82583 6.67938 6.67938C6.82582 6.53293 6.82582 6.2955 6.67938 6.14905L5.53033 5L6.67938 3.85095C6.82582 3.7045 6.82582 3.46707 6.67938 3.32062C6.53293 3.17417 6.29549 3.17418 6.14905 3.32062L5 4.46967L3.85095 3.32062Z" fill="#B0B0B0" />
                                                                    </svg>
                                                                }
                                                                {child.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {/* Если это калькулятор, то показываем опции для выбора */}
                    {!activeCartTariff &&
                        <div className={styles.tariffCalc__bodyLeft}>
                            <div className={styles.tariffCalc__params}>
                                <div className={styles.tariffCalc__sectionWrapper}>
                                    <div className={styles.tariffCalc__section}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div className={styles.tariffCard__featuresList}>
                                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.34167 0.380004L1.175 2.98417C0.444048 3.44102 0 4.24219 0 5.10417V10.6663C0 11.5282 0.444049 12.3294 1.175 12.7863L5.34167 15.3904C6.15235 15.8971 7.18099 15.8971 7.99166 15.3904L12.1583 12.7863C12.8893 12.3294 13.3333 11.5282 13.3333 10.6663V5.10417C13.3333 4.24219 12.8893 3.44102 12.1583 2.98417L7.99166 0.380004C7.18099 -0.126668 6.15234 -0.126668 5.34167 0.380004ZM7.70833 7.88208C7.70833 7.30678 7.24196 6.84041 6.66667 6.84041C6.09137 6.84041 5.625 7.30678 5.625 7.88208V7.88808C5.625 8.46338 6.09137 8.92975 6.66667 8.92975C7.24196 8.92975 7.70833 8.46338 7.70833 7.88808V7.88208Z" fill="#363538" />
                                                </svg>
                                                API
                                            </div>
                                            <span style={{ fontSize: '10px', color: '#8c8c8c' }}>Количество подключенных магазинов</span>
                                        </div>
                                        <div className={styles.tariffCalc__counter}>
                                            <button className={styles.tariffCalc__counterButton}>-</button>
                                            <div className={styles.tariffCalc__counterValue}>
                                                1
                                            </div>
                                            <button className={styles.tariffCalc__counterButton}>+</button>
                                        </div>
                                    </div>
                                </div>

                                <p className={styles.tariffCalc__subtitle}>Разделы</p>

                                <div className={styles.tariffCalc__sections}>
                                    {sections.map(section => {
                                        const isSelected = selectedSections.findIndex(_ => _.id === section.id) !== -1
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
                            {/* limits */}
                            {/* <div className={styles.tariffCalc__limits}>
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
                            </div> */}
                        </div>
                    }

                    <div className={styles.tariffCalc__cart}>
                        <p className={styles.tariffCalc__subtitle}>Корзина</p>

                        {selectedSections.length === 0 && !activeCartTariff ? (
                            <div className={styles.tariffCalc__emptyCart}>
                                <p className={styles.tariffCalc__emptyCartText}>
                                    В вашей корзине пока ничего нет
                                </p>
                                <p className={styles.tariffCalc__emptyCartSubtext}>
                                    Добавьте хотя бы один раздел
                                </p>
                            </div>
                        ) : (
                            <div className={styles.tariffCalc__cartContent}>

                                <div className={styles.tariffCalc__selectedSections}>
                                    {selectedSections?.map(section => (
                                        <div key={section.id} className={styles.tariffCalc__cartItem}>
                                            <span className={styles.tariffCalc__cartItemName}>{section.title}</span>
                                            {section.children && section.children?.map(_ => _.isActive && (
                                                <div className={styles.tariffCalc__options} key={_.title}>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                                                    </svg>
                                                    {_.title}
                                                </div>
                                            ))}
                                            <div className={styles.tariffCalc__cartItemLeft}>
                                                <span className={styles.tariffCalc__cartItemPeriod}>{activeTab}</span>
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
                                    {activeCartTariff &&
                                        <div className={styles.tariffCalc__cartItem}>
                                            <span className={styles.tariffCalc__cartItemName}>{activeCartTariff.title}</span>
                                            <div className={styles.tariffCalc__cartItemLeft}>
                                                <span className={styles.tariffCalc__cartItemPeriod}>{activeTab}</span>
                                                <div className={styles.tariffCalc__cartItemPrices}>
                                                    <span className={styles.tariffCalc__cartItemPrice}>
                                                        {formatPrice(activeCartTariff?.price?.toString(), '₽')}
                                                    </span>
                                                    {activeCartTariff?.oldPrice &&
                                                        <span className={styles.tariffCalc__cartItemOldPrice}>
                                                            {formatPrice(activeCartTariff?.oldPrice?.toString(), '₽')}
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                                {(selectedSections.length > 0 || activeCartTariff) &&
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
                                            {selectedSections.length > 0 &&
                                                <>
                                                    <div className={styles.tariffCalc__calculationRow}>
                                                        <span>Оплата за разделы</span>
                                                        <span>{formatPrice((totalSelectionsPrice + totalSelectionsDiscount).toString(), '₽')}</span>
                                                    </div>
                                                    <div className={styles.tariffCalc__calculationRow} style={{ color: '#00B69B' }}>
                                                        <span>Скидки</span>
                                                        <span>−{formatPrice(totalSelectionsDiscount.toString(), '₽')}</span>
                                                    </div>
                                                </>
                                            }
                                            {activeCartTariff &&
                                                <>
                                                    <div className={styles.tariffCalc__calculationRow}>
                                                        <span>Оплата за тариф</span>
                                                        <span>{formatPrice(activeCartTariff?.price?.toString(), '₽')}</span>
                                                    </div>
                                                    <div className={styles.tariffCalc__calculationRow} style={{ color: '#00B69B' }}>
                                                        <span>Скидки</span>
                                                        {activeCartTariff?.oldPrice &&
                                                            <span>−{formatPrice((activeCartTariff?.price - (activeCartTariff?.oldPrice)).toString(), '₽')}</span>
                                                        }
                                                        {!activeCartTariff?.oldPrice &&
                                                            <span>{formatPrice('0', '₽')}</span>
                                                        }
                                                    </div>
                                                </>
                                            }


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
                                        {selectedSections.length > 0 &&
                                            <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                                {formatPrice(totalSelectionsPrice?.toString(), '₽')}
                                            </span>
                                        }
                                        {activeCartTariff &&
                                            <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                                {formatPrice(activeCartTariff?.price?.toString(), '₽')}
                                            </span>
                                        }
                                    </div>
                                </div>

                                {(selectedSections.length > 0 || activeCartTariff) &&
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
                                            disabled={selectedSections.length === 0 && !activeCartTariff}
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
                        )}
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
                            <span className={styles.tariffCalc__sectionName}>{section.title}</span>
                            {section.isNew && (
                                <span className={styles.tariffCalc__newBadge}>New!</span>
                            )}
                        </div>
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
            {isDescriptionOpen && section.children &&
                <div className={styles.tariffCalc__sectionDescriptionWrapper}>
                    {section.children.map(_ => (
                        <div className={styles.tariffCalc__sectionDescription}>
                            <div className={styles.tariffCalc__switch}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                        },
                                    }}
                                >
                                    <Switch
                                        size='small'
                                        checked={_.isActive}
                                        onChange={onChange}
                                    />
                                </ConfigProvider>
                                <div className={styles.tariffCalc__sectionInfo}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className={styles.tariffCalc__sectionName}>{_.title}</span>
                                        {_.isNew && (
                                            <span className={styles.tariffCalc__newBadge}>New!</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.tariffCalc__sectionPrices}>
                                <span className={styles.tariffCalc__oldPrice}>{formatPrice(_.oldPrice.toString(), '₽')}</span>
                                <div className={styles.tariffCalc__priceWrapper}>
                                    <span className={styles.tariffCalc__newPrice} style={{ color: !isSelected ? '#1A1A1A' : '' }}>{formatPrice(section.price.toString(), '₽')}</span>
                                    <span className={styles.tariffCalc__pricePerMonth}>
                                        {formatPrice(_.pricePerMonth.toString(), '₽/мес')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

