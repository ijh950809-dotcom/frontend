import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';


const Goods = () => {
  const [data, setData] = useState([]);//json데이터 받기 위해

  const navigate = useNavigate();//url주소 가져오기 위해
  const { setGoodsCount } = useContext(AlertContext);
  //0. 페이지 상태변수 선언
  const [currentPage, setCurrentPage] = useState(1);//초기값1
  const itemsPerPage = 5;//한페이지당 보여지는 게시물수

  const [keyword, setKeyword] = useState('');//키워드 상태변수(검색)

  //g_name검색어가 포함된 데이터만 필터링
  const filteredData = data.filter(item =>
    item.g_name.toLowerCase().includes(keyword.toLowerCase())
  );

  //


  //1. 상품리스트 조회(출력)
  const loadData = () => {
    //비동기통신사용
    axios
      .get('http://localhost:9070/goods')
      //성공시데이터를 저장
      .then
      (res => {
        setData(res.data)
        setGoodsCount(res.data.length);//data의 개수를 가져옴
      })
      //실패시 에러 출력
      .catch(err => console.log(err))
  }

  //2.콤포넌트생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, [])

  const deleteData = (g_code) => {//매개변수로 g_code값 받는다
    if (window.confirm('정말삭제하시겠습니까?')) {
      axios//서버에 delete요청을 전송
        .delete(`http://localhost:9070/goods/${g_code}`)
        //성공일때 아래내용을 실행함
        .then(() => {
          alert('데이터가 성공적으로 삭제되었습니다.');
          loadData();//데이터삭제가 이루어지면 목록 다시 갱신해야함
        })
        //실패일 경우
        .catch(err => console.log(err));
    }
  };

  //4. 페이지네이션 계산 - 현재 게시물 수 50/5 =10페이지
  //현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는뜻
  const indexOfLast = currentPage * itemsPerPage;

  //현재페이지의 첫인덱스 번호를 계산 10-5=5, 5번째부터 9번째 아이템까지 보여줍니다.
  const indexOfFirst = indexOfLast - itemsPerPage;

  //예)data.slice(5,10)-> data[5], data[6], data[7], data[8],data[9]만 화면에 표시
  // const currentItems = data.slice(indexOfFirst, indexOfLast);
  //수정 - 검색결과를 가지고 페이지네이션을 다시 새로 표시함
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  //전체 페이지 수 totalpage = Math.ceil(13/5)=3, 무조건올림
  //예)페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오도록 한다.
  // const totalPage = Math.ceil(data.length/itemsPerPage);
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  //시작번호와 끝번호 계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);
  //페이지 번호 배열(1-5고정, 또는 totalPages까지 제한 1,2,3,4,5)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i
  );
  return (
    <main>
      <section>
        <h2>1. Goods DB 페이지</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습응용한다. - CRUD</p>

        <table className='data_list'>
          <thead>
            <tr>
              <th>CODE</th>
              <th>NAME</th>
              <th>COST</th>
              <th>메뉴(삭제, 수정)</th>
            </tr>
          </thead>
          <tbody>
            {
              //삼항조건 연산자를 사용하여 검색된 결과가 0보다 크면 출력되도록해야
              currentItems.length > 0 ? (
                currentItems.map(item => (
                  // data.map(item=>(
                  <tr key={item.g_code}>
                    <td>{item.g_code}</td>
                    <td>{item.g_name}</td>
                    <td>{Number(item.g_cost).toLocaleString()}</td>
                    <td><button className='btn update_btn' onClick={() => navigate(`/goods/goodsupdate/${item.g_code}`)}>수정</button>

                      <button className='btn del_btn' onClick={() => deleteData(item.g_code)}>삭제</button></td>
                  </tr>
                ))
              ) : (<tr><td colspan='4'>검색결과가 없습니다.</td></tr>)
            }
          </tbody>

        </table>
        <div className='btn_group'><button onClick={() => navigate(`/goods/goodscreate`)}>글쓰기</button></div>
        {/* 페이지네이션 */}
        <div style={{ margin: '20px auto', textAlign: 'center', width: '60%' }}>
          {/* 이전버튼 */}

          {currentPage > 1 ?
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}>이전</button> :
            <button disabled
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}>이전</button>
          }


          {/* 페이지번호 */}
          {/* <button>1,2,3,4,5</button> */}
          {pageNumbers.map(number => (
            <button key={number}
              onClick={() => setCurrentPage(number)}
              style={{ marginRight: '5px', backgroundColor: currentPage === number ? '#52c987' : '#f0f0f0', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '3px' }}>
              {number}
            </button>
          ))}

          {/* 다음버튼 */}

          {currentPage < totalPage ?
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}>다음</button> :
            <button disabled
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}>다음</button>
          }

        </div>
        {/* 키워드 검색폼 */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          {/* 검색창에 검색단어만 입력해도 바로 검색되는 양식 */}
          <input type="text" placeholder='상품명검색'
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setCurrentPage(1);//검색은 항상 1페이지부터
            }}
            style={{
              width: '250px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

      </section>
    </main>
  );
}

export default Goods;