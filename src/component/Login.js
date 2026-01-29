import axios from 'axios';
import React, { useState } from 'react';
// import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { AlertContext } from '../AlertContext';

function Login(props) {

  //1. 변수선언
  const [form, setForm] = useState({
    username: '',//사용자아이디
    password: '',//사용자 패스워드
  });

  // const [data, setData] = useState([]);

  const [error, setError] = useState('');
  // const { setUserCount } = useContext(AlertContext);

  //회원수 뱃지
  // const loadData = () => {
  //   axios
  //     .get('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/join')
  //     .then
  //     (res => {
  //       setData(res.data)
  //       setUserCount(res.data.length);//data의 개수를 가져옴
  //     })
  //     .catch(
  //       err => console.log(err)
  //     )
  // }

  //2. 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  //3.로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();//새로고침 방지

    try {//성공시 실행내용
      const res = await axios.post('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/login', form);
      //사용자인증이 끝나면 '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token);
      alert('로그인성공');

    } catch (err) {//실패시 실행내용
      setError('로그인실패 : 아이디와 패스워드를 다시 확인하세요.')
    }
  }
  return (
    <main>
      <section className='login_form'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 : </label>
            <input type="text" id="username" name="username"
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
            />
          </p>

          <p>
            <label htmlFor="password">패스워드 : </label>
            <input type="password" id="password" name="password"
              value={form.password}
              onChange={handleChange}
              placeholder='패스워드' />
          </p>
          <p>
            <input type="submit" value='로그인' />
          </p>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p>
            <Link to="/id_search">아이디찾기</Link>
            <span>|</span>
            <Link to="/pw_search">비번찾기</Link>
            <span>|</span>
            <Link to="/join">회원가입</Link>

          </p>
        </form>
        <dl>
          <dt>*로그인 구현 전체 구성</dt>
          <dd>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청하기</dd>
          <dd>2. 백엔드(backend : Node.js + Express) : 로그인처리, JWT 토큰 발급</dd>
          <dd>3. 데이터베이스(MYSQL) : DB입/출력</dd>
          <dd>4.보안 : 비밀번호 bycrpt암호화, JWT로 인증을 유지</dd>
        </dl>

        <div>
          <p>DB설계(users)</p>
          <pre>
            1. 테이블생성
            CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            datetime timestamp NOT NULL DEFAULT current_timestamp()
            );
            2. 데이터입력
            INSERT INTO users VALUES(1, 'jeon', '1234', '2025-05-26');
            INSERT INTO users VALUES(2, 'jeon1', '1234', '2025-05-26');
            INSERT INTO users VALUES(3, 'jeon2', '1234', '2025-05-26');
            INSERT INTO users VALUES(4, 'jeon3', '1234', '2025-05-26');
            INSERT INTO users VALUES(5, 'jeon4', '1234', '2025-05-26');

            3.UI화면설계 - 로그인 폼, 회원가입폼 구현
          </pre>
        </div>
      </section>

    </main>
  );
}


export default Login;
