// 작성버튼 클릭 시 clickWrite 함수를 실행합니다.
function clickWrite() {
  // 작성버튼 클릭 시 입력창에 입력한 값을 불러옵니다.
  let reviewer = document.getElementById("reviewer").value;
  let content = document.getElementById("content").value;
  let password = document.getElementById("password").value;
  // if 함수로 입력조건을 만들고 조건 충족이 안되면 alert창을 띄워서 알려줍니다.
  if (reviewer === null || reviewer === "") {
    alert("이름을 입력해주세요!");
    return;
  }
  if (content === null || content === "") {
    alert("리뷰를 입력해주세요!");
    return;
  }
  if (content.length < 10) {
    alert("리뷰는 10자 이상 작성해주세요!");
    return;
  }
  if (password === null || password === "") {
    alert("비밀번호를 입력해주세요!");
    return;
  }
  if (password.length < 6) {
    alert("비밀번호는 6자 이상으로 설정해주세요!");
    return;
  }
  alert(reviewer + "님 리뷰작성 완료!");
  // input 작성 내용을 localStorage에 저장합니다.
  localStorage.setItem("reviwer", reviewer);
  localStorage.setItem("content", content);
  localStorage.setItem("password", password);
  // 리뷰작성이 완료되면 reviewLog 함수를 실행합니다.
  return reviewLog();
}

// input에 입력한 값을 불러와서 makeReview 함수를 실행한 후 log 위치에 붙여줍니다.
function reviewLog() {
  let reviewer = document.getElementById("reviewer").value;
  let content = document.getElementById("content").value;
  let password = document.getElementById("password").value;
  let makeReview = makeDiv(reviewer, content, password);
  let log = document.getElementById("log");
  log.appendChild(makeReview);
  // 작성완료 후 input을 초기화합니다.
  document.getElementById("reviewer").value = null;
  document.getElementById("content").value = null;
  document.getElementById("password").value = null;
}

// log 위치에 새로운 div를 만들어서 입력값을 붙여줍니다.
function makeDiv(reviewer, content, password) {
  let newDiv = document.createElement("div");
  // 입력값 중 id와 content를 새로운 div에 붙여주고 수정, 삭제 버튼을 생성합니다.
  newDiv.innerHTML =
    "이름: " +
    localStorage.getItem("reviewer") +
    "  <input type = 'button' value = '수정'>" +
    "  <input type = 'button' id = 'deleteReview' onclick = deleteBtn() value = '삭제'>" +
    "</br>" +
    "리뷰: " +
    localStorage.getItem("content") +
    "<p>";
  return newDiv;
}

// 삭제버튼 클릭 시 작성 리뷰 삭제합니다.(비밀번호 일치여부는 추가예정)
function deleteBtn() {
  prompt("비밀번호를 입력해주세요!")
  // localStorage 값을 찾아서 삭제합니다.
  localStorage.removeItem("reviwer", reviewer);
  localStorage.removeItem("content", content);
  localStorage.removeItem("password", password);
  alert("리뷰 삭제완료!");
  // 삭제완료 후 새로고침합니다.
  location.reload();
}

