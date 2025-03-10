import styles from './MPFeesDataFormBlock.module.css'
import { Form, Input, ConfigProvider, Tooltip } from 'antd';
const MPFeesDataFormBlock = () => {

    return (
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
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                            { pattern: /^\d+(\.\d+)?$/, message: 'Пожалуйста, введите только числа!' },
                            { pattern: /^(100|[1-9]?\d)(\.\d+)?$/, message: 'Пожалуйста, введите число от 0 до 100!' },
                        ]
                    }
                    name='additional_mp_fee'
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
                    rules={
                        [
                            { pattern: /^\d+(\.\d+)?$/, message: 'Пожалуйста, введите только числа!' },
                            { pattern: /^(100|[1-9]?\d)(\.\d+)?$/, message: 'Пожалуйста, введите число от 0 до 100!' },
                        ]
                    }
                    name='equiring_fee'
                >
                    <Input
                        size='large'
                        placeholder='Укажите комиссию'
                    />
                </Form.Item>
            </div>
        </fieldset>
    )
}

export default MPFeesDataFormBlock;