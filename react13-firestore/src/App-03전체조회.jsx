import { useState } from "react";
import { firestore } from "./firestoreConfig";
import {getDocs, collection} from "firebase/firestore";

function App() {
  // 파이어스토어 데이터를 저장할 스테이트 정의. 초기값은 빈 배열로 설정
  const [showData, setShowData] = useState([]);

  // 데이터 불러오기
  const getCollection = async()=>{
    let trArray = [];
    // 컬렉션명으로 하위 도큐먼트를 읽어온다.
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id,'=>',doc.data());
      // 콜백된 객체(doc)를 기반으로 data()함수를 호출하여 실제데이터 얻기
      let memberInfo = doc.data();
      console.log('파싱', doc.id, memberInfo.pass, memberInfo.name, memberInfo.regdate);
      // tr태그로 출력할 항목 구성
      trArray.push(
        <tr key={doc.id}>
          <td className="cen">{doc.id}</td>
          <td className="cen">{memberInfo.pass}</td>
          <td className="cen">{memberInfo.name}</td>
          <td className="cen">{memberInfo.regdate}</td>
        </tr>
      )
    })
    // 파싱된 데이터를 통해 스테이트 변경 및 리렌더링
    setShowData(trArray);
  }

  return (<>
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>전체조회하기</h3>
      <button type="button" onClick={getCollection}>전체조회</button>
        <table border='1' className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>아이디</th>
              <th>비밀번호</th>
              <th>이름</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {/* 상단에서 구성한 데이터를 여기서 출력 */}
            {showData}
          </tbody>
        </table>
    </div>
  </>)
}

export default App
