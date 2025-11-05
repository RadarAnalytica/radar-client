import React from "react";
import MobilePlug from "@/components/sharedComponents/mobilePlug/mobilePlug";
import styles from "./KeywordsSelectionPage.module.css";
import Sidebar from "@/components/sharedComponents/sidebar/sidebar";
import Header from "@/components/sharedComponents/header/header";
import { SearchBlock } from "@/features";
import ErrorModal from "@/components/sharedComponents/modals/errorModal/errorModal";
import { useState } from "react";
import { ConfigProvider, Segmented } from "antd";
import DownloadButton from "@/components/DownloadButton";
import { DoubleTable, KeywordSelectionFilters } from "@/widgets";
import ReactDOM from 'react-dom/client';
import { formatPrice } from "@/service/utils";


// model
const requestInitState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// antd segmented theme
const segmentedTheme = {
    token: {
        fontSize: 12,
        fontWeight: 500,
    },
    components: {
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
        }
    }
}


const mockChartData = [
    {
        name: 'Кластер 1',
        value: 100
    },
    {
        name: 'Кластер 2',
        value: 200
    },
    {
        name: 'Кластер 3',
        value: 300
    },
    {
        name: 'Кластер 4',
        value: 400
    },
    {
        name: 'Кластер 5',
        value: 500
    },
    {
        name: 'Кластер 6',
        value: 600
    },
    {
        name: 'Кластер 7',
        value: 700
    },
    {
        name: 'Кластер 8',
        value: 800
    },
    {
        name: 'Кластер 9',
        value: 900
    },
    {
        name: 'Кластер 10',
        value: 1000
    },
    {
        name: 'Кластер 11',
        value: 1100
    },
    {
        name: 'Кластер 12',
        value: 1200
    },
    {
        name: 'Кластер 13',
        value: 1300
    },
    {
        name: 'Кластер 14',
        value: 1400
    },
    {
        name: 'Кластер 15',
        value: 1500
    },
    {
        name: 'Кластер 16',
        value: 1600
    },
    {
        name: 'Кластер 17',
        value: 1700
    },
    {
        name: 'Кластер 18',
        value: 1800
    },
    {
        name: 'Кластер 19',
        value: 1900
    },
    {
        name: 'Кластер 20',
        value: 2000
    },
    {
        name: 'Кластер 21',
        value: 2100
    },
    {
        name: 'Кластер 22',
        value: 2200
    },
    {
        name: 'Кластер 23',
        value: 2300
    },
    {
        name: 'Кластер 24',
        value: 2400
    },
    {
        name: 'Кластер 25',
        value: 2500
    },
    {
        name: 'Кластер 26',
        value: 2600
    },
    {
        name: 'Кластер 27',
        value: 2700
    },
    {
        name: 'Кластер 28',
        value: 2800
    },
    {
        name: 'Кластер 29',
        value: 2900
    },
    {
        name: 'Кластер 30',
        value: 3000
    },
    {
        name: 'Кластер 31',
        value: 3100
    },
    {
        name: 'Кластер 32',
        value: 3200
    },
    {
        name: 'Кластер 33',
        value: 3300
    },
    {
        name: 'Кластер 34',
        value: 3400
    },
    {
        name: 'Кластер 35',
        value: 3500
    },
    {
        name: 'Кластер 36',
        value: 3600
    },
    {
        name: 'Кластер 37',
        value: 3700
    },
    {
        name: 'Кластер 38',
        value: 3800
    },
    {
        name: 'Кластер 39',
        value: 3900
    },
    {
        name: 'Кластер 40',
        value: 4000
    },
    {
        name: 'Кластер 41',
        value: 4100
    },
    {
        name: 'Кластер 42',
        value: 4200
    },
    {
        name: 'Кластер 43',
        value: 4300
    },
    {
        name: 'Кластер 44',
        value: 4400
    },
    {
        name: 'Кластер 45',
        value: 4500
    },
    {
        name: 'Кластер 46',
        value: 4600
    },
]


