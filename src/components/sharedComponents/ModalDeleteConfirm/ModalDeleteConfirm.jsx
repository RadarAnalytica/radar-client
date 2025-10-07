import { Modal, Button, Flex, ConfigProvider } from "antd"
import styles from "./ModalDeleteConfirm.module.css"

function ModalFooter({ onCancel, onOk }) {
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
  )
}

export default function ModalDeleteConfirm({ onOk, onCancel, title }) {
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
        closeIcon={false}
        footer={null}
        centered
        width={400}
      >
        <div className={styles.modal__body}>
          <button className={styles.modal__close} onClick={onCancel}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fill-opacity="0.5" />
            </svg>
          </button>
          <p className={styles.modal__title}>{title}</p>
          <div className={styles.modal__actionButtons}>
              <button
                className={`${styles.modal__actionButton} ${styles.modal__actionButton_cancel}`}
                onClick={onCancel}
              >
                Отменить
              </button>
              <button
                className={`${styles.modal__actionButton} ${styles.modal__actionButton_confirm}`}
                onCick={onOk}
              >
                Удалить
              </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  )
}