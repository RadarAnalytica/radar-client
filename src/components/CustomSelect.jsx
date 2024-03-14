import React, { useEffect, useState } from 'react'

const CustomSelect = ({ options, callback, label, required, placeholder, defautlValue }) => {

    const [state, setState] = useState()
    useEffect(() => {
        if (options) {
            setState(options[0])
        }
    }, [options])

    const [shown, setShown] = useState(false)

    return (
        <div className='select-field mb-2'>
            <label htmlFor="">{label}</label>
            <label name="" id="" className='form-control mt-2'
                onClick={() => setShown(!shown)}
            >
                <div style={{ position: 'relative', width: '100%' }}>
                    <p className='mb-0' style={{ fontSize: '2vh', border: '1px solid rgb(232, 232, 232) !important', cursor: 'pointer' }}>{state}</p>
                    <div style={{ position: 'absolute', top: '4.1vh', zIndex: 99999, backgroundColor: 'white', width: '106%', marginLeft: '-3%', borderRadius: '4px', boxShadow: '0 3px 12px silver' }}>
                        {
                            shown ?
                                options && options.map((item, index) => (
                                    <div key={index} onClick={() => callback(item)} style={{ padding: '0 1vw' }}>
                                        <p className='mb-0 select-element' style={{ fontSize: '2vh', cursor: 'pointer', padding: '1.5vh 0', borderBottom: '1px solid silver' }}>{item}</p>
                                    </div>
                                ))
                                : null
                        }
                    </div>
                </div>

                {/* {
                    options && options.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))
                } */}
            </label>
        </div>
    )
}

export default CustomSelect