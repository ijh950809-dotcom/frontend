import React from 'react';
import './App.css';
import { AlertProvider, AlertContext } from './AlertContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Goods from './component/Goods';
import GoodsCreate from './component/GoodsCreate';
import GoodsUpdate from './component/GoodsUpdate';
import Main from './component/Main';
import BookStore from './component/BookStore';
import BookStoreCreate from './component/BookStoreCreate';
import BookStoreUpdate from './component/BookStoreUpdate';
import Noodle from './component/Noodle';
import NoodleCreate from './component/NoodleCreate';
import NoodleUpdate from './component/NoodleUpdate';
import Fruits from './component/Fruits';
import FruitsCreate from './component/FruitsCreate';
import FruitsUpdate from './component/FruitsUpdate';
import Customer from './component/Customer';
// import ContactUs from './component/ContactUs';
import Question from './component/Question';
import Login from './component/Login';
import Join from './component/Join';

function AppContent() {
  const { questionCount, bookStoreCount, fruitsCount, goodsCount, noodleCount
  } = React.useContext(AlertContext);

  const badgeStyle = {
    display: 'inline-block',
    marginLeft: 6,
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    width: 22,
    height: 22,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: '22px',
    fontWeight: 'bold'
  }
  // const menuClick = () => window.location.reload();
  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Frontend(React)+Backend(mysql) setting, DB 데이터 입력/출력/삭제/수정</h1>
          <nav>
            <ul>
              <li><Link to='/'>HOME</Link></li>
              <li><Link to='/goods'>Goods{goodsCount > 0 && (<span style={badgeStyle}>{goodsCount}</span>)}</Link></li>
              <li><Link to='/fruits'>Fruits{fruitsCount > 0 && (<span style={badgeStyle}>{fruitsCount}</span>)}</Link></li>
              <li><Link to='/noodle'>Noodle{noodleCount > 0 && (<span style={badgeStyle}>{noodleCount}</span>)}</Link></li>
              <li><Link to='/bookstore'>BookStore{bookStoreCount > 0 && (<span style={badgeStyle}>{bookStoreCount}</span>)}</Link></li>
              <li><Link to='/customer'>Customer</Link></li>
              <li><Link to='/question'>Contact US{questionCount > 0 && (<span style={badgeStyle}>{questionCount}</span>)}</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
        </header>


        <footer>Copyright&copy;2025 Backend&Frontend allrights reserved.</footer>

        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/goods' element={<Goods />} />
          <Route path='/goods/goodscreate' element={<GoodsCreate />} />
          <Route path='/goods/goodsupdate/:g_code' element={<GoodsUpdate />} />
          <Route path='/fruits' element={<Fruits />} />
          <Route path='fruits/fruitscreate' element={<FruitsCreate />} />
          <Route path='fruits/fruitsupdate/:num' element={<FruitsUpdate />} />
          <Route path='/noodle' element={<Noodle />} />
          <Route path='/noodle/noodlecreate' element={<NoodleCreate />} />
          <Route path='/noodle/noodleupdate/:num' element={<NoodleUpdate />} />
          <Route path='/bookstore' element={<BookStore />} />
          <Route path='/bookstore/bookstorecreate' element={<BookStoreCreate />} />
          <Route path='/bookstore/bookstoreupdate/:code' element={<BookStoreUpdate />} />
          <Route path='/customer' element={<Customer />} />
          {/* <Route path='/contactus' element={<ContactUs />} /> */}
          <Route path='/question' element={<Question />} />


          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />

        </Routes>
      </BrowserRouter >

    </>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}

export default App;
