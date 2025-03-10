import React, { useState } from 'react'
import styles from './UnitCalculatorPage.module.css'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, Input, Checkbox, Radio, Button, ConfigProvider, Tooltip } from 'antd';

const UnitCalculatorPage = () => {

    const [ popupState, setPopupState ] = useState({
        isShippingCostsPopupVisible: false,
        isTaxesPopupVisible: false,
        isOtherCostsPopupVisible: false
    })

    const [ form ] = Form.useForm();
    console.log(form)
    const userName = Form.useWatch('username', form);

    const submitHandler = (fields) => {
        console.log(fields)
    }

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
                                    isSPP: true
                                }}
                            >
                                <fieldset className={styles.fieldset}>
                                    <div className={styles.fieldset__header}>
                                        <h2 className={styles.fieldset__title}>Базовые данные</h2>
                                        <p className={styles.fieldset__subtitle}>Укажите значения для расчета одной единицы товара (SKU)</p>
                                    </div>

                                    <Form.Item
                                        name='product'
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
                                            name='product_price'
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
                                            name='SPP'
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите СПП, %'
                                            />
                                        </Form.Item>
                                        <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorBorder: '#00000033',
                                                        colorPrimary: '#5329FF'
                                                    }

                                                }}
                                            >
                                        <Form.Item
                                            className={styles.fromItem}
                                            name='isSPP'
                                            valuePropName="checked"
                                        >
                                                <Checkbox>Указывать СПП</Checkbox>
                                        </Form.Item>
                                        </ConfigProvider>
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
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorTextLightSolid: '#000'
                                                    }
                                                }}
                                            >
                                                <Tooltip
                                                    title='test'
                                                    style={{ cursor: 'pointer'}}
                                                    color={'white'}
                                                >
                                                    <div className={styles.tooltip}>!</div>
                                                </Tooltip>
                                            </ConfigProvider>
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
                                                    <Radio value="a"> <div className={styles.label}>
                                                    {'Короб'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div></Radio>
                                                    <Radio value="b">Монопаллета</Radio>
                                                </ConfigProvider>
                                            </div>
                                        </Radio.Group>

                                    </Form.Item>


                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                        <Form.Item
                                            label={
                                                <div className={styles.label}>
                                                    {'Склад отгрузки'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                            }
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
                                                <Checkbox checked><div className={styles.label}>
                                                    {'Платная приемка'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                                </Checkbox>
                                            </ConfigProvider>
                                        </Form.Item>
                                    </div>



                                    <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                        <Form.Item
                                            label={
                                                <div className={styles.label}>
                                                    {'Скорость доставки (FBS)'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                            }
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите скорость доставки'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={
                                                <div className={styles.label}>
                                                    {'Логистика с учетом процента выкупа'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                            }
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
                                            label={
                                                <div className={styles.label}>
                                                    {'Комиссия за тарифные опции'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                            }
                                            className={styles.fromItem}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Укажите комиссию'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={
                                                <div className={styles.label}>
                                                    {'Эквайринг'}
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorTextLightSolid: '#000'
                                                            }
                                                        }}
                                                    >
                                                        <Tooltip
                                                        title='test'
                                                        style={{ cursor: 'pointer'}}
                                                        color={'white'}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                            }
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
                                            <div className={styles.fieldset__popupHeader} onClick={() => {setPopupState({...popupState, isShippingCostsPopupVisible: !popupState.isShippingCostsPopupVisible})}}>
                                                <h3 className={styles.fieldset__popupTitle}>Организация поставки</h3>
                                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isShippingCostsPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out'}}>
                                                    <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>

                                            </div>
                                            {popupState.isShippingCostsPopupVisible && 
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
                                            }
                                        </div>

                                        <div className={styles.fieldset__popup}>
                                            <div className={styles.fieldset__popupHeader} onClick={() => {setPopupState({...popupState, isTaxesPopupVisible: !popupState.isTaxesPopupVisible})}}>
                                                <h3 className={styles.fieldset__popupTitle}>Налоги</h3>
                                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isTaxesPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out'}}>
                                                    <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>

                                            </div>
                                            {popupState.isTaxesPopupVisible &&
                                            <>
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
                                            </>
                                            }
                                        </div>

                                        <div className={styles.fieldset__popup}>
                                            <div className={styles.fieldset__popupHeader} onClick={() => {setPopupState({...popupState, isOtherCostsPopupVisible: !popupState.isOtherCostsPopupVisible})}}>
                                                <h3 className={styles.fieldset__popupTitle}>Прочие расходы на товар</h3>
                                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isOtherCostsPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out'}}>
                                                    <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>

                                            </div>
                                            {popupState.isOtherCostsPopupVisible && 
                                            <>
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
                                            </>
                                            }
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
                                        htmlType='submit'
                                    >Рассчитать</Button>
                                </ConfigProvider>

                            </Form>
                        </div>






                        {/* result here */}
                        <div className={styles.page__resultWrapper}>
                            <div className={styles.result__shareWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorBorder: '#00000033',
                                            colorPrimary: '#E7E1FE',
                                        },
                                        components: {
                                            Button: {
                                                primaryColor: '#5329FF',
                                                //paddingInline: 8,
                                                paddingBlockLG: 10,
                                                paddingInlineLG: 8,
                                            }
                                        }
                                    }}
                                >
                                    <Button
                                        type='primary'
                                        //style={{ color: '#5329FF' }}
                                        iconPosition='start'
                                        icon={<ShareIcon />}
                                        size='large'
                                    >Поделиться результатом</Button>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorBorder: '#00000033',
                                            colorPrimary: '#5329FF',
                                        }
                                    }}
                                >
                                    <Button
                                        type='primary'
                                        icon={<DownloadIcon />}
                                        iconPosition='start'
                                        size='large'
                                    >Скачать Excel</Button>
                                </ConfigProvider>
                            </div>

                            <div className={styles.result__tableWrapper}>
                                <p className={styles.result__title}>Расчет партии</p>
                                <label
                                    className={styles.result__inputWrapper}
                                >
                                    {'Мои вложения, ₽'}
                                    <Input
                                        size='large'
                                        placeholder='50 000 ₽'
                                    />
                                </label>

                                <div className={styles.result__table}>
                                    <div className={styles.result__tableRow}>
                                        {'Кол-во товара'} <span>46 шт</span>
                                    </div>
                                    <div className={styles.result__tableRow}>
                                        {'Выручка'} <span>46 000 ₽</span>
                                    </div>
                                    <div className={styles.result__tableRow}>
                                        {'Чистая прибыль'} <span>-73 600 ₽ </span>
                                    </div>
                                    <div className={styles.result__tableRow}>
                                    <div className={styles.label} style={{ gap: 4}}>
                                                    {'Точка безубыточности'}
                                                    <ConfigProvider theme={{ token: {colorTextLightSolid: '#000'}}}>
                                                    <Tooltip
                                                    color={'white'}
                                                    title='test'
                                                    arrow={false}
                                                    style={{ cursor: 'pointer', color: 'black'}}
                                                    >
                                                        <div className={styles.tooltip}>!</div>
                                                    </Tooltip>
                                                    </ConfigProvider>
                                                </div>
                                         <span>66 шт</span>
                                    </div>
                                </div>
                            </div>




                            <div className={styles.result__tableWrapper}>
                                <p className={styles.result__title}>Итоговые значения</p>

                                <div className={styles.result__mainResultTable}>
                                    <div className={styles.result__mainTableRow}>
                                        <div className={styles.result__mainTablePrice}>1 105 ₽</div>
                                        <div className={styles.result__mainTableText}>Общая себестоимость</div>
                                        <div className={`${styles.result__mainTableText} ${styles.result__mainTableText_gray}`}>Общая сумма затрат до поставки товара</div>
                                    </div>
                                    <div className={styles.result__mainTableRow}>
                                        <div className={styles.result__mainTablePrice}>-144,8 %</div>
                                        <div className={styles.result__mainTableText}>Рентабельность ROI</div>
                                        <div className={`${styles.result__mainTableText} ${styles.result__mainTableText_gray}`}>Доля прибыли от вложений</div>
                                    </div>
                                    <div className={styles.result__mainTableRow}>
                                        <div className={styles.result__mainTablePrice}>-160 %</div>
                                        <div className={styles.result__mainTableText}>Маржинальность</div>
                                        <div className={`${styles.result__mainTableText} ${styles.result__mainTableText_gray}`}>Доля прибыли в выручке</div>
                                    </div>
                                </div>

                                <div className={styles.result__table}>
                                    <div className={styles.result__tableRow}>
                                        {'Чистая прибыль'} <span>-1 600 ₽</span>
                                    </div>
                                    <div className={styles.result__tableRow}>
                                        {'Минимальная цена'}
                                        <span>2 600 ₽</span>
                                    </div>
                                    <div className={styles.result__tableRow}>
                                        {'Максимальаня скидка'} <span>-160 %</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ConfigProvider>
            </section>
        </main>
    )
}

