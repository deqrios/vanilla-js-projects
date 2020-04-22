// * mole & hole
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const start = document.querySelector(".start");

// * control games
let click = false; // 게임 on/off
let score; // 점수를 저장하는 변수
let lastIndex; // 최근에 실행된 hole을 저장하는 변수
let timeUp = false; // 타이머 on/off

// => 최소와 최대값을 받아, 그 사이의 랜덤한 수를 리턴. (milliseconds로 반환)
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// => 두더지가 나올 hole을 선정.
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length); // 선정될 hole을 랜덤값으로 받아옴.
    const hole = holes[index]; // 랜덤한 구멍하나를 hole변수에 대입.

    // :: 중복된 구멍이 선택되지 않게 최근 선택된 구멍이 현재 선택된 구멍과 같다면 다시 함수를 실행.
    if (hole === lastIndex) return randomHole(holes);
    lastIndex = hole; // 최근 선택된 hole을 현재 선택된 hole로 변경.

    return hole;
}

// => 두더지를 구멍에서 튀어나오게 표현
function popMole() {
    const hole = randomHole(holes);
    const time = randomTime(200, 1000);

    hole.classList.add("up");

    setTimeout(() => {
        hole.classList.remove("up");
        if (!timeUp) popMole();
    }, time);
}

// => 게임을 실행. 게임화면을 초기화
function startGame() {
    // :: 게임이 실행되지 않았다면, 게임에 필요한 정보들을 초기화하고 게임을 실행.
    if (!click) {
        click = true; // 게임 start를 표현.
        timeUp = false; // 시간을 초기화.
        scoreBoard.textContent = 0; // 점수 화면을 초기화.
        score = 0; // 점수를 초기화.

        popMole();

        // :: 10초후 설정된 명령을 처리하는 비동기 함수를 실행.
        setTimeout(() => {
            timeUp = true;
            click = false;
        }, 10000);
    }
}

// => 이벤트 발생시 score의 값을 증가, 이벤트 객체의 등록된 클래스 삭제, 화면에 점수 표현.
function hitMole(event) {
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}

// * 이벤트 리스너 등록
moles.forEach((event) => event.addEventListener("click", hitMole));
start.addEventListener("click", startGame);
