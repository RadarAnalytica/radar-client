import { useState, useEffect, useContext, useCallback } from 'react';
import FilterElem from './FilterElem';
import styles from './FilterGroup.module.css';
import AuthContext from '../../service/AuthContext';
// import { getFilterData } from '../../service/ReportService'
import { reportFilters } from '../../service/reportConfig';
import DownloadButton from '../DownloadButton';
import { URL } from '../../service/config';
import { useSelector, useDispatch } from 'react-redux';
import { setDownloadLoading } from '../../redux/download/downloadSlice';
import { ConfigProvider, Segmented } from 'antd';

// antd config providers themes
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

const NewFilterGroup = ({ pageIdent, filtersData, isLoading, getData, setActiveTab, activeTab }) => {
    const { authToken } = useContext(AuthContext);
    const dispatch = useDispatch();
    const isDownloading = useSelector((state) => state.downloadReducer?.isDownloading);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [filters, setFilters] = useState(reportFilters[pageIdent]);
    const [weekOriginFilter, setWeekOriginFilter] = useState([]);

    useEffect(() => {
        const filterData = async () => {
            setFilters((list) => {
                return list.map((el) => (
                    { ...el, items: filtersData[el.filterIdent] }
                ));
            });
        };

        filterData();

    }, [pageIdent, authToken, setFilters, setWeekOriginFilter, filtersData]);

    useEffect(() => {
        getData();
    }, [getData]);

    const changeWeekFilters = useCallback(() => {
        return;
    }, [weekOriginFilter, pageIdent]);

    const handleDownload = async () => {
        dispatch(setDownloadLoading(true));
        fetch(
            `${URL}/api/report/download`,
            {
                method: 'POST',
                headers: {
                    authorization: 'JWT ' + authToken,
                },
            }
        )
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Финансовый отчет.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((e) => console.error(e))
            .finally(() => {
                dispatch(setDownloadLoading(false));
            });
    };


    return (

        <div className={styles.filterContainer}>
            {!isCollapsed && (
                <>
                    <div className={styles.filterGrid}>
                        {filters.map((elem) => {
                            return (
                                <FilterElem
                                    key={elem.filterIdent}
                                    title={elem.title}
                                    pageIdent={pageIdent}
                                    filterIdent={elem.filterIdent}
                                    items={elem.items}
                                    isLoading={isLoading}
                                    widthData={elem.width}
                                    changeWeekFilter={changeWeekFilters}
                                />
                            );
                        })}
                    </div>
                </>
            )}
            {pageIdent !== 'abc' && (
                <div className={styles.filterControls} style={{ marginTop: !isCollapsed ? '20px' : '0' }}>
                    <button
                        className={styles.collapseButton}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {!isCollapsed ? 'Свернуть фильтры' : 'Развернуть фильтры'}
                    </button>
                    <div className={styles.filterControlsWrapper}>
                        {!isCollapsed && (
                            <button
                                className={styles.applyButton}
                                onClick={() => getData()}
                            >
                                Применить фильтры
                            </button>
                        )}
                        <DownloadButton handleDownload={handleDownload} loading={isDownloading} />
                    </div>
                </div>
            )}
            {pageIdent === 'abc' && (
                <div className={styles.generalFilterContainer}>
                    <button
                        className={styles.collapseButton}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {!isCollapsed ? 'Свернуть фильтры' : 'Развернуть фильтры'}
                    </button>
                    <div className={styles.filterControls} style={{ marginTop: !isCollapsed ? '20px' : '0' }}>
                        {activeTab && setActiveTab &&
                            <ConfigProvider theme={segmentedTheme}>
                                <Segmented
                                    size='large'
                                    options={['По выручке', 'По прибыли']}
                                    value={activeTab}
                                    onChange={(value) => setActiveTab(value)}
                                    disabled={isLoading}
                                />
                            </ConfigProvider>
                        }
                        <div className={styles.filterControlsWrapper}>
                            {!isCollapsed && (
                                <button
                                    className={styles.applyButton}
                                    onClick={() => getData()}
                                >
                                    Применить фильтры
                                </button>
                            )}
                            <DownloadButton handleDownload={handleDownload} loading={isDownloading} />
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
};

export default NewFilterGroup;
