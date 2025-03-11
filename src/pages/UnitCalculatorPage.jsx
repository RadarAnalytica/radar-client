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

    const [ result, setResult ] = useState();

    const [form] = Form.useForm();
    const isSPP = Form.useWatch('isSPP', form);
    const isHeavy = Form.useWatch('isHeavy', form);
    const isPaidCargoAcceptance = Form.useWatch('is_paid_cargo_acceptance', form);
    const product_price = Form.useWatch('product_price', form);
    const SPP = Form.useWatch('SPP', form);
    const package_length = Form.useWatch('package_length', form);
    const package_width = Form.useWatch('package_width', form);
    const package_height = Form.useWatch('package_height', form);

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
                                labelFontSize: 16
                            },
                            Input: {
                                activeBorderColor: '#5329FF',
                                hoverBorderColor: '#5329FF',
                                activeBg: '#F2F2F2',
                            },
                            Form: {
                                labelRequiredMarkColor: '#000'
                            }
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



                                
                                <BasicDataFormBlock isHeavy={isHeavy} isSPP={isSPP} SPP={SPP} product_price={product_price} package_height={package_height} package_width={package_width} package_length={package_length} />
                                <LogisticsDataFormBlock isPaidCargoAcceptance={isPaidCargoAcceptance} isHeavy={isHeavy} />
                                <MPFeesDataFormBlock />
                                <AdditionalOptionsDataFormBlock />

                               

                                
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




