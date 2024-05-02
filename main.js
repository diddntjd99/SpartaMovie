//페이지가 로딩되면 실행
window.addEventListener("load", function () {
  //포커스
  document.getElementById("searchTitle").focus();

  document.getElementById("searchTitle").addEventListener("keypress", function (event) {
    //Enter 키인 경우
    if (event.key === "Enter") {
      searchMovie();
    }
  });

  const pagination = document.getElementById("pageDropdown");
  pagination.addEventListener("change", changedPage);
});

  function init() {
    if (document.readyState !== "loading") {
      //바로 searchMovie 함수를 사용해 TMDB에서 데이터를 불러와 웹 페이지에 표시합니다.
      searchMovie();
    } else {
      //로딩 중이라면 DOM 컨텐츠 로딩을 모두 완료한 후, searchMovie 함수를 실행합니다.
      document.addEventListener("DOMContentLoaded", searchMovie);
    }
  }

init();
