function Header(props){
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

function Nav(props) {
  return (
    <nav>
      <a href="/" onClick={function(event){
        // a태그는 화면의 깜빡임이 있으므로 이벤트를 차단
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}

function Article(props) {
  const lists = [];
  for(let i=0; i<props.boardData.length; i++){
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={(event) => {
          event.preventDefault();
          // 각 게시물의 일련번호를 인수로 전달(화면전환도 같이)
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    )
  }
  return (
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  )
}
function App() {
  const boardData = [
    {no:1, title:'오늘은 React 공부하는날', writer:'낙자쌤', date:'2023-01-01',
      contents:'React를 뽀개봅시다'},
    {no:2, title:'어제는 Javascript 공부', writer:'유겸이', date:'2023-03-03',
      contents:'Javascript는 할게 너무 많아요'},
    {no:3, title:'내일은 project해야지', writer:'개똥벌레', date:'2023-05-05',
      contents:'project뭐만들지'}
  ];
  return (
  <div className="App">
    <Header title="게시판-목록(props)"></Header>
    {/* Nav컴포넌트는 매개변수가 없는 함수를 프롭스로 전달 */}
    <Nav onChangeMode={function(){
      alert('글쓰기 페이지로 이동');
    }}></Nav>
    {/* 게시물의 일련번호를 전달해야 하므로, 매개변수가 있는 함수를 프롭스로 전달한다. */}
    <Article boardData={boardData} onChangeMode={(no) => {
      alert('선택한 게시물 번호:'+no);
    }}></Article>
  </div>
  );
}

export default App
