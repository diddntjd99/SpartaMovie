function setDetailUI(data) {
  //detail.html의 요소 id 값을 호출하여 각 영화 정보를 넣어줌
  this.document.title = data.title;

  document.getElementById("detailTitle").textContent = data.title;
  document.getElementById("detailPoster").src = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  document.getElementById("detailOverView").textContent = data.overview;
  document.getElementById("detailAverage").textContent = data.vote_average;
}
