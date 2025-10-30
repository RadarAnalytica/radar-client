import styles from './barsGroup.module.css';
import SmallBar from '../bars/smallBar';
import { useAppSelector } from '../../../redux/hooks';

const SecondBarsGroup = ({ dataDashBoard, loading }) => {
    const { isSidebarHidden } = useAppSelector(store => store.utils);
    return (
        // <div className={isSidebarHidden ? styles.group : styles.group_openSidebar}>
        <div className={styles.group}>
            <SmallBar
                title='Расходы на логистику'
                hasTooltip
                tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                loading={loading}
                mainData={dataDashBoard?.logistics}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.logisticsCompare}
            />
            <SmallBar
                title='Хранение'
                hasTooltip
                tooltipText='Расходы на хранение товаров на складах WB'
                loading={loading}
                mainData={dataDashBoard?.storageData}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.storageDataCompare}
            />
            <SmallBar
                title='Платная приемка'
                loading={loading}
                mainData={dataDashBoard?.paid_acceptance}
            />
            <SmallBar
                title='Комиссия'
                hasTooltip
                tooltipText='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries'
                loading={loading}
                mainData={dataDashBoard?.commissionWB}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.commissionWBCompare}
            />
            <SmallBar
                title='Налог'
                loading={loading}
                mainData={dataDashBoard?.tax_amount}
            />
            <SmallBar
                title='Реклама (ДРР)'
                loading={loading}
                mainData={dataDashBoard?.advertAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.advertPercent}
            />
            <SmallBar
                title='Штрафы WB'
                hasTooltip={!dataDashBoard?.penalty}
                tooltipText='В выбранном периоде штрафов и расходов на платную приемку нет'
                loading={loading}
                mainData={dataDashBoard?.penalty}
            />
            <SmallBar
                title='Компенсации'
                loading={loading}
                mainData={dataDashBoard?.compensation}
            />


            <SmallBar
                title='Средняя стоимость логистики на 1 шт'
                loading={loading}
                mainData={dataDashBoard?.logistic_per_one}
                hasTooltip
                tooltipText='Логистика на единицу проданного товара'
            />
            {/* Средняя прибыль на 1 шт */}
            <SmallBar
                title='Средняя прибыль на 1 шт'
                loading={loading}
                mainData={dataDashBoard?.profit_per_one}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.profit_per_one_compare}
                hasTooltip
                tooltipText='Прибыль на единицу проданного товара'
            />
            <SmallBar
                title='Упущенные продажи'
                hasTooltip
                tooltipText='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе'
                loading={loading}
                mainData={dataDashBoard?.lostSalesAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='шт'
                secondaryData={dataDashBoard?.lostSalesCount}
            />
            <SmallBar
                title='Себестоимость проданных товаров'
                loading={loading}
                mainData={dataDashBoard?.costPriceAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='шт'
                secondaryData={dataDashBoard?.saleCount}
            />
        </div>
    );
};

export default SecondBarsGroup;
