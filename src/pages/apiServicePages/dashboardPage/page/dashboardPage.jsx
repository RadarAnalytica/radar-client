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
import TableSettingsModal from '@/components/TableSettingsModal';
import { v4 as uuidv4 } from 'uuid';
import { SmallButton } from '@/shared';
import { GeneralLayout } from '@/shared';
import { fileDownload } from '@/service/utils';
import DownloadButton from '@/components/DownloadButton';
import TableSettingsButton from '@/components/TableSettingsButton';
import { Link } from 'react-router-dom';
import { TaxModal } from '@/features';

// Контекст для передачи listeners и attributes в DragHandle
export const DragHandleContext = React.createContext(null);

const DASHBOARD_CONFIG_VER = '3';
const ROWS_STORAGE_KEY = 'dashboard_rows_config';
const BARS_STORAGE_KEY = 'dashboard_bars_config';

const rowsConfig = ['row-1', 'row-2', 'row-3', 'row-4', 'row-5', 'row-6', 'row-7', 'row-8'];

// Конфигурация строк и карточек
const barsConfig = [
    {
        id: 'bar-1',
        title: 'Чистая прибыль',
        isVisible: true,
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
        id: 'bar-4',
        title: 'Процент выкупа',
        isVisible: true,
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
                    absoluteValue: dataDashBoard?.prev_BuyoutPercent,
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
        id: 'bar-5',
        title: 'ROI',
        isVisible: true,
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
    {
        id: 'sec-orders',
        title: 'Заказы',
        isVisible: true,
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
        id: 'sec-rc-payments',
        title: 'Оплата на Р/С',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Оплата на Р/С'
                // tooltipText=''
                mainValue={dataDashBoard?.to_account_payment?.current}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.to_account_payment?.comparison,
                    absoluteValue: dataDashBoard?.to_account_payment?.previous,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        ),
    },
    {
        id: 'sec-returns',
        title: 'Возвраты',
        isVisible: true,
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
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Расходы на логистику'
                tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                mainValue={dataDashBoard?.logistics}
                hasColoredBackground
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Хранение'
                tooltipText='Расходы на хранение товаров на складах WB'
                mainValue={dataDashBoard?.storageData}
                hasColoredBackground
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Платная приемка'
                tooltipText='Услуга маркетплейса по проверке и приему вашего товара на склад'
                mainValue={dataDashBoard?.paid_acceptance}
                mainValueUnits='₽'
                isLoading={loading}
                hasColoredBackground
                negativeDirection='up'
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
        title: 'Комиссия + эквайринг',
        isVisible: true,
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
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Налог'
                mainValue={dataDashBoard?.tax_amount}
                mainValueUnits='₽'
                isLoading={loading}
                hasColoredBackground
                negativeDirection='up'
                midValue={<TaxModal updateDataDashBoard={updateDataDashBoard} />}
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Реклама (ДРР)'
                tooltipText='Показатель эффективности маркетинга - сумма рекламных затрат'
                mainValue={dataDashBoard?.advertAmount}
                mainValueUnits='₽'
                hasColoredBackground
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Штрафы и прочие удержания'
                tooltipText={'К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара'}
                mainValue={dataDashBoard?.penalty}
                midValue={<SmallButton title='Детализация' dataDashBoard={dataDashBoard} dataType='penalty' />}
                mainValueUnits='₽'
                hasColoredBackground
                negativeDirection='up'
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
        id: 'sec-opcosts',
        title: 'Операционные расходы',
        isVisible: true,
        dropKey: '1',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Операционные расходы'
                // tooltipText={''}
                mainValue={dataDashBoard?.operating_expenses}
                mainValueUnits='₽'
                isLoading={loading}
                hasColoredBackground
                negativeDirection='up'
                midValue={<Link className={styles.smallButton} target='_blank' to='/operating-expenses'>Изменить</Link>}
                compareValue={{
                    comparativeValue: dataDashBoard?.operating_expense_compare,
                }}
            />
        ),
    },
    {
        id: 'sec-compensation',
        title: 'Компенсации',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Компенсации'
                tooltipText='Выплаты от маркетплейса за брак, потерю или повреждение вашего товара на их складах, а также за нарушение сроков выплат'
                mainValue={dataDashBoard?.compensation}
                mainValueUnits='₽'
                isLoading={loading}
                hasColoredBackground
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Ср. стоимость логистики на 1 шт'
                tooltipText='Логистика на единицу проданного товара'
                mainValue={dataDashBoard?.logistic_per_one}
                mainValueUnits='₽'
                hasColoredBackground
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Средняя прибыль на 1 шт'
                tooltipText='Прибыль на единицу проданного товара'
                mainValue={dataDashBoard?.profit_per_one}
                mainValueUnits='₽'
                hasColoredBackground
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
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Упущенные продажи'
                tooltipText='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе'
                mainValue={dataDashBoard?.lostSalesAmount}
                mainValueUnits='₽'
                hasColoredBackground
                negativeDirection='up'
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
        dropKey: '1',
        rowId: 'row-3',
        isVisible: true,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Себестоимость проданных товаров'
                tooltipText='Суммарная себестоимость проданных товаров (основана на данных раздела "Себестоимость")'
                mainValue={dataDashBoard?.costPriceAmount}
                midValue={<Link className={styles.smallButton} to='/selfcost' target='_blank'>Изменить</Link>}
                mainValueUnits='₽'
                neuturalComparsionColor
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
        id: 'sec-revenue-bar',
        title: 'Выручка',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Выручка'
                tooltipText='Сумма, заработанная при продаже товаров'
                mainValue={dataDashBoard?.proceeds}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.proceedsCompare,
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
        id: 'sec-net-revenue-bar',
        title: 'Валовая прибыль',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Валовая прибыль'
                tooltipText='Разность между выручкой и себестоимостью продаж'
                mainValue={dataDashBoard?.grossProfit}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.grossProfitCompare,
                    absoluteValue: dataDashBoard?.prevGrossProfit,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    {
        id: 'sec-ebitda-bar',
        title: 'EBITDA',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='EBITDA'
                tooltipText='EBITDA — это показатель прибыли до вычета процентов, налогов, амортизации и износа, показывающий операционную рентабельность'
                mainValue={dataDashBoard?.ebitda}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.ebitda_compare,
                    absoluteValue: dataDashBoard?.prevEbitda,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    {
        id: 'sec-margin-ebitda-bar',
        title: 'Маржа EBITDA',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Маржа EBITDA'
                tooltipText='Маржа EBITDA — это процент от выручки, который остаётся после вычета операционных расходов, но до налогов, процентов и износа'
                mainValue={dataDashBoard?.ebitda_margin}
                mainValueUnits='%'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.ebitda_margin_compare,
                    absoluteValue: dataDashBoard?.prev_ebitda_margin,
                    absoluteValueUnits: '%',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    {
        id: 'sec-profitability-vp-bar',
        title: 'Рентабельность ВП',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Рентабельность ВП'
                tooltipText='Отношение валовой прибыли к суммарной выручке'
                mainValue={dataDashBoard?.grossProfitAbility}
                mainValueUnits='%'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.gross_profit_ability_compare,
                    absoluteValue: dataDashBoard?.prevGrossProfitAbility,
                    absoluteValueUnits: '%',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    {
        id: 'sec-profitability-op-bar',
        title: 'Рентабельность ОП',
        isVisible: true,
        dropKey: '1',
        rowId: 'row-3',
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <RadarBar
                title='Рентабельность ОП'
                tooltipText='Отношение операционной прибыли к суммарной выручке'
                mainValue={dataDashBoard?.operatingProfitAbility}
                mainValueUnits='%'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.operating_profit_ability_compare,
                    absoluteValue: dataDashBoard?.prevOperatingProfitAbility,
                    absoluteValueUnits: '%',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
                dragHandle={() => <DragHandle context={DragHandleContext} />}
            />
        ),
    },
    //row-4
    // {
    //     id: 'sec-finance',
    //     title: 'Финансы',
    //     dropKey: '2',
    //     isVisible: true,
    //     rowId: 'row-4',
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <FinanceBlock
    //             dataDashBoard={dataDashBoard}
    //             loading={loading}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },
    // {
    //     id: 'sec-profit',
    //     title: 'Прибыльность',
    //     dropKey: '2',
    //     isVisible: true,
    //     rowId: 'row-4',
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <ProfitBlock
    //             dataDashBoard={dataDashBoard}
    //             loading={loading}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },
    //row-5
    // {
    //     id: 'sec-tax-struct',
    //     title: 'Налог',
    //     isVisible: true,
    //     dropKey: '3',
    //     rowId: 'row-5',
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <TaxTableBlock
    //             loading={loading}
    //             dataDashBoard={dataDashBoard}
    //             updateDashboard={updateDataDashBoard}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },
    // {
    //     id: 'sec-revenue-struct',
    //     title: 'Структура выручки',
    //     isVisible: true,
    //     dropKey: '3',
    //     container: styles.group__doubleBlockWrapper,
    //     rowId: 'row-5',
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <RevenueStructChartBlock
    //             loading={loading}
    //             dataDashBoard={dataDashBoard}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },
    // {
    //     id: 'sec-margin-chart',
    //     title: 'Рентабельность и маржинальность',
    //     isVisible: true,
    //     dropKey: '3',
    //     container: styles.group__halfToFullWrapper,
    //     rowId: 'row-5',
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <MarginChartBlock
    //             loading={loading}
    //             dataDashBoard={dataDashBoard}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },

    //row-6
    {
        id: 'sec-storage',
        title: 'Склады',
        isVisible: true,
        dropKey: '4',
        rowId: 'row-6',
        container: styles.group__fullWrapper,
        render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
            <div className={styles.group__storageWrapper}>
                <StorageRevenueChartBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                    dragHandle={() => <DragHandle context={DragHandleContext} />}
                />
                <div className={styles.line}></div>
                <StorageBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                    dragHandle={() => <DragHandle context={DragHandleContext} />}
                />
            </div>

        ),
    },
    // {
    //     id: 'sec-storage-revenue-chart',
    //     title: 'Выручка по складам',
    //     isVisible: true,
    //     dropKey: '4',
    //     rowId: 'row-6',
    //     container: styles.group__halfToFullWrapper,
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <StorageRevenueChartBlock
    //             loading={loading}
    //             dataDashBoard={dataDashBoard}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },
    // {
    //     id: 'sec-storage',
    //     title: 'Склад',
    //     isVisible: true,
    //     dropKey: '4',
    //     rowId: 'row-6',
    //     container: styles.group__halfToFullWrapper,
    //     render: (bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData) => (
    //         <StorageBlock
    //             loading={loading}
    //             dataDashBoard={dataDashBoard}
    //             dragHandle={() => <DragHandle context={DragHandleContext} />}
    //         />
    //     ),
    // },
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
    const serializableConfig = items.map((item, index) => ({
        id: item.id,
        isVisible: item.isVisible,
        rowId: item.rowId,
        order: index // Сохраняем порядок элемента
    }));
    localStorage.setItem(BARS_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_CONFIG_VER, items: serializableConfig }));
};

