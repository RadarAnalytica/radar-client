import React, { useState, useRef, useEffect } from 'react';
import styles from './RadarMultiSelect.module.css';
import { SelectIcon } from '../icons/selectIcon';
import { ConfigProvider, Input, Button, Tag, Select, SelectProps, Checkbox } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

//antd Config Provider theme
const selectTheme = {
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
            optionPadding: '5px 8px',
            controlHeightLG: 38,
        }
    }
}

const checkboxTheme = {
    token: {
        fontSize: 14,
        fontWeight: 500,
        controlHeight: 20,
        controlInteractiveSize: 20,
        borderRadiusSM: 3,
        colorPrimary: '#5329FF',
        colorBgContainer: 'transparent',
    }
}

const getOnlyUniqueOptions = (options: Array<{ value: string | number; label: string }>) => {
    return options.filter((option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
};

interface IRadarMultiSelectProps extends Omit<SelectProps, 'options'> {
    selectId?: string;
    label?: string;
    optionsData?: Array<{ value: string | number; label: string }>;
    isDataLoading?: boolean;
    disabled?: boolean;
    value?: (string | number)[] | null;
    actionHandler?: (value: string | number | (string | number)[] | null) => void;
    hasDropdownSearch?: boolean;
}

export const RadarMultiSelect: React.FC<IRadarMultiSelectProps> = ({
    selectId,
    label,
    optionsData = [],
    isDataLoading = false,
    disabled = false,
    value = null,
    actionHandler,
    hasDropdownSearch = false,
    ...props
}) => {
    const [searchState, setSearchState] = useState('');
    const [selectState, setSelectState] = useState<Array<string | number> | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const prevSelectState = useRef(null);




    const selectHandler = (value: string | number) => {
        console.log('value', value);
        if (Array.isArray(value) && value.length > 0) {
            const newValue = value.filter(item => item !== 'Все');
            setSelectState(newValue);
            actionHandler?.(newValue);
            return newValue;
        }
        if (Array.isArray(value) && value.length === 0) {
            setSelectState(['Все']);
            actionHandler?.(value);
            return ['Все'];
        }
    };


    // Инициализация начального стейта значения селекта (Внутри много условий для мульти/сингл режима)
    useEffect(() => {
        if (!value) {
            return
        }
        if (value && !Array.isArray(value)) {
            console.error(' Initial value should be an array of strings or numbers');
            return
        }
        //@ts-ignore
        setSelectState(value);

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
                    theme={selectTheme}
                >
                    <Select
                        maxTagCount={0}
                        maxTagTextLength={5}
                        showSearch={false}
                        size='large'
                        mode={'multiple'}
                        tagRender={TagRender}
                        suffixIcon={<SelectIcon />}
                        className={styles.plainSelect__select}
                        options={getOnlyUniqueOptions(optionsData)
                            .filter((_) => typeof _.value === 'string' ? _.value.toLowerCase().includes(searchState.toLowerCase()) : true)
                            .map((option, id) => ({ ...option, key: JSON.stringify(option) }))
                        }
                        value={selectState}
                        open={isDropdownOpen}
                        id={selectId}
                        //onChange={handler}
                        onChange={selectHandler}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        dropdownRender={(menu) => RenderPopup({ menu, selectState, optionsData, selectId, searchState, setSelectState, hasDropdownSearch, setSearchState, actionHandler, setIsDropdownOpen })}
                        onDropdownVisibleChange={(open) => {
                            setIsDropdownOpen(open)
                            if (open) {
                                prevSelectState.current = selectState;
                            }
                            if (!open) {
                                setSearchState('');
                                if (JSON.stringify(prevSelectState.current) === JSON.stringify(selectState)) return;
                                actionHandler?.(selectState);
                            }
                        }}
                        maxTagPlaceholder={omittedValues => (
                            <>
                                {omittedValues.length > 1 && <p className={styles.plainSelect__multiLabel}>Выбрано: {omittedValues.length}</p>}
                                {omittedValues.length === 1 &&
                                    <p className={styles.plainSelect__multiLabel} title={omittedValues[0].value.toString()}>{omittedValues[0].label.toString()}</p>
                                }
                                {/* {omittedValues.length === 1 && params.stateKey === 'activeWeeks' &&
                                    <p className={styles.plainSelect__multiLabel} title={omittedValues[0].label}>{omittedValues[0].label}</p>
                                } */}

                            </>
                        )}
                        optionRender={(option) => {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ConfigProvider theme={checkboxTheme}>
                                        <Checkbox
                                            checked={Array.isArray(selectState) && selectState.includes(option.value)}
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </ConfigProvider>
                                    <span className={styles.radarSelect__multiLabel} style={{ color: selectState?.includes(option.value) ? '#5329FF' : '#1A1A1A' }}>{option?.label}</span>
                                </div>)
                        }}
                        menuItemSelectedIcon={null}
                        disabled={isDataLoading || disabled}
                        {...props}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};



interface IRenderPopupProps {
    menu: React.ReactNode;
    selectState: Array<string | number> | null;
    optionsData: Array<{ value: string | number; label: string }>;
    selectId: string;
    searchState: string;
    setSelectState: (value: Array<string | number> | null) => void;
    hasDropdownSearch: boolean;
    setSearchState: (value: string) => void;
    actionHandler?: (value: string | number | (string | number)[] | null) => void;
    setIsDropdownOpen: (value: boolean) => void;
}
const RenderPopup = ({
    menu,
    selectState,
    searchState,
    hasDropdownSearch,
    setSearchState,
    actionHandler,
    setIsDropdownOpen,
    optionsData,
    setSelectState,
}: IRenderPopupProps) => {

    const checkAllButtonHandler = () => {
        if (selectState && selectState?.filter(_ => _ !== 'Все').length < optionsData.length && !searchState) {
            setSelectState(optionsData?.map(_ => _.value))
        } else if (selectState && selectState?.filter(_ => _ !== 'Все').length === optionsData?.length) {
            setSelectState(['Все' as string])
        }
    }



    return (
        <>
            {hasDropdownSearch &&
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
            }
            {!searchState &&
                <button
                    className={styles.radarSelect__checkAllButton}
                    onClick={checkAllButtonHandler}
                    disabled={optionsData?.length === 0}
                    style={{ fontSize: 14, width: '100%' }}
                >
                    {selectState?.filter(_ => _ !== 'Все').length < optionsData?.length && 'Выбрать все'}
                    {selectState?.filter(_ => _ !== 'Все').length === optionsData?.length && 'Снять все'}
                </button>
            }
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
                {/* <Button
                    type='primary'
                    size='large'
                    style={{ fontSize: 14, width: '100%', fontWeight: 600 }}
                    onClick={() => {
                        const values = Array.isArray(selectState)
                            ? selectState.map(item => typeof item === 'string' ? item : item)
                            : selectState;
                        actionHandler?.(values)
                        setIsDropdownOpen(false)
                    }}
                >
                    Применить
                </Button> */}
            </ConfigProvider>
        </>
    );
}



const TagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;

    return (
        <Tag
            color={value}
            closable={false}
            onClose={onClose}
            style={{ background: 'transparent', color: 'black', fontSize: '14px', display: 'flex', alignItems: 'center', border: 'none' }}
        >
            {label}
        </Tag>
    );
};