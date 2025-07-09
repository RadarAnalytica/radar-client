import { useEffect } from "react"
import { useAppDispatch } from "../../../../redux/hooks"
import { cellRender } from "./cellRender"
import { Tooltip, ConfigProvider } from "antd"
import { actions as reqActions } from "../../../../redux/requestsMonitoring/requestsMonitoringSlice"

const tooltipConfig = {
    "Рейтинг качества ниши": 'Показатель рассчитывается исходя из значений выручки, коэффициента спроса, монопольности, рекламы, % выкупа и других параметров.',
    "Коэффициент cпроса": 'Показатель, который отражает соотношение между частотностью поискового запроса и количеством товаров, предлагаемых по этому запросу. Чем выше коэффициент спроса, тем больше интерес аудитории к данной тематике и тем меньше конкуренция среди продавцов. Данный показатель рассчитывается по формуле: Частотность WB / Кол-во товаров на WB.',
    "Монопольность, %": 'Процент выручки, приходящийся на ТОП-30 артикулов от всех артикулов на первой странице.',
    "Артикулов в рекламе, %": 'Расчетное среднее значение за 30 дней',
    "Артикулов с внешним трафиком, %": 'Расчетное среднее значение за 30 дней',
    "Средняя цена, ₽": 'Расчетное среднее значение за 30 дней',
    "Артикулов с продажами, %": 'Расчетное среднее значение за 30 дней'

}
const getTitleWithTooltip = (title) => {
    return (
        <>
            {title}
            <ConfigProvider
                theme={{
                    token: {
                        colorTextLightSolid: 'black',
                    }
                }}
            >
                <Tooltip
                    title={tooltipConfig[title]}
                    arrow={false}
                    color='white'
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8, cursor: 'pointer' }}>
                        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                        <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                </Tooltip>
            </ConfigProvider>
        </>
    )
}
export const newTableConfig = [
    // Main column: Поисковые запросы
    {
        title: '',
        className: 'first__cell',
        hidden: false,
        children: [
            {
                sortDirections: ['ASC', 'DESC'],
                className: 'first__cell',
                title: 'Поисковые запросы',
                dataIndex: 'query',
                fixed: 'left',
                width: 370,
                sorter: true,
                sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> },
                filterOptions: true,
                render: function (value) { return cellRender(value, this) },
                hidden: false,
                //sortOrder: 'ascend'
            },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'Основные',
        className: 'table__mainHeader',
        hidden: false,
        children: [
            {sortDirections: ['ASC', 'DESC'], title: getTitleWithTooltip('Рейтинг качества ниши'), dataIndex: 'niche_rating', width: 300, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Выручка (с СПП), ₽', dataIndex: 'revenue_total', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Ср. выручка в день, ₽', dataIndex: 'avg_daily_revenue', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Ср. цена (с СПП), ₽', dataIndex: 'avg_price_total', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Товаров с продажами, шт', dataIndex: 'goods_with_sales_quantity_total', units: 'шт', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Ср. выручка на товар, ₽', dataIndex: 'avg_revenue_total', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Ср. выручка на товар с продажами, ₽', dataIndex: 'avg_with_sales_revenue', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Товаров с продажами, %', dataIndex: 'goods_with_sales_percent_total', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Ср. рейтинг', dataIndex: 'avg_rating', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Продавцов с продажами, %', dataIndex: 'suppliers_with_sales_percent', units: '%', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Кол-во товаров на WB, шт', dataIndex: 'goods_quantity', units: 'шт', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Кол-во продавцов, шт', dataIndex: 'suppliers_quantity', width: 220,units: 'шт', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: getTitleWithTooltip('Коэффициент cпроса'), dataIndex: 'freq_per_good', width: 300, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Частотность за 30 дней', dataIndex: 'frequency_30', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Частотность за 60 дней', dataIndex: 'frequency_60', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Частотность за 90 дней', dataIndex: 'frequency_90', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            // { title: '% выручки у ТОП-30 товаров, %', dataIndex: 'monopoly_percent', width: 220,  units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            //{title: 'Ср. кол-во оценок, %', dataIndex: 'avg_reviews', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
        ].map(_ => ({ ..._, render: _.render.bind(_), sortIcon: _.sortIcon.bind(_) }))
    },
    {
        title: 'Динамика популярности и роста запросов',
        className: 'table__mainHeader_colored',
        hidden: false,
        children: [
            {sortDirections: ['ASC', 'DESC'], className: 'cell__red', title: 'Динамика запроса за 30 дней, %', dataIndex: 'g30', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], className: 'cell__red', title: 'Динамика запроса за 60 дней, %', dataIndex: 'g60', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], className: 'cell__red', title: 'Динамика запроса за 90 дней, %', dataIndex: 'g90', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'Дополнительные параметры',
        className: 'table__mainHeader',
        hidden: false,
        children: [
            {sortDirections: ['ASC', 'DESC'], title: 'Процент выкупа, %', dataIndex: 'buyout_percent', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            //{title: 'Частотность за 30 дней', dataIndex: 'frequency_30', width: 220, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title:  getTitleWithTooltip('Монопольность, %'), dataIndex: 'monopoly_percent', width: 300, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            //{title: 'Кол-во артикулов по запросу, шт', dataIndex: 'goods_quantity', width: 220,  units: 'шт', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Кол-во товаров в ТОП-1200 за 30 дней, шт', dataIndex: 'top_goods_quantity', width: 220, units: 'шт', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            //{title: 'Комиссия FBO, %', dataIndex: 'fbo_commision', width: 220,  units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'У артикулов на первой странице',
        className: 'table__mainHeader_colored',
        hidden: false,
        children: [
            {sortDirections: ['ASC', 'DESC'], className: 'cell__red', title: getTitleWithTooltip('Артикулов в рекламе, %'), dataIndex: 'advert_percent', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], className: 'cell__red', title: getTitleWithTooltip('Артикулов с внешним трафиком, %'), dataIndex: 'external_advert_percent', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], className: 'cell__red', title: 'Среднее кол-во отзывов у артикулов (без учета внутренней рекламы WB), шт', dataIndex: 'avg_reviews', width: 220, units: 'шт', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'У артикулов на первых 3-х страницах',
        className: 'table__mainHeader',
        hidden: false,
        children: [
            {sortDirections: ['ASC', 'DESC'], title: 'Выручка за 30 дней, ₽', dataIndex: 'revenue_300', width: 220, units: '₽', filterOptions: true, sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, render: function (value) { return cellRender(value, this) }, hidden: false, comment: 'У артикулов на первых 3-х страницах' },
            {sortDirections: ['ASC', 'DESC'], title: 'Средняя выручка за 30 дней, ₽', dataIndex: 'avg_revenue_300', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: 'Упущенной выручки за 30 дней, %', dataIndex: 'lost_revenue_percent_300', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
            {sortDirections: ['ASC', 'DESC'], title: getTitleWithTooltip('Средняя цена, ₽'), dataIndex: 'avg_price_300', width: 220, units: '₽', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false, comment: 'У артикулов на первых 3-х страницах' },
            {sortDirections: ['ASC', 'DESC'], title: getTitleWithTooltip('Артикулов с продажами, %'), dataIndex: 'goods_with_sales_percent_300', width: 220, units: '%', sorter: true, sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> }, filterOptions: true, render: function (value) { return cellRender(value, this) }, hidden: false },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    }
]
//.map(_ => ({ ..._, render:  _.render ? _.render.bind(_) : undefined }));
//getTitleWithTooltip('')

const getTitle = (item) => {
    let title = ''

    if (item.dataIndex === 'niche_rating') {
        title = 'Рейтинг качества ниши'
        return title;
    }
    if (item.dataIndex === 'freq_per_good') {
        title = 'Коэффициент cпроса'
        return title;
    }
    if (item.dataIndex === 'monopoly_percent') {
        title = 'Монопольность'
        return title;
    }
    if (item.dataIndex === 'advert_percent') {
        title = 'Артикулов в рекламе, %'
        return title;
    }
    if (item.dataIndex === 'external_advert_percent') {
        title = 'Артикулов с внешним трафиком, %'
        return title;
    }
    if (item.dataIndex === 'avg_price_300') {
        title = 'Средняя цена, руб'
        return title;
    }
    if (item.dataIndex === 'goods_with_sales_percent_300') {
        title = 'Артикулов с продажами, %'
        return title;
    }

    title = item.title

    if (item.comment) {
        title = title + ' ' + `(${item.comment})`
    }
    return title
}


const tableSettingsArr = () => {
    return newTableConfig.map(config => config.children.map(child => ({
        title: getTitle(child),
        dataIndex: child.dataIndex,
        isActive: !child.hidden,
        isFilterParam: child.dataIndex !== 'query'
    })));
}

export const tableSettings = tableSettingsArr().flat()





function SortIcon({ sortOrder, ctx }) {
    // console.log(ctx)
    //const dispatch = useAppDispatch()


    // useEffect(() => {
    //     const order = sortOrder === 'ascend' ? 'ASC' : sortOrder === 'descend' ? 'DESC' : '';
    //     if (!order) {
    //         dispatch(reqActions.updateRequestObject({ sorting: {sort_field: 'niche_rating', sort_order: 'DESC'}}))
    //         return
    //     }
    //     const obj = {
    //         sort_field: ctx.dataIndex,
    //         sort_order: order,
    //     }
    //     dispatch(reqActions.updateRequestObject({ sorting: obj, page: 1, limit: 25 }))
    // }, [sortOrder])

    return (
        <button
            style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8C8C8C'
            }}
        >
                <svg
                    width="24"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                // style={{ marginLeft: 10, marginRight: 10 }}
                //className={styles.sortIcons}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
                        fill={sortOrder === 'ASC' ? '#5329FF' : 'currentColor'}
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
                        fill={sortOrder === 'DESC' ? '#5329FF' : 'currentColor'}
                    />
                </svg>
        </button>
    );
}





/**
 * {
        title: 'Неделя',
        dataIndex: 'week_label',
        fixed: 'left',
        width: 360,
        render: summaryRender,
    },
    {
        title: 'Выкупы, руб',
        dataIndex: 'purchases_rub',
        sorter: (a, b) => sorter(a, b, 'purchases'),
        sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> },
        filterOptions: true,
        render: (value) => (
            <div>
                {formatPrice(value)}
            </div>
        ),
        width: 240,
    },
    {
        title: 'Выкупы, шт',
        dataIndex: 'purchases_quantity',
        sorter: (a, b) => sorter(a, b, 'purchases'),
        sortIcon: function ({ sortOrder }) { return <SortIcon sortOrder={sortOrder} ctx={this} /> },
        filterOptions: true,
        render: (value) => (
            <div>
                {formatPrice(value)}
            </div>
        ),
        width: 240,
    },
 */