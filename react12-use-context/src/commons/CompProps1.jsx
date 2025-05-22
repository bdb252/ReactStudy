import CompState2 from './CompProps2'

// 부모에서 전달된 2개의 프롭스를 개별 매개변수로 받아서 사용
const CompProps1 = ({propData, myNumber}) => {
  return(
    <div>
      <h4>Props1 컴포넌트</h4>
      {propData} 
      <CompState2 propData2={propData} myNumber={myNumber}></CompState2>
    </div>
  )
}

export default CompProps1;