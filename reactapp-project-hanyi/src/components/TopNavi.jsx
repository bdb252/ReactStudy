import { NavLink } from "react-router-dom"

const TopNavi=(props) => {
  return(<>
    <nav>
      <NavLink to='/'>Home</NavLink>&nbsp;&nbsp;
      <NavLink to='/regist'>회원가입</NavLink>&nbsp;&nbsp;
      <NavLink to='/board'>게시판</NavLink>&nbsp;&nbsp;
      <NavLink to='/talk'>실시간 채팅</NavLink>
    </nav>
  </>)
}

export default TopNavi