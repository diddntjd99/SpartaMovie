//기존 Content 내용이 있다면 삭제
function removeContent(contentName) {
  const content = document.getElementById(contentName);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
}

//총 페이지 수 데이터를 보고 페이지 수 만큼 드롭다운 옵션 생성
function createPagination(total) {
  const pagination = document.getElementById("pageDropdown");
  for (let i = 0; i < total; i++) {
    const option = document.createElement("option");
    option.value = i + 1;
    option.textContent = i + 1;
    pagination.appendChild(option);
  }
}

//새 영화 카드 생성
function createMovieCard(data) {
  data.results.forEach((element) => {
    // 새로운 div 요소 생성
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.id = element.id;

    // 이미지 요소 생성 및 속성 설정
    const img = document.createElement("img");
    img.classList.add("poster");
    img.src = "https://image.tmdb.org/t/p/w500" + element.poster_path;
    movieCard.appendChild(img);

    // 이름 요소 생성 및 텍스트 설정
    const title = document.createElement("p");
    title.classList.add("movieTitle");
    title.textContent = `${element.title}`;
    movieCard.appendChild(title);

    // 평점 요소 생성 및 텍스트 설정
    const rating = document.createElement("p");
    rating.classList.add("rating");
    rating.textContent = `Rate: ${element.vote_average}`;
    movieCard.appendChild(rating);

    document.getElementById("movieContent").appendChild(movieCard);

    //MovieCard 클릭 시 이벤트
    movieCard.addEventListener("click", function (event) {
      //데이터 값을 url에 데이터를 전달

      //객체를 JSON 문자열로 변환합니다.
      const jsonData = JSON.stringify(element);

      //JSON 문자열을 URL 인코딩합니다.
      const encodedData = encodeURIComponent(jsonData);

      window.location.href = "detail.html?movieData=" + encodedData;
    });
  });
}

//영화 검색
function searchMovie() {
  //기존 세션 아이템 삭제
  sessionStorage.removeItem("searchTitle");

  //검색할 단어 추출 및 삭제
  const searchTitle = document.getElementById("searchTitle").value;
  document.getElementById("searchTitle").value = "";

  //현재 세션 아이템 세팅
  sessionStorage.setItem("searchTitle", searchTitle);

  fetchAndUpdateUI(searchTitle);
}

//페이지 변경 시
function changedPage() {
  const searchTitle = sessionStorage.getItem("searchTitle");
  fetchAndUpdateUI(searchTitle, document.getElementById("pageDropdown").value);
}

//UI 업데이트
function updateUI(data, page) {
  removeContent("movieContent");
  //페이지 변경될 때가 아닌 영화 검색할 때만 동작
  if (page === 1) {
    removeContent("pageDropdown");
    createPagination(data.total_pages);
  }
  createMovieCard(data);
}

//fetch와 updateUI 함수 호출
async function fetchAndUpdateUI(searchTitle, page = 1) {
  try {
    const data = await fetchMovie(searchTitle, page);
    updateUI(data, page);
  } catch (error) {
    //오류 처리
    console.error("Fetch 오류:", error);
    alert("Fetch 오류: " + error.message);
  }
}