export default UnitCalculatorPage;




const ShareIcon = () => {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3367 3.16335C13.958 1.7847 11.7228 1.7847 10.3441 3.16335L8.80798 4.69951C8.48983 5.01766 7.97401 5.01766 7.65586 4.69951C7.33771 4.38136 7.33771 3.86554 7.65586 3.54739L9.19202 2.01123C11.207 -0.00372148 14.4738 -0.00372148 16.4888 2.01123C18.5037 4.02617 18.5037 7.29305 16.4888 9.30799L14.9526 10.8442C14.6345 11.1623 14.1187 11.1623 13.8005 10.8442C13.4824 10.526 13.4824 10.0102 13.8005 9.69203L15.3367 8.15587C16.7153 6.77722 16.7153 4.54199 15.3367 3.16335Z" fill="#5329FF" />
            <path d="M4.19949 8.15587C4.51764 8.47402 4.51764 8.98985 4.19949 9.308L2.66333 10.8442C1.28468 12.2228 1.28468 14.458 2.66333 15.8367C4.04198 17.2153 6.27721 17.2153 7.65586 15.8367L9.19202 14.3005C9.51017 13.9824 10.026 13.9824 10.3441 14.3005C10.6623 14.6187 10.6623 15.1345 10.3441 15.4526L8.80798 16.9888C6.79303 19.0038 3.52616 19.0038 1.51121 16.9888C-0.503737 14.9739 -0.503737 11.707 1.51121 9.69204L3.04737 8.15587C3.36552 7.83773 3.88134 7.83773 4.19949 8.15587Z" fill="#5329FF" />
            <path d="M6.11966 11.2282C5.80151 11.5464 5.80151 12.0622 6.11966 12.3803C6.43781 12.6985 6.95363 12.6985 7.27178 12.3803L11.8803 7.77184C12.1984 7.45369 12.1984 6.93787 11.8803 6.61972C11.5621 6.30157 11.0463 6.30157 10.7281 6.61972L6.11966 11.2282Z" fill="#5329FF" />
        </svg>
    )
}
const DownloadIcon = () => {
    return (
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.9 6.69999H14.4L9 12.1L3.6 6.69999H8.1V0.399994H9.9V6.69999ZM1.8 14.8H16.2V8.49999H18V15.7C18 15.9387 17.9052 16.1676 17.7364 16.3364C17.5676 16.5052 17.3387 16.6 17.1 16.6H0.9C0.661305 16.6 0.432387 16.5052 0.263604 16.3364C0.0948211 16.1676 0 15.9387 0 15.7V8.49999H1.8V14.8Z" fill="white" />
        </svg>

    )
}