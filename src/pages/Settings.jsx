import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import AuthContext from '../service/AuthContext'
import { ServiceFunctions } from '../service/serviceFunctions'
import { URL } from '../service/config'
import './styles.css'

const Settings = () => {

    const { user } = useContext(AuthContext)

    const [brandNames, setBrandNames] = useState()
    const [activeBrand, setActiveBrand] = useState()
    useEffect(() => {
        if (user) {
            ServiceFunctions.getBrandNames(user.id).then(data => {
                let names = [...new Set(data)]
                setBrandNames(names)
            })
        }
    }, [user])

    useEffect(() => {
        if (brandNames && brandNames.length) {
            setActiveBrand(brandNames[0])
        }
    }, [brandNames])



    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert('Пожалуйста, выберите файл');
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await fetch(`${URL}/api/data-collection/set-costs/${user.id}?brandName=${activeBrand}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Файл успешно загружен');
            } else {
                throw new Error('Произошла ошибка при загрузке файла');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при загрузке файла');
        }
    };

    const [tax, setTax] = useState({ type: null, value: null })
    useEffect(() => {
        setTax({ ...tax, type: null })
    }, [])

    const handleTaxSubmit = (e, obj) => {
        if (obj.value === null) {
            e.preventDefautl()
            alert('Укажите значение налоговой ставки')
        } else {
            ServiceFunctions.updateTax(user.id, activeBrand, tax)
        }
    }

    return (
        <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Настройки аккаунта'} />

                <div className="container dash-container">
                    <div className="mt-3 wide-plate">
                        <h5 className='mb-1 fw-bold' style={{ fontSize: '2.5vh' }}>Внести себестоимость товаров</h5>
                        <div className="filter-item w-50 col me-2 mb-3">
                            <label style={{ fontSize: '2vh', margin: '1vh 0' }} htmlFor="store">Магазин:</label>
                            <select style={{ fontSize: '2vh' }} className='form-control w-75' id="store" defaultValue={brandNames ? brandNames[0] : null}
                                onChange={e => setActiveBrand(e.target.value)}
                            >
                                {
                                    brandNames && brandNames.map((brand, i) => (
                                        <option key={i} value={brand}>{brand}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center w-50'>
                                <input type="file" id="excelFile" name="excelFile" className='form-control ' onChange={handleFileChange}
                                    style={{ height: '5vh', fontSize: '2.25vh', }}
                                />
                                <button className='prime-btn' style={{ padding: '1.25vh 2vh', maxWidth: '12vw', marginLeft: '1rem' }}
                                    onClick={handleSubmit}
                                >
                                    Отправить
                                </button>
                            </div>
                            <div>
                                <button className='secondary-btn' style={{ padding: '1.25vh 2vh' }}
                                    onClick={() => {
                                        if (user && activeBrand) {
                                            fetch(`${URL}/api/data-collection/costs/${user.id}?brandName=${activeBrand}`).then(
                                                response => {
                                                    return response.blob()
                                                }
                                            ).then(blob => {
                                                const url = window.URL.createObjectURL(new Blob([blob]));
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.setAttribute('download', `Себестоимость.xlsx`); // Устанавливаем имя файла для скачивания
                                                document.body.appendChild(link);
                                                link.click();
                                                link.parentNode.removeChild(link);
                                            })
                                        }
                                    }}
                                >
                                    Скачать шаблон
                                </button>
                            </div>
                        </div>

                        <br />

                        <h5 className='mb-1 fw-bold' style={{ fontSize: '2.5vh' }}>Настройка системы налогообложения</h5>
                        {/* <div className="filter-item col me-2 mb-3 w-50">
                            <label style={{ fontSize: '2vh', margin: '1vh 0' }} htmlFor="store">Магазин:</label>
                            <select style={{ fontSize: '2vh' }} className='form-control w-75' id="store" defaultValue={brandNames ? brandNames[0] : null}
                                onChange={e => setActiveBrand(e.target.value)}
                            >
                                {
                                    brandNames && brandNames.map((brand, i) => (
                                        <option key={i} value={brand}>{brand}</option>
                                    ))
                                }
                            </select>
                        </div> */}
                        {/* <div className='d-flex justify-content-between align-items-center w-50'>
                            <div className=''>
                                <label htmlFor="" className='mt-0 mb-0 fw-bold'>Вариант расчёта</label>
                                <select className='form-control mt-2 w-75' name="" id="" style={{ fontSize: '2vh' }}
                                    onChange={e => setTax({ ...tax, type: e.target.value })}
                                >
                                    <option value="От выручки" selected="">От выручки (от общей суммы продажи за вычетом возвратов)</option>
                                    <option value="От валовой прибыли">От валовой прибыли (выручка за вычетом возвратов и себестоимости продаж)</option>
                                    <option value="От прибыли">От прибыли (выручка за вычетом возвратов и комиссий, не включая себестоимость)</option>
                                </select>
                            </div>
                        </div> */}
                        <div className='w-75'>
                            <div>
                                <label htmlFor="" className='mt-2 mb-0 fw-bold'>Процентная ставка по налогу</label>
                                <input type="number" className="form-control mt-2 w-50" onChange={e => setTax({ ...tax, value: Number(e.target.value) })} />
                            </div>
                        </div>
                        <button className='prime-btn' style={{ padding: '1.25vh 2vh', maxWidth: '12vw' }}
                            onClick={e => handleTaxSubmit(e, tax)}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings