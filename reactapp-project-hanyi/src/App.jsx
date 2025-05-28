import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import Regist from './components/members/Regist';
import TopNavi from './components/TopNavi';
import Board from './components/board/Board';
import ScrollTop from './components/ScrollTop';
import ChatStart from './components/chat/ChatStart';
import KakaoTalk from './components/chat/KakaoTalk';
import Login from './components/members/Login';

function App() {
  const location = useLocation();

  const talkPath = ['/chat/talk'];
  const hideNavi = talkPath.includes(location.pathname);

  return (
    <>
      {!hideNavi && <TopNavi />}
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/regist" element={<Regist></Regist>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/board' element={<Board></Board>} />
        {/* 자유게시판 */}
        {/* freeList freeView freeWrite */}
        <Route path='/chat'>
          <Route index element={<ChatStart/>}/>
          <Route path='talk' element={<KakaoTalk></KakaoTalk>}/>
        </Route>

      </Routes>
      <ScrollTop></ScrollTop>
    </>
  )
}

export default App
