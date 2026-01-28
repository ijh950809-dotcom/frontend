import axios from 'axios';
// import React, { useState, useContext } from 'react';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import { AlertContext } from '../AlertContext';

function NoodleCreate(props) {
  //1. 상태변수 선언
  const [form, setForm] =
    useState({
      name: '',
      company: '',
      kind: '',
      price: '',
      e_date: '',
      reg_date: '',
    });

  const navigate = useNavigate();
  // const { setNoodleCount } = useContext(AlertContext);

  //2. 데이터입력시 변경되는함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/noodle', form)
      .then(() => {
        //setNoodleCount(count => count + 1);//숫자증가
        alert('상품이 정상적으로 등록되었습니다.');
        navigate('/noodle');
      })
      .catch((err) => {
        console.log(err);
        alert('등록 중 오류가 발생되었습니다.');
      })
  }
  return (
    <main>
      <section>
        <h2>5. Noodle DB입력을 위한 페이지</h2>

        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='name'>라면이름</label>
            <input id='name'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='company'>회사</label>
            <input id='company'
              name='company'
              value={form.company}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='kind'>종류</label>
            <input id='kind'
              name='kind'
              value={form.kind}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='price'>가격</label>
            <input id='price'
              name='price'
              value={form.price}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='e_date'>유통기한</label>
            <input id='e_date'
              name='e_date'
              value={form.e_date}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='reg_date'>등록일</label>
            <input id='reg_date'
              name='reg_date'
              value={form.reg_date}
              onChange={handleChange}
              required
            />
          </p>
          <div>
            <button className='btn'>등록하기</button>
          </div>
        </form>
      </section>

    </main>
  );
}


export default NoodleCreate;
