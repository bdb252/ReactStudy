function Regist(props) {
  return (<>
    <div class="container">
    <h2>회원가입</h2>
    <form class="signup-form" id="signupForm">
      
      <label for="username">아이디</label>
      <div class="flex-group">
        <input type="text" id="username" name="username" required />
        <button type="button" id="checkUsernameBtn">중복확인</button>
      </div>
      <small id="usernameStatus" class="status-msg"></small>

      <label for="password">비밀번호</label>
      <input type="password" id="password" name="password" required />

      <label for="confirmPassword">비밀번호 확인</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required />

      <label for="name">이름</label>
      <input type="text" id="name" name="name" required />

      <label>이메일</label>
      <div class="flex-group">
        <input type="text" id="emailId" placeholder="아이디" required /> @
        <input type="text" id="emailDomain" placeholder="도메인" required />
        <select id="emailSelect">
          <option value="">직접입력</option>
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="hanmail.net">hanmail.net</option>
        </select>
      </div>

      <label>휴대전화번호</label>
      <div class="flex-group">
        <input type="text" id="phone1" maxlength="3" required /> -
        <input type="text" id="phone2" maxlength="4" required /> -
        <input type="text" id="phone3" maxlength="4" required />
      </div>

      <label for="zipcode">우편번호</label>
      <input type="text" id="zipcode" name="zipcode" required />

      <label for="address">기본주소</label>
      <input type="text" id="address" name="address" required />

      <label for="addressDetail">상세주소</label>
      <input type="text" id="addressDetail" name="addressDetail" required />

      <button type="submit" id="submitBtn" disabled>회원가입</button>
    </form>
  </div>
  </>); 
}
export default Regist;