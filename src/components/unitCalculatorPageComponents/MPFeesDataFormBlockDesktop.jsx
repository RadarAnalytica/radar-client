import styles from './MPFeesDataFormBlockDesktop.module.css'
import { Form, Input, ConfigProvider, Tooltip } from 'antd';
import { normilizeUnitsInputValue } from './UnitCalcUtils';
import { useAppSelector } from '../../redux/hooks';

const MPFeesDataFormBlockDesktop = ({ mp_fee, form }) => {
    const { isSidebarHidden } = useAppSelector(store => store.utils)
    const product_price = Form.useWatch('product_price', form);
    const additional_mp_fee = Form.useWatch('additional_mp_fee', form);
    const equiring_fee = Form.useWatch('equiring_fee', form);

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Удержания маркетплейса</h2>
            </div>


            <div className={styles.fieldset__info}>
                <p className={styles.fieldset__footerText}>Комиссия WB {mp_fee.toFixed(2)} %</p>
                <div style={{ justifySelf: 'end' }}>
                    <p className={styles.fieldset__footerText_price}>
                        {!!product_price && !!mp_fee ? Math.round((product_price * (mp_fee/100))) : 0} ₽
                    </p>
                </div>
            </div>

            <div className={isSidebarHidden ? `${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}` : styles.fieldset__wrapper}>
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
                                    title='Укажите общую комиссию за подключаемые опции в Конструкторе тарифов: https://seller.wildberries.ru/tariff-constructor'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
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
                    name='additional_mp_fee'
                >
                    <Input
                        style={{background: additional_mp_fee ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите комиссию'
                        className={styles.formItem__input}
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
                                    title='В зависимости от способа оплаты, выбранного покупателем, комиссия банка-эквайера за обработку платежа может составлять от 0,4% до 2,5% от суммы покупки на территории РФ, и до 3% в других странах СНГ. По умолчанию заполнено среднее значение по рынку – 1%. Точные значения Вы можете посмотреть в детализации отчета о продажах.'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
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
                    name='equiring_fee'
                >
                    <Input
                        style={{background: equiring_fee ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите комиссию'
                        className={styles.formItem__input}
                    />
                </Form.Item>
            </div>
        </fieldset>
    )
}

export default MPFeesDataFormBlockDesktop;