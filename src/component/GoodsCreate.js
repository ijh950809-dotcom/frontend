// import React, { useState, useContext } from 'react';
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { AlertContext } from '../AlertContext';

function GoodsCreate(props) {
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });

  const navigate = useNavigate();
  // const { setGoodsCount } = useContext(AlertContext);

  const handleChange = (e) => {
    setForm({
      ...form,//기존배열값에 새롭게 추가한다
      [e.target.name]: e.target.value
    });
  }
  //신규상품 등록하기 버튼 클릭시 호출되는 함수==backend서버로 전달
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9070/goods', form)
      .then(() => {
        //setGoodsCount(count => count + 1);//숫자증가
        alert('상품등록이 완료되었습니다.');
        navigate('/goods');
      })
      .catch(err => console.log(err));
  }


  return (
    <main>
      <section>
        <h2>Goods DB입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>

          <p>
            <label>상품명 : </label>
            <input type='text'
              id='name'
              name='g_name'
              value={form.g_name}
              onChange={handleChange}
              required
            />
          </p>


          <p>
            <label>가격 : </label>
            <input type='number' id='g_cost'
              name="g_cost"
              value={form.g_cost}
              onChange={handleChange}
              required
            />
          </p>

          <p><button className='btn'>신규상품 등록하기</button></p>


        </form>




      </section>


    </main>
  );
}

export default GoodsCreate;