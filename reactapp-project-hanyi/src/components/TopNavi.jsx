import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { scroller } from "react-scroll"

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

  return (<>
    <div className="nav-wrapper">
      <header>
        <nav className="top-navi">
          <a href="/" className="logo">
            <img src="/images/catwithguitar.png" alt="로고" className="logocat" />
          </a>
          <NavLink to='/'>Home</NavLink>&nbsp;&nbsp;
          <NavLink to='/regist'>회원가입</NavLink>&nbsp;&nbsp;
          <NavLink to='/login'>로그인</NavLink>&nbsp;&nbsp;
          <NavLink to='/board'>게시판</NavLink>&nbsp;&nbsp;
          <NavLink to='/catprofile'>고양이</NavLink>&nbsp;&nbsp;
          <NavLink to='/chat'>실시간 채팅</NavLink>&nbsp;&nbsp;
          <a href='/#faq' onClick={handleFAQ}>FAQ</a>
        </nav>
      </header>
    </div>
  </>)
}

export default TopNavi