import styles from './mainChartControls.module.css';
import { Checkbox, ConfigProvider } from 'antd';

const MainChartControls = ({ constrolsState, setControlsState }) => {

    const controlsCheckboxHandler = (e) => {
        const { value } = e.target
        setControlsState((prev) => {
            return [...prev].map(_ => {
                if (_.id === value) {
                    return {
                        ..._,
                        isActive: !_.isActive
                    }
                } else {
                    return _;
                };
            })
        });
    };

    const selectAllHAndler = () => {
        if (constrolsState?.every(_ => _.isActive)) {
            setControlsState(prev => prev.map(_ => ({..._, isActive: false})))
        } else {
            setControlsState(prev => prev.map(_ => ({..._, isActive: true})))
        }
    }

    return (
        <div className={styles.controls}>
            {constrolsState.map(_ => (
                <div className={styles.controls__controlWrapper} key={_.color}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: _.color,
                                controlInteractiveSize: 20,
                            }
                        }}
                    >
                        <Checkbox
                            size='large'
                            checked={_.isActive}
                            value={_.id}
                            onChange={controlsCheckboxHandler}
                        >
                            <span className={styles.controls__label}>{_.title}, {_.units}</span>
                        </Checkbox>
                    </ConfigProvider>
                </div>
            ))}
            <button 
                className={styles.controls__selectAllButton}
                onClick={selectAllHAndler}
            >
                {constrolsState?.every(_ => _.isActive) ? 'Снять все' : 'Выбрать все'}
            </button>
        </div>
    );
};

export default MainChartControls;
