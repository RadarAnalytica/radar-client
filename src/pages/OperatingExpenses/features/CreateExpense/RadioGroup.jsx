import { ConfigProvider, Form, Radio } from 'antd';
import styles from './expenseMainModal.module.css';


export const RadioGroup = ({ 
    label,
    options,
    name,
}) => {
    return (
        <>
            {label && <h3 className={styles.modal__subtitle}>{label}</h3>}
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 14
                    }
                }}>
                <Form.Item
                    className={styles.modal__part}
                    name={name}
                >
                    <Radio.Group className={styles.customRadioGroup}>
                        {options.map((option) => (
                            <Radio key={option.value} value={option.value}>{option.label}</Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </ConfigProvider>
        </>
    )
}