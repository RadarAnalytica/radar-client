import styles from './LogisticsDataFormBlock.module.css'
import { Form, Input, Checkbox, Radio, ConfigProvider, Tooltip } from 'antd';
const LogisticsDataFormBlock = ({ form }) => {

    const warehouse = Form.useWatch('warehouse', form);
    const cargo_acceptance_price = Form.useWatch('cargo_acceptance_price', form);
    const isHeavy = Form.useWatch('isHeavy', form);
    const isPaidCargoAcceptance = Form.useWatch('is_paid_cargo_acceptance', form);
    const buyout_percentage = Form.useWatch('buyout_percentage', form);
    const delivery_speed = Form.useWatch('delivery_speed', form);


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
                            { required: true, message: '' },
                        ]
                    }
                    name='warehouse'
                    className={isPaidCargoAcceptance ? styles.formItem : `${styles.formItem} ${styles.formItem_wide}`}
                >
                    <Input
                        size='large'
                        placeholder='Выберите склад'
                        style={{background: warehouse ? '#F2F2F2' : ''}}
                    />
                </Form.Item>
                {isPaidCargoAcceptance && <Form.Item
                    label='Стоимость платной приемки, ₽'
                    className={styles.formItem}
                    normalize={(value, prevValue) => {
                        const regex = /^(|-?\d*\.?\d*)$/; // только целые и дробные числа
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: '' },
                        ]
                    }
                    name='cargo_acceptance_price'
                >
                    <Input
                        size='large'
                        placeholder='Укажите стоимость'
                        style={{background: cargo_acceptance_price ? '#F2F2F2' : ''}}
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
                    normalize={(value, prevValue) => {
                        const regex = /^(|\d+)$/ // только целые числа
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    name='delivery_speed'
                    className={styles.formItem}
                >
                    <Input
                        style={{background: delivery_speed ? '#F2F2F2' : ''}}
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
                    normalize={(value, prevValue) => {
                        const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/ // только целые и дробные от 0 до 100
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    name='buyout_percentage'
                    className={styles.formItem}
                >
                    <Input
                        style={{background: buyout_percentage ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите процент выкупа'
                    />
                </Form.Item>

                <div className={styles.fieldset__footer}>
                    <p className={styles.fieldset__footerText_price}>0 ₽</p>
                </div>
            </div>

            <div className={styles.fieldset__logWrapper}>
                <p className={styles.fieldset__footerText_price}>0 ₽</p>
                <p className={styles.fieldset__footerText}>Хранение 1 шт. в месяц</p>
            </div>
            {/* <Form.Item
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

            </Form.Item> */}
        </fieldset>
    )
}

export default LogisticsDataFormBlock;