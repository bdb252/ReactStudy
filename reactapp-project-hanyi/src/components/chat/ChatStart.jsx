import { useRef, useState, useEffect } from "react";
import '../css/Chat.css';
import { getCookie } from "../members/cookieUtils";

const ChatStart = () => {
  const refRoom = useRef();
  const refId = useRef();

  const openChatWin = () => {
    window.open(`#/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=500,height=700');
  }

  // 로그인 되어있으면 작성자가 자동으로
  const [idData, setIdData] = useState('');
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData) {
      console.log('아이디', storedData.username);
      setIdData(storedData.username);
    }
  }, []);
  const user = getCookie('user');
  
  return (<div className="chattingStart">
    <h2>실시간 채팅🐾</h2>

    <div className="inputRow">
      <label>채팅방 :&nbsp;</label>
      <input type="text" name='roomId' value="room1" ref={refRoom} readOnly />
    </div>
    <div className="inputRow">
      <label>사용자 :&nbsp;</label>
      {user ?
        <input type="text" name="userId" value={idData} readOnly />
        :
        <input type="text" name='userId' ref={refId} />
      }
    </div>
    <br />
    <button type="button" onClick={openChatWin}>채팅시작</button>
  </div>)
}

export default ChatStart;