import styles from './barsGroup.module.css'
import SmallBar from '../bars/smallBar';
import { useAppSelector } from '../../../redux/hooks';

const SecondBarsGroup = ({ dataDashBoard, loading }) => {
    const { isSidebarHidden } = useAppSelector(store => store.utils)
    return (
        <div className={isSidebarHidden ? styles.group : styles.group_openSidebar}>
            <SmallBar
                title='Себестоимость проданных товаров'
                loading={loading}
                mainData={dataDashBoard?.costPriceAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='шт'
                secondaryData={dataDashBoard?.saleCount}
            />
            <SmallBar
                title='Возвраты'
                loading={loading}
                mainData={dataDashBoard?.returnAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='шт'
                secondaryData={dataDashBoard?.returnCount}
            />
            <SmallBar
                title='Штрафы WB'
                hasTooltip={!!!dataDashBoard?.penalty}
                tooltipText='В выбранном периоде штрафов и расходов на платную приемку нет'
                loading={loading}
                mainData={dataDashBoard?.penalty}
            />
            <SmallBar
                title='Доплаты WB'
                loading={loading}
                mainData={dataDashBoard?.additional}
            />
            <SmallBar
                title='Комиссия WB'
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
        </div>
    )
}

export default SecondBarsGroup;