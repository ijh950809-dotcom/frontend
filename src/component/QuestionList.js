import axios from 'axios';
import React, { useEffect, useState } from 'react';

function QuestionList(props) {
  //1. 가져올 데이터 변수선언
  const [data, setData] = useState([]);

  //2. 문의하기에 등록된 글 가져오기
  const loadData = () => {
    axios//비동기로
      .get('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/question')//백엔드 서버에 주소 요청
      .then(res => setData(res.data))//성공시 데이터 저장
      .catch(err => console.log(err))//실패시 에러 출력
  }

  //3. 콤포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, [])

  //4. 날짜 데이터 포맷
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR');//한국지역 날짜
  };

  return (
    <section className='qna_list'>
      <h2>관리자가 보는 페이지 목록</h2>
      <table className='qna_table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>이름</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>문의내용</th>
            <th>접수일</th>
            <th>답변(답변 완료면 완료로 변경)</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.content}</td>
                  <td>{formatDate(item.date)}</td>
                </tr>
              ))
            ) :
              (<tr><td colspan='6'>접수된 내용이 없습니다.</td></tr>)
          }
        </tbody>
      </table>

    </section >
  );
}


export default QuestionList;
