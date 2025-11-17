import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import styles from './dashboardPage.module.css';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import { ServiceFunctions } from '@/service/serviceFunctions';

import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import FirstBarsGroup from '@/components/dashboardPageComponents/barsGroup/firstBarsGroup';
import SecondBarsGroup from '@/components/dashboardPageComponents/barsGroup/secondBarsGroup';
import MainChart from '@/components/dashboardPageComponents/charts/mainChart/mainChart';
import AbcDataBlock from '@/components/dashboardPageComponents/blocks/abcDataBlock/abcDataBlock';
import FinanceBlock from '@/components/dashboardPageComponents/blocks/financeBlock/financeBlock';
import ProfitBlock from '@/components/dashboardPageComponents/blocks/profitBlock/profitBlock';
import MarginChartBlock from '@/components/dashboardPageComponents/blocks/marginChartBlock/marginChartBlock';
import ProfitChartBlock from '@/components/dashboardPageComponents/blocks/profitChartBlock/profitChartBlock';
import StorageBlock from '@/components/dashboardPageComponents/blocks/storageBlock/storageBlock';
import StorageRevenueChartBlock from '@/components/dashboardPageComponents/blocks/storageRevenueChartBlock/storageRevenueChartBlock';
import CostsBlock from '@/components/dashboardPageComponents/blocks/costsBlock/costsBlock';
import RevenueStructChartBlock from '@/components/dashboardPageComponents/blocks/revenueStructChartBlock/revenueStructChartBlock';
import TaxTableBlock from '@/components/dashboardPageComponents/blocks/taxTableBlock/taxTableBlock';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import TurnoverBlock from '@/components/dashboardPageComponents/blocks/turnoverBlock/turnoverBlock';
// import { mockGetDashBoard } from '@/service/mockServiceFunctions';
import StockAnalysisBlock from '@/components/dashboardPageComponents/blocks/stockAnalysisBlock/stockAnalysisBlock'
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import { RadarBar } from '@/shared';
import { DndContext, closestCorners, useDndMonitor } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const barsConfig = [
    {
        id: 'bar-1',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Чистая прибыль'
                tooltipText='Прибыль, остающаяся после уплаты налогов, сборов, отчислений'
                mainValue={dataDashBoard?.netProfit}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.netProfitCompare,
                    absoluteValue: dataDashBoard?.prev_net_profit,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'bar-2',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Продажи'
                tooltipText='Количество проданных товаров (без возвратов)'
                midValue={dataDashBoard?.saleCount}
                midValueUnits='шт'
                mainValue={dataDashBoard?.saleAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.saleAmountCompare,
                    absoluteValue: dataDashBoard?.prev_sale_amount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'bar-3',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='WB Реализовал'
                tooltipText='Сумма реализации товара с учетом согласованной скидки продавца и СПП'
                midValueUnits='₽'
                mainValue={dataDashBoard?.taxInfo?.wbRealization}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.wb_realization_compare,
                    absoluteValue: dataDashBoard?.prev_wb_realization,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'bar-5',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='ROI'
                tooltipText='Показывает общую рентабельность ваших вложений. Насколько прибыльны или убыточны ваши продажи с учетом всех затрат'
                mainValue={dataDashBoard?.roi}
                mainValueUnits='%'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.roi_compare,
                    absoluteValue: dataDashBoard?.prev_roi,
                    absoluteValueUnits: '%',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'mainChart',
        title: 'Чистая прибыль4',
        tooltipText: 'Прибыль, остающаяся после уплаты налогов, сборов, отчислений',
        mainValue: 'netProfit',
        mainValueUnits: '₽',
        hasColoredBackground: true,
        container: styles.group__fullWrapper,
        compareValue: {
            comparativeValue: 'netProfitCompare',
            absoluteValue: 'prev_net_profit',
            absoluteValueUnits: '₽',
        },
        render: (bar, dataDashBoard, loading, selectedRange) => (
            <MainChart
                title='Заказы и продажи'
                loading={loading}
                dataDashBoard={dataDashBoard}
                selectedRange={selectedRange}
            />
        ),
    },
    // Добавленные плашки из SecondBarsGroup
    {
        id: 'sec-orders',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Заказы'
                midValue={dataDashBoard?.orderCount}
                tooltipText='Общие сумма и количество созданных и оплаченных заказов за выбранный период'
                midValueUnits='шт'
                mainValue={dataDashBoard?.orderAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.orderAmountCompare,
                    absoluteValue: dataDashBoard?.prev_order_amount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-returns',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Возвраты'
                tooltipText='Стоимость и количество товаров, которые покупатели вернули по различным причинам'
                midValue={dataDashBoard?.returnCount}
                midValueUnits='шт'
                mainValue={dataDashBoard?.returnAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.returnAmountCompare,
                    absoluteValue: dataDashBoard?.prev_return_amount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-logistics',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Расходы на логистику'
                tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                mainValue={dataDashBoard?.logistics}
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.logisticsCompare,
                    absoluteValue: dataDashBoard?.prev_logistics,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-storage-bar',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Хранение'
                tooltipText='Расходы на хранение товаров на складах WB'
                mainValue={dataDashBoard?.storageData}
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.storageDataCompare,
                    absoluteValue: dataDashBoard?.prev_storageData,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-paid-acceptance',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Платная приемка'
                tooltipText='Услуга маркетплейса по проверке и приему вашего товара на склад'
                mainValue={dataDashBoard?.paid_acceptance}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.paid_acceptance_compare,
                    absoluteValue: dataDashBoard?.prev_paid_acceptance,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
        ),
    },
    {
        id: 'sec-commission',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Комиссия'
                tooltipText='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries'
                mainValue={dataDashBoard?.commissionWB}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.commissionWBCompare,
                    absoluteValue: dataDashBoard?.prev_commissionWB,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-tax',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Налог'
                mainValue={dataDashBoard?.tax_amount}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.taxCompare,
                    absoluteValue: dataDashBoard?.prev_tax,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
        ),
    },
    {
        id: 'sec-advert',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Реклама (ДРР)'
                tooltipText='Показатель эффективности маркетинга - сумма рекламных затрат'
                mainValue={dataDashBoard?.advertAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.advertAmountCompare,
                    absoluteValue: dataDashBoard?.prev_advertAmount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-penalty',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Штрафы и прочие удержания'
                tooltipText={'К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара'}
                mainValue={dataDashBoard?.penalty}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.penalty_compare,
                    absoluteValue: dataDashBoard?.prev_penalty,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
        ),
    },
    {
        id: 'sec-compensation',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Компенсации'
                tooltipText='Выплаты от маркетплейса за брак, потерю или повреждение вашего товара на их складах, а также за нарушение сроков выплат'
                mainValue={dataDashBoard?.compensation}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.compensation_compare,
                    absoluteValue: dataDashBoard?.prev_compensation,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
        ),
    },
    {
        id: 'sec-logistic-per-one',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Ср. стоимость логистики на 1 шт'
                tooltipText='Логистика на единицу проданного товара'
                mainValue={dataDashBoard?.logistic_per_one}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.logistic_per_one_compare,
                    absoluteValue: dataDashBoard?.prev_logistic_per_one,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
        ),
    },
    {
        id: 'sec-profit-per-one',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Средняя прибыль на 1 шт'
                tooltipText='Прибыль на единицу проданного товара'
                mainValue={dataDashBoard?.profit_per_one}
                mainValueUnits='₽'
                compareValue={{
                    comparativeValue: dataDashBoard?.profit_per_one_compare,
                    absoluteValue: dataDashBoard?.prev_profit_per_one,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-lost-sales-amount',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Упущенные продажи'
                tooltipText='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе'
                mainValue={dataDashBoard?.lostSalesAmount}
                mainValueUnits='₽'
                compareValue={{
                    comparativeValue: dataDashBoard?.lost_sales_amount_compare,
                    absoluteValue: dataDashBoard?.prev_lostSalesAmount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-cost-price-amount',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Себестоимость проданных товаров'
                tooltipText='Суммарная себестоимость проданных товаров (основана на данных раздела "Себестоимость"'
                mainValue={dataDashBoard?.costPriceAmount}
                mainValueUnits='₽'
                compareValue={{
                    comparativeValue: dataDashBoard?.costPriceAmountCompare,
                    absoluteValue: dataDashBoard?.prev_costPriceAmount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-turnover',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters) => (
            <TurnoverBlock
                loading={loading}
                turnover={dataDashBoard?.turnover}
                selectedRange={selectedRange}
                activeBrand={activeBrand}
                authToken={authToken}
                filters={filters}
                turnoverCompare={dataDashBoard?.turnover_compare}
                prevTurnover={dataDashBoard?.prev_turnover}
            />
        ),
    },
    {
        id: 'bar-4',
        container: styles.group__lgBarWrapper,
        render: (bar, dataDashBoard, loading) => (
            <RadarBar
                title='Процент выкупа'
                tooltipText='Доля заказов, которые были оплачены и получены покупателями, от общего числа созданных заказов.'
                mainValue={dataDashBoard?.buyoutPercent}
                mainValueUnits='%'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.buyoutPercentCompare,
                    absoluteValue: dataDashBoard?.prev_buyoutPercent,
                    absoluteValueUnits: '%',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-finance',
        container: styles.group__halfWrapper,
        render: (bar, dataDashBoard, loading) => (
            <FinanceBlock
                dataDashBoard={dataDashBoard}
                loading={loading}
            />
        ),
    },
    {
        id: 'sec-profit',
        container: styles.group__halfWrapper,
        render: (bar, dataDashBoard, loading) => (
            <ProfitBlock
                dataDashBoard={dataDashBoard}
                loading={loading}
            />
        ),
    },
    {
        id: 'sec-tax-and-revenue-struct',
        container: styles.group__doubleBlockWrapper,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard) => (
            <>
                <TaxTableBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                    updateDashboard={updateDataDashBoard}
                />
                <RevenueStructChartBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
            </>
        ),
    },
    {
        id: 'sec-margin-chart',
        container: styles.group__halfWrapper,
        render: (bar, dataDashBoard, loading) => (
            <MarginChartBlock
                loading={loading}
                dataDashBoard={dataDashBoard}
            />
        ),
    },
    {
        id: 'sec-storage-revenue-chart',
        container: styles.group__halfWrapper,
        render: (bar, dataDashBoard, loading) => (
            <StorageRevenueChartBlock
                loading={loading}
                dataDashBoard={dataDashBoard}
            />
        ),
    },
    {
        id: 'sec-storage',
        container: styles.group__halfWrapper,
        render: (bar, dataDashBoard, loading) => (
            <StorageBlock
                loading={loading}
                dataDashBoard={dataDashBoard}
            />
        ),
    },
    {
        id: 'sec-stock-analysis',
        container: styles.group__fullWrapper,
        render: (bar, dataDashBoard, loading) => (
            <StockAnalysisBlock
                data={[]}
                loading={loading}
            />
        ),
    },
    {
        id: 'sec-abc',
        container: styles.group__fullWrapper,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters) => (
            <AbcDataBlock
                titles={['Группа А', 'Группа В', 'Группа С']}
                data={dataDashBoard?.ABCAnalysis}
                loading={loading}
            />
        ),
    },
];


const MainContent = React.memo(({
    shopStatus,
    loading,
    isFiltersLoading,
    dataDashBoard,
    selectedRange,
    activeBrand,
    authToken,
    filters,
    updateDataDashBoard,
    isSidebarHidden
}) => {
    const isLoading = loading || isFiltersLoading;
    const [items, setItems] = useState(barsConfig);
    useDndMonitor({
        onDragOver: ({ active, over }) => {
            console.log('onDragOver', { active, over });
            if (!over || active.id === over.id) return;
        },
        onDragEnd: ({ active, over }) => {
            if (!over || active.id === over.id) return;
            const activeElem = document.getElementById(active.id);
            const overElem = document.getElementById(over.id);
            if (activeElem && overElem) {
                const activeCS = getComputedStyle(activeElem);
                const overCS = getComputedStyle(overElem);
                const activeGridColumn = activeCS.getPropertyValue('grid-column').trim();
                const overGridColumn = overCS.getPropertyValue('grid-column').trim();
                if (activeGridColumn !== overGridColumn) {
                    return;
                }
            }
            setItems((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id);
                const newIndex = prev.findIndex((i) => i.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return arrayMove(prev, oldIndex, newIndex);
            });
        },
    });

    // Если фильтры загружены и shopStatus не подходит, не рендерим
    if (!isFiltersLoading && !shopStatus?.is_primary_collect) return null;


    return (

        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className={styles.page__mainContentWrapper} >
                {items.map((bar) => (
                    <SortableBar key={bar.id} bar={bar} dataDashBoard={dataDashBoard} loading={loading}>
                        {bar.render(bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard)}
                    </SortableBar>
                ))}
                {/* <FirstBarsGroup
                    dataDashBoard={dataDashBoard}
                    selectedRange={selectedRange}
                    loading={isLoading}
                    /> */}

                {/* <MainChart
                    title='Заказы и продажи'
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                    selectedRange={selectedRange}
                />

                <SecondBarsGroup
                    dataDashBoard={dataDashBoard}
                    loading={isLoading}
                    selectedRange={selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                /> */}

                {/* <div className={styles.page__chartGroup}>
                    <FinanceBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                    />
                    <ProfitBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                    />

                    <div className={styles.page__doubleBlockWrapper}>
                        <TaxTableBlock
                            loading={isLoading}
                            dataDashBoard={dataDashBoard}
                            updateDashboard={updateDataDashBoard}
                        />
                        <RevenueStructChartBlock
                            loading={isLoading}
                            dataDashBoard={dataDashBoard}
                        />
                    </div>

                    <MarginChartBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                    />
                   
                    <StorageRevenueChartBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                    />
                    <StorageBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                    />
                </div> */}

                {/* <StockAnalysisBlock
                    // data={dataDashBoard?.stockAnalysis}
                    data={[]}
                    loading={isLoading}
                />

                <AbcDataBlock
                    titles={['Группа А', 'Группа В', 'Группа С']}
                    data={dataDashBoard?.ABCAnalysis}
                    loading={isLoading}
                /> */}
            </div >
        </SortableContext>
    );
});

const SortableBar = ({ bar, dataDashBoard, loading, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: bar.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1000 : 1,
    };
    return (
        <div className={bar.container} ref={setNodeRef} style={style} {...attributes} {...listeners} id={bar.id}>
            {children}
        </div>
    );
};

const _DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, shops } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const { isSidebarHidden } = useAppSelector((state) => state.utils);

    const [pageState, setPageState] = useState({
        dataDashBoard: null,
        loading: true,
        primaryCollect: null,
        shopStatus: null,
        error: false
    });
    // Ограничиваем коллизии только элементами с тем же span по колонкам,
    // чтобы при наведении на несовместимые карточки не происходило визуальное смещение.
    const sameGridSpanCollision = (args) => {
        const activeId = String(args.active?.id ?? '');
        const activeEl = document.getElementById(activeId);
        // Пытаемся извлечь 'span N' из сокращенного свойства grid-column.
        const extractSpanFromGridColumn = (value) => {
            if (!value) return null;
            const match = String(value).match(/span\s+(\d+)/i);
            return match ? match[0].toLowerCase().trim() : null; // вернём строку вида 'span 3'
        };
        const getSpan = (el) => {
            if (!el) return null;
            const cs = getComputedStyle(el);
            // 1) Пытаемся из grid-column: 'auto / span 3'
            const gridColumn = cs.getPropertyValue('grid-column').trim();
            const spanFromShorthand = extractSpanFromGridColumn(gridColumn);
            if (spanFromShorthand) return spanFromShorthand;
            // 2) Фолбэк из grid-column-end: 'span 3'
            const gridColumnEnd = cs.getPropertyValue('grid-column-end').trim();
            const spanFromEnd = extractSpanFromGridColumn(gridColumnEnd);
            return spanFromEnd || null;
        };
        const activeSpan = getSpan(activeEl);
        const filtered = activeSpan
            ? args.droppableContainers.filter((c) => {
                const el = document.getElementById(String(c.id));
                return getSpan(el) === activeSpan;
            })
            : args.droppableContainers;
        return closestCorners({ ...args, droppableContainers: filtered });
    };

    const updateDataDashBoard = async (selectedRange, activeBrand, authToken) => {
        setPageState(prev => ({ ...prev, loading: true }));
        try {
            if (activeBrand !== null && activeBrand !== undefined) {
                const data = await ServiceFunctions.getDashBoard(
                    authToken,
                    selectedRange,
                    activeBrand,
                    filters
                );
                setPageState(prev => ({ ...prev, dataDashBoard: data, loading: false }));
            }
        } catch (e) {
            console.error(e);
            setPageState(prev => ({ ...prev, error: true }));
        }
    };

    const shopStatus = useMemo(() => {
        if (!activeBrand || !shops) return null;

        if (activeBrand.id === 0) {
            return {
                id: 0,
                brand_name: 'Все',
                is_active: shops.some(_ => _.is_primary_collect),
                is_valid: true,
                is_primary_collect: shops.some(_ => _.is_primary_collect),
                is_self_cost_set: !shops.some(_ => !_.is_self_cost_set)
            };
        }

        return shops.find(_ => _.id === activeBrand.id);
    }, [activeBrand, shops]);

    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded && !pageState.error) {
            setPageState(prev => ({ ...prev, primaryCollect: activeBrand.is_primary_collect }));
            updateDataDashBoard(selectedRange, activeBrand.id, authToken);
        }

        if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded) {
            setPageState(prev => ({ ...prev, loading: false }));
        }
    }, [activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup]);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header
                        title='Сводка продаж'
                        howToLink="https://radar.usedocs.com/article/75916"
                        howToLinkText="Как проверить данные?"
                        hasShadow={false}
                    />
                </div>

                {activeBrand && activeBrand.is_primary_collect && !activeBrand.is_self_cost_set && (
                    <SelfCostWarningBlock
                        shopId={activeBrand?.id}
                        onUpdateDashboard={updateDataDashBoard}
                    />
                )}

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <div className={styles.page__controlsWrapper}>
                    <Filters
                        isDataLoading={pageState.loading}
                    />
                </div>

                {activeBrand && !activeBrand.is_primary_collect && (
                    <DataCollectWarningBlock />
                )}

                {pageState?.dataDashBoard &&
                    <DndContext collisionDetection={sameGridSpanCollision}>
                <MainContent
                    shopStatus={shopStatus}
                            loading={pageState?.loading}
                    isFiltersLoading={!isFiltersLoaded}
                            dataDashBoard={pageState?.dataDashBoard}
                    selectedRange={selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                    updateDataDashBoard={updateDataDashBoard}
                    isSidebarHidden={isSidebarHidden}
                />
                    </DndContext>}
            </section>
        </main>
    );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
