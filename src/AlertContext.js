import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [questionCount, setQuestionCount] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [noodleCount, setNoodleCount] = useState(0);
  const [bookStoreCount, setBookStoreCount] = useState(0);
  // const [userCount, setUserCount] = useState(0);

  //페이지로딩시 한번만 데이터 불러옴
  useEffect(() => {
    axios.get('http://localhost:9070/goods')
      .then(res => setGoodsCount(res.data.length));
    axios.get('http://localhost:9070/fruits')
      .then(res => setFruitsCount(res.data.length));
    axios.get('http://localhost:9070/bookstore')
      .then(res => setBookStoreCount(res.data.length));
    axios.get('http://localhost:9070/noodle')
      .then(res => setNoodleCount(res.data.length));
    axios.get('http://localhost:9070/question')
      .then(res => setQuestionCount(res.data.length));
  });
  return (
    <AlertContext.Provider value={{
      questionCount, setQuestionCount,
      goodsCount, setGoodsCount,
      fruitsCount, setFruitsCount,
      noodleCount, setNoodleCount,
      bookStoreCount, setBookStoreCount,
      // userCount, setUserCount
    }}>
      {children}
    </AlertContext.Provider>
  );
}
