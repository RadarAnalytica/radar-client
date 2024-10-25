import BottomNavigation from '../components/BottomNavigation';
import FilterSection from '../components/FilterSection';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportDashboard.module.css';
import TooltipInfo from '../components/TooltipInfo';

const WeeklyReportDashboard = () => {
  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Дашборд'} subTitle={'Отчёт /'} />
        <div className='container dash-container'>
          <FilterSection />
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
                    2 000 шт / 4 000 500 ₽{' '}
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Выкупы</div>
                  <div className={styles.mumbersInRow}>
                    600 шт / 2 000 500 ₽{' '}
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Возвраты</div>
                  <div className={styles.mumbersInRow}>
                    1 400 шт / 3 000 500 ₽{' '}
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Средний чек
                    <TooltipInfo text={'Средний чек'} />
                  </div>
                  <div className={styles.mumbersInRow}>4 500 ₽ </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Выкуп
                    <TooltipInfo text={'Выкуп'} />
                  </div>
                  <div className={styles.mumbersInRow}>40 % </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>СПП</div>
                  <div className={styles.mumbersInRow}>20 % </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Себестоимость
                    <TooltipInfo text={'Себестоимость'} />
                  </div>
                  <div className={styles.mumbersInRow}>2 000 000 ₽</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Доля себестоимости
                    <TooltipInfo text={'Доля себестоимости'} />
                  </div>
                  <div className={styles.mumbersInRow}>20 % </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Кол-во доставок</div>
                  <div className={styles.mumbersInRow}>1 400 шт</div>
                </div>
              </div>
              <div
                className={styles.salesChartWrapper}
                style={{ marginTop: '20px' }}
              >
                <div className={styles.title}>Финансы</div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Оплата на Р/С</div>
                  <div className={styles.mumbersInRow}>4 000 500 ₽</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Чистая прибыль</div>
                  <div className={styles.mumbersInRow}>400 500 ₽ </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Маржинальность
                    <TooltipInfo text={'Маржинальность'} />
                  </div>
                  <div className={styles.mumbersInRow}>10 %</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Рентабельность инвестиций
                    <TooltipInfo text={'Рентабельность инвестиций'} />
                  </div>
                  <div className={styles.mumbersInRow}>30 %</div>
                </div>
              </div>
              <div
                className={styles.salesChartWrapper}
                style={{ marginTop: '20px' }}
              >
                <div className={styles.title}>Внешние расходы</div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Всего расходов</div>
                  <div className={styles.mumbersInRow}>400 500 ₽</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Внешние расходы</div>
                  <div className={styles.mumbersInRow}>400 500 ₽</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Затраты на самовыкупы</div>
                  <div className={styles.mumbersInRow}>0 ₽</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>
                    Расходов в % от выручки
                  </div>
                  <div className={styles.mumbersInRow}>5,5 %</div>
                </div>
              </div>
            </div>
            <div className={styles.rightWrapper}>
              <div className={styles.salesChartWrapper}>
                <div className={styles.title}>Удержания и компенсации WB</div>
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
                      <div>20</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div className={styles.headerInRow}>₽</div>2 000 500
                    </div>
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Эквайринг</div>
                  <div className={styles.numbersBox}>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div>0,1</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      9 000
                    </div>
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Логистика</div>
                  <div className={styles.numbersBox}>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div>12,4</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      1 000 000
                    </div>
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Хранение</div>
                  <div className={styles.numbersBox}>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div>0,9</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      77 000
                    </div>
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Прочие удержания</div>
                  <div className={styles.numbersBox}>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div>10,1</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      870 000
                    </div>
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Приёмка</div>
                  <div className={styles.numbersBox}>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div>0,3</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      26 000
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
                      <div>20</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div className={styles.headerInRow}>₽</div>2 000 500
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
                      <div>3</div>
                    </div>
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      8 000
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
                      8 000
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
                      8 000
                    </div>
                  </div>
                </div>
                <div className={styles.totalBox}>
                  <div>Итого от выручки</div>
                  <div className={styles.totalNumbers}>
                    <div> 2 000 000 ₽</div>
                    <div>30 %</div>
                  </div>
                </div>
              </div>
              <div
                className={styles.salesChartWrapper}
                style={{ marginTop: '20px' }}
              >
                <div className={styles.title}>Налог</div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Тип налогообложения</div>
                  <div className={styles.numbersBox}>
                    {/* <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      <div></div>
                    </div> */}
                    <div
                      className={`${styles.mumbersInRow} ${styles.widthHeader}`}
                    >
                      УНС-доходы
                    </div>
                  </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Ставка налога</div>
                  <div className={styles.mumbersInRow}>6 %</div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>WB реализовал</div>
                  <div className={styles.mumbersInRow}>6 400 500 ₽ </div>
                </div>
                <div className={styles.salesChartRow}>
                  <div className={styles.titleInRow}>Налоговая база</div>
                  <div className={styles.mumbersInRow}>6 400 500 ₽ </div>
                </div>
                <div
                  className={styles.salesChartRow}
                  style={{ marginBottom: '45px' }}
                >
                  <div className={styles.titleInRow}>Налог</div>
                  <div className={styles.mumbersInRow}>400 500 ₽ </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportDashboard;
