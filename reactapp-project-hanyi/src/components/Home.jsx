import { Element } from 'react-scroll';

const Home = () => {
  return (<>
    <header></header>
    <h2>react 애플리케이션 제작</h2>
    <div className='backImg'>
      {/* 배경사진 1, 2 */}
      <img src="/images/backgroundimg_tmp.jpeg" alt="배너1" style={{ width: '100%' }} />
      <img src="/images/listen.jpeg" alt="배너2" style={{ width: '100%' }} />
    </div>

    {/* faqSection */}
    <Element name="faqSection">
      <div>
        <h2>Frequently Asked Question</h2>
        <div>
          <details>
            <summary>Q1. 어떻게 가입하나요?</summary>
            <p>회원가입.</p>
          </details>

          <details>
            <summary>Q2. 로그인하는 방법은요?</summary>
            <p>로그인.</p>
          </details>

          <details>
            <summary>Q3. 게시판 이용 방법?</summary>
            <p>게시판.</p>
          </details>

          <details>
            <summary>Q4. 실시간 채팅 이용 방법?</summary>
            <p>실시간채팅 - 채팅 시작하기. 스크롤바 위에.</p>
          </details>

          <details>
            <summary>Q5. 회원정보 수정 방법?</summary>
            <p>???.</p>
          </details>
        </div>
      </div>
    </Element>

    {/* 배경이미지3 */}
    <div>
      <img src="/images/ilovechococat.jpg" alt="배너3" />
    </div>

    {/* 개인정보, 저작권 등 */}
    <footer>
      {/* <button className="btn"></button> */}
      <a href="https://github.com/bdb252" target='_blank'>
        <button class="btn">
          <svg width="40" height="40" fill="#0092E4" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="github">
            <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
          </svg>
        </button>
      </a>
      <span class="copyright">2025 © hanyi Lee. All rights reserved. </span>
    </footer>
  </>
  )
}

export default Home;