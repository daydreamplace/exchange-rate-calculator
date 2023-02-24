import { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../api";

const Main = () => {
  const [date, setDate] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [convertAmount, setConvertAmount] = useState(0);

  useEffect(() => {
    const exchangeRateLoader = async () => {
      try {
        const { data } = await api.get("");
        setDate(data.date);
        const currencyObj = data.rates;
        const currencyArr = Object.entries(currencyObj ?? {}).map(
          ([key, value]) => ({
            currency: key,
            rate: value,
          })
        );
        setExchangeRates(currencyArr);
      } catch (error) {
        console.log(error);
      }
    };
    exchangeRateLoader();
  }, []);

  const convertCurrency = (amount, fromCurrency, toCurrency, exchangeRates) => {
    const exchangeRate = {};
    for (let i = 0; i < exchangeRates.length; i++) {
      const currency = exchangeRates[i].currency;
      const rate = exchangeRates[i].rate;
      exchangeRate[currency] = rate;
    }
    if (fromCurrency === "JPY") {
      amount /= 100;
    }
    const rate = exchangeRate[fromCurrency] / exchangeRate[toCurrency];
    const convertedAmount = amount * rate;
    if (toCurrency === "JPY") {
      convertedAmount *= 100;
    }
    setConvertAmount(convertedAmount);
  };

  const handleAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    console.log(amount);
  };

  return (
    exchangeRates && (
      <ExChangeRateCalculator>
        <h3>환율 계산기</h3>
        <h5>{date}</h5>
        <form>
          <div className="calculator-wrapper">
            <input
              className="amount"
              name="amount"
              placeholder="금액을 입력하세요"
              onChange={handleAmount}
            />
            <div className="line" />
            <select className="select-box" name="national" onChange={() => {}}>
              <option value="none">=== 선택 ===</option>
              {exchangeRates.map((rates) => {
                return (
                  <option key={rates.currency} value={rates.currency}>
                    {rates.currency}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="calculator-wrapper">
            <div className="exchange">{convertAmount}</div>
            <div className="line" />
            <select className="select-box" name="national" onChange={() => {}}>
              <option value="none">=== 선택 ===</option>
              {exchangeRates.map((rates) => {
                return (
                  <option key={rates.currency} value={rates.currency}>
                    {rates.currency}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </ExChangeRateCalculator>
    )
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
