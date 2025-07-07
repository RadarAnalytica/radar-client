import { useState, useEffect, useCallback, useMemo } from 'react'
import styles from './subjectFieldset.module.css'
import { Form, ConfigProvider, Input, Select, Button, Tag } from 'antd'
import { ApiService } from '../../../trendingRequestsPage/shared'

const SubjectFieldset = ({ prefered_items, form }) => {

    const [searchState, setSearchState] = useState('') // search field inside select state
    const [preferedItemsData, setPreferedItemsData] = useState([]) // list of items
    const [isBodyVisisble, setIsBodyVisible] = useState(false)

    // subject getter
    const getPreferedItemsTest = useCallback(async () => {
        const apiService = new ApiService({
            name: 'trendingQueriesCache',
            defaultTTL: 24 * 60 * 60 * 1000 // 24 часа
        });
        try {
            const data = await apiService.fetch(
                'https://radarmarket.ru/api/web-service/trending-queries/subjects-tree',
                {
                    onCacheHit: (data) => {
                        console.log('Using cached data');
                        setPreferedItemsData(data);
                    },
                    onCacheMiss: () => {
                        console.log('Fetching fresh data');
                    }
                }
            );
            setPreferedItemsData(data)
        } catch (error) {
            console.error('Error fetching preferred items:', error);
        }
    }, [])
    // ------------ popup custom select ---------//
    const renderPopup = useCallback((menu) => {
        let action;
        const acc = preferedItemsData?.reduce((total, item) => {
            return total + item.children.length
        }, 0)
        if (prefered_items?.length < acc) {
            action = () => {
                let allDataArr = []
                preferedItemsData.forEach(_ => {
                    const normilized = _.children.map(c => c.id)
                    allDataArr = [...allDataArr, ...normilized]
                })
                form.setFieldValue('prefered_items', [...allDataArr])
            }
        }
        if (prefered_items?.length === acc) {
            action = () => { form.setFieldValue('prefered_items', []) }
        }

        return (
            <div style={{ zIndex: 999999 }}>
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
                        disabled={acc === 0}
                    >
                        {prefered_items?.length < acc && 'Выбрать все'}
                        {prefered_items?.length === acc && 'Снять все'}
                    </Button>}
                </ConfigProvider>
            </div>)
    }, [preferedItemsData, prefered_items, searchState, form])

    // ----------- select custom tag ---------------//
    const tagRender = useCallback(props => {
        const { label, value, closable, onClose } = props;
        return (
            <Tag
                //color={value}
                closable={false}
                onClose={onClose}
                bordered={false}
                style={{ background: 'transparent', color: 'black', fontSize: '16px' }}
            >
                {/* <p className={styles.form__multiLabel} title={label.props.children}>{label}</p> */}
                <p className={styles.form__multiLabel} title={label.props.children.toString().replace(',', '')}>{label}</p>
            </Tag>
        );
    }, [])


    // ----------------- theme -----------------------//
    const memoizedConfigProviderTheme = useMemo(() => ({
        token: {
            colorPrimary: '#5329FF'
        },
        components: {
            Form: {
                labelFontSize: 15
            },
            Select: {
                activeOutlineColor: 'transparent',
                optionActiveBg: 'transparent',
                optionFontSize: 16,
                optionSelectedBg: 'transparent',
                optionSelectedColor: '#5329FF',
                selectorBg: 'transparent'
            }
        }
    }), [])

    //getting subject
    useEffect(() => {
        if (preferedItemsData.length === 0) {
            getPreferedItemsTest()
        }
    }, [preferedItemsData])

    return (
        <fieldset
            className={styles.fieldset}
        >
            <div
                className={styles.fieldset__header}
                id='header'
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log('t', e.target)
                    // console.log('ct', e.currentTarget)
                    // console.log('type', e.type)
                    if (e.currentTarget.id === 'header' && e.type === 'click') {
                        setIsBodyVisible(!isBodyVisisble);
                    }
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                    } else if (document.selection) {
                        document.selection.empty();
                    }
                }}
                onMouseDownCapture={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                    } else if (document.selection) {
                        document.selection.empty();
                    }
                }}
            >
                <h3 className={styles.fieldset__title}>Приоритетные предметы</h3>
                <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`} type='button'>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7.5L7 1.5L1 7.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <div className={styles.fieldset__layout} hidden={!isBodyVisisble}>
                <ConfigProvider
                    renderEmpty={() => (<div style={{ cursor: 'default' }}>Нет данных</div>)}
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            colorBgContainer: 'white',
                            //colorBorder: 'transparent',
                            //borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 14,
                            controlHeightLG: 44
                        },
                        components: {
                            Select: {
                                //activeBorderColor: 'transparent',
                                activeOutlineColor: 'transparent',
                                //hoverBorderColor: 'transparent',
                                optionActiveBg: 'transparent',
                                optionFontSize: 16,
                                optionSelectedBg: 'transparent',
                                optionSelectedColor: '#5329FF',
                                singleItemHeightLG: 44,
                                colorBorder: 'transparent'
                            }
                        }
                    }}
                >
                    <Form.Item
                        style={{ margin: 0, width: '100%' }}
                        name='prefered_items'
                    >
                        <Select
                            //style={{ height: '44px' }}
                            maxTagCount={0}
                            //maxTagCount='responsive'
                            //maxTagTextLength={20}
                            showSearch={false}
                            mode='multiple'
                            size='large'
                            placeholder='Выберите'
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            tagRender={tagRender}
                            onDropdownVisibleChange={(open) => {
                                if (!open) {
                                    setSearchState('')
                                }
                            }}
                            suffixIcon={
                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            }
                            dropdownRender={renderPopup}
                            options={preferedItemsData.filter(i => i.children.filter(c => c.name.toLowerCase().includes(searchState.toLowerCase())).length > 0).map(_ => {
                                return {
                                    label: <>{_.name}</>,
                                    title: _.name,
                                    options: _.children.filter(c => c.name.toLowerCase().includes(searchState.toLowerCase())).map(c => ({ value: c.id, label: c.name }))
                                }
                            })}
                            maxTagPlaceholder={omittedValues => {
                                if (omittedValues.length > 1) {
                                    return (
                                        // <p className={styles.form__multiLabel}>Выбрано: {omittedValues.length}</p>
                                        <>Выбрано: {omittedValues.length}</>
                                    )
                                }
                                if (omittedValues.length === 1) {
                                    let valueName = '';
                                    preferedItemsData.forEach(_ => {
                                        const index = _.children.findIndex(c => c.id === omittedValues[0].value);
                                        if (index !== -1) {
                                            valueName = _.children[index].name
                                        }
                                    })
                                    return (
                                        // <p className={styles.form__multiLabel} title={valueName}>{valueName}</p>
                                        <>{valueName}</>
                                    )
                                }
                            }}
                            menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
                        />
                    </Form.Item>
                </ConfigProvider>
            </div>
        </fieldset>
    )
}

export default SubjectFieldset;