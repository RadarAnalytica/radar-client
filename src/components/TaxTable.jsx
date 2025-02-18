import React, { useState, useEffect } from 'react';
import styles from "../components/TaxTable.module.css";
import { formatPrice } from '../service/utils';

function TaxTable({ taxInfo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [taxRate, setTaxRate] = useState(taxInfo?.taxRate || 0); // Инициализируем с переданным значением или 0

    useEffect(() => {
        // Обновляем taxRate, если taxInfo изменяется
        setTaxRate(taxInfo?.taxRate || 0);
    }, [taxInfo]);

    const handleTaxSubmit = async ({ taxType, submit } = {}) => {
        const currentTaxType = taxType || taxInfo?.taxType;
        const currentTaxRate = taxType === "Не считать налог" ? 0 : taxRate;

        try {
            if (taxType) {
                // Обновляем значение налога на основе выбранного типа
                setTaxRate(currentTaxRate);

                if (taxType === "Не считать налог") {
                    setTaxRate(0);
                    setIsEditing(false);
                }
            }

            if (submit) {
                // Сценарий: подтверждение изменения ставки налога
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Ошибка при обновлении налоговой ставки:", error);
        }
    };

    return (
        <div className={`taxChartWrapper ${styles.salesChartWrapper}`}>
            <div className={styles.title}>Налог</div>
            <div className={styles.salesChartRow}>
                <div className={styles.titleInRow}>Тип налогообложения</div>
                <div className={styles.numbersBox}>
                    <select
                        className={styles.customSelect}
                        value={taxInfo?.taxType} // Предполагается, что налоговый тип из данных
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
                                disabled={taxInfo?.taxType === 'Не считать налог'}
                            />
                            <button
                                onClick={() => handleTaxSubmit({ submit: true })}
                                disabled={taxInfo?.taxType === 'Не считать налог'}
                            >
                                ✓
                            </button>
                            <button onClick={() => setIsEditing(false)}>✕</button>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                if (taxInfo?.taxType !== 'Не считать налог') {
                                    setTaxRate(taxInfo?.taxRate || 0);
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
                    {formatPrice(taxInfo?.wbRealization) || '0'} ₽
                </div>
            </div>

            <div className={styles.salesChartRow}>
                <div className={styles.titleInRow}>Налоговая база</div>
                <div className={styles.mumbersInRow}>
                    {formatPrice(taxInfo?.taxBase) || '0'} ₽
                </div>
            </div>

            <div className={styles.salesChartRow}>
                <div className={styles.titleInRow}>Налог</div>
                <div className={styles.mumbersInRow}>
                    {formatPrice(taxInfo?.taxAmount) || '0'} ₽
                </div>
            </div>
        </div>
    );
}

export default TaxTable;
