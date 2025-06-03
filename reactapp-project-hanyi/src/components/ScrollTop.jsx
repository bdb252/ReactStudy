import './css/scrollbtn.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// top 버튼 구현
function ScrollTop() {
  // Top버튼 설정. 처음에는 false로 안보이게 
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트가 발생하면 호출
  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  // top 버튼 누르면 top으로 스무스하게 가도록
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // 스크롤할 때마다 handleScroll 함수를 실행
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <div style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000,
      }}>
        {/* 실시간 채팅 간단 버튼 */}
        {/* <!-- From Uiverse.io by eirikvold --> */}
        <Link to='chat' className='button-msg'>
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div>
            <span className='button-text'>Message&nbsp;</span>
        </Link>

        {/* 상단 이동 버튼 */}
        {/* <!-- From Uiverse.io by vinodjangid07 -->  */}
        <button class="button-topbtn" onClick={scrollToTop}>
          <svg class="svgIcon" viewBox="0 0 384 512">
            <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            ></path>
          </svg>
        </button>
      </div>
    )
  );
}

export default ScrollTop;
