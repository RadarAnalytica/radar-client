import styles from './successModal.module.css';
import { Modal } from "antd";

const SuccessModal = ({ title, message, ...rest }) => {

    return (
        <Modal
            {...rest}
            footer={!rest.footer && null}
        >
            <div className={styles.modal}>
                <div className={styles.modal__titleWrapper}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '30px', height: '30px' }}>
                        <rect width="30" height="30" rx="5" fill="#D9F7E8" fillOpacity="1" />
                        <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#4AD991" />
                    </svg>
                    <p className={styles.modal__title}>{title ? title : 'Успешно!'}</p>
                </div>
                <p className={styles.modal__message}>{message}</p>
            </div>
        </Modal>
    );
};

export default SuccessModal;
