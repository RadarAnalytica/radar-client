import styles from './secondBarsGroup.module.css';
import SmallBar from '../bars/smallBar';
import { useAppSelector } from '../../../redux/hooks';
import { RadarBar } from '../../../shared/ui/RadarBar/RadarBar';
import TurnoverBlock from '../blocks/turnoverBlock/turnoverBlock';

const SecondBarsGroup = ({ dataDashBoard, loading, selectedRange, activeBrand, authToken, filters }) => {
    return (
        <div className={styles.group}>
            {/* 
            заказы
            возвраты
            Расходы на логистику
            Хранение
            Платная приемка
            Комиссия
            Налог
            Реклама (ДРР)
            Штрафы WB и прочие удержания
            Компенсации
            Средняя стоимость логистики на 1 шт
            Средняя прибыль на 1 шт


            Упущенные продажи
            Себестоимость проданных товаров
            Оборачиваемость товара
            */}
            {/* <SmallBar
                title='Расходы на логистику'
                hasTooltip
                tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                loading={loading}
                mainData={dataDashBoard?.logistics}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.logisticsCompare}
            /> */}
            <RadarBar
                title='Заказы'
                midValue={dataDashBoard?.orderCount}
                midValueUnits='шт'
                mainValue={dataDashBoard?.orderAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.orderAmountCompare,
                    absoluteValue: dataDashBoard?.prev_order_amount,
                    absoluteValueUnits: '₽'
                }}
                isLoading={loading}
            />
            {/* <Bar
                title='Возвраты'
                amount={dataDashBoard?.returnAmount}
                amountPerDay={dataDashBoard?.returnAmount / daysRange}
                amountInPercent={dataDashBoard?.returnAmountCompare}
                quantity={dataDashBoard?.returnCount}
                quantityPerDay={dataDashBoard?.returnCount / daysRange}
                quantityInPercent={dataDashBoard?.returnCountCompare}
                loading={loading}
            /> */}
            <RadarBar
                title='Возвраты'
                midValue={dataDashBoard?.returnCount}
                midValueUnits='шт'
                mainValue={dataDashBoard?.returnAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.returnAmountCompare,
                    absoluteValue: dataDashBoard?.prev_return_amount,
                    absoluteValueUnits: '₽'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Расходы на логистику'
                tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                mainValue={dataDashBoard?.logistics}
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.logisticsCompare
                }}
                isLoading={loading}
            />

            {/* <SmallBar
                title='Хранение'
                hasTooltip
                tooltipText='Расходы на хранение товаров на складах WB'
                loading={loading}
                mainData={dataDashBoard?.storageData}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.storageDataCompare}
            /> */}
            <RadarBar
                title='Хранение'
                tooltipText='Расходы на хранение товаров на складах WB'
                mainValue={dataDashBoard?.storageData}
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.storageDataCompare
                }}
                isLoading={loading}
            />

            {/* <SmallBar
                title='Платная приемка'
                loading={loading}
                mainData={dataDashBoard?.paid_acceptance}
            /> */}
            <RadarBar
                title='Платная приемка'
                tooltipText=''
                mainValue={dataDashBoard?.paid_acceptance}
                mainValueUnits='₽'
                isLoading={loading}
            />

            {/* <SmallBar
                title='Комиссия'
                hasTooltip
                tooltipText='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries'
                loading={loading}
                mainData={dataDashBoard?.commissionWB}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.commissionWBCompare}
            /> */}
            <RadarBar
                title='Комиссия'
                tooltipText='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries'
                mainValue={dataDashBoard?.commissionWB}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.commissionWBCompare
                }}
                isLoading={loading}
            />

            {/* <SmallBar
                title='Налог'
                loading={loading}
                mainData={dataDashBoard?.tax_amount}
            /> */}
            <RadarBar
                title='Налог'
                mainValue={dataDashBoard?.tax_amount}
                mainValueUnits='₽'
                isLoading={loading}
            />

            {/* <SmallBar
                title='Реклама (ДРР)'
                loading={loading}
                mainData={dataDashBoard?.advertAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.advertPercent}
            /> */}
            <RadarBar
                title='Реклама (ДРР)'
                mainValue={dataDashBoard?.advertAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.advertAmountCompare,
                }}
                isLoading={loading}
            />

            {/* <SmallBar
                title='Штрафы WB'
                hasTooltip={!dataDashBoard?.penalty}
                tooltipText='В выбранном периоде штрафов и расходов на платную приемку нет'
                loading={loading}
                mainData={dataDashBoard?.penalty}
            /> */}
            <RadarBar
                title='Штрафы WB и прочие удержания'
                tooltipText={!dataDashBoard?.penalty ? 'В выбранном периоде штрафов и расходов на платную приемку нет' : ''}
                mainValue={dataDashBoard?.penalty}
                mainValueUnits='₽'
                isLoading={loading}
            />

            {/* <SmallBar
                title='Компенсации'
                loading={loading}
                mainData={dataDashBoard?.compensation}
            /> */}
            <RadarBar
                title='Компенсации'
                mainValue={dataDashBoard?.compensation}
                mainValueUnits='₽'
                isLoading={loading}
            />


            {/* <SmallBar
                title='Средняя стоимость логистики на 1 шт'
                loading={loading}
                mainData={dataDashBoard?.logistic_per_one}
                hasTooltip
                tooltipText='Логистика на единицу проданного товара'
            /> */}
            <RadarBar
                title='Ср. стоимость логистики на 1 шт'
                tooltipText='Логистика на единицу проданного товара'
                mainValue={dataDashBoard?.logistic_per_one}
                mainValueUnits='₽'
                isLoading={loading}
            />

            {/* Средняя прибыль на 1 шт */}
            {/* <SmallBar
                title='Средняя прибыль на 1 шт'
                loading={loading}
                mainData={dataDashBoard?.profit_per_one}
                hasSecondaryData
                secondaryDataType='relative'
                secondaryDataUnits='%'
                secondaryData={dataDashBoard?.profit_per_one_compare}
                hasTooltip
                tooltipText='Прибыль на единицу проданного товара'
            /> */}
            <RadarBar
                title='Средняя прибыль на 1 шт'
                tooltipText='Прибыль на единицу проданного товара'
                mainValue={dataDashBoard?.profit_per_one}
                mainValueUnits='₽'
                compareValue={{
                    comparativeValue: dataDashBoard?.profit_per_one_compare
                }}
                isLoading={loading}
            />



            <div className={styles.group__3cols}>
                {/* <SmallBar
                title='Упущенные продажи'
                hasTooltip
                tooltipText='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе'
                loading={loading}
                mainData={dataDashBoard?.lostSalesAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='шт'
                secondaryData={dataDashBoard?.lostSalesCount}
            /> */}
                <RadarBar
                    title='Упущенные продажи'
                    tooltipText='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе'
                    mainValue={dataDashBoard?.lostSalesAmount}
                    mainValueUnits='₽'
                    compareValue={{
                        comparativeValue: dataDashBoard?.lost_sales_amount_compare,
                    }}
                    isLoading={loading}
                />

                {/* <SmallBar
                title='Себестоимость проданных товаров'
                loading={loading}
                mainData={dataDashBoard?.costPriceAmount}
                hasSecondaryData
                secondaryDataType='absolute'
                secondaryDataUnits='шт'
                secondaryData={dataDashBoard?.saleCount}
            /> */}
                <RadarBar
                    title='Себестоимость проданных товаров'
                    tooltipText=''
                    mainValue={dataDashBoard?.costPriceAmount}
                    mainValueUnits='₽'
                    compareValue={{
                        comparativeValue: dataDashBoard?.costPriceAmountCompare,
                    }}
                    isLoading={loading}
                />
                <TurnoverBlock
                    loading={loading}
                    turnover={dataDashBoard?.turnover}
                    selectedRange={selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                    turnoverCompare={dataDashBoard?.turnover_compare}
                />
            </div>
        </div>
    );
};

export default SecondBarsGroup;
