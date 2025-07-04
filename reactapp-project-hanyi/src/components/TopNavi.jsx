import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { scroller } from "react-scroll"
import { getCookie, setCookie } from "./members/cookieUtils";

const TopNavi = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFAQ = () => {
    if (location.pathname === '/') {
      // 이미 Home인 경우
      scroller.scrollTo('faqSection', {
        duration: 200,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
    else {
      // Home이 아닌 경우 Home으로 이동한 후 스크롤
      navigate('/', { replace: false });

      setTimeout(() => {
        scroller.scrollTo('faqSection', {
          duration: 400,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }, 0);
    }
  }

  // 현재 로그인한 유저의 쿠키
  const user = getCookie('user');
  // 로그아웃 핸들러
  const logout_handler = () => {
    setCookie('user', '', -1);
    navigate('/');
  }

  return (<>
    <div>
      <header>
        {/* 로고 누르면 홈화면으로 새로고침 */}
        <a href="/" className="logo">
          <img src="/images/catwithguitar.png" alt="로고" className="logocat" />
        </a>
        <nav className="menu nav-link">
          {/* Home누르면 Home으로 이동 */}
          <NavLink to='/'>Home</NavLink>&nbsp;&nbsp;
          {/* 로그인 되어있는 상태라면 */}
          {user ? (<>
          {/* 회원정보수정, 로그아웃으로 topnav 수정 */}
            <NavLink to='/myinfoedit'>회원정보수정</NavLink>&nbsp;&nbsp;
            <span onClick={logout_handler} style={{ cursor: 'pointer' }}>로그아웃</span>&nbsp;&nbsp;
          </>) :
            (<>
            {/* 로그인되어있지 않다면 회원가입, 로그인으로 topnav 수정 */}
              <NavLink to='/regist'>회원가입</NavLink> &nbsp;&nbsp;
              <NavLink to='/login'>로그인</NavLink>&nbsp;&nbsp;
            </>)}
          {/* 그외의 topnav들은 그대로 */}
          <NavLink to='/board'>깜냥게시판</NavLink>&nbsp;&nbsp;
          <NavLink to='/qnamodal'>집사질문함</NavLink>&nbsp;&nbsp;
          <NavLink to='/catprofile'>냥생상담소</NavLink>&nbsp;&nbsp;
          <NavLink to='/chat'>캬오오톡</NavLink>&nbsp;&nbsp;
          <a href='#/#faq' onClick={handleFAQ}>FAQ</a>
        </nav>
      </header>
    </div>
  </>)
}

export default TopNavi