import React, { useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Checkbox, Flex, Input } from 'antd';
import styles from './TableSettingsWidget.module.css';

interface TableSettingsWidgetProps {
  tableConfig: any[];
  setTableConfig: (config: any[]) => void;
}

const TableSettingsWidget: React.FC<TableSettingsWidgetProps> = ({
  tableConfig,
  setTableConfig
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Обновляем конфигурацию таблицы
    const updatedConfig = tableConfig.map(col => ({
      ...col,
      hidden: !values[col.dataIndex]
    }));
    
    setTableConfig(updatedConfig);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const checkAllHandler = () => {
    const values = form.getFieldsValue();
    const keysArr = Object.keys(values);
    const type = keysArr.some(_ => !values[_]) ? 'select' : 'deselect';

    if (type === 'select') {
      keysArr.forEach(_ => {
        form.setFieldValue(_, true);
      });
    } else {
      keysArr.forEach(_ => {
        form.setFieldValue(_, false);
      });
    }
  };

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
          style={{ width: 38, height: 38 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#5329FF" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.23731 14.2714C0.920898 12.777 0.920898 11.233 1.23731 9.73858C2.45853 9.88161 3.52573 9.47783 3.87339 8.63728C4.22216 7.79562 3.75457 6.75593 2.78859 5.99349C3.62149 4.71321 4.71321 3.62149 5.99349 2.78859C6.75483 3.75347 7.79562 4.22216 8.63728 3.87339C9.47893 3.52463 9.88271 2.45853 9.73858 1.23731C11.233 0.920898 12.777 0.920898 14.2714 1.23731C14.1284 2.45853 14.5322 3.52573 15.3727 3.87339C16.2144 4.22216 17.2541 3.75457 18.0165 2.78859C19.2968 3.62149 20.3885 4.71321 21.2214 5.99349C20.2565 6.75483 19.7878 7.79562 20.1366 8.63728C20.4854 9.47893 21.5515 9.88271 22.7727 9.73858C23.0891 11.233 23.0891 12.777 22.7727 14.2714C21.5515 14.1284 20.4843 14.5322 20.1366 15.3727C19.7878 16.2144 20.2554 17.2541 21.2214 18.0165C20.3885 19.2968 19.2968 20.3885 18.0165 21.2214C17.2552 20.2565 16.2144 19.7878 15.3727 20.1366C14.5311 20.4854 14.1273 21.5515 14.2714 22.7727C12.777 23.0891 11.233 23.0891 9.73858 22.7727C9.88161 21.5515 9.47783 20.4843 8.63728 20.1366C7.79562 19.7878 6.75593 20.2554 5.99349 21.2214C4.71321 20.3885 3.62149 19.2968 2.78859 18.0165C3.75347 17.2552 4.22216 16.2144 3.87339 15.3727C3.52463 14.5311 2.45853 14.1273 1.23731 14.2714ZM3.20337 12.236C4.41359 12.5716 5.41148 13.3384 5.90657 14.5311C6.40056 15.7248 6.23663 16.9735 5.61832 18.0649C5.72394 18.1771 5.83286 18.2861 5.94508 18.3917C7.03758 17.7734 8.28521 17.6105 9.47893 18.1034C10.6716 18.5985 11.4384 19.5964 11.774 20.8066C11.928 20.811 12.082 20.811 12.236 20.8066C12.5716 19.5964 13.3384 18.5985 14.5311 18.1034C15.7248 17.6094 16.9735 17.7734 18.0649 18.3917C18.1771 18.2861 18.2861 18.1771 18.3917 18.0649C17.7734 16.9724 17.6105 15.7248 18.1034 14.5311C18.5985 13.3384 19.5964 12.5716 20.8066 12.236C20.811 12.082 20.811 11.928 20.8066 11.774C19.5964 11.4384 18.5985 10.6716 18.1034 9.47893C17.6094 8.28521 17.7734 7.03648 18.3917 5.94508C18.2857 5.83329 18.1767 5.72433 18.0649 5.61832C16.9724 6.23663 15.7248 6.39946 14.5311 5.90657C13.3384 5.41148 12.5716 4.41359 12.236 3.20337C12.082 3.19929 11.928 3.19929 11.774 3.20337C11.4384 4.41359 10.6716 5.41148 9.47893 5.90657C8.28521 6.40056 7.03648 6.23663 5.94508 5.61832C5.83286 5.72394 5.72394 5.83286 5.61832 5.94508C6.23663 7.03758 6.39946 8.28521 5.90657 9.47893C5.41148 10.6716 4.41359 11.4384 3.20337 11.774C3.19897 11.928 3.19897 12.082 3.20337 12.236ZM12.005 15.3056C11.1296 15.3056 10.2901 14.9579 9.67111 14.3389C9.05213 13.7199 8.70439 12.8804 8.70439 12.005C8.70439 11.1296 9.05213 10.2901 9.67111 9.67111C10.2901 9.05213 11.1296 8.70439 12.005 8.70439C12.8804 8.70439 13.7199 9.05213 14.3389 9.67111C14.9579 10.2901 15.3056 11.1296 15.3056 12.005C15.3056 12.8804 14.9579 13.7199 14.3389 14.3389C13.7199 14.9579 12.8804 15.3056 12.005 15.3056ZM12.005 13.1052C12.2968 13.1052 12.5766 12.9893 12.783 12.783C12.9893 12.5766 13.1052 12.2968 13.1052 12.005C13.1052 11.7132 12.9893 11.4334 12.783 11.227C12.5766 11.0207 12.2968 10.9048 12.005 10.9048C11.7132 10.9048 11.4334 11.0207 11.227 11.227C11.0207 11.4334 10.9048 11.7132 10.9048 12.005C10.9048 12.2968 11.0207 12.5766 11.227 12.783C11.4334 12.9893 11.7132 13.1052 12.005 13.1052Z" fill="#5329FF" />
          </svg>
        </Button>
      </ConfigProvider>

      <Modal
        title="Настройки таблицы"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        width={600}
        className={styles.modal}
      >
        <div className={styles.modal__content}>
          <div className={styles.modal__checkboxes}>
            <Button
              type="default"
              onClick={checkAllHandler}
              className={styles.modal__checkAllButton}
            >
              Выбрать все / Снять все
            </Button>
            
            <Form
              form={form}
              onFinish={handleSubmit}
              className={styles.modal__form}
              initialValues={tableConfig.reduce((acc, col) => {
                acc[col.dataIndex] = !col.hidden;
                return acc;
              }, {})}
            >
              <div className={styles.modal__checkboxList}>
                {tableConfig.map((col, index) => (
                  <Form.Item
                    key={index}
                    name={col.dataIndex}
                    valuePropName="checked"
                    className={styles.modal__checkboxItem}
                  >
                    <Checkbox>{col.title}</Checkbox>
                  </Form.Item>
                ))}
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableSettingsWidget;