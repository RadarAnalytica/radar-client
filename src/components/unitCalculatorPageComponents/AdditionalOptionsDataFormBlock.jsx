import { useState } from "react"
import styles from './AdditionalOptionsDataFormBlock.module.css'
import { Form, Input, Radio, ConfigProvider } from 'antd';

const AdditionalOptionsDataFormBlock = () => {

    const [popupState, setPopupState] = useState({
        isShippingCostsPopupVisible: false,
        isTaxesPopupVisible: false,
        isOtherCostsPopupVisible: false
    })

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Дополнительные настройки для более точного расчета</h2>
            </div>
            <div className={styles.fieldset__popupWrapper}>
                <div className={styles.fieldset__popup}>
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isShippingCostsPopupVisible: !popupState.isShippingCostsPopupVisible }) }}>
                        <h3 className={styles.fieldset__popupTitle}>Организация поставки</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isShippingCostsPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out' }}>
                            <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>
                    {popupState.isShippingCostsPopupVisible &&
                        <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                            <Form.Item
                                label='Логистика от производителя'
                                className={styles.formItem}
                                name='inhouse_logistics_price'
                                rules={
                                    [
                                        { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                                    ]
                                }
                            >
                                <Input
                                    size='large'
                                    placeholder='Укажите стоимость'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Упаковка и маркировка'
                                className={styles.formItem}
                                name='packaging_price'
                                rules={
                                    [
                                        { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                                    ]
                                }
                            >
                                <Input
                                    size='large'
                                    placeholder='Укажите стоимость упаковки'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Логистика до маркетплейса'
                                className={styles.formItem}
                                name='mp_logistics_price'
                                rules={
                                    [
                                        { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                                    ]
                                }
                            >
                                <Input
                                    size='large'
                                    placeholder='Укажите стоимость'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Услуги фулфилмента'
                                className={styles.formItem}
                                name='fullfilment_price'
                                rules={
                                    [
                                        { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                                    ]
                                }
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
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isTaxesPopupVisible: !popupState.isTaxesPopupVisible }) }}>
                        <h3 className={styles.fieldset__popupTitle}>Налоги</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isTaxesPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out' }}>
                            <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>
                    {popupState.isTaxesPopupVisible &&
                        <>
                            <Form.Item
                                label='Налоговый режим'
                                className={styles.formItem}
                                name='tax_state'
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
                                            <Radio value="УСН-доходы">УСН-доходы</Radio>
                                            <Radio value="Доходы - расходы">Доходы - расходы</Radio>
                                        </div>
                                    </ConfigProvider>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label='Налоговая ставка'
                                className={styles.formItem}
                                rules={
                                    [
                                        { pattern: /^\d+(\.\d+)?$/, message: 'Пожалуйста, введите только числа!' },
                                        { pattern: /^(100|[1-9]?\d)(\.\d+)?$/, message: 'Пожалуйста, введите число от 0 до 100!' },
                                    ]
                                }
                                name='tax_rate'
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
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isOtherCostsPopupVisible: !popupState.isOtherCostsPopupVisible }) }}>
                        <h3 className={styles.fieldset__popupTitle}>Прочие расходы на товар</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isOtherCostsPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out' }}>
                            <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>
                    {popupState.isOtherCostsPopupVisible &&
                        <>
                            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                <Form.Item
                                    label='Затраты на рекламу'
                                    className={styles.formItem}
                                    name='adv_price'
                                    rules={
                                        [
                                            { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                                        ]
                                    }
                                >
                                    <Input
                                        size='large'
                                        placeholder='Укажите стоимость'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Брак'
                                    className={styles.formItem}
                                    name='defective_percentage'
                                    rules={
                                        [
                                            { pattern: /^\d+(\.\d+)?$/, message: 'Пожалуйста, введите только числа!' },
                                            { pattern: /^(100|[1-9]?\d)(\.\d+)?$/, message: 'Пожалуйста, введите число от 0 до 100!' },
                                        ]
                                    }
                                >
                                    <Input
                                        size='large'
                                        placeholder='Укажите процент'
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label='Другое'
                                className={styles.formItem}
                                rules={
                                    [
                                        { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                                    ]
                                }
                                name='other_costs'
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
    )
}

export default AdditionalOptionsDataFormBlock;