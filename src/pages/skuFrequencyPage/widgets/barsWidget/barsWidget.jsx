import { useEffect, useState } from 'react';
import styles from './barsWidget.module.css'
import Bar from '../../features/bar/bar';
import { useAppSelector } from '../../../../redux/hooks';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const BarsWidget = ({currentQuery}) => {
    const [queryDetailsData, setQueryDetailsData] = useState()
    const [ requestStatus, setRequestStatus ] = useState(initRequestStatus)

    const getQueryDetailsData = async (query) => {
        setRequestStatus({...initRequestStatus, isLoading: true})
        try {
            let res = await fetch(`https://radarmarket.ru/api/web-service/monitoring-oracle/query-details`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ query: query})
            })

            if (!res.ok) {
                setRequestStatus({...initRequestStatus, isError: true, message: 'Не удалось получить данные. Попробуйте обновить страницу.'})
            }
            //console.log(res)
            res = await res.json()
            setQueryDetailsData(res)
            setRequestStatus(initRequestStatus)

        } catch {
            setRequestStatus({...initRequestStatus, isError: true, message: 'Не удалось получить данные. Попробуйте обновить страницу.'})
        }
    }

    useEffect(() => {
        if (currentQuery) {
            getQueryDetailsData(currentQuery)
        }
    }, [currentQuery])

    if (requestStatus.isLoading || requestStatus.isError) {
        return (
            <section className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>

                <ErrorModal
                    open={requestStatus.isError}
                    message={requestStatus.message}
                    footer={null}
                    onOk={() => setRequestStatus(initRequestStatus)}
                    onClose={() => setRequestStatus(initRequestStatus)}
                    onCancel={() => setRequestStatus(initRequestStatus)}
                />
            </section>
        )
    }

    return queryDetailsData && (
        <section className={styles.widget}>
            <Bar.Medium title='Выручка (с СПП)' data={queryDetailsData.revenue} units='₽' />
            <Bar.Medium title='Ср. выручка в день' data={queryDetailsData.avg_day_revenue} units='₽' />
            <Bar.Medium title='Ср. цена (с СПП)' data={queryDetailsData.avg_price} units='₽' />
            <Bar.Medium title='Ср. выручка на товар с продажами' data={queryDetailsData.avg_goods_with_sales_revenue} units='₽' />
            <div className={styles.widget__largeBarWrapper}>
                <Bar.Large
                    icon='gold'
                    title='Статистика'
                    link={`https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(currentQuery)}`}
                    cols={2}
                    data={[
                        {title: 'Частотность WB', data: queryDetailsData.stats.frequency, units: '' },
                        {title: 'Кол-во товаров в ТОП-1200 за 30 дней', data: queryDetailsData.stats.top_goods_quantity, units: 'шт' },
                        {title: 'Кол-во продаж на 1 оценку за 30 дней у ТОП-30', data: queryDetailsData.stats.sales_per_review, units: 'шт' },
                        {title: 'Процент месячной выручки у ТОП-30', data: queryDetailsData.stats.monopoly_percent, units: '' },
                    ]}
                />
            </div>
            <div className={styles.widget__largeBarWrapper}>
                <Bar.Large
                    icon='green'
                    title='Товары, бренды и продавцы'
                    type='wide'
                    data={[
                        {title: 'Товары', data: queryDetailsData.brands_products_sellers.goods_quantity, units: 'шт'},
                        {title: 'Бренды', data: queryDetailsData.brands_products_sellers.brands_quantity, units: ''},
                        {title: 'Поставщики', data: queryDetailsData.brands_products_sellers.suppliers_quantity, units: ''},
                        {title: 'Товары с продажами', data: queryDetailsData.brands_products_sellers.goods_with_sales_quantity, units: 'шт'},
                        {title: 'Кол-во товаров на WB', data: queryDetailsData.brands_products_sellers.total_goods_quantity, units: 'шт'},
                        {title: 'Поставщики с продажами', data: queryDetailsData.brands_products_sellers.suppliers_with_sales_percent, units: '%'},
                    ]}
                />
            </div>
            <div className={styles.widget__smallBarsWrapper}>
                <Bar.Small title='Ср. рейтинг товаров' data={queryDetailsData.avg_rating} />
                <Bar.Small title='Ср. кол-во оценок' data={queryDetailsData.avg_reviews} />
                <Bar.Small title='Категории' data={queryDetailsData.subjects} />
            </div>
            
        </section>
    )
}

export default BarsWidget;

