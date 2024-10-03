import React from "react";

const RequestMonitoringFilter = ({ setDays, days }) => {
    // const currentShop = shops?.find((item) => item.id == activeShopId);
    // const shopName = activeShopId == 0 ? 'Все' : currentShop?.brand_name;

    return (
        <div className='filter container dash-container pb-4 pt-0 d-flex'>
            <div className='row'>
                <div className='filter-item col'>
                    <label
                        style={{ fontWeight: 600, marginBottom: '4px ' }}
                        htmlFor='period'
                    >
                        Период
                    </label>
                    <select
                        style={{
                            padding: '1vh 1.75vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '8px',
                        }}
                        className='form-control'
                        id='period'
                        value={days}
                        onChange={(e) => {
                            setDays(e.target.value);
                        }}
                    >
                        {/* <option selected={defaultValue === 1 ? true : false} value={'1'}>1 день</option> */}
                        <option value={7}>Последние 7 дней</option>
                        <option value={14}>Последние 14 дней</option>
                        <option value={30}>Последние 30 дней</option>
                        <option value={90}>Последние 90 дней</option>
                    </select>
                    <svg
                        style={{
                            position: 'absolute',
                            right: '1.75vw',
                            top: '5.5vh',
                            width: '1.5vh',
                        }}
                        viewBox='0 0 28 17'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M2 2L14 14L26 2'
                            stroke='rgba(140, 140, 140, 1)'
                            strokeWidth='4'
                            strokeLinecap='round'
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default RequestMonitoringFilter;
