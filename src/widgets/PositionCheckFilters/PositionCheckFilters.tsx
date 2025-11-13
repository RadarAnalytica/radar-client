import styles from './PositionCheckFilters.module.css';
import { Form, Select, ConfigProvider, Input, Segmented } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/selectIcon/selectIcon';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useDemoMode } from '@/app/providers';
import useDebouncedFunction from '@/service/hooks/useDebounce';
import { IoMdReturnLeft } from 'react-icons/io';


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
        }
    }
}

// model 
interface IPositionCheckFiltersForm {
    submitHandler: (formData: Record<string, any>) => void;
    isLoading: boolean;
    regionsData: Record<string, any>[];
}



export const PositionCheckFilters: React.FC<IPositionCheckFiltersForm> = ({ submitHandler, isLoading, regionsData }) => {
    const { isDemoMode } = useDemoMode();
    const [form] = Form.useForm();
    const [keywordDropdownOpen, setKeywordDropdownOpen] = useState(false);
    const focusRef = useRef(null)

    const handleSubmit = useCallback(() => {
        form.submit();
    }, [form]);

    const debouncedSubmit = useDebouncedFunction(handleSubmit, 500);

    const handleNumberInputChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const digitsOnlyValue = event.target.value.replace(/\D/g, '');
        form.setFieldValue(fieldName, digitsOnlyValue);
        debouncedSubmit();
    };

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
        const { id } = e.target;
        const list = ['frequency_from_input', 'frequency_to_input'];
        focusRef.current = id && list.includes(id) ? id : null  
    };

    useEffect(() => {
         const focusID = focusRef?.current
         console.log(focusID)
        if (!isDemoMode && !isLoading && focusID) {
            const input = document.querySelector(`#${focusID}`) as HTMLElement | null;
            if (input && input instanceof HTMLElement) {
                input.focus();
            }
        }
    }, [isDemoMode, isLoading])
 
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
                    onValuesChange={(changedValues) => {
                        // Не вызываем submit для frequency полей, они обрабатываются через дебаунс
                        if (!('frequency_from' in changedValues) && !('frequency_to' in changedValues)) {
                            form.submit();
                        }
                    }}
                    disabled={isDemoMode || isLoading}
                    initialValues={{
                        region: -1257786, // Moscow
                        frequency_from: '',
                        frequency_to: '',
                        type: 'both',
                        match_type: 'Содержит',
                    }}
                >
                    {/* Region select */}
                    <Form.Item
                        name="region"
                        label="Регион"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={regionsData?.map((region) => ({ label: region.city_name, value: region.dest }))}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            onFocus={handleFocus}
                            id='region_select'
                        />
                    </Form.Item>
                    {/* type select */}
                    <Form.Item
                        name="type"
                        label="Тип выдачи (?)"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={[
                                {value: 'both', label: 'Органика+Реклама'},
                                {value: 'organic', label: 'Органика'},
                                {value: 'ad', label: 'Реклама'},
                            ]}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            onFocus={handleFocus}
                            id='type_select'
                        />
                    </Form.Item>
                    {/* Frequency block */}
                    <div className={styles.filters__block}>
                        <label>Частота</label>
                        <div className={styles.filters__blockWrapper}>
                            <Form.Item
                                name="frequency_from"
                                className={styles.filters__formItem}
                                style={{maxWidth: '210px'}}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>От</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('frequency_from')}
                                    id='frequency_from_input'
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                            <Form.Item
                                name="frequency_to"
                                className={styles.filters__formItem}
                                style={{maxWidth: '210px'}}
                            >
                                <Input
                                    size='large'
                                    className={styles.filters__select}
                                    prefix={<span style={{ color: '#8C8C8C75' }}>До</span>}
                                    inputMode='numeric'
                                    onChange={handleNumberInputChange('frequency_to')}
                                    id='frequency_to_input'
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* Keyword select */}
                    <Form.Item
                        name="keyword"
                        label="Ключевое слово"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={[]}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            open={keywordDropdownOpen}
                            onDropdownVisibleChange={setKeywordDropdownOpen}
                            placeholder='Выбрать'
                            onFocus={handleFocus}
                            id='keyword_select'
                            dropdownRender={() =>
                                <KeywordSelectDropdown
                                    handler={(matchType, keywords) => {
                                        form.setFieldValue('keyword', keywords);
                                        form.setFieldValue('match_type', matchType);
                                        setKeywordDropdownOpen(false);
                                    }}
                                />
                            }
                            dropdownStyle={{ minWidth: 'max-content' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="match_type"
                        label="Ключевое слово"
                        className={styles.filters__formItem}
                        hidden
                    ><Input onFocus={handleFocus} id='match_type_input' /></Form.Item>
                    <button
                        className={styles.filters__resetButton}
                        onClick={() => { form.resetFields(); }}
                    >
                        Сбросить
                    </button>
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

    useEffect(() => {
        if (!inputValue?.trim()) {
            handler(selectedTab, null)
        }
    }, [inputValue]);

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
                    allowClear
                />
            </div>
            <button
                className={styles.keywordSelectDropdown__button}
                onClick={() => handler(selectedTab, inputValue)}
                //disabled={!inputValue || inputValue.trim().length <= 2}
            >
                Применить
            </button>
        </div>
    )
}