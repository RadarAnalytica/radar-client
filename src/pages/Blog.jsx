import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import './styles.css';
import NavbarMainHome from '../components/NavbarMainHome';
import marketing from '../assets/marketing-icon.svg';
import goods from '../assets/goods-icon.svg';
import logostic from '../assets/logistic-icon.svg';
import cardOfGoods from '../assets/card-of-goods-icon.svg';
import promotion from '../assets/promotion-icon.svg';
import docs from '../assets/documents-icon.svg';
import finance from '../assets/finance-icon.svg';
import supply from '../assets/supply-icon.svg';
import blogDot from '../assets/blog-dot.svg';
import arrowDown from '../assets/arrow-down-small.svg';
import BlogHeader from '../components/BlogHeader';
import BlogNavList from '../components/BlogNavList';
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

const blogList = [
  {
    title: 'Доля рекламных расходов на маркетплейсе',
    date: '12.09.2023',
    description: 'Учимся оценивать затраты на продвижение и минимизировать их',
    image:
      'https://img.freepik.com/premium-photo/close-up-business-colleagues-shaking-hands-office_1048944-29942241.jpg?w=1060',
    category: 'Маркетинг',
  },
  {
    title: 'Доля рекламных расходов на маркетплейсе',
    date: '12.09.2023',
    description: 'Учимся оценивать затраты на продвижение и минимизировать их',
    image:
      'https://img.freepik.com/premium-photo/close-up-business-colleagues-shaking-hands-office_1048944-29942241.jpg?w=1060',
    category: 'Маркетинг',
  },
  {
    title: 'Доля рекламных расходов на маркетплейсе',
    date: '12.09.2023',
    description: 'Учимся оценивать затраты на продвижение и минимизировать их',
    image:
      'https://img.freepik.com/premium-photo/close-up-business-colleagues-shaking-hands-office_1048944-29942241.jpg?w=1060',
    category: 'Маркетинг',
  },
];

const Blog = () => {
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
            <div className={styles.blogNavBox}>
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
            <div>
              <span className={styles.blogItemWrapper}>
                {blogList.map((blog, index) => (
                  <Link
                    key={index}
                    to={`/blog/${index}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div id={index} className={styles.blogArticleBox}>
                      <div className={styles.blogItemImage}>
                        <img src={blog.image} alt={blog.title} />
                      </div>
                      <div className={styles.blogItemInfo}>
                        <div className={styles.blogItemCategory}>
                          <img src={blogDot} alt='dot' />
                          Маркетинг
                        </div>
                        <div className={styles.blogItemDate}>{blog.date}</div>
                      </div>
                      <div className={styles.blogItem}>
                        <div className={styles.blogItemTitle}>{blog.title}</div>
                        <div className={styles.blogItemDescription}>
                          {blog.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default Blog;
