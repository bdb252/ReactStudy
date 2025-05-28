import { Routes, Route } from "react-router-dom";
import List from './List';
import View from './View'
import Write from './Write'
import Edit from './Edit'
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