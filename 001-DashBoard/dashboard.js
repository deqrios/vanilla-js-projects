// * time display
const clockContainer = document.querySelector(".clock");
const clockText = clockContainer.querySelector("h1"); //.clock내의 h1을 불러옴. // 이런 방식으로 의존성 배제가능.

// * username
const form = document.querySelector(".form");
const username = document.querySelector(".username");
const input = document.querySelector("input");

// * background
const body = document.querySelector("body");

// * todo
const todoform = document.querySelector(".todo-form");
const todoinput = document.querySelector(".todo-input");
const todolist = document.querySelector(".todo-list");

// * weather
const weather = document.querySelector(".weather");

const API_KEY = config.API_KEY;
const COORDS = "coords"; //  로컬스토리지 좌표의 key값
const USER = "current"; //  로컬스토리지 유저명의 key값
const SHOW = "show"; //  show클래스명
const TODO = "todo"; //  로컬스토리지 todo의 key값
const MAX = 3; //  이미지의 총 갯수

let todo = []; //  입력받은 todo를 담을 배열.

// * ------------------------------- usernmae 함수부 -------------------------------

// => 입력받은 USER를 로컬스토리지에 저장.
function saveName(current) {
    localStorage.setItem(USER, current);
}

// => SHOW라는 클래스를 visible/invisible로 사용하여 기존에 보여주던 문구를 가리고 새로운 문구를 표출.
function loadHello(current) {
    form.classList.remove(SHOW);
    username.classList.add(SHOW);
    username.innerText = `Hello ${current}!`;
}

// => submit이벤트가 발생하면 입력받은 USER를 각각 함수에게 전달.
function NameSubmitHandler(event) {
    event.preventDefault(); //  업데이트 되면서 새로고침 되는걸 방지.
    const current = input.value;
    loadHello(current);
    saveName(current);
}

function askName() {
    form.classList.add(SHOW);
    form.addEventListener("submit", NameSubmitHandler);
}

// => 로컬스토리지에 저장되어있는 USER를 가져옴.
function getName() {
    const current = localStorage.getItem(USER);

    // :: 로컬스토리지에 USER정보가 없다면 USER정보를 입력할 수 있는 입력창을 보여주고, 있으면 USER에게 인사문구를 보여줌.
    if (current == null) {
        askName();
    } else {
        loadHello(current);
    }
}

// * ------------------------------- Background 함수부 -------------------------------

// => 3가지 image중에 한가지를 랟덤하게 가져와서 backgrond로 보여줌.
function loadBackground(random) {
    const image = new Image();

    image.src = `images/${random + 1}.jpg`;
    image.classList.add("bg");
    body.prepend(image);
}

// => 랜덤한 수 생성
function genRandom() {
    const id = Math.floor(Math.random() * MAX);
    return id;
}

// * ------------------------------- todo 함수부 -------------------------------

// => 버튼클릭 이벤트가 발생한 todo를 삭제하고 새로운 todo배열을 저장함.
function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todolist.removeChild(li);

    // :: Array.filter()메소드를 이용해서 삭제한 id값을 배제하고 새로운 배열을 생성
    const rm = todo.filter(function (todos) {
        return todos.id !== parseInt(li.id);
    });

    todo = rm;
    saveTodo();
}

function saveTodo() {
    localStorage.setItem(TODO, JSON.stringify(todo)); // 문자열로 변환하여 로컬스토리지에 저장.(브라우저에선 모든 정보를 string으로 저장.)
}

// => 입력받은 새로운 데이터를 todo배열에 push하고 저장.
function loadTodo(current) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = Date.now();

    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", deleteTodo);
    span.innerText = current;

    li.appendChild(deleteBtn);
    li.appendChild(span);
    li.id = newId;
    todolist.appendChild(li);

    const obj = {
        text: current,
        id: newId,
    };

    todo.push(obj);
    saveTodo();
}

