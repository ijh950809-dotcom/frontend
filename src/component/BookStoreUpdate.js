import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function BookStoreUpdate(props) {
  //1. url경로에서 code값을 추출하여 가져온다.
  const{code} = useParams();

  //2. 상태변수
  const [form, setForm] = useState({
    code:'',
    name:'',
    area1:'',
    area2:'',
    area3:'',
    book_cnt:'',
    owner_nm:'',
    tel_num:''
  });

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:9070/bookstore/${code}`)
    //성공이면
    .then(res=>{
      console.log('서버응답값 : ', res.data);
      setForm(res.data);
    })
    //실패이면
    .catch(err=>console.log('조회오류:', err));
  },[code]);

  //3. 폼태그에 입력시 발생되는 함수(값저장을 위해)
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value//입력한 값을 각각 저장
    })
  }

  //4. 수정하기 버튼 클릭시 내용전송을 위한 함수
  const handleSubmit=(e)=>{
    e.preventDefault();//새로고침 방지

    //비동기 방식으로 업데이트할 내용을 백엔드로 전달함
    axios.put(`http://localhost:9070/bookstore/bookstoreupdate/${code}`, {
      name:form.name,//서점명
      area1:form.area1,
      area2:form.area2,
      area3:form.area3,
      book_cnt:form.book_cnt,
      owner_nm:form.owner_nm,
      tel_num:form.tel_num
    })
    .then(()=>{
      alert('상품정보가 수정완료되었습니다.');
      navigate('/bookstore');
    })
    .catch(
      err => console.log('수정실패 : ', err))
};
  return (
    <main>
      <section>
        <h2>4.bookStore DB 수정을 위한 페이지입니다.</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='code'>코드번호</label>
            <input
              id='code'
              name='code'
              value={form.code}
              readOnly
            />
          </p>
          <p>
            <label>서점명 : </label>
            <input id='name' name='name' value={form.name} onChange={handleChange} required />
          </p>

          <p>
            <label htmlFor='area1'>지역1(시) : </label>
            <select id='area1' name='area1'
              value={form.area1}
              onChange={handleChange}
              required
            >
              <option value=''>지역을 선택하세요.</option>
              <option value='서울'>서울</option>
              <option value='경기'>경기</option>
              <option value='경남'>경남</option>
              <option value='광주'>광주</option>
              <option value='강원'>강원</option>
              <option value='대전'>대전</option>
              <option value='대구'>대구</option>
              <option value='부산'>부산</option>
              <option value='제주도'>제주도</option>
            </select>
          </p>

          <p>
            <label htmlFor='area2'>지역2(구) : </label>
            <select id='area2' name='area2'
              value={form.area2}
              onChange={handleChange}
              required
            >
              <option value=''>선택하세요</option>
              <option value='서초'>서초</option>
              <option value='성남'>성남</option>
              <option value='남구'>남구</option>
              <option value='창원'>창원</option>
              <option value='서귀포'>서귀포</option>
              <option value='수영'>수영</option>
              <option value='경기'>경기</option>
            </select>
          </p>

          <p>
            <label htmlFor='area3'>지역3(동) : </label>
            <select id='area3' name='area3'
              value={form.area3}
              onChange={handleChange}
              required
            >
              <option value=''>선택하세요</option>
              <option value='방배'>방배</option>
              <option value='청담'>청담</option>
              <option value='구기'>구기</option>
              <option value='인사'>인사</option>
              <option value='명동'>명동</option>
              <option value='익선'>익선</option>
              <option value='삼청'>삼청</option>
            </select>
          </p>

          <p>
            <label htmlFor=''>상품개수 : </label>
            <input
              id='book_cnt' type='number' name='book_cnt'
              value={form.book_cnt} onChange={handleChange} required 
              />
          </p>

          <p>
            <label htmlFor=''>대표자명 : </label>
            <input id='owner_nm' name='owner_nm' value={form.owner_nm} onChange={handleChange} required 
            />
          </p>

          <p>
            <label htmlFor='tel_num'>전화번호 : </label>
            <input id='tel_num' name='tel_num'
              value={form.tel_num}
              onChange={handleChange}
              required
            />
          </p>
          <button className='btn' type='submit'>
            수정하기
          </button>
        </form>
      </section>
    </main>
  );
}

export default BookStoreUpdate;