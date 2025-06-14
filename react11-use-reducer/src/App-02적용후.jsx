import { useReducer, useState } from "react"

/**
useReducer
:useState와 유사하게 상태를 관리한다. 단 여러개의 하위값을 가진
스테이트를 관리할때 유용하다. 또한 컴포넌트에서 상태를 업데이트하는
로직을 분리할 수 있다.
형식]
  Dispatch(Action)==>Reducer(prevState, Action)
  디스패치를 통해 리듀서함수를 실행하고, 파라미터로 전달된 액션을
  분석해서 스테이트를 업데이트한다. 
*/ 

/**
Reducer함수 : 스테이트를 업데이트하는 역할의 함수로 Redux의 Store와 유사하다. 
  매개변수의 첫번째는 현재상태, 두번째는 상태변경을 위한 객체를 전달받는다. 
*/ 
const countReducer=(prevCount, action) => {
  /**
  매개변수로 전달된 Action 객체를 분석해서 스테이트를 변경한 후 반환한다.  
  */ 
  if(action.mode==='up'){
    return prevCount + action.number;
  }
  else if(action.mode === 'down'){
    return prevCount - action.number;
  }
  else if(action.mode === 'reset'){
    return 0;
  }
}

function App() {
  /**
  useRecuder 훅 사용
  형식]
    [State변수명, Dispatch 함수] = useReducer(Reducer함수명, 초기값);
    디스패치 함수 호출을 통해 리듀서 함수를 실행한다.  
    변수 count의 초기값은 0으로 설정한다. 
  */ 
  const [count, countDispatch] = useReducer(countReducer, 0);
  // 입력상자의 증가치 변경을 위한 스테이트와 함수 정의
  const [number, setNumber] = useState(1);
  // 입력상자의 onChange이벤트리스너에서 호출
  const changeNumber=(event) => {
    setNumber(Nymber(event.target.value));
  }

  /**
  각 버튼을 누르면 디스패치를 통해 리듀서함수를 호출한다. 
  인수로 전달되는 객체를 Action이라고하고, 이를 분석해서 증가, 감소, 리셋
  3가지로 스테이트를 변경한다.  
  */ 
  const down=() => {
    countDispatch({mode: 'down', number:number});
  }
  const up=() => {
    countDispatch({mode: 'up', number:number});
  }
  const reset=() => {
    countDispatch({mode: 'reset', number:number});
  }

  return (
    <div>
      <h2>useReducer 훅 사용하기</h2>
      <div>
        <input type="button" value="-" onClick={down} />
        <input type="button" value="0" onClick={reset} />
        <input type="button" value="+" onClick={up} />
        <input type="number" value={number} onClick={changeNumber} />
        <span>{count}</span>
      </div>
    </div>
  )
}

export default App
