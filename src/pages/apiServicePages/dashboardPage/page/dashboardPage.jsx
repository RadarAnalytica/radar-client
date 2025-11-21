import React, { useState, useContext, useEffect, useMemo, useCallback, useRef } from 'react';
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
import { DndContext, pointerWithin, useDndMonitor, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DragHandle } from '@/shared/ui/DragHandler/DragHandler';
import { SortableRow } from '../components/SortableRow';
import { SettingsModal } from '../components/SettingsModal';
import { v4 as uuidv4 } from 'uuid';
import { SmallButton } from '@/shared';



/*
    --------------- DND FAQ---------------
    Все карточк на дашборде теперь упакованы в конфиг, который представляет из себя массив обьектов с детьми (строки и сами карточки)
    Каждая строка - 12-колоночный грид
    Каждой карточке задается grid-column: span X
    Логика работы:
    - Внутри строки простая сортировка перетаскиванием
    - Между строками: вычистяется grid-column активного и целевого эл-та. Если они совпадают, то меняются местами. Элементы со span 12 активируют логику сортировки строк (две строки меняются местами) 
    - grid-column вычисляется через getComputedStyle - для сохранения логики для адаптива
    - При переносе маленького элемента на элемент  со span 12 строки также меняются местами

    Минорные вещи:
    - Подсветка валидной/не валидной цели
    - Логика DragImage (если маленький элемент переносится на span 12 то рендерится вся строка)
    ---------------------------------------
*/

// Контекст для передачи listeners и attributes в DragHandle
export const DragHandleContext = React.createContext(null);





