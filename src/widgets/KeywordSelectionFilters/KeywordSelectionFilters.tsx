import styles from './KeywordSelectionFilters.module.css';
import { Form, Select, ConfigProvider, Input, Segmented, Checkbox, Flex } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/selectIcon/selectIcon';
import { useState, useCallback, useEffect, useRef } from 'react';
import DownloadButton from '@/components/DownloadButton';
import useDebouncedFunction from '@/service/hooks/useDebounce';
import { useDemoMode } from '@/app/providers';


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
            activeShadow: 'transparent',
            controlHeight: 38,
            controlHeightLG: 38,
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
    loading: boolean,
}



export const KeywordSelectionFilters: React.FC<IKeywordSelectionFiltersForm> = ({ submitHandler, loading }) => {
    const [form] = Form.useForm();
    const [keywordDropdownIncludeOpen, setKeywordDropdownIncludeOpen] = useState(false);
    const [keywordDropdownExcludeOpen, setKeywordDropdownExcludeOpen] = useState(false);
    const focusRef = useRef<string | null>(null);
    const { isDemoMode } = useDemoMode();

    const handleSubmit = useCallback(() => {
        form.submit();
    }, [form]);

    const debouncedSubmit = useDebouncedFunction(handleSubmit, 500);

    const numberOnlyRule = { pattern: /^\d*$/, message: '' };
    const decimalRule = { pattern: /^\d*(?:[.,]\d*)?$/, message: '' };
    const parseLocaleNumber = (val: string) => Number((val ?? '').toString().replace(',', '.'));
    const createFromValidator = (toField: string) => ({
        validator(_: unknown, value: string) {
            const toValueRaw = form.getFieldValue(toField);
            if (!value || !toValueRaw) {
                return Promise.resolve();
            }
            const fromNum = parseLocaleNumber(value);
            const toNum = parseLocaleNumber(toValueRaw);
            if (Number.isNaN(fromNum) || Number.isNaN(toNum)) {
                return Promise.reject(new Error(''));
            }
            if (fromNum <= toNum) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(''));
        }
    });
    const createToValidator = (fromField: string) => ({
        validator(_: unknown, value: string) {
            const fromValueRaw = form.getFieldValue(fromField);
            if (!value || !fromValueRaw) {
                return Promise.resolve();
            }
            const toNum = parseLocaleNumber(value);
            const fromNum = parseLocaleNumber(fromValueRaw);
            if (Number.isNaN(fromNum) || Number.isNaN(toNum)) {
                return Promise.reject(new Error(''));
            }
            if (toNum >= fromNum) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(''));
        }
    });

    const handleNumberInputChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const digitsOnlyValue = event.target.value.replace(/\D/g, '');
        form.setFieldValue(fieldName, digitsOnlyValue);
        debouncedSubmit();
    };
    const handleDecimalInputChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/[^0-9.,]/g, '');
        const firstSep = value.search(/[.,]/);
        if (firstSep !== -1) {
            value = value.slice(0, firstSep + 1) + value.slice(firstSep + 1).replace(/[.,]/g, '');
        }
        form.setFieldValue(fieldName, value);
        debouncedSubmit();
    };

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
        const { id } = e.target;
        focusRef.current = id ?? null
    };

    useEffect(() => {
        const focusID = focusRef?.current
        if (!isDemoMode && !loading && focusID) {
            const input = document.querySelector(`#${focusID}`) as HTMLElement | null;
            if (input && input instanceof HTMLElement) {
                input.focus();
            }
        }
    }, [isDemoMode, loading])


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
                    disabled={isDemoMode || loading}
                    onValuesChange={(changedValues) => {
                        // Не вызываем submit для числовых полей, они обрабатываются через дебаунс
                        const numericFields = [
                            'frequency_from', 'frequency_to',
                            'items_from', 'items_to',
                            'complexity_from', 'complexity_to',
                            'words_from', 'words_to'
                        ];
                        const hasNumericFieldChange = numericFields.some(field => field in changedValues);
                        if (!hasNumericFieldChange) {
                            form.submit();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.stopPropagation();
                            submitHandler(form.getFieldsValue());
                        }
                    }}
                    initialValues={{
                    }}
                >
                    {/* Frequency block */}
                    <div className={styles.filters__block}>
                        <label>Частота</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="frequency_from"
                                className={styles.filters__formItem}
                                dependencies={['frequency_to']}
                                rules={[numberOnlyRule, createFromValidator('frequency_to')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>От</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('frequency_from')}
                                    id={'frequency_from'}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                            <Form.Item
                                name="frequency_to"
                                className={styles.filters__formItem}
                                dependencies={['frequency_from']}
                                rules={[numberOnlyRule, createToValidator('frequency_from')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>До</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('frequency_to')}
                                    id={'frequency_to'}
                                    onFocus={handleFocus}
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
                                dependencies={['items_to']}
                                rules={[numberOnlyRule, createFromValidator('items_to')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>От</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('items_from')}
                                    id={'items_from'}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                            <Form.Item
                                name="items_to"
                                className={styles.filters__formItem}
                                dependencies={['items_from']}
                                rules={[numberOnlyRule, createToValidator('items_from')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>До</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('items_to')}
                                    id={'items_to'}
                                    onFocus={handleFocus}
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
                                dependencies={['complexity_to']}
                                rules={[numberOnlyRule, createFromValidator('complexity_to')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>От</span>}
                                    type='text'
                                    inputMode='decimal'
                                    pattern='[0-9]*[.,]?[0-9]*'
                                    onChange={handleDecimalInputChange('complexity_from')}
                                    id={'complexity_from'}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                            <Form.Item
                                name="complexity_to"
                                className={styles.filters__formItem}
                                dependencies={['complexity_from']}
                                rules={[numberOnlyRule, createToValidator('complexity_from')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>До</span>}
                                    type='text'
                                    inputMode='decimal'
                                    pattern='[0-9]*[.,]?[0-9]*'
                                    onChange={handleDecimalInputChange('complexity_to')}
                                    id={'complexity_to'}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* Words block */}
                    <div className={styles.filters__block}>
                        <label>Слов</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="words_from"
                                className={styles.filters__formItem}
                                dependencies={['words_to']}
                                rules={[numberOnlyRule, createFromValidator('words_to')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>От</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('words_from')}
                                    id={'words_from'}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                            <Form.Item
                                name="words_to"
                                className={styles.filters__formItem}
                                dependencies={['words_from']}
                                rules={[numberOnlyRule, createToValidator('words_from')]}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>До</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('words_to')}
                                    id={'words_to'}
                                    onFocus={handleFocus}
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
                            placeholder='Выберите слова'
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            open={keywordDropdownIncludeOpen}
                            onDropdownVisibleChange={setKeywordDropdownIncludeOpen}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            dropdownRender={() =>
                                <KeywordSelectDropdown
                                    handler={(matchType, keywords) => {
                                        form.setFieldValue('keywords_to_include', keywords);
                                        form.setFieldValue('include_match_type', matchType);
                                        if (keywords === '' || keywords == null) {
                                            form.submit();
                                        }
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
                            placeholder='Выберите слова'
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            open={keywordDropdownExcludeOpen}
                            onDropdownVisibleChange={setKeywordDropdownExcludeOpen}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            dropdownRender={() =>
                                <KeywordSelectDropdown
                                    handler={(matchType, keywords) => {
                                        form.setFieldValue('keywords_to_exclude', keywords);
                                        form.setFieldValue('exclude_match_type', matchType);
                                        if (keywords === '' || keywords == null) {
                                            form.submit();
                                        }
                                        setKeywordDropdownExcludeOpen(false);
                                    }}
                                />
                            }
                            dropdownStyle={{ minWidth: 'max-content' }}
                        />
                    </Form.Item>
                    {/* hidden fields */}
                    <Form.Item
                        name="include_match_type"
                        className={styles.filters__formItem}
                        hidden
                    >
                        <Input
                        />
                    </Form.Item>
                    <Form.Item
                        name="exclude_match_type"
                        className={styles.filters__formItem}
                        hidden
                    >
                        <Input
                        />
                    </Form.Item>
                    {/* Accept checkbox */}
                    <Flex gap={8} style={{ gridColumn: 'span 3' }}>
                        {/* <ConfigProvider theme={checkboxTheme}>
                            <Form.Item
                                name="accept_filters_to_keywords"
                                className={`${styles.filters__formItem} ${styles.filters__formItem_checkbox}`}
                                valuePropName="checked"
                            >
                                <Checkbox
                                >
                                    Применить фильтры ко вложенным ключам
                                </Checkbox>
                            </Form.Item>
                        </ConfigProvider> */}
                        <button
                            className={styles.filters__resetButton}
                            onClick={() => { form.resetFields(); }}
                        >
                            Сбросить
                        </button>
                    </Flex>
                    {/* Download button */}
                    {/* <div className={styles.filters__downloadButtonWrapper}>
                        <DownloadButton handleDownload={() => { }} loading={false} />
                    </div> */}
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
    handler: (matchType: 'Все слова' | 'Любое слово', keywords: string) => void;
}



const KeywordSelectDropdown: React.FC<IKeywordSelectDropdownProps> = ({ handler }) => {

    const [selectedTab, setSelectedTab] = useState<'Все слова' | 'Любое слово'>('Все слова');
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={styles.keywordSelectDropdown}>
            <ConfigProvider theme={segmentedTheme}>
                <Segmented
                    options={['Все слова', 'Любое слово']}
                    size='large'
                    value={selectedTab}
                    onChange={(value) => setSelectedTab(value as 'Все слова' | 'Любое слово')}
                />
            </ConfigProvider>
            <div className={styles.keywordSelectDropdown__inputWrapper}>
                <label>Ключевые слова через запятую</label>
                <Input
                    value={inputValue}
                    size='large'
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    placeholder='Ключевые слова'
                    allowClear
                    onClear={() => {
                        handler(selectedTab, null)
                    }}
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