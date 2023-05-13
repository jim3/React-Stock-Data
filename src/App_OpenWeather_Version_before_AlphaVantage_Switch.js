// Import statements and function definition
import "./App.css";
import React, { useState, useEffect } from "react";

async function getWeatherData() {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const zipCode = "90210";
    const unit = "imperial";
    const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=${unit}`;
    const response = await fetch(URL, {
        method: "GET",
    });
    return response.json();
}

function Weather() {
    // Create a state variable to hold the weather data
    const [data, setData] = useState(null);

    // Fetch weather data
    useEffect(() => {
        async function fetchData() {
            const weatherData = await getWeatherData();
            setData(weatherData); // set the state of the weather data object
        }
        fetchData();
    }, []);

    if (data) {
        // Create a list of weather components to display
        const weatherComponents = [
            <h2>Current Weather in {data.name}</h2>,
            <p>Temperature: {data.main.temp} &deg;F</p>,
            <p>Feels like: {data.main.feels_like} &deg;F</p>,
            <p>Humidity: {data.main.humidity} %</p>,
            <p>Wind Speed: {data.wind.speed} mph</p>,
        ];
        // Return the weather components
        return <div>{weatherComponents}</div>;
    } else {
        return <div>Loading...</div>;
    }
}

export default function MyApp() {
    return (
        <div>
            <Weather />
        </div>
    );
}