// comp
const PositionCheckPage = () => {
    const [requestStatus, setRequestStatus] = useState(requestInitState);
    const [tabsState, setTabsState] = useState<'Обычный поиск по частичному совпадению' | 'Поиск по полному совпадению'>('Обычный поиск по частичному совпадению');
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [requestObject, setRequestObject] = useState<Record<string, any>>();

    const submitHandler = (value: string) => {
        console.log('formData', value);
    };


    const chartRender = () => {
        const sortedData = [...mockChartData].sort((a, b) => b.value - a.value);

        // Параметры сетки
        const totalRows = 8;
        const totalCols = 100;
        const firstItemColSpan = 32;
        const remainingCols = totalCols - firstItemColSpan; // 68 колонок для остальных элементов

        // Вычисляем общую сумму значений для остальных элементов (без первого)
        const remainingItems = sortedData.slice(1);
        const totalRemainingValue = remainingItems.reduce((sum, item) => sum + item.value, 0);

        // Трекинг позиций для размещения элементов
        let currentCol = firstItemColSpan + 1; // Начинаем с колонки 33
        let currentRow = 1;

        return sortedData.map((item, idx) => {
            if (idx === 0) {
                // Первый элемент занимает всю высоту и первые 32 колонки
                return (
                    <div
                        className={styles.page__chartItem}
                        key={item.name}
                        style={{
                            backgroundColor: '#5329FF1A',
                            borderRadius: '8px',
                            gridRow: `1 / ${totalRows + 1}`,
                            gridColumn: `1 / ${firstItemColSpan + 1}`,
                        }}
                    />
                );
            }

            // Вычисляем размер элемента пропорционально его значению
            const valueRatio = item.value / totalRemainingValue;
            let colSpan = Math.max(1, Math.round(remainingCols * valueRatio));

            // Определяем сколько рядов занимает элемент (равномерно распределяем)
            const rowsPerItem = Math.max(1, Math.floor(totalRows / remainingItems.length));
            let rowSpan = rowsPerItem;

            // Проверяем, помещается ли элемент в текущую позицию
            if (currentCol + colSpan > totalCols + 1) {
                // Переходим на новую строку
                currentRow += rowSpan;
                currentCol = firstItemColSpan + 1;

                // Если вышли за пределы сетки, корректируем
                if (currentRow > totalRows) {
                    currentRow = totalRows;
                    rowSpan = 1;
                }
            }

            // Проверяем, не выходим ли за пределы сетки
            if (currentRow + rowSpan > totalRows + 1) {
                rowSpan = totalRows + 1 - currentRow;
            }
            if (currentCol + colSpan > totalCols + 1) {
                colSpan = totalCols + 1 - currentCol;
            }

            const result = (
                <div
                    className={styles.page__chartItem}
                    key={item.name}
                    style={{
                        backgroundColor: '#5329FF1A',
                        borderRadius: '8px',
                        gridRow: `${currentRow} / ${currentRow + rowSpan}`,
                        gridColumn: `${currentCol} / ${currentCol + colSpan}`,
                    }}
                />
            );

            // Обновляем позицию для следующего элемента
            currentCol += colSpan;

            // Если достигли конца строки, переходим на следующую
            if (currentCol > totalCols) {
                currentRow += rowSpan;
                currentCol = firstItemColSpan + 1;
            }

            return result;
        });
    }

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header
                        title='Подбор ключевых запросов'
                        titlePrefix={null}
                        children={null}
                        videoReviewLink={null}
                        howToLink={null}
                        howToLinkText={null}
                        hasShadow={false}
                    />
                </div>
                {/* !header */}
                <div className={styles.page__searchBlockWrapper}>
                    <p className={styles.page__searchBlockTitle}>Введите один или несколько запросов, каждый с новой строки или через запятую</p>
                    <ConfigProvider theme={segmentedTheme}>
                        <Segmented options={['Обычный поиск по частичному совпадению', 'Поиск по полному совпадению']} size='large' value={tabsState} onChange={(value) => setTabsState(value as 'Обычный поиск по частичному совпадению' | 'Поиск по полному совпадению')} />
                    </ConfigProvider>
                    <SearchBlock
                        submitHandler={submitHandler}
                        hasBackground={false}
                        placeholder='Введите ключевые слова'
                        searchButtonText='Подобрать'
                        layout='vertical'
                        lines={3}
                        style={{ padding: '0' }}
                    />
                </div>

                {/* Filters */}
                <div className={styles.page__filtersWrapper}>
                    <KeywordSelectionFilters submitHandler={(formData) => { setRequestObject(formData); }} />
                </div>
                {/* Table */}
                <div className={styles.page__tableWrapper}>
                    <ConfigProvider theme={segmentedTheme}>
                        <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                    </ConfigProvider>
                    <div className={styles.page__summary}>
                        <p className={styles.page__summaryItem}>Найдено ключей: <span>65</span></p>
                        <p className={styles.page__summaryItem}>Кластеров: <span>15</span></p>
                    </div>
                    <div className={styles.page__chart}>
                        <div
                            className={styles.page__chartItem}
                            style={{
                                backgroundColor: '#5329FF1A',
                                borderRadius: '8px',
                                gridRow: `span 8`,
                                gridColumn: `span 20`,
                            }}
                        >
                            <p className={styles.page__chartItemTitle}>Кластеры</p>
                            <p className={styles.page__chartItemValue}>{formatPrice(1000000, '')}</p>
                        </div>
                        {Chart().map(_ => (
                            <React.Fragment key={_.name}>
                                {_}
                            </React.Fragment>
                        ))}
                    </div>

                    <DoubleTable />
                </div>
            </section>
            {/* ---------------------- */}
            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => setRequestStatus(requestInitState)}
                onClose={() => setRequestStatus(requestInitState)}
                onCancel={() => setRequestStatus(requestInitState)}
                message={requestStatus.message}
            />
        </main>
    );
};

