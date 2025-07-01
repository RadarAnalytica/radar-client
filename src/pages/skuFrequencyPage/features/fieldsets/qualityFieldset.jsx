import { useState, useEffect } from 'react'
import styles from './qualityFieldset.module.css'
import { Form, ConfigProvider, Checkbox, Tooltip } from 'antd'


const QUALITY_CONFIG = [
    {
        label: (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                Лучшие
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63721 0.325131C5.78057 0.0164378 6.21943 0.0164379 6.36279 0.325131L7.60614 3.00243C7.66442 3.12793 7.78343 3.2144 7.9208 3.23104L10.8513 3.58621C11.1892 3.62716 11.3248 4.04454 11.0755 4.27627L8.91345 6.2861C8.8121 6.38032 8.76664 6.52022 8.79326 6.65601L9.36104 9.55281C9.42651 9.88682 9.07147 10.1448 8.77404 9.9793L6.19447 8.54414C6.07355 8.47687 5.92645 8.47687 5.80553 8.54414L3.22596 9.9793C2.92853 10.1448 2.57349 9.88682 2.63896 9.55281L3.20674 6.65601C3.23336 6.52022 3.1879 6.38032 3.08655 6.2861L0.924505 4.27627C0.675221 4.04454 0.810835 3.62716 1.14872 3.58621L4.0792 3.23104C4.21657 3.2144 4.33558 3.12793 4.39386 3.00243L5.63721 0.325131Z" fill='#00B69B' />
                </svg>

            </div>
        ),
        value: 1,
    },
    {
        label: (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                Хорошие
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63721 0.325131C5.78057 0.0164378 6.21943 0.0164379 6.36279 0.325131L7.60614 3.00243C7.66442 3.12793 7.78343 3.2144 7.9208 3.23104L10.8513 3.58621C11.1892 3.62716 11.3248 4.04454 11.0755 4.27627L8.91345 6.2861C8.8121 6.38032 8.76664 6.52022 8.79326 6.65601L9.36104 9.55281C9.42651 9.88682 9.07147 10.1448 8.77404 9.9793L6.19447 8.54414C6.07355 8.47687 5.92645 8.47687 5.80553 8.54414L3.22596 9.9793C2.92853 10.1448 2.57349 9.88682 2.63896 9.55281L3.20674 6.65601C3.23336 6.52022 3.1879 6.38032 3.08655 6.2861L0.924505 4.27627C0.675221 4.04454 0.810835 3.62716 1.14872 3.58621L4.0792 3.23104C4.21657 3.2144 4.33558 3.12793 4.39386 3.00243L5.63721 0.325131Z" fill='#FEC53D' />
                </svg>

            </div>
        ),
        value: 2,
    },
    {
        label: (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                Средние
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63721 0.325131C5.78057 0.0164378 6.21943 0.0164379 6.36279 0.325131L7.60614 3.00243C7.66442 3.12793 7.78343 3.2144 7.9208 3.23104L10.8513 3.58621C11.1892 3.62716 11.3248 4.04454 11.0755 4.27627L8.91345 6.2861C8.8121 6.38032 8.76664 6.52022 8.79326 6.65601L9.36104 9.55281C9.42651 9.88682 9.07147 10.1448 8.77404 9.9793L6.19447 8.54414C6.07355 8.47687 5.92645 8.47687 5.80553 8.54414L3.22596 9.9793C2.92853 10.1448 2.57349 9.88682 2.63896 9.55281L3.20674 6.65601C3.23336 6.52022 3.1879 6.38032 3.08655 6.2861L0.924505 4.27627C0.675221 4.04454 0.810835 3.62716 1.14872 3.58621L4.0792 3.23104C4.21657 3.2144 4.33558 3.12793 4.39386 3.00243L5.63721 0.325131Z" fill='#BDBDBD' />
                </svg>

            </div>
        ),
        value: 3,
    },
    {
        label: (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                Плохие
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63721 0.325131C5.78057 0.0164378 6.21943 0.0164379 6.36279 0.325131L7.60614 3.00243C7.66442 3.12793 7.78343 3.2144 7.9208 3.23104L10.8513 3.58621C11.1892 3.62716 11.3248 4.04454 11.0755 4.27627L8.91345 6.2861C8.8121 6.38032 8.76664 6.52022 8.79326 6.65601L9.36104 9.55281C9.42651 9.88682 9.07147 10.1448 8.77404 9.9793L6.19447 8.54414C6.07355 8.47687 5.92645 8.47687 5.80553 8.54414L3.22596 9.9793C2.92853 10.1448 2.57349 9.88682 2.63896 9.55281L3.20674 6.65601C3.23336 6.52022 3.1879 6.38032 3.08655 6.2861L0.924505 4.27627C0.675221 4.04454 0.810835 3.62716 1.14872 3.58621L4.0792 3.23104C4.21657 3.2144 4.33558 3.12793 4.39386 3.00243L5.63721 0.325131Z" fill='#F93C65' />
                </svg>

            </div>
        ),
        value: 4,
    },
]

const QualityFieldset = () => {
    const [isBodyVisisble, setIsBodyVisible] = useState(false)
    return (
        <fieldset
            className={styles.fieldset}
        >
            <div
                className={styles.fieldset__header}
                id='header'
                onDoubleClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                    } else if (document.selection) {
                        document.selection.empty();
                    }
                }}
                onClick={e => {
                    // console.log('t', e.target)
                    // console.log('ct', e.currentTarget)
                    // console.log('type', e.type)
                    if (e.currentTarget.id === 'header' && e.type === 'click') {
                        setIsBodyVisible(!isBodyVisisble);
                    }
                }}
            >
                <h3 className={styles.fieldset__title}>Рейтинг качества ниши</h3>
                <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`} type='button'>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7.5L7 1.5L1 7.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <div hidden={!isBodyVisisble}>
                <div className={styles.fieldset__layout}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                colorBorder: '#5329FF',
                                fontFamily: 'Mulish'
                            },
                            components: {
                                Input: {}
                            }
                        }}
                    >

                        <Form.Item
                            className={`${styles.form__item}`}
                            name='niche_rating'
                        >
                            <Checkbox.Group options={QUALITY_CONFIG} />
                        </Form.Item>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextLightSolid: 'black',
                            }
                        }}
                    >
                        <Tooltip
                            title='Показатель рассчитывается исходя из значений выручки, коэффициента спроса, монопольности, рекламы, % выкупа и других параметров.'
                            arrow={false}
                            color='white'
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}>
                                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                            </svg>
                        </Tooltip>
                    </ConfigProvider>
                </div>
            </div>
        </fieldset>
    )
}

export default QualityFieldset;