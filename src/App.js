// Import statements and function definition
import "./App.css";
import React, { useState, useEffect } from "react";

async function getWeatherData() {
    // Get the API key from the .env file
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const URL =
        `https://api.openweathermap.org/data/2.5/weather?zip=31721,us&appid=${apiKey}&units=imperial`;
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

    if (data) {
        // Create a list of weather components to display
        const weatherComponents = [
            <h2>Weather in {data.name}</h2>,
            <p>Temperature: {data.main.temp} &deg;F</p>,
            <p>Feels like: {data.main.feels_like} &deg;F</p>,
            <p>Humidity: {data.main.humidity} %</p>,
            <p>Wind Speed: {data.wind.speed} mph</p>,
        ];

        // Return the weather components
        return <div>{weatherComponents}</div>;
    } else {
        // Return a loading message if the data is null (i.e. the data has not been fetched)
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
