import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionList from './QuestionList';
import { AlertContext } from '../AlertContext';

function Question(props) {
  //1. 상태변수 만들기
  //동의합니다. 체크박스에 체크를 안한 상태이기 때문에 false가 기본값
  const [agree, setAgree] = useState(false);//기본값 false
  const { setQuestionCount } = useContext(AlertContext);
  const navigate = useNavigate();
  //2. 폼태그에 입력해야 할 값
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: ''
  });

  //3. 사용자가 입력양식에 입력을 하면 발생되는 함수 handleChange = 변수에 저장
  const handleChange = (e) => {
    const { name, value } = e.target;//사용자가 입력하는 값
    setFormData(prev => ({//상태함수에
      ...prev, [name]: value//각각 키:값으로 저장한다.
    }))
  }

  //4. 문의하기 버튼 동의 여부 체크 = 유효성검사
  const handleSubmit = (e) => {
    e.preventDefault();//새로고침 방지
    if (!agree) {//체크박스에 체크를 하지 않았다면
      alert('개인정보처리방침에 동의해주세요.');
      return;//체크하고오세요
    }
    //5. 전송하기 (비동기로) 보내는거 
    //get(조회), put(수정), (post)입력, delete(삭제)
    axios.post('http://localhost:9070/api/question', formData)
      .then(() => {
        setQuestionCount(count => count + 1);//숫자증가
        alert('문의사항이 접수되었습니다.');
        setFormData({//전송이 끝나면 프론트에서는 값을 비운다
          name: '',
          phone: '',
          email: '',
          content: ''
        });
        navigate('/question'); // 문의하기 페이지로 이동
      })
      .catch(err => console.log(err));
  }

  //변수선언 > 함수작성 > 호출하여 내용 실행 > 결과전송
  return (
    <>
      <main>
        <section className='question'>
          <h2>Question</h2>
          <form onSubmit={handleSubmit} className='question_form'>
            <h3>정성을 다해 답변을 해드리겠습니다.</h3>
            <div>
              <div className='input_box'>
                <label htmlFor="name">성함</label>
                <input type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='성함을 입력해주세요.'
                  required
                />

                <label htmlFor="phone">전화번호</label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder='01012345678'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="email">이메일</label>
                <input type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일 주소를 입력해주세요."
                  name="email"
                  required
                />
                <div>
                  <label htmlFor="content">문의내용</label>
                  <textarea
                    name="content"
                    id="content"
                    cols="30" rows="10"
                    onChange={handleChange}
                    value={formData.content}
                    placeholder='문의 내용을 입력하세요.'
                    required
                  >

                  </textarea>
                </div>
              </div>
              {/* 체크박스, 전송버튼 */}
              <div>
                <input type="checkbox"
                  id="agree"
                  checked={agree}
                  // 체크박스는 true, false값만 저장해야 하기때문에 
                  //체크한 경우는 true값을 setAgree함수에 넣어주면 됨
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label htmlFor="agree">개인정보처리방침에 동의합니다.</label>
                <button type="submit"
                  style={{ marginTop: 20, padding: "10px 40px", fontWeight: "bold", background: "rgb(192,221,82,1" }}
                >SEND</button>
              </div>
            </div>
          </form>
          <QuestionList />
        </section>
      </main>


    </>
  );
}

export default Question;