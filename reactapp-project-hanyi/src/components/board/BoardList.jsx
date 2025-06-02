import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, setDoc, query, getDocs, collection, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import '../css/catboard.css';

function BoardList() {
  const [boardData, setBoardData] = useState([]);
  // 데이터 불러오기
  const getCollection = async () => {
    const q = query(collection(firestore, "boardData"), orderBy('regdate', 'desc'));

    const querySnapshot = await getDocs(q);
    // 페이징을 할 때에는 tr태그가 아닌 게시물 객체 배열을 저장해야 함
    const loadData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBoardData(loadData);
  };

  useEffect(() => {
    getCollection();
  }, []);

  // 페이징 기능
  const postPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // 총 게시물, 페이지 수 계산
  const totalPosts = boardData.length;
  const totalPages = Math.ceil(totalPosts / postPerPage);

  // 현재 페이지에 표시할 데이터
  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentPost = boardData.slice(indexFirstPost, indexLastPost);

  const lists = currentPost.map((row) => (
    <tr key={row.id}>
      <td className="cen">{row.writer}</td>
      <td className="cen">
        <Link to={'view/' + row.id} className="catlink">{row.title}</Link>
      </td>
      <td className="cen">{row.regdate}</td>
    </tr>
  ));

  // 페이지 번호 배열 만들기
  const pageNums = [];
  for (var i = 1; i <= totalPages; i++) {
    pageNums.push(i);
  }

  return (<>
    <article >
      <h2>자유게시판🐾</h2>
      <nav className="free-nav">
        <Link to='write'>글쓰기</Link>
      </nav>
      <table border='1' className="boardTable">
        <thead>
          <tr className="text-center">
            <th>이름</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>

      {/* 페이징 */}
      <div className="paging">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>이전</button>
        {pageNums.map(num => (
          <button key={num} onClick={() => setCurrentPage(num)} className={currentPage === num ? 'active' : ''}>
            {num}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>다음</button>
      </div>
    </article>
  </>)
}

export default BoardList
