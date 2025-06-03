import { setCookie } from "./cookieUtils";
import { useNavigate } from "react-router-dom";

// 로그인창
const Login = () => {
  const navigate = useNavigate();

  const login_handler = (e) => {
    e.preventDefault();
    const username = e.target.name.value;
    const password = e.target.pass.value;
    // 로컬스토리지에서 'user'라는 키로 저장된 값을 꺼내와서 JSON.parse()로 객체로 변환
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // 로컬스토리지에 저장된 아이디, 비밀번호와 로그인 창에서 입력한 아이디, 비밀번호가 같으면 로그인 성공
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      // 쿠키에 사용자 저장
      setCookie('user', username, 1);
      navigate('/');
    }
    else {
      alert('로그인에 실패하였습니다.');
    }
  }

  return (
  <div className="login-container">
    <h2>로그인</h2>
    <form onSubmit={login_handler}>
      <label htmlFor="username">Username
        <input type="text" name="name" id="username" />
      </label>
      <br />
      <label htmlFor="userpass">Password
        <input type="text" name="pass" id="userpass" />
      </label>
      <br />
      <button type="submit">로그인</button>
    </form>
  </div>
  )
}

export default Login;