import React, { useState } from 'react';
import styles from './BlogUpdate.module.css';
import { Form, Input, Upload, Select, Button, ConfigProvider, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { createBlogCategory } from '../../../service/api/api';
import { URL } from '../../../service/config';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchPosts } from '../../../redux/blog/blogActions';

const statusInitialState = { isLoading: false, isError: false, isSuccess: false, message: '' }

const BlogUpdate = ({ categories, post, setPostIdForUpdate, token }) => {
  const dispatch = useAppDispatch()
  const [categoriesState, setCategoriesState] = useState([...categories, { id: 'add', name: 'Создать категорию' }])
  const [mainFormStatus, setMainFormStatus] = useState(statusInitialState)
  const [categoryFormStatus, setCategoryFormStatus] = useState(statusInitialState)
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false)
  const [mainForm] = Form.useForm()
  const [categoryForm] = Form.useForm()

  const categorySelectChangeHandler = (value) => {
    if (value !== 'add') return;
    setIsAddCategoryModalVisible(true)
  }

  const categoryFormSubmitHandler = async (fields) => {
    setCategoryFormStatus({ ...categoryFormStatus, isLoading: true })
    const data = {
      name: fields.categoryName,
      description: fields.categoryDescription ? fields.categoryDescription : '',
      slug: fields.categoryUrl
    }

    try {
      const res = await createBlogCategory(data, token);
      setCategoriesState([res, ...categoriesState])
      mainForm.setFieldValue('category', res.id)
      setCategoryFormStatus(statusInitialState)
      setIsAddCategoryModalVisible(false)
      categoryForm.resetFields()
    } catch (error) {
      setCategoryFormStatus({
        ...statusInitialState,
        isError: true,
        message: error.message || 'Что-то пошло не так при создании статьи'
      });
      setIsAddCategoryModalVisible(false)
    }
  }

  const mainFormSubmitHandler = async (fields) => {
    if (fields.category === 'add') {
      return setMainFormStatus({ ...statusInitialState, isLoading: false, isError: true, message: 'Пожалуйста, выберите категорию статьи!' })
    }
    setMainFormStatus({ ...statusInitialState, isLoading: true })
    const plainData = {
      title: fields.articleName,
      slug: fields.articleUrl,
      category_id: fields.category,
      description: fields.articleDescription
    }
    const filesData = new FormData();

    if (fields.textFile?.file?.originFileObj) {
      filesData.append('document', fields.textFile.file.originFileObj);
    }

    if (fields.coverFile?.file?.originFileObj) {
      filesData.append('cover_image', fields.coverFile.file.originFileObj);
    }
    try {

      const plainDataRes = await fetch(`${URL}/api/admin/blog/articles/${post.id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': 'JWT ' + token
        },
        body: JSON.stringify(plainData)
      })
     

      if (!plainDataRes.ok) {
        return setMainFormStatus({ ...statusInitialState, isError: true, message: 'Не удалось обновить статью' })
      }

      if (Object.keys(filesData).length > 0) {
        const filesDataRes = await fetch(`${URL}/api/admin/blog/articles/${post.id}/files`, {
          method: 'PATCH',
          headers: {
            'authorization': 'JWT ' + token
          },
          body: filesData
        })
  
        if (!filesDataRes.ok) {
          return setMainFormStatus({ ...statusInitialState, isError: true, message: 'Не удалось обновить статью' })
        }
        
      }
      

      setMainFormStatus({ ...statusInitialState, isSuccess: true, message: 'Статья успешно обновлена' })
      mainForm.resetFields()
      dispatch(fetchPosts(token))
      setPostIdForUpdate(undefined)
    } catch (error) {
      setMainFormStatus({
        ...statusInitialState,
        isError: true,
        message: 'Что-то пошло не так при обновлении статьи'
      });
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__titleWrapper} onClick={() => setPostIdForUpdate(undefined)}>
        <h2>Обновление статьи</h2>
        <button className={styles.page__backButton}>&larr; Назад</button>
      </div>
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
          initialValues={{
            articleName: post.title,
            articleUrl: post.slug,
            articleDescription: post.description,
            category: post.category_id
          }}
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
            label='url статьи'
            name='articleUrl'
            rules={[
              { required: true, message: 'Пожалуйста, заполните это поле' },
            ]}
          >
            <Input
              placeholder='Введите адрес статьи'
              size='large'
            >
            </Input>
          </Form.Item>

          {/* описание */}
          <Form.Item
            label='описание статьи'
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
          >
            <Upload.Dragger
              maxCount={1}
              accept=".png,.jpg,.jpeg,.JPG,.JPEG,.svg,.webp"
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


          {/* Submit */}
          <Button
            className={styles.form__submitButton}
            type='primary'
            htmlType='submit'
            loading={mainFormStatus.isLoading}
          >
            Сохранить
          </Button>
        </Form>
      </ConfigProvider>


      {/* main form status modal */}
      <Modal
        open={mainFormStatus.isError || mainFormStatus.isSuccess}
        footer={null}
        onOk={() => setMainFormStatus(statusInitialState)}
        onClose={() => setMainFormStatus(statusInitialState)}
        onCancel={() => setMainFormStatus(statusInitialState)}
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
                name='categoryUrl'
                rules={[
                  { required: true, message: 'Пожалуйста, заполните это поле' },
                ]}
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

              {/* Submit */}
              <Button
                type='primary'
                htmlType='submit'
                loading={categoryFormStatus.isLoading}
              >
                Обновить
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>

    </div>
  );
};

export default BlogUpdate;
