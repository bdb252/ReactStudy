import { Route, Routes, useLocation } from 'react-router-dom';
import TopNavi from './components/TopNavi';
import Home from "./components/Home";
import Regist from './components/members/Regist';
import Login from './components/members/Login';
import ScrollTop from './components/ScrollTop';
import BoardList from './components/board/BoardList';
import BoardView from './components/board/BoardView';
import BoardWrite from './components/board/BoardWrite';
import BoardEdit from './components/board/BoardEdit';
import ChatStart from './components/chat/ChatStart';
import KakaoTalk from './components/chat/KakaoTalk';


function App() {
  const location = useLocation();

  const talkPath = ['/chat/talk'];
  const hideNavi = talkPath.includes(location.pathname);

  return (
    <>
      {!hideNavi && <TopNavi />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regist" element={<Regist />} />
        <Route path='/login' element={<Login />} />

        {/* 자유게시판 */}
        {/* freeList freeView freeWrite */}
        <Route path='/board'>
          <Route index element={<BoardList />}/>
          <Route path='list' element={<BoardList />} />
          <Route path='view'>
            <Route path=':id' element={<BoardView />} />
          </Route>
          <Route path='write' element={<BoardWrite />} />
          <Route path='edit'>
            <Route path=':id' element={<BoardEdit />} />
          </Route>
        </Route>

        <Route path='/chat'>
          <Route index element={<ChatStart/>}/>
          <Route path='talk' element={<KakaoTalk />}/>
        </Route>

      </Routes>
      <ScrollTop></ScrollTop>
    </>
  )
}

export default App
