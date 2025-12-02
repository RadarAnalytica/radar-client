import React, { useEffect, useState, useRef } from 'react';
import styles from './UnitCalculatorPageDesktop.module.css';
import MobileHeader from '@/components/sharedComponents/mobileHeader/mobileHeader';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, ConfigProvider } from 'antd';
import BasicDataFormBlockDesktop from '../components/unitCalculatorPageComponents/BasicDataFormBlockDesktop';
import LogisticsDataFormBlockDesktop from '../components/unitCalculatorPageComponents/LogisticsDataFormBlockDesktop';
import MPFeesDataFormBlockDesktop from '../components/unitCalculatorPageComponents/MPFeesDataFormBlockDesktop';
import AdditionalOptionsDataFormBlockDesktop from '../components/unitCalculatorPageComponents/AdditionalOptionsDataFormBlockDesktop';
import ResultBlockDesktop from '../components/unitCalculatorPageComponents/ResultBlockDesktop';
import { unitCalcResultFunction, logisticsWithBuyoutPercentagePriceCalcFunc, encodeUnicodeToBase64, decodeBase64ToUnicode } from '../components/unitCalculatorPageComponents/UnitCalcUtils';
import { tempWhouseData } from '../components/unitCalculatorPageComponents/tempWarehouseData';
import { RETURN_PRICE, FBS_DEADLINE, FBS_DEADLIE_RATE } from '../components/unitCalculatorPageComponents/constatnts';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';

