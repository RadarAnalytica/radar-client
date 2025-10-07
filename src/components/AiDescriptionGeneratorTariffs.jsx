import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import OrangeLabelSelect from "../pages/images/OrangeLabelSelect";
import logoStart from "../pages/images/logoForCardStart.png";
import logoPro from "../pages/images/logoForCardPro.png";
import logoProPlus from "../pages/images/logoForCardProPlus.png";
import Steps from "../pages/images/Steps";
import OneRuble from "../pages/images/OneRuble.svg";
import BlueSwich from "../pages/images/BlueSwich.svg";
import StartLogo from "../assets/startlogo.svg";
import FireLogo from "../assets/firelogo.svg";
import AuthContext from "../service/AuthContext";
import axios from "axios";
import ReviewsUsers from "../components/ReviewsUsers";
import BlockImg_x2 from "../pages/images/Dashboard_x2.png";
import SolLabelStartBsn from "../pages/images/SolLabelStartBsn";
import YellowRadarPoint from "../pages/images/YellowRadarPoint";
import CustomButton from "./utilsComponents/CustomButton";
import { URL } from "../service/config";
import styles from "./AiDescriptionGeneratorTariffs.module.css";
import closebtn from "../assets/closebtn.png";
import { ServiceFunctions } from "../service/serviceFunctions";

const AiDescriptionGeneratorTariffs = ({ redirect, setIsModalOpenNewGen }) => {
    const navigate = useNavigate();
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const [selectedGenerationsAmount, setSelectedGenerationsAmount] = useState("5generations");
    const handleClose = () => {
        setIsModalOpenNewGen(false);
    };
    const handleGenerationsAmountChanged = (e) => {
        setSelectedGenerationsAmount(e.target.value);
    };
    const { user, authToken } = useContext(AuthContext);
    console.log("SelectRate user:", user);

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
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "JWT " + authToken,
                },
            });
            console.log("response", response);

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

    const pay = async () => {
        const refresh_result = await refreshUserToken();
        console.log("refresh_result", refresh_result);

        // localStorage.setItem("authToken", refresh_result);
        const decodedUser = jwtDecode(refresh_result);
        console.log("decodedUser:", decodedUser);


        console.log("user.email", user);
        console.log("selectedGenerationsAmount", selectedGenerationsAmount);


        let periodSubscribe = "";
        let amountSubscribe = 0;
        let generationQuantity = 0;
        let firstAmount = 0;
        let startDateSubscribe = "";
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        const invoiceId = `radar-${user.id}-${new Date()
            .toLocaleString("ru", options)
            .replaceAll(".", "")
            .replaceAll(", ", "-")
            .replaceAll(":", "")}`;

        if (selectedGenerationsAmount === "5generations") {
            amountSubscribe = 500;
            generationQuantity = 5;

        } else if (selectedGenerationsAmount === "10generations") {
            amountSubscribe = 900;
            generationQuantity = 10;

        } else if (selectedGenerationsAmount === "20generations") {
            amountSubscribe = 1500;
            generationQuantity = 20;
        }


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
            sberSupport: true,
            sberPaySupport: true,
        });
        console.log(widget);

        /**
         * var widget = new cp.CloudPayments({
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
         */

        const receipt = {
            Items: [
                //товарные позиции
                {
                    label: "Подписка Радар Аналитика", //наименование товара
                    price: amountSubscribe, //цена
                    quantity: 1.0, //количество
                    amount: amountSubscribe, //сумма
                    vat: 20, //ставка НДС
                    method: 0, // тег-1214 признак способа расчета - признак способа расчета
                    object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
                },
            ],
            email: user.email, //e-mail покупателя, если нужно отправить письмо с чеком
            phone: "", //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
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
        };

        widget.charge(
            {
                // options
                publicId: "pk_1359b4923cc282c6f76e05d9f138a", //id из личного кабинета
                description: "Оплата генераций описаний в сервисе Радар Аналитика", //назначение
                amount: amountSubscribe, //сумма
                currency: "RUB", //валюта
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
                const updateData = {
                    amount: generationQuantity,
                };

                axios
                    .post(`${URL}/api/description-generator/update-generations`, updateData, {
                        headers: {
                            "content-type": "application/json",
                            authorization: "JWT " + authToken,
                        },
                    })
                    .then((res) => {
                        setIsModalOpenNewGen(false);
                    })
                    .catch((err) => console.log(err));
                console.log("Payment success:", "options", options);
            },

            function (reason, options) {
                // fail
                //действие при неуспешной оплате
                console.log("Payment fail:", "reason", reason, "options", options);
            }
        );


    };

    return (
        <>
            <div>
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalHeaderTitle}>Тарифы Генерации</div>
                            {/* <div><img src={closebtn} className={styles.closeBtnModal} /></div> */}
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.radioGroup}>
                                <div className={styles.radioGroupItem}>

                                    <input
                                        type="radio"
                                        value="5generations"
                                        className={styles.radioInput}
                                        id="5generations"
                                        name="paymentPeriod"
                                        checked={selectedGenerationsAmount === "5generations"}
                                        onChange={handleGenerationsAmountChanged}
                                    />
                                    <label className={styles.radioLabel}> 5 генераций - 500₽</label>

                                </div>
                                <div className={styles.radioGroupItem}>

                                    <input
                                        type="radio"
                                        value="10generations"
                                        className={styles.radioInput}
                                        id="10generations"
                                        name="paymentPeriod"
                                        checked={selectedGenerationsAmount === "10generations"}
                                        onChange={handleGenerationsAmountChanged}
                                    />
                                    <label className={styles.radioLabel}>10 генераций - 900₽</label>

                                </div>
                                <div className={styles.radioGroupItem}>

                                    <input
                                        type="radio"
                                        value="20generations"
                                        className={styles.radioInput}
                                        id="20generations"
                                        name="paymentPeriod"
                                        checked={selectedGenerationsAmount === "20generations"}
                                        onChange={handleGenerationsAmountChanged}
                                    />
                                    <label className={styles.radioLabel}>20 генераций - 1500₽</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.modalFooterBtnNew} style={{ marginRight: "10px" }} onClick={handleClose}>Отменить</button>
                            <button className={styles.modalFooterBtnCopy} style={{ marginLeft: "10px" }} onClick={pay}>Оплатить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AiDescriptionGeneratorTariffs;
