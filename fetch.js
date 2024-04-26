//TMDB api 키값
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODRjYjlmY2RmYjJhNWM0MTdlODU3N2ZkMmM0ODdjMSIsInN1YiI6IjY2MjcyYzU2NjNlNmZiMDE3ZWZkODhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OCo8c5Y82zftuayT9vNaC3CSS_cN239M_6EKS4Dnta4",
  },
};

async function fetchMovie(search, page) {
  //가져올 데이터의 URL, search 단어를 통해 해당 제목을 가진 영화만 검색
  let url;

  if (search === "") {
    url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" + page;
  } else {
    url = "https://api.themoviedb.org/3/search/movie?query=" + search + "&include_adult=false&language=en-US&page=" + page;
  }

  //Fetch API를 사용하여 데이터 가져오기
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("네트워크 상태가 좋지 않습니다.");
  }
  const data = await response.json();

  //data['results'][반복문][필요한 데이터 이름('title', 'overview', 'poster_path', 'vote_average')]
  return data;
}
