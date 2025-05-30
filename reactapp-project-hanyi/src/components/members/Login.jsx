import { setCookie } from "./cookieUtils";

const Login = () => {
  const login_handler = (e) => {
    e.preventDefault();
    const username = e.target.name.value;
    const password = e.target.pass.value;

    if (username === 'tmp' && password === '1234') {
      setCookie('user', username, 1);
      window.location.href = '/';
    }
    else {
      alert('로그인에 실패하였습니다.');
    }
  }

  return (<>
    <h2>로그인</h2>
    <form onSubmit={login_handler}>
      <label htmlFor="username">Username
        <input type="text" name="name" id="username" />
      </label>
      <br />
      <label htmlFor="userpass">Password
        <input type="text" name="pass" id="userpass" />
      </label>
      <button type="submit">로그인</button>
    </form>
  </>
  )
}

export default Login;