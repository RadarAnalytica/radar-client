import { useState } from 'react'
import styles from './dashboardWidget.module.css'
import { Bars, MainChart, TableFT } from '../../features'
import { Link } from 'react-router-dom'
import { Segmented, ConfigProvider } from 'antd'
import { SALES_TABLE_CONFIG, ORDERS_TABLE_CONFIG } from '../../shared'




const chartBarMockData = [10, 20, 30, 20, 15, 40, 30, 20, 0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 30, 30, 30, 40, 40, 40, 20, 20, 20, 20, 0, 0, 0, 0]

const initTabs = ['Продажи по дням', 'Заказы по дням']

const DashboardWidget = () => {

    const [tabsState, setTabsState] = useState('Продажи по дням')

    return (
        <div className={styles.widget}>
            <div className={styles.widget__paddingWrapper}>
                <div className={`${styles.widget__layout} ${styles.widget__layout_4cols}`}>
                    <Bars.MainBar
                        title='Продажи'
                        icon='blue'
                        data={[
                            { amount: 35678, amountUnits: '₽', rate: 23997.78, rateUnits: '₽' },
                            { amount: 117, amountUnits: 'шт', rate: 115, rateUnits: 'шт' },
                        ]}
                    />
                    <Bars.MainBar
                        title='Себестоимость проданных товаров'
                        icon='green'
                        data={[
                            { amount: 13000, amountUnits: '₽', rate: 14383, rateUnits: '₽' },
                        ]}
                        footer={
                            <Link
                                to='/selfcost'
                                className={styles.widget__barFooterLink}
                            >
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18.5C4.0293 18.5 0 14.4707 0 9.5C0 4.5293 4.0293 0.5 9 0.5C13.9707 0.5 18 4.5293 18 9.5C18 14.4707 13.9707 18.5 9 18.5ZM9 16.7C10.9096 16.7 12.7409 15.9414 14.0912 14.5912C15.4414 13.2409 16.2 11.4096 16.2 9.5C16.2 7.59044 15.4414 5.75909 14.0912 4.40883C12.7409 3.05857 10.9096 2.3 9 2.3C7.09044 2.3 5.25909 3.05857 3.90883 4.40883C2.55857 5.75909 1.8 7.59044 1.8 9.5C1.8 11.4096 2.55857 13.2409 3.90883 14.5912C5.25909 15.9414 7.09044 16.7 9 16.7ZM9 5.045L13.455 9.5L9 13.955L4.545 9.5L9 5.045ZM9 7.5911L7.0911 9.5L9 11.4089L10.9089 9.5L9 7.5911Z" fill="#5329FF" />
                                </svg>

                                Установить себестоимость
                            </Link>
                        }
                    />
                    <Bars.MainBar
                        title='Возвраты'
                        icon='red'
                        data={[
                            { amount: 35678, amountUnits: '₽', rate: -23997.78, rateUnits: '₽' },
                            { amount: 117, amountUnits: 'шт', rate: -115, rateUnits: 'шт' },
                        ]}
                    />
                    <div className={`${styles.widget__layout} ${styles.widget__layout_3rows}`}>
                        <Bars.SimpleBar title='Штрафы WB' amount={0} units='₽' />
                        <Bars.SimpleBar title='Доплаты WB' amount={0} units='₽' />
                        <Bars.SimpleBar title='Комиссия WB' amount={4675} units='₽' />
                    </div>
                </div>

                <div className={`${styles.widget__layout} ${styles.widget__layout_3cols}`}>
                    <Bars.RateBar title='Расходы на логистику к клиенту' amount={4558} amountUnits='₽' rate={1370} rateUnits='₽' />
                    <Bars.RateBar title='Расходы на логистику к клиенту' amount={4558} amountUnits='₽' rate={1370} rateUnits='₽' />
                    <Bars.RateBar title='Расходы на логистику к клиенту' amount={4558} amountUnits='₽' rate={1370} rateUnits='₽' />
                </div>

                <div className={`${styles.widget__layout} ${styles.widget__layout_2cols}`}>
                    <Bars.TableBar
                        title='Товарный остаток'
                        data={[
                            { title: 'На складе продавца', amount: 65, amountUnits: 'шт', summary: 120000, summaryUnits: '₽', isRate: false },
                            { title: 'На складе WB', amount: 65, amountUnits: 'шт', summary: 120000, summaryUnits: '₽', isRate: false },
                        ]}
                    />
                    <Bars.TableBar
                        title='Заказы'
                        data={[
                            { title: 'Сумма', amount: 5600, amountUnits: '₽', summary: 12383, summaryUnits: '₽', isRate: true },
                            { title: 'Количество', amount: 10, amountUnits: 'шт', summary: -2, summaryUnits: 'шт', isRate: true },
                        ]}
                    />
                </div>

                <div className={`${styles.widget__layout} ${styles.widget__layout_3cols}`}>
                    <Bars.ChartBar
                        title='Процент выкупа'
                        amount={92.3}
                        amountUnits='%'
                        hasChart
                        chartData={chartBarMockData}
                    />
                    <Bars.ChartBar
                        title='Маржинальность'
                        amount={32.3}
                        amountUnits='%'
                        rate={12}
                        rateUnits='%'
                        isRate
                        hasChart
                        chartData={chartBarMockData}
                    />
                    <Bars.ChartBar
                        title='Упущенные продажи'
                        amount={1330}
                        amountUnits='₽'
                        rate={5}
                        rateUnits='шт'
                    />
                </div>

                <MainChart />

                <ConfigProvider
                    theme={{
                        token: {
                            fontSize: '18px'
                        },
                        components: {
                            Segmented: {
                                itemActiveBg: '#E7E1FE',
                                itemSelectedBg: '#E7E1FE',
                                trackBg: 'transparent',
                                itemColor: '#1A1A1A80',
                                itemHoverBg: 'transparent',
                                itemHoverColor: '#1A1A1A',
                                itemSelectedColor: '#1A1A1A',
                                trackPadding: 0
                            }
                        }
                    }}
                >
                    <Segmented
                        size='large'
                        options={initTabs}
                        value={tabsState}
                        onChange={(value) => setTabsState(value)}
                    />
                </ConfigProvider>
            </div>
            {tabsState === 'Продажи по дням' && <TableFT CONFIG={SALES_TABLE_CONFIG} />}
            {tabsState === 'Заказы по дням' && <TableFT CONFIG={ORDERS_TABLE_CONFIG} />}
        </div>
    )
}

export default DashboardWidget