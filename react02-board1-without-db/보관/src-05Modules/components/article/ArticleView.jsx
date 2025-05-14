function ArticleView() {
  return(
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%"/><col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React 공부하는날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <th>2023-05-05</th>
          </tr>
          <tr>
            <th>내용</th>
            <th>열심히 해봅시당 <br /> 열공합시당</th>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

export default ArticleView
