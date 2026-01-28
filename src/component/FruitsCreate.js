import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//1.폼양식에 입력한 상태값 관리를 위함
function FruitsCreate(props) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    color: '',
    country: ''
  });
  
  //url주소 관리
  const navigate = useNavigate();

  //2. 폼양식에 데이터를 입력하면 호출되는 함수
  const handleChange = (e) => {
    setForm({
      ...form, //기존배열값에 추가하여 입력
      [e.target.name]: e.target.value
      // {키:값}
    });
  }
  //3. 폼양식 아래 'submit'버튼 클릭시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();//새로고침방지
    //비동기로 backend server에 데이터 넘김
    axios.post('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/fruits', form)
      .then(() => {//통신이 성공적으로 이루어지면
        //setFruitsCount(count => count + 1);//숫자증가

        


        alert('상품이 정상적으로 등록되었습니다.');
        navigate('/fruits');
      })
      .catch()

  }

  return (
    <>
      <h2>Fruits db입력을 위한 페이지</h2>
      <form name="과일정보입력" onSubmit={handleSubmit}>
        <div>
          <p>
            <label htmlFor="name">과일명</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required />
          </p>

          <p>
            <label htmlFor="price">가격</label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required />
          </p>

          <p>
            <label htmlFor="color">색상</label>
            <input
              id="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              required />
          </p>

          <p>
            <label htmlFor="country">원산지</label>
            <input
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              required />
          </p>


        </div>
        <p><button type="submit" className='btn'>신규상품 등록하기</button></p>
      </form>
    </>
  );
}


export default FruitsCreate;
