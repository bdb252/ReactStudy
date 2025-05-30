import { useEffect, useState } from "react";

function Regist(props) {
  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '',
    name: '', emailId: '', emailDomain: '',
    phone1: '', phone2: '', phone3: '',
    zipcode: '', address: '', addressDetail: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    // 우편번호 주소 검색
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 이메일 도메인 자동완성 기능
    const emailSelect = document.getElementById("emailSelect");
    const emailDomain = document.getElementById("emailDomain");

    const handleEmailChange = () => {
      const selected = emailSelect.value;
      if (selected === "") {
        emailDomain.value = "";
        emailDomain.readOnly = false;
      } else {
        emailDomain.value = selected;
        emailDomain.readOnly = true;
      }
    };

    emailSelect.addEventListener("change", handleEmailChange);

    return () => {
      emailSelect.removeEventListener("change", handleEmailChange);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const {
      username, password, confirmPassword, name,
      emailId, emailDomain, phone1, phone2, phone3,
      zipcode, address, addressDetail
    } = formData;

    const allFilled = [
      username, password, confirmPassword, name,
      emailId, emailDomain, phone1, phone2, phone3,
      zipcode, address, addressDetail
    ].every(val => val.trim() !== '');

    const passwordMatch = password === confirmPassword;

    setIsFormValid(allFilled && passwordMatch);
  }, [formData]);
  
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        document.getElementById("zipcode").value = data.zonecode;
        document.getElementById("address").value = data.roadAddress || data.jibunAddress;
      }
    }).open();
  };

  const handleEmailSelectChange = (e) => {
    const selected = e.target.value;
    const emailDomainInput = document.getElementById("emailDomain");

    if (selected === "") {
      emailDomainInput.value = '';
      emailDomainInput.readOnly = false;
      setFormData(prev => ({ ...prev, emailDomain: '' }));
    } else {
      emailDomainInput.value = selected;
      emailDomainInput.readOnly = true;
      setFormData(prev => ({ ...prev, emailDomain: selected }));
    }
  };

  const idCheck = () =>{

  }

  return (<>
    <div class="container">
      <h2>회원가입</h2>
      <form class="signup-form" id="signupForm">

        <label for="username">아이디</label>
        <div class="flex-group">
          <input type="text" id="username" name="username" required onChange={handleChange} />
          <button type="button" id="checkUsernameBtn" onSubmit={idCheck}>중복확인</button>
        </div>
        <small id="usernameStatus" class="status-msg"></small>

        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" required onChange={handleChange} />

        <label for="confirmPassword">비밀번호 확인</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleChange} />

        <label for="name">이름</label>
        <input type="text" id="name" name="name" required onChange={handleChange} />

        <label>이메일</label>
        <div class="flex-group">
          <input type="text" id="emailId" placeholder="아이디" required onChange={handleChange} /> @
          <input type="text" id="emailDomain" placeholder="도메인" required onChange={handleChange} />
          <select id="emailSelect" onChange={handleEmailSelectChange}>
            <option value="">직접입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
          </select>
        </div>

        <label>휴대전화번호</label>
        <div class="flex-group">
          <input type="text" id="phone1" maxlength="3" required onChange={handleChange} /> -
          <input type="text" id="phone2" maxlength="4" required onChange={handleChange} /> -
          <input type="text" id="phone3" maxlength="4" required onChange={handleChange} />
        </div>

        <label htmlFor="zipcode">우편번호</label>
        <div className="flex-group">
          <input type="text" id="zipcode" name="zipcode" required onChange={handleChange} readOnly />
          <button type="button" onClick={openPostcode}>주소 검색</button>
        </div>

        <label htmlFor="address">기본주소</label>
        <input type="text" id="address" name="address" required onChange={handleChange} readOnly />

        <label for="addressDetail">상세주소</label>
        <input type="text" id="addressDetail" name="addressDetail" required onChange={handleChange} />

        <button type="submit" id="submitBtn" disabled={!isFormValid}>회원가입</button>
      </form>
    </div>
  </>);
}
export default Regist;