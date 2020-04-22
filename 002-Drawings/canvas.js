// * canvas
const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d"); //  2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D 객체를 생성.

// * button
const option = document.querySelector(".js-option");
const save = document.querySelector(".js-save");

// * palette
const color = document.getElementsByClassName("js-color");
const range = document.querySelector(".js-range");

// * 캔버스 초기값 상수.
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;
const DEFAULT_COLOR = "#cdcefc";

// * 캔버스 초기화 작업.
canvas.width = CANVAS_WIDTH; //  캔버스의 가로크기 설정.
canvas.height = CANVAS_HEIGHT; //  캔버스의 세로크기 설정.
ctx.strokeStyle = DEFAULT_COLOR; //  캔버스의 기본 drawing color 설정.
ctx.fillStyle = DEFAULT_COLOR; //  캔버스의 기본 fill color 설정.
ctx.lineWidth = 2.5; //  캔버스의 기본 drawing 굵기 설정.

// * on/off 역할을 하는 스위치.
let drawing = false;
let painting = false;

// => 그림 이미지 다운로드.
function saveClickHandler(event) {
    const image = canvas.toDataURL(); //  (type, encoderOptions)  캔버스의 데이터 URL을 리턴해줌. (기본확장자 - PNG)
    const link = document.createElement("a"); //  새로운 요소 a태그 생성.
    link.href = image; //   image로 하이퍼 링크 생성.
    link.download = "Drawings @FloatFerry"; //  저장된 URL을 설정한 파일명으로 저장함. (링크를 탐색대신 다운로드)
    link.click(); //  클릭 이벤트 발생시킴.
}

// => 이벤트 발생시 기능 변경. (배경색 채움 -> 라인 그리기)
function optionClickHandler(event) {
    // :: 버튼 내부 text 수정, painting의 상태 변경.
    if (painting) {
        painting = false;
        option.innerText = "Paint";
    } else {
        painting = true;
        option.innerText = "Line";
    }
}

// => rangebar의 value를 받아와서 라인의 굵기 설정.
function rangeChangeHandler(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// => 이벤트가 발생한 객체의 배경색을 가져와서 DEFAULT_COLOR를 변경.
function colorHandler(event) {
    const picked = event.target.style.backgroundColor;
    ctx.strokeStyle = picked;
    ctx.fillStyle = picked;
}

// => 캔버스 배경색을 painting색으로 채움.
function canvasClickHandler(event) {
    // :: painting의 상태에 따라 캔버스 전체 배경을 채움.
    if (painting) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

// => drawing 변수 상태 변경. (그리기 시작)
function startDrawing(event) {
    drawing = true;
}

// => drawing 변수 상태 변경. (그리기 멈춤)
function stopDrawing(event) {
    drawing = false;
}

// => 이벤트 발생에 따른 상태 변경.
function onMouseUp(event) {
    stopDrawing();
}

// => 마우스 움직임에 반응하는 이벤트 핸들러.
function onMouseMove(event) {
    const X = event.offsetX;
    const Y = event.offsetY;

    // :: 마우스의 좌표값을 받아서, drawing의 상태에 따라 색을 채움.
    if (!drawing) {
        ctx.beginPath();
        ctx.moveTo(X, Y);
    } else {
        ctx.lineTo(X, Y);
        ctx.stroke();
    }
}

// * 이벤트 실행부.
// ! if()안에 넣는 이유 - 인자로 넘겨준 객체가 있어야만 실행되게 하기 위해서.
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("click", canvasClickHandler);
}

if (color) {
    Array.from(color).forEach((color) => color.addEventListener("click", colorHandler)); //  Array.from().forEach()로 각각의 color버튼에 이벤트 리스너 등록.
}

if (range) {
    range.addEventListener("input", rangeChangeHandler);
}

if (option) {
    option.addEventListener("click", optionClickHandler);
}

if (save) {
    save.addEventListener("click", saveClickHandler);
}
