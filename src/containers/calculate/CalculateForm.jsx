import React from 'react';
import '../../pages/styles.css';

const CalculateForm = ({
    base: { sellPrice, setSellPrice, targetIncome, setTargetIncome },
    mpCom: { mpComission, setMpComission, mpLogistic, setMpLogistic, reverseLogistic, setReverseLogistic },
    selfCost: { buyinCost, setBuyinCost, logitics, setLogistics, wrapper, setWrapper },
    additional: { buyoutRate, setBuyoutRate, taxRate, setTaxRate, amortization, setAmortization },
    handleCalculate,
}) => {
    return (
        <div className='calc-form'>
            <p className="fw-bold mb-1" style={{ fontSize: '2.25vh' }}>Базовые продажи</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Цена продажи, руб</label>
                    <input type="number" className='form-control' onChange={e => setSellPrice(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Ваша цель по прибыли, руб</label>
                    <input type="number" className='form-control' onChange={e => setTargetIncome(Number(e.target.value))} />
                </div>
            </div>
            <p className="fw-bold mb-1 mt-2" style={{ fontSize: '2.25vh' }}>Комиссии маркетплейса</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Комиссия маркетплейса, %</label>
                    <input type="number" className='form-control' onChange={e => setMpComission(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Логистика МП клиенту, руб</label>
                    <input type="number" className='form-control' onChange={e => setMpLogistic(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Обратная логистика, руб</label>
                    <input type="number" className='form-control' onChange={e => setReverseLogistic(Number(e.target.value))} />
                </div>
            </div>
            <p className="fw-bold mb-1 mt-2" style={{ fontSize: '2.25vh' }}>Себестоимость товара</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Цена закупки, руб</label>
                    <input type="number" className='form-control' onChange={e => setBuyinCost(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Логистика, руб</label>
                    <input type="number" className='form-control' onChange={e => setLogistics(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Упаковка и др., руб</label>
                    <input type="number" className='form-control' onChange={e => setWrapper(Number(e.target.value))} />
                </div>
            </div>
            <p className="fw-bold mb-1 mt-2" style={{ fontSize: '2.25vh' }}>Дополнительно</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Процент выкупа, %</label>
                    <input type="number" className='form-control' onChange={e => setBuyoutRate(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Налоговая ставка, %</label>
                    <input type="number" className='form-control' onChange={e => setTaxRate(Number(e.target.value))} />
                </div>
                <div className='col'>
                    <label className='mb-2' style={{ fontSize: '1.75vh' }} htmlFor="">Амортизация, %</label>
                    <input type="number" className='form-control' onChange={e => setAmortization(Number(e.target.value))} />
                </div>
            </div>
            <div className='d-flex mt-2' style={{ width: '100%' }}>
                <button className='prime-btn' style={{ height: '7vh' }} onClick={handleCalculate}>
                    Рассчитать
                </button>
            </div>
        </div>
    );
};

export default CalculateForm;
