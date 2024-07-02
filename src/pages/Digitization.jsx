import React from 'react'
import NavbarMainHome from '../components/NavbarMainHome'

import RadarAnalitica from './images/RadarAnalitica.svg'
import TelegramBot from './images/telegramicon.svg'
import DigitIcon from './images/digit.svg'
import Learn from './images/learn.svg'
import DigitDash from './images/digitdashboard.svg'
import Percent from './images/percent.svg'

const Digitization = () => {
  return (
    <div>
      <div className='page-main'> 
      <NavbarMainHome />
        <div className=' container widbody-container'>
          <div className='d-flex' > 
          <div>
            <img src={RadarAnalitica} alt="" />
          </div>
          <div className='telegram' >
            <div className='telegram-icon' >
              <img src={TelegramBot} alt="" />
            </div>
              <a  style={{ textDecoration: 'none', color: 'black'}} href='#'>Telegram бот </a>
          </div>
          <div>
            <img src={DigitIcon} alt="" />
          </div>     
          </div>
          <div className='d-flex'>
          <div>
            <img src={Learn} alt="" />
          </div>
            <div className='flex-row' >
              <div>
              <img src={DigitDash} alt="" />
            </div>
            <div>
              <img src={Percent} alt="" />
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Digitization