import { useEffect, useState } from "react";

function phonNumFocus(thisObj, numLength, nextObj) {
  // 현재 입력중인 <input>의 DOM을 얻어온다.
  var input = document.getElementById(thisObj);
  // 입력된 글자수를 확인한다.
  var strLen = input.value.length;
  // 입력할 글자수와 일치하면 다음 <input>으로 포커스를 이동한다.
  if (strLen == numLength) {
    document.getElementById(nextObj).focus();
  }
}

function Regist(props) {
  // 기본적인 회원가입 정보
  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '',
    name: '', emailId: '', emailDomain: '',
    phone1: '', phone2: '', phone3: '',
    zipcode: '', address: '', addressDetail: '',
  });
  const [idChecked, setIdCheked] = useState(false);

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

  // 폼값 유효성
  const [isFormValid, setIsFormValid] = useState(false);
  // 비밀번호 일치
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const {
      username, password, confirmPassword, name,
      emailId, emailDomain, phone1, phone2, phone3,
      zipcode, address, addressDetail
    } = formData;

    // 모든 입력값이 비어있지 않은지
    const allFilled = [
      username, password, confirmPassword, name,
      emailId, emailDomain, phone1, phone2, phone3,
      zipcode, address, addressDetail
    ].every(val => val.trim() !== '');

    // 비밀번호 일치 확인
    const isPasswordMatch = password === confirmPassword;
    setPasswordMatch(isPasswordMatch);

    // 모든 값이 입력되었고, 비밀번호가 일치하는지
    setIsFormValid(allFilled && passwordMatch);
  }, [formData]);

  // 우편번호 검색
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // document.getElementById("zipcode").value = data.zonecode;
        // document.getElementById("address").value = data.roadAddress || data.jibunAddress;
        const zonecode = data.zonecode;
        const address = data.roadAddress || data.jibunAddress;

        setFormData(prev => ({
          ...prev,
          zipcode: zonecode,
          address: address
        }));
      }
    }).open();
  };

  // 이메일 도메인 자동 작성
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

  // 로그인 연동
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!idChecked){
      alert('아이디 중복확인을 해주세요');
      return;
    }

    console.log('formdata:', formData);
    // 유효성 검사 추가 가능 (이미 useEffect로 체크된 상태)
    localStorage.setItem('user', JSON.stringify(formData));
    alert('회원가입 완료!');
    window.location.href = '/';
  };

  // 아이디 중복확인
  const idCheck = () => {
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (existingUser && existingUser.username === formData.username) {
      alert("이미 존재하는 아이디입니다.");
      setIdCheked(false);
    } else {
      alert("사용 가능한 아이디입니다.");
      setIdCheked(true);
    }
  }

  return (<>
    <div class="container">
      <h2>회원가입</h2>
      <form class="signup-form" id="signupForm" onSubmit={handleSubmit}>

        <label for="username">아이디</label>
        <div class="flex-group">
          <input type="text" id="username" name="username" required
            onChange={(e)=>{handleChange(e); setIdCheked(false);}} value={formData.username} />
          <button type="button" id="checkUsernameBtn" onClick={idCheck}>중복확인</button>
        </div>

        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" required
          onChange={handleChange} value={formData.password} />

        <label for="confirmPassword">비밀번호 확인</label>
        <input type="password" id="confirmPassword" name="confirmPassword"
          required
          onChange={handleChange} value={formData.confirmPassword} />
        {!passwordMatch && (
          <small style={{ color: 'red' }}>비밀번호가 일치하지 않습니다. </small>
        )}

        <label for="name">이름</label>
        <input type="text" id="name" name="name" required
          onChange={handleChange} value={formData.name} />

        <label>이메일</label>
        <div class="flex-group">
          <input type="text" id="emailId" placeholder="아이디" required
            onChange={handleChange} value={formData.emailId} /> <span style={{color:'white'}}>@</span>
          <input type="text" id="emailDomain" placeholder="도메인" required
            onChange={handleChange} value={formData.emailDomain} />
          <select id="emailSelect" onChange={handleEmailSelectChange} value={formData.emailDomain}>
            <option value="">직접입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
          </select>
        </div>

        <label>휴대전화번호</label>
        <div class="flex-group">
          <input type="text" id="phone1" size="3" required
            onChange={handleChange} value={formData.phone1} 
            onKeyUp={() => phonNumFocus('phone1', 3, 'phone2')}
            /> -
          <input type="text" id="phone2" size="4" required
            onChange={handleChange} value={formData.phone2} 
            onKeyUp={() => phonNumFocus('phone2', 4, 'phone3')}
            /> -
          <input type="text" id="phone3" size="4" required
            onChange={handleChange} value={formData.phone3} />
        </div>

        <label htmlFor="zipcode">우편번호</label>
        <div className="flex-group">
          <input type="text" id="zipcode" name="zipcode" required
            onChange={handleChange} value={formData.zipcode} readOnly />
          <button type="button" onClick={openPostcode}>주소 검색</button>
        </div>

        <label htmlFor="address">기본주소</label>
        <input type="text" id="address" name="address" required
          onChange={handleChange} value={formData.address} readOnly />

        <label for="addressDetail">상세주소</label>
        <input type="text" id="addressDetail" name="addressDetail" required
          onChange={handleChange} value={formData.addressDetail} />

        <div style={{ textAlign: 'center' }}>
          <button type="submit" id="submitBtn">회원가입</button>
        </div>
      </form>
    </div>
  </>);
}
export default Regist;