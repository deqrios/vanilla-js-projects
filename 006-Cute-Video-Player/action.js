// * control css
const player = document.querySelector(".js-player");
const video = player.querySelector(".js-video");
const toggle = player.querySelector(".js-toggle");
const progress = player.querySelector(".js-progress");
const progressBar = player.querySelector(".js-pass-progress");
const dataSkip = player.querySelectorAll("[data-skip]");
const range = player.querySelectorAll(".js-slider");

let mouseDown = false; // on/off control

// => 상태에 따라 현재 재생시간을 조정.
function moveProgress(event) {
    const time = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;
}

// => 발생한 이벤트의 값을 영상에 반영함.
function changeRange(event) {
    video[this.name] = this.value;
}

// => 비디오를 설정된 skip-data에 맞게 skip play함.
function skipVideo(event) {
    video.currentTime += parseFloat(this.dataset.skip);
}

// => 비디오의 재생시간을 표현.
function handleProgress(event) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// => 상태에 따라 버튼의 텍스트를 변경.
function changeButton(event) {
    const icon = this.paused ? ">" : "||";
    toggle.textContent = icon;
}

// => 비디오를 재생, 일시정지 시킴.
function togglePlay(event) {
    const method = video.paused ? "play" : "pause";
    video[method]();
    toggle.title = video.paused ? "play" : "pause"; // ? 왜 method를 바로 적용하면 한번 씹히고 적용되는걸까?
}

// * EventLister등록
toggle.addEventListener("click", togglePlay); // (버튼)클릭시, 영상 재생과 일시정지
video.addEventListener("click", togglePlay); // (영상)클릭시, 영상 재생과 일시정지
video.addEventListener("play", changeButton); // 영상 재생시, 버튼변경
video.addEventListener("pause", changeButton); // 영상 재생시, 버튼변경
video.addEventListener("timeupdate", handleProgress); // 영상의 시간이 업데이트 될 때마다 currentTime을 표현
dataSkip.forEach((button) => button.addEventListener("click", skipVideo)); // 스킵버튼 클릭시, 설정된 수치만큼 영상스킵
range.forEach((range) => range.addEventListener("change", changeRange)); // range변동시, range바에 반영.
range.forEach((range) => range.addEventListener("mousemove", changeRange)); //
progress.addEventListener("mousedown", () => (mouseDown = true)); // 마우스를 누르고 있을 때만 영상에 반영되게 조절.
progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("click", moveProgress); // progress바를 직접 클릭했을 때 클릭한 지점으로 영상이 skip되게 함.
progress.addEventListener("mousemove", (event) => mouseDown && moveProgress(event)); // 마우스를 누른상태로 움직여야만 그에 맞게 영상이 skip.
