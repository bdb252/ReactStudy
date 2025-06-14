import { useState, useEffect } from "react";
import { getCookie } from "./members/cookieUtils";

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

function BoardView() {
  return (<>
    {/* 게시판 열람 */}
    <div className="card mb-4">
      <div className="card-body">
        <h2>집사 질문함</h2>
        <p className="card-text" style={{ textAlign: 'center' }}>
          자유롭게 댓글로 소통할 수 있는 공간입니다! <br />
          사담은 자제해주세요:)
        </p>
      </div>
    </div>
  </>);
}

const CommentBtn = (props) => {
  const openModal = () => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored?.username) {
      props.setIWriter(stored.username);
    }
  };
  return (
    <div style={{ textAlign: 'center' }}>
      {/* 댓글 작성 버튼 */}
      <button className="btn btn-yellow" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => openModal()}>
        질문 작성
      </button>
    </div>);
}

function ModalWindow(props) {
  // 로그인 되어있으면 작성자가 자동으로
  const [idData, setIdData] = useState('');
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData) {
      console.log('아이디', storedData.username);
      setIdData(storedData.username);
      if (user) {
        props.setIWriter(storedData.username);
      }
    }
  }, []);
  const user = getCookie('user');
  return (<>
    {/* 댓글 작성 Modal */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">질문 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* 작성자명 입력 상자 추가 */}
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                {user ?
                  <input type="text" className="form-control" value={idData} readOnly />
                  :
                  <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요"
                    value={props.iWriter} onChange={(e) => props.setIWriter(e.target.value)} />
                  // <input type="text" name="writer"/>
                }
            </div>
            {/* 댓글 입력 상자*/}
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"
              value={props.iContents} onChange={(e) => props.setIContents(e.target.value)}></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" className="btn btn-yellow" onClick={props.saveComment} data-bs-dismiss="modal">작성</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}

function CommentList(props) {
  return (<>{
    props.boardData.map((row) => {
      return (
        <ul className="list-group mt-3" key={Math.random()}>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <strong>{row.writer}</strong> <small className="ms-2">{row.postdate}</small>
              </div>
              <div>
                <button className="btn btn-outline-success btn-sm" onClick={() => props.likePlus(row.idx)}>좋아요 ({row.likes})</button>
                <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => props.editComment(row.idx)}>수정</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => props.deleteComment(row.idx)}>삭제</button>
              </div>
            </div>
            <p className="mt-2 mb-0">
              {row.contents}
            </p>
          </li>
        </ul>
      )
    })
  }</>);
}

// qna화면은 모달로만 구성
const QnaModal = () => {
  const [boardData, setBoardData] = useState([
    {
      idx: 1, writer: '자바', postdate: '2025-05-05', contents: '강남 고양이 병원 추천해주세요!!',
      likes: 0
    },
    {
      idx: 2, writer: '돼지', postdate: '2025-05-06', contents: '다이어트 사료 뭐가 좋을까요?',
      likes: 0
    },
    {
      idx: 3, writer: '바보', postdate: '2025-05-16', contents: '고양이가 자꾸 제 손을 물어요',
      likes: 0
    },
    {
      idx: 4, writer: '파파고', postdate: '2025-05-26', contents: '고양이가 하는말을 못알아듣겠어요',
      likes: 0
    },
  ]);

  //입력상자
  const [iWriter, setIWriter] = useState('');
  const [iContents, setIContents] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  //시퀀스
  const [nextVal, setNextVal] = useState(2);

  //댓글 작성 및 수정
  const saveComment = () => {

    if (editIdx === null) { // 댓글 작성
      const sysdate = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const newData = {
        idx: nextVal, writer: iWriter, postdate: sysdate, contents: iContents, likes: 0
      };
      setBoardData([...boardData, newData]);
      //
      setNextVal(nextVal + 1);
    }
    else { //댓글 수정
      const editData = boardData.map(row => {
        return (row.idx === editIdx) ? { ...row, writer: iWriter, contents: iContents } : row;
      });
      setBoardData(editData);
    }

    setIWriter('');
    setIContents('');
  }

  //좋아요
  const likePlus = (idx) => {
    const newData = boardData.map(row => {
      return (row.idx === idx) ? { ...row, likes: row.likes + 1 } : row;
    });
    setBoardData(newData);
  }

  //댓글삭제
  const deleteComment = (idx) => {
    if (confirm('댓글을 삭제할까요?')) {
      const newData = boardData.filter(row => {
        return row.idx !== idx;
      });
      setBoardData(newData);
    }
  }

  //댓글수정
  const editComment = (idx) => {
    console.log(`${idx}번 게시물 수정하기`);
    const editData = boardData.find(row => row.idx === idx);
    if (editData) {
      setIWriter(editData.writer);
      setIContents(editData.contents);
      setEditIdx(idx);
    }
  }

  //댓글 작성을 위해 모달창을 열면 입력폼 초기화
  const newOpenModal = () => {
    setIWriter('');
    setIContents('');
    setEditIdx(null);
  };

  return (<>
    <div className="container mt-4">
      <BoardView />
      <CommentBtn newOpenModal={newOpenModal} setIWriter={setIWriter}/>
      <ModalWindow boardData={boardData} setBoardData={setBoardData}
        saveComment={saveComment}
        iWriter={iWriter} setIWriter={setIWriter}
        iContents={iContents} setIContents={setIContents} />
      <CommentList boardData={boardData} likePlus={likePlus}
        deleteComment={deleteComment} editComment={editComment} />
    </div>
  </>);
};

export default QnaModal;