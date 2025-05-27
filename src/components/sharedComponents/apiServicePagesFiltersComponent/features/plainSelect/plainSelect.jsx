import styles from './plainSelect.module.css'
import { SelectIcon } from '../../shared'
import { Select, ConfigProvider } from 'antd'

export const PlainSelect = (
    {
        selectId, //string
        label, //string
        value, //string | number
        optionsData, //array
        handler, // (e) => void
    }
) => {

    const icon = <SelectIcon />

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
                    renderEmpty={ () => (<div>Нет данных</div>)} 
                    theme={{
                        token: {
                            //colorBgBase: '#EAEAF1',
                            colorBgContainer: '#EAEAF1',
                            colorBorder: 'transparent',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 16,
                        },
                        components: {
                            Select: {
                                activeBorderColor: 'transparent',
                                activeOutlineColor: 'transparent',
                                hoverBorderColor: 'transparent',
                                optionActiveBg: 'transparent',
                                optionFontSize: 16,
                                optionSelectedBg: 'transparent',
                                optionSelectedColor: '#5329FF',
                            }
                        }
                    }}
                >
                    <Select
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
    )
}