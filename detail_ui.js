function setDetailUI(data) {
  //detail.html의 요소 id 값을 호출하여 각 영화 정보를 넣어줌
  this.document.title = data.title;

  document.getElementById("detailTitle").textContent = data.title;
  document.getElementById("detailPoster").src = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  document.getElementById("detailOverView").textContent = data.overview;
  document.getElementById("detailAverage").textContent = "Rate: " + data.vote_average;

  document.getElementsByClassName("movieId")[0].id = data.id;
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

  if (localStorage.getItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewer) !== null) {
    alert("이미 후기를 남긴 사용자입니다!");
    return;
  }

  alert(reviewer + "님 리뷰 작성 완료!");
  // input 작성 내용을 localStorage에 저장합니다.
  // 영화 id + / + reviewer
  const reviewData = [content, password];
  localStorage.setItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewer, JSON.stringify(reviewData));

  // localStorage에서 해당 영화 id 키의 값들(reviewer 목록) 변경
  if (localStorage.getItem(document.getElementsByClassName("movieId")[0].id) === null) {
    const arr = [reviewer];
    localStorage.setItem(document.getElementsByClassName("movieId")[0].id, JSON.stringify(arr));
  } else {
    const arr = JSON.parse(localStorage.getItem(document.getElementsByClassName("movieId")[0].id));
    arr.push(reviewer);
    localStorage.setItem(document.getElementsByClassName("movieId")[0].id, JSON.stringify(arr));
  }

  // 리뷰작성이 완료되면 updateLog 함수를 실행합니다.
  return updateLog();
}

// input에 입력한 값을 불러와서 makeReview 함수를 실행한 후 log 위치에 붙여줍니다.
function updateLog() {
  const reviewer = document.getElementById("reviewer").value;
  const content = document.getElementById("content").value;
  const makeReview = makeDiv(reviewer, content);
  const log = document.getElementById("log");

  //최근 저장한 리뷰가 맨 위로
  if (log.firstChild) {
    log.insertBefore(makeReview, log.firstChild);
  } else {
    log.appendChild(makeReview);
  }

  // 작성완료 후 input을 초기화합니다.
  document.getElementById("reviewer").value = null;
  document.getElementById("content").value = null;
  document.getElementById("password").value = null;
}

function makeDiv(reviewer, content) {
  const newDiv = document.createElement("div");
  // 리뷰어 이름과 리뷰 내용을 출력하고 수정, 삭제 버튼을 생성합니다.
  newDiv.innerHTML =
    "<div class='review'>" +
    "이름: <span class='reviewer'>" +
    reviewer +
    "</span>" +
    "<br>" +
    "리뷰: " +
    content +
    "<br>" +
    "<div class='reviewBtn'>" +
    "<input type='button' class='updateBtn' value='수정'>" +
    // 리뷰창을 정리 해봤지만, 가끔 가다가 수정이 리뷰 옆으로 가는 경우가 있습니다.
    " <input type='button' class='deleteBtn' value='삭제'>" +
    "</div>" +
    "</div>";

  // 삭제 버튼에 클릭 이벤트 핸들러 등록
  const deleteButton = newDiv.querySelector(".reviewBtn .deleteBtn");
  deleteButton.addEventListener("click", deleteBtn);
  const updateButton = newDiv.querySelector(".reviewBtn .updateBtn");
  updateButton.addEventListener("click", updateBtn);

  return newDiv;
}

// 삭제 버튼 클릭 시 해당 리뷰를 삭제하는 함수
function deleteBtn() {
  const promptPW = prompt("비밀번호를 입력해주세요!");
  const reviewer = this.parentNode.parentNode.querySelector(".reviewer").textContent.trim(); // 리뷰어 이름 가져오기
  const localPW = JSON.parse(localStorage.getItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewer))[1]; // 해당 리뷰어의 비밀번호 가져오기

  if (promptPW === localPW) {
    // localStorage에서 리뷰어와 관련된 리뷰와 비밀번호를 삭제합니다.
    // localStorage에 영화 id + "/" + reviewer 데이터 삭제 및 localStorage에서 해당 영화 id 키의 값들(reviewer 목록) 변경
    localStorage.removeItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewer);
    const reviewers = JSON.parse(localStorage.getItem(document.getElementsByClassName("movieId")[0].id));
    const updateReviewers = reviewers.filter((name) => name !== reviewer);
    localStorage.setItem(document.getElementsByClassName("movieId")[0].id, JSON.stringify(updateReviewers));

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
  const reviewer = this.parentNode.parentNode.querySelector(".reviewer").textContent.trim(); // 리뷰어 이름 가져오기
  const localPW = JSON.parse(localStorage.getItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewer))[1]; // 해당 리뷰어의 비밀번호 가져오기

  if (promptPW === localPW) {
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";
    //모달창을 키면 부모창의 마우스 휠 이벤트 금지
    document.body.addEventListener("wheel", preventScroll, { passive: false });

    document.getElementById("updateReviewer").textContent = this.parentNode.parentNode.querySelector(".reviewer").textContent.trim();
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
  const reviewData = [content, password];
  localStorage.setItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewer, JSON.stringify(reviewData));

  location.reload();
}

// 모달창에서 빠져나왔을 경우 실행
function updateCancel() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  //모달창을 끄면 다시 부모창의 마우스 휠 이벤트 활성화
  document.body.removeEventListener("wheel", preventScroll);
}

// localstorage에 있는 해당 영화의 리뷰 보이기
function loadReview() {
  if (localStorage.getItem(document.getElementsByClassName("movieId")[0].id) !== null) {
    // localStorage에서 해당 영화 id 키의 값들(reviewer 목록) 가져오기
    const reviewers = JSON.parse(localStorage.getItem(document.getElementsByClassName("movieId")[0].id));

    // 가져온 reviewer 목록을 반복문을 통해 localStorage에서 해당 영화 id + / + reviewer 값 가져오기
    for (let i = reviewers.length - 1; i >= 0; i--) {
      const reviewData = JSON.parse(localStorage.getItem(document.getElementsByClassName("movieId")[0].id + "/" + reviewers[i]));
      const makeReview = makeDiv(reviewers[i], reviewData[0]);
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
  if (content === null || content === " ") {
    alert("리뷰를 입력해주세요!");
    return false;
  }
  if (content.replace(/\s/g, "").length < 5) {
    alert("리뷰는 5자 이상 작성해주세요!");
    return false;
  }
  if (password === null || password === "") {
    alert("비밀번호를 입력해주세요!");
    return false;
  }
  if (password.length < 4) {
    alert("비밀번호는 4자 이상으로 설정해주세요!");
    return false;
  }
  if (!/^\d{4}$/.test(password)) {
    alert("비밀번호를 숫자로 입력해주세요!");
    return false;
  }

  return true;
}
