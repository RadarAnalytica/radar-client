import { useCallback } from 'react';
import styles from './datePickerCustomDropdown.module.css';
import { Select, ConfigProvider, Tag } from 'antd';

const DatePickerCustomDropdown = (props) => {
    const { options, value } = props;

    const selectChangeHandler = (value) => {
        const e = {
            target: {
                value: value.toString()
            }
        };
        props.onChange(e);
    };

    const Suffix = () => {

        return (
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#5329FF" strokeWidth="2" strokeLinecap="round" />
            </svg>

        );
    };

    const tagRender = useCallback(props => {
        const { label, value, closable, onClose } = props;
        return (
            <Tag
                color={'black'}
                closable={false}
                onClose={onClose}
                style={{ background: 'transparent', color: 'black', fontSize: '18px', display: 'flex', alignItems: 'center', border: 'none' }}
            >
                <div style={{ color: 'black' }}>{label}</div>
            </Tag>
        );
    }, []);

    return (
        <div
            className={styles.dropdown}
            onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: 'white',
                        colorBgContainer: 'white',
                        colorBorder: 'white !important',
                        borderRadius: 8,
                        fontFamily: 'Mulish',
                        colorTextPlaceholder: 'black !important',
                        fontSize: 14,
                        controlOutlineWidth: 0,
                        lineWidth: 0,
                        controlOutline: 'none',
                        controlItemBgActive: 'transparent',
                    },
                    components: {
                        Select: {
                            activeOutlineColor: 'white !important',
                            controlOutline: 'white !important',
                            activeBorderColor: 'white !important',
                            hoverBorderColor: 'white !important',
                            optionActiveBg: 'white',
                            optionFontSize: 14,
                            optionSelectedBg: 'transparent',
                            optionSelectedColor: '#5329FF',
                            paddingSM: 0,
                            controlOutlineWidth: 0,
                            //controlOutline: 'none',
                        }
                    }
                }}
            >
                <Select
                    size='middle'
                    variant='outlined'
                    onChange={selectChangeHandler}
                    value={value}
                    options={options}
                    suffixIcon={<Suffix />}
                    className={styles.dropdown__select}
                    styles={{popup: { root: { minWidth: '120px', border: '1px solid red'}}}}
                    // dropdownStyle={{ minWidth: '120px' }}
                    tagRender={tagRender}
                    style={{
                        border: 'none',
                        color: 'black',
                        outline: 'none',
                        boxShadow: 'none'
                    }}
                />
            </ConfigProvider>
        </div>
    );
};


export default DatePickerCustomDropdown;
