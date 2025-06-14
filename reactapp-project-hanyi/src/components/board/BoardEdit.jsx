import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { firestore, storage } from "../../firestoreConfig";
import { doc, setDoc, getDoc, updateDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../css/catboard.css';

function BoardEdit() {
  // 날짜 생성
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    var hour = ("0" + dateObj.getHours()).slice(-2);
    var min = ("0" + dateObj.getMinutes()).slice(-2);
    var sec = ("0" + dateObj.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  }

  const { id } = useParams();
  // 게시물의 제목, 내용, 작성자를 얻기 위해해
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [writer, setWriter] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "boardData", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContents(data.contents);
        setWriter(data.writer);
        setImageUrl(data.imageUrl);
      } else {
        alert("해당 게시물이 존재하지 않습니다.");
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();
  // 수정 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(firestore, "boardData", id), {
      title,
      contents,
      writer,
      imageUrl,
    });
    alert("수정되었습니다.");
    navigate('/board');
  };

  const fileRef1 = ref(storage, 'file1');
  const [fileName, setFileName] = useState('');

  return (<>
    <div className="boardView">
      <h3>게시물 수정하기🐾</h3>
      <nav>
        <Link to="/board">목록</Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <table className="freeTable">
          <tbody>
            <tr>
              <td>제목</td>
              <td>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <input
                  type="text"
                  value={writer}
                  readOnly
                  style={{ backgroundColor: "#eee", cursor: "not-allowed" }}
                />
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <textarea
                  rows="5"
                  cols="40"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>첨부파일</td>
              <td>
                <input type="file" name="myfile" onChange={(e) => {
                  console.log('files 프로퍼티', e.target.files);
                  const imageRef = ref(fileRef1, e.target.files[0].name);
                  uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
                    console.log('업로드 성공', snapshot);
                    setFileName(e.target.files[0].name)
                    return getDownloadURL(snapshot.ref);
                  }).then((url) => {
                    console.log('이미지 url:', url);
                    setImageUrl(url);
                  }).catch((err) => {
                    console.log('업로드 실패', err);
                  });
                }} />
                {fileName && <p>{fileName}</p>}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">수정</button>
      </form>
    </div>
  </>)
}

export default BoardEdit;
