import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"

function CatView(props) {
  var params = useParams();
  console.log('파라미터', params.no);

  let vi = props.catData.reduce((prev, curr) => {
    if (curr.no === Number(params.no)) {
      prev = curr;
    }
    return prev;
  }, {});

  return (<>
    <h2>게시판-읽기</h2>
    <nav>
      <Link to="/catprofile">목록</Link>&nbsp;
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
            <td><img src={vi.img} alt="cat" /></td>
          </tr>
          <tr>
            <td colSpan={2} className='cen'>{vi.contents}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}
export default CatView;