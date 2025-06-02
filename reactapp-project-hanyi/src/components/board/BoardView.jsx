import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, setDoc, getDoc, deleteDoc, collection } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../css/catboard.css';

function BoardView() {
  console.log('firestore', firestore);
  const [showData, setShowData] = useState([]);

  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestore, "boardData", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("해당 문서가 없습니다.");
      }
    };

    fetchPost();
  }, [id]);

  const navigate = useNavigate();
  const delete_handler = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(firestore, "boardData", id));
      alert("게시글이 삭제되었습니다.");
      navigate("/board"); // 삭제 후 목록으로 이동
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };
  
  return (<>
    {post && (
      <div className="boardView">
        <h2>자유게시판🐾</h2>
        <nav className="free-nav">
          <Link to='/board'>목록</Link>&nbsp;&nbsp;
          <Link to={'/board/edit/' + id}>수정</Link>&nbsp;&nbsp;
          <button onClick={delete_handler} className="delete-btn">삭제</button>
        </nav>
        <table border='1' className="boardTable">
          <tbody>
            <tr>
              <td>작성자</td>
              <td>{post.writer}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>{post.title}</td>
            </tr>
            <tr>
              <td>날짜</td>
              <td>{post.regdate}</td>
            </tr>
            <tr>
              <td colSpan={2} style={{textAlign:"center"}}>{post.contents}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </>)
}

export default BoardView
