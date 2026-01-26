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
import { Checkout } from '@/features';
import type { ITariffCard, IPaymentItem, IPromocode } from '@/shared/models/tariffs/tariffs';
import { Link } from 'react-router-dom';

export const tariffsList: ITariffCard[] = [
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
        ],
        buttonType: 'modal'
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
        ],
        buttonType: 'modal'
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
        ],
        buttonType: 'modal'
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
        description: 'Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель.',
        buttonType: 'link'
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
        Важно: в течение этого периода вы можете оцифровать не более 5 календарных недель. `,
        buttonType: 'link'
    },
];

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const tabs = [
    { title: '1 месяц', discount: null, value: '1month' },
    { title: '3 месяца', discount: '-15%', value: '3month' },
    { title: '6 месяцев', discount: '-15%', value: '6month' },
    { title: '12 месяцев', discount: '-15%', value: '12month' },
]

/*
{
  "price": 10174,
  "oldPrice": 11970,
  "value": "3month"
}
  */


export const TariffsWidget = () => {
    // ------------ states and vars ---------------//
    const { user, logout, authToken } = useContext(AuthContext);
    const { isDemoUser } = useDemoMode();
    const [activatedSubscription, setActivatedSubscription] = useState(null) // подписка на которую кликнули
    const [isWidgetActive, setIsWidgetActive] = useState(false); // активен ли виджет клаудпэйментс
    const [trialExpired, setTrialExpired] = useState(user?.is_test_used); // хз зачем это в отдельное состояние вынесли но пусть будет
    const [subscriptionDiscount, setSubscriptionDiscount] = useState(
        user?.is_subscription_discount
    );// хз зачем это в отдельное состояние вынесли но пусть будет
    const [fakePaymentDataObject, setFakePaymentDataObject] = useState(null) // имитируем обьект клаудпейментс для тестовой оплаты
    const [fakeRequestStatus, setFakeRequestStatus] = useState(initRequestStatus) // статус тестового запроса
    const [activeTab, setActiveTab] = useState('1 месяц') // табы выбора периода тарифа
    const [isCartModalVisible, setIsCartModalVisible] = useState(false) // видимость модалки корзины
    const [activeCartTariff, setActiveCartTariff] = useState<ITariffCard | null>(null) // Выбраный тариф для показа в модалке корзины
    const [isDetailsOpen, setIsDetailsOpen] = useState(false) // Стейт показа что входит в тариф

    const navigate = useNavigate();
    const location = useLocation();

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

            document.body.appendChild(script);
        };
        //@ts-ignore
        if (!window.cp) {
            loadCloudPaymentsScript();
        }

        return () => {
            const script = document.querySelector('script[src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);
    // -------------------------------- pay function -------------------------------//
    const pay = async (
        _: IPaymentItem,
        paymentType: 'instant' | 'after_subscription' | 'boost',
        promocode?: IPromocode
    ) => {
        if (isDemoUser) {
            await logout();
            return;
        }
        const selectedPeriod = _.period;
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
        let promocodeStartDateBonus = promocode && promocode.type === 'time' ? promocode.amount : 0;
        let periodSubscribe = '';
        let amountSubscribe = 0;
        let firstAmount = 0;
        // ---------------------------------------------------------------------------------------------------------//
        let startDateSubscribe = new Date(); // <------- HERE WILL BE A PART WITH 'INSTANT' | 'AFTER CURRENT' LOGIC ACCORDING TO @PAYMENTTYPE ARG
        // ---------------------------------------------------------------------------------------------------------//
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
            amountSubscribe = _.fullPrice;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 1;
            if (newTrialExpired) {
                startDateSubscribe.setMonth(
                    //@ts-ignore
                    startDateSubscribe.getMonth() + periodSubscribe + promocodeStartDateBonus
                );
            } else {
                startDateSubscribe.setDate(startDateSubscribe.getDate() + (user?.test_days || 3)) + promocodeStartDateBonus;
            }
        }
        if (selectedPeriod === '3month') {
            amountSubscribe = _.fullPrice;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 3;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe + promocodeStartDateBonus
            );
        }
        if (selectedPeriod === '6month') {
            amountSubscribe = _.fullPrice;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 6;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe + promocodeStartDateBonus
            );
        }
        if (selectedPeriod === '12month') {
            amountSubscribe = _.fullPrice;
            firstAmount = _.price;
            //@ts-ignore
            periodSubscribe = 12;
            startDateSubscribe.setMonth(
                //@ts-ignore
                startDateSubscribe.getMonth() + periodSubscribe + promocodeStartDateBonus
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

        const receiptReccurentPayments = {
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
        const receiptFirstPayment = {
            Items: [
                //товарные позиции
                {
                    label: 'Подписка Радар Аналитика', //наименование товара
                    price: firstAmount, //цена
                    quantity: 1.0, //количество
                    amount: firstAmount, //сумма
                    vat: 20, //ставка НДС
                    method: 0, // тег-1214 признак способа расчета - признак способа расчета
                    object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
                },
            ],
            email: user.email, //e-mail покупателя, если нужно отправить письмо с чеком
            phone: '', //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
            isBso: false, //чек является бланком строгой отчетности
            amounts: {
                electronic: firstAmount, // Сумма оплаты электронными деньгами
                advancePayment: 0.0, // Сумма из предоплаты (зачетом аванса) (2 знака после точки)
                credit: 0.0, // Сумма постоплатой(в кредит) (2 знака после точки)
                provision: 0.0, // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после точки)
            },
        };

        const data = {};
        //@ts-ignore
        data.CloudPayments = {
            CustomerReceipt: receiptFirstPayment, //чек для первого платежа
            recurrent: {
                interval: 'Month',
                period: periodSubscribe,
                startDate: startDateSubscribe,
                amount: amountSubscribe,
                customerReceipt: receiptReccurentPayments, //чек для регулярных платежей
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
    const fakePayFunction = async (
        _: IPaymentItem,
        paymentType: 'instant' | 'after_subscription' | 'boost',
        promocode?: IPromocode
    ) => {
        if (isDemoUser) {
            await logout();
            return;
        }
        const selectedPeriod = _.period;
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
                        isDetailsOpen={isDetailsOpen}
                        setIsDetailsOpen={setIsDetailsOpen}
                        action={() => {
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

                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: 'white',
                                colorPrimaryHover: 'white',
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
                                    primaryColor: '#5329FF',
                                    colorPrimaryActive: 'white'
                                }
                            }
                        }}
                    >
                        <Button
                            size='large'
                            type='primary'
                            loading={isWidgetActive && activatedSubscription && activatedSubscription === 'calculator'}
                            disabled={activatedSubscription && activatedSubscription !== 'calculator' && isWidgetActive}
                            style={{ color: '#5329FF', fontWeight: 600 }}
                            onClick={() => setIsCartModalVisible(true)}
                            className={styles.calcBlock__button}
                        >
                            Настроить
                        </Button>
                    </ConfigProvider>

                    {/* <button className={styles.calcBlock__button} onClick={() => setIsCartModalVisible(true)}>
                        Настроить
                    </button> */}

                    <div className={styles.calcBlock__imageWrapper}>
                        <img src={cover} alt='' />
                    </div>
                </div>
            </div>
            {/* cart */}
            <Modal
                open={isCartModalVisible}
                footer={null}
                width={960}
                onCancel={() => { setIsCartModalVisible(false); setActiveCartTariff(null); }}
                closeIcon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                }
            >
                <Checkout
                    activeCartTariff={activeCartTariff}
                    externalActiveTab={activeTab as '1 месяц' | '3 месяца' | '6 месяцев' | '12 месяцев'}
                    setExternalActiveTab={setActiveTab}
                    tabs={tabs as Array<{ title: '1 месяц' | '3 месяца' | '6 месяцев' | '12 месяцев', discount: string | null, value: string }>}
                    payFunction={(item: IPaymentItem, paymentType: 'instant' | 'after_subscription' | 'boost', promocode?: IPromocode) => {
                        setIsCartModalVisible(false)
                        setActivatedSubscription(item.title);
                        setIsWidgetActive(true);
                        pay(item, paymentType, promocode);
                        // if (import.meta.env.PROD && URL === 'https://radar-analytica.ru') {
                        //     setIsCartModalVisible(false)
                        //     setActivatedSubscription(item.title);
                        //     setIsWidgetActive(true);
                        //     pay(item, paymentType, promocode);
                        // } else {
                        //     setIsCartModalVisible(false)
                        //     setActivatedSubscription(item.title);
                        //     setIsWidgetActive(true);
                        //     fakePayFunction(item, paymentType, promocode)
                        // }
                    }}
                >
                    {activeCartTariff &&
                        <>
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
                            {activeCartTariff?.whatsInside &&
                                <div className={styles.tariffCard__mainWrapper} style={{ gap: 0, backgroundColor: 'transparent', padding: 0 }}>
                                    <ul className={`${styles.tariffCard__accordContent} ${styles.tariffCard__accordContent_open}`} style={{ margin: 0 }}>
                                        {activeCartTariff?.whatsInside.map((_, idx) => (
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
                        </>
                    }
                </Checkout>
            </Modal>
            {/* test payment */}
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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.77473 3.98136C3.77445 3.97372 3.77431 3.96604 3.77431 3.95833C3.77431 1.77221 5.54652 0 7.73265 0C9.91877 0 11.691 1.77221 11.691 3.95833C11.691 3.96604 11.6908 3.97372 11.6906 3.98136C13.1462 4.15302 14.3397 5.26725 14.5857 6.74367L15.4191 11.7437C15.7577 13.7754 14.1909 15.625 12.1311 15.625H3.33416C1.27436 15.625 -0.29245 13.7754 0.0461785 11.7437L0.879512 6.74367C1.12558 5.26723 2.31903 4.153 3.77473 3.98136ZM5.02431 3.95833C5.02431 2.46256 6.23688 1.25 7.73265 1.25C9.22842 1.25 10.441 2.46256 10.441 3.95833H5.02431ZM4.39921 8.125C4.85945 8.125 5.23254 7.7519 5.23254 7.29167C5.23254 6.83143 4.85945 6.45833 4.39921 6.45833C3.93897 6.45833 3.56588 6.83143 3.56588 7.29167C3.56588 7.7519 3.93897 8.125 4.39921 8.125ZM11.8992 7.29167C11.8992 7.7519 11.5261 8.125 11.0659 8.125C10.6056 8.125 10.2325 7.7519 10.2325 7.29167C10.2325 6.83143 10.6056 6.45833 11.0659 6.45833C11.5261 6.45833 11.8992 6.83143 11.8992 7.29167Z" fill="#1A1A1A" />
        </svg>
    ),
    (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.475024 5.45829L2.77899 1.61835C3.3814 0.614329 4.46642 0 5.6373 0H9.3627C10.5336 0 11.6186 0.614329 12.221 1.61835L14.525 5.45829C14.8358 5.97635 15 6.56913 15 7.17328V11.6667C15 13.5076 13.5076 15 11.6667 15H3.33333C1.49238 15 0 13.5076 0 11.6667V7.17328C0 6.56913 0.164193 5.97635 0.475024 5.45829ZM6.16593 5.83333H8.83422C10.105 5.83333 10.9083 4.46815 10.2911 3.35726C9.9972 2.82815 9.4395 2.5 8.83422 2.5H6.16593C5.56065 2.5 5.00295 2.82815 4.709 3.35726C4.09184 4.46815 4.89512 5.83333 6.16593 5.83333Z" fill="#1A1A1A" />
        </svg>
    )
]



const TariffCard = ({ item, isWidgetActive, action, activatedSubscription, activeTab, isDetailsOpen, setIsDetailsOpen }) => {

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
                                        primaryColor: '#5329FF',
                                        colorPrimaryActive: '#5329FF1A'
                                    }
                                }
                            }}
                        >
                            {item.buttonType === 'modal' &&
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
                            }
                            {item.buttonType === 'link' &&
                                <Button
                                    size='large'
                                    variant='solid'
                                    color='primary'
                                    href='https://t.me/radar_analytica_support'
                                    target='_blank'
                                    loading={isWidgetActive && activatedSubscription && activatedSubscription === item.title}
                                    disabled={activatedSubscription && activatedSubscription !== item.title && isWidgetActive}
                                    style={{ color: '#5329FF', fontWeight: 600, textDecoration: 'none' }}
                                >
                                    Связаться
                                </Button>
                            }
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



