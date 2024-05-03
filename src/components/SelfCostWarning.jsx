import React from 'react'

const SelfCostWarning = () => {

    return (
        <div className='container dash-container p-3 pt-0 d-flex gap-3 '>
            <div className='p-3 selfcost-warning w-100'>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="30" rx="5" fill="#F0AD00" fill-opacity="0.1" />
                        <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F0AD00" />
                    </svg>
                    <span className="fw-bold">
                        У ваших товаров отсутствует себестоимость
                    </span>
                </div>
                <p>
                    Для правильного расчета данных нам нужно знать себестоимость ваших товаров. Данные в блоках «прибыль», «финансы», «себестоимость проданных товаров» не учитывают себестоимость товаров, для которых она неизвестна.
                </p>
                <a href="#" className="link">Заполнить себестоимость</a>
            </div>
        </div>
    )
}

export default SelfCostWarning