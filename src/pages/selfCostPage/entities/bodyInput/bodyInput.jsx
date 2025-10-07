import React from "react";
import { Input } from "antd";
import styles from './bodyInput.module.css';

const BodyInput = ({ item, setProduct, type, product, prevValue }) => {

    return (
        <div className={styles.input__wrapper}>
            <Input
                style={{ height: '44px' }}
                value={item[type]}
                onChange={(e) => {
                    let value = e.target.value ? parseInt(e.target.value) : e.target.value;
                    console.log('value', value);
                    const newProduct = product;

                    const index = newProduct.self_cost_change_history.findIndex(_ => _.date === item.date);
                    console.log('v', newProduct.self_cost_change_history[index][type]);
                    if (index !== -1) {
                        newProduct.self_cost_change_history[index][type] = (/^(?:|\d+)$/.test(e.target.value) || value === '') ? value : newProduct.self_cost_change_history[index][type];
                        setProduct({ ...newProduct });
                    }
                }}
                size='large'
                placeholder={prevValue ? prevValue[type] : 'Не установлено'}
            />
        </div>
    );
};

export default BodyInput;
