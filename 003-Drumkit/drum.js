// * Array의 내장함수 from으로 js-key들을 가지고 옴.
/*
    Array.from(obj, mapFn, thisArg) 배열로 리턴함.
    Array.from([1, 2, 3], x => x + x); //[2, 4, 6]
    ArrowFunction 사용가능.
 */
const keys = Array.from(document.querySelectorAll(".js-key"));

// => 설정된 키를 입력받았을 때 오디오를 실행하는 함수.
function playSound(event) {
    console.log(event); //  event obj의 정보 확인.
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`); // 입력된 키 값을 오디오에 대조.
    const keyEffect = document.querySelector(`div[data-key="${event.keyCode}"]`);

    // :: 입력받은 키값에 오디오가 존재하면 오디오를 실행.
    if (audio) {
        audio.currentTime = 0; // currentTime을 0으로 초기화. (초기화하지 않으면 이어서 재생 됨.)
        audio.play(); //  오디오 플레이!
        keyEffect.classList.add("effect"); //이펙트 추가.
    }
}

// => 이벤트 변화가 끝났을 때 이펙트 제거.
function removeTransition(event) {
    event.target.classList.remove("effect");
}
//각 js-key들에 이벤트 리스터 등록. transitionend 이벤트는 transition이 완료 되었을 때 발생하는 이벤트.
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playSound); //window객체에 이벤트 리스너 등록.
