import {useRef} from "react";

function CommentModalWindow(props) {
  const commentData = props.commentData;
  const setCommentData = props.setCommentData;
  const nowDate = props.nowDate;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;

  const writerRef = useRef(null);
  const contentRef = useRef(null);

  return (<>
    {/* <!-- 댓글 작성 Modal -->         */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* <!-- 작성자명 입력 상자 추가 --> */}
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요"
              ref={writerRef} />
            </div>
            {/* <!-- 댓글 입력 상자 --> */}
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"
              ref={contentRef}></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="submit" className="btn btn-primary" onClick={(e)=>{
              e.preventDefault();

              const w = writerRef.current.value;
              const c = contentRef.current.value;
              let addCommentData = {no:nextNo, writer:w, postdate:nowDate(),
                contents:c, likes:0};
              setCommentData([...commentData, addCommentData]);
              setNextNo(nextNo+1);

              writerRef.current.value='';
              contentRef.current.value='';
            }} data-bs-dismiss="modal" >작성</button>
          </div>
        </div>
      </div>
    </div>
  </>); 
}

export default CommentModalWindow