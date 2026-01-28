import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Noodle(props) {

  //1. 상태변수
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  //페이지 상태변수
  const { setNoodleCount } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);

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

  const itemsPerPage = 5;

  //2. 데이터리스트 비동기로 받아서 출력
  const loadData = () => {
    axios
      .get('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/noodle')
      .then
      (res => {
        setData(res.data)
        setNoodleCount(res.data.length);//data의 개수를 가져옴
      })
      .catch(
        err => console.log(err)
      )
  }
  //3. useEffect - 콤포넌트 생명주기에서 데이터를 한번만 불러와야...함.
  useEffect(() => {
    loadData();//비동기 방식으로 함수실행
  }, [])

  const deleteData = (num) => {
    if (window.confirm('정말삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:9070/noodle/${num}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData();
        })
        .catch(err => console.log(err));
    };
  }

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;


  const currentItems = filterData.slice(indexOfFirst, indexOfLast)

  const totalPage = Math.max(1, Math.ceil(filterData.length / itemsPerPage));

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  startPage = Math.max(1, endPage - 4);

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);



  return (

    <main>
      <section>
        <h2>Noodle 데이터 입력/출력/수정/삭제</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습응용한다. - CRUD</p>

        <table className='data_list'>
          <caption>라면정보 DB입력/출력/삭제/수정</caption>
          <thead>
            <tr>
              <th>num</th>
              <th>name</th>
              <th>company</th>
              <th>kind</th>
              <th>price</th>
              <th>e_date</th>
              <th>reg_date</th>
              <th>편집</th>
            </tr>
          </thead>

          <tbody>

            {currentItems.length > 0 ? (
              currentItems.map(item => (
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.kind}</td>
                  <td>{item.price}</td>
                  <td>{item.e_date}</td>
                  <td>{item.reg_date}</td>
                  <td>
                    <button onClick={() => navigate(`/noodle/noodleupdate/${item.num}`)}
                      className='btn'
                    >수정</button>
                    <button
                      className='btn update_btn'
                      onClick={() => deleteData(item.num)}>삭제</button>

                  </td>
                </tr>
              ))
            ) : (<tr><td colspan='4'>검색 결과가 없습니다.</td></tr>)
            }

          </tbody>
        </table>
        <div className='btn_group' onClick={() => navigate('./noodlecreate')}><button>글쓰기</button></div>

        <div style={{ width: '700px', margin: '0 auto', textAlign: 'center' }}>
          {currentPage > 1 ?
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >이전</button> :
            <button disabled
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >이전</button>
          }


          {pageNumbers.map(number => (
            <button key={number}
              onClick={() => setCurrentPage(number)}
              style={{ marginRight: '5px', backgroundColor: currentPage === number ? '#52c987' : '#f0f0f0', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '3px' }}
            >{number}</button>
          ))
          }

          {currentPage < totalPage ?
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >다음</button> :
            <button disabled
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >다음</button>
          }
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <input type='text' placeholder='상품명검색'
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
          <button
            onClick={handleSearch}
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


export default Noodle;
