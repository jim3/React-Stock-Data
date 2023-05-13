import "./App.css";
import React, { useState, useEffect } from "react";

async function getStockData() {
    const apiKey = process.env.REACT_APP_STOCK_API_KEY;
    const func = "NEWS_SENTIMENT";
    const tickers = "MSFT";
    const topics = "technology";
    const baseURL = `https://www.alphavantage.co/query?`;
    const endPoint = `function=${func}&tickers=${tickers}&topics${topics}&apikey=${apiKey}`;
    // const endPoint = `function=${func}&symbol=${symbol}&apikey=${apiKey}`;
    const URL = baseURL + endPoint;
    console.log(URL);

    const response = await fetch(URL, {
        method: "GET",
    });
    return response.json();
}

function Stocks() {
    // Create a state variable to hold data
    const [data, setData] = useState(null);

    // Fetch data syntx for useEffect: useEffect(() => {callback function}, [array of state variables to watch for changes]);
    useEffect(() => {
        async function fetchData() {
            const stockData = await getStockData();
            setData(stockData);
        }
        fetchData();
    }, []);

    if (data) {
        // create a list of stock data news articles to display
        const stockNews = data.feed;
        console.log(stockNews);
        const stockNewsList = stockNews.map((article, index) => {
            return (
                <div key={index}>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <p>{article.link}</p>
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
