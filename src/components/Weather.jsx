import React, { useState , useEffect } from 'react'
import { useRef } from 'react';

import searchIcon from '../assets/search.png'
import windIconDark from '../assets/windDark.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'
import humidityIconDark from '../assets/humidityBlack.png'
import { toast } from 'react-toastify';

const Weather = () => {

    const inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState('light');
   const [searchHistory, setSearchHistory] = useState(
       JSON.parse(localStorage.getItem("searchHistory")) || []
     );
     const [lastSearchedCity, setLastSearchedCity] = useState("");


    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;



    const toastStyle ={
        theme:"light",
        position: "bottom-right",
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 2000,
    
      }

    const handleSearch = async (cityName = inputRef.current.value.trim()) => {
       
          

            //check if the input is empty or not , if empty show error and return
           if(!cityName){
            toast.error('Please enter a city name', toastStyle);
            return;
           }

           setLastSearchedCity(cityName);
           //addind loading state 
           setLoading(true);
           try{


            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);

            const data= await response.json();
            console.log(data);

            //if the city is wrong or not found ,this throws an error
           if(!response.ok){
            throw new Error('Error in fetching the data');
           }

           //storing the needed report data in the state
            setWeatherData({
                humidity: data?.main?.humidity,
                windSpeed: data?.wind?.speed,
                temperature: Math.floor(data?.main?.temp),
                location: data?.name,
                icon: data?.weather[0]?.icon,
                description: data?.weather[0]?.description,

            });
            inputRef.current.value = '';

        const updatedHistory = [cityName, ...searchHistory].slice(0, 5);
             setSearchHistory(updatedHistory);
             localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
           } catch (err) {
             setWeatherData(null);
             toast.error(err.message, toastStyle);
           } finally {
             setLoading(false);
           }
         };

   
         return (
            <div className={`align-self-center p-10 bg-gradient-to-t ${
              theme === "light" ? "from-white to-gray-500" : "from-black to-black"
            } flex items-center flex-col w-full `}>
        
                {/* Toggle Theme Button */}
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="absolute top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
        
                {/* Search Bar */}
                <div className="flex items-center gap-2 sm:gap-4 mt-10 sm:mt-0">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        className={`h-[40px] sm:h-[50px] outline-none rounded-[20px] ${
                          theme === "light" ? " bg-[#ebfffc]" : "bg-white/75"
                        } border-none pl-4 sm:pl-6 text-black`}
                    />
        
                    <img 
                        src={searchIcon} 
                        alt="search icon" 
                        className={`w-[40px] sm:w-[50px] p-[15px] rounded-full ${
                          theme === "light" ? " bg-[#ebfffc]" : "bg-white/75"
                        } cursor-pointer`}
                        onClick={() => {
                            handleSearch(inputRef.current.value.trim())
                            
                        } 
                    }
                    />
                </div>
        
                {/* Search History */}
                <div className="mt-4 flex gap-1 sm:gap-4 flex-wrap justify-center">
                    {searchHistory.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                inputRef.current.value = city;
                                handleSearch();
                            }}
                            className={`${
                              theme === "dark" ? "bg-white/25 text-white" : "bg-gray-200 text-black"
                            } px-3 py-1 rounded-md cursor-pointer `}
                        >
                            {city}
                        </button>
                    ))}
                </div>
    
    {/* Loading Spinner */}
                {loading && (
                    <div className="flex items-center justify-center mt-10">
                        <div className={`animate-spin rounded-full h-8 w-8
                            border-t-2 border-b-2 ${theme === "light" ? "border-gray-900" : "border-white"}`}></div>
                    </div>
                )}
                {/* Weather Data */}
                {weatherData && !loading && (
                    <>
                        <img src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`} alt="weather icon" className="w-[150px] my-[30px] mx-0" />
                        <p className={`text-[20px] mt-[-5px] ${theme === "light" ? "text-black" : "text-white"}`}>
                            {weatherData?.description}
                        </p>
                        <p className={`text-[80px] ${theme === "light" ? "text-black" : "text-white"}`}>
                            {weatherData?.temperature}°C
                        </p>
                        <p className={`text-[40px] ${theme === "light" ? "text-black" : "text-white"}`}>
                            {weatherData?.location}
                        </p>
        
                        {/* Weather Details */}
                        <div className="w-full mt-[40px] flex justify-between items-center">
                            <div className="flex items-start gap-3 text-[22px]">
                                <img src={theme =="light"?humidityIconDark:humidityIcon} alt="humidity icon" className="w-[26px] mt-[10px] k " />
                                <div>
                                    <p className={`${theme === "light" ? "text-black" : "text-white"}`}>{weatherData?.humidity}%</p>
                                    <p className={`text-[16px] ${theme === "light" ? "text-black" : "text-gray-300"}`}>Humidity</p>
                                </div>
                            </div>
        
                            <div className="flex items-start gap-3 text-[22px]">
                                <img src={theme =="light"?windIconDark:windIcon} alt="wind icon" className="w-[26px] mt-[10px]" />
                                <div>
                                    <p className={`${theme === "light" ? "text-black" : "text-white"}`}>{weatherData?.windSpeed} km/h</p>
                                    <p className={`text-[16px] ${theme === "light" ? "text-black" : "text-gray-300"}`}>Windspeed</p>
                                </div>
                            </div>
                        </div>
                         <button
                             onClick={() => handleSearch(lastSearchedCity)}
                             className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md transition duration-200"
                         >
                             Refetch Weather
                         </button>


                    </>
                )}
            </div>
        );
    }
    
    export default Weather; 
