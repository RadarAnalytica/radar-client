import styles from './PositionCheckFilters.module.css';
import { Form, Select, ConfigProvider, Input, Segmented } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/selectIcon/selectIcon';
import { useState } from 'react';


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
}



export const PositionCheckFilters: React.FC<IPositionCheckFiltersForm> = ({ submitHandler }) => {
    const [form] = Form.useForm();
    const [keywordDropdownOpen, setKeywordDropdownOpen] = useState(false);
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
                    {/* Region select */}
                    <Form.Item
                        name="region"
                        label="Регион"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={[
                                { label: 'Москва', value: 1 },
                                { label: 'Санкт-Петербург', value: 2 },
                                { label: 'Екатеринбург', value: 3 },
                                { label: 'Новосибирск', value: 4 },
                                { label: 'Красноярск', value: 5 },
                                { label: 'Самара', value: 6 },
                                { label: 'Ростов-на-Дону', value: 7 },
                                { label: 'Уфа', value: 8 },
                                { label: ' Казань', value: 9 },
                            ]}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                        />
                    </Form.Item>
                    {/* type select */}
                    <Form.Item
                        name="type"
                        label="Тип выдачи (?)"
                        className={styles.filters__formItem}
                    >
                        <Select
                            options={[]}
                            size='large'
                            suffixIcon={<SelectIcon />}
                            className={styles.filters__select}
                        />
                    </Form.Item>
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