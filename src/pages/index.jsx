import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { currency } from "../constants";

const Main = () => {
  const [date, setDate] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(null);
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
    const exchangeRateLoader = async () => {
      try {
        const { data } = await axios.get(
          `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`
        );
        setDate(data.date);
        console.log(data.rates[toCurrency]);
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.log(error);
      }
    };
    exchangeRateLoader();
  }, [fromCurrency, toCurrency]);

  const handleFromCurrency = (e) => {
    const fromCurrency = e.target.value;
    setFromCurrency(fromCurrency);
  };

  const handleToCurrency = (e) => {
    const toCurrency = e.target.value;
    setToCurrency(toCurrency);
  };

  const handleFromAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    setAmountInFromCurrency(true);
  };

  const handleToAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    setAmountInFromCurrency(false);
  };

  return (
    <ExChangeRateCalculator>
      <h3>환율 계산기</h3>
      <h5>{date}</h5>
      <form>
        <div className="calculator-wrapper">
          <input
            type="number"
            className="amount"
            name="amount"
            value={fromAmount}
            placeholder="입력하세요"
            onChange={handleFromAmount}
          />
          <div className="line" />
          <select
            className="select-box"
            name="national"
            onChange={handleFromCurrency}
          >
            <option value="none">=== 선택 ===</option>
            {currency.map((option) => (
              <option key={option.currency} value={option.currency}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="calculator-wrapper">
          <input
            type="number"
            className="amount"
            value={toAmount}
            onChange={handleToAmount}
          />
          <div className="line" />
          <select
            className="select-box"
            name="national"
            onChange={handleToCurrency}
          >
            <option value="none">=== 선택 ===</option>
            {currency.map((option) => (
              <option key={option.currency} value={option.currency}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </ExChangeRateCalculator>
  );
};

const ExChangeRateCalculator = styled.div`
  width: 500px;

  .calculator-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 300px;
    height: 40px;
    border: 2px solid lightgray;
    border-radius: 5px;
    vertical-align: middle;
    color: gray;
    font-size: 14px;
    font-weight: 600;

    .amount {
      width: 100px;
      margin: auto 0;
      border: none;
      outline: none;
    }

    .exchange {
      width: 100px;
      margin: auto 0;
      border: none;
      outline: none;
      text-align: center;
    }

    .line {
      width: 2px;
      height: 30px;
      margin: auto 0;
      background-color: lightgray;
    }

    .select-box {
      border: none;
      outline: none;
      color: gray;
      font: inherit;
    }
  }

  .calculator-wrapper + .calculator-wrapper {
    margin-top: 20px;
  }
`;

export default Main;
