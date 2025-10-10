import { useEffect } from 'react';
import styles from './ArticlesPage.module.css';
import { fetchArticles } from '@/redux/blog/blogActions';
import ArticleCard from './components/ArticleCard/ArticleCard';
import { Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store.types';

const ArticlesPage = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Ошибка загрузки статей</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Статьи</h1>
        
        {articles.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Статьи не найдены</p>
          </div>
        ) : (
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;

