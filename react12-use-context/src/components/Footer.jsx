import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer=() => {
  const {isDark, setIsDark} = useContext(ThemeContext);
  const toggleTheme = () =>{
    setIsDark(!isDark);
  }
  return(
    // isDark값에 따라 배경색 변경
    <div className="footer" 
      style={{
        backgroundColor: isDark? 'black' : 'lightgray',
      }}
    >
      {/* 버튼을 누를때마다 다크모드가 전체적으로 적용된다. */}
      <input type="button" value="Dark Mode" className="button"
      onClick={toggleTheme} />
    </div>
  )
}

export default Footer;