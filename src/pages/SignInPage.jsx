import React, { useContext, useEffect } from 'react'
import SignInForm from '../containers/SignInForm'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'

const SignInPage = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (user) {
                navigate('/development/dashboard')
            }
        }, 200);
    }, [user])

    return (
        <div className='signin-page'>
            <SignInForm />
        </div>
    )
}

export default SignInPage