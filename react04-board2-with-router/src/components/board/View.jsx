import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Delete from "./Delete";

function View(props) {
  /**
  useParams훅
    : 컴포넌트를 라우팅처리할때 중첩된 구조 내에서 :no와 같이 사용된
      파라미터의 값을 읽어올 수 있는 훅. 별도의 인수없이 선언된다.
  */ 
  var params = useParams();
  console.log('파라미터', params.no);
  
  var navigate = useNavigate();
  // console.log('length:', props.boardData.length);
  // console.log('no:', props.no);
  // console.log('nextNo:', params.nextNo);
  /**
  데이터 배열의 크기만큼 반복하여 조건에 맞는 객체를 찾은 후 반환한다. 
  빈 객체를 초기값으로 사용했으므로, 배열의 크기인 N만큼 반복하게 된다.  
  prev의 첫번째 값은 빈 객체.
  curr의 첫번째 값은 데이터 배열의 0번 요소.
  */ 
  let vi = props.boardData.reduce((prev, curr) => {
    if(curr.no===Number(params.no)){
      prev = curr;
    }
    return prev;
  }, {});

  let pageNum = Number(params.no);
  console.log('pageNum:',pageNum);
  let prevNum = 0, nextNum = 0;

  if(pageNum-1===0){
    prevNum = 1;
  }
  else{
    prevNum = Number(params.no)-1;
  }
  if(pageNum+1>props.boardData.length){
    nextNum = props.boardData.length;
  }
  else{
    nextNum = pageNum+1;
  }

  const goPrev=() => {
    const prevNum = (pageNum - 1 === 0) ? 1 : pageNum - 1;
    if (pageNum === 1) {
      alert('첫 번째 페이지입니다.');
    }
    props.navigate("/view/" + prevNum);
    // if(pageNum - 1===0){
    //   prevNum = 1;
    //   window.alert('첫번째 페이지입니다.');
    // }
    // else{
    //   prevNum = Number(params.no) - 1;
    // }
    // console.log('prevNum:',prevNum);
    // navigate("/view/"+prevNum);
  }

  const goNext=() => {
    const nextNum = (pageNum + 1 > props.boardData.length)
      ? props.boardData.length
      : pageNum + 1;
    if (pageNum === props.boardData.length) {
      alert('마지막 페이지입니다.');
    }
    props.navigate("/view/" + nextNum);
    // nextNum = pageNum+1;
    // let isNextNum = props.boardData.reduce((prev,curr) => {
    //   if(curr.no===nextNum){
    //     prev = true;
    //   }
    //   return prev;
    // }, false);
    // if(isNextNum===false){
    //   nextNum = pageNum;
    //   window.alert('다음 페이지가 없습니다.')
    // }
    // console.log('nextNum:',nextNum);
    // navigate("/view/"+nextNum);
  }

  return (<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      <Link to={"/edit/"+params.no}>수정</Link>&nbsp;
      {/* <button onClick={(e)=>{
        e.preventDefault();
        Delete(props);
      }}>삭제</button> */}
      <Link to={'/delete/'+params.no}>삭제</Link>
    </nav>
    <article>
    <table id="boardTable">
      <colgroup>
        <col width="30%" /><col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>작성자</th>
          <td>{vi.writer}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{vi.title}</td>
        </tr>
        <tr>
          <th>날짜</th>
          <td>{vi.date}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>{vi.contents}</td>
        </tr>
      </tbody>
    </table>
    </article>
    <Link to={"/view/"+prevNum} >이전글</Link>
    <Link to={"/view/"+nextNum}>다음글</Link>
    {/* <button onClick={goPrev()}>이전글2</button> */}
    {/* <button onClick={goNext()}>다음글2</button> */}
  </>);
}

export default View