import React from 'react'
import '../../pages/styles.css'

const CalculateResults = () => {

    return (
        <div className='calc-results'>
            <h5 className='fw-bold'>Результаты</h5>
            <p className="mb-2" style={{ fontSize: '1.75vh' }}>
                Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка
            </p>
            <div className="d-flex justify-content-between">
                <span>Прибыль маржинальная</span>
                <span className='fw-bold'>888 руб</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Маржинальность</span>
                <span className='fw-bold'>49%</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Чистая прибыль</span>
                <span className='fw-bold'>888 руб</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Рентабельность</span>
                <span className='fw-bold'>227 %</span>
            </div>
            <p className="mb-1">Для достижения цели нужно продать:</p>
            <div>
                <span className='me-2 fw-bold'>1133 шт</span>
                <span className='clue-text'>38 шт в день</span>
            </div>
        </div>
    )
}

export default CalculateResults