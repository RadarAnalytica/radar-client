export const positionTrackingTableConfig = [
    {
        key: 'name',
        title: 'Товар',
        dataIndex: 'name',
        hidden: false,
    },
    {
        key: 'queries',
        title: 'Ключей',
        dataIndex: 'queries',
        hidden: false,
        width: 160,
        minWidth: 160,
    },
    {
        key: 'shows',
        title: 'Просмотров',
        dataIndex: 'shows',
        hidden: false,
        width: 160,
        minWidth: 160,
        tooltipText: 'Оценка потенциальных просмотров товара по конкретному запросу на основе позиции в выдаче. Значение моделируется через частотность и место в поиске и не является фактическим счётчиком просмотров.'
    },
    {
        key: 'place',
        title: 'Средняя позиция',
        dataIndex: 'place',
        hidden: false,
        width: 160,
        minWidth: 160,
    },
    {
        key: 'actions',
        title: '',
        dataIndex: 'actions',
        hidden: false,
        width: 50,
        minWidth: 50,
    },
]