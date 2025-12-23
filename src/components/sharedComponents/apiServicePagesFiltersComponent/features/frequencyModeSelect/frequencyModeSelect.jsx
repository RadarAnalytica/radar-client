import styles from './frequencyModeSelect.module.css';
import { SelectIcon } from '../../shared';
import { Select, ConfigProvider } from 'antd';
import { actions as filterActions } from '../../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';

export const FrequencyModeSelect = ({ isDataLoading }) => {
    const dispatch = useAppDispatch();
    const { skuFrequencyMode } = useAppSelector(store => store.filters);
    const icon = <SelectIcon />;

    return (
        <div className={styles.plainSelect}>
            <label
                className={styles.plainSelect__label}
                htmlFor='frequencySelect'
            >
                Режим
            </label>
            <div className={styles.plainSelect__selectWrapper}>
                <ConfigProvider
                    renderEmpty={ () => (<div>Нет данных</div>)}
                    theme={{
                        token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 12,
                        },
                        components: {
                            Select: {
                                activeBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                hoverBorderColor: '#5329FF1A',
                                optionActiveBg: 'transparent',
                                optionFontSize: 14,
                                optionSelectedBg: 'transparent',
                                optionSelectedColor: '#5329FF',
                            }
                        }
                    }}
                >
                    <Select
                        size='large'
                        suffixIcon={icon}
                        className={styles.plainSelect__select}
                        options={[{ value: 'Простой' }, { value: 'Продвинутый' }]}
                        value={skuFrequencyMode}
                        id='frequencySelect'
                        onChange={(value) => dispatch(filterActions.setSkuFrequencyMode(value)) }
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        disabled={isDataLoading}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};
