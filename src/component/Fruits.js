import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';


function Fruits(props) {
  //1. 상태변수
  const [data, setData] = useState([]);

  const navigate = useNavigate();//url주소 가져오기 위해
  const { setFruitsCount } = useContext(AlertContext);

  const [currentPage, setCurrentPage] = useState(1);//초기값 1페이지
  const [inputKeyword, setInputKeyword] = useState('');//검색어 입력용
  const [keyword, setKeyword] = useState('');//실제검색에 사용될 키워드

  //검색을 위한 함수
  const handleSearch = () => {
    setKeyword(inputKeyword);//검색단어 확정
    setCurrentPage(1);//검색시 항상 1페이지부터
  }

  //키보드 엔터키를 눌러도 검색이 되게 한다.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  //필터링 : 검색시 name기준으로 검색
  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  //검색폼에 입력된 데이터 추가하기
  const handleReset = () => {
    setInputKeyword('');//입력값 초기화
    setKeyword(''); //검색키워드제거
    setCurrentPage(1);//첫페이지로 이동
  }

  //2. 한페이지에 보여줄 페이지 개수
  const itemsPerPage = 5;//한페이지에 보여줄 게시물개수

  const loadData = () => {
    //비동기통신사용
    axios
      .get('https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/fruits')
      //성공시데이터를 저장
      .then
      (res => {
        setData(res.data)
        setFruitsCount(res.data.length);//data의 개수를 가져옴
      })

      //실패시 에러 출력
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadData();//콤포넌트 생성시 한번만 데이터를 로딩
  }, []);

  //1. 선택한 자료 삭제하기
  const deleteData = (num) => {
    if (window.confirm('정말삭제하시겠습니까?')) {
      axios
        .delete(`https://port-0-backend-express-server-mkvwe8rkb7d9ea30.sel3.cloudtype.app/fruits/${num}`)
        .then(() => {//성공시
          alert('삭제되었습니다.');
          loadData();//삭제후 다시 불러와서 목록을 새로고침
        })
        .catch(err => console.log(err));
    };
  }

  //페이지네이션 계산공식만들기 게시물 50개/ 5개씩 보여주겠다 50/5
  //현재페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻
  const indexOfLast = currentPage * itemsPerPage;

  //현재페이지의 첫인덱스 번호를 계산 10-5=5, 5번째부너 9번째까지 보여주겠다는뜻
  const indexOfFirst = indexOfLast - itemsPerPage;

  //data배열중 현재 페이지에 해당하는 부분만 잘라서 출력해야
  //예)data.slice(5,10)->data[5]~data[9]만 화면에 표시함

  // const currentItems = data.slice(indexOfFirst, indexOfLast);
  const currentItems = filterData.slice(indexOfFirst, indexOfLast);

  //전체페이지수 totalPage=Math.ceil(13/5)=3,무조건 올림
  // const totalPage = Math.ceil(data.length/itemsPerPage);
  //수정:필터링된 데이터의 전체페이지수
  //수정: totalPage가 0이되는 경우를 방지해야해서 무조건 최소값1
  const totalPage = Math.max(1, Math.ceil(filterData.length / itemsPerPage));
  // 시작번호와 끝번호 계산하기
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  //만약에 끝페이지가 totalpage에 도달하면 시작페이지도 다시 수정
  startPage = Math.max(1, endPage - 4);

  //페이지번호 배열(1~5까지 고정)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <main>
      <section>
        <h2>2. Fruits DB 페이지</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습응용한다. - CRUD</p>

        <table className='data_list'>
          <caption>fruits data map 함수로 출력하기</caption>
          <thead>
            <th>번호</th>
            <th>과일명</th>
            <th>가격</th>
            <th>색상</th>
            <th>원산지</th>
            <th>편집</th>
          </thead>
          <tbody>
            {
              currentItems.length > 0 ? (
                currentItems.map(item => (
                  // data.map(item=>(
                  <tr key={item.num}>
                    <td>{item.num}</td>
                    <td>{item.name}</td>
                    <td>{Number(item.price).toLocaleString()}</td>
                    <td>{item.color}</td>
                    <td>{item.country}</td>
                    <td>
                      <button className='btn update_btn' onClick={() =>
                        navigate(`/fruits/fruitsupdate/${item.num}`)
                      }>수정</button>
                      &nbsp;<button className='btn del_btn' onClick={() => deleteData(item.num)}>삭제</button>
                    </td>
                  </tr>
                ))
              ) : (<tr><td colspan='4'>검색결과가 없습니다.</td></tr>

              )
            }
          </tbody>

        </table>
        <div className='btn_group'>
          <button onClick={() => navigate(`/fruits/fruitscreate`)}>글쓰기</button>
        </div>


        {/* 페이지번호 출력 */}
        <div style={{ margin: '20px auto', textAlign: 'center', width: '60%' }}>
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

          {/* 조건부렌더링공식 => 값이 참인경우 && 실행할 값
          삼항조건 연산자 => 조건식?참인값:거짓인값 */}


          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{ marginRight: '5px', backgroundColor: currentPage === number ? '#52c987' : '#f0f0f0', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '3px' }}
            >{number}</button>
          ))}

          {currentPage < totalPage ?
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#333', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >다음</button> :
            <button dlsabled
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: '#ccc', marginRight: '5px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', backgroundcolor: '#e0e0e0' }}
            >다음</button>
          }

        </div>
        {/* 검색폼 */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          {/* 검색창에 검색단어를 입력하고 검색버튼 클릭시 검색되는 양식 */}
          <input type="text" placeholder='상품명검색'
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
          >검색
          </button>

          <button
            onClick={handleReset}
            style={{
              marginLeft: '10px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#777',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            초기화
          </button>
        </div>
      </section>
    </main>
  );
}


export default Fruits;

