import styles from './plainSelect.module.css';
import { SelectIcon } from '../../shared';
import { Select, ConfigProvider } from 'antd';

export const PlainSelect = (
    {
        selectId, //string
        label, //string
        value, //string | number
        optionsData, //array
        handler, // (e) => void
        mode,
        allowClear
    }
) => {

    const icon = <SelectIcon />;

    return (
        <div className={styles.plainSelect}>
            <label
                className={styles.plainSelect__label}
                htmlFor={selectId}
            >
                {label}
            </label>
            <div className={styles.plainSelect__selectWrapper}>
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
                    theme={{
                        token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 12,
                            fontWeight: 500,
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
                        allowClear={allowClear}
                        suffixIcon={icon}
                        className={styles.plainSelect__select}
                        options={optionsData}
                        value={value}
                        id={selectId}
                        onChange={handler}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};
