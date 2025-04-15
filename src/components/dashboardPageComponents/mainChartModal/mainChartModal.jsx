import styles from './mainChartModal.module.css'
import { Modal, ConfigProvider } from 'antd';
import { Filters } from '../../sharedComponents/apiServicePagesFiltersComponent';

const MainChartModal = ({ isModalOpen, setIsModalOpen}) => {

    return (
        <Modal
            open={isModalOpen}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onClose={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            width={1100}
            style={{ top: 50, bottom: 50 }}
        >
            <div className={styles.modal__body}>
                <p className={styles.modal__title}>Детализация заказов по времени</p>
                <Filters shopSelect={false} />
            </div>
        </Modal>
    )
}

export default MainChartModal;