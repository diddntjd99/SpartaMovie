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

  if (localStorage.getItem(reviewer) !== null) {
    alert("이미 후기를 남긴 사용자입니다!");
    return;
  }

  alert(reviewer + "님 리뷰작성 완료!");
  // input 작성 내용을 localStorage에 저장합니다.
  localStorage.setItem(reviewer, content);
  localStorage.setItem(reviewer + "pw", password);
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

function makeDiv(reviewer, content, password) {
  let newDiv = document.createElement("div");
  // 리뷰어 이름과 리뷰 내용을 출력하고 수정, 삭제 버튼을 생성합니다.
  newDiv.innerHTML =
    "이름: <span class='reviewer'>" +
    reviewer +
    "</span>  <input type='button' value='수정'>" +
    "  <input type='button' class='deleteBtn' value='삭제'>" +
    "<br>" +
    "리뷰: " +
    content +
    "<p>";

  // 삭제 버튼에 클릭 이벤트 핸들러 등록
  let deleteButton = newDiv.querySelector(".deleteBtn");
  deleteButton.addEventListener("click", deleteBtn);

  return newDiv;
}

// 삭제 버튼 클릭 시 해당 리뷰를 삭제하는 함수
function deleteBtn() {
  let promptPW = prompt("비밀번호를 입력해주세요!");
  let reviewer = this.parentNode.querySelector(".reviewer").textContent.trim(); // 리뷰어 이름 가져오기
  let localPW = localStorage.getItem(reviewer + "pw"); // 해당 리뷰어의 비밀번호 가져오기

  if (promptPW === localPW) {
    // localStorage에서 리뷰어와 관련된 리뷰와 비밀번호를 삭제합니다.
    localStorage.removeItem(reviewer);
    localStorage.removeItem(reviewer + "pw");
    alert("리뷰 삭제 완료!");
    location.reload();
  } else {
    alert("비밀번호를 확인해주세요!");
  }
}