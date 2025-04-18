import React, { useState, useEffect, useContext } from 'react'
import styles from './taxTableBlock.module.css'
import { formatPrice } from '../../../../service/utils'
import { Select, Input, ConfigProvider, Button } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import AuthContext from '../../../../service/AuthContext'
import { useAppSelector } from '../../../../redux/hooks'
import { ServiceFunctions } from '../../../../service/serviceFunctions'

const taxOption = ['УСН Д-Р', 'УСН-доходы', 'Не считать налог', 'Считать от РС']

const TaxTableBlock = ({ dataDashBoard, loading, updateDashboard }) => {
    const data = dataDashBoard?.taxInfo[0] || {}
    const { authToken } = useContext(AuthContext)
    const [taxType, setTaxType] = useState(taxOption[0])
    const [taxRate, setTaxRate] = useState(data.taxRate || 6)
    const [isButtonVisible, setIsButtonVisible ] = useState(false)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    


    const handleTaxSubmit = async ( type, submit ) => {
        const currentTaxType = type || taxType;
        const currentTaxRate = taxType === 'Не считать налог' ? 0 : parseFloat(taxRate) || 0;

        try {
            await ServiceFunctions.postTaxRateUpdateDashboard(authToken, currentTaxRate, currentTaxType);
            // Обновляем данные дашборда
            await updateDashboard(selectedRange, activeBrand.id, authToken);
            if (submit) {
                setIsButtonVisible(false)
            }
        } catch (error) {
            console.error('Ошибка при обновлении налоговой ставки:', error);
        }
    };


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
                                    fontSize: 14
                                },
                                components: {
                                    Select: {
                                        activeBorderColor: '#d9d9d9',
                                        activeOutlineColor: 'transparent',
                                        hoverBorderColor: '#d9d9d9',
                                        optionActiveBg: 'transparent',
                                        optionFontSize: 14,
                                        optionSelectedBg: 'transparent',
                                        optionSelectedColor: '#5329FF',
                                    }
                                }
                            }}
                        >
                            <Select
                                value={taxType}
                                onSelect={(value) => {
                                    handleTaxSubmit(value)
                                    setTaxType(value)
                                }}
                                options={taxOption.map(_ => ({ value: _, label: _ }))}
                            />
                        </ConfigProvider>
                    </div>
                    <div className={styles.block__inputWrapper}>
                        <label className={styles.block__inputLabel}>
                            Ставка налога:
                        </label>
                        <div className={styles.block__specWrapper}>
                            <Input
                                value={taxRate}
                                placeholder={`${taxRate} %`}
                                onChange={(e) => {
                                    setTaxRate((prevValue) => e.target.value.replace(/[^0-9.-]+|\.(?=\D)/g, ''))
                                }}
                                onFocus={() => { setIsButtonVisible(true) }}
                            />
                            {isButtonVisible &&
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF'
                                        }
                                    }}
                                >
                                    <Button
                                        type='primary'
                                        size='medium'
                                        onClick={() => handleTaxSubmit(undefined, true)}
                                    >
                                        <RedoOutlined />
                                    </Button>
                                </ConfigProvider>
                            }
                        </div>
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