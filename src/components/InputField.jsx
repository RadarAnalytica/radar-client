import React from 'react'

const InputField = ({ options, callback, label, required, placeholder, defautlValue, type, minLength, maxLength }) => {

    return (
        <div className='input-field mb-2'>
            <label htmlFor="" className='mb-1'><span style={{ color: 'silver', marginRight: '8px' }}>{required ? '*' : null}</span>{label}</label>
            <input
                className='form-control'
                type={type}
                placeholder={placeholder}
                defaultValue={defautlValue ? defautlValue : null}
                onChange={e => callback(e)}
                minLength={minLength}
                maxLength={maxLength}
            />
        </div>
    )
}

export default InputField