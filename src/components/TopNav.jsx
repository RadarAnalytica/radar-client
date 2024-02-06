import React, { useContext } from 'react'
import AuthContext from '../service/AuthContext'
import noticon from '../assets/notification.png'
import question from '../assets/question.png'
import settings from '../assets/settings.png'

const TopNav = ({ title }) => {

    const { user } = useContext(AuthContext)

    return (
        <div className='top-nav'>
            <div className="container d-flex align-items-center justify-content-between">
                <div className='d-flex col me-2'>
                    {
                        !title ?
                            <>
                                <span className='me-3'>{`${user?.firstName} ${user?.lastName}`}</span>
                                <span>{user?.email}</span>
                            </>
                            :
                            <p style={{ fontSize: 24, fontWeight: 700 }} className='m-0 p-0 fw-bold'>{title}</p>
                    }
                </div>
                <div className="col-2 d-flex justify-content-around">
                    <img src={noticon} alt="" style={{ maxWidth: '24px', cursor: 'pointer' }} />
                    <img src={question} alt="" style={{ maxWidth: '24px', cursor: 'pointer' }} />
                    <img src={settings} alt="" style={{ maxWidth: '24px', cursor: 'pointer' }} />
                </div>
            </div>
        </div>
    )
}

export default TopNav