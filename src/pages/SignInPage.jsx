import React, { useContext, useEffect } from 'react'
import SignInForm from '../containers/SignInForm'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'

const SignInPage = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (user && user.is_onboarded === true) {
                navigate('/linked-shops')
            } else if (user && user.is_onboarded === false) {
                navigate('/onboarding')
            }
        }, 300);
    }, [navigate, user, user?.is_onboarded])

    return (
        <div className='signin-page'>
            <SignInForm />
        </div>
    )
}

export default SignInPage