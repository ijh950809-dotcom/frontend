import axios from 'axios';
import React, { useState } from 'react';

function Join(props) {
  //1. 변수선언
  const [form, setForm] = useState({
    username: '',//사용자아이디
    password: '',//사용자 패스워드
    confirmPassword: ''//패스워드 확인
  });

  // const [data, setData] = useState([]);


  const [error, setError] = useState('');//에러 출력을 위한 변수
  const [success, setSuccess] = useState('');//성공시 출력변수

  //회원가입자 수 뱃지
  // const loadData = () => {
  //   axios
  //     .get('http://localhost:9070/join')
  //     .then
  //     (res => {
  //       setData(res.data)
  //       setUserCount(res.data.length);//data의 개수를 가져옴
  //     })
  //     .catch(
  //       err => console.log(err)
  //     )
  // }
  // useEffect(() => {
  //   loadData();//비동기 방식으로 함수실행
  // }, [])




  //2. 입력폼에서 사용자가 작성한 내용을 담기
  const handleChange = (e) => {
    setForm({//id, password를 입력시 각각 해당변수에 담는다
      ...form,//기존폼 데이터에 추가로 저장
      [e.target.name]: e.target.value//id, pw저장
    })
    setError('');//에러 초기화
    setSuccess('');//성공초기화
  }

  //3. 유효성 검사를 하여 모든 내용이 서버로 전송되게 하기
  const handleSubmit = async (e) => {
    e.preventDefault();//새로고침 방지

    //비밀번호1, 비밀번호2가 맞는지 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 맞지 않습니다. 다시 확인하세요.');
      return;
    }
    try {
      await axios.post('http://localhost:9070/join', {
        username: form.username,
        password: form.password
      });
      setSuccess('회원가입이 완료되었습니다.');
      //전송이 끝나면 모든 값 초기화
      setForm({
        username: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('아이디가 이미존재하거나 오류입니다.');
    }
  }



  return (
    <main>
      <section className='join_form'>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 : </label>
            <input type="text" id="username" name="username" placeholder="아이디"
              value={form.username}
              onChange={handleChange}
              required />
          </p>
          <p>
            <label htmlFor="password">패스워드 : </label>
            <input type="password"
              id="password"
              name="password"
              placeholder='비밀번호'
              value={form.password}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label htmlFor="confirmPassword">패스워드 확인</label>
            <input type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='비밀번호확인'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </p>
          <p><button type="submit">회원가입</button></p>
          {/* 회원가입 에러가 나면 빨강색으로 문자 출력 */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* 조건부 렌더링 공식 : 조건에 맞으면 출력(실행) */}

          {/* 회원가입 성공이면 초록색으로 문자 출력 */}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </section>

    </main>
  );
}

export default Join;