import styles from './addSkuModalFooter.module.css'
import { Button, ConfigProvider } from 'antd'

const AddSkuModalFooter = ({ setIsAddSkuModalVisible, isDataLoading, isCheckedListEmpty }) => {
    console.log(isCheckedListEmpty)
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
                    disabled={isDataLoading || isCheckedListEmpty}
                >
                    Добавить
                </Button>
            </ConfigProvider>
        </div>
    )
}

export default AddSkuModalFooter