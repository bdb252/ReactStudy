// import { BrowserRouter } from "react-router-dom";
import {Routes, Route} from "react-router-dom";
// 화면 이동을 위한 훅 임포트
import {useNavigate} from "react-router-dom";

import List from './components/board/List.jsx';
import Write from './components/board/Write.jsx';
import View from './components/board/View.jsx';
import Edit from './components/board/Edit.jsx';
import NotFound from './components/common/NotFound.jsx';
// 스테이트 사용을 위한 임포트
import { useState } from "react";

// 작성일 생성을 위한 함수 정의
const nowDate=() => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0"+(1+dateObj.getMonth())).slice(-2);
  var day = ("0"+dateObj.getDate()).slice(-2);
  // 0000-00-00 포맷의 날짜 생성
  return year+"-"+month+"-"+day;
}

function App() {
  // 데이터로 사용할 객체형 배열 생성
  // 작성을 위해 기존 배열을 스테이트로 변경한다. 
  const [boardData, setBoardData] = useState([
    {no:1, title:'오늘은 React 공부 하는 날', writer:'낙자쌤', date:'2023-01-01',
      contents:'React를 뽀개봅시당'
    },
    {no:2, title:'어제는 JavaScript 공부해씸', writer:'유겸이', date:'2023-03-03',
      contents:'JavaScript는 할게 너무 많아요'
    },
    {no:3, title:'내일은 Project 해야징', writer:'개똥이', date:'2023-05-05',
      contents:'Project는 뭘 만들어볼까?'
    }
  ]);
  // 일련번호 부여를 위한 스테이트 생성(시퀀스와 같은 용도)
  const [nextNo, setNextNo] = useState(4);
  // 작성완료 후 페이지 이동을 위한 훅 선언
  const navigate = useNavigate();
  return (
    // <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element = {<List boardData={boardData} />} />
          <Route path='/list' element = {<List boardData={boardData} />} />
          <Route path='/view' >
            <Route path=":no" element = {<View boardData={boardData} />} />
          </Route>
          {/* Write 컴포넌트로 글쓰기 처리를 위한 모든 스테이트와 관련함수를
          프롭스로 전달한다. */}
          <Route path='/write' element = {<Write 
            boardData={boardData} setBoardData={setBoardData}
            nextNo={nextNo} setNextNo={setNextNo}
            navigate={navigate} nowDate={nowDate}
          />} />
          <Route path="/edit">
            <Route path=":no" element={<Edit 
              boardData = {boardData} setBoardData = {setBoardData}
              navigate = {navigate} nowDate = {nowDate} />}
            />
          </Route>
          {/* <Route path="/delete/:no" element={
            <Delete boardData={boardData} setBoardData={setBoardData} />
          } /> */}
          <Route path='*' element = {<NotFound />} />
        </Routes>
      </div>
    // </BrowserRouter>
  )
}

export default App
