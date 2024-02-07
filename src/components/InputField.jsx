import React from 'react'

const InputField = ({ options, callback, label, required, placeholder, defautlValue, type, minLength, maxLength }) => {

    return (
        <div className='input-field mb-2'>
            <label htmlFor="" className='mb-2'>{label} <span style={{ color: 'silver' }}>{required ? '*' : null}</span></label>
            <input
                className='form-control'
                type={type}
                placeholder={placeholder}
                defaultValue={defautlValue ? defautlValue : null}
                onChange={e => callback(e)}
                minLength={minLength}
                maxLength={minLength}
            />
        </div>
    )
}

export default InputField