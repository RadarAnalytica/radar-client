import React, { useState, useEffect } from 'react';
import styles from "./TaxTable.module.css";
import { formatPrice } from '../../../service/utils';
import { ServiceFunctions } from '../../../service/serviceFunctions';
function TaxTable({ taxInfo, authToken, updateDataDashBoard, activeBrand, selectedRange, loading }) {
    const taxData = taxInfo?.[0] || {}; // Получаем первый объект массива, если он есть
    const [isEditing, setIsEditing] = useState(false);
    const [taxRate, setTaxRate] = useState(taxData.taxRate || 0);
    const [selectedTaxType, setSelectedTaxType] = useState(taxData.taxType || '');

    useEffect(() => {
        setTaxRate(taxData.taxRate || 0);
        setSelectedTaxType(taxData.taxType || '');
    }, [taxInfo]);

    const handleTaxSubmit = async ({ taxType, submit } = {}) => {
        const currentTaxType = taxType || selectedTaxType;
        const currentTaxRate = taxType === 'Не считать налог' ? 0 : parseFloat(taxRate) || 0;

        try {
            await ServiceFunctions.postTaxRateUpdateDashboard(authToken, currentTaxRate, currentTaxType);

            if (taxType) {
                setSelectedTaxType(taxType);
                setTaxRate(currentTaxRate);
            }

            if (submit) {
                setIsEditing(false);
            }

            // Обновляем данные дашборда
            await updateDataDashBoard(selectedRange, activeBrand.id, authToken);

        } catch (error) {
            console.error('Ошибка при обновлении налоговой ставки:', error);
        }
    };

    return (
        <div className={`finance-table ${styles.salesChartWrapper}`}>
            <p className='fw-bold numbers mb-2'>Налог</p>
            <div style={{position: 'relative'}}>
                {loading &&
                    <div
                        className="d-flex flex-column align-items-center justify-content-center"
                        style={{ position: 'absolute', zIndex: 1, height: '100%', width: "100%", backgroundColor: '#fff' }}
                    >
                        <span className="loader"></span>
                    </div>
                }
                <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Тип налогообложения</div>
                    <div className={styles.numbersBox}>
                        <select
                            className={styles.customSelect}
                            value={selectedTaxType}
                            onChange={(e) => handleTaxSubmit({ taxType: e.target.value })}
                        >
                            <option value='УСН-доходы'>УСН-доходы</option>
                            <option value='УСН Д-Р'>УСН Д-Р</option>
                            <option value='Не считать налог'>Не считать налог</option>
                            <option value='Считать от РС'>Считать от РС</option>
                        </select>
                    </div>
                </div>

                <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Ставка налога</div>
                    <div className={styles.mumbersInRow}>
                        {isEditing ? (
                            <div className={styles.editTaxRate}>
                                <input
                                    type='number'
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    className={styles.taxRateWrapper}
                                    disabled={selectedTaxType === 'Не считать налог'}
                                />
                                <button
                                    onClick={() => handleTaxSubmit({ submit: true })}
                                    disabled={selectedTaxType === 'Не считать налог'}
                                >
                                    ✓
                                </button>
                                <button onClick={() => setIsEditing(false)}>✕</button>
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    if (selectedTaxType !== 'Не считать налог') {
                                        setIsEditing(true);
                                    }
                                }}
                                className={styles.taxRateWrapper}
                            >
                                {taxRate} %
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>WB реализовал</div>
                    <div className={styles.mumbersInRow}>
                        {formatPrice(taxData.wbRealization) || '0'} ₽
                    </div>
                </div>

                <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Налоговая база</div>
                    <div className={styles.mumbersInRow}>
                        {formatPrice(taxData.taxBase) || '0'} ₽
                    </div>
                </div>

                <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Налог</div>
                    <div className={styles.mumbersInRow}>
                        {formatPrice(taxData.taxAmount) || '0'} ₽
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaxTable;
