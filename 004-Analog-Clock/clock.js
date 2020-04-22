// * 시침, 분침, 초침
const hours = document.querySelector(".js-hours");
const minutes = document.querySelector(".js-minutes");
const seconds = document.querySelector(".js-seconds");

// => 현재시간을 받아와서 시침, 분침, 초침을 표현한다.
function setDate() {
    const current = new Date();

    const hour = current.getHours();
    const minute = current.getMinutes();
    const second = current.getSeconds();

    const hourDegree = (hour / 12) * 360 + minute / 60 + 90;
    const minDegree = (minute / 60) * 360 + (second / 60) * 6 + 90;
    const secondDegree = (second / 60) * 360 + 90;

    seconds.style.transform = `rotate(${secondDegree}deg)`;
    minutes.style.transform = `rotate(${minDegree}deg)`;
    hours.style.transform = `rotate(${hourDegree}deg)`;
}

// => setDate()함수를 1초에 한번씩 실행한다.
function initClock() {
    setDate();
    setInterval(setDate, 1000);
}

// * 호출부
initClock();
