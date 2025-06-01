import { useRef } from "react";
import '../css/Chat.css';

const ChatStart = () => {
  const refRoom = useRef();
  const refId = useRef();

  const openChatWin = () => {
    window.open(`test2/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=500,height=700');
  }

  return (<div className="chattingStart">
    <h2>실시간 채팅</h2>

    <div className="inputRow">
      <label>채팅방 :&nbsp;</label>
      <input type="text" name='roomId' value="room1" ref={refRoom} readOnly />
    </div>
    <div className="inputRow">
      <label>사용자 :&nbsp;</label>
      <input type="text" name='userId' ref={refId} /> <br />
    </div>
    <button type="button" onClick={openChatWin}>채팅시작</button>
  </div>)
}

export default ChatStart;