import { useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import '../css/freeboard.css';
import '../css/blackcatView.css';
function BoardWrite() {
  console.log('firestore', firestore);
  const navigate = useNavigate();

  // 오늘의 날짜를 만들기 위한 함수
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

  // 게시물 입력
  const memberWrite = async (p_collection, p_title, p_contents, p_writer) => {
    // doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS 객체로 정보 추가
    await addDoc(collection(firestore, p_collection), {
      title: p_title,
      contents: p_contents,
      writer: p_writer,
      regdate: nowDate(),
    });
    console.log('입력성공');
  }

  // 컬렉션명 수정을 위한 스테이트
  const [collName, setCollName] = useState('boardData');
  return (<>
    <div className="boardView">
      <h2>자유게시판🐾</h2>
      <h3>글쓰기</h3>
      <Link to='/board'>목록</Link>
      <form onSubmit={(event) => {
        event.preventDefault();

        // 폼값 얻기
        let collection = event.target.collection.value;
        let title = event.target.title.value;
        let contents = event.target.contents.value;
        let writer = event.target.writer.value;

        // 폼값에 빈값있는지 검증
        if (title === '') { alert('제목을 입력하세요'); return; }
        if (contents === '') { alert('내용 입력하세요'); return; }
        if (writer === '') { alert('이름을 입력하세요'); return; }
        // 회원정보추가
        memberWrite(collection, title, contents, writer);

        // 다음 입력을 위해 입력폼을 비워준다. 
        event.target.title.value = '';
        event.target.contents.value = '';
        event.target.writer.value = '';

        navigate("/board");
      }}>
        <table border='1' className="freeTable">
          <tbody>
            <tr>
              <td>컬렉션(테이블)</td>
              {/* value속성에 문자열을 추가하면 readonly속성으로 렌더링되어
            값을 수정할 수 없게된다. 이런경우 onChange이벤트리스너를 통해
            스테이트를 수정하는 방식으로 변경해야 한다.  */}
              <td><input type="text" name="collection" value={collName}
                onChange={(e) => {
                  setCollName(e.target.value);
                }} /></td>
            </tr>
            <tr>
              <td>제목</td>
              <td><input type="text" name="title" /></td>
            </tr>
            <tr>
              <td>내용</td>
              <td><input type="text" name="contents" /></td>
            </tr>
            <tr>
              <td>작성자</td>
              <td><input type="text" name="writer" /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">글쓰기</button>
      </form>
    </div>
  </>)
}

export default BoardWrite
