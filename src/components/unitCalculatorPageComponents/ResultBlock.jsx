import { useState, useEffect } from 'react'
import styles from './ResultBlock.module.css'
import { Input, Button, ConfigProvider, Tooltip } from 'antd';
import { utils, writeFile } from 'xlsx'
import { useLocation } from 'react-router-dom';
import { normilizeUnitsInputValue, investValueInputTransformer, createExelData } from './UnitCalcUtils';
import { formatPrice } from '../../service/utils';
import moment from 'moment';

const ResultBlock = ({result, token, investValue, setInvestValue}) => {

    const [ buttonState, setButtonState ] = useState('Поделиться результатом')
    const { pathname } = useLocation()

    const shareButtonClickHandler = () => {
        
        if (token) {
            const currentDomain = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
            navigator.clipboard.writeText(`${currentDomain}${pathname}?data=${token}`)
            .catch(err => console.log('Error'))

            setButtonState('Ссылка скопирована')
        }
    }


    useEffect(() => {
        const changeButtonStateFunc = () => {
            if (buttonState === 'Ссылка скопирована') {
                setButtonState('Поделиться результатом')
            }
        }
        const timer = setTimeout(changeButtonStateFunc, 1500)
        return () => {clearTimeout(timer)} 
    }, [buttonState])

    const generateExcel = () => {
            const data = createExelData(result)
            const ws = utils.aoa_to_sheet(data);
            const cell = ws['A1']
            cell.l = { Target: "https://radar-analytica.ru/calculate", Tooltip: "Перейти на сайт" };
            ws['!cols'] = [{ wch: 50 }, { wch: 25 },];
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Sheet1");
            const date = moment().format('DD.MM.YYYY')
            const name = result && result?.product ? result.product : '____'
            writeFile(wb, `RADAR ANALYTICA - Расчет для ${name} от ${date}.xlsx`);
      };

    return (
        <div className={styles.page__result}>
            <div className={styles.result__shareWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#00000033',
                            colorPrimary: '#E7E1FE',
                        },
                        components: {
                            Button: {
                                primaryColor: '#5329FF',
                                //paddingInline: 8,
                                paddingBlockLG: 10,
                                paddingInlineLG: 8,
                            }
                        }
                    }}
                >
                    <Button
                        type='primary'
                        //style={{ color: '#5329FF' }}
                        iconPosition='start'
                        icon={!!!result && <ShareIcon />}
                        disabled={!!result}
                        size='large'
                        onClick={() => {shareButtonClickHandler()}}
                    >{buttonState}</Button>
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#00000033',
                            colorPrimary: '#5329FF',
                        }
                    }}
                >
                    <Button
                        type='primary'
                        icon={<DownloadIcon />}
                        iconPosition='start'
                        size='large'
                        onClick={generateExcel}
                    >Скачать Excel</Button>
                </ConfigProvider>
            </div>

            <div className={styles.result__tableWrapper}>
                <p className={styles.result__title}>Расчет партии</p>
                <label
                    className={styles.result__inputWrapper}
                >
                    {'Мои вложения, ₽'}
                    <Input
                        size='large'
                        placeholder='50 000 ₽'
                        value={investValueInputTransformer(investValue)}
                        onChange={(e) => {
                            const value = e.target.value;
                            const prevValue = investValue;
                            const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                            const regex = /^(|\d+)$/ // только целые числа
                            if (regex.test(normalizedValue)) { return setInvestValue(normalizedValue)};
                            return setInvestValue(prevValue || '')
                        }}  
                    />
                </label>

                <div className={styles.result__table}>
                    <div className={styles.result__tableRow}>
                        {'Кол-во товара'} <span>{result && result.total_product_quantity ? formatPrice(result.total_product_quantity, 'шт') : "0 шт" }</span>
                    </div>
                    <div className={styles.result__tableRow}>
                        {'Выручка'} <span>{result && result.total_value ? formatPrice(result.total_value, '₽') : "0 ₽"}</span>
                    </div>
                    <div className={styles.result__tableRow}>
                        {'Чистая прибыль'} <span>{result && result.total_net_value ? formatPrice(result.total_net_value, "₽") : "0 ₽"}</span>
                    </div>
                    <div className={styles.result__tableRow}>
                        <div className={styles.label} style={{ gap: 4 }}>
                            {'Точка безубыточности'}
                            <ConfigProvider theme={{ token: { colorTextLightSolid: '#000' } }}>
                                <Tooltip
                                    color={'white'}
                                    title='Кол-во товара, которое необходимо реализовать для возврата инвестиций и “выхода в 0”'
                                    arrow={false}
                                    style={{ cursor: 'pointer', color: 'black' }}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                        <span>{result && result.zero_loss_point && result.total_net_value > 0 ? formatPrice(result.zero_loss_point, "шт") : "--"}</span>
                    </div>
                </div>
            </div>




            <div className={styles.result__tableWrapper}>
                <p className={styles.result__title}>Итоговые значения</p>

                <div className={styles.result__mainResultTable}>
                    <div className={styles.result__mainTableRow}>
                        <div className={styles.result__mainTablePrice}>{result?.selfCost ? formatPrice(result?.selfCost, "₽") : "0 ₽"}</div>
                        <div className={styles.result__mainTableText}>Общая себестоимость</div>
                        <div className={`${styles.result__mainTableText} ${styles.result__mainTableText_gray}`}>Общая сумма затрат до поставки товара</div>
                    </div>
                    <div className={styles.result__mainTableRow}>
                        <div className={styles.result__mainTablePrice}>{result?.roi ? formatPrice(result.roi, "%") : '0 %'}</div>
                        <div className={styles.result__mainTableText}>Рентабельность ROI</div>
                        <div className={`${styles.result__mainTableText} ${styles.result__mainTableText_gray}`}>Доля прибыли от вложений</div>
                    </div>
                    <div className={styles.result__mainTableRow}>
                        <div className={styles.result__mainTablePrice}>{result?.totalMargin ? formatPrice(result.totalMargin, '%') : '0 %'}</div>
                        <div className={styles.result__mainTableText}>Маржинальность</div>
                        <div className={`${styles.result__mainTableText} ${styles.result__mainTableText_gray}`}>Доля прибыли в выручке</div>
                    </div>
                </div>

                <div className={styles.result__table}>
                    <div className={styles.result__tableRow}>
                        {'Чистая прибыль'} <span>{result?.netProfit ? formatPrice(result?.netProfit, '₽') : '0 ₽'}</span>
                    </div>
                    <div className={styles.result__tableRow}>
                        {'Минимальная цена'}
                        <span>{result?.minimalPrice ? formatPrice(result?.minimalPrice, '₽') : '0 ₽'}</span>
                    </div>
                    <div className={styles.result__tableRow}>
                        {'Максимальаня скидка'} <span>{result?.maximumDiscount ? formatPrice(result?.maximumDiscount, '%') : '0 %'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultBlock

const ShareIcon = () => {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3367 3.16335C13.958 1.7847 11.7228 1.7847 10.3441 3.16335L8.80798 4.69951C8.48983 5.01766 7.97401 5.01766 7.65586 4.69951C7.33771 4.38136 7.33771 3.86554 7.65586 3.54739L9.19202 2.01123C11.207 -0.00372148 14.4738 -0.00372148 16.4888 2.01123C18.5037 4.02617 18.5037 7.29305 16.4888 9.30799L14.9526 10.8442C14.6345 11.1623 14.1187 11.1623 13.8005 10.8442C13.4824 10.526 13.4824 10.0102 13.8005 9.69203L15.3367 8.15587C16.7153 6.77722 16.7153 4.54199 15.3367 3.16335Z" fill="#5329FF" />
            <path d="M4.19949 8.15587C4.51764 8.47402 4.51764 8.98985 4.19949 9.308L2.66333 10.8442C1.28468 12.2228 1.28468 14.458 2.66333 15.8367C4.04198 17.2153 6.27721 17.2153 7.65586 15.8367L9.19202 14.3005C9.51017 13.9824 10.026 13.9824 10.3441 14.3005C10.6623 14.6187 10.6623 15.1345 10.3441 15.4526L8.80798 16.9888C6.79303 19.0038 3.52616 19.0038 1.51121 16.9888C-0.503737 14.9739 -0.503737 11.707 1.51121 9.69204L3.04737 8.15587C3.36552 7.83773 3.88134 7.83773 4.19949 8.15587Z" fill="#5329FF" />
            <path d="M6.11966 11.2282C5.80151 11.5464 5.80151 12.0622 6.11966 12.3803C6.43781 12.6985 6.95363 12.6985 7.27178 12.3803L11.8803 7.77184C12.1984 7.45369 12.1984 6.93787 11.8803 6.61972C11.5621 6.30157 11.0463 6.30157 10.7281 6.61972L6.11966 11.2282Z" fill="#5329FF" />
        </svg>
    )
}
const DownloadIcon = () => {
    return (
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.9 6.69999H14.4L9 12.1L3.6 6.69999H8.1V0.399994H9.9V6.69999ZM1.8 14.8H16.2V8.49999H18V15.7C18 15.9387 17.9052 16.1676 17.7364 16.3364C17.5676 16.5052 17.3387 16.6 17.1 16.6H0.9C0.661305 16.6 0.432387 16.5052 0.263604 16.3364C0.0948211 16.1676 0 15.9387 0 15.7V8.49999H1.8V14.8Z" fill="white" />
        </svg>

    )
}