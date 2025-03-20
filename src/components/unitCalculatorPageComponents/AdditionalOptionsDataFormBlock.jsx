import { useState } from "react"
import styles from './AdditionalOptionsDataFormBlock.module.css'
import { Form, Input, Radio, ConfigProvider } from 'antd';
import { normilizeUnitsInputValue } from "./UnitCalcUtils";

const AdditionalOptionsDataFormBlock = ({ form }) => {

    const inhouse_logistics_price = Form.useWatch('inhouse_logistics_price', form);
    const packaging_price = Form.useWatch('packaging_price', form);
    const mp_logistics_price = Form.useWatch('mp_logistics_price', form);
    const fullfilment_price = Form.useWatch('fullfilment_price', form);
    const product_price = Form.useWatch('product_price', form);
    const SPP = Form.useWatch('SPP', form);
    const isSPP = Form.useWatch('isSPP', form);
    const tax_rate = Form.useWatch('tax_rate', form);
    const adv_price = Form.useWatch('adv_price', form);
    const defective_percentage = Form.useWatch('defective_percentage', form);
    const other_costs = Form.useWatch('other_costs', form);


    const total_product_price = isSPP && SPP && tax_rate ? (product_price - (product_price*((SPP)/100)))*(tax_rate / 100)  : product_price*(tax_rate / 100);

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
                    <div className={popupState.isShippingCostsPopupVisible ? styles.fieldset__popupBody : styles.fieldset__popupBody_closed}>
                        <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                            <Form.Item
                                label='Логистика от производителя'
                                className={styles.formItem}
                                name='inhouse_logistics_price'
                                getValueProps={(value) => {
                                    const transformedValue = {value: value ? value + ' ₽' : value}
                                    return transformedValue
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                                    const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{background: inhouse_logistics_price ? '#F2F2F2' : ''}}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Упаковка и маркировка'
                                className={styles.formItem}
                                name='packaging_price'
                                getValueProps={(value) => {
                                    const transformedValue = {value: value ? value + ' ₽' : value}
                                    return transformedValue
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                                    const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{background: packaging_price ? '#F2F2F2' : ''}}
                                    size='large'
                                    placeholder='Укажите стоимость упаковки'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Логистика до маркетплейса'
                                className={styles.formItem}
                                name='mp_logistics_price'
                                getValueProps={(value) => {
                                    const transformedValue = {value: value ? value + ' ₽' : value}
                                    return transformedValue
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                                    const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{background: mp_logistics_price ? '#F2F2F2' : ''}}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Услуги фулфилмента'
                                className={styles.formItem}
                                name='fullfilment_price'
                                getValueProps={(value) => {
                                    const transformedValue = {value: value ? value + ' ₽' : value}
                                    return transformedValue
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                                    const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{background: fullfilment_price ? '#F2F2F2' : ''}}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                />
                            </Form.Item>
                        </div>
                        </div>
                    
                </div>

                <div className={styles.fieldset__popup}>
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isTaxesPopupVisible: !popupState.isTaxesPopupVisible }) }}>
                        <h3 className={styles.fieldset__popupTitle}>Налоги</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isTaxesPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out' }}>
                            <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>
                       <div className={popupState.isTaxesPopupVisible ? styles.fieldset__popupBody : styles.fieldset__popupBody_closed}>
                            <Form.Item
                                label='Налоговый режим'
                                className={styles.formItem}
                                name='tax_state'
                                preserve
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
                                preserve
                                className={styles.formItem}
                                getValueProps={(value) => {
                                    const transformedValue = {value: value ? value + ' %' : value}
                                    return transformedValue
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' %')
                                    const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/ // только целые и дробные от 0 до 100
                                    if (regex.test(normalizedValue)) { return normalizedValue };
                                    return prevValue || '';
                                }}
                                name='tax_rate'
                            >
                                <Input
                                    style={{background: tax_rate ? '#F2F2F2' : ''}}
                                    size='large'
                                    placeholder='Укажите ставку'
                                />
                            </Form.Item>

                            <p className={styles.fieldset__footerText_price}>{!!total_product_price ? total_product_price.toFixed(2) : 0} ₽</p>
                            </div>
                </div>

                <div className={styles.fieldset__popup}>
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isOtherCostsPopupVisible: !popupState.isOtherCostsPopupVisible }) }}>
                        <h3 className={styles.fieldset__popupTitle}>Прочие расходы на товар</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isOtherCostsPopupVisible ? 'rotate(180deg' : '', transition: 'all .3s ease-out' }}>
                            <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>

                       <div className={popupState.isOtherCostsPopupVisible ? styles.fieldset__popupBody : styles.fieldset__popupBody_closed}>
                            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                                <Form.Item
                                    label='Затраты на рекламу'
                                    className={styles.formItem}
                                    name='adv_price'
                                    getValueProps={(value) => {
                                        const transformedValue = {value: value ? value + ' ₽' : value}
                                        return transformedValue
                                    }}
                                    normalize={(value, prevValue) => {
                                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                                        const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                                        if (regex.test(normalizedValue)) { return normalizedValue };
                                        return prevValue || '';
                                    }}
                                >
                                    <Input
                                        style={{background: adv_price ? '#F2F2F2' : ''}}
                                        size='large'
                                        placeholder='Укажите стоимость'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Брак'
                                    className={styles.formItem}
                                    name='defective_percentage'
                                    getValueProps={(value) => {
                                        const transformedValue = {value: value ? value + ' %' : value}
                                        return transformedValue
                                    }}
                                    normalize={(value, prevValue) => {
                                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' %')
                                        const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/ // только целые и дробные от 0 до 100
                                        if (regex.test(normalizedValue)) { return normalizedValue };
                                        return prevValue || '';
                                    }}
                                >
                                    <Input
                                        style={{background: defective_percentage ? '#F2F2F2' : ''}}
                                        size='large'
                                        placeholder='Укажите процент'
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label='Другое'
                                className={styles.formItem}
                                getValueProps={(value) => {
                                    const transformedValue = {value: value ? value + ' ₽' : value}
                                    return transformedValue
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                                    const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue };
                                    return prevValue || '';
                                }}
                                name='other_costs'
                            >
                                <Input
                                    style={{background: other_costs ? '#F2F2F2' : ''}}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                />
                            </Form.Item>
                      </div>
                </div>
            </div>
        </fieldset>
    )
}

export default AdditionalOptionsDataFormBlock;