import React from 'react'

const SmallPlate = ({ name }) => {

    return (
        <div className='small-plate'>
            <p className='p-0 m-0 mb-1 clue-text'>{name}</p>
            <div className='d-flex justify-content-between'>
                <p className='p-0 m-0 mb-1 fw-bold'>Price</p>
                <p className='p-0 m-0 mb-1 clue-text'>График и показатели</p>
            </div>
        </div>
    )
}

export default SmallPlate