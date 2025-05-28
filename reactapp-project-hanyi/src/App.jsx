import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Regist from './components/members/Regist';
import TopNavi from './components/TopNavi';

function App() {
  return (
    <>
    <TopNavi></TopNavi>
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/regist" element={<Regist></Regist>} />
      
    {/* 자유게시판 */}
    {/* freeList freeView freeWrite */}
    {/* QnA 게시판 */}
    {/* QnAList qnaView qnaWrite */}
    </Routes>

    </>
  )
}

export default App
