import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import '../css/freeboard.css';
function BoardList() {
  console.log('firestore', firestore);
  // 파이어스토어 데이터를 저장할 스테이트
  const [showData, setShowData] = useState([]);

  // 데이터 불러오기
  const getCollection = async () => {
    let trArray = [];
    // 컬렉션명으로 하위 도큐먼트를 읽어온다.
    const querySnapshot = await getDocs(collection(firestore, "boardData"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id,'=>',doc.data());
      // 콜백된 객체(doc)를 기반으로 data()함수를 호출하여 실제데이터 얻기
      let boardInfo = doc.data();
      // console.log('파싱', doc.id, boardInfo.writer, boardInfo.contents, boardInfo.regdate);
      // tr태그로 출력할 항목 구성
      trArray.push(
        <tr key={doc.id}>
          {/* <td className="cen">{doc.id}</td> */}
          <td className="cen"><Link to={'view/'+doc.id}>{boardInfo.title}</Link></td>
          <td className="cen">{boardInfo.writer}</td>
          <td className="cen">{boardInfo.regdate}</td>
        </tr>
      )
    })
    // 파싱된 데이터를 통해 스테이트 변경 및 리렌더링
    setShowData(trArray);
  }

  useEffect(() => {
    getCollection();
  }, []);

  return (<>
    <div className="App">
      <h2>자유게시판</h2>
      <nav className="free-nav">
        <Link to='write'>글쓰기</Link>
      </nav>
      <table border='1' className="freeTable">
        <thead>
          <tr className="text-center">
            <th>제목</th>
            <th>이름</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {showData}
        </tbody>
      </table>
    </div>
  </>)
}

export default BoardList
