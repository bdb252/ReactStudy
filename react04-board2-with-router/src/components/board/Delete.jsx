import { Link, useParams } from "react-router-dom"

function Delete(props) {
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  // const navigate = useNavigate();

  var params = useParams();
  let pno = params.no;
  let newBoardData = [];

  for(let i = 0; i<boardData.length; i++){
    if(pno!=boardData[i].no){
        newBoardData.push(boardData[i]);
    }
  }
  setBoardData(newBoardData);
  navigate('/list');
}

export default Delete
