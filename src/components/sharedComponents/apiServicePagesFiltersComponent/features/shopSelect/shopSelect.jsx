import { useState } from 'react';
import styles from './shopSelect.module.css';
import { SelectIcon } from '../../shared';
import { Select, ConfigProvider, Input, Button } from 'antd';

export const ShopSelect = (
    {
        selectId, //string
        label, //string
        value, //string | number
        optionsData, //array
        handler, // (e) => void
        isDataLoading, //boolean
        hasSearch, //boolean
        disabled
    }
) => {

    const [searchState, setSearchState] = useState('');

    const icon = <SelectIcon />;

    const renderPopup = (menu) => {

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
            </>
        );
    };
    

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
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
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
                        suffixIcon={icon}
                        className={styles.plainSelect__select}
                        options={optionsData?.map(brand => ({ value: brand.id, label: brand.brand_name }))}
                        options={optionsData?.map(brand => ({ value: brand.id, label: brand.brand_name }))?.filter(brand => brand.label.toLowerCase().includes(searchState.toLowerCase()))}
                        value={value}
                        id={selectId}
                        onChange={handler}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        disabled={isDataLoading || disabled}
                        popupRender={hasSearch ? (menu) => renderPopup(menu) : undefined}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};

