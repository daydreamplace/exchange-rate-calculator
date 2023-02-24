import { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../api";
import { currency } from "../constants";
// import { exchangeRateLoader } from "../hooks";

const Main = () => {
  const [currencyRates, setCurrencyRates] = useState();
  const [date, setDate] = useState("");

  useEffect(() => {
    const exchangeRateLoader = async () => {
      try {
        const { data } = await api.get("");
        console.log(data.rates);
        setDate(data.date);
        const currencyObj = data.rates;
        const currencyArr = Object.entries(currencyObj ?? {}).map(
          ([key, value]) => ({
            currency: key,
            rate: value,
          })
        );
        setCurrencyRates(currencyArr);
        console.log(currencyArr);
      } catch (error) {
        console.log(error);
      }
    };
    exchangeRateLoader();
  }, []);

  return (
    currencyRates && (
      <ExChangeRateCalculator>
        <h3>환율 계산기</h3>
        <h5>{date}</h5>
        <form>
          <div className="calculator-wrapper">
            <input
              className="amount"
              name="amount"
              placeholder="금액을 입력하세요"
            />
            <div className="line" />
            <select className="select-box" name="national">
              <option value="none">=== 선택 ===</option>
              {currencyRates.map((rates) => {
                return (
                  <option key={rates.currency} value={rates.currency}>
                    {rates.currency}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="calculator-wrapper">
            <div className="exchange"></div>
            <div className="line" />
            <select className="select-box" name="national">
              <option value="none">=== 선택 ===</option>
              {currencyRates.map((rates) => {
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