// Конфигурация строк и карточек
const barsConfig = [
    // Первая группа
    {
        rowId: 1,
        rowStyle: '',
        canUnite: true,
        children: [
            {
                id: 'bar-1',
                title: 'Чистая прибыль',
                isVisible: true,
                container: styles.group__lgBarWrapperTop,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'bar-2',
                title: 'Продажи',
                isVisible: true,
                container: styles.group__lgBarWrapperTop,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'bar-3',
                title: 'WB Реализовал',
                isVisible: true,
                container: styles.group__lgBarWrapperTop,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'bar-5',
                title: 'ROI',
                isVisible: true,
                container: styles.group__lgBarWrapperTop,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 2,
        rowStyle: '',
        children: [
            {
                id: 'mainChart',
                title: 'Заказы и продажи',
                dropKey: 'full',
                isVisible: true,
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 3,
        rowStyle: '',
        canUnite: true,
        children: [
            {
                id: 'sec-orders',
                title: 'Заказы',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-returns',
                title: 'Возвраты',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-logistics',
                title: 'Расходы на логистику',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
                render: (bar, dataDashBoard, loading) => (
                    <RadarBar
                        title='Расходы на логистику'
                        tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                        mainValue={dataDashBoard?.logistics}
                        hasColoredBackground
                        midValue={<SmallButton title='Детализация' dataDashBoard={dataDashBoard} dataType='logistic' />}
                        compareValue={{
                            comparativeValue: dataDashBoard?.logisticsCompare,
                            absoluteValue: dataDashBoard?.prev_logistics,
                            absoluteValueUnits: '₽',
                            tooltipText: 'Значение предыдущего периода'
                        }}
                        isLoading={loading}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-storage-bar',
                title: 'Хранение',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-paid-acceptance',
                title: 'Платная приемка',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-commission',
                title: 'Комиссия',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
                render: (bar, dataDashBoard, loading) => (
                    <RadarBar
                        title='Комиссия + эквайринг'
                        tooltipText='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries'
                        mainValue={dataDashBoard?.commissionWB}
                        mainValueUnits='₽'
                        midValue={<SmallButton title='Детализация' dataDashBoard={dataDashBoard} dataType='comission' />}
                        hasColoredBackground
                        compareValue={{
                            comparativeValue: dataDashBoard?.commissionWBCompare,
                            absoluteValue: dataDashBoard?.prev_commissionWB,
                            absoluteValueUnits: '₽',
                            tooltipText: 'Значение предыдущего периода'
                        }}
                        isLoading={loading}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-tax',
                title: 'Налог',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-advert',
                title: 'Реклама (ДРР)',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-penalty',
                title: 'Штрафы и прочие удержания',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
                render: (bar, dataDashBoard, loading) => (
                    <RadarBar
                        title='Штрафы и прочие удержания'
                        tooltipText={'К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара'}
                        mainValue={dataDashBoard?.penalty}
                        midValue={<SmallButton title='Детализация' dataDashBoard={dataDashBoard} dataType='penalty' />}
                        mainValueUnits='₽'
                        isLoading={loading}
                        compareValue={{
                            comparativeValue: dataDashBoard?.penalty_compare,
                            absoluteValue: dataDashBoard?.prev_penalty,
                            absoluteValueUnits: '₽',
                            tooltipText: 'Значение предыдущего периода'
                        }}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-compensation',
                title: 'Компенсации',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-logistic-per-one',
                title: 'Ср. стоимость логистики на 1 шт',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-profit-per-one',
                title: 'Средняя прибыль на 1 шт',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-lost-sales-amount',
                title: 'Упущенные продажи',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-cost-price-amount',
                title: 'Себестоимость проданных товаров',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-turnover',
                title: 'Оборачиваемость',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'bar-4',
                title: 'Процент выкупа',
                isVisible: true,
                container: styles.group__lgBarWrapper,
                dropKey: '1',
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
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 7,
        rowStyle: '',
        children: [
            {
                id: 'sec-finance',
                title: 'Финансы',
                dropKey: '2',
                isVisible: true,
                container: styles.group__halfWrapper,
                render: (bar, dataDashBoard, loading) => (
                    <FinanceBlock
                        dataDashBoard={dataDashBoard}
                        loading={loading}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-profit',
                title: 'Прибыльность',
                dropKey: '2',
                isVisible: true,
                container: styles.group__halfWrapper,
                render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard) => (
                    <ProfitBlock
                        dataDashBoard={dataDashBoard}
                        loading={loading}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 8,
        rowStyle: '',
        children: [
            {
                id: 'sec-tax-struct',
                title: 'Налог',
                isVisible: true,
                dropKey: '3',
                container: styles.group__doubleBlockWrapper,
                render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard) => (
                    <TaxTableBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                        updateDashboard={updateDataDashBoard}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-revenue-struct',
                title: 'Структура выручки',
                isVisible: true,
                dropKey: '3',
                container: styles.group__doubleBlockWrapper,
                render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard) => (
                    <RevenueStructChartBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-margin-chart',
                title: 'Рентабельность и маржинальность',
                isVisible: true,
                dropKey: '3',
                container: styles.group__halfWrapper,
                render: (bar, dataDashBoard, loading) => (
                    <MarginChartBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 9,
        rowStyle: '',
        children: [
            {
                id: 'sec-storage-revenue-chart',
                title: 'Выручка по складам',
                isVisible: true,
                dropKey: '4',
                container: styles.group__halfWrapper,
                render: (bar, dataDashBoard, loading) => (
                    <StorageRevenueChartBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
            {
                id: 'sec-storage',
                title: 'Склад',
                isVisible: true,
                dropKey: '4',
                container: styles.group__halfWrapper,
                render: (bar, dataDashBoard, loading) => (
                    <StorageBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 10,
        rowStyle: '',
        children: [
            {
                id: 'sec-stock-analysis',
                title: 'Анализ остатков',
                isVisible: true,
                container: styles.group__fullWrapper,
                dropKey: 'full',
                render: (bar, dataDashBoard, loading) => (
                    <StockAnalysisBlock
                        data={[]}
                        loading={loading}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
    {
        rowId: 11,
        rowStyle: '',
        children: [
            {
                id: 'sec-abc',
                title: 'ABC-анализ',
                isVisible: true,
                dropKey: 'full',
                container: styles.group__fullWrapper,
                render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters) => (
                    <AbcDataBlock
                        titles={['Группа А', 'Группа В', 'Группа С']}
                        data={dataDashBoard?.ABCAnalysis}
                        loading={loading}
                        dragHandle={() => <DragHandle context={DragHandleContext} />}
                    />
                ),
            },
        ]
    },
];

const STORAGE_KEY = 'dashboard_cards_visibility';

// Функция для сохранения настроек в localStorage
// Сохраняет только: для строк - rowId, children; для children - id, isVisible
const saveDashboardSettings = (items, visibilityMap) => {
    try {
        const savedData = items.map(row => ({
            rowId: row.rowId,
            children: row.children ? row.children.map(child => ({
                id: child.id,
                isVisible: visibilityMap && visibilityMap[child.id] !== undefined 
                    ? visibilityMap[child.id] 
                    : (child.isVisible !== false)
            })) : []
        }));

        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
    } catch (error) {
        console.error('Ошибка при сохранении настроек дашборда:', error);
    }
};

// Функция для загрузки настроек из localStorage
// Просто загружает урезанный массив
const loadDashboardSettings = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            
            // Новый формат: массив объектов с rowId и children (с id, isVisible)
            if (Array.isArray(parsed)) {
                return parsed;
            }
            
            // Старый формат: объект с visibility и order - конвертируем
            if (parsed.visibility && parsed.order) {
                return parsed.order.map(orderRow => ({
                    rowId: orderRow.rowId,
                    children: orderRow.children.map(childId => ({
                        id: childId,
                        isVisible: parsed.visibility[childId] !== undefined 
                            ? parsed.visibility[childId] 
                            : true
                    }))
                }));
            }
            
            // Очень старый формат: только visibility map - возвращаем null, будет использован исходный конфиг
            return null;
        }
    } catch (error) {
        console.error('Ошибка при загрузке настроек дашборда:', error);
    }
    return null;
};

// Функция для обогащения загруженных данных недостающими из исходного конфига
const enrichConfig = (savedRows, originalConfig) => {
    if (!savedRows || !Array.isArray(savedRows)) {
        return originalConfig;
    }

    // Создаем карту элементов по ID для быстрого доступа
    const elementMap = new Map();
    originalConfig.forEach(row => {
        if (row.children) {
            row.children.forEach(child => {
                elementMap.set(child.id, child);
            });
        }
    });

    // Обогащаем загруженные строки полными данными
    const enrichedRows = savedRows.map(savedRow => {
        const originalRow = originalConfig.find(r => r.rowId === savedRow.rowId);
        if (!originalRow) return null;

        // Обогащаем children полными данными из исходного конфига
        const enrichedChildren = savedRow.children
            .map(savedChild => {
                const originalChild = elementMap.get(savedChild.id);
                if (!originalChild) return null;
                
                return {
                    ...originalChild, // Все данные из исходного конфига
                    isVisible: savedChild.isVisible !== undefined ? savedChild.isVisible : (originalChild.isVisible !== false)
                };
            })
            .filter(Boolean);

        // Добавляем элементы, которых нет в сохраненных (новые элементы из исходного конфига)
        if (originalRow.children) {
            originalRow.children.forEach(child => {
                if (!savedRow.children.some(sc => sc.id === child.id)) {
                    enrichedChildren.push(child);
                }
            });
        }

        return {
            ...originalRow, // Все данные из исходного конфига
            children: enrichedChildren
        };
    }).filter(Boolean);

    // Добавляем строки, которых нет в сохраненных (новые строки из исходного конфига)
    originalConfig.forEach(row => {
        if (!savedRows.some(sr => sr.rowId === row.rowId)) {
            enrichedRows.push(row);
        }
    });

    return enrichedRows;
};

// Рендер непосредственно дашборда (карточек)
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
    isSidebarHidden,
    visibilityMap,
    onSaveSettings
}) => {
    const isLoading = loading || !isFiltersLoading; // Флаг загрузки данных

    // Кэшируем загруженные данные из localStorage
    const savedRowsRef = useRef(null);
    if (savedRowsRef.current === null) {
        savedRowsRef.current = loadDashboardSettings();
    }
    
    // Применяем настройки видимости и порядка к конфигу
    const configWithSettings = useMemo(() => {
        // Обогащаем загруженные данные недостающими из исходного конфига
        let config = enrichConfig(savedRowsRef.current, barsConfig);
        
        // Если есть актуальный visibilityMap (из состояния), применяем его поверх сохраненных
        if (visibilityMap && Object.keys(visibilityMap).length > 0) {
            config = config.map(row => ({
                ...row,
                children: row.children ? row.children.map(child => ({
                    ...child,
                    isVisible: visibilityMap[child.id] !== undefined 
                        ? visibilityMap[child.id] 
                        : child.isVisible
                })) : []
            }));
        }

        return config;
    }, [visibilityMap]);

    // Инициализируем items с начальным значением из configWithSettings
    const [items, setItems] = useState(() => configWithSettings);
    const prevConfigRef = useRef(configWithSettings);

    // Обновляем items при изменении настроек (только если действительно изменились)
    useEffect(() => {
        // Сравниваем структуру (порядок и ID элементов), чтобы избежать лишних обновлений
        const prevIds = JSON.stringify(prevConfigRef.current.map(r => ({ rowId: r.rowId, children: r.children?.map(c => c.id) })));
        const newIds = JSON.stringify(configWithSettings.map(r => ({ rowId: r.rowId, children: r.children?.map(c => c.id) })));
        
        if (prevIds !== newIds) {
            prevConfigRef.current = configWithSettings;
            setItems(configWithSettings);
        }
    }, [configWithSettings]);
    
    // Функция для сохранения настроек с текущими items
    const saveCurrentSettings = useCallback((currentItems, currentVisibilityMap) => {
        saveDashboardSettings(currentItems, currentVisibilityMap || visibilityMap);
    }, [visibilityMap]);
    
    // Передаем функцию сохранения в родительский компонент
    useEffect(() => {
        if (onSaveSettings) {
            onSaveSettings((newVisibilityMap) => {
                saveCurrentSettings(items, newVisibilityMap);
            });
        }
    }, [items, saveCurrentSettings, onSaveSettings]);
    
    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            pendingUpdateRef.current = null;
        };
    }, []);
    const [overId, setOverId] = useState(null); // ID целевого элемента
    const [activeId, setActiveId] = useState(null); // ID активного элемента
    const [isOverValid, setIsOverValid] = useState(false); // Флаг валидности целевого элемента
    const [isActiveSpan12, setIsActiveSpan12] = useState(false); // Флаг активности большого элемента
    const [showRowInDragOverlay, setShowRowInDragOverlay] = useState(false); // Флаг показа строки в dragOverlay
    const [activeRowForOverlay, setActiveRowForOverlay] = useState(null); // Строка активного элемента для dragOverlay
    
    // Рефы для оптимизации onDragOver
    const rafIdRef = useRef(null);
    const pendingUpdateRef = useRef(null);
    
    // Мемоизируем карту элементов для быстрого доступа
    const itemsMapRef = useRef(new Map());
    const rowsMapRef = useRef(new Map());
    
    // Обновляем карты при изменении items
    useEffect(() => {
        itemsMapRef.current.clear();
        rowsMapRef.current.clear();
        
        items.forEach((row) => {
            if (row && row.children && Array.isArray(row.children)) {
                row.children.forEach((child) => {
                    if (child && child.id) {
                        itemsMapRef.current.set(child.id, { child, row });
                    }
                });
                if (row.rowId) {
                    rowsMapRef.current.set(String(row.rowId), row);
                }
            }
        });
    }, [items]);
    // ------------------------------------------------------------------------------------------------
    // Находим активный элемент внутри строк (оптимизировано через карту)
    const activeItem = useMemo(() => {
        if (!activeId) return null;
        const itemData = itemsMapRef.current.get(activeId);
        return itemData ? itemData.child : null;
    }, [activeId]);
    // ------------------------------------------------------------------------------------------------
    // Находим строку активного элемента (вычисляем динамически)
    const activeRow = useMemo(() => {
        if (!activeId) return null;
        return items.find(row =>
            row && row.children && Array.isArray(row.children) &&
            row.children.some(child => child && child.id === activeId)
        );
    }, [activeId, items]);
    // ------------------------------------------------------------------------------------------------
    // Вычисляем содержимое для DragOverlay
    const dragOverlayContent = useMemo(() => {
        if (showRowInDragOverlay && activeRowForOverlay && activeRowForOverlay.children && Array.isArray(activeRowForOverlay.children) && activeRowForOverlay.children.length > 0) {
            return {
                type: 'row',
                row: activeRowForOverlay
            };
        }
        if (activeItem) {
            return {
                type: 'item',
                item: activeItem
            };
        }
        return null;
    }, [showRowInDragOverlay, activeRowForOverlay, activeItem]);
    // ------------------------------------------------------------------------------------------------
    // Собственно логика днд
    useDndMonitor({
        onDragStart: ({ active }) => {
            setActiveId(active.id);
            setIsOverValid(false);
            setShowRowInDragOverlay(false);
            // Сохраняем строку активного элемента для использования в DragOverlay
            const currentItems = items;
            const row = currentItems.find(r =>
                r && r.children && Array.isArray(r.children) &&
                r.children.some(child => child && child.id === active.id)
            );
            setActiveRowForOverlay(row || null);
            if (!row) {
                setOverId(null);
                setIsOverValid(false);
                setShowRowInDragOverlay(false);
                return;
            }

            const activeElem = row.children.find(child => child.id === active.id);
            if (activeElem.dropKey !== 'full') {
                const newItems = [...items];
                const hasAddRow = newItems.some(row => row.rowId === 'addRow');
                if (!hasAddRow) {
                    const addRow = {
                        rowId: 'addRow',
                        children: [{
                            id: 'addRowElement',
                            dropKey: activeElem.dropKey,
                            container: styles.group__addRowWrapper,
                            render: (bar, dataDashBoard, loading) => (
                                <div className={styles.group__addRowContainer}>
                                    + Добавить строку
                                </div>
                            )
                        }]
                    }
                    const activeRowIndex = newItems.findIndex(r => r.rowId === row.rowId);
                    if (row === -1) {
                        newItems.splice(0, 0, addRow);
                    } else {
                        newItems.splice(activeRowIndex + 1, 0, addRow);
                    }
                    setItems(newItems);
                }
            }
            // Проверяем, имеет ли активный элемент span 12
            if (activeElem.dropKey === 'full') {
                setIsActiveSpan12(true);
            } else {
                setIsActiveSpan12(false);
            }
        },
        onDragOver: ({ active, over }) => {
            // Ранний выход для невалидных случаев
            if (!active || !over || active?.id === over?.id) {
                if (pendingUpdateRef.current) {
                    pendingUpdateRef.current = { overId: null, isOverValid: false, showRowInDragOverlay: false };
                } else {
                    pendingUpdateRef.current = { overId: null, isOverValid: false, showRowInDragOverlay: false };
                    if (rafIdRef.current === null) {
                        rafIdRef.current = requestAnimationFrame(() => {
                            if (pendingUpdateRef.current) {
                                const update = pendingUpdateRef.current;
                                setOverId(update.overId);
                                setIsOverValid(update.isOverValid);
                                setShowRowInDragOverlay(update.showRowInDragOverlay);
                                pendingUpdateRef.current = null;
                            }
                            rafIdRef.current = null;
                        });
                    }
                }
                return;
            }

            // Используем кэшированные карты для быстрого доступа
            const activeItemData = itemsMapRef.current.get(active.id);
            if (!activeItemData) {
                pendingUpdateRef.current = { overId: over.id, isOverValid: false, showRowInDragOverlay: false };
                if (rafIdRef.current === null) {
                    rafIdRef.current = requestAnimationFrame(() => {
                        if (pendingUpdateRef.current) {
                            const update = pendingUpdateRef.current;
                            setOverId(update.overId);
                            setIsOverValid(update.isOverValid);
                            setShowRowInDragOverlay(update.showRowInDragOverlay);
                            pendingUpdateRef.current = null;
                        }
                        rafIdRef.current = null;
                    });
                }
                return;
            }

            const { row: activeRow, child: activeElement } = activeItemData;

            // Проверяем, является ли over.id ID строки (rowId) или элемента
            let overRow = rowsMapRef.current.get(String(over.id));
            let overElementId = over.id;
            let overElement = null;

            if (overRow) {
                // over - это строка
                if (!overRow.children || !Array.isArray(overRow.children) || overRow.children.length === 0) {
                    pendingUpdateRef.current = { overId: over.id, isOverValid: false, showRowInDragOverlay: false };
                    if (rafIdRef.current === null) {
                        rafIdRef.current = requestAnimationFrame(() => {
                            if (pendingUpdateRef.current) {
                                const update = pendingUpdateRef.current;
                                setOverId(update.overId);
                                setIsOverValid(update.isOverValid);
                                setShowRowInDragOverlay(update.showRowInDragOverlay);
                                pendingUpdateRef.current = null;
                            }
                            rafIdRef.current = null;
                        });
                    }
                    return;
                }
                overElementId = overRow.children[0].id;
                overElement = overRow.children[0];
            } else {
                // over - это элемент
                const overItemData = itemsMapRef.current.get(over.id);
                if (!overItemData) {
                    pendingUpdateRef.current = { overId: over.id, isOverValid: false, showRowInDragOverlay: false };
                    if (rafIdRef.current === null) {
                        rafIdRef.current = requestAnimationFrame(() => {
                            if (pendingUpdateRef.current) {
                                const update = pendingUpdateRef.current;
                                setOverId(update.overId);
                                setIsOverValid(update.isOverValid);
                                setShowRowInDragOverlay(update.showRowInDragOverlay);
                                pendingUpdateRef.current = null;
                            }
                            rafIdRef.current = null;
                        });
                    }
                    return;
                }
                overRow = overItemData.row;
                overElement = overItemData.child;
            }

            if (!activeRow || !overRow || !activeElement || !overElement) {
                pendingUpdateRef.current = { overId: over.id, isOverValid: false, showRowInDragOverlay: false };
                if (rafIdRef.current === null) {
                    rafIdRef.current = requestAnimationFrame(() => {
                        if (pendingUpdateRef.current) {
                            const update = pendingUpdateRef.current;
                            setOverId(update.overId);
                            setIsOverValid(update.isOverValid);
                            setShowRowInDragOverlay(update.showRowInDragOverlay);
                            pendingUpdateRef.current = null;
                        }
                        rafIdRef.current = null;
                    });
                }
                return;
            }

            // Если элементы в одной строке - все валидны
            const isSameRow = activeRow.rowId === overRow.rowId;
            if (isSameRow) {
                pendingUpdateRef.current = { overId: over.id, isOverValid: true, showRowInDragOverlay: false };
                if (rafIdRef.current === null) {
                    rafIdRef.current = requestAnimationFrame(() => {
                        if (pendingUpdateRef.current) {
                            const update = pendingUpdateRef.current;
                            setOverId(update.overId);
                            setIsOverValid(update.isOverValid);
                            setShowRowInDragOverlay(update.showRowInDragOverlay);
                            pendingUpdateRef.current = null;
                        }
                        rafIdRef.current = null;
                    });
                }
                return;
            }

            // Если элементы в разных строках - проверяем dropKey
            const activeElemDropKey = activeElement.dropKey;
            const overElemDropKey = overElement.dropKey;

            if (!activeElemDropKey || !overElemDropKey) {
                pendingUpdateRef.current = { overId: over.id, isOverValid: false, showRowInDragOverlay: false };
                if (rafIdRef.current === null) {
                    rafIdRef.current = requestAnimationFrame(() => {
                        if (pendingUpdateRef.current) {
                            const update = pendingUpdateRef.current;
                            setOverId(update.overId);
                            setIsOverValid(update.isOverValid);
                            setShowRowInDragOverlay(update.showRowInDragOverlay);
                            pendingUpdateRef.current = null;
                        }
                        rafIdRef.current = null;
                    });
                }
                return;
            }

            // Проверяем валидность цели как дропзоны
            const isValid = true;
            const shouldShowRow = activeElemDropKey !== overElemDropKey || activeElemDropKey === 'full' || overElemDropKey === 'full';
            
            pendingUpdateRef.current = {
                overId: shouldShowRow ? String(overRow.rowId) : over.id,
                isOverValid: isValid,
                showRowInDragOverlay: shouldShowRow
            };

            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(() => {
                    if (pendingUpdateRef.current) {
                        const update = pendingUpdateRef.current;
                        setOverId(update.overId);
                        setIsOverValid(update.isOverValid);
                        setShowRowInDragOverlay(update.showRowInDragOverlay);
                        pendingUpdateRef.current = null;
                    }
                    rafIdRef.current = null;
                });
            }
        },
        onDragCancel: () => {
            // Отменяем pending обновления
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            pendingUpdateRef.current = null;
            
            setOverId(null);
            setActiveId(null);
            setIsOverValid(false);
            setIsActiveSpan12(false);
            setShowRowInDragOverlay(false);
            setActiveRowForOverlay(null);
            //document.body.style.cursor = '';
        },
        onDragEnd: ({ active, over }) => {
            // Отменяем pending обновления
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            pendingUpdateRef.current = null;
            
            setOverId(null);
            setActiveId(null);
            setIsOverValid(false);
            setIsActiveSpan12(false);
            setShowRowInDragOverlay(false);
            setActiveRowForOverlay(null);
            //document.body.style.cursor = '';
            if (!over || active.id === over.id) {
                const newItems = [...items];
                const addRowIndex = newItems.findIndex(row => row.rowId === 'addRow');
                if (addRowIndex !== -1) {
                    newItems.splice(addRowIndex, 1);
                }
                setItems(newItems);
                return
            };

            setItems((prev) => {
                // Проверяем, является ли over.id ID строки (rowId) или элемента
                const isOverRow = prev.some(row => row && String(row.rowId) === String(over.id));

                // Если over - это строка, находим первый элемент в этой строке
                let overElementId = over.id;
                if (isOverRow) {
                    const overRow = prev.find(row => row && String(row.rowId) === String(over.id));
                    if (!overRow || !overRow.children || !Array.isArray(overRow.children) || overRow.children.length === 0) return prev;
                    overElementId = overRow.children[0].id;
                }

                // Находим строки, содержащие активный и целевой элементы
                const activeRowIndex = prev.findIndex(row =>
                    row && row.children && Array.isArray(row.children) && row.children.some(child => child && child.id === active.id)
                );
                const overRowIndex = prev.findIndex(row =>
                    row && row.children && Array.isArray(row.children) && row.children.some(child => child && child.id === overElementId)
                );

                if (activeRowIndex === -1 || overRowIndex === -1) return prev;

                const activeRow = prev[activeRowIndex];
                const overRow = prev[overRowIndex];

                if (!activeRow || !overRow || !activeRow.children || !overRow.children) return prev;

                const activeElement = activeRow.children.find(child => child.id === active.id);
                const overElement = overRow.children.find(child => child.id === overElementId);
                const activeElemDropKey = activeElement.dropKey;
                const overElemDropKey = overElement.dropKey;


                // Если элементы в одной строке - сортируем внутри строки
                if (activeRowIndex === overRowIndex) {
                    const activeChildIndex = activeRow.children.findIndex(child => child && child.id === active.id);
                    const overChildIndex = overRow.children.findIndex(child => child && child.id === overElementId);

                    if (activeChildIndex === -1 || overChildIndex === -1) return prev;
                    if (activeChildIndex === overChildIndex) return prev;

                    const newItems = [...prev];
                    newItems[activeRowIndex] = {
                        ...activeRow,
                        children: arrayMove(activeRow.children, activeChildIndex, overChildIndex)
                    };

                    const addRowIndex = newItems.findIndex(row => row.rowId === 'addRow');
                    if (addRowIndex !== -1) {
                        newItems.splice(addRowIndex, 1);
                    }

                    // Сохраняем позиции в localStorage
                    setTimeout(() => {
                        saveDashboardSettings(newItems, visibilityMap);
                    }, 0);

                    return newItems;
                }


                // Если цель - новая строка, то создаем новую строку
                if (overRow.rowId === 'addRow') {
                    let newItems = [...prev];
                    const activeChildIndex = activeRow.children.findIndex(child => child.id === active.id);
                    if (activeChildIndex === -1) return prev;
                    newItems[activeRowIndex].children.splice(activeChildIndex, 1);
                    newItems[overRowIndex].children.splice(0, 1, activeElement);
                    newItems[overRowIndex].rowId = uuidv4();
                    setTimeout(() => {
                        saveDashboardSettings(newItems, visibilityMap);
                    }, 0);
                    return newItems;
                }





                // Проверяем, есть ли в строке элемент со span 12
                // Проверяем через CSS класс (group__fullWrapper = span 12) или через DOM


                const activeRowHasFullWidth = activeRow.children.some(child => child.dropKey === 'full');
                const overRowHasFullWidth = overRow.children.some(child => child.dropKey === 'full');

                // Если активная строка содержит элемент со span 12, меняем строки местами
                if (activeRowHasFullWidth || overRowHasFullWidth && activeRow.rowId !== 'addRow') {
                    const newItems = arrayMove(prev, activeRowIndex, overRowIndex);
                    const addRowIndex = newItems.findIndex(row => row.rowId === 'addRow');
                    if (addRowIndex !== -1) {
                        newItems.splice(addRowIndex, 1);
                    }
                    setTimeout(() => {
                        saveDashboardSettings(newItems);
                    }, 0);

                    return newItems;
                }


                // Если нет элементов на всю ширину и у элементов не совпадает dropKey, то меняем строки местами
                if (!activeRowHasFullWidth && !overRowHasFullWidth && activeElemDropKey !== overElemDropKey) {
                    const newItems = arrayMove(prev, activeRowIndex, overRowIndex);

                    const addRowIndex = newItems.findIndex(row => row.rowId === 'addRow');
                    if (addRowIndex !== -1) {
                        newItems.splice(addRowIndex, 1);
                    }
                    setTimeout(() => {
                        saveDashboardSettings(newItems);
                    }, 0);
                    return newItems;
                }

                // Если это два элемента с одинаковым dropKey, то добавляем активный элемент в целевую строку
                if (!activeRowHasFullWidth && !overRowHasFullWidth && activeElemDropKey === overElemDropKey) {
                    const newItems = [...prev];
                    const activeChildIndex = activeRow.children.findIndex(child => child.id === active.id);
                    const overChildIndex = overRow.children.findIndex(child => child.id === overElementId);
                    if (activeChildIndex === -1 || overChildIndex === -1) return prev;
                    newItems[overRowIndex].children.splice(overChildIndex, 0, activeElement);
                    newItems[activeRowIndex].children.splice(activeChildIndex, 1);

                    if (newItems[activeRowIndex].children.length === 0) {
                        newItems.splice(activeRowIndex, 1);
                    }

                    const addRowIndex = newItems.findIndex(row => row.rowId === 'addRow');
                    if (addRowIndex !== -1) {
                        newItems.splice(addRowIndex, 1);
                    }
                    setTimeout(() => {
                        saveDashboardSettings(newItems);
                    }, 0);
                    return newItems;
                }







                // Если элемент не на всю строку и целевой элемент совпадает по span, меняем элементы местами
                if (activeElemDropKey && overElemDropKey && activeElemDropKey === overElemDropKey && activeElemDropKey !== 'full') {
                    const newItems = [...prev];
                    const activeChildIndex = activeRow.children.findIndex(child => child.id === active.id);
                    const overChildIndex = overRow.children.findIndex(child => child.id === overElementId);

                    if (activeChildIndex === -1 || overChildIndex === -1) return prev;

                    // Меняем элементы местами между строками
                    const activeChild = activeRow.children[activeChildIndex];
                    const overChild = overRow.children[overChildIndex];

                    newItems[activeRowIndex] = {
                        ...activeRow,
                        children: [
                            ...activeRow.children.slice(0, activeChildIndex),
                            overChild,
                            ...activeRow.children.slice(activeChildIndex + 1)
                        ]
                    };

                    newItems[overRowIndex] = {
                        ...overRow,
                        children: [
                            ...overRow.children.slice(0, overChildIndex),
                            activeChild,
                            ...overRow.children.slice(overChildIndex + 1)
                        ]
                    };

                    const addRowIndex = newItems.findIndex(row => row.rowId === 'addRow');
                    if (addRowIndex !== -1) {
                        newItems.splice(addRowIndex, 1);
                    }

                    // Сохраняем позиции в localStorage
                    setTimeout(() => {
                        saveDashboardSettings(newItems, visibilityMap);
                    }, 0);

                    return newItems;
                }

                return prev;
            });
        },
    });
    // ------------------------------------------------------------------------------------------------
    // Если фильтры загружены и shopStatus не подходит, не рендерим
    if (!isFiltersLoading && !shopStatus?.is_primary_collect) return null;
    // ------------------------------------------------------------------------------------------------
    // Рендер
    return (
        <>
            <SortableContext items={items.map((i) => i.rowId)} strategy={rectSortingStrategy}>
                <div className={styles.page__mainContentWrapper} >
                    {items.map((row) => {
                        // Фильтруем children по isVisible
                        const visibleChildren = row.children ? row.children.filter(child => child.isVisible !== false) : [];
                        // Если в строке не осталось видимых элементов, не рендерим строку
                        if (visibleChildren.length === 0) return null;

                        return (
                            <SortableRow
                                key={row.rowId}
                                row={{ ...row, children: visibleChildren }}
                                items={items}
                                dataDashBoard={dataDashBoard}
                                loading={loading}
                                children={visibleChildren}
                                isOver={overId === String(row.rowId)}
                                isDraggingActive={!!activeId}
                                overId={overId}
                                activeId={activeId}
                                isOverValid={isOverValid}
                                isActiveSpan12={isActiveSpan12}
                                selectedRange={selectedRange}
                                activeBrand={activeBrand}
                                authToken={authToken}
                                filters={filters}
                                updateDataDashBoard={updateDataDashBoard}
                            />
                        );
                    })}
                </div >
            </SortableContext>
            <DragOverlay
                key={`${activeId}-${showRowInDragOverlay}-${dragOverlayContent?.type || 'none'}`}
                style={{ cursor: overId && isOverValid ? 'copy' : overId && !isOverValid ? 'not-allowed' : 'grabbing' }}
            >
                {(() => {


                    if (dragOverlayContent?.type === 'row' && dragOverlayContent.row && dragOverlayContent.row.children) {

                        return (
                            <div
                                style={{
                                    opacity: 0.25,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    backgroundColor: 'transparent',
                                    gap: '12px',
                                    width: `calc(100% * ${dragOverlayContent.row?.children?.filter(child => child.isVisible).length})`,
                                    maxWidth: `calc(100% * ${dragOverlayContent.row?.children?.filter(child => child.isVisible).length})`,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(12, 1fr)',
                                }}
                            >
                                {dragOverlayContent.row.children.map((bar) => bar.isVisible && (
                                    <div key={bar.id} className={bar.container} style={{ width: '100%', height: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', }}>
                                        {bar.render(bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard)}
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    if (dragOverlayContent?.type === 'item' && dragOverlayContent.item) {
                        console.log('Rendering ITEM');
                        return (
                            <div className={dragOverlayContent.item.container} style={{ opacity: 0.25, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', borderRadius: '16px', overflow: 'hidden' }}>
                                {dragOverlayContent.item.render(dragOverlayContent.item, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard)}
                            </div>
                        );
                    }

                    return null;
                })()}
            </DragOverlay>
        </>
    );
});

// Страница Дашборда
const _DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, shops } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const { isSidebarHidden } = useAppSelector((state) => state.utils);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [visibilityMap, setVisibilityMap] = useState(() => {
        const savedRows = loadDashboardSettings();
        // Извлекаем visibility из загруженных данных
        if (savedRows && Array.isArray(savedRows)) {
            const visibility = {};
            savedRows.forEach(row => {
                if (row.children && Array.isArray(row.children)) {
                    row.children.forEach(child => {
                        visibility[child.id] = child.isVisible !== undefined ? child.isVisible : true;
                    });
                }
            });
            return visibility;
        }
        return {};
    });
    const [pageState, setPageState] = useState({
        dataDashBoard: null,
        loading: true,
        primaryCollect: null,
        shopStatus: null,
        error: false
    });

    const saveSettingsRef = useRef(null);
    
    const handleSettingsOk = (newVisibilityMap) => {
        setVisibilityMap(newVisibilityMap);
        // Сохраняем видимость вместе с текущим порядком из items
        // Функция сохранения будет вызвана из MainContent с актуальными items
        if (saveSettingsRef.current) {
            saveSettingsRef.current(newVisibilityMap);
        }
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
        setPageState(prev => ({ ...prev, primaryCollect: activeBrand?.is_primary_collect }));
        if (activeBrand && activeBrand.is_primary_collect && !pageState.error && isFiltersLoaded) {
            setPageState(prev => ({ ...prev, primaryCollect: activeBrand?.is_primary_collect }));
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
                    {!pageState.loading &&
                        <button
                            className={styles.page__settingsButton}
                            onClick={() => setIsSettingsOpen(true)}
                            disabled={pageState.loading}
                        >
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.75 8.64276C13.75 11.1741 11.698 13.2261 9.16667 13.2261C6.63536 13.2261 4.58333 11.1741 4.58333 8.64276C4.58333 6.11146 6.63536 4.05943 9.16667 4.05943C11.698 4.05943 13.75 6.11146 13.75 8.64276ZM12.375 8.64276C12.375 10.4147 10.9386 11.8511 9.16667 11.8511C7.39475 11.8511 5.95833 10.4147 5.95833 8.64276C5.95833 6.87085 7.39475 5.43443 9.16667 5.43443C10.9386 5.43443 12.375 6.87085 12.375 8.64276Z" fill="#5329FF" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.78947 1.16259C2.9126 1.66885 2.61217 2.7901 3.11843 3.66697C3.68958 4.65624 2.97564 5.89284 1.83333 5.89284C0.82081 5.89284 0 6.71365 0 7.72617V9.5595C0 10.572 0.820812 11.3928 1.83333 11.3928C2.97564 11.3928 3.68959 12.6294 3.11844 13.6187C2.61218 14.4956 2.91261 15.6168 3.78948 16.1231L5.3772 17.0397C6.25407 17.546 7.37532 17.2456 7.88158 16.3687C8.45273 15.3794 9.88061 15.3794 10.4518 16.3687C10.958 17.2455 12.0793 17.546 12.9561 17.0397L14.5439 16.1231C15.4207 15.6168 15.7212 14.4955 15.2149 13.6187C14.6438 12.6294 15.3577 11.3928 16.5 11.3928C17.5125 11.3928 18.3333 10.572 18.3333 9.5595V7.72617C18.3333 6.71365 17.5125 5.89284 16.5 5.89284C15.3577 5.89284 14.6438 4.65625 15.2149 3.66698C15.7212 2.79011 15.4207 1.66886 14.5439 1.1626L12.9562 0.245933C12.0793 -0.260328 10.958 0.0401102 10.4518 0.91698C9.88062 1.90625 8.45272 1.90624 7.88157 0.916973C7.37531 0.040103 6.25406 -0.260335 5.37719 0.245926L3.78947 1.16259ZM4.30921 2.97947C4.18265 2.76026 4.25776 2.47994 4.47697 2.35338L6.06469 1.43671C6.28391 1.31015 6.56422 1.38526 6.69078 1.60447C7.79117 3.5104 10.5422 3.51043 11.6426 1.60448C11.7691 1.38526 12.0494 1.31015 12.2687 1.43672L13.8564 2.35338C14.0756 2.47995 14.1507 2.76026 14.0241 2.97948C12.9237 4.8854 14.2992 7.26784 16.5 7.26784C16.7531 7.26784 16.9583 7.47304 16.9583 7.72617V9.5595C16.9583 9.81263 16.7531 10.0178 16.5 10.0178C14.2992 10.0178 12.9237 12.4002 14.0241 14.3062C14.1507 14.5254 14.0756 14.8057 13.8564 14.9323L12.2686 15.8489C12.0494 15.9755 11.7691 15.9004 11.6425 15.6812C10.5422 13.7752 7.79118 13.7753 6.69079 15.6812C6.56423 15.9004 6.28391 15.9755 6.0647 15.8489L4.47698 14.9323C4.25777 14.8057 4.18266 14.5254 4.30922 14.3062C5.40962 12.4002 4.0341 10.0178 1.83333 10.0178C1.5802 10.0178 1.375 9.81263 1.375 9.5595V7.72617C1.375 7.47304 1.5802 7.26784 1.83333 7.26784C4.03413 7.26784 5.4096 4.8854 4.30921 2.97947Z" fill="#5329FF" />
                            </svg>
                        </button>
                    }
                </div>

                {activeBrand && !activeBrand.is_primary_collect && (
                    <DataCollectWarningBlock />
                )}

                <DndContext collisionDetection={pointerWithin}>
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
                        visibilityMap={visibilityMap}
                        onSaveSettings={(saveFn) => {
                            saveSettingsRef.current = saveFn;
                        }}
                    />
                </DndContext>

                <SettingsModal
                    isOpen={isSettingsOpen}
                    setIsOpen={setIsSettingsOpen}
                    onOk={handleSettingsOk}
                    barsConfig={barsConfig}
                />
            </section>
        </main>
    );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