const inferBarsConfig = (barsConfig, savedConfig, DASHBOARD_CONFIG_VER) => {
    if (!savedConfig) return barsConfig;
    const { version, items } = savedConfig;
    if (!version || !items) return barsConfig;
    if (version !== DASHBOARD_CONFIG_VER) return barsConfig;

    // Создаем карту для быстрого поиска сохраненных элементов
    const savedItemsMap = new Map(items.map(item => [item.id, item]));

    // Обновляем элементы с сохраненными значениями
    const updatedConfig = barsConfig.map(item => {
        const savedItem = savedItemsMap.get(item.id);
        if (savedItem) {
            // Мержим сохраненные значения, включая isVisible и order
            return { ...item, ...savedItem };
        }
        // Если элемент не найден в сохраненных, устанавливаем isVisible по умолчанию
        return { ...item, isVisible: item.isVisible !== false };
    });

    // Сортируем элементы согласно сохраненному порядку
    // Элементы с order идут в начале в правильном порядке, остальные - в конце
    return updatedConfig.sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : Infinity;
        const orderB = b.order !== undefined ? b.order : Infinity;
        return orderA - orderB;
    });
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
    stockAnalysisData,
    items,
    setItems,
}) => {
    const isLoading = loading || !isFiltersLoading; // Флаг загрузки данных

    // Если фильтры загружены и shopStatus не подходит, не рендерим
    if (!isFiltersLoading && !shopStatus?.is_primary_collect) return null;

    // Сортируем элементы: первые 4 включенных блока с dropKey === '1' должны быть первыми
    const sortedItems = React.useMemo(() => {
        // Находим первые 4 включенных блока с dropKey === '1' в исходном порядке
        const firstFourDropKey1 = [];
        const firstFourIds = new Set();

        for (const item of items) {
            if (item.dropKey === '1' && item.isVisible && firstFourDropKey1.length < 4) {
                firstFourDropKey1.push(item);
                firstFourIds.add(item.id);
            }
        }

        // Разделяем остальные элементы, сохраняя исходный порядок
        const restItems = items.filter(item => !firstFourIds.has(item.id));

        // Объединяем: первые 4 + остальные элементы в исходном порядке
        return [...firstFourDropKey1, ...restItems];
    }, [items]);

    // ------------------------------------------------------------------------------------------------
    // Рендер
    return (
        <>
            <div className={styles.page__mainContentWrapper} >
                {sortedItems.map((row) => {

                    if (row.container && row.isVisible) {
                        return (
                            <div className={row.container} key={row.id}>
                                {row.render(row, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData)}
                            </div>
                        );
                    }

                    if (!row.container && row.isVisible) {
                        return (
                            <React.Fragment key={row.id}>
                                {row.render(row, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData)}
                            </React.Fragment>
                        );
                    }
                })}
            </div >
        </>
    );
});

