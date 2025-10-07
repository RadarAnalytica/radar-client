import styles from './errorModal.module.css';
import { Modal } from "antd";

const ErrorModal = ({ message, ...rest }) => {

    return (
        <Modal
            {...rest}
            footer={!rest.footer && null}
        >
            <div className={styles.modal}>
                <div className={styles.modal__titleWrapper}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                        <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                    </svg>
                    <p className={styles.modal__title}>Ошибка!</p>
                </div>
                <p className={styles.modal__message}>{message}</p>
            </div>
        </Modal>
    );
};

export default ErrorModal;
