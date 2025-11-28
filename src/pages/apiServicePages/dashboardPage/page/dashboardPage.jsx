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
import { DndContext, pointerWithin, rectIntersection, useDndMonitor, DragOverlay, closestCenter, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
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

const DASHBOARD_CONFIG_VER = '1';
const ROWS_STORAGE_KEY = 'dashboard_rows_config';
const BARS_STORAGE_KEY = 'dashboard_bars_config';

const rowsConfig = ['row-1', 'row-2', 'row-3', 'row-4', 'row-5', 'row-6', 'row-7', 'row-8'];

// Конфигурация строк и карточек
const barsConfig = [
    {
        id: 'bar-1',
        title: 'Чистая прибыль',
        isVisible: true,
        container: styles.group__lgBarWrapperTop,
        dropKey: '1',
        rowId: 'row-1',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-1',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-1',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-1',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
    //row-2
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
        rowId: 'row-2',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <MainChart
                title='Заказы и продажи'
                loading={loading}
                dataDashBoard={dataDashBoard}
                selectedRange={selectedRange}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    //row-3
    {
        id: 'sec-orders',
        title: 'Заказы',
        isVisible: true,
        container: styles.group__lgBarWrapper,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bbar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
    //row-4
    {
        id: 'sec-finance',
        title: 'Финансы',
        dropKey: '2',
        isVisible: true,
        container: styles.group__halfWrapper,
        rowId: 'row-4',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-4',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <ProfitBlock
                dataDashBoard={dataDashBoard}
                loading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    //row-5
    {
        id: 'sec-tax-struct',
        title: 'Налог',
        isVisible: true,
        dropKey: '3',
        container: styles.group__doubleBlockWrapper,
        rowId: 'row-5',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-5',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        container: styles.group__halfToFullWrapper,
        rowId: 'row-5',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <MarginChartBlock
                loading={loading}
                dataDashBoard={dataDashBoard}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },

    //row-6
    {
        id: 'sec-storage-revenue-chart',
        title: 'Выручка по складам',
        isVisible: true,
        dropKey: '4',
        rowId: 'row-6',
        container: styles.group__halfToFullWrapper,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
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
        rowId: 'row-6',
        container: styles.group__halfToFullWrapper,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <StorageBlock
                loading={loading}
                dataDashBoard={dataDashBoard}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    //row-7
    {
        id: 'sec-stock-analysis',
        title: 'Анализ остатков',
        isVisible: true,
        container: styles.group__fullWrapper,
        dropKey: 'full',
        rowId: 'row-7',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <StockAnalysisBlock
                data={stockAnalysisData}
                dashboardLoading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    //row-8
    {
        id: 'sec-abc',
        title: 'ABC-анализ',
        isVisible: true,
        dropKey: 'full',
        container: styles.group__fullWrapper,
        rowId: 'row-8',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <AbcDataBlock
                titles={['Группа А', 'Группа В', 'Группа С']}
                data={dataDashBoard?.ABCAnalysis}
                loading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
]

const saveBarsConfig = (items, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER) => {
    const serializableConfig = items.map(item => ({id: item.id, isVisible: item.isVisible, rowId: item.rowId}));
    localStorage.setItem(BARS_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_CONFIG_VER, items: serializableConfig }));
}
const inferBarsConfig = (barsConfig, savedConfig, DASHBOARD_CONFIG_VER) => {
    if (!savedConfig) return barsConfig;
    const { version, items } = savedConfig;
    if (!version || !items) return barsConfig;
    if (version !== DASHBOARD_CONFIG_VER) return barsConfig;
    const updatedConfig = barsConfig.map(item => {
        const savedItem = items.find(i => i.id === item.id);
        if (savedItem) {
            // Мержим сохраненные значения, включая isVisible
            return { ...item, ...savedItem };
        }
        // Если элемент не найден в сохраненных, устанавливаем isVisible по умолчанию
        return { ...item, isVisible: item.isVisible !== false };
    })
    return updatedConfig;
}


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
    onSaveSettings,
    stockAnalysisData,
    rows,
    items,
    setItems,
    setRows
}) => {
    const isLoading = loading || !isFiltersLoading; // Флаг загрузки данных
    // const [rows, setRows] = useState(rowsConfig);
    // const [items, setItems] = useState(barsConfig);
    const [overId, setOverId] = useState(null); // ID целевого элемента
    const [overRowId, setOverRowId] = useState(null); // ID целевой строки
    const [activeId, setActiveId] = useState(null); // ID активного элемента
    const [activeRowId, setActiveRowId] = useState(null); // ID активной строки
    const tempItemsRef = useRef(null);
    const tempOverRowIdRef = useRef(null);

    useEffect(() => {
        // Восстанавливаем исходное состояние, если пользователь убрал мышь с целевой строки
        if (tempOverRowIdRef?.current &&
            tempItemsRef?.current &&
            tempOverRowIdRef.current !== overRowId &&
            activeId) { // Перетаскивание активно
            setItems([...tempItemsRef.current]); // Восстанавливаем исходное состояние
            tempItemsRef.current = null;
            tempOverRowIdRef.current = null;
        }
    }, [overRowId, activeId]); // Добавляем activeId в зависимости


    // ------------------------------------------------------------------------------------------------
    // Собственно логика днд
    useDndMonitor({
        onDragStart: ({ active }) => {
            tempItemsRef.current = [...items]
            const activeItem = items.find(item => item.id === active.id);
            const currentRow = rows.find(r => r === activeItem?.rowId);
            if (!activeItem || !currentRow) return;
            setActiveId(activeItem?.id);
            setActiveRowId(currentRow ?? null);

            if (activeItem.dropKey !== 'full') {
                const newRows = [...rows];
                const hasAddRow = newRows.some(row => row === 'addRow');
                const currRowItems = items.filter(item => item.rowId === currentRow);

                if (!hasAddRow && currRowItems.length > 1) {
                    const activeRowIndex = newRows.findIndex(r => r === currentRow);
                    if (activeRowIndex === -1) {
                        newRows.splice(0, 0, 'addRow');
                    } else {
                        newRows.splice(activeRowIndex + 1, 0, 'addRow');
                    }
                    setRows(newRows);
                }
            }
        },
        onDragOver: ({ active, over }) => {
            if (!over) return;
            const activeItem = items?.find(item => item.id === activeId);
            const isTargetIsRow = rows.some(r => r === over.id);
            let targetElem;
            let targetRow;
            if (isTargetIsRow) {
                targetRow = rows.find(r => r === over.id);
                setOverRowId(targetRow ?? null);
            } else {
                targetElem = items.find(item => item.id === over.id);
                setOverId(targetElem?.id ?? null);
                targetRow = targetElem?.rowId ?? null;
                setOverRowId(targetRow ?? null);
            }

            if (!targetRow && !targetElem) return;

            // 0 ------------------------------ Сортировка внутри строки на лету -----------------------------------------------------------
            if (targetRow !== activeRowId && targetElem && activeItem?.dropKey === targetElem?.dropKey && activeItem.dropKey !== 'full' && targetElem.dropKey !== 'full') {
                // Сохраняем исходное состояние ПЕРЕД первым изменением
                if (tempOverRowIdRef.current !== targetRow) {
                    // Это первое наведение на эту строку - сохраняем исходное состояние
                    if (!tempItemsRef.current) {
                        tempItemsRef.current = [...items];
                    }
                    tempOverRowIdRef.current = targetRow;
                }

                // Временно меняем rowId для визуальной сортировки
                const targetElemIndex = items.findIndex(item => item.id === targetElem?.id);
                const currElemIndex = items.findIndex(item => item.id === activeId);
                const arr = arrayMove(items, currElemIndex, targetElemIndex);
                const newItems = arr.map(item => {
                    if (item.id === activeId) {
                        return { ...item, rowId: targetRow }; // Временно меняем rowId
                    }
                    return item;
                })
                setItems(newItems);
            } else {
                // Если условия не выполняются, но мы были на целевой строке - восстанавливаем
                if (tempOverRowIdRef.current && tempOverRowIdRef.current !== targetRow) {
                    if (tempItemsRef.current) {
                        setItems([...tempItemsRef.current]);
                        tempItemsRef.current = null;
                        tempOverRowIdRef.current = null;
                    }
                }
            }
            // ----------------------------------------------------------------------------------------------------------------
        },
        onDragCancel: () => {
            // Восстанавливаем исходное состояние
            if (tempItemsRef?.current) {
                setItems([...tempItemsRef.current]);
                tempItemsRef.current = null;
                tempOverRowIdRef.current = null;
            }

            setActiveId(null);
            setActiveRowId(null);
            setOverId(null);
            setOverRowId(null);
            setRows(rows.filter(r => r !== 'addRow'));
        },
        onDragEnd: ({ active, over }) => {
            const activeItem = items?.find(item => item.id === activeId);
            const isTargetIsRow = rows?.some(r => r === over?.id);
            let targetElem;
            let targetRow;
            if (isTargetIsRow) {
                targetRow = rows?.find(r => r === over?.id);
                setOverRowId(targetRow ?? null);
            } else {
                targetElem = items?.find(item => item.id === over?.id);
                setOverId(targetElem?.id ?? null);
                targetRow = targetElem?.rowId ?? null;
                setOverRowId(targetRow ?? null);
            }
            // 0 ------------------------------ Сортировка внутри строки -----------------------------------------------------------
            if (targetRow === activeRowId && targetElem?.id !== activeId) {
                const newItems = [...items];
                const activeItemIndex = newItems.findIndex(item => item.id === activeId);
                const targetItemIndex = newItems.findIndex(item => item.id === targetElem?.id);
                if (activeItemIndex !== -1 && targetItemIndex !== -1) {
                    const arr = arrayMove(newItems, activeItemIndex, targetItemIndex);
                    setItems(arr);
                    saveBarsConfig(arr, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
                    tempItemsRef.current = null;
                    tempOverRowIdRef.current = null;

                    setActiveId(null);
                    setActiveRowId(null);
                    setOverId(null);
                    setOverRowId(null);
                    setRows(rows.filter(r => r !== 'addRow'));
                    return;
                }
            }
            // 1 ------------------------------ Cоздание новой строки --------------------------------------------------------------
            if (targetRow === 'addRow') {
                const newAddRowId = 'row-' + Date.now();
                const newRows = rows.map(row => {
                    if (row === 'addRow') {
                        return newAddRowId;
                    }
                    return row;
                })
                const newItems = items.map(item => {
                    if (item.id === activeId) {
                        return { ...item, rowId: newAddRowId };
                    }
                    return item;
                })


                setRows(newRows);
                localStorage.setItem(ROWS_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_CONFIG_VER, rows: newRows }));
                setItems(newItems);
                saveBarsConfig(newItems, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
                setActiveId(null);
                setActiveRowId(null);
                setOverId(null);
                setOverRowId(null);
                return;
            }
            // 2 ------------------------------ Перемещение элемента в другую строку (при дропе на элемент) ------------------------
            // TODO: Написать эту логику если можно будет когда-то перетаскивать разные элементы на строку (Сейчас по сути элемент встраивается в строку и отрабатывает вариант №0)

            // 3 ------------------------------ Перемещение большого элемента ------------------------------------------------------
            if (targetRow && targetRow !== activeRowId && activeItem.dropKey === 'full') {
                setRows(prevRows => {
                    const targetRowIndex = prevRows.findIndex(r => r === targetRow);
                    const activeRowIndex = prevRows.findIndex(r => r === activeRowId);

                    if (targetRowIndex !== -1 && activeRowIndex !== -1) {
                        const arr = arrayMove(prevRows, activeRowIndex, targetRowIndex);
                        localStorage.setItem(ROWS_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_CONFIG_VER, rows: arr.filter(r => r !== 'addRow') }));
                        return arr.filter(r => r !== 'addRow');
                    }
                    return prevRows.filter(r => r !== 'addRow');
                });

                tempItemsRef.current = null;
                tempOverRowIdRef.current = null;

                setActiveId(null);
                setActiveRowId(null);
                setOverId(null);
                setOverRowId(null);
                return;
            }
            // 4 ------------------------------ Перемещение на большой элемент ------------------------------------------------------
            if (targetElem && targetRow !== activeRowId && targetElem.dropKey === 'full') {

                setRows(prevRows => {
                    const targetRowIndex = prevRows.findIndex(r => r === targetRow);
                    const activeRowIndex = prevRows.findIndex(r => r === activeRowId);

                    if (targetRowIndex !== -1 && activeRowIndex !== -1) {
                        const arr = arrayMove(prevRows, activeRowIndex, targetRowIndex);
                        localStorage.setItem(ROWS_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_CONFIG_VER, rows: arr.filter(r => r !== 'addRow') }));
                        return arr.filter(r => r !== 'addRow');
                    }
                    return prevRows.filter(r => r !== 'addRow');
                });

                tempItemsRef.current = null;
                tempOverRowIdRef.current = null;

                setActiveId(null);
                setActiveRowId(null);
                setOverId(null);
                setOverRowId(null);
                return;
            }
            // 5 ------------------------------ Перемещение элементов с разными dropKey ---------------------------------------------
            if (targetElem && activeItem && targetRow !== activeRowId && activeItem.dropKey !== targetElem.dropKey && targetElem.dropKey !== 'full' && activeItem.dropKey !== 'full') {
                setRows(prevRows => {
                    const targetRowIndex = prevRows.findIndex(r => r === targetRow);
                    const activeRowIndex = prevRows.findIndex(r => r === activeRowId);

                    if (targetRowIndex !== -1 && activeRowIndex !== -1) {
                        const arr = arrayMove(prevRows, activeRowIndex, targetRowIndex);
                        localStorage.setItem(ROWS_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_CONFIG_VER, rows: arr.filter(r => r !== 'addRow') }));
                        return arr.filter(r => r !== 'addRow');
                    }
                    return prevRows.filter(r => r !== 'addRow');
                });

                tempItemsRef.current = null;
                tempOverRowIdRef.current = null;

                setActiveId(null);
                setActiveRowId(null);
                setOverId(null);
                setOverRowId(null);
                return;
            }
            // 6 ------------------------------ Перемещение элемента на строку ------------------------------------------------
            if (!targetElem && targetRow && targetRow !== activeRowId && activeItem.dropKey !== 'full') {
                const rowItems = items.filter(item => item.rowId === targetRow);
                const isSameDropKey = rowItems.length === 0 || rowItems.every(item => item.dropKey === activeItem.dropKey);
                if (isSameDropKey) {
                    // Находим индекс последнего элемента в целевой строке
                    let lastElemIndex = -1;
                    for (let i = items.length - 1; i >= 0; i--) {
                        if (items[i].rowId === targetRow) {
                            lastElemIndex = i;
                            break;
                        }
                    }

                    // Если строка пустая, добавляем в конец
                    const insertIndex = lastElemIndex !== -1 ? lastElemIndex + 1 : items.length;
                    const activeElemIndex = items.findIndex(item => item.id === activeId);

                    if (activeElemIndex !== -1) {
                        const arr = arrayMove(items, activeElemIndex, insertIndex);
                        const newItems = arr.map(item => {
                            if (item.id === activeId) {
                                return { ...item, rowId: targetRow };
                            }
                            return item;
                        })
                        setItems(newItems); // ИСПРАВЛЕНИЕ: используем newItems
                        saveBarsConfig(newItems, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
                        tempItemsRef.current = null;
                        tempOverRowIdRef.current = null;

                        setActiveId(null);
                        setActiveRowId(null);
                        setOverId(null);
                        setOverRowId(null);
                        setRows(rows.filter(r => r !== 'addRow'));
                        return;
                    }
                }
            }
            // ----------------------------------------------------------------------------------------------------------------

            tempItemsRef.current = null;
            tempOverRowIdRef.current = null;

            setActiveId(null);
            setActiveRowId(null);
            setOverId(null);
            setOverRowId(null);
            setRows(rows.filter(r => r !== 'addRow'));
        },
    });
    // ------------------------------------------------------------------------------------------------
    // Если фильтры загружены и shopStatus не подходит, не рендерим
    if (!isFiltersLoading && !shopStatus?.is_primary_collect) return null;
    // ------------------------------------------------------------------------------------------------
    // Рендер
    return (
        <>
            <SortableContext items={rows.map((i) => i)} strategy={rectSortingStrategy}>
                <div className={styles.page__mainContentWrapper} >
                    {rows.map((row) => {
                        const children = items?.filter(child => child.rowId === row);
                        // Фильтруем children по isVisible
                        const visibleChildren = children?.filter(child => child.isVisible);
                        // Если в строке не осталось видимых элементов, не рендерим строку
                        if (visibleChildren?.length === 0 && row !== 'addRow') return null;

                        return (
                            <SortableRow
                                key={row}
                                row={{ rowId: row, children: visibleChildren }}
                                items={items}
                                dataDashBoard={dataDashBoard}
                                loading={loading}
                                children={visibleChildren}
                                isDraggingActive={!!activeId}
                                overId={overId}
                                activeId={activeId}
                                selectedRange={selectedRange}
                                activeBrand={activeBrand}
                                authToken={authToken}
                                filters={filters}
                                activeRowId={activeRowId}
                                overRowId={overRowId}
                                updateDataDashBoard={updateDataDashBoard}
                                stockAnalysisData={stockAnalysisData}
                            />
                        );
                    })}
                </div >
            </SortableContext>
            {/* TODO: Добавить снэпшоты как dragImage чтобы не рендерить компоненты */}
            <DragOverlay
                style={{ cursor: (overId || overRowId) ? 'copy' : 'not-allowed' }}
            >
                <div className={items?.find(item => item.id === activeId)?.container} style={{ opacity: 0.25, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', borderRadius: '16px', overflow: 'hidden' }}>
                    {items?.find(item => item.id === activeId)?.render(items?.find(item => item.id === activeId), dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData)}
                </div>
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
    const [stockAnalysisData, setStockAnalysisData] = useState([]);
    const [rows, setRows] = useState(rowsConfig);
    const [items, setItems] = useState(barsConfig);
    const [pageState, setPageState] = useState({
        dataDashBoard: null,
        loading: true,
        primaryCollect: null,
        shopStatus: null,
        error: false
    });

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

    const fetchAnalysisData = async () => {
        try {
            const data = await ServiceFunctions.getAnalysisData(
                authToken,
                selectedRange,
                activeBrand?.id,
                filters
            );

            setStockAnalysisData(data);
        } catch (error) {
            console.error(error);
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
            fetchAnalysisData();
        }

        if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded) {
            setPageState(prev => ({ ...prev, loading: false }));
        }
    }, [activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup]);

    useEffect(() => {
        const savedRows = localStorage.getItem(ROWS_STORAGE_KEY);
        const savedBars = localStorage.getItem(BARS_STORAGE_KEY);
        if (savedRows) {
            const { version, rows } = JSON.parse(savedRows);
            if (!version || !rows) return;
            if (version !== DASHBOARD_CONFIG_VER) return;
            setRows(rows);
        }
        if (savedBars) {
            try {
                const parsed = JSON.parse(savedBars);
                const updatedConfig = inferBarsConfig(barsConfig, parsed, DASHBOARD_CONFIG_VER);
                setItems(updatedConfig);
            } catch (error) {
                console.error('Error parsing saved bars config:', error);
            }
        }   
    }, []);

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
                
                <DndContext
                >
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
                        stockAnalysisData={stockAnalysisData}
                        rows={rows}
                        items={items}
                        setItems={setItems}
                        setRows={setRows}
                    />
                </DndContext>

                <SettingsModal
                    isOpen={isSettingsOpen}
                    setIsOpen={setIsSettingsOpen}
                    BARS_STORAGE_KEY={BARS_STORAGE_KEY}
                    DASHBOARD_CONFIG_VER={DASHBOARD_CONFIG_VER}
                    items={items}
                    setItems={setItems}
                    onSave={saveBarsConfig}
                />
            </section>
        </main>
    );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
