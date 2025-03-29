import React from 'react'

import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {
  return (
    <div className='align-self-center p-10 rounded-[10px] bg-gradient-to-b from-[#2f4680] to-[#500ae4] flex items-center flex-col ' >

        {/* search bar */}
        <div className='flex items-center gap-3'> 
            <input type="text" placeholder='Search...' className='h-[50px] outline-none rounded-[40px] color-[#626262] bg-[#ebfffc] border-none pl-6' />

            <img src={searchIcon} alt="search icon" className='w-[50px]  p-[15px] rounded-full bg-[#ebfffc] cursor-pointer' />
        </div>

        {/* weather image*/}
        <img src={clearIcon} alt="weather icon" />
        <p>16c</p>
        <p>jalandhar</p>


    </div>
  ) 
}

export default Weather