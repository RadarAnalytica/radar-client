import styles from './BlogHeader.module.css';

const BlogHeader = () => {
  return (
    <div className={styles.blogHeader}>
      <span className={styles.blogTitle}>Блог Радара</span>
      <span className={styles.blogSubtitle}>
        Просто о сложном: всё про работу на маркетплейсах
      </span>
    </div>
  );
};

export default BlogHeader;