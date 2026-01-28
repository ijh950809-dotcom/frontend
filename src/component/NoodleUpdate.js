import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NoodleUpdate(props) {
  //1. 변수선언
  const {num} = useParams();

  const [form, setForm] = useState({
    num:'',
    name:'',
    company:'',
    kind:'',
    price:'',
    e_date:'',
    reg_date:''
  })

  const navigate = useNavigate();


  useEffect(()=>{
    axios.get(`https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/noodle/${num}`)
      .then(res=>{
        console.log('서버응답값:',res.data);
        setForm(res.data);
      })
      .catch(err=>console.log('조회오류:', err));
  },[num])
  
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    axios.put(`https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/noodle/noodleupdate/${num}`,{
      name:form.name,
      company:form.company,
      kind:form.kind,
      price:form.price,
      e_date:form.e_date,
      reg_date:form.reg_date
    })
    .then(()=>{
      alert('상품정보가 수정완료되었습니다.');
      navigate('/noodle');
    })
    .catch(
      err=>console.log('수정실패:', err)
    );
  }
  return (
    <main>
      <section>
        <h2>noodle데이터 수정을 위한 페이지입니다.</h2>

        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='num'>번호</label>
            <input id='num'
              name='num'
              value={form.num}
              onChange={handleChange}
              readOnly
            />
          </p>
          
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
            <button className='btn'>수정하기</button>
          </div>
        </form>
      </section>
    </main>
  );
}


export default NoodleUpdate;
