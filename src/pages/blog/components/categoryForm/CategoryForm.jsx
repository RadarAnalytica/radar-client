import React, { useMemo, useState } from 'react';
import styles from './CategoryForm.module.css';
import { Button, ConfigProvider, Form, Input, Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { createBlogCategory, updateBlogCategory } from '@/service/api/api';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCategories } from '@/redux/blog/blogActions';
import { URL } from '@/service/config';

const statusInitialState = { isLoading: false, isError: false, isSuccess: false, message: '' };

/**
 * Unified category form for create/update.
 * - mode: 'create' | 'update'
 * - category: required for mode='update'
 */
function CategoryForm({ mode, token, category, onCancel, onDone }) {
  const dispatch = useAppDispatch();
  const [mainFormStatus, setMainFormStatus] = useState(statusInitialState);
  const [form] = Form.useForm();

  const isUpdate = mode === 'update';

  const initialValues = useMemo(() => {
    if (!isUpdate || !category) return undefined;
    return {
      categoryName: category.name,
      categorySlug: category.slug,
      categoryDescription: category.description,
    };
  }, [isUpdate, category]);

  const submitHandler = async (fields) => {
    setMainFormStatus({ ...statusInitialState, isLoading: true });

    let query = `name=${fields.categoryName}`;
    if (fields.categorySlug) query += `&slug=${String(fields.categorySlug)}`;
    if (fields.categoryDescription) query += `&description=${fields.categoryDescription}`;

    const formData = new FormData();
    if (fields.iconFile?.file?.originFileObj) {
      formData.append('icon', fields.iconFile.file.originFileObj);
    }

    try {
      if (isUpdate) {
        if (!category?.id) throw new Error('Не удалось обновить категорию: отсутствует id');
        await updateBlogCategory(category.id, formData, query, token);
        setMainFormStatus({ ...statusInitialState, isSuccess: true, message: 'Категория успешно обновлена' });
      } else {
        await createBlogCategory(formData, query, token);
        setMainFormStatus({ ...statusInitialState, isSuccess: true, message: 'Категория успешно создана' });
        form.resetFields();
      }

      dispatch(fetchCategories(token));
      onDone?.();
    } catch (error) {
      setMainFormStatus({
        ...statusInitialState,
        isError: true,
        message: error?.message || error?.detail || (isUpdate ? 'Не удалось обновить категорию' : 'Не удалось создать категорию'),
      });
    }
  };

  return (
    <div className={styles.page}>
      {onCancel ? (
        <div className={styles.page__titleWrapper} onClick={onCancel}>
          <h2 className={styles.page__title}>{isUpdate ? 'Обновление категории' : 'Создание категории'}</h2>
          <button className={styles.page__backButton}>&larr; Назад</button>
        </div>
      ) : (
        <h2 className={styles.page__title}>{isUpdate ? 'Обновление категории' : 'Создание категории'}</h2>
      )}

      <ConfigProvider
        theme={{
          token: { colorBorder: '#00000033', colorPrimary: '#5329FF' },
          components: {
            Button: { primaryColor: 'white', paddingBlockLG: 10, paddingInlineLG: 8 },
          },
        }}
      >
        <Form form={form} className={styles.form} layout="vertical" onFinish={submitHandler} initialValues={initialValues}>
          <Form.Item
            label="Название категории"
            name="categoryName"
            rules={[{ required: true, message: 'Пожалуйста, заполните это поле' }]}
          >
            <Input placeholder="Введите название категории" size="large" />
          </Form.Item>

          <Form.Item label="Url категории" name="categorySlug">
            <Input placeholder="Введите url категории" size="large" />
          </Form.Item>

          <Form.Item label="Описание категории" name="categoryDescription">
            <Input placeholder="Введите описание категории" size="large" />
          </Form.Item>

          <Form.Item
            label="Иконка категории"
            name="iconFile"
            rules={!isUpdate ? [{ required: true, message: 'Пожалуйста, заполните это поле' }] : undefined}
          >
            <Upload.Dragger maxCount={1} accept=".png,.svg">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Кликните или перетащите файл</p>
            </Upload.Dragger>

            {isUpdate && category?.icon && (
              <div className={styles.currentIconWrapper}>
                <a 
                  href={`${URL}/static/blog${category.icon}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.iconLink}
                >
                  <img src={`${URL}/static/blog${category.icon}`} alt={category.name} className={styles.currentIcon} />
                </a>
              </div>
            )}
          </Form.Item>

          <Button className={styles.form__submitButton} type="primary" htmlType="submit" loading={mainFormStatus.isLoading}>
            {isUpdate ? 'Сохранить' : 'Создать'}
          </Button>
        </Form>
      </ConfigProvider>

      <Modal
        open={mainFormStatus.isError || mainFormStatus.isSuccess}
        footer={null}
        onOk={() => setMainFormStatus(statusInitialState)}
        onClose={() => setMainFormStatus(statusInitialState)}
        onCancel={() => setMainFormStatus(statusInitialState)}
      >
        <div className={styles.form__modalBody}>{mainFormStatus.message}</div>
      </Modal>
    </div>
  );
}

export default CategoryForm;


