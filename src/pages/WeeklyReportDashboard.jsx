import React, { useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import BottomNavigation from '../components/BottomNavigation';
import FilterSection from '../components/FilterSection';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportDashboard.module.css';
import TooltipInfo from '../components/TooltipInfo';
import DemonstrationSection from '../components/DemonstrationSection';
import AuthContext from '../service/AuthContext';
import fakeDashboard from '../pages/images/report-dashboard-fake.png';
import { ServiceFunctions } from '../service/serviceFunctions';
import { formatPrice } from '../service/utils';

const WeeklyReportDashboard = () => {
  const { user, authToken } = useContext(AuthContext);
  const dashboardData = useSelector(
    (state) => state?.dashboardReportSlice?.data
  );
  const [isEditing, setIsEditing] = useState(false);
  const [selectedValue, setSelectedValue] = useState()
  const [taxRate, setTaxRate] = useState(dashboardData?.tax_rate);
  const filterSectionRef = useRef();
  const handleTaxRateChange = (e) => {
    setTaxRate(e.target.value);
  };

  const handleTaxRateSubmit = async () => {
    try {

      const selectedTaxType = selectedValue;

      await ServiceFunctions.postTaxRateUpdate(authToken, {
        tax_rate: Number(taxRate) || dashboardData?.tax_rate,
        tax_type: selectedTaxType,
      });

      filterSectionRef.current?.handleApplyFilters();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating tax rate:', error);
    }
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Дашборд'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <FilterSection ref={filterSectionRef} />
            </div>
            <div className='container dash-container'>
              <div className={styles.blockWrapper}>
                <div className={styles.leftWrapper}>
                  <div className={styles.salesChartWrapper}>
                    <div className={styles.title}>Продажи</div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Выручка
                        <TooltipInfo text={'Выручка'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_revenue?.quantity} шт /{' '}
                        {formatPrice(dashboardData?.total_revenue?.rub) || '0'}{' '}
                        ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Выкупы</div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_purchases?.quantity} шт /{' '}
                        {formatPrice(dashboardData?.total_purchases?.rub) ||
                          '0'}{' '}
                        ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Возвраты</div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_return?.quantity} шт /
                        {formatPrice(dashboardData?.total_return?.rub)} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Средний чек
                        <TooltipInfo text={'Средний чек'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_avg_check) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Выкуп
                        <TooltipInfo text={'Выкуп'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_purchase_percent} %
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>СПП</div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_avg_spp} %
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Себестоимость
                        <TooltipInfo text={'Себестоимость'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_cost_price) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Доля себестоимости
                        <TooltipInfo text={'Доля себестоимости'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_cost_price_percent} %
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Кол-во доставок</div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_deliveries} шт
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.salesChartWrapper}
                    style={{ marginTop: '20px' }}
                  >
                    <div className={styles.title}>Финансы</div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Оплата на Р/С</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_payment) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Чистая прибыль</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_profit) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Маржинальность
                        <TooltipInfo text={'Маржинальность'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_marginality} %
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Рентабельность инвестиций
                        <TooltipInfo text={'Рентабельность инвестиций'} />
                      </div>
                      <div className={styles.mumbersInRow}>
                        {dashboardData?.total_return_on_investment} %
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.salesChartWrapper}
                    style={{ marginTop: '20px' }}
                  >
                    <div className={styles.title}>Внешние расходы</div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Всего расходов</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_expenses) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Внешние расходы</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_external_expenses)} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Затраты на самовыкупы
                      </div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(
                          dashboardData?.total_self_purchase_costs
                        ) || '0'}{' '}
                        ₽
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
                        {dashboardData?.total_expenses_percent} %
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.rightWrapper}>
                  <div className={styles.salesChartWrapper}>
                    <div className={styles.title}>
                      Удержания и компенсации WB
                    </div>
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
                          <div className={styles.headerInRow}>% от выручки</div>
                          <div>
                            {dashboardData?.total_wb_commission?.percent}
                          </div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div className={styles.headerInRow}>₽</div>
                          {formatPrice(
                            dashboardData?.total_wb_commission?.rub
                          ) || '0'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Эквайринг</div>
                      <div className={styles.numbersBox}>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div>{dashboardData?.total_acquiring?.percent}</div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          {formatPrice(dashboardData?.total_acquiring?.rub) ||
                            '0'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Логистика</div>
                      <div className={styles.numbersBox}>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div>{dashboardData?.total_logistics?.percent}</div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          {formatPrice(dashboardData?.total_logistics?.rub) ||
                            '0'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Хранение</div>
                      <div className={styles.numbersBox}>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div>{dashboardData?.total_storage?.percent}</div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          {formatPrice(dashboardData?.total_storage?.rub) ||
                            '0'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Прочие удержания</div>
                      <div className={styles.numbersBox}>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div>
                            {dashboardData?.total_other_retentions?.percent}
                          </div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          {formatPrice(
                            dashboardData?.total_other_retentions?.rub
                          ) || '0'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Приёмка</div>
                      <div className={styles.numbersBox}>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div>{dashboardData?.total_acceptance?.percent}</div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          {formatPrice(dashboardData?.total_acceptance?.rub) ||
                            '0'}
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
                            {dashboardData?.total_compensation_defects
                              .quantity || '0'}
                          </div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          <div className={styles.headerInRow}>₽</div>
                          {formatPrice(
                            dashboardData?.total_compensation_defects.rub
                          ) || '0'}
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
                            {dashboardData?.total_compensation_damage
                              .quantity || '0'}
                          </div>
                        </div>
                        <div
                          className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                        >
                          {formatPrice(
                            dashboardData?.total_compensation_damage.rub
                          ) || '0'}
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
                          {formatPrice(dashboardData?.total_penalties) || '0'}
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
                          {formatPrice(
                            dashboardData?.total_additional_payments
                          ) || '0'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.totalBox}>
                      <div>Итого от выручки</div>
                      <div className={styles.totalNumbers}>
                        <div>
                          {' '}
                          {formatPrice(
                            dashboardData?.total_compensation_penalties.rub
                          ) || '0'}{' '}
                          ₽
                        </div>
                        <div>
                          {dashboardData?.total_compensation_penalties.percent}{' '}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.salesChartWrapper}
                    style={{ marginTop: '20px' }}
                  >
                    <div className={styles.title}>Налог</div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>
                        Тип налогообложения
                      </div>
                      <div className={styles.numbersBox}>
                        <select
                          className={styles.customSelect}
                          value={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                        >
                          <option value="УСН-доходы">УСН-доходы</option>
                          <option value="УСН Д-Р">УСН Д-Р</option>
                          <option value="Не считать налог">Не считать налог</option>
                          <option value="Считать от РС">Считать от РС</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Ставка налога</div>
                      <div className={styles.mumbersInRow}>
                        {isEditing ? (
                          <div className={styles.editTaxRate}>
                            <input
                              type='number'
                              value={taxRate || dashboardData?.tax_rate}
                              onChange={handleTaxRateChange}
                              className={styles.taxRateInput}
                            />
                            <button onClick={handleTaxRateSubmit}>✓</button>
                            <button onClick={() => setIsEditing(false)}>
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => setIsEditing(true)}
                            style={{
                              cursor: 'pointer',
                              minWidth: '50px',
                              // textAlign: 'right',
                            }}
                          >
                            {dashboardData?.tax_rate} %
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>WB реализовал</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_sold_by_wb) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Налоговая база</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_tax_base) || '0'} ₽
                      </div>
                    </div>
                    <div className={styles.salesChartRow}>
                      <div className={styles.titleInRow}>Налог</div>
                      <div className={styles.mumbersInRow}>
                        {formatPrice(dashboardData?.total_tax) || '0'} ₽
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='container dash-container'>
              <DemonstrationSection />
            </div>
            <span className={styles.responsiveImageWrapper}>
              <img
                src={fakeDashboard}
                alt='fakeDashboard'
                className={styles.responsiveImage}
              />
              <span></span>
            </span>
          </>
        )}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportDashboard;
