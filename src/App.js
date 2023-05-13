// Import statements and function definition
import "./App.css";
import React, { useState, useEffect } from "react";

// https://www.alphavantage.co/documentation/#intraday Alphavantage API
// This API returns raw (as-traded) daily open/high/low/close/volume values, daily adjusted close values, 
// and historical split/dividend events of the global equity specified, covering 20+ years of historical data.
async function getStockData() {
    const apiKey = process.env.API_KEY;
    const func = "TIME_SERIES_DAILY_ADJUSTED";
    const symbol = "MSFT";
    const baseURL = `https://www.alphavantage.co/query?`;
    const endPoint = `function=${func}&symbol=${symbol}&apikey=${apiKey}`;
    const URL = baseURL + endPoint;
    console.log(URL);
    
    const response = await fetch(URL, {
        method: "GET",
    });
    return response.json();
}

function Stocks() {
    // Create a state variable to hold the stock data (Alphavantage API)
    const [data, setData] = useState(null);

    // Fetch weather data
    useEffect(() => {
        async function fetchData() {
            const stockData = await getStockData();
            setData(stockData); // set the state of the weather data object
        }
        fetchData();
    }, []);

    if (data) {
        // Create a list of weather components to display
        const stockComponents = [
            <div key="1">
                <h1>Stock Data</h1>
                <p>Stock Symbol: {data["Meta Data"]["2. Symbol"]}</p>
                <p>Stock Information: {data["Meta Data"]["1. Information"]}</p>
                <p>Stock Last Refreshed: {data["Meta Data"]["3. Last Refreshed"]}</p>
                <p>Stock Output Size: {data["Meta Data"]["4. Output Size"]}</p>
                <p>Stock Time Zone: {data["Meta Data"]["5. Time Zone"]}</p>
            </div>,

        
        ];
        // Return the weather components
        return <div>{stockComponents}</div>;
    } else {
        return <div>Loading...</div>;
    }
}

export default function MyApp() {
    return (
        <div>
            <Stocks />
        </div>
    );
}

// const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=${unit}`;
