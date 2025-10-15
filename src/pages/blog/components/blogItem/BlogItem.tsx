import { useContext, useState } from 'react';
import styles from './blogItem.module.css';
import { Button, ConfigProvider, Modal } from 'antd';
import moment from 'moment';
import AuthContext from '@/service/AuthContext';
import { URL } from '@/service/config';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { fetchPosts } from '@/redux/blog/blogActions';

interface BlogItemProps {
  title: string;
  category: { name: string };
  preview: string;
  created_at: string;
  description: string;
  is_published: boolean;
  allData: any;
  setPostIdForUpdate: (id: string) => void;
  slug: string;
  is_recommended: boolean;
  is_popular: boolean;
}

const initState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

const BlogItem = ({ title, category, preview, created_at, description, is_published, allData, setPostIdForUpdate, slug, is_recommended, is_popular, ...rest }: BlogItemProps) => {

  const dispatch = useAppDispatch();
  const { authToken } = useContext(AuthContext);
  const [isConfirmationModalActive, setIsConfirmationModalActive] = useState(false);
  const [status, setStatus] = useState(initState);

  const deleteArticleHandler = async () => {
    setStatus({ ...initState, isLoading: true });
    const { id } = rest;
    try {

      const res = await fetch(`${URL}/api/admin/blog/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': 'JWT ' + authToken
        }
      });

      if (!res.ok) {
        setStatus({ ...initState, isError: true, message: 'Не удалось удалить статью.' });
      }

      setStatus({ ...initState, isSuccess: true, message: 'Статья успешно удалена' });
      dispatch(fetchPosts(authToken));
    } catch {
      setStatus({ ...initState, isError: true, message: 'Не удалось удалить статью.' });
    }
  };

  const ArticleVisibilityHandler = async () => {
    setStatus({ ...initState, isLoading: true });
    const { id } = rest;
    try {

      const res = await fetch(`${URL}/api/admin/blog/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': 'JWT ' + authToken
        },
        body: JSON.stringify({ ...allData, is_published: !is_published })
      });

      if (!res.ok) {
        setStatus({ ...initState, isError: true, message: 'Не удалось изменить видимость статьи.' });
      }

      setStatus(initState);
      dispatch(fetchPosts(authToken));
    } catch {
      setStatus({ ...initState, isError: true, message: 'Не удалось изменить видимость статьи.' });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__coverWrapper}>
        <img src={`${URL}/static/blog${preview}`} alt={title} />
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__tagsWrapper}>
          <div className={styles.card__tag}>
            # {category?.name}
          </div>
          <p className={`${styles.card__text} ${styles.card__text_gray}`}>{moment(created_at).format('DD.MM.YYYY')}</p>
        </div>

        <div className={styles.card__titleWrapper}>
          <Link to={`/admin/article/demo/${slug}`} target='_blank'>
            <h3 className={styles.card__title}>{title}</h3>
          </Link>
          <p className={`${styles.card__text} ${styles.card__text_gray}`}>{description ? description : 'Нет описания'}</p>
        </div>


        <div className={styles.card__controlsWrapper}>

          <div className={styles.card__buttonWrapper}>
            <ConfigProvider
              theme={{
                token: {
                  colorBorder: '#00000033',
                  colorPrimary: '#5329FF',
                  fontSize: 14
                },
                components: {
                  Button: {
                    primaryColor: 'white',
                    paddingInline: 10,
                  }
                }
              }}
            >
              <Button
                loading={status.isLoading}
                onClick={() => setPostIdForUpdate(rest?.id)}
                style={{fontWeight: 600}}
                type='primary'
              >Редактировать</Button>
              <Button
                onClick={ArticleVisibilityHandler}
                loading={status.isLoading}
                style={{fontWeight: 600}}
              >{is_published ? 'Выключить' : 'Включить'}</Button>
            </ConfigProvider>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorBorder: '#00000033',
                colorPrimary: '#ff4d4f',
                fontSize: 14
              },
              components: {
                Button: {
                  primaryColor: 'white',
                  paddingInline: 10,
                }
              }
            }}
          >
            <Button
              type='primary'
              onClick={() => setIsConfirmationModalActive(true)}
              loading={status.isLoading}
              style={{fontWeight: 600}}
            >Удалить</Button>
          </ConfigProvider>
        </div>
      </div>


      {/* Confirmation modal */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff4d4f',
          }
        }}
      >
        <Modal
          open={isConfirmationModalActive}
          onClose={() => setIsConfirmationModalActive(false)}
          onCancel={() => setIsConfirmationModalActive(false)}
          onOk={() => {
            deleteArticleHandler();
            setIsConfirmationModalActive(false);
          }}
          cancelText='Отменить'
          okText='Удалить'
        >
          <div className={styles.modal}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
              <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
            </svg>
            {'Внимание! Это действие нельзя отменить.'}
          </div>
        </Modal>
      </ConfigProvider>

      {/* Status modal */}
      <Modal
        open={status.isSuccess || status.isError}
        footer={null}
        onOk={() => setStatus(initState)}
        onCancel={() => setStatus(initState)}
        onClose={() => setStatus(initState)}
      >
        <div className={styles.modal}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
            <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
          </svg>
          {status.message}
        </div>
      </Modal>
    </div>
  );
};

export default BlogItem;
