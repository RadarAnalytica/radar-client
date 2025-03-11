import React, { useEffect, useState } from 'react'
import styles from './UnitCalculatorPage.module.css'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, Input, Checkbox, Radio, Button, ConfigProvider, Tooltip } from 'antd';
import BasicDataFormBlock from '../components/unitCalculatorPageComponents/basicDataFormBlock';
import LogisticsDataFormBlock from '../components/unitCalculatorPageComponents/LogisticsDataFormBlock';
import MPFeesDataFormBlock from '../components/unitCalculatorPageComponents/MPFeesDataFormBlock';
import AdditionalOptionsDataFormBlock from '../components/unitCalculatorPageComponents/AdditionalOptionsDataFormBlock';
import ResultBlock from '../components/unitCalculatorPageComponents/ResultBlock';
import { unitCalcResultFunction } from '../components/unitCalculatorPageComponents/UnitCalcUtils';

const UnitCalculatorPage = () => {

    const [result, setResult] = useState();

    const [form] = Form.useForm();
    const isHeavy = Form.useWatch('isHeavy', form);

    const submitHandler = (fields) => {
        setResult(unitCalcResultFunction(fields, 22.5, 0, 0))
    }

    useEffect(() => {
        if (isHeavy) {
            form.setFieldValue('PackageType', 'Монопаллета')
        }
    }, [isHeavy])

    return (
        <main className={styles.page}>
            <SideNav />
            <section className={styles.page__content}>
                <TopNav title={'Калькулятор unit-экономики товара'} />
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
                                <LogisticsDataFormBlock form={form} />
                                <MPFeesDataFormBlock mp_fee={22.5} form={form} />
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




                        <ResultBlock result={result} />

                    </div>
                </ConfigProvider>
            </section>
        </main>
    )
}

export default UnitCalculatorPage;




