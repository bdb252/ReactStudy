import '../css/Chat.css';
import { realtime, storage } from '../../firestoreConfig';
// 리얼타임을 사용하기 위한 함수 임포트
import { get, ref as realRef, child, set, onValue, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var hour = ("0" + dateObj.getHours()).slice(-2);
  var min = ("0" + dateObj.getMinutes()).slice(-2);
  var sec = ("0" + dateObj.getSeconds()).slice(-2);
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

// 스크롤바를 최하단으로 내려주기 위한 JS함수
const scrollTop = (chatWindow) => {
  console.log('scrollTop호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 사진인지 확인하는 함수
function isImage(message) {
  return typeof message === 'string' && message.startsWith('https://') && (
    message.endsWith('.jpg') ||
    message.endsWith('.jpeg') ||
    message.endsWith('.png') ||
    message.endsWith('.gif') ||
    message.includes('firebasestorage.googleapis.com')
  );
}

// 컴포넌트 정의
function ChatMessage() {
  console.log(realtime);

  // 쿼리스트링으로 전달된 파라미터를 조작할때 사용하는 라우터 훅
  const [searchParams, setSearchParams] = useSearchParams();
  // 방명, 대화명을 파라미터로 얻어온다. 
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  console.log(roomId, userId);
  // 채팅 내역이 보여지는 부분의 DOM 참조
  const chatWindow = useRef();
  // 채팅 데이터 저장용
  const [chatData, setChatData] = useState('');

  // 리얼타임에 대화내역 저장
  function messageWrite(chatRoom, chatId, chatMessage) {
    // 고유키 생성. 데이터 저장시 중복되지 않는 일련번호와 같이 사용된다.  
    console.log('chatMessage:', chatMessage);
    const newPostKey = push(child(realRef(realtime), 'tempValue')).key;
    const time = nowDate();
    set(realRef(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage,
      date: time
    });
    console.log('입력성공');
  }

  /*
  Realtime 리스터 정의. 새롭게 입력된 대화내용을 실시간으로 얻어온다. 
  채팅 내역이 저장된 'room1' 노드를 참조하는 변수를 생성 후 사용한다. 
  */
  useEffect(() => {
    if (!roomId) return;
    const dbRef = realRef(realtime, roomId);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("데이터 있음:", snapshot.val());
        } else {
          console.log("데이터 없음");
        }
      })
      .catch((error) => {
        console.error("Firebase 에러:", error);
      });
  }, [roomId]);

  useEffect(() => {
    const dbRef = realRef(realtime, roomId);
    console.log('onValue 리스너 등록:', roomId);
    // 리스너 생성. 새로운 대화내역이 확인되는 즉시 이벤트가 발생된다. 
    onValue(dbRef, (snapshot) => {
      console.log('onValue 작동');
      // 새로운 메시지 추가시 스크롤바가 최하단으로 이동하지 않는 문제 해결
      // onValue가 작동한 0.1초후에 스크롤바를 내리는 함수를 강제실행한다. 
      setTimeout(() => {
        // 채팅방에 모든 img 태그 가져오기기
        const images = chatWindow.current ? chatWindow.current.querySelectorAll('img') : [];
        // 이미지가 있으면
        if (images.length > 0) {
          // 로딩 완료료된 이미지의 수
          let loadedCnt = 0;
          images.forEach((img) => {
            if (img.complete) {
              loadedCnt++;
            }
            else {
              img.onload = () => {
                loadedCnt++;
                // 로딩 완료된 이미지수 = 이미지 개수
                if (loadedCnt === images.length) {
                  scrollTop(chatWindow.current);
                }
              };
            }
          });
          // 모두 로드된 경우 바로 스크롤
          if (loadedCnt === images.length) {
            scrollTop(chatWindow.current);
          }
        }
        else {
          // 이미지가 없으면 바로 스크롤롤
          scrollTop(chatWindow.current);
        }
      }, 100);

      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // console.log('리스너', childKey, childData.id, userId);

        // 내 메시지
        if (childData.id === userId) {
          // showDiv.push(<div className='myMsg'
          // style={{'textAlign' : 'right'}}>{childData.message}</div>);
          showDiv.push(
            <div className='myMsg' style={{ textAlign: 'right' }}>
              {isImage(childData.message)
                ? <img src={childData.message} alt="uploaded" style={{ maxWidth: '200px' }} />
                : <div className="bubble">{childData.message}</div>}
              <div className="chat-time right">{childData.date}</div>
            </div>
          );
        }
        else {
          // 상대방이 보낸 메시지는 좌측으로 정렬한다. 
          showDiv.push(
            <div className='names'>
              {childData.id} <br />
              <div className='msgs'>
                {isImage(childData.message)
                  ? <img src={childData.message} alt="uploaded" style={{ maxWidth: '200px' }} />
                  : <div className="bubble">{childData.message}</div>}
                {/* : childData.message} */}
                <div className="chat-time left">{childData.date}</div>
                &nbsp;
              </div>
            </div>
          );
        }
      });
      // 스테이트를 변경해서 대화내역을 새롭게 렌더링한다. 
      setChatData(showDiv);
    });
  }, []);

  const stRef = storageRef(storage);
  console.log('storageRef', stRef);

  const imageRef1 = storageRef(storage, 'images1');
  return (<>
    <div>
      <h2 className='chatname'>Realtime 채팅</h2>
      대화명 : {userId}&nbsp;&nbsp;
      {/* X버튼을 누르는 것과 같이 창을 닫아준다. */}
      <button id="closeBtn" onClick={() => { window.self.close(); }}>채팅종료</button>
      {/* 채팅 내역이 출력되는 부분으로 ref를 사용한다. */}
      <div id="chatWindow" ref={chatWindow}>{chatData}</div>
      <div>
        <form className='btn' onSubmit={(e) => {
          e.preventDefault();
          // event의 target속성으로 폼값을 얻어온다. 
          let chatRoom = e.target.chatRoom.value;
          let chatId = e.target.chatId.value;
          // 빈값 검증
          if (chatId === '') {
            alert('대화명을 입력하세요');
            return;
          }
          // 입력한 메시지 얻어오기
          let message = e.target.message.value;
          if (message === '') {
            alert('메세지를 입력하세요');
            return;
          }
          console.log('submit', chatRoom, chatId, message);
          // 입력한 폼값을 정리해서 Realtime에 입력한다. 
          messageWrite(chatRoom, chatId, message);
          // 입력이 완료되면 입력란을 비워준다. 
          e.target.message.value = '';
        }}>
          {/* 룸명과 아이디는 hidden 상자로 표시 */}
          <input type="hidden" name="chatRoom" value={roomId} />
          <input type="hidden" name="chatId" value={userId} />
          {/* 메시지 입력상자와 전송 버튼 표시 */}
          <input type="text" name='message' />
          <button type="submit">전송</button> <br />

          {/* 파일 전송 */}
          <input type="file" name="myfile" onChange={(e) => {
            console.log('files 프로퍼티', e.target.files);

            const imageRef = storageRef(imageRef1, e.target.files[0].name);
            uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
              console.log('업로드 성공', snapshot);
              // 다운로드 URL 얻어오기
              return getDownloadURL(snapshot.ref);
            }).then((url) => {
              console.log('다운로드 URL', url);
              // getDownloadURL로 얻어온 url 사용해서 메시지 입력
              messageWrite(roomId, userId, url);
            })
          }} />
        </form>
      </div>
    </div>
  </>)
}

export default ChatMessage;