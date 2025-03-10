import styles from './LogisticsDataFormBlock.module.css'
import { Form, Input, Checkbox, Radio, ConfigProvider, Tooltip } from 'antd';
const LogisticsDataFormBlock = ({ isPaidCargoAcceptance, isHeavy }) => {

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Логистика</h2>
            </div>

            <ConfigProvider
                theme={{
                    token: {
                        colorBorder: '#00000033',
                        colorPrimary: '#5329FF'
                    }

                }}
            >
                <Form.Item
                    label='Тип упаковки'
                    className={styles.formItem}
                    name='PackageType'
                >

                    <Radio.Group
                        style={{ width: '100%' }}
                        defaultValue='Короб'
                    >
                        <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>

                            <Radio value="Короб" disabled={isHeavy}> <div className={styles.label}>
                                {'Короб'}
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorTextLightSolid: '#000'
                                        }
                                    }}
                                >
                                    {isHeavy && <Tooltip
                                        title='Логистика для крупногабаритных товаров считается по коэффициенту “Монопаллеты”'
                                        arrow={false}
                                        style={{ cursor: 'pointer' }}
                                        color={'white'}
                                    >
                                        <div className={`${styles.tooltip} ${styles.tooltip_red}`}>!</div>
                                    </Tooltip>}
                                </ConfigProvider>
                            </div></Radio>
                            <Radio value="Монопаллета">Монопаллета</Radio>

                        </div>
                    </Radio.Group>

                </Form.Item>
            </ConfigProvider>


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
                                    title='Внимание! Если склад недоступен для выбора, то на данный склад нельзя поставлять товар с выбранным типом упаковки'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                    name='warehouse'
                    className={isPaidCargoAcceptance ? styles.formItem : `${styles.formItem} ${styles.formItem_wide}`}
                >
                    <Input
                        size='large'
                        placeholder='Выберите склад'
                    />
                </Form.Item>
                {isPaidCargoAcceptance && <Form.Item
                    label='Стоимость платной приемки, ₽'
                    className={styles.formItem}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                            { pattern: /^\d+(\.\d+)?$/, message: 'Введите только числа!' },
                        ]
                    }
                    name='cargo_acceptance_price'
                >
                    <Input
                        size='large'
                        placeholder='Укажите стоимость'
                    />
                </Form.Item>}

                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#00000033',
                            colorPrimary: '#5329FF'
                        }

                    }}
                >
                    <Form.Item
                        className={styles.formItem}
                        name='is_paid_cargo_acceptance'
                        valuePropName="checked"
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
                                    title='Поставка может быть недоступна на выбранный склад, в данный момент.  Условия по доступности и по стоимости приемки изменяются 1 раз в 2 недели.  Есть возможность изменить стоимость платной приемки.'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                        </Checkbox>

                    </Form.Item>
                </ConfigProvider>
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
                                    title='Базовая комиссия FBS применяется, если вы доставите груз ровно через 30 часов. Отклонение от этого срока в большую или меньшую сторону влияет на комиссию: 0,1% бонуса/штрафа за каждый час.'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                            { pattern: /^\d+$/, message: 'Пожалуйста, введите только целые числа!' },
                        ]
                    }
                    name='delivery_speed'
                    className={styles.formItem}
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
                                    title='У разных категорий товаров процент выкупа отличается. Товары с размерностью имеют меньший показатель, чем товары повседневного спроса.  

                                Пример категорий и средних значений для них: 
                                Продукты – 94-97%
                                Косметика – 90-95%
                                Товары для дома – 85-95% 
                                Товары для детей (не одежда) – 85-95%
                                Спорт-товары – 85-95%
                                Электроника – 85-95%
                                Зоотовары – 85-90%
                                Аксессуары – 65-85%
                                Одежда и обувь – 30-40%'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
                    name='buyout_percentage'
                    className={styles.formItem}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                            { pattern: /^\d+(\.\d+)?$/, message: 'Пожалуйста, введите только числа!' },
                            { pattern: /^(100|[1-9]?\d)(\.\d+)?$/, message: 'Пожалуйста, введите число от 0 до 100!' },
                        ]
                    }
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
                className={styles.formItem}
                name='storage_price'
            >

                <Radio.Group
                    style={{ width: '100%' }}
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
                            <Radio value="daily">
                                <lablel className={styles.radioLabel}>
                                    <p className={styles.fieldset__footerText_price}>0 ₽</p>
                                    <p className={styles.fieldset__footerText}>Хранение 1 шт. в месяц</p>
                                </lablel>
                            </Radio>
                            <Radio value="monthly">
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
    )
}

export default LogisticsDataFormBlock;