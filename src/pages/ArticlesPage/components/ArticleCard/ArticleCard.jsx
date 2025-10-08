import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const ArticleCard = ({ article }) => {
  const {
    id,
    title,
    description,
    slug,
    created_at,
    image_url,
    is_published
  } = article;

  const formattedDate = moment(created_at).format('D MMMM YYYY');
  const articleUrl = slug ? `/articles/${slug}` : `/articles/${id}`;

  return (
    <div className={styles.card}>
      {image_url && (
        <div className={styles.imageContainer}>
          <img 
            src={image_url} 
            alt={title} 
            className={styles.image}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <Link to={articleUrl} className={styles.titleLink}>
              {title}
            </Link>
          </h3>
          
          {!is_published && (
            <span className={styles.draftBadge}>Черновик</span>
          )}
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        <div className={styles.footer}>
          <span className={styles.date}>{formattedDate}</span>
          
          <Link to={articleUrl} className={styles.readMore}>
            Читать далее →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

