import { Modal, Button, Flex, ConfigProvider } from "antd";
import styles from "./ModalDeleteConfirm.module.css";

function ModalFooter({onCancel, onOk}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          Button: {
            paddingInlineLG: 9.5,
            defaultShadow: false,
            controlHeightLG: 60,
            colorError: '#f93c65',
            colorPrimary: '#5329ff',
            colorPrimaryBorder: '#5329ff',
            colorPrimaryHover: '#7a52ff',
						colorPrimaryActive: '#3818d9',
            primaryActiveBorderColor: '#bcb6d9',
            colorDangerBg: 'green'
          },
        }
      }}
    >
      <Flex gap={16}>
        <Button color="danger" variant="outlined" onClick={onOk} size="lg" className={styles.btn}>Удалить</Button>
        <Button type="primary" onClick={onCancel} size="lg" className={styles.btn}>Оставить</Button>
      </Flex>
    </ConfigProvider>
  );
}

export default function ModalDeleteConfirm({onOk, onCancel, title}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          Modal: {
            titleColor: '#1a1a1a',
            titleFontSize: 18,
            fontWeightStrong: 700,
            paddingLG: 10,
            padding: 5,
            borderRadiusLG: 16,
            defaultShadow: false,
          }
        }
      }}
    >
      <Modal
        open={true}
        onOk={onOk}
        onCancel={onCancel}
        title={title}
        closeIcon={false}
        footer={<ModalFooter onOk={onOk} onCancel={onCancel}/>}
      ></Modal>
    </ConfigProvider>
  );
}
