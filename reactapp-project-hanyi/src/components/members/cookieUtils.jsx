export const setCookie = (name, value, exp) => {
  // 유효기간 설정을 위해 Date 객체 생성
  var date = new Date();
  // 타임스탬프에 매개변수로 전달된 exp(날짜단위)와 연산하여 유효기간을 설정
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 쿠키생성 : 쿠키명=쿠키값;유효기간=xx;적용할경로=xx;
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};


export const getCookie = (name) => {
  // 1차 split하여 배열 생성
  var values = document.cookie.split(";");
  for (var i = 0; i < values.length; i++) {
    // 2차 split으로 쿠키명과 값을 분리
    var unit = values[i].trim();
    var value = unit.split('=');
    // 매개변수로 전달된 쿠키명과 비교
    if (value[0] == name) {
      // 해당 쿠키값을 반환한다.
      return unescape(value[1]);
    }
  }
  return null;
};

// 쿠키를 만들기 위한 함수
function makeCookie() {
  // 사용자가 입력한 값을 읽어온다.
  var cName = document.getElementById('cName').value;
  var cValue = document.getElementById('cValue').value;
  // 쿠키명, 쿠키값, 유효기간은 1일로 설정하여 쿠키를 생성
  setCookie(cName, cValue, 1);
  alert('쿠키가 생성되었습니다.');
  // 웹브라우저를 새로고침한다. F5를 누른 것과 동일하다.
  location.reload();
  /* 쿠키가 생성되면 화면의 이동 혹은 새로고침이 되어야 웹브라우저가
    생성된 쿠키를 인식할 수 있다. */
}

// 쿠키값을 읽기위한 함수
function readCookie() {
  // 입력상자로부터 읽을 쿠키명을 가져온다.
  var cName = document.getElementById('cName').value;
  // 해당 이름으로 생성된 쿠키를 읽어온다.
  var readValue = getCookie(cName);
  if (readValue == null) {
    alert('해당 이름으로 생성된 쿠키가 없습니다.');
  }
  else {
    alert("쿠키값:" + readValue);
  }
}

// 쿠키삭제하기 : 과거의 시간으로 설정하면 삭제된다.
export const deleteCookie = () => {
  var cName = document.getElementById('cName').value;
  // 유효기간을 -1. 즉 어제의 날짜로 설정한다.
  setCookie(cName, cValue, -1);
  console.log("쿠키가 삭제되었습니다.");
  location.reload();
}