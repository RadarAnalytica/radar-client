import styles from './blogItem.module.css'
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

const BlogItem = ({ title, category, preview, date }) => {
  return (
    <Link to='/' className={styles.card}>
      <div className={styles.card__coverWrapper}>
        <img src={preview} alt='' />
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__tagsWrapper}>
          <div className={styles.card__tag}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle opacity="0.2" cx="9.87168" cy="9.93613" r="9.60801" fill="#4092F7" />
              <rect opacity="0.4" x="3.86719" y="3.92969" width="12.01" height="12.01" rx="6.005" fill="#4092F7" />
              <rect x="4.17859" y="4.24109" width="11.3872" height="11.3872" rx="5.6936" stroke="#4092F7" strokeWidth="0.622801" />
              <circle cx="9.86743" cy="9.70239" r="1.4013" fill="white" stroke="#1261C2" strokeWidth="0.934202" />
            </svg>

            {category}
          </div>
          <p className={`${styles.card__text} ${styles.card__text_gray}`}>{date}</p>
        </div>

        <h3 className={styles.card__title}>{title}</h3>
        <div className={styles.card__controlsWrapper}>
          <ConfigProvider
            theme={{
              token: {
                colorBorder: '#00000033',
                colorPrimary: '#5329FF',
              },
              components: {
                Button: {
                  primaryColor: 'white',
                  //paddingInline: 8,
                  paddingBlockLG: 10,
                  paddingInlineLG: 8,
                }
              }
            }}
          >
            <Button>Редактировать</Button>
            <Button>Выключить</Button>
            <Button>Удалить</Button>
          </ConfigProvider>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem;