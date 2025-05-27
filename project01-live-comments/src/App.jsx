import { useState } from "react"

import CommentModalWindow from "./components/commentModalWindow";
import CommentList from "./components/commentsList";
import CommentsView from "./components/commentsView";
import CommentBtn from "./components/commentBtn";
import CommentEdit from "./components/commentEdit";

const nowDate=() => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0"+(1+dateObj.getMonth())).slice(-2);
  var day = ("0"+dateObj.getDate()).slice(-2);
  var hour = ("0"+dateObj.getHours()).slice(-2);
  var min = ("0"+dateObj.getMinutes()).slice(-2);
  var sec = ("0"+dateObj.getSeconds()).slice(-2);
  return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
}

function App() {
  const [commentData, setCommentData] = useState([
    {
      no : 1, writer:'낙자쌤', postdate:'2025-05-27',
      contents:'내용브랄라랄', likes:10,
    }
  ]);
  const [nextNo, setNextNo] = useState(2);
  const [editTarget, setEditTarget] = useState(null);

  const likesChangeProcess=(commentNo) => {
    let copyComments = [...commentData];
    copyComments.forEach((row)=>{
      if(row.no===commentNo){
        row.likes++;
      }
    })
    setCommentData(copyComments);
  }
  
  const deleteCommentProcess=(commentNo) => {
    console.log('삭제no', commentNo);
    let newCommentData = commentData.reduce((prev, curr) => {
      if(curr.no != commentNo){
        prev.push(curr);
      }
      return prev;
    }, []);
    setCommentData(newCommentData);
  }

  const editCommentProcess=(no, writer, contents) => {
    console.log('수정', no, writer, contents);
    let newCommentData = commentData.map((row)=>{
      if(row.no === no){
        return {...row, writer, contents};
      }
      return row;
    });
    setCommentData(newCommentData);
  }

  return (<>
    <div className="container mt-4">
      <CommentsView></CommentsView>
      <CommentBtn></CommentBtn>
      <CommentModalWindow commentData={commentData} setCommentData={setCommentData}
      nowDate={nowDate} nextNo={nextNo} setNextNo={setNextNo} />{
        commentData.map((commentRow)=>(
          <CommentList comment={commentRow} key={commentRow.no} 
            onChangeLikes={likesChangeProcess}
            onDeleteComment={deleteCommentProcess}
            onEditComment={() => setEditTarget(commentRow)}
            />
          ))
        }
        {editTarget && (
          <CommentEdit no={editTarget.no} writer={editTarget.writer}
            contents={editTarget.contents} editCommentProcess={editCommentProcess}></CommentEdit>
        )}
    </div>  
  </>)
}

export default App
