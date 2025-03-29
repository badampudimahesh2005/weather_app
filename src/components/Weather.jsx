import React, { useState , useEffect } from 'react'
import { useRef } from 'react';

import searchIcon from '../assets/search.png'
// import clearIcon from '../assets/clear.png'
// import rainIcon from '../assets/rain.png'
// import snowIcon from '../assets/snow.png'
// import cloudIcon from '../assets/cloud.png'
// import drizzleIcon from '../assets/drizzle.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'
import { toast } from 'react-toastify';

const Weather = () => {

    const inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState(false);
  
   

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;



    const toastStyle ={
        theme:"dark",
        position: "bottom-right",
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
    
      }

    const search = async (city) => {
        try{
            if(city === ''){
                // toast.error('Please enter a city name', toastStyle);
                alert('Please enter a city name');
                return;
            };
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);

            const data= await response.json();
            console.log(data);

           if(!response.ok){
            // throw new Error('City not found');
            alert('City not found');
            return;
           }

            setWeatherData({
                humidity: data?.main?.humidity,
                windSpeed: data?.wind?.speed,
                temperature: Math.floor(data?.main?.temp),
                location: data?.name,
                icon: data?.weather[0]?.icon,

            });
            // setCity('');
            inputRef.current.value = '';
        }catch(err){
            setWeatherData(false);
            // toast.error(err.message, toastStyle);
            alert(err.message);
        }   

    }

    useEffect(() => {
        search(inputRef.current.value);
    }
    , []);
    
  return (
    <div className='align-self-center p-10 rounded-[10px] bg-gradient-to-t from-[#2f4680] to-[#500ae4] flex items-center flex-col ' >

        {/* search bar */}
        <div className='flex items-center gap-3'> 
            <input ref={inputRef}  type="text" placeholder='Search...' className='h-[50px] outline-none rounded-[40px] text-[#626262] bg-[#ebfffc] border-none pl-6' />

            <img src={searchIcon} alt="search icon" className='w-[50px]  p-[15px] rounded-full bg-[#ebfffc] cursor-pointer'  onClick={()=>search(inputRef.current.value)}/>
        </div>

       {weatherData? <>
        {/* weather image*/}
        <img src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`} alt="weather icon" className='w-[150px] my-[30px] mx-0' />
        <p className='text-white text-[80px]'>{weatherData?.temperature}°C</p>
        <p className='text-white text-[40px]'>{weatherData?.location}</p>

        {/* weather details */}
        <div className='w-full mt-[40px] text-[#fff] flex justify-between items-center'>
            <div className='flex items-start gap-3 text-[22px]'>
                <img src={humidityIcon} alt="rain icon" className=' w-[26px] mt-[10px]' />
                <div>
                    <p className=''>{weatherData?.humidity}%</p>
                    <p className='text-[16px]'>Humidity</p>
                </div>
            </div>

            <div className='flex items-start gap-3 text-[22px]'>
                <img src={windIcon} alt="rain icon" className=' w-[26px] mt-[10px]' />
                <div>
                    <p className=''>{weatherData?.windSpeed} km/h</p>
                    <p className=' text-[16px]'>Windspeed</p>
                </div>
            </div>
        </div>

        </> : <></>}

    </div>
  ) 
}

export default Weather