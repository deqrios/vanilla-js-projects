// * Login form
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password-check");

// => 입력받은 두개의 password가 동일한지 검사.
function checkPassword(password, password2) {
    if (password.value !== password2.value) {
        showError(password2, `Passwrods are not matching`);
    }
}

// => 입력받은 email을 check함.
function checkEmail(email) {
    const reference = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // :: email에 reference패턴을 대조하고 일치하면 OK, 일치하지 않으면 에러.
    if (reference.test(email.value.trim())) {
        // regexObj.test(str) : 정규식과 문자열 str이 일치하면 true. 그렇지 않으면 false.
        showSuccess(email);
    } else {
        showError(email, `Email is not emailForm`);
    }
}

// => 설정한 min과 max에 맞는지 검사 후 에러나 성공을 표출.
function checkLength(input, min, max) {
    // :: 입력받은 input이 min(max)보다 작으면(크면) 그에 맞는 msg와 함께 에러출력, 범위내에 값이라면 ok.
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at list ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than list ${min} characters`);
    } else {
        showSuccess(input);
    }
}

// => 입력받은 input의 id의 앞자리를 대문자로 변환하고 id를 반환.
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    // str.slice(beginIndex, endIndex) : 시작인덱스부터 끝인덱스까지 반환. -음수인덱스로 역방향으로 계산 가능.
}

// => 성공적인 처리를 보여주는 함수.
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "js-form-control form-control success";
}

// => 에러처리를 해주는 함수.
function showError(input, msg) {
    const formControl = input.parentElement;
    formControl.className = "js-form-control form-control error";
    const span = formControl.querySelector("span");
    span.innerText = msg;
}

// => 모든 요소를 검사하고, 검사결과에 맞게 에러나 성공을 표출.
function checkAll(array) {
    array.forEach(function (input) {
        // :: 빈 칸을 입력받을시 에러를 띄워주고, 아니면 성공적인 화면을 출력
        if (input.value.trim() === "") showError(input, `${getFieldName(input)} is Empty`);
        else showSuccess(input);
    });
}

// * EventListener등록
form.addEventListener("submit", function (event) {
    event.preventDefault();
    checkAll([username, email, password, password2]); // 입력창이 빈 칸인지 검사.
    checkLength(username, 5, 12); // username이 5~12자리인지 검사.
    checkLength(password, 8, 16); // password가 8~16자리인지 검사.
    checkEmail(email); // email형식에 맞는지 검사.
    checkPassword(password, password2); // 입력받은 두개의 비밀번호가 같은지 검사.
});
