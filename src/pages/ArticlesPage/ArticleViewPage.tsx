import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './ArticleViewPage.module.css';
import { fetchArticleBySlug } from '@/redux/blog/blogActions';
import { clearCurrentArticle } from '@/redux/blog/blogSlice';
import { URL } from '@/service/config';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store.types';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const ArticleViewPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const { currentArticle, loading, error } = useAppSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (slugOrId) {
      dispatch(fetchArticleBySlug(slugOrId));
    }

    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [dispatch, slugOrId]);

  const handleBackClick = () => {
    navigate('/admin/blog');
  };

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
        <h2>Ошибка загрузки статьи</h2>
        <p>{error}</p>
        <Button type="primary" onClick={handleBackClick}>
          Вернуться к списку статей
        </Button>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className={styles.errorContainer}>
        <h2>Статья не найдена</h2>
        <Button type="primary" onClick={handleBackClick}>
          Вернуться к списку статей
        </Button>
      </div>
    );
  }

  const {
    title,
    description,
    created_at,
    updated_at,
    content,
    image_url,
  } = currentArticle;

  const formattedCreatedDate = moment(created_at).format('D MMMM YYYY');
  const formattedUpdatedDate = moment(updated_at).format('D MMMM YYYY');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackClick}
          className={styles.backButton}
        >
          Назад к статьям
        </Button>

        <article className={styles.article}>
          {image_url && (
            <div className={styles.imageContainer}>
              <img 
                src={image_url} 
                alt={title} 
                className={styles.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <h1 className={styles.title}>{title}</h1>

          {description && (
            <p className={styles.description}>{description}</p>
          )}

          <div className={styles.metadata}>
            <span className={styles.date}>
              Опубликовано: {formattedCreatedDate}
            </span>
            {created_at !== updated_at && (
              <span className={styles.date}>
                Обновлено: {formattedUpdatedDate}
              </span>
            )}
          </div>

          {content && (
            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ 
                __html: content
              }}
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default ArticleViewPage;

