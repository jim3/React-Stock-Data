import "./App.css";
import React, { useState, useEffect } from "react";

function Weather() {
    const URL =
        "https://api.openweathermap.org/data/2.5/weather?zip=31721,us&appid=75b301a744e6022c353c180ed17151b4&units=imperial";

    // Create a state variable to hold the weather data
    const [data, setData] = useState(null);

    // Fetch the weather data when the component mounts and store it in state (the setData function)
    useEffect(() => {
        fetch(URL, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data); // set the state of the weather data object
            });
    }, []);

    // Create markup from `data` and assign it to `forecastList`
    if (data) {
        const forecast = Array.from(data.weather); // convert the weather data object into an array, then map over it
        const forecastList = forecast.map((weather) => {
            return (
                <div>
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
