import { useContext, useState, useEffect, useRef } from 'react';
import Header from '@/components/sharedComponents/header/header';
import styles from './SerpPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { SerpSchema } from '@/widgets';
import { formatPrice } from '@/service/utils';
import { Link } from 'react-router-dom';
import { Segmented, ConfigProvider, Input, Button } from 'antd';
import { Table as RadarTable } from 'radar-ui';
import { serpPageTableConfig } from '@/shared';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/plainSelect/plainSelect';
import { ServiceFunctions } from '@/service/serviceFunctions';
import moment from 'moment';
import AuthContext from '@/service/AuthContext';
import { serpPageCustomTableCellRender } from '@/shared';
import { useDemoMode } from '@/app/providers';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';



// models
interface ISerpProduct {
    wb_id: number;
    wb_id_image_link: string;
    name: string;
    number: number;
    ad: boolean;
    price: number;
    base_price: number;
    feedbacks: number;
    rating: number;
    pics: number;
}

interface IAdPercent {
    ad: number;
    organic: number;
}

interface ISerpQueryResponse {
    query: string;
    date_time: string;
    frequency_30: number;
    ad_percent: IAdPercent;
    total_products: number;
    total_pages: number;
    products: ISerpProduct[];
}

interface ISerpFiltersData {
    region_name: string;
    city_name: string;
    dest: number;
}


// antd config providers themes
const segmentedTheme = {
    token: {
        fontSize: 14,
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

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Mulish',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        }
    }
}

const buttonTheme = {
    token: {
        colorPrimary: '#5329FF',
        colorTextLightSolid: 'white',
        fontSize: 12,
        controlHeightLG: 38,
        fontWeight: 600,
    },
    Button: {
        defaultShadow: 'none',
        primaryShadow: 'none',
    }
}



