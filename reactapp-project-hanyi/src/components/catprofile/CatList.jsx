import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/catboard.css';

function CatList(props) {
  // 페이징 기능
  const postPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  
  // 총 게시물, 페이지 수 계산
  const totalPosts = props.catData.length;
  const totalPages = Math.ceil(totalPosts / postPerPage);
  
  // 현재 페이지에 표시할 데이터
  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentPost = props.catData.slice(indexFirstPost, indexLastPost)
  
  // 목록
  const lists = currentPost.map((row)=>(
      <tr key={row.no}>
        <td className="cen">
          <img src={row.img} alt={row.title} className="cat-img"/></td>
        <td className="cen"><Link to={"nyaong/"+row.no} className="catlink">
        {row.title}</Link></td>
        {/* <td className="cen">{row.writer}</td> */}
        <td className="cen">{row.date}</td>
      </tr>
  ));
  
  // 페이지 번호 배열 만들기
  const pageNums = [];
  for(var i = 1; i<= totalPages; i++){
    pageNums.push(i);
  }

  return (<>
    <article>
    <h2 className="catlist">유기묘 이야기</h2>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>

      {/* 페이징 기능*/}
      <div className="paging">
        {/* 이전 버튼 */}
        <button onClick={() => 
        setCurrentPage((prev) => Math.max(prev-1, 1))}
          disabled={currentPage === 1}
        >이전</button>
        {/* 페이지 넘버 */}
        {pageNums.map((num)=>(
          <button key={num} onClick={() => setCurrentPage(num)}
          className={currentPage === num ? 'active' : '' }>
            {num}
          </button>
        ))}
        {/* 다음 버튼 */}
        <button onClick={() =>
          setCurrentPage((next) => Math.min(next+1, totalPages))}
          disabled={currentPage === totalPages}
        >다음</button>
      </div>
    </article>
  </>)
}
export default CatList;