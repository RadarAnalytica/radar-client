import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';
import { URL } from '@/service/config';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    description: string;
    slug: string;
    created_at: string;
    image_url: string;
    is_published: boolean;
  };
}

const ArticleCard = ({ article }: ArticleCardProps) => {
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
  const articleCover = image_url ? `${URL}/static/blog${image_url}` : null;

  return (
    <div className={styles.card}>
      {image_url && (
        <div className={styles.imageContainer}>
          <img 
            src={articleCover} 
            alt={title} 
            className={styles.image}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
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

