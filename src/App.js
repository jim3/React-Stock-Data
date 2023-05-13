import "./App.css";
import React, { useState, useEffect } from "react";

async function getStockData() {
    const apiKey = process.env.REACT_APP_STOCK_API_KEY;
    const func = "NEWS_SENTIMENT";
    const tickers = "MSFT";
    const topics = "technology";
    const baseURL = `https://www.alphavantage.co/query?`;
    const endPoint = `function=${func}&tickers=${tickers}&topics${topics}&apikey=${apiKey}`;
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
        // take the feed and map it to a list of JSX elements
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

// Export the component to use in other files
export default Stocks;
