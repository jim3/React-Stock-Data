// Import statements and function definition
import "./App.css";
import React, { useState, useEffect } from "react";

async function getWeatherData() {
    const URL =
        "https://api.openweathermap.org/data/2.5/weather?zip=31721,us&appid=75b301a744e6022c353c180ed17151b4&units=imperial";
    const response = await fetch(URL, {
        method: "GET",
    });
    return response.json();
}

function Weather() {
    // Create a state variable to hold the weather data
    const [data, setData] = useState(null);

    // Fetch the weather data when the component mounts and store it in state (the setData function)
    useEffect(() => {
        async function fetchData() {
            const weatherData = await getWeatherData();
            setData(weatherData); // set the state of the weather data object
        }
        fetchData();
    }, []);

    // Create markup from `data` and assign it to `forecastList`
    if (data) {
        const forecast = Array.from(data.weather); // convert the weather data object into an array, then map over it
        const forecastList = forecast.map((weather, index) => {
            return (
                <div key={index}>
                    <p>Weather: {weather.main}</p>
                    <p>Description: {weather.description}</p>
                    <p>Temperature: {data.main.temp}</p>
                    <p>Feels Like: {data.main.feels_like}</p>
                    <p>Low: {data.main.temp_min}</p>
                </div>
            );
        });

        return (
            <div>
                <h1>Weather</h1>
                {forecastList}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Weather</h1>
                <p>Loading...</p>
            </div>
        );
    }
}

export default function MyApp() {
    return (
        <div>
            <Weather />
        </div>
    );
}