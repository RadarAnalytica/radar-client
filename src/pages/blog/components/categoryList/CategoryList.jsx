import React, { useState } from 'react';
import styles from './CategoryList.module.css';
import { Button, Modal, ConfigProvider } from 'antd';
import { deleteBlogCategory } from '@/service/api/api';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCategories } from '@/redux/blog/blogActions';
import { URL } from '@/service/config';

function CategoryList({ categories, token, setCategoryIdForUpdate }) {
  const dispatch = useAppDispatch();
  const [deleteStatus, setDeleteStatus] = useState({ isLoading: false, id: null });
  const [confirm, setConfirm] = useState({ open: false, category: null });

  const requestDelete = (category) => setConfirm({ open: true, category });

  const doDelete = async () => {
    const category = confirm.category;
    if (!category?.id) return setConfirm({ open: false, category: null });

    setDeleteStatus({ isLoading: true, id: category.id });
    try {
      await deleteBlogCategory(category.id, token);
      dispatch(fetchCategories(token));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setDeleteStatus({ isLoading: false, id: null });
      setConfirm({ open: false, category: null });
    }
  };

  return (
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
      <div className={styles.page}>
        {(categories || []).map((c) => (
          <div key={c.id} className={styles.card}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{c.name}</h3>
              <div className={styles.actions}>
                <Button size="small" type='link' onClick={() => setCategoryIdForUpdate(c.id)}>
                  Редактировать
                </Button>
                <Button
                  size="small"
                  type='link'
                  danger
                  loading={deleteStatus.isLoading && deleteStatus.id === c.id}
                  onClick={() => requestDelete(c)}
                >
                  Удалить
                </Button>
              </div>
            </div>

            <div className={styles.meta}>
              {c.slug ? <div className='flex-grow-1'>slug: {c.slug}</div> : null}
              {c.description || c.icon ? (
                <div className={styles.descriptionWithIcon}>
                  {c.description ? <div className={styles.description}>{c.description}</div> : null}
                  {c.icon ? (
                    <img 
                      src={`${URL}/static/blog${c.icon}`} 
                      alt={c.name} 
                      className={styles.icon}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={confirm.open}
        title="Удалить категорию?"
        okText="Удалить"
        okButtonProps={{ danger: true, loading: deleteStatus.isLoading }}
        cancelText="Отмена"
        onOk={doDelete}
        onCancel={() => setConfirm({ open: false, category: null })}
      >
        <div>Категория: {confirm.category?.name}</div>
      </Modal>
    </ConfigProvider>
  );
}

export default CategoryList;


