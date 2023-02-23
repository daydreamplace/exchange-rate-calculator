import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "./Api";

const App = () => {
  useEffect(() => {
    const exchangeRateLoader = async () => {
      try {
        const data = await api.get("");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    exchangeRateLoader();
  }, []);

  return (
    <ExChangeRateCalculator>
      <h3>환율 계산기</h3>
      <form>
        <div className="calculator-wrapper">
          <input className="exchange" />
          <div className="line" />
          <select className="select-box" name="national">
            <option value="none">=== 선택 ===</option>
            <option value="cad">캐나다 달러</option>
            <option value="krw" selected>
              대한민국 원
            </option>
            <option value="usd">미국 달러</option>
            <option value="eur">유럽 유로</option>
          </select>
        </div>
        <div className="calculator-wrapper">
          <div className="exchange"></div>
          <div className="line" />
          <select className="select-box" name="national">
            <option value="none">=== 선택 ===</option>
            <option value="cad">캐나다 달러</option>
            <option value="krw">대한민국 원</option>
            <option value="usd" selected>
              미국 달러
            </option>
            <option value="eur">유럽 유로</option>
          </select>
        </div>
      </form>
    </ExChangeRateCalculator>
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

export default App;
