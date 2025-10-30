import { useState, useEffect, useRef } from 'react'
import styles from './MultiSelect.module.css'
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/selectIcon/selectIcon';
import { Select, ConfigProvider, Input, Button, Tag, Form, Checkbox, Space } from 'antd'
import { Link } from 'react-router-dom'

export const MultiSelect = (
    {
        form, // form instance
        optionsData, //array
        selectId, //string
        searchFieldPlaceholder, //string
        selectPlaceholder, //string
        hasSearch = true, //boolean
        hasSelectAll = false, //boolean
    }
) => {

    const [searchState, setSearchState] = useState('');
    const prevSelectState = useRef(null);
    const currentFormValue = Form.useWatch([selectId], form);
    const icon = <SelectIcon />;


    const renderPopup = (menu) => {
        let action = () => { form.setFieldsValue({ [selectId]: [] }) };
        if (Array.isArray(optionsData) && optionsData.length > currentFormValue?.length && !searchState) {
            action = () => { form.setFieldsValue({ [selectId]: optionsData.map(_ => _.value) }) };
        }

        return (
            <>
                {hasSearch && <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 12,
                            fontWeight: 500,
                            controlHeightLG: 40,
                        },
                        components: {
                            Input: {
                                activeBorderColor: '#5329FF1A',
                                hoverBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                activeBg: 'transparent',
                                hoverBg: 'transparent',
                                activeBg: 'transparent',
                                activeShadow: 'transparent'
                            }
                        }
                    }}
                >
                    <Input
                        prefix={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="#8C8C8C" />
                            </svg>
                        }
                        allowClear
                        size='large'
                        placeholder={searchFieldPlaceholder || "Поиск по названию"}
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        onKeyDown={e => e.stopPropagation()}
                    />
                </ConfigProvider>}
                <div style={{ width: '100%', padding: '10px 0' }}>
                    {menu}
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF'
                        }
                    }}
                >
                    {!searchState && hasSelectAll && <Button
                        type='primary'
                        size='large'
                        onClick={action}
                        disabled={optionsData.length === 0}
                        style={{ fontSize: 14, width: '100%' }}
                    >
                        {currentFormValue?.length < optionsData.length && 'Выбрать все'}
                        {currentFormValue?.length === optionsData.length && 'Снять все'}
                    </Button>}
                </ConfigProvider>
            </>
        )
    }

    const tagRender = props => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={value}
                //onMouseDown={onPreventMouseDown}
                closable={false}
                onClose={onClose}
                style={{ background: 'transparent', color: 'black', fontSize: '14px', display: 'flex', alignItems: 'center', border: 'none' }}
            >
                {label}
            </Tag>
        );
    };

    const selectHandler = value => {
        form.setFieldsValue({ [selectId]: value })
    }


    return (
        <Select
            maxTagCount={0}
            maxTagTextLength={5}
            showSearch={false}
            size='large'
            mode='multiple'
            tagRender={tagRender}
            suffixIcon={icon}
            className={styles.plainSelect__select}
            optionLabelProp="label"
            fieldNames={{ label: 'label', value: 'value' }}
            options={optionsData?.filter((_) => _.label.toLowerCase().includes(searchState.toLowerCase()))
            }
            placeholder={selectPlaceholder}
            value={currentFormValue}
            onChange={selectHandler}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            dropdownRender={renderPopup}
            maxTagPlaceholder={omittedValues => (
                <>
                    {omittedValues.length > 1 && <p className={styles.plainSelect__multiLabel}>Выбрано: {omittedValues.length}</p>}
                    {omittedValues.length === 1 &&
                        <p className={styles.plainSelect__multiLabel} title={omittedValues[0].label}>{omittedValues[0].label}</p>
                    }
                </>
            )}
            //menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
            menuItemSelectedIcon={<></>}
            optionRender={(option) => {
                
                return (
                    <Space>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    fontSize: 14,
                                }
                            }}
                        >
                            <Checkbox
                                checked={currentFormValue?.includes(option.value)}
                            >
                                {option.label}
                            </Checkbox>
                        </ConfigProvider>
                    </Space>
                )

            }}
        />
    )
}