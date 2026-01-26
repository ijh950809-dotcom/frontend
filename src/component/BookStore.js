import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AlertContext } from '../AlertContext';

import { useNavigate } from 'react-router-dom';


function BookStore(props) {

  //1. 상태변수 만들기
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { setBookStoreCount } = useContext(AlertContext);


  //0. 페이지 상태변수 선언
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    setKeyword(inputKeyword);
    setCurrentPage(1);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
    setCurrentPage(1);
  }


  //2. 데이터 리스트 비동기로 받아서 출력
  const loadData = () => {
    axios //비동기로 
      .get('http://localhost:9070/bookstore')//주소로 요청한 json data파일을 가져온다.
      .then
      (res => {
        setData(res.data)
        setBookStoreCount(res.data.length);//data의 개수를 가져옴
      })
      .catch(//실패시 내용
        err => console.log(err)
      )
  }

  //3. useEffect - 콤포넌트 생명주기에서 데이터를 한번만 불러와야...함.
  useEffect(() => {
    loadData();//비동기 방식으로 함수실행
  }, [])

  //4.삭제를 위한 함수
  const deleteData = (code) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:9070/bookstore/${code}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData();
        });
    }
  };

  // 페이지네이션 계산
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = filterData.slice(indexOfFirst, indexOfLast);

  //전체페이지수 계산
  const totalPage = Math.ceil(data.length / itemsPerPage);

  //시작번호와 끝번호계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  const pageNumbers = Array.from
    ({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  return (
    <main>
      <section>
        <h2>BookStore DB데이터 입력/출력/수정/삭제</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습응용한다. - CRUD</p>

        <table className='data_list'>
          <caption>교보문고 DB입력/출력/삭제/수정</caption>
          <thead>
            <tr>
              <th>code</th>
              <th>서점명</th>
              <th>지역1</th>
              <th>지역2</th>
              <th>지역3</th>
              <th>주문개수</th>
              <th>주문자</th>
              <th>주문자 연락처</th>
              <th>편집</th>
            </tr>
          </thead>

          <tbody>
            {/* backend에서 db요청하여 결과를 json으로 받아서 map함수로 출력한다. */}
            {currentItems.length > 0 ? (
              currentItems.map(item => (

                // data.map(item=>(
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.area1}</td>
                  <td>{item.area2}</td>
                  <td>{item.area3}</td>
                  <td>{Number(item.book_cnt).toLocaleString()}</td>
                  <td>{item.owner_nm}</td>
                  <td>{item.tel_num}</td>
                  <td>
                    <button className='btn update_btn' onClick={() => navigate(`/bookstore/bookstoreupdate/${item.code}`)}>수정</button>
                    <button className='btn del_btn' onClick={() => deleteData(item.code)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (<tr><td colspan='9'>검색결과가 없습니다.</td></tr>)
            }
          </tbody>
        </table>
        <div className='btn_group' onClick={() => navigate('./bookstorecreate')}><button>글쓰기</button></div>

        <div style={{ margin: '20px auto', width: '700px', textAlign: 'center' }}>
          {currentPage > 1 ?
            <button onClick={() => setCurrentPage(currentPage - 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >이전</button> :
            <button disabled
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >이전</button>
          }


          {
            pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                style={{ marginRight: '5px', backgroundColor: currentPage === number ? '#52c987' : '#f0f0f0', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '3px' }}
              >{number}</button>
            ))
          }

          {currentPage < totalPage ?
            <button onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >다음</button> :
            <button disabled
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}>다음</button>
          }

        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>

          <input
            type='text'
            placeholder='상품명 검색'
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '250px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />

          <button onClick={handleSearch}
            style={{
              marginLeft: '10px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#4caf50',
              color: '#fff',
              cursor: 'pointer'
            }}
          >검색</button>
          <button onClick={handleReset}
            style={{
              marginLeft: '10px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#777',
              color: '#fff',
              cursor: 'pointer'
            }}
          >초기화</button>
        </div>
      </section>

    </main>
  );
}

export default BookStore;