import React, { useMemo, useState } from 'react';
import styles from './BlogForm.module.css';
import { Button, Checkbox, ConfigProvider, Form, Input, Modal, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { createBlogPost } from '@/service/api/api';
import { URL } from '@/service/config';
import { useAppDispatch } from '@/redux/hooks';
import { fetchPosts } from '@/redux/blog/blogActions';

const statusInitialState = { isLoading: false, isError: false, isSuccess: false, message: '' };

/**
 * Unified blog form for create/update.
 * - mode: 'create' | 'update'
 * - post: required for mode='update'
 */
function BlogForm({ mode, categories, token, post, onCancel, onDone }) {
  const dispatch = useAppDispatch();
  const [mainFormStatus, setMainFormStatus] = useState(statusInitialState);
  const [mainForm] = Form.useForm();

  const isUpdate = mode === 'update';

  const initialValues = useMemo(() => {
    if (!isUpdate || !post) return undefined;
    return {
      articleName: post.title,
      articleUrl: post.slug,
      articleDescription: post.description,
      category: post.category_id,
      is_published: Boolean(post.is_published),
      is_recommended: Boolean(post.is_recommended),
      is_popular: Boolean(post.is_popular),
    };
  }, [isUpdate, post]);

  const mainFormSubmitHandler = async (fields) => {
    setMainFormStatus({ ...statusInitialState, isLoading: true });

    // CREATE
    if (!isUpdate) {
      let query =
        `title=${fields.articleName}` +
        `&category_id=${fields.category}` +
        `&description=${fields.articleDescription}` +
        `&is_published=${Boolean(fields.is_published)}` +
        `&is_recommended=${Boolean(fields.is_recommended)}` +
        `&is_popular=${Boolean(fields.is_popular)}`;

      if (fields.articleUrl) query += `&slug=${String(fields.articleUrl)}`;

      const formData = new FormData();
      if (fields.textFile?.file?.originFileObj) formData.append('document', fields.textFile.file.originFileObj);
      if (fields.coverFile?.file?.originFileObj) formData.append('cover_image', fields.coverFile.file.originFileObj);

      try {
        await createBlogPost(formData, query, token);
        setMainFormStatus({ ...statusInitialState, isSuccess: true, message: 'Статья успешно создана' });
        mainForm.resetFields();
      } catch (error) {
        setMainFormStatus({
          ...statusInitialState,
          isError: true,
          message: error?.message || error?.detail || 'Что-то пошло не так при создании статьи',
        });
      }
      return;
    }

    // UPDATE
    if (!post?.id) {
      return setMainFormStatus({ ...statusInitialState, isError: true, message: 'Не удалось обновить статью: отсутствует id' });
    }

    const plainData = {
      title: fields.articleName,
      slug: fields.articleUrl,
      category_id: fields.category,
      description: fields.articleDescription,
    };

    const filesData = new FormData();
    if (fields.textFile?.file?.originFileObj) filesData.append('document', fields.textFile.file.originFileObj);
    if (fields.coverFile?.file?.originFileObj) filesData.append('cover_image', fields.coverFile.file.originFileObj);

    try {
      const plainDataRes = await fetch(`${URL}/api/admin/blog/articles/${post.id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
        body: JSON.stringify(plainData),
      });

      if (!plainDataRes.ok) {
        return setMainFormStatus({ ...statusInitialState, isError: true, message: 'Не удалось обновить статью' });
      }

      const hasFiles = filesData.has('document') || filesData.has('cover_image');
      if (hasFiles) {
        const filesDataRes = await fetch(`${URL}/api/admin/blog/articles/${post.id}/files`, {
          method: 'PATCH',
          headers: { authorization: 'JWT ' + token },
          body: filesData,
        });

        if (!filesDataRes.ok) {
          return setMainFormStatus({ ...statusInitialState, isError: true, message: 'Не удалось обновить статью' });
        }
      }

      setMainFormStatus({ ...statusInitialState, isSuccess: true, message: 'Статья успешно обновлена' });
      mainForm.resetFields();
      dispatch(fetchPosts(token));
      onDone?.();
    } catch (error) {
      setMainFormStatus({ ...statusInitialState, isError: true, message: 'Что-то пошло не так при обновлении статьи' });
    }
  };

  return (
    <div className={styles.page}>
      {onCancel ? (
        <div className={styles.page__titleWrapper} onClick={onCancel}>
          <h2 className={styles.page__title}>{isUpdate ? 'Обновление статьи' : 'Создание статьи'}</h2>
          <button className={styles.page__backButton}>&larr; Назад</button>
        </div>
      ) : (
        <h2 className={styles.page__title}>{isUpdate ? 'Обновление статьи' : 'Создание статьи'}</h2>
      )}

      <ConfigProvider
        theme={{
          token: { colorBorder: '#00000033', colorPrimary: '#5329FF' },
          components: {
            Button: { primaryColor: 'white', paddingBlockLG: 10, paddingInlineLG: 8 },
          },
        }}
      >
        <Form
          form={mainForm}
          className={styles.form}
          layout="vertical"
          onFinish={mainFormSubmitHandler}
          initialValues={initialValues}
        >
          <Form.Item
            label="Название статьи"
            name="articleName"
            rules={[
              { required: true, message: 'Пожалуйста, заполните это поле' },
              { min: 3, message: 'Название должно быть длиннее 3х символов' },
            ]}
          >
            <Input placeholder="Введите название статьи" size="large" />
          </Form.Item>

          <Form.Item
            label="Url статьи"
            name="articleUrl"
            rules={[{ min: 3, message: 'Название должно быть длиннее 3х символов' }]}
          >
            <Input placeholder="Введите url статьи" size="large" />
          </Form.Item>

          <Form.Item
            label="Описание статьи"
            name="articleDescription"
            rules={[{ required: true, message: 'Пожалуйста, заполните это поле' }]}
          >
            <Input placeholder="Введите описание статьи" size="large" />
          </Form.Item>

          <Form.Item
            label="Текст статьи"
            name="textFile"
            rules={!isUpdate ? [{ required: true, message: 'Пожалуйста, заполните это поле' }] : undefined}
          >
            <Upload.Dragger maxCount={1} accept=".doc,.docx,.pages">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Кликните или перетащите файл</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            label="Обложка статьи"
            name="coverFile"
            rules={!isUpdate ? [{ required: true, message: 'Пожалуйста, заполните это поле' }] : undefined}
          >
            <Upload.Dragger maxCount={1} accept=".png,.jpg,.jpeg,.JPG,.JPEG,.svg,.webp">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Кликните или перетащите файл</p>
            </Upload.Dragger>
          </Form.Item>

          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: 'white',
                colorBorder: '#EAEAF1',
                borderRadius: 8,
                fontFamily: 'Manrope',
                colorPrimary: 'black',
              },
              components: {
                Select: {
                  activeBorderColor: '#EAEAF1',
                  activeOutlineColor: 'transparent',
                  hoverBorderColor: '#EAEAF1',
                  optionActiveBg: 'transparent',
                  optionSelectedBg: 'transparent',
                  optionSelectedColor: '#5329FF',
                },
              },
            }}
          >
            <Form.Item
              label="Категория статьи"
              name="category"
              rules={[{ required: true, message: 'Пожалуйста, заполните это поле' }]}
            >
              <Select
                options={(categories || []).map((c) => ({ value: c.id, label: c.name }))}
                size="large"
                placeholder="Выберите категорию статьи"
              />
            </Form.Item>
          </ConfigProvider>

          {!isUpdate && (
            <>
              <Form.Item label="Активная статья" name="is_published" valuePropName="checked">
                <Checkbox>Опубликовать</Checkbox>
              </Form.Item>
              <Form.Item label="Рекомендованная статья" name="is_recommended" valuePropName="checked">
                <Checkbox>Рекомендовать</Checkbox>
              </Form.Item>
              <Form.Item label="Популярная статья" name="is_popular" valuePropName="checked">
                <Checkbox>Популярная</Checkbox>
              </Form.Item>
            </>
          )}

          <Button
            className={styles.form__submitButton}
            type="primary"
            htmlType="submit"
            loading={mainFormStatus.isLoading}
          >
            {isUpdate ? 'Сохранить' : 'Создать'}
          </Button>
        </Form>
      </ConfigProvider>

      <Modal
        open={mainFormStatus.isError || mainFormStatus.isSuccess}
        footer={null}
        onOk={() => {
          dispatch(fetchPosts(token));
          setMainFormStatus(statusInitialState);
          onDone?.();
        }}
        onClose={() => {
          dispatch(fetchPosts(token));
          setMainFormStatus(statusInitialState);
          onDone?.();
        }}
        onCancel={() => {
          dispatch(fetchPosts(token));
          setMainFormStatus(statusInitialState);
          onDone?.();
        }}
      >
        <div className={styles.form__modalBody}>{mainFormStatus.message}</div>
      </Modal>
    </div>
  );
}

export default BlogForm;
