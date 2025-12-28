import styles from './mainChartControls.module.css';
import { Checkbox, ConfigProvider } from 'antd';

const MainChartControls = ({ constrolsState, setControlsState }) => {

    const controlsCheckboxHandler = (e) => {
        setControlsState({
            ...constrolsState,
            [e.target.value]: e.target.checked
        });
    };

    return (
        <div className={styles.controls}>
            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#F0AD00',
                            controlInteractiveSize: 20,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        checked={constrolsState.isOrderQuantityActive}
                        value='isOrderQuantityActive'
                        onChange={controlsCheckboxHandler}
                    >
                        <label className={styles.controls__label}>
                            Заказы, шт
                        </label>
                    </Checkbox>
                </ConfigProvider>
            </div>

            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#88E473',
                            controlInteractiveSize: 20,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        checked={constrolsState.isSalesQuantityActive}
                        value='isSalesQuantityActive'
                        onChange={controlsCheckboxHandler}
                    >
                        <label className={styles.controls__label}>
                           Продажи, шт
                        </label>
                    </Checkbox>
                </ConfigProvider>
            </div>

            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            controlInteractiveSize: 20,
                            // borderRadiusSM: 10,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        defaultChecked
                        checked={constrolsState.isOrderAmountActive}
                        value='isOrderAmountActive'
                        onChange={controlsCheckboxHandler}
                    >
                        <label className={styles.controls__label}>
                           Заказы, руб
                        </label>
                    </Checkbox>
                </ConfigProvider>
            </div>

            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#AA5BFF',
                            controlInteractiveSize: 20,
                            // borderRadiusSM: 10,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        defaultChecked
                        checked={constrolsState.isSalesAmountActive}
                        value='isSalesAmountActive'
                        onChange={controlsCheckboxHandler}
                    >
                        <label className={styles.controls__label}>
                           Продажи, руб
                        </label>
                    </Checkbox>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default MainChartControls;
