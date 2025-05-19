import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';

function Edit(props) {
  // 페이지 이동을 위한 훅 사용
  const navigate = useNavigate();
  let params = useParams();
  // let pidx=params.idx;
  console.log('idx:', params.idx);

  // let [boardData, setBoardData] = useState({});
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx="+params.idx+"&apikey=217d69dfbaa9710acab6a70ffa1ca019";
  // 수정을 위한 State
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(function(){
    fetch(requestUrl+"?"+parameter)
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        // setBoardData(json);
        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });
    return () =>{
      console.log('useEffect실행==>컴포넌트 언마운트');
    }
  }, []);

  return (<>
    <header>
      <h2>게시판-수정</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
    <form onSubmit={
      (event)=>{
        event.preventDefault();
        // 입력한 폼값 읽어오기
        let i = event.target.idx.value;
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;
        console.log(w, t, c);

        // 작성 API 호출
        /* fetch함수를 통해 post방식으로 요청을 해야하는 경우 두번째 인수가 필요하다. */ 
        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
          method: 'POST',
          headers:{
            'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          /*
            3. 작성자가 입력한 폼값을 JSON형식으로 조립하여 전송한다. 
             URLSearchParams객체는 JSON 형식의 데이터를 쿼리스트링 형식으로 변환해준다. 
           */ 
          body : new URLSearchParams({
            id:'jsonAPI',
            tname:'nboard_news',
            idx: i,
            name:w,
            subject:t,
            content:c,
            apikey : '217d69dfbaa9710acab6a70ffa1ca019',
          }),
        })
        .then((response)=>response.json())  
        .then((json)=>console.log(json));

        // 글쓰기가 완료되면 목록으로 이동한다. 
        navigate("/list");
      }
    }>
      <input type="hidden" name="idx" value={params.idx} />
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer" value={writer} 
            onChange={(event)=>{
              setWriter(event.target.value);
            }}/></td>
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
  </>);
}

export default Edit
