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
                        Заказы, шт
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
                        Продажи, шт
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
                        Заказы, руб
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
                        Продажи, руб
                    </Checkbox>
                </ConfigProvider>
            </div>
            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#0099FF',
                            controlInteractiveSize: 20,
                            // borderRadiusSM: 10,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        defaultChecked
                        checked={constrolsState.isRoiActive}
                        value='isRoiActive'
                        onChange={controlsCheckboxHandler}
                    >
                        ROI, %
                    </Checkbox>
                </ConfigProvider>
            </div>
            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#F9813C',
                            controlInteractiveSize: 20,
                            // borderRadiusSM: 10,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        defaultChecked
                        checked={constrolsState.isMarginalityActive}
                        value='isMarginalityActive'
                        onChange={controlsCheckboxHandler}
                    >
                        Маржинальность, %
                    </Checkbox>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default MainChartControls;
