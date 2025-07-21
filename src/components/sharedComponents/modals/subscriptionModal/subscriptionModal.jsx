import React, { useState, useEffect, useContext } from 'react'
import styles from './subscriptionModal.module.css'
import { Modal, ConfigProvider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../../../service/config'
import { ServiceFunctions } from '../../../../service/serviceFunctions'
import { jwtDecode } from "jwt-decode";
import AuthContext from '../../../../service/AuthContext'
import { getDayDeclension } from '../../../../service/utils'

const SubscriptionModal = ({ visible, visibilityHandler }) => {

  const { authToken, user } = useContext(AuthContext)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('1month');
  const [trialExpired, setTrialExpired] = useState(user?.is_test_used);
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(
    user?.is_subscription_discount
  );
  const navigate = useNavigate();



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

  const payFunction = async (_user, _period, _trial) => {
    const refresh_result = await refreshUserToken();
    // console.log('refresh_result', refresh_result);

    // localStorage.setItem("authToken", refresh_result);
    const decodedUser = jwtDecode(refresh_result);
    //console.log('decodedUser:', decodedUser);
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
      firstAmount = newTrialExpired ? 2990 : 10;
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
      //applePaySupport: false,
      //googlePaySupport: false,
      //yandexPaySupport: true,
      tinkoffPaySupport: true,
      tinkoffInstallmentSupport: false,
      //sbpSupport: true,
      sberSupport: true,
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
        navigate('/after-payment', { state: { paymentStatus: 'success' } });
        return
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
            //console.log('patch /api/user', res.data);
            // localStorage.setItem('authToken', res.data.auth_token);
            navigate('/after-payment', { state: { paymentStatus: 'success' } });
          })
          .catch((err) => console.log('patch /api/user', err));
        // console.log('Payment success:', 'options', options);
      },

      function (reason, options) {
        // fail
        //действие при неуспешной оплате
        navigate('/after-payment', { state: { paymentStatus: 'error' } });
        return

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
    <ConfigProvider
      theme={{
        token: {
          paddingMD: 16,
        }
      }}
    >
      <Modal
        style={{ top: 10 }}
        open={visible}
        onOk={() => visibilityHandler(false)}
        onClose={() => visibilityHandler(false)}
        onCancel={() => visibilityHandler(false)}
        footer={null}
        width={900}
      >
        <div className={styles.modal}>
          {/* title */}
          <p className={styles.modal__title}>Активация тестового периода</p>

          {/* lead block */}
          <div className={styles.modal__leadBlock}>
            <p className={styles.modal__leadText}>
              Здесь вы можете активировать тестовый доступ на {user.test_days ? getDayDeclension(user.test_days.toString()) : '3 дня'}. Стоимость активации – 10₽
            </p>
            <svg width="94" height="70" viewBox="0 0 94 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="9.99023" width="84.6472" height="55.2027" rx="8" transform="rotate(10.4261 9.99023 0)" fill="#1A1A1A" />
              <path d="M55.5153 47.5523L56.3175 43.1925L53.8784 42.7437L54.3553 40.1522L56.7943 40.601L57.1983 38.4059L54.7592 37.9571L55.2417 35.3351L57.6807 35.7839L59.4703 26.0582L66.9094 27.427C68.4948 27.7187 69.7858 28.24 70.7824 28.9907C71.779 29.7414 72.4739 30.6468 72.8673 31.7068C73.2644 32.7465 73.3507 33.8761 73.1263 35.0957C72.8907 36.3762 72.406 37.4112 71.6724 38.2008C70.9387 38.9904 69.9883 39.53 68.8213 39.8196C67.6581 40.0889 66.2939 40.0795 64.7288 39.7915L61.9239 39.2754L61.52 41.4706L66.1847 42.3289L65.7079 44.9204L61.0432 44.0621L60.2409 48.4219L55.5153 47.5523ZM62.3454 36.6422L64.571 37.0518C65.7296 37.2649 66.6605 37.1735 67.3638 36.7776C68.0874 36.3854 68.5483 35.6507 68.7465 34.5734C68.9484 33.4759 68.7793 32.6252 68.2389 32.0215C67.7227 31.4011 66.8853 30.9844 65.7267 30.7712L63.5011 30.3617L62.3454 36.6422Z" fill="white" />
              <path d="M43.239 45.6401C40.6577 45.1651 38.8434 43.8331 37.7963 41.6441C36.7732 39.4386 36.587 36.5675 37.2377 33.0309C37.8997 29.4333 39.0938 26.8266 40.82 25.211C42.5703 23.5788 44.7361 23.0002 47.3174 23.4752C49.9191 23.9539 51.7371 25.2655 52.7714 27.4101C53.8094 29.5344 53.9993 32.3852 53.3411 35.9624C52.6866 39.5194 51.4888 42.1463 49.7476 43.8432C48.0102 45.5198 45.8406 46.1188 43.239 45.6401ZM43.9458 41.7986C45.1247 42.0155 46.1053 41.597 46.8876 40.5432C47.6939 39.4728 48.3309 37.6672 48.7984 35.1265C49.2659 32.5859 49.3077 30.7023 48.924 29.476C48.5606 28.2534 47.7895 27.5336 46.6106 27.3167C45.4317 27.0998 44.4447 27.496 43.6496 28.5055C42.8747 29.5186 42.2555 31.2854 41.7917 33.8058C41.3205 36.3668 41.2711 38.2909 41.6436 39.5783C42.0199 40.8453 42.7873 41.5854 43.9458 41.7986Z" fill="white" />
              <path d="M18.9532 40.8247L19.6713 36.9222L24.5494 37.8198L27.057 24.1916L29.2827 24.6011L21.9904 27.2309L22.8094 22.7796L29.1583 20.4806L32.5425 21.1033L29.3055 38.695L33.8787 39.5365L33.1607 43.439L18.9532 40.8247Z" fill="white" />
            </svg>

          </div>

          {/* main text block */}
          <div className={styles.modal__mainTextWrapper}>
            <p className={styles.modal__mainTextTitle}>
              Почему активация тестового периода платная?
            </p>
            <p className={styles.modal__mainText}>
              Предоставление тестового доступа без ограничений по функционалу требует затрат со стороны сервиса. Поэтому мы взимаем символическую плату в размере 10₽ за активацию тестового периода, чтобы наши ресурсы расходовались только на тех продавцов, кто действительно заинтересован в тестировании аналитики. Оплата доступна всеми возможными способами и занимает не более 45 секунд.
            </p>
          </div>

          {/* alert */}
          <div className={styles.modal__alert}>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.7803 8.35943C15.0732 8.06654 15.0732 7.59166 14.7803 7.29877C14.4874 7.00588 14.0126 7.00588 13.7197 7.29877L8.75 12.2684L6.28033 9.79877C5.98744 9.50588 5.51256 9.50588 5.21967 9.79877C4.92678 10.0917 4.92678 10.5665 5.21967 10.8594L8.21967 13.8594C8.51256 14.1523 8.98744 14.1523 9.28033 13.8594L14.7803 8.35943Z" fill="#8C8C8C" />
              <path fillRule="evenodd" clipRule="evenodd" d="M20 10.5791C20 16.1019 15.5228 20.5791 10 20.5791C4.47715 20.5791 0 16.1019 0 10.5791C0 5.05625 4.47715 0.579102 10 0.579102C15.5228 0.579102 20 5.05625 20 10.5791ZM18.5 10.5791C18.5 15.2735 14.6944 19.0791 10 19.0791C5.30558 19.0791 1.5 15.2735 1.5 10.5791C1.5 5.88468 5.30558 2.0791 10 2.0791C14.6944 2.0791 18.5 5.88468 18.5 10.5791Z" fill="#8C8C8C" />
            </svg>
            {'Если вам что-то не понравится, вы сможете отменить тестовый период в один клик.'}
          </div>

          {/* modal footer */}
          <div className={styles.modal__footer}>
            <p className={styles.modal__mainTextTitle}>Вам будет доступно:</p>
            <ul className={styles.modal__advantagesList}>
              <li className={styles.modal__advantagesListItem}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8285 11.5717C13.4142 11.5717 13.0785 11.236 13.0785 10.8217V9.78975L10.5303 12.3379C10.2374 12.6308 9.76256 12.6308 9.46967 12.3379L8.5 11.3682L5.53033 14.3379C5.23744 14.6308 4.76256 14.6308 4.46967 14.3379C4.17678 14.045 4.17678 13.5701 4.46967 13.2772L7.96967 9.77723C8.26256 9.48433 8.73744 9.48433 9.03033 9.77723L10 10.7469L12.0036 8.74332H11C10.5858 8.74332 10.25 8.40753 10.25 7.99332C10.25 7.5791 10.5858 7.24332 11 7.24332L13.8285 7.24332C14.2427 7.24332 14.5785 7.5791 14.5785 7.99332L14.5785 10.8217C14.5785 11.236 14.2427 11.5717 13.8285 11.5717Z" fill="#5329FF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 10.5791C0 14.3176 0 16.1868 0.803847 17.5791C1.33046 18.4912 2.08788 19.2486 3 19.7753C4.3923 20.5791 6.26154 20.5791 10 20.5791C13.7385 20.5791 15.6077 20.5791 17 19.7753C17.9121 19.2486 18.6695 18.4912 19.1962 17.5791C20 16.1868 20 14.3176 20 10.5791C20 6.84064 20 4.97141 19.1962 3.5791C18.6695 2.66699 17.9121 1.90956 17 1.38295C15.6077 0.579102 13.7385 0.579102 10 0.579102C6.26154 0.579102 4.3923 0.579102 3 1.38295C2.08788 1.90956 1.33046 2.66699 0.803847 3.5791C0 4.97141 0 6.84064 0 10.5791ZM17.8971 4.3291C18.1453 4.7589 18.3146 5.33007 18.4056 6.33469C18.4986 7.35993 18.5 8.68226 18.5 10.5791C18.5 12.4759 18.4986 13.7983 18.4056 14.8235C18.3146 15.8281 18.1453 16.3993 17.8971 16.8291C17.5022 17.5132 16.9341 18.0813 16.25 18.4762C15.8202 18.7244 15.249 18.8937 14.2444 18.9847C13.2192 19.0777 11.8968 19.0791 10 19.0791C8.10316 19.0791 6.78082 19.0777 5.75559 18.9847C4.75097 18.8937 4.1798 18.7244 3.75 18.4762C3.06591 18.0813 2.49784 17.5132 2.10289 16.8291C1.85474 16.3993 1.68541 15.8281 1.59436 14.8235C1.50144 13.7983 1.5 12.4759 1.5 10.5791C1.5 8.68226 1.50144 7.35993 1.59436 6.33469C1.68541 5.33007 1.85474 4.7589 2.10289 4.3291C2.49784 3.64502 3.06591 3.07694 3.75 2.68199C4.1798 2.43384 4.75097 2.26451 5.75559 2.17346C6.78082 2.08054 8.10316 2.0791 10 2.0791C11.8968 2.0791 13.2192 2.08054 14.2444 2.17346C15.249 2.26451 15.8202 2.43384 16.25 2.68199C16.9341 3.07694 17.5022 3.64502 17.8971 4.3291Z" fill="#5329FF" />
                </svg>
                {'Основной дашборд с главными бизнес-метриками и показателями по вашему магазину '}
              </li>
              <li className={styles.modal__advantagesListItem}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1 0.829102C0.585786 0.829102 0.25 1.16489 0.25 1.5791C0.25 1.99332 0.585786 2.3291 1 2.3291C1.81705 2.3291 2.52448 2.89658 2.70172 3.69417L3.13165 5.62885C3.13477 5.67584 3.14235 5.72282 3.15449 5.76919L3.20944 5.9789L3.26786 6.2418C3.27935 6.2935 3.29592 6.34276 3.31693 6.38917L4.9921 12.783C5.53947 14.8722 7.42732 16.3291 9.58701 16.3291H14.7506C17.3739 16.3291 19.5006 14.2025 19.5006 11.5791V8.86978C19.5006 8.3059 19.4193 7.62557 19.0367 7.02532C18.1758 5.6747 16.674 4.8291 15.0314 4.8291H4.49052L4.166 3.36878C3.83625 1.88488 2.5201 0.829102 1 0.829102ZM6.44313 12.4028L4.85182 6.3291H15.0314C16.1549 6.3291 17.1827 6.90744 17.7718 7.83156C17.931 8.08139 18.0006 8.42558 18.0006 8.86978V11.5791C18.0006 13.374 16.5455 14.8291 14.7506 14.8291H9.58701C8.10933 14.8291 6.81764 13.8322 6.44313 12.4028Z" fill="#5329FF" />
                  <path d="M15 19.5791C15.5523 19.5791 16 19.1314 16 18.5791C16 18.0268 15.5523 17.5791 15 17.5791C14.4477 17.5791 14 18.0268 14 18.5791C14 19.1314 14.4477 19.5791 15 19.5791Z" fill="#5329FF" />
                  <path d="M8 18.5791C8 19.1314 7.55228 19.5791 7 19.5791C6.44772 19.5791 6 19.1314 6 18.5791C6 18.0268 6.44772 17.5791 7 17.5791C7.55228 17.5791 8 18.0268 8 18.5791Z" fill="#5329FF" />
                </svg>

                {'Возможность проводить детальную аналитику по каждому товару '}
              </li>
              <li className={styles.modal__advantagesListItem}>
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 0.579102H13C11.3431 0.579102 10 1.92225 10 3.5791V17.5791C10 19.236 11.3431 20.5791 13 20.5791H15C16.6569 20.5791 18 19.236 18 17.5791V3.5791C18 1.92225 16.6569 0.579102 15 0.579102ZM13 2.0791H15C15.8284 2.0791 16.5 2.75067 16.5 3.5791V17.5791C16.5 18.4075 15.8284 19.0791 15 19.0791H13C12.1716 19.0791 11.5 18.4075 11.5 17.5791V3.5791C11.5 2.75067 12.1716 2.0791 13 2.0791Z" fill="#5329FF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M5 6.5791H3C1.34315 6.5791 0 7.92225 0 9.5791V17.5791C0 19.236 1.34315 20.5791 3 20.5791H5C6.65685 20.5791 8 19.236 8 17.5791V9.5791C8 7.92225 6.65685 6.5791 5 6.5791ZM3 8.0791H5C5.82843 8.0791 6.5 8.75067 6.5 9.5791V17.5791C6.5 18.4075 5.82843 19.0791 5 19.0791H3C2.17157 19.0791 1.5 18.4075 1.5 17.5791V9.5791C1.5 8.75067 2.17157 8.0791 3 8.0791Z" fill="#5329FF" />
                </svg>

                {'ABC-аналитика'}
              </li>
              <li className={styles.modal__advantagesListItem}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 6.5791C5.25 6.16489 5.58579 5.8291 6 5.8291H13C13.4142 5.8291 13.75 6.16489 13.75 6.5791C13.75 6.99332 13.4142 7.3291 13 7.3291H6C5.58579 7.3291 5.25 6.99332 5.25 6.5791Z" fill="#5329FF" />
                  <path d="M6 9.8291C5.58579 9.8291 5.25 10.1649 5.25 10.5791C5.25 10.9933 5.58579 11.3291 6 11.3291H14C14.4142 11.3291 14.75 10.9933 14.75 10.5791C14.75 10.1649 14.4142 9.8291 14 9.8291H6Z" fill="#5329FF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.25 5.5791C0.25 2.95575 2.37665 0.829102 5 0.829102H15C17.6234 0.829102 19.75 2.95575 19.75 5.5791V11.9447C19.75 14.3661 17.787 16.3291 15.3656 16.3291C14.6669 16.3291 13.992 16.5827 13.4662 17.0428L11.8109 18.4912C10.7741 19.3984 9.22593 19.3984 8.18911 18.4911L6.53382 17.0428C6.00802 16.5827 5.33309 16.3291 4.63442 16.3291C2.21297 16.3291 0.25 14.3661 0.25 11.9447V5.5791ZM5 2.3291C3.20507 2.3291 1.75 3.78418 1.75 5.5791V11.9447C1.75 13.5377 3.0414 14.8291 4.63442 14.8291C5.69643 14.8291 6.72234 15.2146 7.52158 15.9139L9.17687 17.3623C9.64815 17.7747 10.3518 17.7747 10.8231 17.3623L12.4784 15.9139C13.2777 15.2146 14.3036 14.8291 15.3656 14.8291C16.9586 14.8291 18.25 13.5377 18.25 11.9447V5.5791C18.25 3.78418 16.7949 2.3291 15 2.3291H5Z" fill="#5329FF" />
                </svg>

                {'Генерация SEO-описания на основе семантики ТОП-ов вашей категории '}
              </li>
              <li className={styles.modal__advantagesListItem}>
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13 8.5791C13 10.236 11.6569 11.5791 10 11.5791C8.34315 11.5791 7 10.236 7 8.5791C7 6.92225 8.34315 5.5791 10 5.5791C11.6569 5.5791 13 6.92225 13 8.5791ZM11.5 8.5791C11.5 9.40753 10.8284 10.0791 10 10.0791C9.17157 10.0791 8.5 9.40753 8.5 8.5791C8.5 7.75067 9.17157 7.0791 10 7.0791C10.8284 7.0791 11.5 7.75067 11.5 8.5791Z" fill="#5329FF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 0.579102H4C1.79086 0.579102 0 2.36996 0 4.5791V12.5791C0 14.7882 1.79086 16.5791 4 16.5791H16C18.2091 16.5791 20 14.7882 20 12.5791V4.5791C20 2.36996 18.2091 0.579102 16 0.579102ZM15.25 2.0791H4.75V2.5791C4.75 4.09788 3.51878 5.3291 2 5.3291H1.5V11.8291H2C3.51878 11.8291 4.75 13.0603 4.75 14.5791V15.0791H15.25V14.5791C15.25 13.0603 16.4812 11.8291 18 11.8291H18.5V5.3291H18C16.4812 5.3291 15.25 4.09788 15.25 2.5791V2.0791ZM1.61445 3.8291C1.85865 3.05159 2.47248 2.43776 3.25 2.19355V2.5791C3.25 3.26946 2.69036 3.8291 2 3.8291H1.61445ZM3.25 14.9647V14.5791C3.25 13.8887 2.69036 13.3291 2 13.3291H1.61445C1.85865 14.1066 2.47248 14.7204 3.25 14.9647ZM18.3855 13.3291C18.1413 14.1066 17.5275 14.7204 16.75 14.9647V14.5791C16.75 13.8887 17.3096 13.3291 18 13.3291H18.3855ZM18.3855 3.8291C18.1413 3.05158 17.5275 2.43776 16.75 2.19355V2.5791C16.75 3.26946 17.3096 3.8291 18 3.8291H18.3855Z" fill="#5329FF" />
                </svg>

                {'Уникальный функционал расшифровки еженедельных фин. отчетов '}
              </li>
              <li className={styles.modal__advantagesListItem}>
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13 8.5791C13 10.236 11.6569 11.5791 10 11.5791C8.34315 11.5791 7 10.236 7 8.5791C7 6.92225 8.34315 5.5791 10 5.5791C11.6569 5.5791 13 6.92225 13 8.5791ZM11.5 8.5791C11.5 9.40753 10.8284 10.0791 10 10.0791C9.17157 10.0791 8.5 9.40753 8.5 8.5791C8.5 7.75067 9.17157 7.0791 10 7.0791C10.8284 7.0791 11.5 7.75067 11.5 8.5791Z" fill="#5329FF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 0.579102H4C1.79086 0.579102 0 2.36996 0 4.5791V12.5791C0 14.7882 1.79086 16.5791 4 16.5791H16C18.2091 16.5791 20 14.7882 20 12.5791V4.5791C20 2.36996 18.2091 0.579102 16 0.579102ZM15.25 2.0791H4.75V2.5791C4.75 4.09788 3.51878 5.3291 2 5.3291H1.5V11.8291H2C3.51878 11.8291 4.75 13.0603 4.75 14.5791V15.0791H15.25V14.5791C15.25 13.0603 16.4812 11.8291 18 11.8291H18.5V5.3291H18C16.4812 5.3291 15.25 4.09788 15.25 2.5791V2.0791ZM1.61445 3.8291C1.85865 3.05159 2.47248 2.43776 3.25 2.19355V2.5791C3.25 3.26946 2.69036 3.8291 2 3.8291H1.61445ZM3.25 14.9647V14.5791C3.25 13.8887 2.69036 13.3291 2 13.3291H1.61445C1.85865 14.1066 2.47248 14.7204 3.25 14.9647ZM18.3855 13.3291C18.1413 14.1066 17.5275 14.7204 16.75 14.9647V14.5791C16.75 13.8887 17.3096 13.3291 18 13.3291H18.3855ZM18.3855 3.8291C18.1413 3.05158 17.5275 2.43776 16.75 2.19355V2.5791C16.75 3.26946 17.3096 3.8291 18 3.8291H18.3855Z" fill="#5329FF" />
                </svg>

                {'Расширение (плагин) в браузер'}
              </li>
            </ul>

            <button
              className={styles.modal__actionButton}
              onClick={() => {
                payFunction(user.id, selectedPeriod, trialExpired)
                //visibilityHandler(false)
              }}
            >
              Активировать тестовый период за 10₽
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default SubscriptionModal;