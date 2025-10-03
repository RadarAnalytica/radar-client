import { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ReportAbcAnalysis.module.css';
import upArrow from '../assets/up.svg';
import downArrow from '../assets/down.svg';
import BottomNavigation from '../components/BottomNavigation';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { fetchABCFilters } from '@/redux/reportABC/abcFiltersActions'
import abcFake from '../pages/images/abc_fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup'
import { formatPrice } from '@/service/utils';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
const ReportAbcAnalysis = () => {
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);
  const dispatch = useDispatch();
  const { abcFilters, isFiltersLoading } = useSelector((state) => state?.abcFiltersSlice);
  const [error, setError] = useState(null);
  const { authToken, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('revenue');
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [dataRevenue, setDataRevenue] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const colorMap = {
    A: '#4AD99133',
    B: '#F0AD0033',
    C: '#FB450033',
  };

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    dispatch(fetchABCFilters(authToken));
  }, [authToken, dispatch]);

  const applyFilters = useCallback(async () => {
    setIsRevenueLoading(true);
    setError(null);

    try {
      const data = await ServiceFunctions.postAbcReportsData(authToken);
      setDataRevenue(data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setIsRevenueLoading(false);
    }
  }, [authToken, isFiltersLoading]);

  return (
    <div className='dashboard-page'>
      <MobilePlug />

      <div style={{ height: '100vh', zIndex: 999 }}>
        <Sidebar />
      </div>

      <div className={`${styles.scheduleMain} dashboard-content pb-3`} style={{ padding: '0 32px' }}>
        <div style={{ width: '100%', padding: '20px 0' }} className="container dash-container">
          <Header title={'ABC-анализ'} titlePrefix={'Отчёт'} />
        </div>
        <div className='container dash-container'>
          <NewFilterGroup pageIdent='abc' filtersData={abcFilters} isLoading={isFiltersLoading} getData={applyFilters}/>
        </div>

        <div
          className={`${styles.ScheduleFooter} dash-container container`}
        >
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'revenue' ? styles.active : ''
              }`}
              onClick={() => handleTabClick('revenue')}
            >
              По выручке
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'profit' ? styles.active : ''
              }`}
              onClick={() => handleTabClick('profit')}
            >
              По прибыли
            </button>
          </div>
          {activeTab === 'revenue' && (
            <div
              className={`${styles.containerRevenue} ${isOpenFilters ? styles.expanded : ''
              }`}
            >
              <div className={styles.rowHeader}>
                <div
                  className={styles.article}
                  style={{color: '#8C8C8C'}}
                >
                  Артикул
                </div>
                <div
                  className={styles.product}
                  style={{color: '#8C8C8C'}}
                >
                  Товар
                </div>
                <div
                  className={styles.size}
                  style={{color: '#8C8C8C'}}
                >
                  Размер
                </div>
                <div className={styles.profit} style={{color: '#8C8C8C'}}>
                  Выручка
                </div>
                <div
                  className={styles.profitAmount}
                  style={{color: '#8C8C8C'}}
                >
                  Доля выручки
                </div>
                <div
                  className={styles.category}
                  style={{color: '#8C8C8C'}}
                >
                  Категория по&nbsp;выручке
                </div>
                <div
                  className={styles.generalCategory}
                  style={{color: '#8C8C8C'}}
                >
                  Общая категория
                </div>
              </div>
              {isRevenueLoading ? (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{height: '100px', marginTop: '40px'}}
                >
                  <span className='loader'></span>
                </div>
              ) : (!dataRevenue || dataRevenue.length === 0) ? (
                <div className={styles.loaderContainer}>
                  Ничего не найдено
                </div>
              ) : (
                <div
                  className={`${styles.rowsWrapper} ${isOpenFilters ? styles.expanded : ''
                  }`}
                >
                  {dataRevenue.map((item, index) => (
                    <div key={index} className={styles.row}>
                      <div className={styles.article}>
                            <span
                              onClick={() => toggleRow(item.wb_id)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 0',
                                fontWeight: '700',
                              }}
                            >
                              {item.wb_id}
                              <img
                                src={
                                  expandedRows[item.wb_id] ? upArrow : downArrow
                                }
                                alt={
                                  expandedRows[item.wb_id]
                                    ? 'Collapse'
                                    : 'Expand'
                                }
                                style={{
                                  marginLeft: '8px',
                                  width: '16px',
                                  height: '16px',
                                }}
                              />
                            </span>

                        {expandedRows[item.wb_id] &&
                          item.items.map((product, i) => (
                            <div key={i} style={{padding: '8px 0 '}}>
                              {product.barcode}
                            </div>
                          ))}
                      </div>

                      <div className={styles.product}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.productName}
                              title={item.title}
                            >
                              {item.title}
                            </div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div
                                key={i}
                                className={styles.productName}
                                title={product.title}
                              >
                                {product.title}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.productName}
                            title={item.title}
                          >
                            {item.title}
                          </div>
                        )}
                      </div>

                      <div className={styles.size}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.size}
                              title={item.size}
                              style={{width: '90%'}}
                            >
                              {item.size}
                            </div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div
                                key={i}
                                className={styles.size}
                                title={product.size}
                                style={{width: '90%'}}
                              >
                                {product.size}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.size}
                            title={item.size}
                            style={{width: '90%'}}
                          >
                            {item.size}
                          </div>
                        )}
                      </div>

                      <div className={styles.profit}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{formatPrice(item.proceeds, '₽')}</div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div key={i}>
                                {formatPrice(product.proceeds, '₽')}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div>{formatPrice(item.proceeds, '₽')}</div>
                        )}
                      </div>

                      <div className={styles.profitAmount}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.proceeds_percent}%</div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div key={i}>{product.proceeds_percent}%</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.proceeds_percent}%</div>
                        )}
                      </div>

                      <div className={styles.category}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.categoryColoredItem}
                              style={{
                                backgroundColor:
                                  colorMap[item.proceed_abc] ||
                                  'transparent',
                                padding: '4px 16px',
                                borderRadius: '8px',
                                marginRight: '75%',
                              }}
                            >
                              {item.proceed_abc}
                            </div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div key={i} style={{padding: '6px 0'}}>
                                <div
                                  className={styles.categoryColoredItem}
                                  style={{
                                    backgroundColor:
                                      colorMap[product.proceed_abc] ||
                                      'transparent',
                                    padding: '4px 16px',
                                    borderRadius: '8px',
                                    marginRight: '75%',
                                  }}
                                >
                                  {product.proceed_abc}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.categoryColoredItem}
                            style={{
                              backgroundColor:
                                colorMap[item.proceed_abc] || 'transparent',
                              //padding: '4px 16px',
                              //borderRadius: '8px',
                              //marginRight: '75%',
                            }}
                          >
                            {item.proceed_abc}
                          </div>
                        )}
                      </div>

                      <div className={styles.generalCategory}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.common_abc}</div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div key={i}>{product.common_abc}</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.common_abc}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'profit' && (
            <div
              className={`${styles.containerProfit} ${isOpenFilters ? styles.expanded : ''
              }`}
            >
              <div className={styles.rowHeader}>
                <div
                  className={styles.article}
                  style={{color: '#8C8C8C'}}
                >
                  Артикул
                </div>
                <div
                  className={styles.product}
                  style={{color: '#8C8C8C'}}
                >
                  Товар
                </div>
                <div
                  className={styles.size}
                  style={{color: '#8C8C8C'}}
                >
                  Размер
                </div>
                <div className={styles.profit} style={{color: '#8C8C8C'}}>
                  Прибыль
                </div>
                <div
                  className={styles.profitAmount}
                  style={{color: '#8C8C8C'}}
                >
                  Доля прибыли
                </div>
                <div
                  className={styles.category}
                  style={{color: '#8C8C8C'}}
                >
                  Категория по&nbsp;прибыли
                </div>
                <div
                  className={styles.generalCategory}
                  style={{color: '#8C8C8C'}}
                >
                  Общая категория
                </div>
              </div>
              {isRevenueLoading ? (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{height: '100px', marginTop: '40px'}}
                >
                  <span className='loader'></span>
                </div>
              ) : (!dataRevenue || dataRevenue.length === 0) ? (
                <div className={styles.loaderContainer}>
                  Ничего не найдено
                </div>
              ) : (
                <div
                  className={`${styles.rowsWrapper} ${isOpenFilters ? styles.expanded : ''
                  }`}
                >
                  {dataRevenue.map((item, index) => (
                    <div key={index} className={styles.row}>
                      <div className={styles.article}>
                            <span
                              onClick={() => toggleRow(item.wb_id)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 0',
                                fontWeight: '700',
                              }}
                            >
                              {item.wb_id}
                              <img
                                src={
                                  expandedRows[item.wb_id] ? upArrow : downArrow
                                }
                                alt={
                                  expandedRows[item.wb_id]
                                    ? 'Collapse'
                                    : 'Expand'
                                }
                                style={{
                                  marginLeft: '8px',
                                  width: '16px',
                                  height: '16px',
                                }}
                              />
                            </span>
                        {expandedRows[item.wb_id] &&
                          item.items.map((product, i) => (
                            <div key={i} style={{padding: '8px 0 '}}>
                              {product.barcode}
                            </div>
                          ))}
                      </div>

                      <div className={styles.product}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.productName}
                              title={item.title}
                            >
                              {item.title}
                            </div>
                            {item.items.map((product, i) => (
                              <div
                                key={i}
                                className={styles.productName}
                                title={product.title}
                              >
                                {product.title}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.productName}
                            title={item.title}
                          >
                            {item.title}
                          </div>
                        )}
                      </div>

                      <div className={styles.size}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.size}
                              title={item.size}
                              style={{width: '90%'}}
                            >
                              {item.size}
                            </div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div
                                key={i}
                                className={styles.size}
                                title={product.size}
                                style={{width: '90%'}}
                              >
                                {product.size}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.size}
                            title={item.size}
                            style={{width: '90%'}}
                          >
                            {item.size}
                          </div>
                        )}
                      </div>

                      <div className={styles.profit}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{formatPrice(item.profit, '₽')}</div>

                            {item.items.map((product, i) => (
                              <div key={i}>
                                {formatPrice(product.profit, '₽')}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div>{formatPrice(item.profit, '₽')}</div>
                        )}
                      </div>

                      <div className={styles.profitAmount}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.profit_percent}%</div>
                            {item.items.map((product, i) => (
                              <div key={i}>{product.profit_percent}%</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.profit_percent}%</div>
                        )}
                      </div>

                      <div className={styles.category}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.categoryColoredItem}
                              style={{
                                backgroundColor:
                                  colorMap[item.profit_abc] ||
                                  'transparent',
                                // padding: '4px 16px',
                                // borderRadius: '8px',
                                // marginRight: '75%',
                              }}
                            >
                              {item.profit_abc}
                            </div>
                            {' '}
                            {item.items.map((product, i) => (
                              <div key={i} style={{padding: '6px 0'}}>
                                <div
                                  className={styles.categoryColoredItem}
                                  style={{
                                    backgroundColor:
                                      colorMap[product.proceed_abc] ||
                                      'transparent',
                                    // padding: '4px 16px',
                                    // borderRadius: '8px',
                                    // marginRight: '75%',
                                  }}
                                >
                                  {product.profit_abc}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.categoryColoredItem}
                            style={{
                              backgroundColor:
                                colorMap[item.proceed_abc] || 'transparent',
                              // padding: '4px 16px',
                              // borderRadius: '8px',
                              // marginRight: '75%',
                            }}
                          >
                            {item.profit_abc}
                          </div>
                        )}
                      </div>

                      <div className={styles.generalCategory}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.common_abc}</div>

                            {item.items.map((product, i) => (
                              <div key={i}>{product.common_abc}</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.common_abc}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <BottomNavigation/>
      </div>
    </div>
  );
};
export default ReportAbcAnalysis;
