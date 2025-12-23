import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardReport } from '@/redux/dashboardReport/dashboardReportActions';
import { fetchDashboardFilters } from '@/redux/dashboardReport/dashboardFiltersAction';
import BottomNavigation from '../components/BottomNavigation';
import styles from './WeeklyReportDashboard.module.css';
import TooltipInfo from '../components/TooltipInfo';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { formatPrice } from '@/service/utils';
import NewFilterGroup from '../components/finReport/FilterGroup';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import DemonstrationSection from '../components/DemonstrationSection';
import { useDemoMode } from "@/app/providers";
import { ConfigProvider, Select } from 'antd';

const WeeklyReportDashboard = () => {
  const { isDemoMode } = useDemoMode();
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { dashboardData } = useSelector(state => state?.dashboardReportSlice);
  const [isLoading, setIsLoading] = useState(false);
  const { dashboardFilters, isFiltersLoading } = useSelector((state) => state?.dashboardFiltersSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [taxRate, setTaxRate] = useState(null);
  const [selectedValue, setSelectedValue] = useState('УСН-доходы');
  const filterSectionRef = useRef();

  useEffect(() => {
    dispatch(fetchDashboardFilters(
      authToken
    ));

  }, [authToken, dispatch]);

  useEffect(() => {
    if (!taxRate) {
      setTaxRate(dashboardData?.tax_rate ?? 0);
    }
  }, [dashboardData]);

  const handleTaxSubmit = async ({ taxType, taxRate: inputTaxRate, submit } = {}) => {
    const currentTaxType = taxType || selectedValue;
    // Если выбран тип "Не считать налог", принудительно ставим 0
    const currentTaxRate =
      currentTaxType === "Не считать налог" ? 0 : inputTaxRate !== undefined ? inputTaxRate : taxRate;

    try {
      if (taxType) {
        await ServiceFunctions.postTaxRateUpdate(authToken, {
          tax_rate: Number(currentTaxRate),
          tax_type: currentTaxType,
        });
        dispatch(fetchDashboardReport());
        filterSectionRef.current?.handleApplyFilters();
        handleApplyFilters();
        if (taxType === "Не считать налог") {
          // setTaxRate(0);
          setIsEditing(false);
        } else {
          setTaxRate(dashboardData?.tax_rate);
          setIsEditing(false);
        }
      }

      if (submit) {
        await ServiceFunctions.postTaxRateUpdate(authToken, {
          tax_rate: Number(currentTaxRate),
          tax_type: currentTaxType,
        });
        dispatch(fetchDashboardReport());


        filterSectionRef.current?.handleApplyFilters();
        handleApplyFilters();
        setIsEditing(false);
      }
      filterSectionRef.current?.handleApplyFilters();

    } catch (error) {
      console.error("Ошибка при обновлении налоговой ставки:", error);
    }
  };
  const handleApplyFilters = useCallback(() => {
    setIsLoading(true);

    dispatch(fetchDashboardReport({ token: authToken })).then(() => {
      setIsLoading(false);
    });
  }, [authToken, dispatch, isFiltersLoading]);

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
          <Header title={'Дашборд'} titlePrefix={'Отчёт'} hasShadow={false} />
        </div>

        {isDemoMode &&
          <div className='mb-3'>
            <NoSubscriptionWarningBlock />
          </div>
        }

        {!user?.is_report_downloaded &&
          <div className='mb-3'>
            <DemonstrationSection />
          </div>
        }

        {/* filters */}
        <NewFilterGroup
          pageIdent='dashboard'
          filtersData={dashboardFilters}
          isLoading={isFiltersLoading}
          getData={handleApplyFilters}
        />

        {/* blocks */}
        <div className={styles.blockWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.salesChartWrapper}>
              <div className={styles.title}>Продажи</div>
              {!isLoading ? (
                <>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Выручка
                      <TooltipInfo text={'Выручка'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_revenue?.quantity, 'шт')} / {formatPrice(dashboardData?.total_revenue?.rub, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Выкупы</div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_purchases?.quantity, 'шт')} / {formatPrice(dashboardData?.total_purchases?.rub, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Возвраты</div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_return?.quantity, 'шт')} / {formatPrice(dashboardData?.total_return?.rub, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Средний чек
                      <TooltipInfo text={'Средний чек'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_avg_check, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Выкуп
                      <TooltipInfo text={'Выкуп'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_purchase_percent, '%')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>СПП</div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_avg_spp, '%')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Себестоимость
                      <TooltipInfo text={'Себестоимость'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_cost_price, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Доля себестоимости
                      <TooltipInfo text={'Доля себестоимости'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_cost_price_percent, '%')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Кол-во доставок
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_deliveries, 'шт')}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className='loader'></span>
                </div>
              )}
            </div>
            <div className={styles.salesChartWrapper}>
              <div className={styles.title}>Финансы</div>
              {!isLoading ? (
                <>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Оплата на Р/С</div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_payment, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Чистая прибыль
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_profit, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Маржинальность
                      <TooltipInfo text={'Маржинальность'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_marginality, '%')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Рентабельность инвестиций
                      <TooltipInfo text={'Рентабельность инвестиций'} />
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_return_on_investment, '%')}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className='loader'></span>
                </div>
              )}
            </div>
            <div className={styles.salesChartWrapper}>
              <div className={styles.title}>Внешние расходы</div>
              {!isLoading ? (
                <>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Всего расходов
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_expenses, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Внешние расходы
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_external_expenses, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Затраты на самовыкупы
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_self_purchase_costs, '₽')}
                    </div>
                  </div>
                  <div
                    className={styles.salesChartRow}
                    style={{ marginBottom: '8px' }}
                  >
                    <div className={styles.titleInRow}>
                      Расходов в % от выручки
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_expenses_percent, '%')}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className='loader'></span>
                </div>
              )}
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.salesChartWrapper}>
              <div className={styles.title}>
                Удержания и компенсации WB
              </div>
              {!isLoading ? (
                <>
                  <div className={styles.salesChartRow}>
                    <div
                      className={styles.titleInRow}
                      style={{ display: 'flex', alignItems: 'flex-end' }}
                    >
                      Комиссия
                    </div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div className={styles.headerInRow}>
                          % от выручки
                        </div>
                        <div>
                          {formatPrice(dashboardData?.total_wb_commission?.percent, '%')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div className={styles.headerInRow}>₽</div>
                        {formatPrice(dashboardData?.total_wb_commission?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Эквайринг</div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div>
                          {formatPrice(dashboardData?.total_acquiring?.percent, '%')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_acquiring?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Логистика</div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div>
                          {formatPrice(dashboardData?.total_logistics?.percent, '%')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_logistics?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Хранение</div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div>{formatPrice(dashboardData?.total_storage?.percent, '%')}</div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_storage?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Прочие удержания
                    </div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div>
                          {formatPrice(dashboardData?.total_other_retentions?.percent, '%')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_other_retentions?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Приёмка</div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div>
                          {formatPrice(dashboardData?.total_acceptance?.percent, '%')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_acceptance?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div
                      className={styles.titleInRow}
                      style={{ display: 'flex', alignItems: 'flex-end' }}
                    >
                      Компенсация брака
                      <TooltipInfo text={'Компенсация брака'} />
                    </div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div className={styles.headerInRow}>Штук</div>
                        <div>
                          {formatPrice(dashboardData?.total_compensation_defects?.quantity, 'шт')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div className={styles.headerInRow}>₽</div>
                        {formatPrice(dashboardData?.total_compensation_defects?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Компенсация ущерба
                      <TooltipInfo text={'Компенсация ущерба'} />
                    </div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div>
                          {formatPrice(dashboardData?.total_compensation_damage?.quantity, 'шт')}
                        </div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_compensation_damage?.rub, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Штрафы
                      <TooltipInfo text={'Штрафы'} />
                    </div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div></div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_penalties, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Доплаты</div>
                    <div className={styles.numbersBox}>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        <div></div>
                      </div>
                      <div
                        className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                      >
                        {formatPrice(dashboardData?.total_additional_payments, '₽')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.totalBox}>
                    <div>Итого от выручки</div>
                    <div className={styles.totalNumbers}>
                      <div>
                        {formatPrice(dashboardData?.total_compensation_penalties?.rub, '₽')}
                      </div>
                      <div>
                        {formatPrice(dashboardData?.total_compensation_penalties?.percent, '%')}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className='loader'></span>
                </div>
              )}
            </div>


            {/* TAXES */}
            <div className={styles.salesChartWrapper}>
              <div className={styles.title}>Налог</div>
              {!isLoading ? (
                <>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Тип налогообложения
                    </div>
                    <div className={styles.numbersBox}>
                      <ConfigProvider
                        renderEmpty={() => (<div>Нет данных</div>)}
                        theme={{
                          token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 12,
                            fontWeight: 500,
                          },
                          components: {
                            Select: {
                              activeBorderColor: '#5329FF1A',
                              activeOutlineColor: 'transparent',
                              hoverBorderColor: '#5329FF1A',
                              optionActiveBg: 'transparent',
                              optionFontSize: 14,
                              optionSelectedBg: 'transparent',
                              optionSelectedColor: '#5329FF',
                            }
                          }
                        }}
                      >
                        <Select
                          size='large'
                          suffixIcon={
                            <svg
                              style={{
                                // transform: 'translateY(-50%)',
                                width: '14px',
                                height: '9px',
                                pointerEvents: 'none',
                              }}
                              viewBox='0 0 28 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M2 2L14 14L26 2'
                                stroke='rgba(140, 140, 140, 1)'
                                strokeWidth='4'
                                strokeLinecap='round'
                              />
                            </svg>
                          }
                          className={styles.customSelect}
                          options={[{ value: 'УСН-доходы', label: 'УСН-доходы' }, { value: 'УСН Д-Р', label: 'УСН Д-Р' }, { value: 'Не считать налог', label: 'Не считать налог' }, { value: 'Считать от РС', label: 'Считать от РС' }]}
                          value={selectedValue}
                          onChange={(value) => {
                            setSelectedValue(value);
                            handleTaxSubmit({
                              taxType: value,
                              taxRate: taxRate,
                            });
                          }}
                          getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Ставка налога</div>
                    {taxRate && <div className={styles.mumbersInRow}>
                      {isEditing ? (
                        <div className={styles.editTaxRate}>
                          <input
                            type='number'
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            className={styles.taxRateInput}
                            disabled={
                              selectedValue === 'Не считать налог'
                            }
                          />
                          <button
                            onClick={() =>
                              handleTaxSubmit({ submit: true })
                            }
                            disabled={
                              selectedValue === 'Не считать налог'
                            }
                          >
                            ✓
                          </button>
                          <button onClick={() => setIsEditing(false)}>
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            if (selectedValue !== 'Не считать налог') {
                              setIsEditing(true);
                            }
                          }}
                          className={styles.taxRateWrapper}
                        >

                          {formatPrice(selectedValue === 'Не считать налог' ? 0 : (dashboardData?.tax_rate || 0), '%')}

                        </div>
                      )}
                    </div>}
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>WB реализовал</div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_sold_by_wb, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>
                      Налоговая база
                    </div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_tax_base, '₽')}
                    </div>
                  </div>
                  <div className={styles.salesChartRow}>
                    <div className={styles.titleInRow}>Налог</div>
                    <div className={styles.mumbersInRow}>
                      {formatPrice(dashboardData?.total_tax, '₽')}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className='loader'></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <BottomNavigation />
      </section>
      {/* ---------------------- */}
    </main>
  )
};

export default WeeklyReportDashboard;
