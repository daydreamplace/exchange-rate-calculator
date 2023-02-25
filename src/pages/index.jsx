import { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../api";
import { currency } from "../constants";

const Main = () => {
  const [date, setDate] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [convertAmount, setConvertAmount] = useState(null);

  let toAmount, fromAmount;
  if (fromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const exchangeRateLoader = async () => {
      try {
        const { data } = await api.get(``);
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

  const handleFromCurrency = (e) => {
    const fromCurrency = e.target.value;
    setFromCurrency(fromCurrency);
  };

  const handleToCurrency = (e) => {
    const toCurrency = e.target.value;
    setToCurrency(toCurrency);
  };

  useEffect(() => {
    const convertCurrency = (
      amount,
      fromCurrency,
      toCurrency,
      exchangeRates
    ) => {
      if (fromCurrency == null || toCurrency == null) {
        setConvertAmount(null);
        return;
      }
      const exchangeRate = {};
      for (let i = 0; i < exchangeRates.length; i++) {
        const currency = exchangeRates[i].currency;
        const rate = exchangeRates[i].rate;
        exchangeRate[currency] = rate;
      }
      let convertedAmount;
      // if (fromCurrency === "JPY") {
      //   amount /= 100;
      // }
      // if (fromCurrency === toCurrency) {
      //   convertedAmount = amount;
      // } else {
      //   const fromRate = exchangeRate[fromCurrency];
      //   const toRate = exchangeRate[toCurrency];
      //   const exchangeRateInJPY = exchangeRate["JPY"];
      //   const amountInJPY = fromCurrency === "JPY" ? amount : amount / fromRate;
      //   const toAmountInJPY = amountInJPY * (exchangeRateInJPY / toRate);
      //   convertedAmount =
      //     toCurrency === "JPY" ? toAmountInJPY * 100 : toAmountInJPY;
      // }
      setConvertAmount(convertedAmount);
    };
    convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleAmount = (e) => {
    const amount = e.target.value;
    setAmount(parseFloat(amount));
  };

  return (
    exchangeRates && (
      <ExChangeRateCalculator>
        <h3>환율 계산기</h3>
        <h5>{date}</h5>
        <form>
          <div className="calculator-wrapper">
            <input
              type="number"
              className="amount"
              name="amount"
              placeholder="입력하세요"
              onChange={handleAmount}
            />
            <div className="line" />
            <select
              className="select-box"
              name="national"
              onChange={handleFromCurrency}
            >
              <option value="none">=== 선택 ===</option>
              {/* {exchangeRates.map((rates) => {
                return (
                  <option key={rates.currency} value={rates.currency}>
                    {rates.currency}
                  </option>
                );
              })} */}
              {currency.map(() => {})}
            </select>
          </div>
          <div className="calculator-wrapper">
            <div className="exchange">
              {convertAmount != null ? `${convertAmount.toFixed(2)}` : ""}
            </div>
            <div className="line" />
            <select
              className="select-box"
              name="national"
              onChange={handleToCurrency}
            >
              <option value="none">=== 선택 ===</option>
              {/* {exchangeRates.map((rates) => {
                return (
                  <option key={rates.currency} value={rates.currency}>
                    {rates.currency}
                  </option>
                );
              })} */}
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
