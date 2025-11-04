import styles from './KeywordSelectionFilters.module.css';
import { Form, Select, ConfigProvider, Input, Segmented, Checkbox } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/selectIcon/selectIcon';
import { useState } from 'react';
import DownloadButton from '@/components/DownloadButton';


// antd theme
const theme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Mulish',
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
            controlHeight: 38,
            controlHeightLG: 38,
            optionHeight: 24,
            optionPadding: '5px 12px'
        },
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            activeShadow: 'transparent'
        },
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

// model 
interface IKeywordSelectionFiltersForm {
    submitHandler: (formData: Record<string, any>) => void;
}



export const KeywordSelectionFilters: React.FC<IKeywordSelectionFiltersForm> = ({ submitHandler }) => {
    const [form] = Form.useForm();
    const [keywordDropdownIncludeOpen, setKeywordDropdownIncludeOpen] = useState(false);
    const [keywordDropdownExcludeOpen, setKeywordDropdownExcludeOpen] = useState(false);
    return (
        <div className={styles.filters}>
            <ConfigProvider
                renderEmpty={() => (<div>Нет данных</div>)}
                theme={theme}
            >
                <Form
                    className={styles.filters__form}
                    layout='vertical'
                    form={form}
                    onFinish={submitHandler}
                    initialValues={{
                        frequency_from: '',
                        frequency_to: '',
                    }}
                >
                    {/* Frequency block */}
                    <div className={styles.filters__block}>
                        <label>Частота</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="frequency_from"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>От</span>}
                                />
                            </Form.Item>
                            <Form.Item
                                name="frequency_to"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>До</span>}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* Items block */}
                    <div className={styles.filters__block}>
                        <label>Товаров</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="items_from"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>От</span>}
                                />
                            </Form.Item>
                            <Form.Item
                                name="items_to"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>До</span>}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* Items block */}
                    <div className={styles.filters__block}>
                        <label>Сложность</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="complexity_from"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>От</span>}
                                />
                            </Form.Item>
                            <Form.Item
                                name="complexity_to"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>До</span>}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* Words block */}
                    <div className={styles.filters__block}>
                        <label>Сложность</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="words_from"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>От</span>}
                                />
                            </Form.Item>
                            <Form.Item
                                name="words_to"
                                className={styles.filters__formItem}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C' }}>До</span>}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* Keywords to include select */}
                    <Form.Item
                        name="keywords_to_include"
                        label="Включить"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={[]}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            open={keywordDropdownIncludeOpen}
                            onDropdownVisibleChange={setKeywordDropdownIncludeOpen}
                            dropdownRender={() =>
                                <KeywordSelectDropdown
                                    handler={(matchType, keywords) => {
                                        form.setFieldValue('keywords_to_include', keywords);
                                        form.setFieldValue('include_match_type', matchType);
                                        setKeywordDropdownIncludeOpen(false);
                                    }}
                                />
                            }
                            dropdownStyle={{ minWidth: 'max-content' }}
                        />
                    </Form.Item>
                    {/* Keywords to exclude select */}
                    <Form.Item
                        name="keywords_to_exclude"
                        label="Исключить"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={[]}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            open={keywordDropdownExcludeOpen}
                            onDropdownVisibleChange={setKeywordDropdownExcludeOpen}
                            dropdownRender={() =>
                                <KeywordSelectDropdown
                                    handler={(matchType, keywords) => {
                                        form.setFieldValue('keywords_to_exclude', keywords);
                                        form.setFieldValue('exclude_match_type', matchType);
                                        setKeywordDropdownExcludeOpen(false);
                                    }}
                                />
                            }
                            dropdownStyle={{ minWidth: 'max-content' }}
                        />
                    </Form.Item>
                    {/* Accept checkbox */}
                    <ConfigProvider theme={checkboxTheme}>
                        <Form.Item
                            name="accept_filters_to_keywords"
                            className={`${styles.filters__formItem} ${styles.filters__formItem_checkbox}`}
                        >
                            <Checkbox
                            >
                                Применить фильтры ко вложенным ключам
                            </Checkbox>
                        </Form.Item>
                    </ConfigProvider>
                    <button
                        className={styles.filters__resetButton}
                        onClick={() => { form.resetFields(); }}
                    >
                        Сбросить
                    </button>

                    {/* Download button */}
                    <div className={styles.filters__downloadButtonWrapper}>
                        <DownloadButton handleDownload={() => { }} loading={false} />
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    )
}


// antd segmented theme
const segmentedTheme = {
    token: {
        fontSize: 12,
        fontWeight: 500,
    },
    components: {
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
        }
    }
}


interface IKeywordSelectDropdownProps {
    handler: (matchType: 'Содержит' | 'Совпадает полностью', keywords: string) => void;
}



const KeywordSelectDropdown: React.FC<IKeywordSelectDropdownProps> = ({ handler }) => {

    const [selectedTab, setSelectedTab] = useState<'Содержит' | 'Совпадает полностью'>('Содержит');
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={styles.keywordSelectDropdown}>
            <ConfigProvider theme={segmentedTheme}>
                <Segmented
                    options={['Содержит', 'Совпадает полностью']}
                    size='large'
                    value={selectedTab}
                    onChange={(value) => setSelectedTab(value as 'Содержит' | 'Совпадает полностью')}
                />
            </ConfigProvider>
            <div className={styles.keywordSelectDropdown__inputWrapper}>
                <label>Ключевые слова через запятую</label>
                <Input
                    value={inputValue}
                    size='large'
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Ключевые слова'
                />
            </div>
            <button
                className={styles.keywordSelectDropdown__button}
                onClick={() => handler(selectedTab, inputValue)}
            >
                Применить
            </button>
        </div>
    )
}