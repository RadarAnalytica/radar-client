import React, { useState } from 'react'
import { PiEyeClosed, PiEye } from "react-icons/pi";


const InputField = ({ hide, options, emailErrorText, passErrorText, callback, label, subtext, required, placeholder, value, defautlValue, type, minLength, maxLength }) => {

    const [shown, setShown] = useState(false)

    const [neType, setNewType] = useState(type)

    return (
        <div className='input-field mb-2'>
            <label htmlFor="" className='mb-0 mt-1 p-0'><span style={{ color: 'red', marginRight: '' }}>{required ? '* ' : null}</span>{label}</label>
            {/* {subtext ? <p className='mt-0 mb-1' style={{}}>{subtext}</p> : null} */}
            <input
                className='form-control mt-2 mb-2'
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
            {
                hide ?
                    !shown ?
                        <div className='eyes' style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '4vh', fontSize: '24px' }}>
                            <PiEyeClosed style={{ backgroundColor: 'white', paddingLeft: '20px', fontSize: '40px', height: '3.9vh' }} onClick={() => { setShown(!shown); setNewType('text') }} />
                        </div>
                        :
                        <div className='eyes' style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '4vh', fontSize: '24px' }}>
                            <PiEye style={{ backgroundColor: 'white', paddingLeft: '20px', fontSize: '40px', height: '3.9vh' }} onClick={() => { setShown(!shown); setNewType('password') }} />
                        </div>
                    : null
            }
        </div>
    )
}

export default InputField