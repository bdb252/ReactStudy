import { useContext } from "react";
// 컨텍스트 파일 임포트
import { SimpleContext } from "../context/SimpleContext";

const CompContext2a = () => {
  // 컨텍스트 파일을 인수로 사용해서 useContext 변수 생성
  const contextData = useContext(SimpleContext);
  return (
    <div>
      <h4>Context2a컴포넌트</h4>
      {contextData}
    </div>
  )
}

export default CompContext2a;