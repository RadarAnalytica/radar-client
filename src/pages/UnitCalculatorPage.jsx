import styles from './UnitCalculatorPage.module.css'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, Input, Checkbox, Radio, Button, ConfigProvider } from 'antd';

const UnitCalculatorPage = () => {

    return (
        <main className={styles.page}>
            <SideNav />
            <section className={styles.page__content}>
                <TopNav title={'Калькулятор unit-экономики товара'} />
                <div className={styles.page__mainContentWrapper}>
                    <div className={styles.page__formWrapper}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontFamily: 'Mulish',
                                    colorBorder: 'white',
                                },
                                components: {
                                    Form: {
                                        labelFontSize: 16
                                    },
                                    Input: {
                                        activeBorderColor: '#5329FF',
                                        hoverBorderColor: '#5329FF',
                                        activeBg: '#F2F2F2',
                                    }
                                }
                            }}
                        >
                            <Form
                                className={styles.form}
                                layout="vertical"
                            >
                                <fieldset className={styles.fieldset}>
                                    <div className={styles.fieldset__header}>
                                        <h2 className={styles.fieldset__title}>Базовые данные</h2>
                                        <p className={styles.fieldset__subtitle}>Укажите значения для расчета одной единицы товара (SKU)</p>
                                    </div>

                                    <Form.Item
                                        label='Товар'
                                        className={styles.fromItem}

                                    >
                                        <Input
                                            size='large'
                                            placeholder='Введите название товара'
                                        />
                                    </Form.Item>


                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                        <Form.Item
                                            label='Цена товара'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите цену товара'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='СПП'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите СПП, %'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className={styles.fromItem}
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorBorder: '#00000033',
                                                        colorPrimary: '#5329FF'
                                                    }

                                                }}
                                            >
                                                <Checkbox checked>Указывать СПП</Checkbox>
                                            </ConfigProvider>
                                        </Form.Item>
                                        <div className={styles.fieldset__footer} style={{ justifyContent: 'space-between' }}>
                                            <p className={styles.fieldset__footerText}>цена с СПП</p>
                                            <p className={styles.fieldset__footerText_price}>1 000 ₽</p>
                                        </div>
                                    </div>



                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_3cols}`}>
                                        <Form.Item
                                            label='Длина упаковки'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите длину упаковки'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Ширина упаковки'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите ширину упаковки'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Высота упаковки'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите высоту упаковки'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            className={styles.fromItem}
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorBorder: '#00000033',
                                                        colorPrimary: '#5329FF'
                                                    }

                                                }}
                                            >
                                                <Checkbox
                                                    checked
                                                >Тяжелее 25 кг</Checkbox>
                                            </ConfigProvider>
                                        </Form.Item>

                                        <div className={styles.fieldset__footer_span}>
                                            <p className={styles.fieldset__footerText}>Сумма трех сторон: 38 см</p>
                                            <p className={styles.fieldset__footerText}>Расчетный объем: 1,95 л</p>
                                            <p className={styles.fieldset__footerText}>/t/</p>
                                        </div>
                                    </div>
                                </fieldset>


                                <fieldset className={styles.fieldset}>
                                    <div className={styles.fieldset__header}>
                                        <h2 className={styles.fieldset__title}>Логистика</h2>
                                    </div>

                                    <Form.Item
                                        label='Тип упаковки'
                                        className={styles.fromItem}
                                    >

                                        <Radio.Group
                                            style={{ width: '100%' }}
                                            defaultValue='a'
                                        >
                                            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorBorder: '#00000033',
                                                            colorPrimary: '#5329FF'
                                                        }

                                                    }}
                                                >
                                                    <Radio value="a">Короб /t/</Radio>
                                                    <Radio value="b">Монопаллета</Radio>
                                                </ConfigProvider>
                                            </div>
                                        </Radio.Group>

                                    </Form.Item>


                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                        <Form.Item
                                            label='Склад отгрузки /t/'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Выберите склад'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Стоимость платной приемки, ₽'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите стоимость'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className={styles.fromItem}
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorBorder: '#00000033',
                                                        colorPrimary: '#5329FF'
                                                    }

                                                }}
                                            >
                                                <Checkbox checked>Платная приемка /t/</Checkbox>
                                            </ConfigProvider>
                                        </Form.Item>
                                    </div>



                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                        <Form.Item
                                            label='Скорость доставки (FBS) /t/'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите скорость доставки'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Логистика с учетом процента выкупа /t/'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите процент выкупа'
                                            />
                                        </Form.Item>

                                        <div className={styles.fieldset__footer}>
                                            <p className={styles.fieldset__footerText_price}>115,9 ₽</p>
                                        </div>
                                    </div>

                                    <Form.Item
                                        className={styles.fromItem}
                                    >

                                        <Radio.Group
                                            style={{ width: '100%' }}
                                            defaultValue='a'
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorBorder: '#00000033',
                                                        colorPrimary: '#5329FF'
                                                    }

                                                }}
                                            >
                                                <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                                    <Radio value="a">
                                                        <lablel className={styles.radioLabel}>
                                                            <p className={styles.fieldset__footerText_price}>0 ₽</p>
                                                            <p className={styles.fieldset__footerText}>Хранение 1 шт. в месяц</p>
                                                        </lablel>
                                                    </Radio>
                                                    <Radio value="b">
                                                        <lablel className={styles.radioLabel}>
                                                            <p className={styles.fieldset__footerText_price}>0 ₽</p>
                                                            <p className={styles.fieldset__footerText}>Хранение 1 шт. в день</p>
                                                        </lablel>
                                                    </Radio>
                                                </div>
                                            </ConfigProvider>
                                        </Radio.Group>

                                    </Form.Item>
                                </fieldset>



                                <fieldset className={styles.fieldset}>
                                    <div className={styles.fieldset__header}>
                                        <h2 className={styles.fieldset__title}>Удержания маркетплейса</h2>
                                    </div>


                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                        <p className={styles.fieldset__footerText}>Комиссия WB 22,5%</p>
                                        <div style={{ justifySelf: 'end' }}>
                                            <p className={styles.fieldset__footerText_price}>225 ₽</p>
                                        </div>

                                        <Form.Item
                                            label='Комиссия за тарифные опции /t/'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите комиссию'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Эквайринг /t/'
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите комиссию'
                                            />
                                        </Form.Item>
                                    </div>
                                </fieldset>


                                <fieldset className={styles.fieldset}>
                                    <div className={styles.fieldset__header}>
                                        <h2 className={styles.fieldset__title}>Дополнительные настройки для более точного расчета</h2>
                                    </div>
                                    <div className={styles.fieldset__popupWrapper}>
                                        <div className={styles.fieldset__popup}>
                                            <div className={styles.fieldset__popupHeader}>
                                                <h3 className={styles.fieldset__popupTitle}>Организация поставки</h3>
                                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>

                                            </div>
                                            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                                <Form.Item
                                                    label='Логистика от производителя'
                                                    className={styles.fromItem}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder='Укажите стоимость'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label='Упаковка и маркировка'
                                                    className={styles.fromItem}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder='Укажите стоимость упаковки'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label='Логистика до маркетплейса'
                                                    className={styles.fromItem}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder='Укажите стоимость'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label='Услуги фулфилмента'
                                                    className={styles.fromItem}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder='Укажите стоимость'
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className={styles.fieldset__popup}>
                                            <div className={styles.fieldset__popupHeader}>
                                                <h3 className={styles.fieldset__popupTitle}>Налоги</h3>
                                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>

                                            </div>
                                            <Form.Item
                                                label='Налоговый режим'
                                                className={styles.fromItem}
                                            >
                                                <Radio.Group
                                                    style={{ width: '100%' }}
                                                    defaultValue='b'
                                                >
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorBorder: '#00000033',
                                                                colorPrimary: '#5329FF'
                                                            }

                                                        }}
                                                    >
                                                        <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                                            <Radio value="a">УНС-доходы</Radio>
                                                            <Radio value="b">Доходы - расходы</Radio>
                                                        </div>
                                                    </ConfigProvider>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Налоговая ставка'
                                                className={styles.fromItem}
                                            >
                                                <Input
                                                    size='large'
                                                    placeholder='Укажите ставку'
                                                />
                                            </Form.Item>

                                            <p className={styles.fieldset__footerText_price}>60 ₽</p>
                                        </div>

                                        <div className={styles.fieldset__popup}>
                                            <div className={styles.fieldset__popupHeader}>
                                                <h3 className={styles.fieldset__popupTitle}>Прочие расходы на товар</h3>
                                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>

                                            </div>
                                            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                                <Form.Item
                                                    label='Затраты на рекламу'
                                                    className={styles.fromItem}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder='Укажите стоимость'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label='Брак'
                                                    className={styles.fromItem}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder='Укажите процент'
                                                    />
                                                </Form.Item>
                                            </div>

                                            <Form.Item
                                                label='Другое'
                                                className={styles.fromItem}
                                            >
                                                <Input
                                                    size='large'
                                                    placeholder='Укажите стоимость'
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </fieldset>
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
                                    >Рассчитать</Button>
                                </ConfigProvider>

                            </Form>
                        </ConfigProvider>
                    </div>

                    <div className={styles.page__resultWrapper}>
                        {/* result here */}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default UnitCalculatorPage;