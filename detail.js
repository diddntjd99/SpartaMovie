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

  this.document.title = receivedData.title;
});
