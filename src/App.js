import logo from "./logo.svg";
import "./App.css";
import React, { useState, useSyncExternalStore } from "react";
import { LineChart } from "@mui/x-charts";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const calculateProfit = () => {
    const prices = input.split(",").map(Number);
    const output = getMaxProfit(prices);
    setResult(output);
  };

  const getMaxProfit = (prices) => {
    console.log(prices);
    if (!prices || prices.length < 2)
      return { profit: 0, buyDay: -1, sellDay: -1 };
    let minPrice = prices[0];
    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;
    for (let i = 1; i < prices.length; i++) {
      const profit = prices[i] - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;
        sellDay = i;
        buyDay = prices.indexOf(minPrice);
      }
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      }
    }

    return {
      profit: maxProfit,
      buyDay,
      sellDay,
      prices: prices,
    };
  };

  return (
    <div className="App">
      <h2>Stock Profit Calculator</h2>
      <input
        type="text"
        placeholder="enter your stock prices"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={calculateProfit}>calculate</button>
      {result && (
        <div>
          <p>Buy on day:{result.buyDay}</p>
          <p>sell on day:{result.sellDay}</p>
          <p>maxprofit :{result.profit}</p>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
            series={[
              {
                data: result.prices,
              },
            ]}
            height={300}
          />
        </div>
      )}
    </div>
  );
}

export default App;
