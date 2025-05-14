'use client';
import { useState } from 'react';

export default function Home() {
  const [fvValue, setFvValue] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    total: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const valueWithoutCommas = eliminateCommas(value);
    const regex = /^[-]?[0-9]*\.?[0-9]*$/;
    if (!regex.test(valueWithoutCommas) && valueWithoutCommas !== '') {
      return;
    }

    setFvValue((prev) => ({
      ...prev,
      [name]: valueWithoutCommas,
      total: calculateTotal({ ...fvValue, [name]: valueWithoutCommas }),
    }));
  }

  function eliminateCommas(value) {
    const integerSide = value.split('.')[0];
    const decimalSide = value.split('.')[1];

    if (integerSide.length > 3) {
      const integerSideWithoutCommas = integerSide.replace(/,/g, '');
      if (typeof decimalSide === 'string') {
        return `${integerSideWithoutCommas}.${decimalSide}`;
      }
      return integerSideWithoutCommas;
    }
    if (typeof decimalSide === 'string') {
      return `${integerSide}.${decimalSide}`;
    }
    return integerSide;
  }

  function transformValue(value) {
    const integerSide = value.split('.')[0];
    const decimalSide = value.split('.')[1];
    if (integerSide.length > 3) {
      const integerSideWithCommas = integerSide.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );
      if (typeof decimalSide === 'string') {
        return `${integerSideWithCommas}.${decimalSide}`;
      }
      return integerSideWithCommas;
    }
    if (typeof decimalSide === 'string') {
      return `${integerSide}.${decimalSide}`;
    }
    return integerSide;
  }

  function calculateTotal({ first, second, third, fourth }) {
    const firstNum = parseFloat(eliminateCommas(first)) || 0;
    const secondNum = parseFloat(eliminateCommas(second)) || 0;
    const thirdNum = parseFloat(eliminateCommas(third)) || 0;
    const fourthNum = parseFloat(eliminateCommas(fourth)) || 0;

    return firstNum + secondNum + thirdNum + fourthNum;
  }

  return (
    <div className="flex flex-col">
      <input
        className="text-amber-300 border-black border"
        name="first"
        type="text"
        value={transformValue(fvValue.first)}
        onChange={handleChange}
      />
      <input
        className="text-amber-300 border-black border"
        name="second"
        type="text"
        value={fvValue.second}
        onChange={handleChange}
      />
      <input
        className="text-amber-300 border-black border"
        name="third"
        type="text"
        value={fvValue.third}
        onChange={handleChange}
      />
      <input
        className="text-amber-300 border-black border"
        name="fourth"
        type="text"
        value={fvValue.fourth}
        onChange={handleChange}
      />
      <span className="text-cyan-800 h-10">{fvValue.total}</span>
    </div>
  );
}
