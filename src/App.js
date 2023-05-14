import "./App.css";
import React, { useState, useEffect } from "react";

async function getStockData(ticker) {
    const apiKey = process.env.REACT_APP_STOCK_API_KEY;
    const func = "NEWS_SENTIMENT";
    const topics = "technology";
    const baseURL = `https://www.alphavantage.co/query?`;
    const endPoint = `function=${func}&tickers=${ticker}&topics${topics}&apikey=${apiKey}`;e3xseA
    const URL = baseURL + endPoint;
    console.log(URL);

    const response = await fetch(URL, {
        method: "GET",
    });
    return response.json();
}

function Stocks() {
    const [data, setData] = useState(null); // state variable to hold data
    const tickers = ["MSFT", "AAPL", "GOOGL", "IBM"]; // array of tickers

    useEffect(() => {
        async function fetchData() {
            const randomTicker = tickers[Math.floor(Math.random() * tickers.length)];
            const stockData = await getStockData(randomTicker);
            setData(stockData);
        }
        fetchData();
    }, []);

    if (data) {
        const stockNews = data.feed;
        const stockNewsList = stockNews.map((article, index) => {
            return (
                <div key={index}>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <p>{article.url}</p>
                </div>
            );
        });
        return (
            <div>
                <h1>Alpha Vantage Stock API News List</h1>
                {stockNewsList}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Stocks</h1>
                <p>Loading...</p>
            </div>
        );
    }
}

export default Stocks;
