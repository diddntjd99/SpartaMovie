//페이지가 로딩되면 실행
window.addEventListener("load", function () {
  //url에 추가된 movieData 라는 데이터를 가져오기
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const encodedData = params.get("movieData");
  //쿼리 문자열을 파싱하여 디코딩
  const jsonData = decodeURIComponent(encodedData);
  //Json으로 객체 변환
  const receivedData = JSON.parse(jsonData);

  //페이지가 로딩이 되면 가져온 데이터를 통해 detail_ui의 함수를 호출
  setDetailUI(receivedData);

  loadReview();
  window.onclick = function (event) {
    const modal = document.getElementsByClassName("modal")[0];
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.removeEventListener("wheel", preventScroll);
    }
  };
});

function preventScroll(event) {
  event.preventDefault();
}
