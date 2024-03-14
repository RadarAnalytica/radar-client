import React, { useContext, useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import SideNav from '../components/SideNav'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { ServiceFunctions } from '../service/serviceFunctions'
import AuthContext from '../service/AuthContext'

import Modal from 'react-bootstrap/Modal';

const Onboarding = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (!user) {
    //             navigate('/development/signin')
    //         }
    //     }, 800);
    // }, [user])

    const [brandName, setBrandName] = useState()
    const [token, setToken] = useState()

    const getBrand = (e) => setBrandName(e.target.value)
    const getToken = (e) => setToken(e.target.value)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitHandler = (e) => {
        if (!token && !user) {
            e.preventDefault()
        } else {
            ServiceFunctions.updateToken(brandName, token, user.id).then(data => {
                if (data) {
                    localStorage.setItem('authToken', data.token)
                }
            })
            handleShow()
        }
    }

    return (
        user && <div className='onboarding-page'>
            <SideNav />
            <div className="boarding-content w-100">
                <TopNav title={'Подключение API'} />

                <div className="container dash-container d-flex" style={{ gap: '20px' }}>
                    <div className="onboard-form-block col">
                        <p style={{ fontWeight: 700, fontSize: 24, width: '90%' }}>
                            Укажите токен нового образца, чтобы продолжить пользоваться всеми возможностями нашего сервиса
                        </p>
                        <InputField
                            type={'text'}
                            label={'Название'}
                            callback={getBrand}
                            placeholder={'Ваш бренд или юр. лицо'}
                        />
                        <InputField
                            type={'text'}
                            label={'Токен'}
                            callback={getToken}
                            placeholder={'Пример: GJys67G7sbNw178F'}
                        />
                        <button className='prime-btn' style={{ height: '7vh' }} onClick={submitHandler}>Получить 3 дня бесплатно</button>
                        <div className='text-center'>
                            <p className='clue-text'>Тяжело разобраться? <Link className='link' to={'/instruction'}>Полная инструкция</Link></p>
                        </div>
                        <div className='text-center'>
                            <p className="clue-text">
                                Нажимая кнопку “Зарегистрироваться”, вы соглашаетесь с Пользовательским соглашением и Политикой
                                конфиденциальности
                            </p>
                        </div>
                    </div>
                    <div className="onboard-description col">
                        <p style={{ fontWeight: 700, fontSize: 24, width: '90%' }}>
                            Что такое токен и как его получить?
                        </p>
                        <p>
                            Токен (или АРІ-ключ) - секретный ключ, который Wildberries выдает поставщикам и используемый для получения данных без доступа к личному кабинету.
                        </p>
                        <ol>
                            <li>Зайдите в ваш Личный Кабинет на портале Поставщиков Wildberries</li>
                            <li>Перейдите в раздел «Доступ к АРІ», нажмите на кнопку «Создать новый токен»</li>
                            <li>Далее необходимо выбрать доступ, скругленные кнопки ниже (Контент, Маркетплейс, Статистика, Аналитика, Продвижение, Рекомендации, Вопросы и отзывы, Цены и скидки). Важно: галочка «Только на чтение» должна быть снята.</li>
                            <li>Нажмите на кнопку «Скопировать» и вставьте токен в текстовое поле «Токен Wildberries» и нажмите кнопку «Подключить». Готово!</li>
                        </ol>
                        <div className="mt-1">
                            <a href='#' style={{ textDecoration: 'none', color: 'rgba(83, 41, 255, 1)' }}>Полная инструкция как найти токен на Wildberries</a>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Токен успешно добавлен</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p className='fs-6 fw-bold'>
                            Ваш токен успешно подключен к сервису. Вся необходимая информация для анализа будет собрана в ближайшее время и отображена в разделе "Сводка продаж".
                            <br /> <br />
                            Обычно это занимает от 15 минут до 1 часа.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between w-100">
                        <button className='secondary-btn' style={{ padding: '16px 20px' }}
                            onClick={handleClose}>
                            Закрыть
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Onboarding