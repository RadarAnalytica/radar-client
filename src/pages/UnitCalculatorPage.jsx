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
import { unitCalcResultFunction, logisticsWithBuyoutPercentagePriceCalcFunc } from '../components/unitCalculatorPageComponents/UnitCalcUtils';
import { tempWhouseData } from '../components/unitCalculatorPageComponents/tempWarehouseData';

const UnitCalculatorPage = () => {

    const [ result, setResult ] = useState();
    const [ token, setToken ] = useState(null);
    const [ investValue, setInvestValue ] = useState(50000)
    const [ lastMileLogisticsPrice, setLastMileLogisticsPrice ] = useState(100)
    const [ lastMileLogisticsPriceWBuyout, setLastMileLogisticsPriceWBuyout ] = useState(0)
    const [ mpMainFee, setMpMainFee ] = useState(22.5)
    const [ params ] = useSearchParams()

    const [ form ] = Form.useForm();
    const isHeavy = Form.useWatch('isHeavy', form);
    const buyout_percentage = Form.useWatch('buyout_percentage', form);
    const delivery_speed = Form.useWatch('delivery_speed', form);
    const warehouse = Form.useWatch('warehouse', form);
    const PackageType = Form.useWatch('PackageType', form);
    const package_length = Form.useWatch('package_length', form);
    const package_width = Form.useWatch('package_width', form);
    const package_height = Form.useWatch('package_height', form);

    const return_price = 50;
    const fbsDeadline = 30 //hours
    const fbsDeadlineRate = 0.1 //hours

    const submitHandler = (fields) => {

        setResult(unitCalcResultFunction(fields, mpMainFee, (lastMileLogisticsPrice + lastMileLogisticsPriceWBuyout), 0))
        const data = {
            fields,
            investValue
        }

        function encodeUnicodeToBase64(str) {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(str);
            return btoa(String.fromCharCode(...bytes));
          }

        const json = JSON.stringify(data)
        const token = encodeUnicodeToBase64(json)
        setToken(token)
    }

    useEffect(() => {
        setLastMileLogisticsPriceWBuyout(logisticsWithBuyoutPercentagePriceCalcFunc(lastMileLogisticsPrice, return_price, buyout_percentage))
    }, [buyout_percentage])


    useEffect(() => {
        const currentWhouse = tempWhouseData.fbo.find(_ => _.name === warehouse)
        PackageType
        if (currentWhouse) {
            const pType = PackageType === 'Короб' ? 'box' : 'pallete'
            const { logisticsBase, logisticsExtra } = currentWhouse.acceptanceCoefficients.find(_ => _.boxType === pType)

            const package_width_int = parseInt(package_width)
            const package_length_int = parseInt(package_length)
            const package_height_int = parseInt(package_height)
            const volume = (((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000).toFixed(2)

            if (volume && !Number.isNaN(volume)) {
                let lprice = logisticsBase;
                if (volume > 1) {
                    lprice = lprice + (logisticsExtra * Math.ceil(volume))
                }

                setLastMileLogisticsPrice(lprice)
            }
        }


    }, [warehouse, package_width, package_length, package_height, PackageType])

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

    useEffect(() => {
        if (isHeavy) {
            form.setFieldValue('PackageType', 'Монопаллета')
        }
    }, [isHeavy])

    function decodeBase64ToUnicode(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
      }

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
                form.submit()


            } catch(e) {
                console.log(e)
            }
        }
        
       
    }, [params])

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
                                    product: 1111,
                                    isSPP: false,
                                    isHeavy: false,
                                    is_paid_cargo_acceptance: false,
                                    storage_price: 'daily',
                                    tax_state: 'УСН-доходы',
                                    tax_rate: 6,
                                    defective_percentage: 2,
                                    equiring_fee: 1
                                }}
                            >




                                <BasicDataFormBlock form={form} />
                                <LogisticsDataFormBlock form={form} current_storage_logistic_price={lastMileLogisticsPrice} buyout_log_price={lastMileLogisticsPriceWBuyout} />
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




                        <ResultBlock result={result} token={token} investValue={investValue} setInvestValue={setInvestValue} />

                    </div>
                </ConfigProvider>
            </section>
        </main>
    )
}

export default UnitCalculatorPage;




