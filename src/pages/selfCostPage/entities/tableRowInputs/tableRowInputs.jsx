import React, { useState } from 'react'
import styles from './tableRowInputs.module.css'
import { Input, ConfigProvider } from 'antd'

const TableRowInputs = ({ selfCost, fullfilment }) => {

    const [selfCostValue, setSelfCostValue] = useState(selfCost)
    const [fullfilmentValue, setFullfilmentValue] = useState(fullfilment)

    return (
        <>
            <div className={`${styles.table__rowItem} ${styles.table__rowItem_first}`}>
                <Input
                    value={selfCostValue}
                    onChange={(e) => setSelfCostValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev }})}
                />
            </div>
            <div className={styles.table__rowItem}>
                <Input
                    style={{ width: '160px'}}
                    value={fullfilmentValue}
                    onChange={(e) => setFullfilmentValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev }})}
                />

                <button 
                    className={styles.table__saveButton}
                    disabled={selfCost == selfCostValue && fullfilment == fullfilmentValue}
                >
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.25C5.58579 4.25 5.25 4.58579 5.25 5C5.25 5.41421 5.58579 5.75 6 5.75H12C12.4142 5.75 12.75 5.41421 12.75 5C12.75 4.58579 12.4142 4.25 12 4.25H6Z" fill="#5329FF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.25 5C0.25 2.37665 2.37665 0.25 5 0.25H10.6659C11.9995 0.25 13.2716 0.810613 14.1715 1.79485L16.5056 4.3478C17.3061 5.22332 17.75 6.36667 17.75 7.55295V15C17.75 17.6234 15.6234 19.75 13 19.75H5C2.37665 19.75 0.25 17.6234 0.25 15V5ZM16.25 15C16.25 16.5368 15.1833 17.8245 13.75 18.163V16C13.75 14.4812 12.5188 13.25 11 13.25H7C5.48122 13.25 4.25 14.4812 4.25 16V18.163C2.81665 17.8245 1.75 16.5368 1.75 15V5C1.75 3.20507 3.20507 1.75 5 1.75H10.6659C11.5783 1.75 12.4488 2.13358 13.0645 2.807L15.3986 5.35995C15.9463 5.95899 16.25 6.74128 16.25 7.55295V15ZM5.75 16V18.25H12.25V16C12.25 15.3096 11.6904 14.75 11 14.75H7C6.30964 14.75 5.75 15.3096 5.75 16Z" fill="#5329FF" />
                    </svg>
                    Сохранить
                </button>
            </div>

        </>
    )
}

export default TableRowInputs;