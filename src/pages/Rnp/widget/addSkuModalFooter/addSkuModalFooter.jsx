import styles from './addSkuModalFooter.module.css'
import { Button, ConfigProvider } from 'antd'

const AddSkuModalFooter = ({ setIsAddSkuModalVisible, isDataLoading, isCheckedListEmpty, addProducts }) => {

    return (
        <div className={styles.footer}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#EEEAFF',
                        colorTextLightSolid: '#5329FF',
                        fontSize: 16,
                        borderRadius: 8
                    }
                }}
            >
                <Button
                    type='primary'
                    className={styles.footer__button}
                    onClick={() => setIsAddSkuModalVisible(false)}
                >
                    Отменить
                </Button>
            </ConfigProvider>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#5329FF',
                        fontSize: 16,
                        borderRadius: 8
                    }
                }}
            >
                <Button
                    type='primary'
                    className={styles.footer__button}
                    disabled={isCheckedListEmpty}
                    loading={isDataLoading}
                    onClick={() => {
                        addProducts();
                    }}
                >
                    Добавить
                </Button>
            </ConfigProvider>
        </div>
    )
}

export default AddSkuModalFooter