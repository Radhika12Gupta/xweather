import axios from 'axios'
import React, { useState } from 'react'
import styles from "./Weather.module.css"

const Weather = () => {
    const [city,setCity]=useState('')
    const [data,setData]=useState([])
    const [loader,setLoader]=useState(false)

    const handleSearch=async()=>{
        setLoader(true)
        setData([])
    try{

        const res=await axios.get('https://api.weatherapi.com/v1/current.json',{
            params:{
                Key: "d7e487e6e42a4aac90161203232112",
                q: city
            }

        })
        const data=await res.data
        setLoader(false)
        setData(
            {"temperature":data.current.temp_c,
              "Humidity":data.current.humidity,
              "Condition": data.current.condition.text,
              "WindSpeed": data.current.wind_kph
        })
    }
    catch(err){
        alert("Failed to fetch weather data")
    }

    }

  return (
    <div className={styles.container}>
      <input type="text" placeholder='Enter city name' onChange={(e)=>setCity(e.target.value)}/>
      <button onClick={(e)=>handleSearch(e)} className={styles.button}>Search</button>
      <div className={styles.gridcontainer}>
      {loader ?<p>Loading data…</p>:null}
      {data.temperature ?
      <>
      <div className={styles.weather_card}>
           <h4>Temperature:</h4>
           <p>{data.temperature}°C</p>
        </div>

        <div className={styles.weather_card}>
           <h4>Humidity:</h4>
           <p>{data.Humidity}%</p>
        </div>

        <div className={styles.weather_card}>
           <h4>Condition:</h4>
           <p>{data.Condition}</p>
        </div>

        <div className={styles.weather_card}>
           <h4>Wind Speed:</h4>
           <p>{data.WindSpeed}kph</p>
        </div>
      </>
        
           

        :null}
        </div>
    </div>
  )
}

export default Weather
