export const positionCheckTableConfig = [
    {
        key: 'query',
        title: 'Название',
        dataIndex: 'query',
        hidden: false,
        width: 385,
        minWidth: 385,
    },
    {
        key: 'frequency',
        title: 'Частота',
        dataIndex: 'frequency',
        hidden: false,
        width: 160,
        minWidth: 160,
        sortable: true,
    },
    {
        key: 'total_goods',
        title: 'Товаров',
        dataIndex: 'total_goods',
        hidden: false,
        width: 160,
        minWidth: 160,
    },
    {
        key: 'complexity',
        title: 'Сложность',
        dataIndex: 'complexity',
        hidden: false,
        width: 160,
        minWidth: 160,
    },
    {
        key: 'shows',
        title: 'Просмотры/мес',
        dataIndex: 'shows',
        hidden: false,
        width: 160,
        minWidth: 160,
    },
    {
        key: 'serp',
        title: '',
        dataIndex: 'serp',
        hidden: false,
        units: '₽',
        width: 160,
        minWidth: 160,
    },
]


export const innerTableConfig = [
    {
        key: 'name',
        title: 'Товар',
        dataIndex: 'name',
        hidden: false,
        width: 385,
        minWidth: 385,
    },
    {
        key: 'shows',
        title: 'Просмотры/мес',
        dataIndex: 'shows',
        hidden: false,
    },
    {
        key: 'feedbacks',
        title: 'Отзывы',
        dataIndex: 'feedbacks',
        hidden: false,
    },
    {
        key: 'rating',
        title: 'Рейтинг товара',
        dataIndex: 'rating',
        hidden: false,
    },
    {
        key: 'price',
        title: 'Цена',
        dataIndex: 'price',
        hidden: false,
    },
   
    {
        key: 'number',
        title: '№ в выдаче',
        dataIndex: 'number',
        hidden: false,
    },
]