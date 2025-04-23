import React, { useState } from 'react'
import styles from './tableWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { Segmented, ConfigProvider } from 'antd';

const headerConfig = [
    'Дата',
    'Вручка, руб',
    'Заказы, шт',
    'Остатки на конец дня, шт',
    'Средняя цена без СПП, руб',
    'Общая скидка без СПП, %',
    'Количество отзывов на конец дня, шт',
    'Динамика рейтинга',
    'Коэффициент демпинга, %'
]


const TableWidget = ({ title, segments }) => {

    const [tabsState, setTabsState] = useState(segments && segments[0])

    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
                <div className={styles.widget__titleWrapper}>
                    {title &&
                        <p className={styles.widget__title}>{title}</p>
                    }
                    {tabsState && segments &&
                        <ConfigProvider
                            theme={{
                                token: {},
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
                                options={segments}
                                value={tabsState}
                                onChange={(value) => setTabsState(value)}
                            />
                        </ConfigProvider>
                    }
                </div>
                <DownloadButton />
            </div>

            <div className={styles.tableWrapper}>
                <div className={styles.table}>
                    <div className={styles.table__header}>
                        {headerConfig.map((i, id) => {

                            return (
                                <div className={styles.table__headerItem}>
                                    {i}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableWidget;