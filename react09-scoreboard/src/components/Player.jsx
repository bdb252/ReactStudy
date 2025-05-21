import { useState } from 'react';
import Counter from '../components/Counter';
import EditPlayerForm from './EditPlayerForm';

export default function Player(props) {
  let row = props.playerData;

  // 수정폼을 보임/숨김 처리를 위한 스테이트
  const [showEdit, setShowEdit] = useState(false);
  let editForm;
  if(showEdit === false){
    // false일때는 빈값을 할당해서 숨김처리
    editForm='';
  }
  else{
    // true일때는 컴포넌트를 할당해서 보임처리
    editForm = <EditPlayerForm playerName={row.name} playerIdx={row.idx}
    onEditPlayer={props.onEditPlayer}
    showEdit={showEdit} setShowEdit={setShowEdit} />
  }

  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => {
          // 삭제버튼을 누르면 confirm으로 확인 후 함수를 호출한다. 
          if(window.confirm('플레이어를 삭제할까요?')){
            props.onDeletePlayer(row.idx);}}}> x </button>
        <a href="/" onClick={(e)=>{
          e.preventDefault();
          setShowEdit(!showEdit);
        }}>{row.name}</a>
      </span>
      {/* App컴포넌트에서 전달받은 함수를 자식 컴포넌트로 재전달한다.  */}
      <Counter idx={row.idx} score={row.score} onChangeScore={props.onChangeScore} />
    </div>
    {/* 각 선수마다 하위에는 수정폼이 추가된다. 이름을 누를때마다 토글된다. */}
    {editForm}
  </>);
}