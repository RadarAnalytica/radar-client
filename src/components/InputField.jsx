import React, { useState } from 'react'
import { PiEyeClosed, PiEye } from "react-icons/pi";


const InputField = ({ hide, options, emailErrorText, passErrorText, callback, label, subtext, required, placeholder, value, defautlValue, type, minLength, maxLength }) => {

    const [shown, setShown] = useState(false)

    const [neType, setNewType] = useState(type)

    return (
        <div className='input-field mb-2'>
            <label htmlFor="" className='mb-0 mt-1 p-0'><span style={{ color: 'red', marginRight: '' }}>{required ? '* ' : null}</span>{label}</label>
            {/* {subtext ? <p className='mt-0 mb-1' style={{}}>{subtext}</p> : null} */}
            <div className='d-flex gap-2 justify-content-between' style={{ width: '100%' }}>
                <div style={{ width: '100%' }}>
                    <input
                        className='form-control mt-1 mb-0'
                        type={neType}
                        placeholder={placeholder}
                        defaultValue={defautlValue}
                        onChange={e => callback(e)}
                        minLength={minLength}
                        maxLength={maxLength}
                        value={value}
                        style={emailErrorText || passErrorText ?
                            {
                                minHeight: '4vh',
                                backgroundColor: 'rgba(255, 0, 0, 0.05)',
                                border: '1px solid rgba(255, 0, 0, 0.2) !important',
                            }
                            :
                            { minHeight: '4vh' }
                        }
                    />
                    {
                        emailErrorText ?
                            <p className="mb-1" style={{ color: 'red', fontWeight: 600 }}>{emailErrorText}</p>
                            : passErrorText ?
                                <p className="mb-1" style={{ color: 'red', fontWeight: 600 }}>{passErrorText}</p>
                                : null
                    }
                </div>
                {
                    hide ?
                        !shown ?
                            <div className='eyes pt-1' style={{ cursor: 'pointer', position: 'relative', fontSize: '24px' }}>
                                <PiEyeClosed style={{ fontSize: '40px', height: '3.9vh' }} onClick={() => { setShown(!shown); setNewType('text') }} />
                            </div>
                            :
                            <div className='eyes pt-1' style={{ cursor: 'pointer', position: 'relative', fontSize: '24px' }}>
                                <PiEye style={{ fontSize: '40px', height: '3.9vh' }} onClick={() => { setShown(!shown); setNewType('password') }} />
                            </div>
                        : null
                }
            </div>
        </div>
    )
}

export default InputField