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

    let pagination = document.getElementById('pageDropdown');
    pagination.addEventListener('change', changedPage);
});

function searchMovie() {
    //검색할 단어 추출 및 삭제
    sessionStorage.removeItem("searchTitle");

    let searchTitle = document.getElementById('searchTitle').value;
    document.getElementById('searchTitle').value = '';

    sessionStorage.setItem("searchTitle", searchTitle);

    fetchMovie(searchTitle);
}

function fetchMovie(search, page = 1) {
    //가져올 데이터의 URL, search 단어를 통해 해당 제목을 가진 영화만 검색
    let url;

    if (search == '') {
        url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=' + page;
    }
    else {
        url = 'https://api.themoviedb.org/3/search/movie?query=' + search + '&include_adult=false&language=en-US&page=' + page;
    }

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

        console.log(data);

        //기존 movieContent 내용이 있다면 삭제
        let movieContent = document.getElementById("movieContent");
        while (movieContent.firstChild) {
            movieContent.removeChild(movieContent.firstChild);
        }

        if (page == 1) {
            //기존 페이지 드롭다운에 내용이 있다면 삭제
            let pagination = document.getElementById("pageDropdown");
            while (pagination.firstChild) {
                pagination.removeChild(pagination.firstChild);
            }

            //총 페이지 수 데이터를 보고 페이지 수 만큼 드롭다운 옵션 생성
            for (let i = 0; i < data['total_pages']; i++) {
                let option = document.createElement('option');
                option.value = i + 1;
                option.textContent = i + 1;
                pagination.appendChild(option);
            }
        }

        data['results'].forEach(element => {
            // 새로운 div 요소 생성
            let movieCard = document.createElement('div');
            movieCard.classList.add('movieCard');
            movieCard.id = element['id'];

            let leftCard = document.createElement('div');
            leftCard.classList.add('leftCard');
            movieCard.appendChild(leftCard);

            // 이미지 요소 생성 및 속성 설정
            let img = document.createElement('img');
            img.classList.add('poster');
            img.src = 'https://image.tmdb.org/t/p/w500' + element['poster_path'];
            leftCard.appendChild(img);

            let rightCard = document.createElement('div');
            rightCard.classList.add('rightCard');
            movieCard.appendChild(rightCard);

            // 이름 요소 생성 및 텍스트 설정
            let title = document.createElement('p');
            title.classList.add('movieTitle');
            title.textContent = `${element['title']}`;
            rightCard.appendChild(title);

            // 설명 요소 생성 및 텍스트 설정
            let explanation = document.createElement('p');
            explanation.classList.add('explanation');
            explanation.textContent = `${element['overview']}`;
            rightCard.appendChild(explanation);

            // 평점 요소 생성 및 텍스트 설정
            let rating = document.createElement('p');
            rating.classList.add('rating');
            rating.textContent = `Rate: ${element['vote_average']}`;
            rightCard.appendChild(rating);

            document.getElementById('movieContent').appendChild(movieCard);

            //MovieCard 클릭 시 이벤트
            movieCard.addEventListener('click', function (event) {
                alert('영화 ID = ' + event.currentTarget.id);
            });
        });
    }).catch(error => {
        //오류 처리
        console.error('Fetch 오류:', error);
        alert('Fetch 오류: ' + error.message);
    });
};

function changedPage() {
    let searchTitle = sessionStorage.getItem('searchTitle');
    fetchMovie(searchTitle, document.getElementById('pageDropdown').value);
}

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