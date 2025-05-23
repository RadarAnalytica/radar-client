import React from "react";

const RequestMonitoringFilter = ({ loading, setDays, days }) => {
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
                    <div style={{
                        position: 'relative',
                        width: '240px',
                    }}>
                        <select
                            style={{
                                padding: '1vh 1.75vh',
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                borderRadius: '8px',
                                width: '100%'
                            }}
                            className='form-control'
                            id='period'
                            value={days}
                            disabled={loading}
                            // defaultValue={30}
                            onChange={(e) => {
                                setDays(e.target.value);
                            }}
                        >
                            {/* <option selected={defaultValue === 1 ? true : false} value={'1'}>1 день</option> */}
                            <option value={7}>Последние 7 дней</option>
                            <option value={14}>Последние 14 дней</option>
                            <option value={30}>Последние 30 дней</option>
                        </select>
                        <div style={{
                            position: 'absolute',
                            right: '10px',
                            top: 0,
                            bottom: 0,
                            width: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <svg
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
            </div>
        </div>
    );
};

export default RequestMonitoringFilter;
