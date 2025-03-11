import { Form, Input, Checkbox, ConfigProvider, Tooltip } from 'antd';
import styles from './BasicDataFormBlock.module.css'
const BasicDataFormBlock = ({ isHeavy, isSPP, product_price, SPP, package_height, package_width, package_length }) => {

    const package_width_int = parseInt(package_width)
    const package_length_int = parseInt(package_length)
    const package_height_int = parseInt(package_height)

    const sidesSum = package_width_int + package_length_int + package_height_int
    const volume = (((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000).toFixed(2)

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Базовые данные</h2>
                <p className={styles.fieldset__subtitle}>Укажите значения для расчета одной единицы товара (SKU)</p>
            </div>

            <Form.Item
                name='product'
                label='Товар'
                className={styles.formItem}

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
                    className={isSPP ? styles.formItem : `${styles.formItem} ${styles.formItem_wide}`}
                    normalize={(value, prevValue) => {
                        if (value.match(/^\d+(\.\d+)?$/)) return value;
                        return prevValue;
                    }}
                    rules={
                        [
                            { required: true, message: ''},
                            { pattern: /^\d+(\.\d+)?$/, message: ''},
                        ]
                    }
                >
                    <Input
                        size='large'
                        placeholder='Укажите цену товара'
                    />
                </Form.Item>
                {isSPP && <Form.Item
                    label='СПП'
                    className={styles.formItem}
                    name='SPP'
                    rules={
                        [
                            { required: true, message: '' },
                            { pattern: /^\d+(\.\d+)?$/, message: '' },
                            { pattern: /^(100|[1-9]?\d)(\.\d+)?$/, message: '' },
                        ]
                    }
                >
                    <Input
                        size='large'
                        placeholder='Укажите СПП, %'
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
                        name='isSPP'
                        valuePropName="checked"
                    >
                        <Checkbox>Указывать СПП</Checkbox>
                    </Form.Item>
                </ConfigProvider>
                {isSPP && product_price && SPP &&
                    <div className={styles.fieldset__footer} style={{ justifyContent: 'space-between' }}>
                        <p className={styles.fieldset__footerText}>цена с СПП</p>
                        <p className={styles.fieldset__footerText_price}>
                            {product_price * ((100 - SPP) / 100)} ₽
                        </p>
                    </div>
                }
            </div>

            <Form.Item
                name='product_cost'
                label='Закупочная цена'
                className={styles.formItem}
                rules={
                    [
                        { required: true, message: '' },
                        { pattern: /^\d+(\.\d+)?$/, message: '' },
                    ]
                }
            >
                <Input
                    size='large'
                    placeholder='Укажите цену товара'
                />
            </Form.Item>

            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_3cols}`}>
                <Form.Item
                    label='Длина упаковки'
                    name='package_length'
                    className={styles.formItem}
                    rules={
                        [
                            { required: true, message: '' },
                            { pattern: /^\d+$/, message: '' },
                        ]
                    }
                >
                    <Input
                        size='large'
                        placeholder='Укажите длину упаковки'
                    />
                </Form.Item>
                <Form.Item
                    label='Ширина упаковки'
                    name='package_width'
                    className={styles.formItem}
                    rules={
                        [
                            { required: true, message: '' },
                            { pattern: /^\d+$/, message: '' },
                        ]
                    }
                >
                    <Input
                        size='large'
                        placeholder='Укажите ширину упаковки'
                    />
                </Form.Item>
                <Form.Item
                    label='Высота упаковки'
                    className={styles.formItem}
                    name='package_height'
                    rules={
                        [
                            { required: true, message: '' },
                            { pattern: /^\d+$/, message: '' },
                        ]
                    }
                >
                    <Input
                        size='large'
                        placeholder='Укажите высоту упаковки'
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
                        className={styles.formItem}
                        name='isHeavy'
                        valuePropName="checked"
                    >

                        <Checkbox
                        >Тяжелее 25 кг</Checkbox>
                    </Form.Item>
                </ConfigProvider>

                <div className={styles.fieldset__footer_span}>
                    {Number.isNaN(sidesSum) ? '' : <p className={styles.fieldset__footerText}>Сумма трех сторон: {sidesSum} см</p>}
                    {volume === 'NaN' ? '' : <p className={styles.fieldset__footerText}>Расчетный объем: {volume} л</p>}
                    {isHeavy && <ConfigProvider
                        theme={{
                            token: {
                                colorTextLightSolid: '#000'
                            }
                        }}
                    >
                        <Tooltip
                            arrow={false}
                            title={
                                <div>
                                    <p>Сверхгабаритный товар:</p>
                                    <ul style={{ margin: 0, padding: '0 0 0 10px' }}>
                                        <li>По одной стороне упаковки от 120 до 400 см</li>
                                        <li>Сумма трех сторон упаковки от 200 до 1200 см</li>
                                        <li>От 25 до 100 кг — вес одной коробки</li>
                                        <li>От 25 до 200 кг — общий вес нескольких коробок в стяжке</li>
                                    </ul>
                                </div>
                            }
                            style={{ cursor: 'pointer' }}
                            color={'white'}
                        >
                            <div className={`${styles.tooltip} ${styles.tooltip_red}`}>!</div>
                        </Tooltip>
                    </ConfigProvider>}
                </div>
            </div>
        </fieldset>
    )
}

export default BasicDataFormBlock;