// => submit 이벤트가 발생하면 loadTodo에 todo정보를 건네주고 input창을 ""로 초기화
function todoSubmitHandler(event) {
    event.preventDefault();

    const current = todoinput.value;
    loadTodo(current);
    todoinput.value = "";
}

// => 로컬스토리지에 저장되어있는 todo를 가져옴.
function getTodo() {
    const load = localStorage.getItem(TODO);

    // :: load가 null값이 아닌경우 오브젝으로 파싱하고 (로컬스토리지에 저장된 값이 string이어서) 읽어온다.
    // ! JSON.parse()를 사용할 때 주의점. -- 문자열이 JSON 형식에 맞지않으면 에러가 발생.
    if (load != null) {
        const parsed = JSON.parse(load);
        parsed.forEach(function (todo) {
            loadTodo(todo.text);
        });
    }
}

// * ------------------------------- weather 함수부 -------------------------------

// => openweathermap이라는 API를 사용하여 현재위치의 날씨와 온도 정보를 사용자에게 보여줌.
function getWeather(latitude, longitude) {
    // 여기선 fetch().then()형식으로 API를 받아온다. (openweathermap 형식에 따라 정보를 요청.)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric
    `)
        .then(function (response) {
            return response.json(); //  정보를 json형식으로 받아옴.
        })
        .then(function (json) {
            console.log(json); //  이런식으로 어떤정보가 어디에 담겨있는지 볼 수 있음.
            // 우리가 원하는 데이터 로딩이 끝났음!
            const temp = json.main.temp;
            const city = json.name;
            const wth = json.weather[0].main;
            weather.innerText = `${city} ${temp}도 ${wth}`;
        });
}

// => 로컬스토리지에 현재유저의 위치정보를 string으로 변환하여 저장.
function saveCoords(userLocation) {
    localStorage.setItem(COORDS, JSON.stringify(userLocation));
}

// => 위치를 받아올 수 없다면 에러 메세지를 띄움.
function errorHandler() {
    alert("You need to connect internet!!!");
}

// => 성공적으로 받아온 현재위치정보를 object 형식으로 저장함.
function requestHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userLocation = {
        // 저장하려는 키랑 벨류 이름이 똑같으면 생략할 수 있음!
        latitude,
        longitude,
    };

    saveCoords(userLocation);
}

// => 윈도우 내장객체인 navigator를 활용하여 사용자에게 동의를 구하고 기기의 현재위치를 받아옴.
function askCoords() {
    navigator.geolocation.getCurrentPosition(requestHandler, errorHandler); //  (successCallback, errorCallback?, options?)
}

// => 로컬스토리지에 저장되어있는 위치정보를 받아옴.
function getCoords() {
    const loaded = localStorage.getItem(COORDS);

    // :: 로컬스토리지에 위치정보가 있으면 json형식으로 parse해서 getWeather함수의 인자로 넘겨주고, 없으면 위치정보를 물어본다.
    if (loaded === null) {
        askCoords();
    } else {
        const parsed = JSON.parse(loaded);
        getWeather(parsed.latitude, parsed.longitude);
    }
}

// * ------------------------------- clock 함수부 -------------------------------

// => time display에 뿌려줄 time을 브라우저에서 가져옴
function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const secondes = date.getSeconds();

    // :: 시,분,초가 10 이하라면 앞자리에 0을 붙여서 표현
    clockText.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${
        secondes < 10 ? `0${secondes}` : secondes
    }`;
}

function initClock() {
    getTime(); //선 조치!
    setInterval(getTime, 1000); //  비동기 함수로 1000밀리세컨드마다 getTime함수를 실행.
}

function initName() {
    getName();
}

function initBackground() {
    const rd = genRandom(); //  랜덤 수를 생성.
    loadBackground(rd); //  랜덤 이미지를 background로 설정.
}

function initTodo() {
    getTodo();
    todoform.addEventListener("submit", todoSubmitHandler);
}

function initWeather() {
    getCoords();
}

// * 호출부
initClock();
initName();
initBackground();
initTodo();
initWeather();