export default PositionCheckPage;



const Chart = () => {
    let maxRowSpan = 4;
    let maxColSpan = 20
    let currentRow = 1
    let totalCols = 80
    let colsLeft = totalCols
    let isSecondRowFirstElement = false
    const spanSteps = [40, 16, 8, 7]

    const arrayToRender = [];
    const sortedData = mockChartData.sort((a, b) => b.value - a.value)
    const maxValue = sortedData[0].value

    // Вычисляем прозрачность от 10% до 3% в зависимости от индекса
    const getOpacity = (idx: number) => {
        const maxIdx = Math.max(0, sortedData.length - 1);
        if (maxIdx === 0) return 0.10; // Если только один элемент, возвращаем 10%
        const opacity = 0.10 - (0.10 - 0.03) * (idx / maxIdx); // Линейная интерполяция от 10% до 3%
        const alpha = Math.round(opacity * 255);
        return alpha.toString(16).padStart(2, '0').toUpperCase();
    };

    sortedData.map((_, idx) => {
        //console.log('idx', idx, 'totalCols', totalCols, 'colsLeft', colsLeft, 'maxRowSpan', maxRowSpan, 'maxColSpan', maxColSpan, 'currentRow', currentRow, 'isSecondRowFirstElement', isSecondRowFirstElement)

        if (currentRow > 4) {
            return null
        }
        //let currColSpan = maxColSpan - 1;
        // Вычисляем colspan на основе отношения текущего значения к максимальному
        const valueRatio = _.value / maxValue; // Отношение текущего элемента к максимуму
        // console.log('valueRatio', valueRatio)
        let currColSpan = spanSteps[currentRow - 1]; // Пропорциональный размер
        console.log('currColSpan', currColSpan)
        //let currColSpan = Math.round(maxColSpan * valueRatio); // Пропорциональный размер
        const getRowSpan = () => {
            if (!isSecondRowFirstElement) return Math.floor(maxRowSpan / currentRow)
            if (currentRow === 2) return maxRowSpan
            if (currentRow === 3) return 2
            if (currentRow === 4) return 1
            return 2
        }
        let currRowSpan = getRowSpan();


        if (currColSpan === colsLeft) {
            colsLeft = totalCols

            arrayToRender.push(
                <div
                    className={styles.page__chartItem}
                    key={_.name}
                    data-current-row={currentRow}
                    id={`chart_item_${idx}`}
                    style={{
                        backgroundColor: `#5329FF${getOpacity(idx)}`,
                        borderRadius: '8px',
                        gridRow: `span ${currRowSpan}`,
                        gridColumn: `span ${currColSpan}`,
                    }}
                >
                    <p className={styles.page__chartItemTitle}>{_.name}</p>
                    <p className={styles.page__chartItemValue}>{formatPrice(_.value, '')}</p>
                </div>
            )
            currentRow += 1
            maxColSpan = 32 / currentRow
            isSecondRowFirstElement = true
            if (currentRow === 3) {
                totalCols = 64
                colsLeft = totalCols
            }
            if (currentRow === 4) {
                totalCols = 56
                colsLeft = totalCols
            }
            return
        } else {
            maxColSpan = currColSpan
            colsLeft -= currColSpan
            arrayToRender.push(
                <div
                    className={styles.page__chartItem}
                    key={_.name}
                    data-current-row={currentRow}
                    id={`chart_item_${idx}`}
                    style={{
                        backgroundColor: `#5329FF${getOpacity(idx)}`,
                        borderRadius: '8px',
                        gridRow: `span ${currRowSpan}`,
                        gridColumn: `span ${currColSpan}`,
                    }}
                >
                    <p className={styles.page__chartItemTitle}>{_.name}</p>
                    <p className={styles.page__chartItemValue}>{formatPrice(_.value, '')}</p>
                </div>
            )
        }
        isSecondRowFirstElement = false


    }
    )

    return arrayToRender
}
