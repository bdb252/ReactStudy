function Footer() {
  return (
    <footer style={footerStyle}>
      <ul style={listStyle}>
        <li><strong>📞 연락 가능 시간:</strong> 평일 09:00 ~ 18:00</li>
        <li><strong>© 2025</strong> MyWebsite. All rights reserved.</li>
        <li>이 사이트는 학습 및 개인 포트폴리오 용도로 제작되었습니다.</li>
        <li>문의: example@example.com</li>
      </ul>
    </footer>
  );
}


const footerStyle = {
  backgroundColor: "#f1f1f1",
  padding: "20px",
  textAlign: "left",
  borderTop: "1px solid #ccc",
  position: "relative",
  width: "100%",
  bottom: "0",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
  fontSize: "14px",
  color: "#333",
};

const iconStyle = {
  marginRight: "10px",
  color: "#000",
  textDecoration: "none"
};

export default Footer;
