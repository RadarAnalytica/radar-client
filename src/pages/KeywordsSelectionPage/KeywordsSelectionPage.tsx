import React, { useEffect } from "react";
import MobilePlug from "@/components/sharedComponents/mobilePlug/mobilePlug";
import styles from "./KeywordsSelectionPage.module.css";
import Sidebar from "@/components/sharedComponents/sidebar/sidebar";
import Header from "@/components/sharedComponents/header/header";
import { SearchBlock } from "@/features";
import ErrorModal from "@/components/sharedComponents/modals/errorModal/errorModal";
import { useState } from "react";
import { ConfigProvider, Segmented, Tooltip } from "antd";
import { DoubleTable, KeywordSelectionFilters } from "@/widgets";
import { ServiceFunctions } from "@/service/serviceFunctions";
import { formatPrice } from "@/service/utils";
import { keywordsSelectionTableConfig, RadarLoader } from "@/shared";


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


const mainDataToTableDataDto = (mainData: Record<string, any>, tableType: 'Кластеры' | 'По запросам') => {
    if (!mainData) return [];
    const { preset_data } = mainData;

    if (tableType === 'Кластеры') {
        return preset_data.map((preset, idx) => ({
            rowKey: 'parent' + preset.query + '_' + idx,
            ...preset,
            isParent: preset.queries_data && preset.queries_data.length > 0 ? true : false,
            children: preset.queries_data.map((query, queryIdx) => ({
                rowKey: query.query + '_' + queryIdx,
                isLastChild: queryIdx === ( preset.queries_data.length - 1),
                ...query,
            }))
        }))
    }

    if (tableType === 'По запросам') {
        return preset_data.map((preset) => {
            if (preset.queries_data && preset.queries_data.length > 0) {
                return [...preset.queries_data.map((query, queryIdx) => ({
                    rowKey: query.query + '_' + queryIdx,
                    ...query,
                }))]
            }
            return null;
        }).filter((item) => item !== null).flat();
    }
}

const getKeywordsSelectionRequestObject = (keywords: string, filtersData: Record<string, any> | null, matchType: 'Обычный поиск по частичному совпадению' | 'Поиск по полному совпадению', currentReqObject: Record<string, any> | null) => {
    let newRequestObject = currentReqObject || {}

    newRequestObject.main_keywords = {
        ...newRequestObject.main_keywords,
        keywords_match: matchType === 'Обычный поиск по частичному совпадению' ? "part" : "full"
    }
    if (keywords && keywords !== 'skip') {
        const normalizeDots = keywords.replace(/\./g, ',')
        const hasCommas = normalizeDots.includes(',')
        const keywordsArray = normalizeDots.split(hasCommas ? ',' : /\r?\n/).map(_ => _.trim());
        newRequestObject.main_keywords.keywords = keywordsArray.filter(Boolean);
    }
    if (!keywords) {
        newRequestObject.main_keywords = null;
    }
    if (filtersData) {
        const excludeArray = filtersData.keywords_to_exclude ? filtersData.keywords_to_exclude.split(',').map((_: string) => _.trim()) : null;
        const includeArray = filtersData.keywords_to_include ? filtersData.keywords_to_include.split(',').map((_: string) => _.trim()) : null;
        newRequestObject = {
            ...newRequestObject,
            frequency: { start: filtersData.frequency_from || null, end: filtersData.frequency_to || null },
            goods_quantity: { start: filtersData.items_from || null, end: filtersData.items_to || null },
            complexity: { start: filtersData.complexity_from || null, end: filtersData.complexity_to || null },
            words_count: { start: filtersData.words_from || null, end: filtersData.words_to || null },
            include_words: includeArray ? {
                keywords: includeArray,
                keywords_match: filtersData.include_match_type === 'Все слова' ? 'full' : 'part'
            } : includeArray,
            exclude_words: excludeArray ? {
                keywords: excludeArray,
                keywords_match: filtersData.include_match_type === 'Все слова' ? 'full' : 'part'
            } : excludeArray
        }
    }
    return newRequestObject;
}


