import React, { useState, useEffect } from "react";
import "./App.css";

function Weather() {
    const URL =
        "https://api.openweathermap.org/data/2.5/weather?zip=31721,us&appid=75b301a744e6022c353c180ed17151b4&units=imperial";

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(URL, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    if (data) {
        const forecast = Array.from(data.weather);
        // for (const weather of forecast) {}
        
        return (
            <div>
                <h1>Weather</h1>
                <p>Weather: {forecast[0].main}</p>
                <p>Description: {forecast[0].description}</p>
                <p>Temperature: {data.main.temp}</p>
                <p>Feels Like: {data.main.feels_like}</p>
                <p>Low: {data.main.temp_min}</p>
            </div>
        );
    }
}

export default function MyApp() {
    return (
        <div>
            <h1>Welcome to my app</h1>
            <Weather />
        </div>
    );
}
