import { useEffect, useState } from "react";

function CommentEdit(props) {
  const [writer, setWriter] = useState(props.writer);
  const [contents, setContents] = useState(props.contents);

  useEffect(()=>{
    if(props.no){
      setWriter(props.writer);
      setContents(props.contents);
    }
  }, [props.no, props.writer, props.contents]);

  return (<>
    <form onSubmit={(e)=>{
      e.preventDefault();

      let no = props.no;
      props.editCommentProcess(no, writer, contents);
    }}>
      {/* <!-- 댓글 작성 Modal -->         */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">댓글 수정</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* <!-- 작성자명 입력 상자 추가 --> */}
              <div className="mb-3">
                <label for="commentAuthorEdit" className="form-label">작성자명</label>
                <input type="text" className="form-control" id="commentAuthorEdit" value={writer}
                  onChange={(e)=>{
                  setWriter(e.target.value);
                }}/>
              </div>
              {/* <!-- 댓글 입력 상자 --> */}
              <label for="commentContentEdit" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContentEdit" rows="3" value={contents}
                 onChange={(e)=>{
                  setContents(e.target.value);
                }}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >수정</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>); 
}

export default CommentEdit
