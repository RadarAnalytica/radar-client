import React, { useContext, useEffect } from 'react'
import SignUpForm from '../containers/SignUpForm'
import AuthContext from '../service/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const SignUpPage = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (user) {
                if (user?.subscription_status !== 'expired') {
                    navigate('/onboarding')
                } else {
                    navigate('/tariffs')
                }
                
            }
        }, 200);
    }, [user])

    return (
        <div className='signup-page pt-1 pb-1'>
             <Helmet>
                <title>Регистрация аккаунта Radar Analytica — сервис аналитики маркетплейсов</title>
                <meta name="description" content="Регистрация Radar Analytica — сервис аналитики маркетплейсов. Создание личного кабинета Радар Аналитика." />
            </Helmet>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage