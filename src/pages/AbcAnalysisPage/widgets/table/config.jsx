// import { SortIcon } from '../../components/sharedComponents/ReportTable/ReportTable';
import { SortIcon } from '../../../../components/sharedComponents/ReportTable/ReportTable';
import styles from '../../AbcAnalysisPage.module.css';
import { Tooltip } from 'antd';
import { formatPrice } from '../../../../service/utils';

const renderItem = (_, row) => (
	<div
		className="table-row-image"
		style={{
			color: '#5329FF',
			display: 'flex', // Use flexbox for layout
			alignItems: 'center', // Center align items vertically
			gap: 8,
		}}
	>
		<div
			style={{
				width: '30px',
				height: '40px',
				borderRadius: '5px',
				backgroundColor: '#D3D3D3',
				flexGrow: 0,
				flexShrink: 0,
			}}
		>
			{row.photo ? (
				<img
					src={row.photo}
					alt={row.title}
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '5px',
						objectFit: 'cover',
					}}
					onError={(e) => {
						e.target.style.backgroundColor = '#D3D3D3';
						e.target.alt = '';
						e.target.src =
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
					}}
				/>
			) : null}
		</div>
    <div>
      <Tooltip title={row.title}>{row.title}</Tooltip>
      </div>
	</div>
);

const renderCategeoy = (value) => {
	let className = styles.category__icon + ' ';
	if (value === 'A') {
		className += styles.category__icon_green;
	}
	if (value === 'B') {
		className += styles.category__icon_yellow;
	}
	if (value === 'C') {
		className += styles.category__icon_red;
	}
	return <span className={className}>{value}</span>;
};

const renderNumber = (value) => {
  return formatPrice(value);
};

const renderCell = (value) => {
	return <Tooltip title={value}>{value}</Tooltip>;
};

function sorter(column, a, b) {
	console.log(a);
	console.log(b);
	console.log(column);
  if (column === 'category'){
    console.log(b[column].localeCompare(a[column]));
    return a[column].localeCompare(b[column]);
  }
  return a[column] - b[column];
}


export const COLUMNS = [
	{
		dataIndex: 'item',
		key: 'item',
		title: 'Товар',
		render: renderItem,
    	width: '20%',
	},
	{
		dataIndex: 'tech_size',
		key: 'tech_size',
		title: 'Размер',
		width: '150px',
    	ellipsis: true,
	},
	{
		dataIndex: 'supplier_id',
		key: 'supplier_id',
		title: 'Артикул поставщика',
    	ellipsis: true,
	},
	{
		dataIndex: 'wb_id',
		key: 'wb_id',
		title: 'Артикул',
    	ellipsis: true,
	},
	{
		dataIndex: 'amount',
		key: 'amount',
		title: 'Прибыль || Выручка',
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		sorter: true,
		render: formatPrice,
		ellipsis: true,
	},
	{
		dataIndex: 'amount_percent',
		key: 'amount_percent',
		title: 'Доля выручки || Доля прибыли',
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		sorter: true,
		render: formatPrice,
		ellipsis: true,
	},
	{
		dataIndex: 'marginality',
		key: 'marginality',
		title: 'Маржинальность',
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		sorter: true,
		render: (value) => formatPrice(value, '%'),
		ellipsis: true,
	},
	{
		dataIndex: 'roi',
		key: 'roi',
		title: 'ROI',
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		sorter: true,
		render: (value) => formatPrice(value, '%'),
		ellipsis: true,
	},
	// {
	// 	dataIndex: 'gmroi',
	// 	key: 'gmroi',
	// 	title: 'GMROI',
	// 	sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
	// 	sorter: true,
	// 	render: (value) => formatPrice(value, '%'),
	// 	ellipsis: true,
	// 	onlyView: 'profit',
	// },
	{
		dataIndex: 'logistics',
		key: 'logistics',
		title: 'Логистика',
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		sorter: true,
		render: formatPrice,
		ellipsis: true,
	},
	{
		dataIndex: 'category',
		key: 'category',
		title: 'Категория',
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
    	sorter: true,
    	// sorter: (a, b, direction) => sorter('category', a, b, direction),
		render: renderCategeoy,
    	ellipsis: true,
	},
];
