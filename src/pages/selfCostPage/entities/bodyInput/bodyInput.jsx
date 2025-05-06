import React, { useState, useEffect } from "react"
import { Input } from "antd"
import styles from './bodyInput.module.css'

const BodyInput = ({ item, setProduct, type, product }) => {
    const [inputValue, setInputValue] = useState(item[type])

    useEffect(() => {
        const newProduct = product;
        const index = newProduct.history.findIndex(_ => _.date === item.date)
        if (index !== -1) {
            newProduct.history[index][type] = inputValue
            setProduct({...newProduct})
        }
    }, [inputValue])

    return (
        <div className={styles.input__wrapper}>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev } })}
                size='large'
            />
        </div>
    )
}

export default BodyInput;