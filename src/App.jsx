import React from "react";
import Main from "./pages";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("KRW");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    async function fetchExchangeRate() {
      const response = await axios.get(
        `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`
      );
      const rate = response.data.rates[toCurrency];
      setExchangeRate(rate);
    }
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <div>
        <h1>환율 계산기</h1>
        <input
          type="number"
          value={fromAmount}
          onChange={handleFromAmountChange}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="KRW">1</option>
        </select>
        <h2>=</h2>
        <input type="number" value={toAmount} onChange={handleToAmountChange} />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="KRW">1</option>
        </select>
      </div>
      <Main />
    </>
  );
};

export default App;
