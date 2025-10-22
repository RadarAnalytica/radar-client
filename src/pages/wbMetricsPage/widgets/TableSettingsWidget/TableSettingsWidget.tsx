import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider, Modal, Form, Checkbox, Flex, Input } from 'antd';
import styles from './TableSettingsWidget.module.css';

interface TableSettingsWidgetProps {
  tableConfig: any;
  setTableConfig: (config: any) => void;
}

const TableSettingsWidget: React.FC<TableSettingsWidgetProps> = ({
  tableConfig,
  setTableConfig
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkAllButtonState, setCheckAllButtonState] = useState('Выбрать все');
  const [searchState, setSearchState] = useState('');
  const [renderList, setRenderList] = useState([]);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const filter = Form.useWatch('filter', searchForm);

  const getNormalizedArray = (array: any[], searchState: string) => {
    let normalizedArray = array
      .map(_ => _.children)
      .flat()
      .filter(_ => _.title?.toLowerCase().includes(searchState.toLowerCase()));
    return normalizedArray;
  };

  const checkAllHandler = () => {
    const values = form.getFieldsValue();
    const keysArr = Object.keys(values);
    const type = keysArr.some(_ => !values[_]) ? 'select' : 'deselect';

    if (type === 'select') {
      keysArr.forEach(_ => {
        form.setFieldValue(_, true);
      });
      setCheckAllButtonState('Снять все');
    }
    if (type === 'deselect') {
      keysArr.forEach(_ => {
        form.setFieldValue(_, false);
      });
      setCheckAllButtonState('Выбрать все');
    }
  };

  const searchHandler = (fields: any) => {
    setSearchState(fields.filter.trim());
  };

  const updateOptionsConfig = (fields: any) => {
    // Здесь будет логика обновления конфигурации таблицы
    setIsModalOpen(false);
    searchForm.resetFields();
    setSearchState('');
    // localStorage.setItem('WbMetricsTableConfig', JSON.stringify(updatedConfig));
    // setTableConfig((prev) => updatedConfig);
  };

  useEffect(() => {
    if (!filter) {
      searchForm.submit();
    }
  }, [filter]);

  useEffect(() => {
    if (isModalOpen && tableConfig) {
      const values = form.getFieldsValue();
      const keysArr = Object.keys(values);
      if (keysArr.length > 0 && keysArr.some(_ => !values[_])) {
        setCheckAllButtonState('Выбрать все');
      }
      if (keysArr.length > 0 && keysArr.every(_ => values[_])) {
        setCheckAllButtonState('Снять все');
      }
    }
  }, [form, isModalOpen, tableConfig]);

  useEffect(() => {
    if (tableConfig) {
      setRenderList(getNormalizedArray(tableConfig, searchState));
    }
  }, [tableConfig, searchState]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#E7E1FE'
          },
          components: {
            Button: {
              paddingInlineLG: 7
            }
          }
        }}
      >
        <Button
          size='large'
          type='primary'
          onClick={() => setIsModalOpen(true)}
          style={{ width: 45, height: 45 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#5329FF" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18l-2 13H5L3 6zM5 8l1.5 11h11L19 8H5z" fill="currentColor"/>
            <path d="M8 2h8v2H8V2z" fill="currentColor"/>
            <circle cx="9" cy="12" r="1" fill="currentColor"/>
            <circle cx="15" cy="12" r="1" fill="currentColor"/>
          </svg>
        </Button>
      </ConfigProvider>

      <Modal
        title="Настройки таблицы"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
        className={styles.modal}
      >
        <div className={styles.modal__content}>
          <Form
            className={styles.modal__searchForm}
            onFinish={searchHandler}
            form={searchForm}
          >
            <Flex gap={8}>
              <Form.Item
                className={styles.modal__input}
                name="filter"
              >
                <Input
                  size="large"
                  placeholder="Название столбца"
                  allowClear={{
                    clearIcon: (
                      <svg
                        width='15'
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 0.5C3.625 0.5 0.5 3.625 0.5 7.5C0.5 11.375 3.625 14.5 7.5 14.5C11.375 14.5 14.5 11.375 14.5 7.5C14.5 3.625 11.375 0.5 7.5 0.5ZM10.5 9.5L9.5 10.5L7.5 8.5L5.5 10.5L4.5 9.5L6.5 7.5L4.5 5.5L5.5 4.5L7.5 6.5L9.5 4.5L10.5 5.5L8.5 7.5L10.5 9.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    )
                  }}
                />
              </Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
              >
                Найти
              </Button>
            </Flex>
          </Form>

          <div className={styles.modal__checkboxes}>
            <Button
              type="default"
              onClick={checkAllHandler}
              className={styles.modal__checkAllButton}
            >
              {checkAllButtonState}
            </Button>
            
            <Form
              form={form}
              onFinish={updateOptionsConfig}
              className={styles.modal__form}
            >
              <div className={styles.modal__checkboxList}>
                {renderList.map((item, index) => (
                  <Form.Item
                    key={index}
                    name={item.dataIndex}
                    valuePropName="checked"
                    initialValue={!item.hidden}
                    className={styles.modal__checkboxItem}
                  >
                    <Checkbox>{item.title}</Checkbox>
                  </Form.Item>
                ))}
              </div>
              
              <Flex gap={8} justify="flex-end" className={styles.modal__buttons}>
                <Button
                  type="default"
                  size="large"
                  onClick={() => setIsModalOpen(false)}
                >
                  Отмена
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Применить
                </Button>
              </Flex>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableSettingsWidget;
