import React from 'react'
import { useState } from 'react';
import styles from "../components/TaxTable.module.css"
import { formatPrice } from '../service/utils';

function TaxTable() {
    // const isLoading = useSelector((state) => state?.dashboardReportSlice?.loading);
    const isLoading = false
    const [isEditing, setIsEditing] = useState(false);
    // const [taxRate, setTaxRate] = useState(dashboardData?.tax_rate);
    const handleTaxSubmit = async ({ taxType, submit } = {}) => {
        const currentTaxType = taxType || selectedValue;
        const currentTaxRate =
            taxType === "Не считать налог" ? 0 : taxRate;

        try {
            if (taxType) {
                // Сценарий: выбор нового типа в <select>
                setSelectedValue(taxType);

                await ServiceFunctions.postTaxRateUpdate(authToken, {
                    tax_rate: Number(currentTaxRate),
                    tax_type: taxType,
                });

                filterSectionRef.current?.handleApplyFilters();

                if (taxType === "Не считать налог") {
                    setTaxRate(0);
                    setIsEditing(false);
                }
            }

            if (submit) {
                // Сценарий: подтверждение изменения ставки налога
                await ServiceFunctions.postTaxRateUpdate(authToken, {
                    tax_rate: Number(currentTaxRate),
                    tax_type: currentTaxType,
                });

                // filterSectionRef.current?.handleApplyFilters();
                handleApplyFilters()
                setIsEditing(false);
            }
            // filterSectionRef.current?.handleApplyFilters();

            // setIsEditing(false);
        } catch (error) {
            console.error("Ошибка при обновлении налоговой ставки:", error);
        }
    };
    return (
        <div
            className={`taxChartWrapper ${styles.salesChartWrapper}`}
        >
            <div className={styles.title}>Налог</div>
            {!isLoading ? (
                <>
                    <div className={styles.salesChartRow}>
                        <div className={styles.titleInRow}>
                            Тип налогообложения
                        </div>
                        <div className={styles.numbersBox}>
                            <select
                                className={styles.customSelect}
                            // value={selectedValue}
                            // onChange={(e) =>
                            //     handleTaxSubmit({ taxType: e.target.value })
                            // }
                            >
                                <option value='УСН-доходы'>УСН-доходы</option>
                                <option value='УСН Д-Р'>УСН Д-Р</option>
                                <option value='Не считать налог'>
                                    Не считать налог
                                </option>
                                <option value='Считать от РС'>
                                    Считать от РС
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.salesChartRow}>
                        <div className={styles.titleInRow}>Ставка налога</div>
                        <div className={styles.mumbersInRow}>
                            {/* {isEditing ? (
                                <div className={styles.editTaxRate}>
                                    <input
                                        type='number'
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(e.target.value)}
                                        className={styles.taxRateInput}
                                        disabled={
                                            selectedValue === 'Не считать налог'
                                        }
                                    />
                                    <button
                                        onClick={() =>
                                            handleTaxSubmit({ submit: true })
                                        }
                                        disabled={
                                            selectedValue === 'Не считать налог'
                                        }
                                    >
                                        ✓
                                    </button>
                                    <button onClick={() => setIsEditing(false)}>
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        if (selectedValue !== 'Не считать налог') {
                                            setTaxRate(dashboardData?.tax_rate || 0); // Устанавливаем начальное значение
                                            setIsEditing(true);
                                        }
                                    }}
                                    className={styles.taxRateWrapper}
                                >
                                    {dashboardData?.tax_rate || 0} %
                                </div>
                            )} */}
                        </div>
                    </div>
                    <div className={styles.salesChartRow}>
                        <div className={styles.titleInRow}>WB реализовал</div>
                        <div className={styles.mumbersInRow}>
                            {/* {formatPrice(dashboardData?.total_sold_by_wb) ||
                                '0'}{' '}
                            ₽ */}
                            {'0'}₽
                        </div>
                    </div>
                    <div className={styles.salesChartRow}>
                        <div className={styles.titleInRow}>
                            Налоговая база
                        </div>
                        <div className={styles.mumbersInRow}>
                            {/* {formatPrice(dashboardData?.total_tax_base) || '0'}{' '}₽ */}
                            {'0'}₽
                        </div>
                    </div>
                    <div className={styles.salesChartRow}>
                        <div className={styles.titleInRow}>Налог</div>
                        <div className={styles.mumbersInRow}>
                            {/* {formatPrice(dashboardData?.total_tax) || '0'} ₽ */}
                            {'0'}₽
                        </div>
                    </div>
                </>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span className='loader'></span>
                </div>
            )}
        </div>
    )
}

export default TaxTable