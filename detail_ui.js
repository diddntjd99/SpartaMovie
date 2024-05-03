function setDetailUI(data) {
  //detail.html의 요소 id 값을 호출하여 각 영화 정보를 넣어줌
  this.document.title = data.title;

  document.getElementById("detailTitle").textContent = data.title;
  document.getElementById("detailPoster").src = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  document.getElementById("detailOverView").textContent = data.overview;
  document.getElementById("detailAverage").textContent = data.vote_average;
}

// 리뷰 코드
// 작성버튼 클릭 시 writeReview 함수를 실행합니다.
function writeReview() {
  // 작성버튼 클릭 시 입력창에 입력한 값을 불러옵니다.
  const reviewer = document.getElementById("reviewer").value;
  const content = document.getElementById("content").value;
  const password = document.getElementById("password").value;

  if (!validation(reviewer, content, password)) {
    return;
  }

  if (localStorage.getItem(reviewer) !== null) {
    alert("이미 후기를 남긴 사용자입니다!");
    return;
  }

  alert(reviewer + "님 리뷰 작성 완료!");
  // input 작성 내용을 localStorage에 저장합니다.
  localStorage.setItem(reviewer, content);
  localStorage.setItem(reviewer + "pw", password);
  // 리뷰작성이 완료되면 reviewLog 함수를 실행합니다.
  return reviewLog();
}

// input에 입력한 값을 불러와서 makeReview 함수를 실행한 후 log 위치에 붙여줍니다.
function reviewLog() {
  const reviewer = document.getElementById("reviewer").value;
  const content = document.getElementById("content").value;
  const makeReview = makeDiv(reviewer, content);
  const log = document.getElementById("log");
  log.appendChild(makeReview);

  // 작성완료 후 input을 초기화합니다.
  document.getElementById("reviewer").value = null;
  document.getElementById("content").value = null;
  document.getElementById("password").value = null;
}

function makeDiv(reviewer, content) {
  const newDiv = document.createElement("div");
  // 리뷰어 이름과 리뷰 내용을 출력하고 수정, 삭제 버튼을 생성합니다.
  newDiv.innerHTML =
    "이름: <span class='reviewer'>" +
    reviewer +
    "</span>  <input type='button' class='updateBtn' value='수정'>" +
    "  <input type='button' class='deleteBtn' value='삭제'>" +
    "<br>" +
    "리뷰: " +
    content +
    "<p>";

  // 삭제 버튼에 클릭 이벤트 핸들러 등록
  const deleteButton = newDiv.querySelector(".deleteBtn");
  deleteButton.addEventListener("click", deleteBtn);
  const updateButton = newDiv.querySelector(".updateBtn");
  updateButton.addEventListener("click", updateBtn);

  return newDiv;
}

// 삭제 버튼 클릭 시 해당 리뷰를 삭제하는 함수
function deleteBtn() {
  const promptPW = prompt("비밀번호를 입력해주세요!");
  const reviewer = this.parentNode.querySelector(".reviewer").textContent.trim(); // 리뷰어 이름 가져오기
  const localPW = localStorage.getItem(reviewer + "pw"); // 해당 리뷰어의 비밀번호 가져오기

  if (promptPW === localPW) {
    // localStorage에서 리뷰어와 관련된 리뷰와 비밀번호를 삭제합니다.
    localStorage.removeItem(reviewer);
    localStorage.removeItem(reviewer + "pw");
    alert("리뷰 삭제 완료!");
    location.reload();
  } else if (promptPW == null) {
    //프롬프트 취소했을 경우
  } else {
    alert("비밀번호를 확인해주세요!");
  }
}

// 수정 버튼 클릭 시 모달창이 켜지고 해당 모달창에서 수정하도록 설정
function updateBtn() {
  const promptPW = prompt("비밀번호를 입력해주세요!");
  const reviewer = this.parentNode.querySelector(".reviewer").textContent.trim(); // 리뷰어 이름 가져오기
  const localPW = localStorage.getItem(reviewer + "pw"); // 해당 리뷰어의 비밀번호 가져오기

  if (promptPW === localPW) {
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";
    //모달창을 키면 부모창의 마우스 휠 이벤트 금지
    document.body.addEventListener("wheel", preventScroll, { passive: false });

    document.getElementById("updateReviewer").textContent = this.parentNode.querySelector(".reviewer").textContent.trim();
  } else if (promptPW == null) {
    //프롬프트 취소했을 경우
  } else {
    alert("비밀번호를 확인해주세요!");
  }
}

// 모달창에서 수정 완료 시
function updateReview() {
  const reviewer = document.querySelector("#updateReviewer").textContent.trim();
  const content = document.getElementById("updateContent").value;
  const password = document.getElementById("updatePassword").value;

  if (!validation(reviewer, content, password)) {
    return;
  }

  alert(reviewer + "님 리뷰 수정 완료!");
  // input 작성 내용을 localStorage에 저장합니다.
  localStorage.setItem(reviewer, content);
  localStorage.setItem(reviewer + "pw", password);
  // 리뷰작성이 완료되면 reviewLog 함수를 실행합니다.

  updateCancel();
  location.reload();
}

// 모달창에서 취소 시
function updateCancel() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  //모달창을 끄면 다시 부모창의 마우스 휠 이벤트 활성화
  document.body.removeEventListener("wheel", preventScroll);
}

// localstorage에 있는 key와 value를 log에 Div로 붙이는 함수
function loadReview() {
  // localstorage의 key에 반복문 설정
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    // 리뷰 하나당 key가 2개 생성되므로 pw 없는 key를 선택하는 조건문 생성
    // key 마지막글자에 pw가 붙어있으면
    if (key.endsWith("pw")) {
      const reviewer = key.substring(0, key.length - 2); // key 뒤에 2글자(pw)를 지우기
      const content = localStorage.getItem(reviewer);
      const makeReview = makeDiv(reviewer, content);
      const log = document.getElementById("log");
      log.appendChild(makeReview);
    }
  }
}

function validation(reviewer, content, password) {
  // if 함수로 입력조건을 만들고 조건 충족이 안되면 alert창을 띄워서 알려줍니다.
  if (reviewer === null || reviewer === "") {
    alert("이름을 입력해주세요!");
    return false;
  }
  if (content === null || content === "") {
    alert("리뷰를 입력해주세요!");
    return false;
  }
  if (content.length < 10) {
    alert("리뷰는 10자 이상 작성해주세요!");
    return false;
  }
  if (password === null || password === "") {
    alert("비밀번호를 입력해주세요!");
    return false;
  }
  if (password.length < 6) {
    alert("비밀번호는 6자 이상으로 설정해주세요!");
    return false;
  }

  return true;
}