// comp
const KeywordsSelectionPage = () => {
    const [requestStatus, setRequestStatus] = useState(requestInitState);
    const [tabsState, setTabsState] = useState<'Обычный поиск по частичному совпадению' | 'Поиск по полному совпадению'>('Обычный поиск по частичному совпадению');
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [requestObject, setRequestObject] = useState<Record<string, any> | null>(null);
    const [keywordsSelectionData, setKeywordsSelectionData] = useState(null);

    const getKeywordsSelectionData = async (requestObject: Record<string, any>) => {
        setRequestStatus({ ...requestInitState, isLoading: true });
        try {
            let res = await ServiceFunctions.getKeywordsSelectionPageData({
                ...requestObject,
                main_keywords: {
                    ...requestObject.main_keywords,
                    keywords_match: tabsState === 'Обычный поиск по частичному совпадению' ? "part" : "full"
                }
            });
            if (!res.ok) {
                setRequestStatus({ ...requestInitState, isError: true, message: 'Что-то пошло не так :(' });
                return;
            }
            res = await res.json();
            setKeywordsSelectionData(res);
            setRequestStatus({ ...requestInitState, isLoading: false });
        } catch (error) {
            setRequestStatus({ ...requestInitState, isError: true, message: 'Что-то пошло не так :(' });
            console.error('error', error)
        }
    }


    useEffect(() => {
        if (requestObject && requestObject.main_keywords?.keywords) {
            getKeywordsSelectionData(requestObject);
        } else {
            setKeywordsSelectionData(null);
        }
    }, [requestObject])


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
                        submitHandler={(value: string) => { setRequestObject(() => ({ ...getKeywordsSelectionRequestObject(value, null, tabsState, requestObject) })); }}
                        hasBackground={false}
                        placeholder='Введите запросы'
                        searchButtonText='Подобрать'
                        layout='vertical'
                        lines={3}
                        style={{ padding: '0' }}
                        disableEnter
                        demoModeValue='Футболка'
                    />
                </div>

                {/* Filters */}
                {requestObject && requestObject.main_keywords?.keywords && keywordsSelectionData &&
                    <div className={styles.page__filtersWrapper}>
                        <KeywordSelectionFilters loading={requestStatus.isLoading} submitHandler={(formData) => { setRequestObject(() => ({ ...getKeywordsSelectionRequestObject('skip', formData, tabsState, requestObject) })); }} />
                    </div>}
                {/* Table */}
                {requestStatus.isLoading && <div className={styles.page__tableWrapper}>
                    <RadarLoader loaderStyle={{ height: '50vh' }} />
                </div>}
                {keywordsSelectionData && !requestStatus.isLoading && keywordsSelectionData?.preset_data.length > 0 &&
                    <div className={styles.page__tableWrapper}>
                        <ConfigProvider theme={segmentedTheme}>
                            <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                        </ConfigProvider>
                        <div className={styles.page__summary}>
                            <p className={styles.page__summaryItem}>Найдено ключей: <span>{keywordsSelectionData?.queries_count}</span></p>
                            <p className={styles.page__summaryItem}>Кластеров: <span>{keywordsSelectionData?.presets_count}</span></p>
                        </div>
                        {keywordsSelectionData && <div className={styles.page__chart}>
                            {Chart(keywordsSelectionData?.preset_data?.sort((a: Record<string, any>, b: Record<string, any>) => b.frequency - a.frequency)?.map((_: Record<string, any>) => ({ name: _.query, value: _.frequency })))?.map(_ => (
                                <React.Fragment key={_.name}>
                                    {_}
                                </React.Fragment>
                            ))}
                        </div>}

                        <DoubleTable
                            tableData={mainDataToTableDataDto(keywordsSelectionData, tableType)}
                            dest={requestObject?.dest || -1257786}
                            tableType={tableType}
                            tableConfig={keywordsSelectionTableConfig}
                            page={'keywords'}
                            hasSort
                        />
                    </div>
                }
                {keywordsSelectionData && !requestStatus.isLoading && keywordsSelectionData.preset_data.length === 0 &&
                    <div className={styles.page__tableWrapper}>
                        <div style={{ width: '100%', padding: '40px' }}>
                            <span>Данные не найдены, попробуйте изменить запрос</span>
                        </div>
                    </div>
                }
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

export default KeywordsSelectionPage;



const Chart = (data: Record<string, any>[]) => {
    if (!data) return [];
    let maxRowSpan = 4;
    let maxColSpan = 20
    let currentRow = 1
    let totalCols = 80
    let colsLeft = totalCols
    let isSecondRowFirstElement = false
    const spanSteps = [40, 16, 8, 7]

    const arrayToRender = [];
    const sortedData = data.sort((a, b) => b.value - a.value)
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


        if (idx === 0) {
            arrayToRender.push(
                <ConfigProvider
                    theme={{
                        token: {
                            colorTextLightSolid: '#1A1A1A',
                            fontSize: 12,
                        }
                    }}
                >
                    <Tooltip
                        arrow={false}
                        color='white'
                        title={<>{_.name}<br />{formatPrice(_.value, '')}</>}
                    >
                        <div
                            className={styles.page__chartItem}
                            style={{
                                backgroundColor: '#5329FF1A',
                                borderRadius: '8px',
                                gridRow: `span 8`,
                                gridColumn: `span 20`,
                                cursor: 'pointer',
                            }}
                        >
                            <p className={styles.page__chartItemTitle}>{_.name}</p>
                            <p className={styles.page__chartItemValue}>{formatPrice(_.value, '')}</p>
                        </div>
                    </Tooltip>
                </ConfigProvider>

            )
            return
        }
        if (currentRow > 4) {
            return null
        }
        //let currColSpan = maxColSpan - 1;
        // Вычисляем colspan на основе отношения текущего значения к максимальному
        const valueRatio = _.value / maxValue; // Отношение текущего элемента к максимуму
        // console.log('valueRatio', valueRatio)
        let currColSpan = spanSteps[currentRow - 1]; // Пропорциональный размер
        // console.log('currColSpan', currColSpan)
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
                <ConfigProvider
                    theme={{
                        token: {
                            colorTextLightSolid: '#1A1A1A',
                            fontSize: 12,
                        }
                    }}
                >
                    <Tooltip
                        arrow={false}
                        color='white'
                        title={<>{_.name}<br />{formatPrice(_.value, '')}</>}
                    >
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
                                cursor: 'pointer',
                            }}
                        >
                            <p className={styles.page__chartItemTitle}>{_.name}</p>
                            <p className={styles.page__chartItemValue}>{formatPrice(_.value, '')}</p>
                        </div>
                    </Tooltip>
                </ConfigProvider>

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
                <ConfigProvider
                    theme={{
                        token: {
                            colorTextLightSolid: '#1A1A1A',
                            fontSize: 12,
                        }
                    }}
                >
                    <Tooltip
                        arrow={false}
                        color='white'
                        title={<>{_.name}<br />{formatPrice(_.value, '')}</>}
                    >
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
                                cursor: 'pointer',
                            }}
                        >
                            <p className={styles.page__chartItemTitle}>{_.name}</p>
                            <p className={styles.page__chartItemValue}>{formatPrice(_.value, '')}</p>
                        </div>
                    </Tooltip>
                </ConfigProvider>

            )
        }
        isSecondRowFirstElement = false


    }
    )

    return arrayToRender
}
