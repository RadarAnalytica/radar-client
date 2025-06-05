import { useState, useEffect, useRef } from 'react'
import styles from './weekSelect.module.css'
import { SelectIcon } from '../../shared'
import { Select, ConfigProvider, Divider, Space, Input, Button, Tag, Tooltip } from 'antd'

export const WeekSelect = (
    {
        selectId, //string
        label, //string
        value, //string | number | (string | number)[]
        optionsData, //array
        dispatch,
        filterActions,
        params,
        handler
    }
) => {
    
    const [searchState, setSearchState] = useState('')
    const [selectState, setSelectState] = useState([])
    const prevSelectState = useRef(null)
    const icon = <SelectIcon />

    const renderPopup = (menu) => {
        let action
        if (selectState.filter(_ => _.value !== 'Все').length < optionsData.length && !searchState) {
            action = () => { setSelectState(optionsData.filter(_ => _.value !== 'Все')) }
        }
        if (selectState.filter(_ => _.value !== 'Все').length === optionsData.length) {
            action = () => { setSelectState([{ value: 'Все' }]) }
        }
        return (
            <>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF'
                        }
                    }}
                >
                    <Input
                        allowClear
                        size='large'
                        placeholder="Поиск"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        onKeyDown={e => e.stopPropagation()}
                    />
                </ConfigProvider>
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
                    {!searchState && <Button
                        style={{ width: '100%' }}
                        type='primary'
                        size='large'
                        onClick={action}
                        disabled={optionsData.length === 0}
                    >
                        {selectState.filter(_ => _.value !== 'Все').length < optionsData.length && 'Выбрать все'}
                        {selectState.filter(_ => _.value !== 'Все').length === optionsData.length && 'Снять все'}
                    </Button>}
                </ConfigProvider>
            </>)
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
                closable={false}
                onClose={onClose}
                style={{ background: 'transparent', color: 'black', fontSize: '18px', display: 'flex', alignItems: 'center' }}
            >
                {label}
            </Tag>
        );
    };

    const selectHandler = value => {
        const isAllOptionIndex = value.findIndex(_ => _ === 'Все')
        if ((isAllOptionIndex !== -1 && isAllOptionIndex === value.length - 1) || value.length === 0) {
            setSelectState([{ value: 'Все', id: 0 }])
            return
        }
        const valueArr = []
        value.forEach(v => {
            const el = optionsData.find(_ => _.value === v);
            el && valueArr.push(el)
        })

        setSelectState(valueArr)
    }

    useEffect(() => {
        if (Array.isArray(value)) {
            setSelectState(value)
            prevSelectState.current = value
        } else {
            setSelectState([value])
            prevSelectState.current = [value]
        }

    }, [value])

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
                    renderEmpty={() => (<div style={{ cursor: 'default'}}>Нет данных</div>)}
                    theme={{
                        token: {
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
                        maxTagCount={0}
                        maxTagTextLength={5}
                        showSearch={false}
                        size='large'
                        mode='multiple'
                        //maxTagCount='responsive'
                        tagRender={tagRender}
                        suffixIcon={icon}
                        className={styles.plainSelect__select}
                        // options={optionsData}
                        options={optionsData.filter((_) => _.label.toLowerCase().includes(searchState.toLowerCase())).map((option, id) => ({
                            ...option,
                            key: option.id || option.value
                        }))}
                        value={(Array.isArray(selectState) ? selectState : [])}
                        id={selectId}
                        onChange={selectHandler}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        dropdownRender={renderPopup}
                        onDropdownVisibleChange={(open) => {
                            if (!open) {
                                setSearchState('')
                                handler(selectState);
                            }
                        }}
                        
                        maxTagPlaceholder={omittedValues => (
                            <>
                                {(omittedValues.length > 1 || omittedValues.length === 1 && !omittedValues.find((el) => el.value == 'Все')) && <p className={styles.plainSelect__multiLabel}>Выбрано: {omittedValues.length}</p>}
                                {omittedValues.length === 1 && omittedValues.find((el) => el.value == 'Все') &&
                                    <p className={styles.plainSelect__multiLabel} title={omittedValues[0].value}>{omittedValues[0].value}</p>
                                }
                            </>
                        )}
                        menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}