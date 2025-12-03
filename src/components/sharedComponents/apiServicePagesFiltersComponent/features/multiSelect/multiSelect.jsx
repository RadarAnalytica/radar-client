import { useState, useEffect, useRef } from 'react';
import styles from './multiSelect.module.css';
import { SelectIcon } from '../../shared';
import { Select, ConfigProvider, Input, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';


const getOnlyUniqueOptions = (options) => {
    return options.filter((option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
};

export const MultiSelect = (
    {
        selectId, //string
        label, //string
        value, //string | number | (string | number)[]
        optionsData, //array
        dispatch,
        filterActions,
        params,
        isDataLoading,
        disabled
    }
) => {
    const [searchState, setSearchState] = useState('');
    const [selectState, setSelectState] = useState([]);
    const prevSelectState = useRef(null);
    const icon = <SelectIcon />;

    const renderPopup = (menu) => {
        let action;
        if (selectState.filter(_ => _.value !== 'Все').length < optionsData.length && !searchState) {
            action = () => { setSelectState(optionsData.filter(_ => _.value !== 'Все')); };
        } else if (selectState.filter(_ => _.value !== 'Все').length === optionsData.length) {
            action = () => { setSelectState([{ value: 'Все' }]); };
        }

        if (selectId === 'product_groups' && (!optionsData || optionsData.length === 0)) {
            return (
                <>
                    <div style={{ width: '100%', padding: '10px 0' }}>
                        {menu}
                    </div>
                    <div style={{ width: '100%' }}>
                        <Link
                            to='/groups'
                            target='_blank'
                            className={styles.plainSelect__ddLink}
                        >
                            Создать
                        </Link>
                    </div>
                </>
            );
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
                        type='primary'
                        size='large'
                        onClick={action}
                        disabled={optionsData.length === 0}
                        style={{ fontSize: 14, width: '100%' }}
                    >
                        {selectState.filter(_ => _.value !== 'Все').length < optionsData.length && 'Выбрать все'}
                        {selectState.filter(_ => _.value !== 'Все').length === optionsData.length && 'Снять все'}
                    </Button>}
                </ConfigProvider>
            </>
        );
    };

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
        const isAllOptionIndex = value.findIndex(_ => _ === 'Все');
        if ((isAllOptionIndex !== -1 && isAllOptionIndex === value.length - 1) || value.length === 0) {
            const current = params.data.find(_ => _.value === 'Все');
            setSelectState([current || { value: 'Все', id: 0 }]);
            return;
        }
        if (isAllOptionIndex !== -1 && isAllOptionIndex !== value.length - 1) {
            const valueArr = [];
            value.forEach(v => {
                const el = params.data.find(_ => _.value === v);
                el && el.value !== 'Все' && valueArr.push(el);
            });
            setSelectState(valueArr);
            return;
        }
        const valueArr = [];
        value.forEach(v => {
            const el = params.data.find(_ => _.value === v);
            el && valueArr.push(el);
        });
        setSelectState(valueArr);
    };

    useEffect(() => {
        const state = Array.isArray(value) ? value : [value];
        setSelectState(state);
        prevSelectState.current = state;
    }, [value]);

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
                    renderEmpty={() => (<div style={{ cursor: 'default' }}>{selectId === 'product_groups' ? 'Нет групп' : 'Нет данных'}</div>)}
                    theme={{
                        token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
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
                        maxTagCount={0}
                        maxTagTextLength={5}
                        showSearch={false}
                        size='large'
                        mode='multiple'
                        //maxTagCount='responsive'
                        tagRender={tagRender}
                        suffixIcon={icon}
                        className={styles.plainSelect__select}
                        options={getOnlyUniqueOptions(optionsData)
                            .filter((_) => typeof _.value === 'string' ? _.value.toLowerCase().includes(searchState.toLowerCase()) : true)
                            .map((option, id) => ({ ...option, key: JSON.stringify(option)}))
                        }
                        value={(Array.isArray(selectState) ? selectState : [])}
                        id={selectId}
                        //onChange={handler}
                        onChange={selectHandler}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        dropdownRender={renderPopup}
                        onDropdownVisibleChange={(open) => {
                            if (!open) {
                                setSearchState('');
                                if (JSON.stringify(prevSelectState.current) === JSON.stringify(selectState)) return;

                                dispatch(filterActions.setActiveFilters({ stateKey: params.stateKey, data: selectState }));
                                prevSelectState.current = selectState;
                            }
                        }}
                        maxTagPlaceholder={omittedValues => (
                            <>
                                {omittedValues.length > 1 && <p className={styles.plainSelect__multiLabel}>Выбрано: {omittedValues.length}</p>}
                                {omittedValues.length === 1 && params.stateKey !== 'activeWeeks' &&
                                    <p className={styles.plainSelect__multiLabel} title={omittedValues[0].value}>{omittedValues[0].value}</p>
                                }
                                {omittedValues.length === 1 && params.stateKey === 'activeWeeks' &&
                                   <p className={styles.plainSelect__multiLabel} title={omittedValues[0].label}>{omittedValues[0].label}</p>}

                            </>
                        )}
                        menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
                        disabled={isDataLoading || disabled}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};
