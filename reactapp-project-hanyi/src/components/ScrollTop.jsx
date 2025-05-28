import { useEffect, useState } from "react";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <div style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000,
      }}>
        {/* 기능 없는 버튼 */}
        <button
          style={buttonStyle}
        >
          talk
        </button>

        {/* 상단 이동 버튼 */}
        <button
          onClick={scrollToTop}
          style={buttonStyle}
        >
          ↑ 상단
        </button>
      </div>
    )
  );
}

const buttonStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  borderRadius: "5px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default ScrollTop;
