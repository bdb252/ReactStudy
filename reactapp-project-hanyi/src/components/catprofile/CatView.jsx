import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
import { storage } from '../../firestoreConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState } from "react";
import { useEffect } from "react";
import '../css/catboard.css';

function CatView(props) {
  var params = useParams();
  console.log('파라미터', params.no);

  let vi = props.catData.reduce((prev, curr) => {
    if (curr.no === Number(params.no)) {
      prev = curr;
    }
    return prev;
  }, {});

  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    if (vi.filePath) {
      const fileRef = ref(storage, vi.filePath);
      getDownloadURL(fileRef)
        .then((url) => {
          setFileURL(url);
        })
        .catch((err) => {
          console.error('파일 다운로드 URL 얻기 실패', err);
        })
    }
  }, [vi.filePath]);

  return (<>
    <article>
      <h2 className="catlist">게시판-읽기</h2>
      <nav>
        <Link to="/catprofile" className="catlink">목록</Link>&nbsp;
      </nav>
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
            <td colSpan={2} className="tableImg"><img src={vi.img} alt="cat" /></td>
          </tr>
          <tr>
            <td colSpan={2} className='cen'>{vi.contents}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>첨부파일</th>
            <td>
              {
                fileURL ? (
                  <a href={fileURL} target="_blank" rel="noopener noreferrer" download>
                    {vi.filename}
                  </a>
                ) : (
                  <span>첨부파일 없음</span>
                )
              }
            </td>
          </tr>
        </tfoot>
      </table>
    </article>
  </>);
}
export default CatView;