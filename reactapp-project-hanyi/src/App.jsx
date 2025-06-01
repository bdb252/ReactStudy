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
    {no:1, title:'깜고', writer:'black', date:'2023-05-05',
      contents:'밤에 보면 눈동자만 보여서 조심해야해요!!',
      img:'/images/나고야1.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:2, title:'삼색', writer:'black', date:'2023-05-05',
      contents:'밤에 보면 눈동자만 보여서 조심해야해요!!',
      img:'/images/석촌호수1.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:3, title:'턱시도', writer:'black', date:'2023-05-05',
      contents:'밤에 보면 눈동자만 보여서 조심해야해요!!',
      img:'/images/집근처.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:4, title:'러시안블루', writer:'black', date:'2023-05-05',
      contents:'밤에 보면 눈동자만 보여서 조심해야해요!!',
      img:'/images/진주냥.jpg',
      filename:'입양신청서.docx',
      filePath:'boardFiles/입양신청서.docx'
    },
    {no:5, title:'치즈', writer:'cheezenya', date:'2023-01-01',
      contents:`한국에서는 오래전부터 노란색, 금색, 주황색 고양이들을 사랑스럽게 불러왔고, 
      요즘엔 주로 "치즈" 혹은 "치즈 태비"라고 부르고 있어요. 이름만 들어도 몽글몽글한 느낌이 들죠?
      이 치즈냥이들은 유전적으로 약 80% 정도가 수컷이에요. 그래서 그런지 겁이 없는 편이고, 사람들한테도
       먼저 다가가서 애교를 부리는 넉살 좋은 아깽이들이 많답니다.
      다만... 치즈냥이들 중 특히 레드 태비들은 어딘가 살짝 덜렁거린다거나, 항상 엉뚱한 짓을 하거나, 
      뭔가를 살짝 망가트려서 집사를 바쁘게 만든다는 귀여운 밈도 있어요. 😸
      그리고 줄무늬가 하나도 없는 완전 단색 레드 고양이는 사실 없어요. 언뜻 보면 줄무늬가 없는 것처럼 
      보여도 이마에 M자 무늬가 있다든지, 꼬리나 엉덩이 쪽에 살짝 줄무늬가 남아있는 경우가 대부분이에요.
      심지어 정말 줄무늬가 안 보여도, 나중에 새끼 고양이를 낳으면 숨어 있던 줄무늬 유전자가 짠! 
      하고 나타나기도 해요.
      그리고 일부 카오스냥이들 중에도 이 예쁜 색과 줄무늬가 같이 나타나는 경우가 있는데, 
      그런 친구들 중엔 암컷도 종종 있답니다. 물론 여전히 레어템이긴 하지만요!`,
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
    {no:8, title:'깜고', writer:'black', date:'2023-05-05',
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
