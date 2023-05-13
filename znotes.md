> latest working code, using async/await intead of then handlers

---

> GPT-3 generated code (Bard was incorrect)

---

```js
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
```

> leftover code from the weather app

---

```jsx
return (
    <div>
        <h1>Weather</h1>
        {forecast}
        <p>Temperature: {data.main.temp}</p>
        <p>Feels Like: {data.main.feels_like}</p>
        <p>Low: {data.main.temp_min}</p>
    </div>
);

return (
    <div>
        <h1>Weather</h1>
        <p>Weather: {data.weather[0].main}</p>
        <p>Description: {data.weather[0].description}</p>
        <p>Temperature: {data.main.temp}</p>
        <p>Feels Like: {data.main.feels_like}</p>
        <p>Low: {data.main.temp_min}</p>
    </div>
);

const forecast = data.weather.map((weather) => {
    return (
        <div>
            <p>Weather: {weather.main}</p>
            <p>Description: {weather.description}</p>
        </div>
    );
});

for (const weather of forecast) {
    // map over the array and create a new array of JSX elements
    console.log(weather);
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
```
