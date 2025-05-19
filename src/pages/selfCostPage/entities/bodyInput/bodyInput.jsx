import React, { useState, useEffect } from "react"
import { Input } from "antd"
import styles from './bodyInput.module.css'

const BodyInput = ({ item, setProduct, type, product, prevValue }) => {
    const [inputValue, setInputValue] = useState(item[type])

    useEffect(() => {
        const newProduct = product;
        const index = newProduct.self_cost_change_history.findIndex(_ => _.date === item.date)
        if (index !== -1) {
            newProduct.self_cost_change_history[index][type] = inputValue
            setProduct({...newProduct})
        }
    }, [inputValue])

    return (
        <div className={styles.input__wrapper}>
            <Input
                style={{ height: '44px'}}
                value={inputValue}
                onChange={(e) => setInputValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev } })}
                size='large'
                placeholder={prevValue ? prevValue[type] : 'Не установлено'}
            />
        </div>
    )
}

export default BodyInput;