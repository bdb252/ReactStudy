import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCookie } from "./cookieUtils";

// 회원정보수정창
function MemberEdit(props) {
  const navigate = useNavigate();
  // 회원 정보 얻어올 state
  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '',
    name: '', emailId: '', emailDomain: '',
    phone1: '', phone2: '', phone3: '',
    zipcode: '', address: '', addressDetail: '',
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
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

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData) {
      setFormData({
        ...storedData,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정된 정보를 다시 localStorage에 저장
    localStorage.setItem('user', JSON.stringify(formData));
    alert('회원정보가 수정되었습니다.');
    navigate('/');
  };

  return (<>
    <div class="container">
      <h2>회원정보수정</h2>
      <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="username">아이디</label>
        <div className="flex-group">
          <input type="text" id="username" value={formData.username} readOnly />
        </div>
        <small id="usernameStatus" className="status-msg"></small>

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" value={formData.password} required onChange={handleChange} />

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input type="password" id="confirmPassword" value={formData.confirmPassword}
          required onChange={handleChange} />
        {formData.password !== formData.confirmPassword && (
          <small style={{ color: 'red' }}>비밀번호가 일치하지 않습니다. </small>
        )}

        <label htmlFor="name">이름</label>
        <input type="text" id="name" value={formData.name} required onChange={handleChange} />

        <label>이메일</label>
        <div className="flex-group">
          <input type="text" id="emailId" placeholder="아이디" required
            onChange={handleChange} value={formData.emailId} /> <span style={{color:'white'}}>@</span>
          <input type="text" id="emailDomain" placeholder="도메인" required
            onChange={handleChange} value={formData.emailDomain} />
          <select id="emailSelect" >
            <option value="">직접입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
          </select>
        </div>

        <label>휴대전화번호</label>
        <div className="flex-group">
          <input type="text" id="phone1" maxLength="3" required
            onChange={handleChange} value={formData.phone1} /> -
          <input type="text" id="phone2" maxLength="4" required
            onChange={handleChange} value={formData.phone2} /> -
          <input type="text" id="phone3" maxLength="4" required
            onChange={handleChange} value={formData.phone3} />
        </div>

        <label htmlFor="zipcode">우편번호</label>
        <div className="flex-group">
          <input type="text" id="zipcode" name="zipcode" required
            onChange={handleChange} readOnly value={formData.zipcode} />
          <button type="button" onClick={openPostcode}>주소 검색</button>
        </div>

        <label htmlFor="address">기본주소</label>
        <input type="text" id="address" name="address" required
          onChange={handleChange} readOnly value={formData.address} />

        <label htmlFor="addressDetail">상세주소</label>
        <input type="text" id="addressDetail" name="addressDetail" required
          onChange={handleChange} value={formData.addressDetail} />

        <button type="submit" id="submitBtn">수정</button>
      </form>
    </div>
  </>);
}
export default MemberEdit;