MainContent.displayName = 'MainContent';

// Страница Дашборда
const _DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, shops } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [stockAnalysisData, setStockAnalysisData] = useState([]);
    const [items, setItems] = useState(barsConfig);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [pageState, setPageState] = useState({
        dataDashBoard: null,
        loading: true,
        primaryCollect: null,
        shopStatus: null,
        error: false
    });
    const settingsItems = useMemo(() => {
        return items
            .filter((item) => item.dropKey === '1')
            .map((item) => ({
                ...item,
                id: item.id,
                title: item.title,
                isVisible: item.isVisible !== false,
            }));
    }, [items]);

    const originalSettingsItems = useMemo(() => {
        return barsConfig
            .filter((item) => item.dropKey === '1')
            .map((item) => ({
                ...item,
                id: item.id,
                title: item.title,
                isVisible: item.isVisible !== false,
            }));
    }, []);

    const handleSettingsSave = useCallback((updatedColumns) => {
        const updatedItems = updatedColumns.map((item) => ({
            ...item,
            isVisible: item.isVisible !== false,
        }));
        const updatedItemsMap = new Map(updatedItems.map((item) => [item.id, item]));
        const dropKey1Indices = [];
        items.forEach((item, index) => {
            if (item.dropKey === '1') {
                dropKey1Indices.push(index);
            }
        });
        const dropKey1IndexSet = new Set(dropKey1Indices);

        const mergedConfig = items.map((item) => {
            if (item.dropKey === '1' && updatedItemsMap.has(item.id)) {
                const updatedItem = updatedItemsMap.get(item.id);
                return { ...item, ...updatedItem, isVisible: updatedItem.isVisible !== false };
            }
            return item;
        });

        if (dropKey1Indices.length > 0 && updatedItems.length > 0) {
            const result = [];
            let dropKey1Index = 0;

            for (let i = 0; i < mergedConfig.length; i++) {
                if (dropKey1IndexSet.has(i)) {
                    if (dropKey1Index < updatedItems.length) {
                        const updatedItem = updatedItems[dropKey1Index];
                        result.push({ ...mergedConfig[i], ...updatedItem, isVisible: updatedItem.isVisible !== false });
                        dropKey1Index++;
                    }
                } else {
                    result.push(mergedConfig[i]);
                }
            }

            saveBarsConfig(result, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
            setItems(result);
            return;
        }

        saveBarsConfig(mergedConfig, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
        setItems(mergedConfig);
    }, [items]);

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

    const handleDownload = async () => {
        setDownloadLoading(true);
        try {
            const fileBlob = await ServiceFunctions.getDownloadDashboard(
                authToken,
                selectedRange,
                activeBrand.id,
                filters,
            );
            fileDownload(fileBlob, 'Сводка_продаж.xlsx');
        } catch (e) {
            console.error('Ошибка скачивания: ', e);
        } finally {
            setDownloadLoading(false);
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
        const savedBars = localStorage.getItem(BARS_STORAGE_KEY);
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
        <GeneralLayout
            headerProps={{
                title: 'Сводка продаж',
                howToLink: "https://radar.usedocs.com/article/75916",
                howToLinkText: "Как проверить данные?",
                hasShadow: false
            }}
        >
            <section className={styles.page__content}>
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
                        hasShopCreationLimit
                    />
                    <DownloadButton
                        handleDownload={handleDownload}
                        loading={pageState?.loading || downloadLoading}
                    />
                    <TableSettingsButton
                        onClick={() => setIsSettingsOpen(true)}
                        disabled={pageState.loading}
                        title='Настройка сводки продаж'
                    />
                </div>

                {activeBrand && !activeBrand.is_primary_collect && (
                    <DataCollectWarningBlock />
                )}
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
                    stockAnalysisData={stockAnalysisData}
                    items={items}
                    setItems={setItems}
                />

                <TableSettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    title="Настройка Сводки продаж"
                    items={settingsItems}
                    onSave={handleSettingsSave}
                    originalItems={originalSettingsItems}
                    idKey="id"
                    titleKey="title"
                    visibleKey="isVisible"
                />
            </section>
        </GeneralLayout>
    );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
