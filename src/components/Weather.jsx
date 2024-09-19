import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);



  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon, 
    "04d": drizzle_icon, 
    "04n": drizzle_icon, 
    "09d": rain_icon, 
    "09n": rain_icon, 
    "10d": rain_icon, 
    "10n": rain_icon, 
    "13d": snow_icon, 
    "13n": snow_icon,   
  }

  const search = async (city) => {
    if(city === ""){
      alert("Enter City name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }


      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
      
    }
  }
    useEffect(()=>{
      search("Lagos");
    }, [])

  return (
    <div className='weather place-self-center p-[40px] rounded-lg flex flex-col items-center bg-slate-600'>
      <div className="search-bar flex items-center gap-[12px]">
          <input ref={inputRef} type="text" placeholder='Search' className='h-[50px] border-0 outline-none rounded-xl pl-[25px] text-amber-950 bg-white text-[18px]'/>
          <img src={search_icon} alt="" className='text-white w-[50px] p-[15px] rounded-full bg-white cursor-pointer' onClick={(()=>search(inputRef.current.value))} />
        </div>  
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon w-[150px] mx-[0] my-[30px]'/>
        <p className='temperature text-white text-[80px]'>{weatherData.temperature}°C</p>
        <p className='location text-white text-[40px]'>{weatherData.location}</p>
        <div className="weather-data w-full mt-[40px] text-white flex justify-between">
          <div className="col flex items-start gap-[12px] text-[20px]">
            <img src={humidity_icon} alt="" className='w-[26px] mt-[10px]' />
            <div>
              <p>{weatherData.humidity} %</p>
              <span className='block text-md'>Humidity</span>
            </div>
          </div>
          <div className="col flex items-start gap-[12px] text-[20px]">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed}KM/H</p>
              <span className='block text-md'>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather