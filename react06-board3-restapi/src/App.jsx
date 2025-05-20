import {Routes, Route} from "react-router-dom";

import List from './components/board/List.jsx';
import Write from './components/board/Write.jsx';
import View from './components/board/View.jsx';
import Edit from "./components/board/Edit.jsx";
import NotFound from './components/common/NotFound.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<List></List>} />
        <Route path='/list' element = {<List></List>} />
        {/* 중첩라우팅으로 게시물의 일련번호가 하위경로 형태로 추가된다.
        이것을 useParams 훅을 통해 읽어올 수 있다.  */}
        <Route path='/view'>
          <Route path=":idx" element = {<View></View>}></Route>
        </Route>
        <Route path='/write' element = {<Write></Write>} />
        {/* 수정의 경우에도 열람과 마찬가지로 수정할 게시물의 일련번호가
        필요하므로 중첩라우팅으로 설정해야한다. */}
        <Route path='/edit'>
          <Route path=':idx' element = {<Edit></Edit>} />
        </Route>
        <Route path='*' element = {<NotFound></NotFound>} />
      </Routes>
      
    </div>
  )
}

export default App
