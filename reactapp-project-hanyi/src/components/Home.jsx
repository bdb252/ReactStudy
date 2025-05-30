import { Element } from 'react-scroll';

const Home = () => {
  return (<>
    <div className='heroSection backImg'>
      <img src="/images/backgroundimg_tmp.jpg" alt="배너1" className='backImg fade-in-img' />
      <div className="textOverlay">
        <h2 className='fade-in'>The cat's out of the bag<br />
          Black cats are not bad luck <br /><br /></h2>
        <h2 className='fade-in sec'>
          <br />비밀이 드디어 밝혀졌어요. <br />
          검은 고양이는 불행이 아닌, 가장 조용한 행운이었단 걸요. <br /></h2>
        <h2 className='fade-in third'>
          <br />편견 속에 숨어 있던 생명들,<br /> 이제 당신의 사랑을 기다립니다.<br />
          진짜 행운을 만나보세요♥ </h2>
      </div>
    </div>
    <div className='backImg'>
      {/* 배경사진 2 */}
      <img src="/images/listen.jpeg" alt="배너2" className='backImg' />
    </div>

    {/* faqSection */}
    <div className='section-faq'>
      <Element name="faqSection">
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
            <p>깜냥게시판에서는 여러분의 고양이 이야기를 자유롭게 나누어주세요! <br />
                입양 후기나 고양이 자랑은 언제나 환영입니다◉_◉ <br /><br />
                집사질문함은 집사님들끼리 간단하게 질의응답을 할 수 있는 게시판입니다. <br />
                병원, 사료, 장난감 등등 다양한 의견을 쉽고 빠르게 얻어보세요! <br /><br />
              냥생상담소는 현재 보호중인 고양이들을 볼 수 있습니다. <br />
              입양 문의는 해당 게시글을 참고해주세요. </p>
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
      </Element>
    </div>

    {/* 배경이미지3 */}
    <div className='backImg'>
      <img src="/images/ilovechococat.jpg" alt="배너3" className='backImg' />
    </div>

    {/* 개인정보, 저작권 등 */}
    <footer>
      <div className='footer-buttons'>
        <a href="https://github.com/bdb252" target='_blank'>
          <button className='button-gyt git'>
            <svg viewBox="0 0 24 24" fill="currentColor"
              height="28" width="28" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
              ></path>
            </svg>
            <span>GitHub</span>
          </button>
        </a>
        <a href="https://youtu.be/mubSnh0LJIM?si=sk0HNkR4nTzHkQdO" target='_blank'>
          <button className='button-gyt youtube'>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="28" height="28"
              fill="currentColor" class="bi bi-twitter" viewBox="0 0 24 24"
            >
              <path
                d="M12.2439 4C12.778 4.00294 14.1143 4.01586 15.5341 4.07273L16.0375 4.09468C17.467 4.16236 18.8953 4.27798 19.6037 4.4755C20.5486 4.74095 21.2913 5.5155 21.5423 6.49732C21.942 8.05641 21.992 11.0994 21.9982 11.8358L21.9991 11.9884L21.9991 11.9991C21.9991 11.9991 21.9991 12.0028 21.9991 12.0099L21.9982 12.1625C21.992 12.8989 21.942 15.9419 21.5423 17.501C21.2878 18.4864 20.5451 19.261 19.6037 19.5228C18.8953 19.7203 17.467 19.8359 16.0375 19.9036L15.5341 19.9255C14.1143 19.9824 12.778 19.9953 12.2439 19.9983L12.0095 19.9991L11.9991 19.9991C11.9991 19.9991 11.9956 19.9991 11.9887 19.9991L11.7545 19.9983C10.6241 19.9921 5.89772 19.941 4.39451 19.5228C3.4496 19.2573 2.70692 18.4828 2.45587 17.501C2.0562 15.9419 2.00624 12.8989 2 12.1625V11.8358C2.00624 11.0994 2.0562 8.05641 2.45587 6.49732C2.7104 5.51186 3.45308 4.73732 4.39451 4.4755C5.89772 4.05723 10.6241 4.00622 11.7545 4H12.2439ZM9.99911 8.49914V15.4991L15.9991 11.9991L9.99911 8.49914Z"
              ></path>
            </svg>
            <span>YouTube</span>
          </button>
        </a>
        <a href="https://x.com/visualscat" target='_blank'>
          <button className='button-gyt twitter'>
            <svg viewBox="0 0 16 16" class="bi bi-twitter" fill="currentColor" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
            </svg>
            <span>Twitter</span>
          </button>
        </a>
      </div>
      <span class="copyright">2025 © hanyi Lee. All rights reserved. </span>
    </footer>
  </>
  )
}

export default Home;