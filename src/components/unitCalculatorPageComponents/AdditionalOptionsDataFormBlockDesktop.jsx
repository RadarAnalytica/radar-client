import { useState, useEffect } from "react";
import styles from './AdditionalOptionsDataFormBlockDesktop.module.css';
import { Form, Input, Radio, ConfigProvider } from 'antd';
import { normilizeUnitsInputValue } from "./UnitCalcUtils";
import { useAppSelector } from "../../redux/hooks";

const AdditionalOptionsDataFormBlockDesktop = ({ form, mpMainFee }) => {
    const { isSidebarHidden } = useAppSelector(store => store.utils);
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
    const tax_state = Form.useWatch('tax_state', form);
    const additional_mp_fee = Form.useWatch('additional_mp_fee', form);
    const equiring_fee = Form.useWatch('equiring_fee', form);
    const product_cost = Form.useWatch('product_cost', form);


    const [popupState, setPopupState] = useState({
        isShippingCostsPopupVisible: false,
        isTaxesPopupVisible: false,
        isOtherCostsPopupVisible: false
    });
    const [taxValue, setTaxValue] = useState(0);

    useEffect(() => {

        if (tax_state === 'УСН-доходы') {
            const total_product_price = isSPP && SPP && tax_rate ? (product_price - (product_price * ((SPP) / 100))) * (tax_rate / 100) : product_price * (tax_rate / 100);
            setTaxValue(total_product_price);
        }

        if (tax_state === 'Доходы - расходы') {
            const product_cost_p = parseInt(product_cost) || 0;
            //console.log('product_cost_p', product_cost_p)
            const product_price_p = parseInt(product_price) || 0;
            //console.log('product_price_p', product_price_p)
            const additional_mp_fee_p = parseInt(additional_mp_fee) || 0;
            //console.log('additional_mp_fee_p', additional_mp_fee_p)
            const equiring_fee_p = parseInt(equiring_fee) || 0;
            //console.log('equiring_fee_p', equiring_fee_p)
            const SPP_p = parseInt(SPP) || 0;
            const defective_percentage_p = parseInt(defective_percentage) || 0;
            //console.log('defective_percentage_p', defective_percentage_p)
            const other_costs_p = parseInt(other_costs) || 0;
            //console.log('other_costs_p', other_costs_p)
            const inhouse_logistics_price_p = parseInt(inhouse_logistics_price) || 0;
            //console.log('inhouse_logistics_price_p', inhouse_logistics_price_p)
            const packaging_price_p = parseInt(packaging_price) || 0;
            //console.log('packaging_price_p', packaging_price_p)
            const mp_logistics_price_p = parseInt(mp_logistics_price) || 0;
            //console.log('mp_logistics_price_p', mp_logistics_price_p)
            const fullfilment_price_p = parseInt(fullfilment_price) || 0;
            //console.log('fullfilment_price_p', fullfilment_price_p)
            const tax_rate_p = parseInt(tax_rate) || 0;
            //console.log('tax_rate_p', tax_rate_p)
            // total product price (with spp discount)
            const total_product_price = product_price_p - (product_price_p * ((SPP_p) / 100));
            //console.log('SPP_p', SPP_p)
            //console.log('total_product_price', total_product_price)
            // self cost
            let selfCost = product_cost_p + (product_cost_p * ((defective_percentage_p) / 100)) + other_costs_p + inhouse_logistics_price_p + packaging_price_p + mp_logistics_price_p + fullfilment_price_p;
            //console.log('selfCost', selfCost)
            // total mp fee
            let absMpFee = (product_price_p * ((additional_mp_fee_p + mpMainFee) / 100));
            // total eq fee
            let absEquiringFee = (total_product_price * ((equiring_fee_p) / 100));


            // tax fee
            const absTaxFee = ((total_product_price - selfCost - absMpFee - absEquiringFee) * ((tax_rate_p) / 100));
            //console.log(absTaxFee)
            setTaxValue(absTaxFee);
        }

    }, [
        tax_rate,
        SPP,
        adv_price,
        other_costs,
        inhouse_logistics_price,
        packaging_price,
        mp_logistics_price,
        fullfilment_price,
        product_price,
        tax_state,
        additional_mp_fee,
        equiring_fee,
        product_cost,
        mpMainFee
    ]);


    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Дополнительные настройки для более точного расчета</h2>
            </div>
            <div className={styles.fieldset__popupWrapper}>
                <div className={styles.fieldset__popup}>
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isShippingCostsPopupVisible: !popupState.isShippingCostsPopupVisible }); }}>
                        <h3 className={styles.fieldset__popupTitle}>Организация поставки</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isShippingCostsPopupVisible ? 'rotate(360deg)' : 'rotate(180deg)', transition: 'all .3s ease-out' }}>
                            <path d="M13 7.5L7 1.5L1 7.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>
                    <div className={popupState.isShippingCostsPopupVisible ? styles.fieldset__popupBody : styles.fieldset__popupBody_closed}>
                        <div className={isSidebarHidden ? `${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}` : styles.fieldset__wrapper}>
                            <Form.Item
                                label='Логистика от производителя'
                                className={styles.formItem}
                                name='inhouse_logistics_price'
                                getValueProps={(value) => {
                                    const transformedValue = { value: value ? value + ' ₽' : value };
                                    return transformedValue;
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                                    const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue; };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{ background: inhouse_logistics_price ? '#F2F2F2' : '' }}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                    className={styles.formItem__input}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Упаковка и маркировка'
                                className={styles.formItem}
                                name='packaging_price'
                                getValueProps={(value) => {
                                    const transformedValue = { value: value ? value + ' ₽' : value };
                                    return transformedValue;
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                                    const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue; };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{ background: packaging_price ? '#F2F2F2' : '' }}
                                    size='large'
                                    placeholder='Укажите стоимость упаковки'
                                    className={styles.formItem__input}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Логистика до маркетплейса'
                                className={styles.formItem}
                                name='mp_logistics_price'
                                getValueProps={(value) => {
                                    const transformedValue = { value: value ? value + ' ₽' : value };
                                    return transformedValue;
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                                    const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue; };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{ background: mp_logistics_price ? '#F2F2F2' : '' }}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                    className={styles.formItem__input}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Услуги фулфилмента'
                                className={styles.formItem}
                                name='fullfilment_price'
                                getValueProps={(value) => {
                                    const transformedValue = { value: value ? value + ' ₽' : value };
                                    return transformedValue;
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                                    const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue; };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{ background: fullfilment_price ? '#F2F2F2' : '' }}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                    className={styles.formItem__input}
                                />
                            </Form.Item>
                        </div>
                    </div>

                </div>

                <div className={styles.fieldset__popup}>
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isTaxesPopupVisible: !popupState.isTaxesPopupVisible }); }}>
                        <h3 className={styles.fieldset__popupTitle}>Налоги</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isTaxesPopupVisible ? 'rotate(360deg)' : 'rotate(180deg)', transition: 'all .3s ease-out' }}>
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
                                const transformedValue = { value: value ? value + ' %' : value };
                                return transformedValue;
                            }}
                            normalize={(value, prevValue) => {
                                const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' %');
                                const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/; // только целые и дробные от 0 до 100
                                if (regex.test(normalizedValue)) { return normalizedValue; };
                                return prevValue || '';
                            }}
                            name='tax_rate'
                        >
                            <Input
                                style={{ background: tax_rate ? '#F2F2F2' : '' }}
                                size='large'
                                placeholder='Укажите ставку'
                                className={styles.formItem__input}
                            />
                        </Form.Item>

                        <p className={styles.fieldset__footerText_price}>{taxValue ? taxValue.toFixed(2) : 0} ₽</p>
                    </div>
                </div>

                <div className={styles.fieldset__popup}>
                    <div className={styles.fieldset__popupHeader} onClick={() => { setPopupState({ ...popupState, isOtherCostsPopupVisible: !popupState.isOtherCostsPopupVisible }); }}>
                        <h3 className={styles.fieldset__popupTitle}>Прочие расходы на товар</h3>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: popupState.isOtherCostsPopupVisible ? 'rotate(360deg)' : 'rotate(180deg)', transition: 'all .3s ease-out' }}>
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
                                    const transformedValue = { value: value ? value + ' ₽' : value };
                                    return transformedValue;
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                                    const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                    if (regex.test(normalizedValue)) { return normalizedValue; };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{ background: adv_price ? '#F2F2F2' : '' }}
                                    size='large'
                                    placeholder='Укажите стоимость'
                                    className={styles.formItem__input}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Брак'
                                className={styles.formItem}
                                name='defective_percentage'
                                getValueProps={(value) => {
                                    const transformedValue = { value: value ? value + ' %' : value };
                                    return transformedValue;
                                }}
                                normalize={(value, prevValue) => {
                                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' %');
                                    const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/; // только целые и дробные от 0 до 100
                                    if (regex.test(normalizedValue)) { return normalizedValue; };
                                    return prevValue || '';
                                }}
                            >
                                <Input
                                    style={{ background: defective_percentage ? '#F2F2F2' : '' }}
                                    size='large'
                                    placeholder='Укажите процент'
                                    className={styles.formItem__input}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label='Другое'
                            className={styles.formItem}
                            getValueProps={(value) => {
                                const transformedValue = { value: value ? value + ' ₽' : value };
                                return transformedValue;
                            }}
                            normalize={(value, prevValue) => {
                                const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                                const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                if (regex.test(normalizedValue)) { return normalizedValue; };
                                return prevValue || '';
                            }}
                            name='other_costs'
                        >
                            <Input
                                style={{ background: other_costs ? '#F2F2F2' : '' }}
                                size='large'
                                placeholder='Укажите стоимость'
                                className={styles.formItem__input}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default AdditionalOptionsDataFormBlockDesktop;
