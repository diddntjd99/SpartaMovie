const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODRjYjlmY2RmYjJhNWM0MTdlODU3N2ZkMmM0ODdjMSIsInN1YiI6IjY2MjcyYzU2NjNlNmZiMDE3ZWZkODhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OCo8c5Y82zftuayT9vNaC3CSS_cN239M_6EKS4Dnta4'
    }
};

function fetchMovie() {
    // 가져올 데이터의 URL
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    // Fetch API를 사용하여 데이터 가져오기
    fetch(url, options)
    .then(response => {
        // 서버 응답 확인
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        // JSON 형식으로 변환하여 반환
        return response.json();
    }).then(data => {
        // 가져온 데이터 출력
        // data['results'][반복문][필요한 데이터 이름('title', 'overview', 'poster_path', 'vote_average')]
        console.log('title:', data['results'][0]['title']);
        console.log('overview:', data['results'][0]['overview']);
        console.log('poster_path:', data['results'][0]['poster_path']);
        console.log('vote_average:', data['results'][0]['vote_average']);
    }).catch(error => {
        // 오류 처리
        console.error('Fetch 오류:', error);
        alert('Fetch 오류: ' + error.message);
    });
}

fetchMovie();