const UnitCalculatorPageDesktop = () => {

    const sectionRef = useRef(null);
    // states
    const [result, setResult] = useState(); // resultOblect (created when form submits)
    const [token, setToken] = useState(null); // tokenized result data for share link
    const [investValue, setInvestValue] = useState(50000); // user invest value state
    const [lastMileLogisticsPrice, setLastMileLogisticsPrice] = useState(0); // cost of logistics for current warehouse
    const [storagePrice, setStoragePrice] = useState(0); // cost of storaging for current warehouse
    const [lastMileLogisticsPriceWBuyout, setLastMileLogisticsPriceWBuyout] = useState(0); // cost of buyout ratio
    const [isProductFromToken, setIsProductFromToken] = useState(null); // we are redefining product input if the data came from share link
    const [mpMainFee, setMpMainFee] = useState(22.5); // *temporary* - hardcode of marketplace main fee
    const [params] = useSearchParams(); // <- to get token from the url
    const [form] = Form.useForm(); // form instance
    //------------------ a few form fields to observe ---------------------//
    const isHeavy = Form.useWatch('isHeavy', form);
    const buyout_percentage = Form.useWatch('buyout_percentage', form);
    const delivery_speed = Form.useWatch('delivery_speed', form);
    const warehouse = Form.useWatch('warehouse', form);
    const PackageType = Form.useWatch('PackageType', form);
    const package_length = Form.useWatch('package_length', form);
    const package_width = Form.useWatch('package_width', form);
    const package_height = Form.useWatch('package_height', form);
    // ---------------------------------------------------------------------//

    // --- следим за изменениями полей формы --- //
    const onFieldsChanged = () => {
        // Это обнуляет результаты при изменении любого поля формы. Отключено по задаче test-64 08.04.2025 Не удалено по причине "Вова попросил именно закоментить" Михаил Старина
        //setResult(undefined)
        //setToken(null)
    };
    // ------------------------------------------- //

    // ---------------------- form submit handler ----------------------------//
    const submitHandler = (fields) => {
        setResult(unitCalcResultFunction(fields, mpMainFee, lastMileLogisticsPrice, lastMileLogisticsPriceWBuyout, Math.round(storagePrice), investValue, Math.round(storagePrice)));
        // object for tokenized data
        const data = {
            fields,
            investValue,
            mpMainFee,
            lastMileLogisticsPrice,
            storagePrice,
            lastMileLogisticsPriceWBuyout,
        };
        // data as json
        const json = JSON.stringify(data);
        // creating token (encoding result data)
        const token = encodeUnicodeToBase64(json);
        // set token
        setToken(token);

        if (window.innerWidth > 900) {
            sectionRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // -------------- cost of buyout ration calculations --------------------//
    useEffect(() => {
        setLastMileLogisticsPriceWBuyout(logisticsWithBuyoutPercentagePriceCalcFunc(lastMileLogisticsPrice, RETURN_PRICE, buyout_percentage));
    }, [buyout_percentage]);
    //-----------------------------------------------------------------------//

    // --------------- logistics price clculations --------------------------//
    useEffect(() => {
        const currentWhouse = tempWhouseData.fbo.find(_ => _.name === warehouse);
        if (currentWhouse) {
            const pType = PackageType === 'Короб' ? 'box' : 'pallete';
            const currentWarehouseParams = currentWhouse.acceptanceCoefficients?.find(_ => _.boxType === pType);

            if (!currentWarehouseParams) return;
            const { logisticsBase, logisticsExtra, storageBase, storageExtra } = currentWarehouseParams;

            const package_width_int = parseInt(package_width);
            const package_length_int = parseInt(package_length);
            const package_height_int = parseInt(package_height);
            let volume = Math.ceil(((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000);
            if (volume && !Number.isNaN(volume)) {
                let lprice = logisticsBase;
                let sprice = storageBase;
                if (volume > 1) {
                    lprice = lprice + (logisticsExtra * (volume - 1));
                    sprice = sprice + (storageExtra * (volume - 1));
                }
                setStoragePrice(sprice);
                setLastMileLogisticsPrice(lprice);
            }
        }
    }, [warehouse, package_width, package_length, package_height, PackageType]);
    //-----------------------------------------------------------------------//

    // ------------ updating the token if investValue has changed -----------//
    useEffect(() => {
        form.validateFields()
            .then(_ => form.submit())
            .catch(_ => setToken(null));
    }, [investValue]);
    //-----------------------------------------------------------------------//

    //---------------------------- fbs bonus/fee calculations ------------------------//
    useEffect(() => {
        const ds = parseInt(delivery_speed);
        if (!ds || Number.isNaN(ds)) { return setMpMainFee(22.5); }
        const hoursToDeadline = FBS_DEADLINE - ds;
        if (hoursToDeadline === 0) { setMpMainFee(22.5); }
        if (hoursToDeadline > 0) {
            setMpMainFee(mpMainFee - (hoursToDeadline * FBS_DEADLIE_RATE));
        }
        if (hoursToDeadline < 0) {
            setMpMainFee(mpMainFee + (hoursToDeadline * FBS_DEADLIE_RATE * -1));
        }
    }, [delivery_speed]);
    // --------------------------------------------------------------------------------//

    // --------------------- this is package type switcher -----------------------------//
    // if isHeavy - we set 'box' as disabled and switch to pallete only type
    useEffect(() => {
        if (isHeavy) {
            form.setFieldValue('PackageType', 'Монопаллета');
        }
    }, [isHeavy]);
    // --------------------------------------------------------------------------------//

    // -- Это необходимо для коррекного редиректа не авторизованного юзера, который тыкает дальше по внутренней навигачии (используется в ProtectedRoute) --//
    useEffect(() => {
        if (window.history && window.history.length <= 2) {
            sessionStorage.setItem('isCalculateEntryUrl', '1');
        }
    }, []);
    // ------------------------------------------------------------------------------------------------------------------------------------------------------//

    //--this is handler for url-token data (decode, prefill and submit the form)--//
    useEffect(() => {
        const token = params.get('data');
        let timeout;
        if (token) {
            setIsProductFromToken(true);
            try {
                const data = decodeBase64ToUnicode(token);
                //const data = JSON.parse(jsonData);
                const keysArr = Object.keys(data.fields);

                keysArr.forEach(k => {
                    const value = data.fields[k];
                    form.setFieldValue(k, value);
                });
                setInvestValue(data.investValue);
                setMpMainFee(data.mpMainFee);
                setLastMileLogisticsPrice(data.lastMileLogisticsPrice);
                setLastMileLogisticsPriceWBuyout(data.lastMileLogisticsPriceWBuyout);
                setStoragePrice(data.storagePrice);

                timeout = setTimeout(() => { form.submit(); }, 500);

            } catch (e) {
                setIsProductFromToken(false);
                console.log(e);
            }
        } else {
            setIsProductFromToken(false);
        }


        return () => { timeout && clearTimeout(timeout); };
    }, [params]);
    //------------------------------------------------------------------------------------//

    return (
        <main className={styles.page}>
            <Helmet>
                <title>Калькулятор unit-экономики товара от Radar Analytica — сервис аналитики маркетплейсов</title>
                <meta name="description" content='Расчет unit-экономики товара  онлайн на калькуляторе Radar Analytica — сервис аналитики маркетплейсов.' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0" />
            </Helmet>

            <div className={styles.page__sidebarWrapper}>
                <Sidebar />
            </div>
            
            <section className={styles.page__content} ref={sectionRef}>
                <div className={styles.page__headerWrapper}>
                    <Header title={'Калькулятор unit-экономики товара'} />
                </div>

                <div className={styles.page__mobileHeaderWrapper}>
                    <MobileHeader title='Калькулятор unit-экономики товара' />
                </div>

                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: 'Mulish',
                            colorBorder: 'white',
                            // colorTextLightSolid: '#000'
                        },
                        components: {
                            Form: {
                                labelFontSize: 16,
                                labelRequiredMarkColor: '#000'
                            },
                            Input: {
                                activeBorderColor: '#5329FF',
                                hoverBorderColor: '#5329FF',
                                activeBg: '#F2F2F2',
                            },
                        }
                    }}
                >
                    <div className={styles.page__mainContentWrapper}>
                        <div className={styles.page__formWrapper}>
                            <Form
                                scrollToFirstError
                                className={styles.form}
                                layout="vertical"
                                onFinish={submitHandler}
                                form={form}
                                onFieldsChange={onFieldsChanged}
                                initialValues={{
                                    product_price: 3000,
                                    product_cost: 1000,
                                    isSPP: false,
                                    isHeavy: false,
                                    is_paid_cargo_acceptance: false,
                                    storage_price: 'daily',
                                    tax_state: 'УСН-доходы',
                                    tax_rate: 6,
                                    defective_percentage: 2,
                                    equiring_fee: 1,
                                    package_length: 10,
                                    package_width: 10,
                                    package_height: 10,
                                    PackageType: 'Короб'
                                }}
                            >
                                <BasicDataFormBlockDesktop form={form} setMpMainFee={setMpMainFee} isProductFromToken={isProductFromToken} setIsProductFromToken={setIsProductFromToken} />
                                <LogisticsDataFormBlockDesktop form={form} current_storage_logistic_price={lastMileLogisticsPrice} buyout_log_price={lastMileLogisticsPriceWBuyout} storagePrice={storagePrice} />
                                <MPFeesDataFormBlockDesktop mp_fee={mpMainFee} form={form} />
                                <AdditionalOptionsDataFormBlockDesktop form={form} mpMainFee={mpMainFee} />

                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorBorder: '#00000033',
                                            colorPrimary: '#5329FF'
                                        }

                                    }}
                                >
                                    <Button
                                        type='primary'
                                        size='large'
                                        htmlType='submit'
                                    >Рассчитать</Button>
                                </ConfigProvider>

                            </Form>
                        </div>

                        <div className={styles.page__resultWrapper}>
                            <ResultBlockDesktop result={result} token={token} investValue={investValue} setInvestValue={setInvestValue} />
                        </div>

                    </div>
                </ConfigProvider>
            </section>
        </main>
    );
};

export default UnitCalculatorPageDesktop;

