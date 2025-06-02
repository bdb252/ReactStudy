import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import TopNavi from './components/TopNavi';
import Home from "./components/Home";
import Regist from './components/members/Regist';
import Login from './components/members/Login';
import MemberEdit from './components/members/MemberEdit'
import ScrollTop from './components/ScrollTop';
import BoardList from './components/board/BoardList';
import BoardView from './components/board/BoardView';
import BoardWrite from './components/board/BoardWrite';
import BoardEdit from './components/board/BoardEdit';
import QnaModal from './components/QnaModal';
import CatList from './components/catprofile/CatList';
import CatView from './components/catprofile/CatView';
import ChatStart from './components/chat/ChatStart';
import KakaoTalk from './components/chat/KakaoTalk';

function App() {
  const location = useLocation();

  const talkPath = ['/chat/talk'];
  const hideNavi = talkPath.includes(location.pathname);

  const [boardData, setBoardData] = useState([
    {no:1, title:'깜고', writer:'black', date:'2024-08-27',
      contents:'밤에 보면 눈동자만 보여서 조심해야해요!!',
      img:'/images/나고야1.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:2, title:'삼색', writer:'black', date:'2023-03-05',
      contents:'태어난지 얼마 안된 새끼 삼색이에요!!',
      img:'/images/석촌호수1.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:3, title:'턱시도', writer:'black', date:'2024-07-15',
      contents:'호기심도 많고 경계심도 많은 아이입니다',
      img:'/images/집근처.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:4, title:'러시안블루', writer:'black', date:'2025-05-05',
      contents:'사람을 너무너무 좋아해서 먼저 다가오고 애교를 많이 부려요!!',
      img:'/images/진주냥.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:5, title:'치즈', writer:'cheezenya', date:'2023-01-01',
      contents:`겁이 없는 편이고, 사람들한테도 먼저 다가가서 애교를 부리는 귀여운
       치즈냥이입니다! 아직 어려서 엉뚱한 짓을 많이 하고 뭔가를 망가트릴수도... 😸`,
      img:'/images/cheezecat.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:6, title:'삼색', writer:'threenya', date:'2023-03-03',
      contents:'삼색이를 구조해서 임시보호중입니다!!',
      img:'/images/threecolorcat.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:7, title:'턱시도', writer:'tuxedodo', date:'2023-05-05',
      contents:'예쁘지만 엉뚱한 매력이 있습니다',
      img:'/images/tuxedocat.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:8, title:'깜고', writer:'black', date:'2023-09-15',
      contents:'밤에 보면 눈동자만 보여서 조심해야해요!!',
      img:'/images/blackcat.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
  ]);

  return (
    <>
      {!hideNavi && <TopNavi />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regist" element={<Regist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myinfoedit' element={<MemberEdit/>}/>
        
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

        {/* qna 게시판 */}
        <Route path='/qnamodal' element={<QnaModal />}></Route>
        {/* 자료게시판 */}
        <Route path='/catprofile'>
          <Route index element={<CatList catData={boardData}/>} />
          <Route path='catlist' element={<CatList catData={boardData}/>} />
          <Route path='nyaong'>
            <Route path=':no' element={<CatView catData={boardData} />} />
          </Route>
        </Route>

        {/* 실시간 채팅 */}
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
