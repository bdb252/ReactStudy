import { Link } from "react-router-dom"

function List(props) {
  return (<>
    <header>
      <h2>게시판-목록</h2>
    </header>
    <nav>
      <Link to="/write">글쓰기</Link>
    </nav>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cen">1</td>
            <td><Link to="/view">오늘은 React 공부하는 날</Link></td>
            <td class="cen">낙자쌤</td>
            <td class="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>)
}

export default List