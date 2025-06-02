import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, updateDoc, addDoc, getDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../css/catboard.css';

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

const CommentBtn = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* 댓글 작성 버튼 */}
      <button className="btn btn-yellow" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => props.newOpenModal()}>
        댓글 작성
      </button>
    </div>);
}

function ModalWindow(props) {
  return (<>
    {/* 댓글 작성 Modal */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* 작성자명 입력 상자 추가 */}
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요"
                value={props.iWriter} onChange={(e) => props.setIWriter(e.target.value)} />
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
    props.commentData.map((row) => {
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

// 댓글 입력
// const commentsWrite = async (boardId, writer, contents) => {
//   const commentRef = collection(firestore, "boardData", boardId, "comments");
//   // 댓글 저장
//   await addDoc(commentRef, {
//     writer,
//     contents,
//     regdate: nowDate(),
//     likes: 0
//   });
// }

function BoardView() {
  console.log('firestore', firestore);
  const [showData, setShowData] = useState([]);

  const { id } = useParams();
  const [post, setPost] = useState(null);
  // 게시물 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestore, "boardData", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("해당 문서가 없습니다.");
      }
    };

    fetchPost();
  }, [id]);

  // 게시물 삭제
  const navigate = useNavigate();
  const delete_handler = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(firestore, "boardData", id));
      alert("게시글이 삭제되었습니다.");
      navigate("/board"); // 삭제 후 목록으로 이동
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 댓글-모달창 구현
  const [commentData, setCommentData] = useState([]);
  //입력상자
  const [iWriter, setIWriter] = useState('');
  const [iContents, setIContents] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  //시퀀스
  const [nextVal, setNextVal] = useState(2);

  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      const commentRef = collection(firestore, "boardData", id, "comments");
      const commentSnap = await getDocs(commentRef);
      const comments = commentSnap.docs.map(doc => ({
        ...doc.data(),
        idx: doc.id,
      }));

      setCommentData(comments);
    };
    if (id) {
      fetchComments();
    }
  }, [id]);

  //댓글 작성 및 수정
  const saveComment = async () => {
    if (editIdx === null) { // 댓글 작성
      const commentRef = collection(firestore, "boardData", id, "comments");
      // 댓글을 파이어스토어에 저장
      const docRef = await addDoc(commentRef, {
        writer:iWriter,
        contents:iContents,
        regdate: nowDate(),
        likes: 0
      });
      
      const sysdate = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const newData = {
        idx: docRef.id, writer: iWriter, postdate: sysdate, contents: iContents, likes: 0
      };
      
      setCommentData([...commentData, newData]);
      setNextVal(nextVal + 1);
      // 파이어스토어에 댓글 저장
      // commentsWrite(id, iWriter, iContents);
    }
    else { //댓글 수정
      console.log('editidx', editIdx);
      const ref = doc(firestore, `boardData/${id}/comments`, editIdx.idx);
      await updateDoc(ref, {
        writer: iWriter,
        contents: iContents
      });
      const editData = commentData.map(row => {
        return (row.idx === editIdx.idx) ? { ...row, writer: iWriter, contents: iContents } : row;
      });
      setCommentData(editData);
    }

    setIWriter('');
    setIContents('');
  }

  //좋아요
  const likePlus = (idx) => {
    const newData = commentData.map(row => {
      return (row.idx === idx) ? { ...row, likes: row.likes + 1 } : row;
    });
    setCommentData(newData);
  }

  //댓글삭제
  const deleteComment = async (idx) => {
    if (confirm('댓글을 삭제할까요?')) {
      try {
        await deleteDoc(doc(firestore, `boardData/${id}/comments`, idx));

        const newData = commentData.filter(row => {
          return row.idx !== idx;
        });
        setCommentData(newData);
      }
      catch (error) {
        console.error('삭제 오류', error);
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  }

  //댓글수정
  const editComment = (idx) => {
    console.log(`${idx}번 게시물 수정하기`);
    const editData = commentData.find(row => row.idx === idx);
    if (editData) {
      setIWriter(editData.writer);
      setIContents(editData.contents);
      setEditIdx(editData);
    }
  }

  //댓글 작성을 위해 모달창을 열면 입력폼 초기화
  const newOpenModal = () => {
    setIWriter('');
    setIContents('');
    setEditIdx(null);
  };

  return (<>
    {post && (
      <div className="boardView">
        <h2>자유게시판🐾</h2>
        <nav className="free-nav">
          <Link to='/board'>목록</Link>&nbsp;&nbsp;
          <Link to={'/board/edit/' + id}>수정</Link>&nbsp;&nbsp;
          <button onClick={delete_handler} className="delete-btn">삭제</button>
        </nav>
        <table border='1' className="boardTable">
          <tbody>
            <tr>
              <td>작성자</td>
              <td>{post.writer}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>{post.title}</td>
            </tr>
            <tr>
              <td>날짜</td>
              <td>{post.regdate}</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>{post.contents}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}

    <div className="container mt-4">
      <CommentBtn newOpenModal={newOpenModal} />
      <ModalWindow commentData={commentData} setCommentData={setCommentData}
        saveComment={saveComment}
        iWriter={iWriter} setIWriter={setIWriter}
        iContents={iContents} setIContents={setIContents} />
      <CommentList commentData={commentData} likePlus={likePlus}
        deleteComment={deleteComment} editComment={editComment} />
    </div>
  </>)
}

export default BoardView
