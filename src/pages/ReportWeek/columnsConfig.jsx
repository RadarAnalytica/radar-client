import { SortIcon } from '../../components/sharedComponents/ReportTable/ReportTable';
import { formatPrice } from '../../service/utils';
import { Tooltip, Flex } from 'antd';

function summaryRender(value, row) {
	if (row.key == 'summary') {
		return (
			<Flex justify="space-between">
				{value}:
				<Tooltip title="Суммарные показатели за период">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="0.75"
							y="0.75"
							width="18.5"
							height="18.5"
							rx="9.25"
							stroke="black"
							strokeOpacity="0.1"
							strokeWidth="1.5"
						/>
						<path
							d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z"
							fill="#1A1A1A"
							fillOpacity="0.5"
						/>
					</svg>
				</Tooltip>
			</Flex>
		);
	}
	// console.log('summaryRender', row)
	return value.rub || value;
}

function arrowRender(value, literal) {
	let status = 'table__arrow_static';
	if (value > 0) {
		status = 'table__arrow_positive';
	}
	if (value < 0) {
		status = 'table__arrow_negative';
	}
	return (
		<span className={`table__arrow ${status}`}>
			{formatPrice(value, literal)}
			{ !!value && <svg
				width="16"
				height="12"
				viewBox="0 0 20 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z"
					fill="currentColor"
				></path>
			</svg> }
		</span>
	);
}

function sorter(a, b, key) {
	if (a.key == 'summary' || b.key == 'summary') {
		return 0;
	}

	let v1 = typeof a[key] == 'object' ? a[key]['rub'] : a[key];
	let v2 = typeof b[key] == 'object' ? b[key]['rub'] : b[key];

	return Number(v1 - v2);
}

export const COLUMNS = [
	{title: 'Неделя', dataIndex: 'week_label', fixed: true, width: 360, minWidth: 360, sortable: false,},
	{title: 'Выкупы, руб', dataIndex: 'purchases_rub', sortable: true, width: 240, minWidth: 240, tooltipText: 'Сумма проданных товаров с учетом согласованной скидки продавца'},
	{title: 'Выкупы, руб', dataIndex: 'purchases_quantity', sortable: true, width: 240, minWidth: 240, tooltipText: 'Кол-во проданных товаров (с возвратами)'},
	{title: 'Возвраты, руб',dataIndex: 'return_rub',sortable: true, width: 240, minWidth: 240},
	{title: 'Возвраты, шт', dataIndex: 'return_quantity', sortable: true, width: 240, minWidth: 240},
	{title: 'Продажи', dataIndex: 'sales', sortable: true, width: 240, minWidth: 240, tooltipText: 'Кол-во проданных товаров (без возвратов)', unit: 'шт',},
	{title: 'Выручка',dataIndex: 'gains',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма реализации товара с учетом согласованной скидки продавца',units: '₽',},
	{title: 'Ср. цена продажи',dataIndex: 'avg_check',sortable: true,width: 240,minWidth: 240,units: '₽',},
	{title: 'СПП',dataIndex: 'avg_spp',sortable: true,width: 240,minWidth: 240,units: '%',},
	{title: 'Выкуп',dataIndex: 'purchase_percent',sortable: true,width: 240,minWidth: 240,units: '%',},
	{title: 'Себестоимость',dataIndex: 'cost_price',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма проданных товаров с учетом согласованной скидки продавца',units: '₽',},
	{title: 'Себестоимость на единицу',dataIndex: 'cost_price_per_one',sortable: true,width: 350,minWidth: 350,units: '₽',},
	{title: 'Компенсации брака',dataIndex: 'compensation_defects_rub',sortable: true,width: 350,minWidth: 350,tooltipText: 'Сумма компенсаций брака',units: '₽',},
	{title: 'Кол-во брака',dataIndex: 'compensation_defects_quantity',sortable: true,width: 240,minWidth: 240,tooltipText: 'Кол-во брака',units: 'шт',},
	{title: 'Компенсации ущерба',dataIndex: 'compensation_damage',sortable: true,width: 350,minWidth: 350,tooltipText: 'Сумма компенсаций ущерба',units: '₽',},
	{title: 'Кол-во ущерба',dataIndex: 'compensation_damage_quantity',sortable: true,width: 240,minWidth: 240,tooltipText: 'Кол-во ущерба',units: 'шт',},
	{title: 'Штрафы',dataIndex: 'penalties',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма штрафов',units: '₽',},
	{title: 'Доплаты',dataIndex: 'additional_payments',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма доплат',units: '₽',},
	{title: 'Хранение',dataIndex: 'storage',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма хранения',units: '₽',},
	{title: 'Реклама',dataIndex: 'advert_amount',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма рекламы',units: '₽',},
	{title: 'ДРР',dataIndex: 'drr',sortable: true,width: 240,minWidth: 240,tooltipText: 'ДРР',units: '%',},
	{title: 'Платная приёмка',dataIndex: 'acceptance',sortable: true,width: 300,minWidth: 300,tooltipText: 'Сумма платной приёмки',units: '₽',},
	{title: 'Все удержания WB',dataIndex: 'wb_retentions_amount',sortable: true,width: 300,minWidth: 300,tooltipText: 'Сумма всех удержаний WB',units: '₽',},
	{title: 'СПП + WB реализовал',dataIndex: 'sold_by_wb',sortable: true,width: 340,minWidth: 340,tooltipText: 'Сумма реализованных товаров СПП + WB',units: '₽',},
	{title: 'Налоговая база',dataIndex: 'tax_base',sortable: true,width: 240,minWidth: 240,tooltipText: 'Налоговая база',units: '₽',},
	{title: 'Налог',dataIndex: 'tax',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма налога',units: '₽',},
	{title: 'Оплата на Р/С',dataIndex: 'payment',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма оплаты на Р/С',units: '₽',},
	{title: 'Чистая прибыль',dataIndex: 'profit',sortable: true,width: 240,minWidth: 240,tooltipText: 'Сумма чистой прибыли',units: '₽',},
	{title: 'Чистая прибыль на единицу',dataIndex: 'profit_per_one',sortable: true,width: 340,minWidth: 340,tooltipText: 'Сумма чистой прибыли на единицу',units: '₽',},
	{title: 'Маржинальность по прибыли',dataIndex: 'marginality',sortable: true,width: 400,minWidth: 400,tooltipText: 'Маржинальность по прибыли',units: '%',},
	{title: 'ROI',dataIndex: 'return_on_investment',sortable: true,width: 240,minWidth: 240,tooltipText: 'ROI',units: '%',},
].map(_ => ({
	..._,
	hidden: false,
	maxWidth: _.width * 2,
	key: _.dataIndex,
}))