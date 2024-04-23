const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODRjYjlmY2RmYjJhNWM0MTdlODU3N2ZkMmM0ODdjMSIsInN1YiI6IjY2MjcyYzU2NjNlNmZiMDE3ZWZkODhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OCo8c5Y82zftuayT9vNaC3CSS_cN239M_6EKS4Dnta4'
    }
};

//페이지가 로딩되면 실행
window.addEventListener("load", function () {
    document.getElementById("searchTitle").focus();

    document.getElementById("searchTitle").addEventListener("keypress", function (event) {
        // Enter 키인 경우
        if (event.key === "Enter") {
            searchMovie();
        }
    });
});

function searchMovie() {
    let fetchMovie = (search) => {
        let movieArr = [];

        // 가져올 데이터의 URL, search 단어를 통해 해당 제목을 가진 영화만 검색
        const url = 'https://api.themoviedb.org/3/search/movie?query=' + search + '&include_adult=false&language=en-US&page=1';

        // Fetch API를 사용하여 데이터 가져오기
        fetch(url, options).then(response => {
            // 서버 응답 확인
            if (!response.ok) {
                throw new Error('네트워크 상태가 좋지 않습니다.');
            }
            // JSON 형식으로 변환하여 반환
            return response.json();
        }).then(data => {
            // 가져온 데이터 출력
            // data['results'][반복문][필요한 데이터 이름('title', 'overview', 'poster_path', 'vote_average')]
            console.log('data:', data);

            data['results'].forEach(element => {
                movieArr.push(element);

                console.log(element['title']);
                console.log(element['overview']);
                console.log(element['poster_path']);
                console.log(element['vote_average']);
                console.log('--------------------------------------------------------------');
            });
        }).catch(error => {
            // 오류 처리
            console.error('Fetch 오류:', error);
            alert('Fetch 오류: ' + error.message);
        });

        return movieArr;
    };
    //검색할 단어 추출 및 삭제
    let searchTitle = document.getElementById('searchTitle').value;
    document.getElementById('searchTitle').value = '';

    let movieArr = fetchMovie(searchTitle);
}