import React, { useState } from 'react'
import { PiEyeClosed, PiEye } from "react-icons/pi";


const InputField = ({ hide, options, callback, label, subtext, required, placeholder, value, defautlValue, type, minLength, maxLength }) => {

    const [shown, setShown] = useState(false)

    const [neType, setNewType] = useState(type)

    return (
        <div className='input-field mb-2'>
            <label htmlFor="" className='mb-1 p-0'><span style={{ color: 'silver', marginRight: '8px' }}>{required ? '*' : null}</span>{label}</label>
            {subtext ? <p className='mb-1' style={{ paddingLeft: '0.5vw' }}>{subtext}</p> : null}
            <input
                className='form-control'
                type={neType}
                placeholder={placeholder}
                defaultValue={defautlValue}
                onChange={e => callback(e)}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                style={{ minHeight: '4vh' }}
            />
            {
                hide ?
                    !shown ?
                        <div className='eyes' style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '3vh', fontSize: '24px' }}>
                            <PiEyeClosed onClick={() => { setShown(!shown); setNewType('text') }} />
                        </div>
                        :
                        <div className='eyes' style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '3vh', fontSize: '24px' }}>
                            <PiEye onClick={() => { setShown(!shown); setNewType('password') }} />
                        </div>
                    : null
            }
        </div>
    )
}

export default InputField