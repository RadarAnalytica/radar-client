import { formatPrice } from "../../../../../service/utils";

export const sortTableDataFunc = (sortType, sortedValue, dataToSort) => {
    let sortedData = dataToSort;
    if (sortedValue === 'byRevenue' || sortedValue === 'byProfit') {
        if (sortType === 'ASC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof b[sortedValue] === 'number' && typeof a[sortedValue] === 'number') {
                    return b[sortedValue] - a[sortedValue]
                } else {
                    return b[sortedValue].localeCompare(a[sortedValue])
                }
            })
        }

        if (sortType === 'DESC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof b[sortedValue] === 'number' && typeof a[sortedValue] === 'number') {
                    return a[sortedValue] - b[sortedValue]
                } else {
                    return a[sortedValue].localeCompare(b[sortedValue])
                }
            })
        }
    } else {
        if (sortType === 'ASC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                    return a[sortedValue] - b[sortedValue]
                } else {
                    return a[sortedValue].localeCompare(b[sortedValue])
                }
            })
        }

        if (sortType === 'DESC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                    return b[sortedValue] - a[sortedValue]
                } else {
                    return b[sortedValue].localeCompare(a[sortedValue])
                }
            })
        }
    }

    return sortedData;
}

function sorter(a, b, key) {
	if (a.key == 'summary' || b.key == 'summary') {
		return 0;
	}

	let v1 = typeof a[key] == 'object' ? a[key]['rub'] : a[key];
	let v2 = typeof b[key] == 'object' ? b[key]['rub'] : b[key];

	return Number(v1 - v2);
}

const cellRender = (value, units) => {
    return (
        <div
            style={{

            }}
        >
            {formatPrice(value, units || '')}
        </div>
    )
}

function SortIcon({ sortOrder }) {
	return (
		<svg
			width="24"
			height="16"
			viewBox="0 0 24 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			// style={{ marginLeft: 10, marginRight: 10 }}
			//className={styles.sortIcons}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
				fill={sortOrder === 'ascend' ? '#5329FF' : 'currentColor'}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill={sortOrder === 'descend' ? '#5329FF' : 'currentColor'}
			/>
		</svg>
	);
}


export const SALES_TABLE_CONFIG = [
	{title: 'Дата',dataIndex: 'date',fixed: 'left',width: 360,sorter: (a, b) => sorter(a, b, 'date'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Продажи',dataIndex: 'sales',width: 360,sorter: (a, b) => sorter(a, b, 'sales'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Сумма продаж',dataIndex: 'sales_revenue',width: 360,sorter: (a, b) => sorter(a, b, 'sales_revenue'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Возвраты, шт',dataIndex: 'returns',units: 'шт',width: 360,sorter: (a, b) => sorter(a, b, 'returns'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Логистика к клиенту',dataIndex: 'logistics_to_client',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'logistics_to_client'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Логистика от клиента',dataIndex: 'logistics_from_client',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'logistics_from_client'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Штрафы',dataIndex: 'fees',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'fees'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Комиссия',dataIndex: 'comission',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'comission'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Маржинальная прибыль',dataIndex: 'marginality_profit',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'marginality_profit'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
];
export const ORDERS_TABLE_CONFIG = [
	{title: 'Дата',dataIndex: 'date',fixed: 'left',width: 360,sorter: (a, b) => sorter(a, b, 'date'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Заказы',dataIndex: 'orders',width: 360,sorter: (a, b) => sorter(a, b, 'orders'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Сумма продаж',dataIndex: 'sales_revenue',width: 360,sorter: (a, b) => sorter(a, b, 'sales_revenue'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Возвраты, шт',dataIndex: 'returns',units: 'шт',width: 360,sorter: (a, b) => sorter(a, b, 'returns'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Логистика к клиенту',dataIndex: 'logistics_to_client',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'logistics_to_client'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Логистика от клиента',dataIndex: 'logistics_from_client',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'logistics_from_client'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Штрафы',dataIndex: 'fees',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'fees'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Комиссия',dataIndex: 'comission',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'comission'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
	{title: 'Маржинальная прибыль',dataIndex: 'marginality_profit',units: '₽',width: 360,sorter: (a, b) => sorter(a, b, 'marginality_profit'),render: function (value) {const { units } = this;return cellRender(value, units)},sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />},
];
