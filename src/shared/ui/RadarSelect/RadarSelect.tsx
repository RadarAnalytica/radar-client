import React, { useState, useEffect } from 'react';
import styles from './RadarSelect.module.css';
import { SelectIcon } from '../icons/selectIcon';
import { ConfigProvider, Input, Select, SelectProps } from 'antd';

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

const getOnlyUniqueOptions = (options: Array<{ value: string; label: string }>) => {
    return options.filter((option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
};

interface IRadarSelectProps extends Omit<SelectProps, 'options'> {
    selectId?: string;
    label?: string;
    optionsData?: Array<{ value: string; label: string }>;
    isDataLoading?: boolean;
    disabled?: boolean;
    value?: string | number | null;
    actionHandler?: (value: string | number | null) => void;
    hasDropdownSearch?: boolean;
}

export const RadarSelect: React.FC<IRadarSelectProps> = ({
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
    const [selectState, setSelectState] = useState<string | number | null>(null);




    const selectHandler = (value: string | number) => {
        setSelectState(value);
        actionHandler?.(value);
    };


    // Инициализация начального стейта значения селекта (Внутри много условий для мульти/сингл режима)
    useEffect(() => {
        if (!value) {
            return
        }
        if (value && typeof value !== 'string' && typeof value !== 'number') {
            console.error(' Initial value should be a string or number');
            return
        }
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
                        showSearch={false}
                        size='large'
                        suffixIcon={<SelectIcon />}
                        className={styles.plainSelect__select}
                        options={getOnlyUniqueOptions(optionsData)
                            .filter((_) => typeof _.value === 'string' ? _.value.toLowerCase().includes(searchState.toLowerCase()) : true)
                            .map((option, id) => ({ ...option, key: JSON.stringify(option) }))
                        }
                        value={selectState}
                        id={selectId}
                        onChange={selectHandler}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        dropdownRender={(menu) => RenderPopup({ menu, searchState, hasDropdownSearch, setSearchState })}
                        menuItemSelectedIcon={(<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>)}
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
    searchState: string;
    hasDropdownSearch: boolean;
    setSearchState: (value: string) => void;
}
const RenderPopup = ({
    menu,
    searchState,
    hasDropdownSearch,
    setSearchState,
}: IRenderPopupProps) => {



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
            <div style={{ width: '100%', padding: '10px 0' }}>
                {menu}
            </div>
        </>
    );
}