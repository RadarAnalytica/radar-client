import React, { useEffect, useState } from 'react'
import styles from './UnitCalculatorPage.module.css'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, ConfigProvider } from 'antd';
import BasicDataFormBlock from '../components/unitCalculatorPageComponents/basicDataFormBlock';
import LogisticsDataFormBlock from '../components/unitCalculatorPageComponents/LogisticsDataFormBlock';
import MPFeesDataFormBlock from '../components/unitCalculatorPageComponents/MPFeesDataFormBlock';
import AdditionalOptionsDataFormBlock from '../components/unitCalculatorPageComponents/AdditionalOptionsDataFormBlock';
import ResultBlock from '../components/unitCalculatorPageComponents/ResultBlock';
import { unitCalcResultFunction, logisticsWithBuyoutPercentagePriceCalcFunc, encodeUnicodeToBase64, decodeBase64ToUnicode } from '../components/unitCalculatorPageComponents/UnitCalcUtils';
import { tempWhouseData } from '../components/unitCalculatorPageComponents/tempWarehouseData';

const UnitCalculatorPage = () => {


    // states
    const [ result, setResult ] = useState(); // resultOblect (created when form submits)
    const [ token, setToken ] = useState(null); // tokenized result data for share link
    const [ investValue, setInvestValue ] = useState(50000) // user invest value state
    const [ lastMileLogisticsPrice, setLastMileLogisticsPrice ] = useState(0) // cost of logistics for current warehouse
    const [ storagePrice, setStoragePrice ] = useState(0) // cost of storaging for current warehouse
    const [ lastMileLogisticsPriceWBuyout, setLastMileLogisticsPriceWBuyout ] = useState(0) // cost of buyout ratio
    const [ mpMainFee, setMpMainFee ] = useState(22.5) // *temporary* - hardcode of marketplace main fee
    const [ params ] = useSearchParams() // <- to get token from the url
    const [ form ] = Form.useForm(); // form instance

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

    //---------------------- some constants -------------------------------//
    const return_price = 50; // -- rubles -- fixed cost of product return (used to calculate cost of buyout ratio)
    const fbsDeadline = 30 // -- hours -- fbs delivery deadline
    const fbsDeadlineRate = 0.1 // -- % -- ratio of WB bonus/fee. Use it with fbsDeadline
    // ---------------------------------------------------------------------//

    // ---------------------- form submit handler ----------------------------//
    const submitHandler = (fields) => {
        // calculating data for the result block
        setResult(unitCalcResultFunction(fields, mpMainFee, (lastMileLogisticsPrice + lastMileLogisticsPriceWBuyout), storagePrice))

        // obkect for tokenized data
        const data = {
            fields,
            investValue
        }
       
        // data as json
        const json = JSON.stringify(data)
        // creating token (encoding result data)
        const token = encodeUnicodeToBase64(json)
        // set token
        setToken(token)
    }

    // -------------- cost of buyout ration calculations --------------------//
    useEffect(() => {
        setLastMileLogisticsPriceWBuyout(logisticsWithBuyoutPercentagePriceCalcFunc(lastMileLogisticsPrice, return_price, buyout_percentage))
    }, [buyout_percentage])
    //-----------------------------------------------------------------------//

    // --------------- logistics price clculations --------------------------//
    useEffect(() => {
        const currentWhouse = tempWhouseData.fbo.find(_ => _.name === warehouse)
        if (currentWhouse) {
            const pType = PackageType === 'Короб' ? 'box' : 'pallete'
            const currentWarehouseParams = currentWhouse.acceptanceCoefficients?.find(_ => _.boxType === pType)

            if (!currentWarehouseParams) return
            const { logisticsBase, logisticsExtra, storageBase, storageExtra } = currentWarehouseParams;

            const package_width_int = parseInt(package_width)
            const package_length_int = parseInt(package_length)
            const package_height_int = parseInt(package_height)
            const volume = (((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000).toFixed(2)

            if (volume && !Number.isNaN(volume)) {
                let lprice = logisticsBase;
                let sprice = storageBase
                if (volume > 1) {
                    lprice = lprice + (logisticsExtra * Math.ceil(volume))
                    sprice = sprice + (storageExtra * Math.ceil(volume))
                }
                setStoragePrice(sprice)
                setLastMileLogisticsPrice(lprice)
            }
        }
    }, [warehouse, package_width, package_length, package_height, PackageType])
    //-----------------------------------------------------------------------//

    // ------------ updating the token if investValue has changed -----------//
    useEffect(() => {
            form.validateFields()
            .then(_ => form.submit())
            .catch(_ => setToken(null))
    }, [investValue, token, form])
    //-----------------------------------------------------------------------//

    //---------------------------- fbs bonus/fee calculations ------------------------//
    useEffect(() => {
        const ds = parseInt(delivery_speed);
        if (!ds || Number.isNaN(ds)) {return setMpMainFee(22.5)}
        const hoursToDeadline = fbsDeadline - ds;
        if (hoursToDeadline === 0) {setMpMainFee(22.5)}
        if (hoursToDeadline > 0) {
            setMpMainFee(mpMainFee - (hoursToDeadline * fbsDeadlineRate))
        }
        if (hoursToDeadline < 0) {
            setMpMainFee(mpMainFee + (hoursToDeadline * fbsDeadlineRate * -1))
        }
    }, [delivery_speed])
    // --------------------------------------------------------------------------------//

    // --------------------- this is package type switcher -----------------------------//
    // if isHeavy - we set 'box' as disabled and switch to pallete only type
    useEffect(() => {
        if (isHeavy) {
            form.setFieldValue('PackageType', 'Монопаллета')
        }
    }, [isHeavy])
    // --------------------------------------------------------------------------------//

    //--this is handler for url-token data (decode, prefill and submit the form)--//
    useEffect(() => {
        const token = params.get('data')
        if (token) {
            try {
                const jsonData = decodeBase64ToUnicode(token);
                const data = JSON.parse(jsonData);
                const keysArr = Object.keys(data.fields);

                keysArr.forEach(k => {
                    const value = data.fields[k]
                    form.setFieldValue(k, value)
                })
                setInvestValue(data.investValue)
                
            } catch(e) {
                console.log(e)
            }
        }
        form.submit()
    }, [params])
    //------------------------------------------------------------------------------------//

    return (
        <main className={styles.page}>
            <SideNav /> 
            <section className={styles.page__content}>
                <TopNav title={'Калькулятор unit-экономики товара'} mikeStarinaStaticProp />
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
                                    package_height: 10
                                }}
                            >




                                <BasicDataFormBlock form={form} />
                                <LogisticsDataFormBlock form={form} current_storage_logistic_price={lastMileLogisticsPrice} buyout_log_price={lastMileLogisticsPriceWBuyout} storagePrice={storagePrice} />
                                <MPFeesDataFormBlock mp_fee={mpMainFee} form={form} />
                                <AdditionalOptionsDataFormBlock form={form} />




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
                            <ResultBlock result={result} token={token} investValue={investValue} setInvestValue={setInvestValue} />
                        </div>

                    </div>
                </ConfigProvider>
            </section>
        </main>
    )
}

export default UnitCalculatorPage;




