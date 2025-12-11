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

export const CURR_REPORT_WEEK_COLUMNS_CONFIG_VER = '13';

export const COLUMNS = [
	{title: 'Неделя', dataIndex: 'week_label', fixed: true, width: 200, minWidth: 200, sortable: false},
	{title: 'Выкупы, руб', dataIndex: 'purchases_rub', sortable: true, width: 170, minWidth: 170, tooltipText: 'Сумма проданных товаров с учетом согласованной скидки продавца'},
	{title: 'Выкупы, шт', dataIndex: 'purchases_quantity', sortable: true, width: 150, minWidth: 150, tooltipText: 'Кол-во проданных товаров (с возвратами)'},
	{title: 'Возвраты, руб', dataIndex: 'return_rub', sortable: true, width: 150, minWidth: 150, tooltipText: 'Сумма возвращённых товаров.'},
	{title: 'Возвраты, шт', dataIndex: 'return_quantity', sortable: true, width: 150, minWidth: 150, tooltipText: 'Количество возвращённых товаров.'},
	{title: 'Продажи', dataIndex: 'revenue_quantity', sortable: true, width: 150, minWidth: 150, tooltipText: 'Кол-во проданных товаров (без возвратов)', units: 'шт',},
	{title: 'Выручка', dataIndex: 'revenue_rub', sortable: true, width: 150, minWidth: 150, tooltipText: 'Сумма реализации товара с учетом согласованной скидки продавца', units: '₽',},
	{title: 'Ср. цена продажи', dataIndex: 'avg_check', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Средняя цена одного проданного товара. Формула: Выручка / Продажи'},
	{title: 'СПП', dataIndex: 'avg_spp', sortable: true, width: 150, minWidth: 150, units: '%', tooltipText: 'Скидка покупателю за счёт маркетплейса. Формула: Сумма(Цена до СПП – ВБ Реализовал) / Выручка × 100%'},
	{title: 'Выкуп', dataIndex: 'purchase_percent', sortable: true, width: 150, minWidth: 150, units: '%', tooltipText: 'Процент выкупа. Формула: (Продажи / Доставки) × 100%'},
	{title: 'Себестоимость', dataIndex: 'cost_price', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма себестоимостей проданных товаров.'},
	{title: 'Себестоимость на единицу', dataIndex: 'cost_price_per_one', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Себестоимость одной проданной единицы. Формула: Себестоимость / Продажи'},
	{title: 'Кол-во доставок', dataIndex: 'deliveries', sortable: true, width: 150, minWidth: 150, units: 'шт', tooltipText: 'Количество прямых доставок.'},
	{title: 'Комиссии', dataIndex: 'wb_commission_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Комиссия маркетплейса. Формула: Выручка за единицу – «К перечислению» – Эквайринг + Корректировка эквайринга'},
	{title: 'Эквайринг', dataIndex: 'acquiring_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Стоимость эквайринга. Формула: Эквайринг – Корректировка эквайринга'},
	{title: 'Логистика доставок', dataIndex: 'logistics_straight_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Логистика прямых доставок.'},
	{title: 'Логистика возвратов', dataIndex: 'logistics_reverse_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Логистика обратных доставок.'},
	{title: 'Логистика итого', dataIndex: 'logistics_total_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Общая логистика. Формула: Логистика доставок + Логистика возвратов'},
	{title: 'Логистика на единицу', dataIndex: 'logistics_per_product', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Логистика на одну проданную единицу. Формула: Логистика итого / Продажи'},
	{title: 'Компенсации брака', dataIndex: 'compensation_defects_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма компенсаций за брак.'},
	{title: 'Кол-во брака', dataIndex: 'compensation_defects_quantity', sortable: true, width: 150, minWidth: 150, units: 'шт', tooltipText: 'Количество случаев брака.'},
	{title: 'Компенсации ущерба', dataIndex: 'compensation_damage_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма компенсаций за ущерб.'},
	{title: 'Кол-во ущерба', dataIndex: 'compensation_damage_quantity', sortable: true, width: 150, minWidth: 150, units: 'шт', tooltipText: 'Количество случаев ущерба.'},
	{title: 'Штрафы и прочие удержания', dataIndex: 'penalties', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара'},
	{title: 'Доплаты', dataIndex: 'additional_payments', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма доплат.'},
	{title: 'Хранение', dataIndex: 'storage_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма платного хранения.'},
	{title: 'Реклама', dataIndex: 'advert_amount', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Расходы на рекламу.'},
	{title: 'ДРР', dataIndex: 'drr', sortable: true, width: 150, minWidth: 150, units: '%', tooltipText: 'Доля рекламы в выручке. Формула: (Реклама / Выручка) × 100%'},
	{title: 'Платная приёмка', dataIndex: 'acceptance_rub', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма платной приёмки.'},
	{title: 'Все удержания WB', dataIndex: 'wb_retentions_amount', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма всех удержаний. Формула: Комиссия + Логистика + Хранение + Штрафы + Платная приемка + Реклама'},
	{title: 'СПП + WB реализовал', dataIndex: 'sold_by_wb', sortable: true, width: 150, minWidth: 150, tooltipText: 'Сумма реализации товара с учетом согласованной скидки продавца и СПП', units: '₽',},
	{title: 'Налоговая база', dataIndex: 'tax_base', sortable: true, width: 150, minWidth: 150, units: '₽'},
	{title: 'Налог', dataIndex: 'tax', sortable: true, width: 150, minWidth: 150, units: '₽'},
	{title: 'Оплата на Р/С', dataIndex: 'payment', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Сумма к перечислению на расчётный счет. Формула: [Продажи до СПП] – [Комиссия] – [Эквайринг] + [Корректировка эквайринга] + [Компенсации] – [Штрафы] – [Корректировка вознаграждения ВБ] – [Платная приемка] – [Удержания] – [Логистика]'},
	{title: 'Чистая прибыль', dataIndex: 'profit', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Прибыль после всех вычетов. Формула: Оплата на РС – Себестоимость продаж – Налог'},
	{title: 'Чистая прибыль на единицу', dataIndex: 'profit_per_one', sortable: true, width: 150, minWidth: 150, units: '₽', tooltipText: 'Чистая прибыль на одну проданную единицу. Формула: Чистая прибыль / Продажи'},
	{title: 'Маржинальность по прибыли', dataIndex: 'marginality', sortable: true, width: 150, minWidth: 150, units: '%', tooltipText: 'Рентабельность по чистой прибыли. Формула: (Чистая прибыль / Выручка) × 100%'},
	{title: 'ROI', dataIndex: 'return_on_investment', sortable: true, width: 150, minWidth: 150, units: '%', tooltipText: 'Возврат на инвестиции. Формула: (Чистая прибыль / Удержания) × 100%. Удержания: Себестоимость продаж + Реклама + Логистика + Штрафы – Компенсации + Комиссия + Хранение'},
].map(_ => ({
	..._,
	hidden: false,
	minWidth: _.width / 2,
	maxWidth: _.width * 2,
	key: _.dataIndex,
	units: _.dataIndex !== 'week_label' && !_.units ? ' ' : _.units,
	style: {
		fontFamily: 'Manrope, Mulish, Arial, sans-serif'
	}
}));
