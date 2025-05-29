import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";

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

  return (<>
    {post && (
      <div className="App">
        <h2>자유게시판</h2>
        <nav>
          <Link to='/board'>목록</Link>&nbsp;&nbsp;
          <Link to='edit'>수정</Link>&nbsp;&nbsp;
          <Link to='delete'>삭제</Link>
        </nav>
        <table border='1' className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>제목</th>
              <th>내용</th>
              <th>이름</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
            <p>작성자: {post.writer}</p>
            <p>날짜: {post.regdate}</p>
          </tbody>
        </table>
      </div>
    )}
  </>)
}

export default BoardView
