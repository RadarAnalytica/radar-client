export const positionTrackingSkuTableConfig = [
    {
        key: 'query',
        title: 'Название',
        dataIndex: 'query',
        hidden: false,
        width: 250,
        fixed: true,
    },
    {
        key: 'frequency',
        title: 'Частота',
        dataIndex: 'frequency',
        hidden: false,
        width: 100,
        fixed: true,
        sortable: true,
    },
    {
        key: 'total_goods',
        title: 'Товаров',
        dataIndex: 'total_goods',
        hidden: false,
        width: 100,
        fixed: true,
    },
].map(_ => ({ ..._, minWidth: _.width, maxWidth: _.width * 2 }))