// component
const SerpPage = () => {

    // states and basics
    const { isDemoMode } = useDemoMode()
    const [filtersData, setFiltersData] = useState<ISerpFiltersData[] | null>(null);
    const [activeFilter, setActiveFilter] = useState<ISerpFiltersData | null>(null);
    const [queryData, setQueryData] = useState<ISerpProduct[] | null>(null);
    const [tableData, setTableData] = useState<ISerpProduct[] | null>(null);
    const [summaryData, setSummaryData] = useState<{ totalProduct: number; totalPages: number; date: string } | null>(null);
    const [barsData, setBarsData] = useState<{ frequency: number; organic: number; ads: number, query: string } | null>(null);
    const [segmentedOptions, setSegmentedOptions] = useState(null);
    const [activeTableTab, setActiveTableTab] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState(isDemoMode ? 'Платья и сарафаны' : '');
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 50,
    });
    const { authToken } = useContext(AuthContext);
    const tableContainerRef = useRef<HTMLDivElement>(null);





    // handlers
    // search handlers
    // keydown
    const inputKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e && e.key !== 'Enter') return;
        if (searchInputValue && activeFilter) {
            getPageData();
        }
    };
    // submit
    const searchButtonClickHandler = () => {
        if (searchInputValue && activeFilter) {
            getPageData();
        }
    };
    // change
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    //pagination handler
    const paginationHandler = (page: number) => {
        setPagination({
            ...pagination,
            current: page,
        });
        let newTableData = queryData;
        if (activeTableTab === 1) {
            newTableData = newTableData?.filter((item) => !item.ad);
            newTableData = [...newTableData]?.map((_, idx) => ({ ..._, pp: idx + 1 }));
        }
        if (activeTableTab === 2) {
            newTableData = newTableData?.filter((item) => item.ad);
            newTableData = [...newTableData]?.map((_, idx) => ({ ..._, pp: idx + 1 }));
        }
        setTableData(newTableData?.slice((page - 1) * pagination.pageSize, page * pagination.pageSize));
        tableContainerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // table tab change handler
    const tableTabChangeHandler = (tab: number) => {
        setActiveTableTab(tab);
        let newTableData: ISerpProduct[] = [];
        if (tab === 0) {
            newTableData = queryData;
        }
        if (tab === 1) {
            newTableData = queryData?.filter((item) => !item.ad);
            newTableData = [...newTableData]?.map((_, idx) => ({ ..._, pp: idx + 1 }));
        }
        if (tab === 2) {
            newTableData = queryData?.filter((item) => item.ad);
            newTableData = [...newTableData]?.map((_, idx) => ({ ..._, pp: idx + 1 }));
        }

        setPagination({
            current: 1,
            pageSize: 20,
            total: Math.ceil(newTableData?.length / 20),
        });
        setTableData(newTableData?.slice(0, 20));
    };

    // search suggestions handler
    const searchSuggestionsHandler = () => {
        setSearchInputValue('Платья и сарафаны');
        getPageData('Платья и сарафаны');
    };


    //services
    // query data fetch function
    const getPageData = async (suggestion: string | undefined = undefined) => {
        setIsLoading(true);
        try {
            const res: ISerpQueryResponse = await ServiceFunctions.getSERPQueryData(authToken, {
                query: suggestion || searchInputValue || '', dest: activeFilter.dest,
            })
            setActiveTableTab(0);
            setQueryData(res.products.map((_, idx) => ({ ..._, pp: idx + 1 })));
            setTableData(res.products.map((_, idx) => ({ ..._, pp: idx + 1 })).slice(0, 20));
            setSegmentedOptions({
                all: res.total_products,
                organic: Math.round(res.total_products * (res.ad_percent.organic / 100)),
                ads: Math.round(res.total_products * (res.ad_percent.ad / 100)),
            });
            setSummaryData({
                totalProduct: res.total_products,
                totalPages: res.total_pages,
                date: res.date_time
            });
            setBarsData({
                frequency: res.frequency_30,
                organic: res.ad_percent.organic,
                ads: res.ad_percent.ad,
                query: res.query,
            });
            setPagination({
                current: 1,
                pageSize: 20,
                total: isDemoMode ? 5 : Math.ceil(res.total_products / 20), // 5 cuz we have 100 items as demo
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }

    // filters data fetching
    useEffect(() => {
        const getFiltersData = async () => {
            try {
                const res: ISerpFiltersData[] = await ServiceFunctions.getSERPFiltersData(authToken)
                setFiltersData(res)
                setActiveFilter(res.find((item) => item.city_name === 'Москва') || res[0]);
            } catch (error) {
                console.error(error);
            }
        }
        getFiltersData();
    }, []);


    //  query data fetching (location dependecy)
    useEffect(() => {
        if (searchInputValue && activeFilter) {
            getPageData();
        }
    }, [activeFilter]);

    // render
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
                        title='Проверка выдачи SERP'
                        // empty props. Avoiding ts errors 
                        titlePrefix=''
                        children={''}
                        videoReviewLink=''
                        howToLink=''
                        howToLinkText=''
                    />
                </div>

                {isDemoMode && <NoSubscriptionWarningBlock />}


                {/* search & filters */}
                <div className={styles.page__searchBlock}>
                    <div className={styles.page__searchWrapper}>
                        <span className={styles.page__searchLabel}>Поисковый запрос</span>
                        <div className={styles.page__searchInputWrapper}>
                            {/* INPUT */}
                            <ConfigProvider
                                theme={inputTheme}
                            >
                                <Input
                                    prefix={
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="#8C8C8C" />
                                        </svg>
                                    }
                                    size='large'
                                    placeholder='Введите поисковый запрос'
                                    value={searchInputValue}
                                    onKeyDown={(e) => inputKeydownHandler(e)}
                                    onChange={inputChangeHandler}
                                    autoCorrect='off'
                                    spellCheck={false}
                                    autoComplete='off'
                                    allowClear={{
                                        clearIcon: (<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.71991 0.556763C9.01281 0.263923 9.48758 0.263887 9.78046 0.556763C10.0732 0.849645 10.0733 1.32444 9.78046 1.61731L6.39764 5.00012L9.78046 8.38293C10.0732 8.67584 10.0733 9.15064 9.78046 9.44348C9.48761 9.73633 9.01281 9.73623 8.71991 9.44348L5.3371 6.06067L1.95428 9.44348C1.66143 9.73627 1.18662 9.73621 0.893738 9.44348C0.600915 9.1506 0.600915 8.67581 0.893738 8.38293L4.27655 5.00012L0.893738 1.61731C0.600845 1.32442 0.600845 0.849656 0.893738 0.556763C1.18663 0.26387 1.66139 0.263869 1.95428 0.556763L5.3371 3.93958L8.71991 0.556763Z" fill="#8C8C8C" />
                                        </svg>)
                                    }}
                                    disabled={isDemoMode}
                                />
                            </ConfigProvider>
                            {/* SEARCH BUTTON */}
                            <ConfigProvider
                                wave={{ disabled: true }}
                                theme={buttonTheme}
                            >
                                <Button
                                    type='primary'
                                    size='large'
                                    onClick={searchButtonClickHandler}
                                    loading={isLoading}
                                    disabled={isDemoMode}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        fontWeight: 600,
                                        lineHeight: '16px',
                                        padding: '0 12.5px',
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9.60353C1.5 5.25398 5.02601 1.72797 9.37556 1.72797C13.7251 1.72797 17.2511 5.25398 17.2511 9.60353C17.2511 13.9531 13.7251 17.4791 9.37556 17.4791C5.02601 17.4791 1.5 13.9531 1.5 9.60353ZM9.37556 0.227966C4.19758 0.227966 0 4.42555 0 9.60353C0 14.7815 4.19758 18.9791 9.37556 18.9791C11.6946 18.9791 13.8169 18.1371 15.4537 16.7423L19.4834 20.772L20.5441 19.7114L16.5143 15.6816C17.9092 14.0449 18.7511 11.9225 18.7511 9.60353C18.7511 4.42555 14.5535 0.227966 9.37556 0.227966Z" fill="currentColor" />
                                    </svg>
                                    Найти
                                </Button>
                            </ConfigProvider>
                        </div>
                        <div className={styles.page__searchSuggestions}>
                            Например:&nbsp;
                            <button
                                className={styles.page__searchSuggestionButton}
                                onClick={searchSuggestionsHandler}
                            >
                                Платья и сарафаны
                            </button>
                        </div>
                    </div>

                    <div className={styles.page__filterWrapper}>
                        <PlainSelect
                            selectId='brandSelect'
                            label='Регион'
                            value={activeFilter?.dest}
                            optionsData={filtersData?.map((item) => ({ value: item.dest, label: item.city_name }))}
                            handler={(value) => {
                                setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={isDemoMode}
                        />
                    </div>
                </div>



                {/* spinners (loading state) */}
                {isLoading && (
                    <>
                        <div className={styles.page__barsBlock}>
                            <div className={styles.page__bar}>
                                <div className={styles.page__loaderWrapper} style={{ height: '88px' }}>
                                    <span className='loader' />
                                </div>
                            </div>
                            <div className={styles.page__bar}>
                                <div className={styles.page__loaderWrapper} style={{ height: '88px' }}>
                                    <span className='loader' />
                                </div>
                            </div>
                        </div>
                        <div className={styles.page__schemaWrapper}>
                            <div className={`${styles.page__loaderWrapper} ${styles.page__loaderWrapper_shadow}`} style={{ height: '595px' }}>
                                <span className='loader' />
                            </div>
                            <div className={`${styles.page__loaderWrapper} ${styles.page__loaderWrapper_shadow}`} style={{ height: '695px' }}>
                                <span className='loader' />
                            </div>
                        </div>
                    </>
                )}




                {/* bars */}
                {!isLoading && barsData && (
                    <div className={styles.page__barsBlock}>
                        <div className={styles.page__bar}>
                            <div className={styles.page__barHeader}>
                                <h3 className={styles.page__barTitle}>Частотность ключа {barsData?.query}</h3>
                            </div>
                            <div className={styles.page__barContent}>
                                <p className={styles.page__barFrequency}>{formatPrice(barsData?.frequency || 0, '')}</p>
                                {barsData?.query && <Link to={`https://www.wildberries.ru/catalog/0/search.aspx?search=${barsData?.query}`} target='_blank' className={styles.page__barLink}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.2367 2.29866C12.0468 1.10878 10.1177 1.10878 8.92779 2.29866L7.60196 3.62448C7.32738 3.89907 6.88218 3.89907 6.60759 3.62448C6.33301 3.3499 6.33301 2.9047 6.60759 2.63012L7.93342 1.30429C9.67247 -0.434763 12.492 -0.434763 14.2311 1.30429C15.9701 3.04334 15.9701 5.86291 14.2311 7.60196L12.9053 8.92778C12.6307 9.20237 12.1855 9.20237 11.9109 8.92778C11.6363 8.6532 11.6363 8.208 11.9109 7.93342L13.2367 6.60759C14.4266 5.41771 14.4266 3.48854 13.2367 2.29866Z" fill="#5329FF" />
                                        <path d="M3.62448 6.60759C3.89907 6.88218 3.89907 7.32738 3.62448 7.60196L2.29866 8.92779C1.10878 10.1177 1.10878 12.0468 2.29866 13.2367C3.48854 14.4266 5.41771 14.4266 6.60759 13.2367L7.93342 11.9109C8.208 11.6363 8.6532 11.6363 8.92778 11.9109C9.20237 12.1855 9.20237 12.6307 8.92778 12.9053L7.60196 14.2311C5.86291 15.9701 3.04334 15.9701 1.30429 14.2311C-0.434763 12.492 -0.434763 9.67247 1.30429 7.93342L2.63012 6.60759C2.9047 6.33301 3.3499 6.33301 3.62448 6.60759Z" fill="#5329FF" />
                                        <path d="M5.28174 9.25925C5.00715 9.53383 5.00715 9.97903 5.28174 10.2536C5.55633 10.5282 6.00152 10.5282 6.27611 10.2536L10.2536 6.27614C10.5282 6.00155 10.5282 5.55636 10.2536 5.28177C9.979 5.00718 9.5338 5.00718 9.25921 5.28177L5.28174 9.25925Z" fill="#5329FF" />
                                    </svg>
                                </Link>}
                            </div>
                        </div>
                        <div className={styles.page__bar}>
                            <div className={styles.page__barHeader}>
                                <h3 className={styles.page__barTitle}>Сводка на странице №1</h3>
                                <div className={styles.page__serpReportWrapper}>
                                    <div className={styles.page__serpReport}>
                                        <div className={`${styles.page__serpReportIcon} ${styles.page__serpReportIcon_orange}`} />
                                        <span className={styles.page__serpReportPercent}>{formatPrice(barsData?.organic || 0, '%')}</span>
                                        <span className={styles.page__serpReportDesc}>Органика</span>
                                    </div>
                                    <div className={styles.page__serpReport}>
                                        <div className={`${styles.page__serpReportIcon} ${styles.page__serpReportIcon_green}`} />
                                        <span className={styles.page__serpReportPercent}>{formatPrice(barsData?.ads || 0, '%')}</span>
                                        <span className={styles.page__serpReportDesc}>Рекламная позиция</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.page__barContent}>
                                <div className={styles.page__barMiniChart}>
                                    <div className={styles.page__barMiniChartLine}
                                        style={{
                                            width: `${barsData?.organic}%`,
                                            backgroundColor: '#F0AD00',
                                        }}
                                    />
                                    <div className={styles.page__barMiniChartLine}
                                        style={{
                                            width: `${barsData?.ads}%`,
                                            backgroundColor: '#00B69B',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Table and schema */}
                <div className={styles.page__schemaWrapper}>

                    {/* schema block */}
                    {!isLoading && queryData && <SerpSchema products={queryData.slice(0, 100)} />}


                    {/* table block */}
                    {!isLoading && tableData && segmentedOptions && summaryData &&
                        <div className={styles.page__tableBlock}>
                            <ConfigProvider theme={segmentedTheme}>
                                <Segmented
                                    size='large'
                                    options={[
                                        { value: 0, label: <SegmentedLabel type='all' label='Все' value={segmentedOptions?.all || 0} /> },
                                        { value: 1, label: <SegmentedLabel type='organic' label='Органика' value={segmentedOptions?.organic || 0} /> },
                                        { value: 2, label: <SegmentedLabel type='ads' label='Реклама' value={segmentedOptions?.ads || 0} /> }]}
                                    value={activeTableTab}
                                    onChange={tableTabChangeHandler}
                                />
                            </ConfigProvider>
                            <div className={styles.page__summary}>
                                <p className={styles.page__summaryItem}>Товаров: <span>{summaryData?.totalProduct || 0}</span></p>
                                <p className={styles.page__summaryItem}>Обработано страниц поиска: <span>{summaryData?.totalPages || 0}</span></p>
                                <p className={styles.page__summaryItem}>Собраны: <span>{moment(summaryData?.date).local().format('DD.MM.YYYY, HH:mm') || ''}</span></p>
                            </div>
                            <div className={styles.page__tableWrapper} ref={tableContainerRef}>
                                {tableData &&
                                    <RadarTable
                                        config={serpPageTableConfig}
                                        dataSource={tableData}
                                        preset='radar-table-default'
                                        stickyHeader
                                        pagination={{
                                            current: pagination.current,
                                            pageSize: pagination.pageSize,
                                            total: pagination.total,
                                            onChange: paginationHandler,
                                            showQuickJumper: true,
                                            hideOnSinglePage: true
                                        }}
                                        headerCellWrapperStyle={{ padding: '10px 25px 11px 12px', height: '35px' }}
                                        bodyCellWrapperStyle={{ height: '70px', padding: '5px 12px' }}
                                        customCellRender={{
                                            idx: ['ad', 'name', 'rating'],
                                            renderer: serpPageCustomTableCellRender,
                                        }}
                                    />
                                }
                            </div>
                        </div>}
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    );
};

type SegmentedLabelProps = {
    type: 'all' | 'organic' | 'ads';
    label: string;
    value: string | number;
}

const SegmentedLabel: React.FC<SegmentedLabelProps> = ({ type, label, value }) => {
    const spanColor = type === 'all' ? '#5329FF' : type === 'organic' ? '#F0AD00' : '#00B69B';
    return (
        <div className={styles.segmentedLabelWrapper}>
            <p className={styles.segmentedLabel}>{label} <span style={{ color: spanColor }}>{value}</span></p>
        </div>
    )
}

export default SerpPage;


