// Import statements and function definition
import "./App.css";
import React, { useState, useEffect } from "react";

async function getStockData() {
    const apiKey = process.env.REACT_APP_STOCK_API_KEY;
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

    // Fetch stock api data
    useEffect(() => {
        async function fetchData() {
            const stockData = await getStockData();
            setData(stockData);
        }
        fetchData();
    }, []);

    if (data) {
        // Create a list of stock components to display
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
