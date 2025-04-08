import styles from './datePickerCustomDropdown.module.css'
import { Select, ConfigProvider } from 'antd'

const DatePickerCustomDropdown = (props) => {
    const { options, value } = props;

    const selectChangeHandler = (value) => {
        const e = {
            target: {
                value: value.toString()
            }
        }
        props.onChange(e)
    }

    const Suffix = () => {

        return (
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#5329FF" strokeWidth="2" strokeLinecap="round" />
            </svg>

        )
    }

    return (
        <div className={styles.dropdown}>
            <ConfigProvider
                theme={{
                    token: {
                        //colorBgBase: '#EAEAF1',
                        colorBgContainer: '#EAEAF1',
                        colorBorder: 'transparent',
                        borderRadius: 8,
                        fontFamily: 'Mulish',
                        fontSize: 16
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
                            paddingSM: 0,
                        }
                    }
                }}
            >
                <Select
                    size='middle'
                    variant='borderless'
                    onChange={selectChangeHandler}
                    value={value}
                    options={options}
                    suffixIcon={<Suffix />}
                    className={styles.dropdown__select}
                    dropdownStyle={{ minWidth: '120px'}}
                />
            </ConfigProvider>
        </div>
    )
}



export default DatePickerCustomDropdown