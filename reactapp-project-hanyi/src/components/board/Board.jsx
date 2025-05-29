import { Routes, Route } from "react-router-dom";
import List from './BoardList';
import View from './BoardView'
import Write from './BoardWrite'
import Edit from './BoardEdit'
const Board = () => {
  return (<>
    <h2>자유게시판</h2>
    <Routes>
      <Route path='/' element={<List></List>} />
      <Route path='/list' element={<List></List>} />
      <Route path='/view'>
        <Route path=":idx" element={<View></View>}></Route>
      </Route>
      <Route path='/write' element={<Write></Write>} />
      <Route path='/edit'>
        <Route path=':idx' element={<Edit></Edit>} />
      </Route>
    </Routes>
  </>)
}

export default Board;