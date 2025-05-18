import { Link, useParams } from "react-router-dom"
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Edit(props) {
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  // const navigate = useNavigate();
  const nowDate = props.nowDate;

  var params = useParams();
  console.log('파라미터:',params.no);
  let pno = Number(params.no);

  let vi = boardData.reduce((prev, curr) => {
    if(curr.no===pno){
      prev = curr;
    }
    return prev;
  }, {});

  const [title, setTitle] = useState(vi.title);
  const [writer, setWriter] = useState(vi.writer);
  const [contents, setContents] = useState(vi.contents);

  return (<>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
    <form onSubmit={(event)=>{
      // submit이벤트차단
      event.preventDefault();
      // 이벤트 객체의 target속성으로 DOM의 입력값을 읽어옴
      let w = event.target.writer.value;
      let t = event.target.title.value;
      let c = event.target.contents.value;

      // 스테이트, 폼값, 함수의 반환값으로 새롭게 추가할 객체 생성
      let editBoardData = {no:pno, writer:w, title:t,
        contents:c, date:nowDate()};
      // 기존 데이터의 복사본을 생성
      let copyBoardData = [...boardData];
      for(let i = 0; i<copyBoardData.length; i++){
        if(copyBoardData[i].no===pno){
          copyBoardData[i] = editBoardData;
          break;
        }
      }
      setBoardData(copyBoardData);
      navigate("/list");
    }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer" value={writer} 
              onChange={(event)=>{
                setWriter(event.target.value);
              }} /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title" value={title} 
              onChange={(event)=>{
                setTitle(event.target.value);
              }}/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols="22" rows="3" value={contents} 
              onChange={(event)=>{
                setContents(event.target.value);
              }}></textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="전송" />
    </form>
    </article>
  </>)
}

export default Edit
