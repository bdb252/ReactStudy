function CommentList(props) {
  const comment = props.comment;

  return (
    <ul className="list-group mt-3">
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <strong>{comment.writer}</strong> <small className="ms-2">{comment.postdate}</small>
          </div>
          <div>
            <button className="btn btn-outline-success btn-sm" onClick={(e) => {
              props.onChangeLikes(comment.no);
            }}>좋아요 ({comment.likes})</button>
            <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal"
              data-bs-target="#editModal" onClick={(e) => {
                props.onEditComment(comment.no)
              }}>수정</button>
            <button className="btn btn-outline-danger btn-sm" onClick={(e) => {
              if (window.confirm('댓글을 삭제할까요?'))
                props.onDeleteComment(comment.no);
            }}>삭제</button>
          </div>
        </div>
        <p className="mt-2 mb-0">
          {comment.contents}
        </p>
      </li>
    </ul>
  )
}

export default CommentList