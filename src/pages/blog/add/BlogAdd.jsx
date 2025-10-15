import React, { useState } from 'react';
import styles from './BlogAdd.module.css';
import { Form, Input, Upload, Select, Button, ConfigProvider, Modal, Checkbox } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { createBlogPost, createBlogCategory } from '@/service/api/api';
import { fetchPosts } from '@/redux/blog/blogActions';
import { useAppDispatch } from '@/redux/hooks';

const statusInitialState = { isLoading: false, isError: false, isSuccess: false, message: '' };

const BlogAdd = ({ categories, token, setActivePage }) => {
  const [categoriesState, setCategoriesState] = useState([...categories, { id: 'add', name: 'Создать категорию' }]);
  const [mainFormStatus, setMainFormStatus] = useState(statusInitialState);
  const [categoryFormStatus, setCategoryFormStatus] = useState(statusInitialState);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [mainForm] = Form.useForm();
  const [categoryForm] = Form.useForm();

  const categorySelectChangeHandler = (value) => {
    if (value !== 'add') return;
    setIsAddCategoryModalVisible(true);
  };

  const categoryFormSubmitHandler = async (fields) => {
    setCategoryFormStatus({ ...categoryFormStatus, isLoading: true });
    
    let query = `name=${fields.categoryName}`;
    if (fields.categorySlug) {
      query += `&slug=${String(fields.categorySlug)}`;
    }
    if (fields.categoryDescription) {
      query += `&description=${fields.categoryDescription}`;
    }

    const formData = new FormData();
    if (fields.iconFile?.file?.originFileObj) {
      formData.append('icon', fields.iconFile.file.originFileObj);
    }

    try {
      const res = await createBlogCategory(formData, query, token);
      const newCategory = res.data || res;
      setCategoriesState([newCategory, ...categoriesState.filter(c => c.id !== 'add')]);
      setCategoryFormStatus(statusInitialState);
      setIsAddCategoryModalVisible(false);
      categoryForm.resetFields();
    } catch (error) {
      setCategoryFormStatus({
        ...statusInitialState,
        isError: true,
        message: error.message || error.detail || 'Что-то пошло не так при создании категории статьи'
      });
      setIsAddCategoryModalVisible(false);
    }
  };

  const mainFormSubmitHandler = async (fields) => {
    if (fields.category === 'add') {
      return setMainFormStatus({ ...statusInitialState, isLoading: false, isError: true, message: 'Пожалуйста, выберите категорию статьи!' });
    }

    setMainFormStatus({ ...statusInitialState, isLoading: true });
    
    let query = `title=${fields.articleName}&category_id=${fields.category}&description=${fields.articleDescription}&is_published=${Boolean(fields.is_published)}&is_recommended=${Boolean(fields.is_recommended)}&is_popular=${Boolean(fields.is_popular)}`;
    if (fields.articleUrl) {
      query += `&slug=${String(fields.articleUrl)}`;
    }

    const formData = new FormData();
    if (fields.textFile?.file?.originFileObj) {
      formData.append('document', fields.textFile.file.originFileObj);
    }
    if (fields.coverFile?.file?.originFileObj) {
      formData.append('cover_image', fields.coverFile.file.originFileObj);
    }

    try {
      await createBlogPost(formData, query, token);
      setMainFormStatus({...statusInitialState, isSuccess: true, message: 'Статья успешно создана'});
      mainForm.resetFields();
    } catch (error) {
      setCategoryFormStatus({
        ...statusInitialState,
        isError: true,
        message: error.message || error.detail || 'Что-то пошло не так при создании категории статьи'
      });
    }
  };

  return (
    <div className={styles.page}>
      <h2>Создание статьи</h2>
      <ConfigProvider
        theme={{
          token: {
            colorBorder: '#00000033',
            colorPrimary: '#5329FF',
          },
          components: {
            Button: {
              primaryColor: 'white',
              paddingBlockLG: 10,
              paddingInlineLG: 8,
            }
          }
        }}
      >
        <Form
          form={mainForm}
          className={styles.form}
          layout='vertical'
          onFinish={mainFormSubmitHandler}
        >
          {/* Name */}
          <Form.Item
            label='Название статьи'
            name='articleName'
            rules={[
              { required: true, message: 'Пожалуйста, заполните это поле' },
              { min: 3, message: 'Название должно быть длиннее 3х символов' },
            ]}
          >
            <Input
              placeholder='Введите название статьи'
              size='large'
            >
            </Input>
          </Form.Item>

          {/* Url */}
          <Form.Item
            label='Url статьи'
            name='articleUrl'
            rules={[
              { min: 3, message: 'Название должно быть длиннее 3х символов' },
            ]}
          >
            <Input
              placeholder='Введите url статьи'
              size='large'
            >
            </Input>
          </Form.Item>

          {/* описание */}
          <Form.Item
            label='Описание статьи'
            name='articleDescription'
            rules={[
              { required: true, message: 'Пожалуйста, заполните это поле' },
            ]}
          >
            <Input
              placeholder='Введите описание статьи'
              size='large'
            >
            </Input>
          </Form.Item>

          {/* Docx */}
          <Form.Item
            label='Текст статьи'
            name='textFile'
            rules={[
              { required: true, message: 'Пожалуйста, заполните это поле' },
            ]}
          >
            <Upload.Dragger
              maxCount={1}
              accept=".doc,.docx,.pages"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Кликните или перетащите файл</p>
            </Upload.Dragger>
          </Form.Item>

          {/* Cover */}
          <Form.Item
            label='Обложка статьи'
            name='coverFile'
            rules={[
              { required: true, message: 'Пожалуйста, заполните это поле' },
            ]}
          >
            <Upload.Dragger
              maxCount={1}
              accept=".png,.jpg,.jpeg,.JPG,.JPEG"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Кликните или перетащите файл</p>
            </Upload.Dragger>
          </Form.Item>

          <ConfigProvider
            theme={{
              token: {
                //colorBgBase: '#EAEAF1',
                colorBgContainer: 'white',
                colorBorder: '#EAEAF1',
                borderRadius: 8,
                fontFamily: 'Mulish',
                //fontSize: 16,
                colorPrimary: 'black'
              },
              components: {
                Select: {
                  activeBorderColor: '#EAEAF1',
                  activeOutlineColor: 'transparent',
                  hoverBorderColor: '#EAEAF1',
                  optionActiveBg: 'transparent',
                  //optionFontSize: 16,
                  optionSelectedBg: 'transparent',
                  optionSelectedColor: '#5329FF',
                }
              }
            }}
          >

            {/* Category */}
            <Form.Item
              label='Категория статьи'
              name='category'
              rules={[
                { required: true, message: 'Пожалуйста, заполните это поле' },
              ]}
            >
              <Select
                options={categoriesState?.map(_ => ({ value: _.id, label: _.name }))}
                size='large'
                placeholder='Выберите категорию статьи'
                onChange={categorySelectChangeHandler}
              />
            </Form.Item>
          </ConfigProvider>

          {/* Is Published */}
          <Form.Item
            label='Активная статья'
            name='is_published'
            valuePropName='checked'
          >
            <Checkbox>Опубликовать</Checkbox>
          </Form.Item>

          {/* Is Recommended */}
          <Form.Item
            label='Рекомендованная статья'
            name='is_recommended'
            valuePropName='checked'
          >
            <Checkbox>Рекомендовать</Checkbox>
          </Form.Item>

          {/* Is Popular */}
          <Form.Item
            label='Популярная статья'
            name='is_popular'
            valuePropName='checked'
          >
            <Checkbox>Популярная</Checkbox>
          </Form.Item>

          {/* Submit */}
          <Button
            className={styles.form__submitButton}
            type='primary'
            htmlType='submit'
            loading={mainFormStatus.isLoading}
          >
            Создать
          </Button>
        </Form>
      </ConfigProvider>


      {/* main form status modal */}
      <Modal
        open={mainFormStatus.isError || mainFormStatus.isSuccess}
        footer={null}
        onOk={() => {dispatch(fetchPosts(token)); setMainFormStatus(statusInitialState); setActivePage('articlesList');}}
        onClose={() => { dispatch(fetchPosts(token)); setMainFormStatus(statusInitialState); setActivePage('articlesList');}}
        onCancel={() => { dispatch(fetchPosts(token)); setMainFormStatus(statusInitialState); setActivePage('articlesList');}}
      >
        <div className={styles.form__modalBody}>
          {mainFormStatus.message}
        </div>
      </Modal>


      {/* Category add modal */}
      <Modal
        open={isAddCategoryModalVisible}
        footer={null}
        onOk={() => setIsAddCategoryModalVisible(false)}
        onClose={() => setIsAddCategoryModalVisible(false)}
        onCancel={() => setIsAddCategoryModalVisible(false)}
      >
        <div className={styles.form__modalBody}>
          <h2>Создание категории</h2>
          <ConfigProvider
            theme={{
              token: {
                colorBorder: '#00000033',
                colorPrimary: '#5329FF',
              },
              components: {
                Button: {
                  primaryColor: 'white',
                  paddingBlockLG: 10,
                  paddingInlineLG: 8,
                }
              }
            }}
          >
            <Form
              className={styles.form}
              layout='vertical'
              onFinish={categoryFormSubmitHandler}
              form={categoryForm}
            >
              {/* Category Name */}
              <Form.Item
                label='Название категории'
                name='categoryName'
                rules={[
                  { required: true, message: 'Пожалуйста, заполните это поле' },
                ]}
              >
                <Input
                  placeholder='Введите название категории'
                  size='large'
                >
                </Input>
              </Form.Item>

              {/* Category slug */}
              <Form.Item
                label='Url категории'
                name='categorySlug'
              >
                <Input
                  placeholder='Введите url категории'
                  size='large'
                >
                </Input>
              </Form.Item>

              {/* Category description */}
              <Form.Item
                label='Описание категории'
                name='categoryDescription'
              >
                <Input
                  placeholder='Введите описание категории'
                  size='large'
                >
                </Input>
              </Form.Item>

              {/* Icon */}
              <Form.Item
                label='Иконка категории'
                name='iconFile'
                rules={[
                  { required: true, message: 'Пожалуйста, заполните это поле' },
                ]}
              >
                <Upload.Dragger
                  maxCount={1}
                  accept=".png,.svg"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Кликните или перетащите файл</p>
                </Upload.Dragger>
              </Form.Item>

              {/* Submit */}
              <Button
                type='primary'
                htmlType='submit'
                loading={categoryFormStatus.isLoading}
              >
                Создать
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>

    </div>
  );
};

export default BlogAdd;
