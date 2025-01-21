import React, { useState } from 'react';
import styles from './BlogArticle.module.css';
import NavbarMainHome from '../components/NavbarMainHome';
import BlogHeader from '../components/BlogHeader';
import BlogNavList from '../components/BlogNavList';
import marketing from '../assets/marketing-icon.svg';
import goods from '../assets/goods-icon.svg';
import logostic from '../assets/logistic-icon.svg';
import cardOfGoods from '../assets/card-of-goods-icon.svg';
import promotion from '../assets/promotion-icon.svg';
import docs from '../assets/documents-icon.svg';
import finance from '../assets/finance-icon.svg';
import supply from '../assets/supply-icon.svg';
import arrowDown from '../assets/arrow-down-small.svg';
import drr from '../assets/drr.png';
import calculator from '../assets/blog-calculator.png';
import FooterNewVersion from '../components/FooterNewVersion';

const blogNavElements = [
  { title: 'Маркетинг', icon: marketing },
  { title: 'Товары', icon: goods },
  { title: 'Логистика', icon: logostic },
  { title: 'Карточка товара', icon: cardOfGoods },
  { title: 'Продвижение', icon: promotion },
  { title: 'Документы', icon: docs },
  { title: 'Финансовый учет', icon: finance },
  { title: 'Поставщикам', icon: supply },
];

const BlogArticle = () => {
  const [activeCategory, setActiveCategory] = useState('Маркетинг');
  const [showNav, setShowNav] = useState(true);

  const handleCategoryClick = (title) => {
    setActiveCategory(title);
  };

  return (
    <div
      className='page-white'
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <div className='container widbody-container container-xlwidth'>
        <NavbarMainHome />
        <BlogHeader />
        <div className={styles.blogContainer}>
          <div className={styles.blogNavWrapper}>
            <div>
              <span className={styles.blogNavTitleBox}>
                <div className={styles.blogNavTitle}>Рубрики</div>
                <span
                  className={styles.openCloseNavButton}
                  onClick={() => setShowNav(!showNav)}
                >
                 <img src={arrowDown} alt='arrow' />
                </span>
                </span>
              
                {showNav && (
                <div className={styles.blogNavList}>
                  <BlogNavList
                    blogNavElements={blogNavElements}
                    activeCategory={activeCategory}
                    onCategoryClick={handleCategoryClick}
                  />
                </div>
              )}
            </div>
            <div className={styles.blogTextBox}>
              <div className={styles.contextContentBox}>
                <span className={styles.contextTtile}>Содержание</span>
                <div className={styles.contextContent}>
                  <span>1. Что такое доля рекламных расходов</span>
                  <span>2. Зачем знать ДРР</span>
                  <span>3. Как определить ДРР на маркетплейсах</span>
                  <span>3.1 Что учитывается при расчете ДРР</span>
                  <span>3.2 Норма ДРР для селлеров</span>
                  <span>4. Как оптимизировать ДРР</span>
                  <span>5. Отличие ДРР от других метрик</span>
                  <span>6. Заключение</span>
                </div>
              </div>
              <p className={styles.contextText}>
                Нет смысла торговать на маркетплейсе, не вкладываясь
                в продвижение. Такой подход уже давно стал неэффективным.
                Но у рекламы есть свои риски: можно слить весь бюджет
                и не получить нужного результата. Как этого избежать?
              </p>
              <p className={styles.contextText}>
                Для контроля процесса надо рассчитать долю рекламных расходов
                от доходов. Разбираемся, какой она должна быть, как
                оптимизировать продвижение товаров и как посчитать ДРР.
              </p>
              <h3>Что такое доля рекламных расходов</h3>
              <div className={styles.contextTextQuote}>
                <p className={styles.contextText}>
                  Доля рекламных расходов (ДРР) — это отношение расходов
                  на рекламу к доходу от нее. Ты можешь увидеть эффективность
                  рекламной кампании за счет оценки затрат на нее.
                </p>
              </div>
              <p className={styles.contextText}>
                Доля рекламных расходов на Озон и Вайлдберриз, а также на других
                маркетплейсах рассчитывается по формуле:
              </p>
              <span className={styles.imgPlusTextBox}>
                <img src={drr} alt='drr' className={styles.contextImageDrr} />
                <span className={styles.textUnderDrr}>
                  Формула расчета доли рекламных расходов за определенный
                  период.
                </span>
              </span>
              <p className={styles.contextText}>
                Посчитать целевую долю рекламных расходов можно самостоятельно.
                Но чтобы упростить задачу, воспользуйся онлайн-калькуляторами,
                которых много в интернете. Например, вот один из них:
              </p>
              <span className={styles.imgPlusTextBox}>
                <img
                  src={calculator}
                  alt='calculator'
                  className={styles.contextImageDrr}
                />
                <span className={styles.textUnderDrr}>
                  Пример онлайн-калькулятора.
                </span>
              </span>
              <h3>Зачем знать ДРР</h3>
              <p className={styles.contextText}>
                Показатель помогает селлеру оценить, насколько выгодно
                он вкладывает деньги в продвижение. На практике это позволяет:
              </p>
              <div className={styles.contextTitleWithDotBox}>
                <div className={styles.dot}></div>
                <span>Оптимизировать продвижение</span>
              </div>
              <p className={styles.contextText}>Для каждого конкретного товара подходит определенный вид рекламы. Что-то лучше продвигается в поиске, а что-то пользуется спросом благодаря рекомендации блогера. Чтобы оценить ситуацию и выбрать верную маркетинговую стратегию, нужно рассчитать ДДР для всех каналов продвижения и выбрать один или несколько оптимальных.</p>
              <div className={styles.contextTitleWithDotBox}>
                <div className={styles.dot}></div>
                <span>Выявить динамику эффективности рекламы</span>
              </div>
              <p className={styles.contextText}>Если регулярно проводить расчеты и сравнивать показатели по нескольким периодам (сезон, месяц, день недели), можно выявить закономерность, когда та или иная реклама наиболее эффективна для карточки.</p>
              <div className={styles.contextTitleWithDotBox}>
                <div className={styles.dot}></div>
                <span>Рассчитать бюджет на продвижение</span>
              </div>
              <p className={styles.contextText}>Имея под рукой ДДР и сумму выручки, ты можешь спланировать затраты на рекламу в будущем периоде. Нехитрые математические вычисления позволяют держать ситуацию под контролем и не уйти в минус из-за оплаты рекламных расходов.</p>
              <h3>Как определить ДРР на маркетплейсах</h3>
              <p className={styles.contextText}>Осталось научиться определять ДРР при торговле на площадках. Важно помнить про множество мелочей, чтобы избежать погрешности и результат был верным.</p>
              <div className={styles.contextTitleWithDotBox}>
                <span>Что учитывается при расчете ДРР</span>
              </div>
              <div className={styles.contextTitleWithDotBoxLong}>
                <div className={styles.dot}></div>
                <span className={styles.contextTextLong}>Период, за который ведется сбор данных для подсчета (например, день, неделя или месяц);</span>
              </div>
              <div className={styles.contextTitleWithDotBoxLong}>
                <div className={styles.dot}></div>
                <span className={styles.contextTextLong}>Расходы на определенный тип продвижения или всю запущенную рекламу в целом (ищи в отчетах маркетплейса);</span>
              </div>
              <div className={styles.contextTitleWithDotBoxLong}>
                <div className={styles.dot}></div>
                <span className={styles.contextTextLong}>Информацию о выручке.</span>
              </div>
           </div>
          </div>
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default BlogArticle;
