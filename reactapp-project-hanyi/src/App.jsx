import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Regist from './components/members/Regist';
import TopNavi from './components/TopNavi';
import Board from './components/board/Board';
import ScrollTop from './components/ScrollTop';
import KakaoTalk from './components/chat/KakaoTalk';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <TopNavi></TopNavi>
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/regist" element={<Regist></Regist>} />
      <Route path='/board' element={<Board></Board>} />
      <Route path='/talk' element={<KakaoTalk></KakaoTalk>}></Route>
    {/* 자유게시판 */}
    {/* freeList freeView freeWrite */}
    {/* QnA 게시판 */}
    {/* QnAList qnaView qnaWrite */}
    </Routes>
    <ScrollTop></ScrollTop>
    <Footer></Footer>
    </>
  )
}

export default App
