import React, { useState } from 'react'
import styles from './taxTableBlock.module.css'
import { formatPrice } from '../../../../service/utils'
import { Select, Input, ConfigProvider } from 'antd'

const taxOption = ['УСН Д-Р', 'УСН-доходы', 'Не считать налог', 'Считать от РС']

const TaxTableBlock = ({ dataDashBoard, loading }) => {

    const [taxType, setTaxType] = useState(taxOption[0])
    const [taxRate, setTaxRate] = useState(6)

    const data = dataDashBoard?.taxInfo[0] || {}

    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.block}>
            <p className={styles.block__title}>Налог</p>
            <div className={styles.block__chart}>
                <div className={styles.block__controlsWrapper}>
                    <div className={styles.block__inputWrapper}>
                        <label className={styles.block__inputLabel}>
                            Тип налогообложения:
                        </label>
                        <ConfigProvider
                            theme={{
                                token: {
                                    //colorBgBase: '#EAEAF1',
                                    borderRadius: 8,
                                    fontFamily: 'Mulish',
                                    fontSize: 16
                                },
                                components: {
                                    Select: {
                                        activeBorderColor: 'transparent',
                                        activeOutlineColor: 'transparent',
                                        hoverBorderColor: '#d9d9d9',
                                        optionActiveBg: 'transparent',
                                        optionFontSize: 16,
                                        optionSelectedBg: 'transparent',
                                        optionSelectedColor: '#5329FF',
                                    }
                                }
                            }}
                        >
                            <Select
                                value={taxType}
                                onSelect={(value) => setTaxType(value)}
                                options={taxOption.map(_ => ({ value: _, label: _ }))}
                            />
                        </ConfigProvider>
                    </div>
                    <div className={styles.block__inputWrapper}>
                        <label className={styles.block__inputLabel}>
                            Ставка налога:
                        </label>
                        <Input.Search
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.block__content}>
                    <div className={styles.block__row}>
                        <p className={styles.block__rowTitle}>WB реализовал</p>
                        <p className={styles.block__rowData}>{formatPrice(data.wbRealization, '₽')}</p>
                    </div>
                    <div className={styles.block__row}>
                        <p className={styles.block__rowTitle}>Налоговая база</p>
                        <p className={styles.block__rowData}>{formatPrice(data.taxBase, '₽')}</p>
                    </div>
                    <div className={styles.block__row}>
                        <p className={styles.block__rowTitle}>Налог</p>
                        <p className={styles.block__rowData}>{formatPrice(data.taxAmount, '₽')}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaxTableBlock;