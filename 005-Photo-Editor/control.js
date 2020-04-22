// * controls클래스 내부에 input들을 전부 가져옴.
const inputs = document.querySelectorAll(".controls input");

// => 현재 데이터의 값을 받아 :root에 css값을 현재 데이터로 업데이트.
function cssUpdate(event) {
    const change = this.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + change);
}

// * 각각의 input에 change이벤트와 mousemove이벤트가 발생했을 때 작동할 이벤트 리스너를 등록.
inputs.forEach((input) => input.addEventListener("change", cssUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", cssUpdate));
