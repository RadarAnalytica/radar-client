import React, { useContext, useEffect } from 'react'
import SignUpForm from '../containers/SignUpForm'
import AuthContext from '../service/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (user) {
                if (user.subscription_status) {
                    navigate('onboarding')
                } else {
                    navigate('/tariffs')
                }
                
            }
        }, 200);
    }, [user])

    return (
        <div className='signup-page pt-1 pb-1'>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage