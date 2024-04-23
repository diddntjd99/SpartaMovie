//TMDB api 키값
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODRjYjlmY2RmYjJhNWM0MTdlODU3N2ZkMmM0ODdjMSIsInN1YiI6IjY2MjcyYzU2NjNlNmZiMDE3ZWZkODhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OCo8c5Y82zftuayT9vNaC3CSS_cN239M_6EKS4Dnta4'
    }
};

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
});

function searchMovie() {
    let fetchMovie = (search) => {
        //가져올 데이터의 URL, search 단어를 통해 해당 제목을 가진 영화만 검색
        const url = 'https://api.themoviedb.org/3/search/movie?query=' + search + '&include_adult=false&language=en-US&page=1';

        //Fetch API를 사용하여 데이터 가져오기
        fetch(url, options).then(response => {
            // 서버 응답 확인
            if (!response.ok) {
                throw new Error('네트워크 상태가 좋지 않습니다.');
            }
            //JSON 형식으로 변환하여 반환
            return response.json();
        }).then(data => {
            //가져온 데이터 출력
            //data['results'][반복문][필요한 데이터 이름('title', 'overview', 'poster_path', 'vote_average')]

            data['results'].forEach(element => {
                // 새로운 div 요소 생성
                let movieCard = document.createElement('div');
                movieCard.classList.add('movieCard');
                movieCard.id = element['id'];

                // 이미지 요소 생성 및 속성 설정
                let img = document.createElement('img');
                img.classList.add('poster');
                img.src = 'https://image.tmdb.org/t/p/w500' + element['poster_path'];
                movieCard.appendChild(img);

                // 이름 요소 생성 및 텍스트 설정
                let title = document.createElement('p');
                title.classList.add('movieName');
                title.textContent = `이름: ${element['title']}`;
                movieCard.appendChild(title);

                // 설명 요소 생성 및 텍스트 설정
                let explanation = document.createElement('p');
                explanation.classList.add('explanation');
                explanation.textContent = `설명: ${element['overview']}`;
                movieCard.appendChild(explanation);

                // 평점 요소 생성 및 텍스트 설정
                let rating = document.createElement('p');
                rating.classList.add('rating');
                rating.textContent = `평점: ${element['vote_average']}`;
                movieCard.appendChild(rating);

                document.getElementById('movieContent').appendChild(movieCard);

                movieCard.addEventListener('click', function(event) {
                    alert('영화 ID = ' + event.currentTarget.id);
                });
            });
        }).catch(error => {
            //오류 처리
            console.error('Fetch 오류:', error);
            alert('Fetch 오류: ' + error.message);
        });
    };
    //검색할 단어 추출 및 삭제
    let searchTitle = document.getElementById('searchTitle').value;
    document.getElementById('searchTitle').value = '';

    fetchMovie(searchTitle);
}