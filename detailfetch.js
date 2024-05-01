const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk3ZTJkYjhkZjlmMWZmNTBjMzBhYmFiZjRiNTEwMSIsInN1YiI6IjY2Mjc2NTdmYjlhMGJkMDE3YWQ4NjBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tInSisldnXEtknErnx5Lbe2c6ZQH0AUjFmwrsKEWYBI'
    }
  };
  

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-ko&page=1', options)
    .then(response => response.json())

    // imagecontent에 20개 다 들어갈지 아님 하나만 들어갈지 잘 모르겠습니다. 이것도 상의해봐야 될까요?
    