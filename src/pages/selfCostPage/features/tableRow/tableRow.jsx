import React, { useState, useEffect } from "react"
import styles from './tableRow.module.css'
import { RowChart, BodyInput } from '../../entities/index'
import { Button, ConfigProvider, Input } from "antd"
import { DayPicker } from 'react-day-picker';
import moment from "moment"
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import DatePickerCustomDropdown from "../../../../components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown";
import { URL } from "../../../../service/config";

/**
 *  {
                "product": 10559,
                "user": 5,
                "shop": 88,
                "cost": 100.0,
                "fulfillment": null,
                "id": 462,
                "date": "2025-02-20",
                "vendor_code": "027 треугольник большой золото",
                "photo": "https://basket-15.wbbasket.ru/vol2209/part220957/220957446/images/c246x328/1.webp",
                "self_cost_change_history": []
    },
 */

const TableRow = ({ tableConfig, currentProduct, getTableData, authToken, setDataStatus, initDataStatus, shopId, compare }) => {
    const [product, setProduct] = useState(currentProduct)
    const [isOpen, setIsOpen] = useState(false) // стейт открытия аккордеона
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false) // стейт датапикера
    const [selectedDate, setSelectedDate] = useState(null) // значение датапикера
    const [month, setMonth] = useState(new Date()); // стейт месяца датапикера
    const [selfCostValue, setSelfCostValue] = useState(currentProduct.cost)
    const [fulfilmentValue, setFullfilmentValue] = useState(currentProduct.fulfillment)
    const [historyItemsToDelete, setHistoryItemsToDelete] = useState([])
    const [saveButtonStatus, setSaveButtonStatus] = useState(true)
    const customRuLocale = {
        ...ru,
        localize: {
            ...ru.localize,
            month: (n, options) => {
                const monthName = ru.localize.month(n, options);
                return monthName.charAt(0).toUpperCase() + monthName.slice(1);
            },
        },
    };

    const handleDayClick = (day) => {
        setSelectedDate(day)
        setIsDatePickerVisible(false);
    };

    const updateDefaultParams = async () => {
        setDataStatus({ ...initDataStatus, isLoading: true })
        const newProduct = {
            product: product.product,
            user: product.user,
            shop: product.shop,
            cost: selfCostValue ? parseInt(selfCostValue) : selfCostValue,
            fulfillment: fulfilmentValue ? parseInt(fulfilmentValue) : fulfilmentValue,
            //date: "2010-01-01"
        }

        try {
            const res = await fetch(`${URL}/api/product/self-costs`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
                body: JSON.stringify(newProduct)
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataStatus({ ...initDataStatus, isError: true, message: parsedData.detail || 'Что-то пошло не так :(' })
                return;
            }
            setDataStatus({ ...initDataStatus })
            getTableData(authToken, shopId)
        } catch {
            setDataStatus({ ...initDataStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const updateHistoryParams = async () => {
        setDataStatus({ ...initDataStatus, isLoading: true })

        const object = {
            items_to_update: product.self_cost_change_history.map(i => ({
                product: product.product,
                user: product.user,
                shop: product.shop,
                cost: i.cost ? parseInt(i.cost) : i.cost,
                fulfillment: i.fulfillment ? parseInt(i.fulfillment) : i.fulfillment,
                date: moment(i.date).format('YYYY-MM-DD')
            })),
            ids_to_delete: historyItemsToDelete.map(i => ({
                product: product.product,
                user: product.user,
                shop: product.shop,
                cost: i.cost ? parseInt(i.cost) : i.cost,
                fulfillment: i.fulfillment ? parseInt(i.fulfillment) : i.fulfillment,
                date: moment(i.date).format('YYYY-MM-DD')
            }))
        }

        try {
            updateDefaultParams()
            const res = await fetch(`${URL}/api/product/self-costs`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
                body: JSON.stringify(object)
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataStatus({ ...initDataStatus, isError: true, message: parsedData.detail || 'Что-то пошло не так :(' })
                return;
            }
            setHistoryItemsToDelete([])
            setDataStatus({ ...initDataStatus })
            getTableData(authToken, shopId)
        } catch {
            setDataStatus({ ...initDataStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const deleteButtonClickHandler = (item) => {
        let newProduct = product;
        const index = newProduct.self_cost_change_history.findIndex(_ => _.date === item.date);
        if (index !== -1) {
            setHistoryItemsToDelete([...historyItemsToDelete, newProduct.self_cost_change_history[index]])
            newProduct.self_cost_change_history.splice(index, 1)
            setProduct({ ...newProduct })

        }
    }

    const getSaveButtonStatus = (compare) => {
        let status = true;
        // if (product.cost?.toString() !== selfCostValue) { 
        //     console.log('hit 1')
        //     status = false
        // }
        // if (product.fulfillment?.toString() !== fulfilmentValue) {
        //     console.log('hit 1.1')
        //     status = false
        // }
        if (historyItemsToDelete.length > 0) { console.log('hit 2'); status = false }
        if (product.self_cost_change_history.length !== compare.self_cost_change_history.length) { console.log('hit 3'); status = false }
        if (product.self_cost_change_history.length === compare.self_cost_change_history.length) {
            product.self_cost_change_history.forEach((i, id) => {
                const compareObj = compare.self_cost_change_history[id]
                console.log(i.cost)
                console.log(compareObj.cost)
                if (moment(i.date).format('DD.MM.YY') !== moment(compareObj.date).format('DD.MM.YY')) {
                    status = false
                }
                if (i.cost !== compareObj.cost) {
                    status = false
                }
                if (i.fulfillment !== compareObj.fulfillment) {
                    status = false
                }
            })
        }
       
        return status
    }



    useEffect(() => {
        if (selectedDate) {
            let newProduct = product;
            const index = newProduct.self_cost_change_history.findIndex(_ => _.date === moment(selectedDate).format('YYYY-MM-DD'))
            if (index !== -1) {
                setSelectedDate(null);
                return
            }
            newProduct.self_cost_change_history.push({ date: moment(selectedDate).format('YYYY-MM-DD'), cost: 0, fulfillment: 0 })
            newProduct.self_cost_change_history.sort((a, b) => moment(a.date) > moment(b.date) ? 1 : -1)
            setSelectedDate(null)
            setProduct({ ...newProduct })
        }
    }, [selectedDate])

    useEffect(() => {
        let newProduct = {
            ...product,
            cost: selfCostValue,
            fulfillment: fulfilmentValue
        };
        setProduct({ ...newProduct })
    }, [selfCostValue, fulfilmentValue])

    useEffect(() => {
        if (product.self_cost_change_history) {
            setSaveButtonStatus(getSaveButtonStatus({...compare}))
        }
    }, [product, historyItemsToDelete, selfCostValue, fulfilmentValue])
    return (
        <>
            {/* Основная строка */}
            <div
                className={styles.row}
                style={{ borderBottom: isOpen ? 'none' : '1px solid #E8E8E8' }}
            >
                <div className={`${styles.row__item} ${styles.row__item_wide}`}>
                    <div className={styles.row__imgWrapper}>
                        <img src={product.photo} width={30} height={40} />
                    </div>
                    <p className={styles.row__title}>{product?.vendor_code}</p>
                </div>

                {/* Инпуты себестоимости и фулфилмента по умолчанию */}
                {selfCostValue !== undefined && fulfilmentValue !== undefined &&
                    <>
                        <div className={`${styles.row__item} ${styles.row__item_first}`}>
                            <Input
                                value={selfCostValue}
                                onChange={(e) => setSelfCostValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev } })}
                                size='large'
                                disabled={isOpen}
                            />
                        </div>
                        <div className={styles.row__item}>
                            <Input
                                style={{ maxWidth: '160px' }}
                                value={fulfilmentValue}
                                onChange={(e) => setFullfilmentValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev } })}
                                size='large'
                                disabled={isOpen}
                            />

                            <button
                                onClick={updateDefaultParams}
                                className={styles.row__saveButton}
                                disabled={isOpen || (product.cost?.toString() !== selfCostValue && product.fulfillment?.toString() !== fulfilmentValue)}
                            >
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 4.25C5.58579 4.25 5.25 4.58579 5.25 5C5.25 5.41421 5.58579 5.75 6 5.75H12C12.4142 5.75 12.75 5.41421 12.75 5C12.75 4.58579 12.4142 4.25 12 4.25H6Z" fill="#5329FF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.25 5C0.25 2.37665 2.37665 0.25 5 0.25H10.6659C11.9995 0.25 13.2716 0.810613 14.1715 1.79485L16.5056 4.3478C17.3061 5.22332 17.75 6.36667 17.75 7.55295V15C17.75 17.6234 15.6234 19.75 13 19.75H5C2.37665 19.75 0.25 17.6234 0.25 15V5ZM16.25 15C16.25 16.5368 15.1833 17.8245 13.75 18.163V16C13.75 14.4812 12.5188 13.25 11 13.25H7C5.48122 13.25 4.25 14.4812 4.25 16V18.163C2.81665 17.8245 1.75 16.5368 1.75 15V5C1.75 3.20507 3.20507 1.75 5 1.75H10.6659C11.5783 1.75 12.4488 2.13358 13.0645 2.807L15.3986 5.35995C15.9463 5.95899 16.25 6.74128 16.25 7.55295V15ZM5.75 16V18.25H12.25V16C12.25 15.3096 11.6904 14.75 11 14.75H7C6.30964 14.75 5.75 15.3096 5.75 16Z" fill="#5329FF" />
                                </svg>
                                Сохранить
                            </button>
                        </div>
                    </>
                }

                {/* Кнопка показать больше */}
                {product.self_cost_change_history &&
                    <button className={styles.row__moreButton} onClick={() => setIsOpen(!isOpen)}>
                        Добавить
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={isOpen ? `${styles.row__openIcon} ${styles.row__openIcon_isOpen}` : styles.row__openIcon}>
                            <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                }
            </div>

            {/* body */}
            {product.self_cost_change_history &&
                <div
                    className={isOpen ? `${styles.row__body} ${styles.row__body_visible}` : styles.row__body}
                >


                    {/* ----------------------------- date row------------------------------ */}
                    <div className={styles.row__bodyContainer}>
                        <div className={styles.row__bodyTitle}>
                            Дата
                        </div>
                        <div className={styles.row__bodyMainItem}>
                            <span className={styles.row__grayText}>По умолчанию</span>
                        </div>
                        {product.self_cost_change_history?.map((i, id) => {
                            return (
                                <div className={styles.row__bodyMainItem} key={moment(i.date).format('DD.MM.YY')}>
                                    {moment(i.date).format('DD.MM.YY')}
                                    <button className={styles.row__deleteDateButton} onClick={() => deleteButtonClickHandler(i)}>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.70067 0.641243C1.40777 0.34835 0.9329 0.34835 0.640007 0.641243C0.347114 0.934136 0.347114 1.40901 0.640007 1.7019L2.9381 4L0.640007 6.2981C0.347114 6.59099 0.347114 7.06586 0.640007 7.35876C0.9329 7.65165 1.40777 7.65165 1.70067 7.35876L3.99876 5.06066L6.29686 7.35876C6.58975 7.65165 7.06463 7.65165 7.35752 7.35876C7.65041 7.06586 7.65041 6.59099 7.35752 6.2981L5.05942 4L7.35752 1.7019C7.65041 1.40901 7.65041 0.934136 7.35752 0.641243C7.06463 0.34835 6.58975 0.34835 6.29686 0.641243L3.99876 2.93934L1.70067 0.641243Z" fill="#8C8C8C" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}

                        {/* кнопка добавить дату */}
                        <div className={styles.row__bodyMainItem}>
                            <button className={styles.row__dateAddButton} onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.75 6C10.75 5.58579 10.4142 5.25 10 5.25C9.58579 5.25 9.25 5.58579 9.25 6V9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9.25V14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V10.75H14C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25H10.75V6Z" fill="#5329FF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z" fill="#5329FF" />
                                </svg>
                                Добавить
                            </button>
                            {isDatePickerVisible &&
                                <div className={styles.row__dayPickerWrapper} onMouseLeave={() => setIsDatePickerVisible(false)}>
                                    <DayPicker
                                        maxDate={new Date()}
                                        mode="single"
                                        selected={selectedDate}
                                        month={month}
                                        onMonthChange={setMonth}
                                        captionLayout="dropdown"
                                        //className={styles.customDayPicker}
                                        locale={customRuLocale}
                                        onDayClick={handleDayClick}
                                        disabled={[
                                            { after: new Date() },
                                        ]}
                                        components={{
                                            Dropdown: DatePickerCustomDropdown
                                        }}
                                    />
                                </div>
                            }
                        </div>

                    </div>
                    {/* ---------------------------------------------------------- */}

                    {/* График */}
                    <div className={`${styles.row__bodyContainer} ${styles.row__bodyContainer_chart}`}>
                        <div className={styles.row__bodyTitle}>
                            {' '}
                        </div>
                        {product?.self_cost_change_history.length > 0 &&
                            <RowChart product={product} data={product.self_cost_change_history} />
                        }
                    </div>
                    <div className={styles.row__bodyContainer}>
                        <div className={styles.row__bodyTitle}>
                            Себестоимость
                        </div>
                        <div className={`${styles.row__bodyMainItem} ${styles.row__bodyMainItem_short}`}>
                            <Input
                                value={selfCostValue}
                                onChange={(e) => setSelfCostValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev } })}
                                size='large'
                            />
                        </div>
                        {product.self_cost_change_history?.map((i, id) => {

                            return (
                                <div className={styles.row__bodyMainItem} key={moment(i.date).format('DD.MM.YY')}>
                                    <BodyInput item={i} setProduct={setProduct} type='cost' product={product} />
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.row__bodyContainer}>
                        <div className={styles.row__bodyTitle}>
                            Фулфилмент
                        </div>
                        <div className={`${styles.row__bodyMainItem} ${styles.row__bodyMainItem_short}`}>
                            <Input
                                value={fulfilmentValue}
                                onChange={(e) => setFullfilmentValue((prev) => { if (/^(|\d+)$/.test(e.target.value)) { return e.target.value } else { return prev } })}
                                size='large'
                            />
                        </div>
                        {product.self_cost_change_history?.map((i, id) => {
                            return (
                                <div className={styles.row__bodyMainItem} key={moment(i.date).format('DD.MM.YY')}>
                                    <BodyInput item={i} setProduct={setProduct} type='fulfillment' product={product} />
                                </div>
                            )
                        })}
                    </div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF'
                            }
                        }}
                    >
                        <Button
                            type='primary'
                            size='large'
                            className={styles.row__bodySaveButton}
                            onClick={updateHistoryParams}
                        >
                            Сохранить
                        </Button>
                    </ConfigProvider>
                </div>}
        </>
    )
}

export default TableRow;