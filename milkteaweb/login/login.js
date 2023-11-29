const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var form = document.querySelector(".login");
function handleForm(event) { 
    event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);

function UserHandle() {
    const submit = $('.login__submit');
    const login = $('.login');

    submit.onclick = () => {
        var userEmail = login[0].value;    
        var userPassword = login[1].value;

        if(userEmail === '@' && userPassword === '1') {
            window.location.href = '../web/home.html';
        } 
        else if (userEmail == '' || userPassword =='') { 
            alert("please enter your email and password");
        }
        else {
            login[0].value = null;
            login[1].value = null;
            alert("your email or your password is incorrect");
        }
    }
}
UserHandle();

form.addEventListener('submit', handleForm);
function RegisterHandle() {
    const loginForm = $('.container');
    const RegisterBtn = $('.register__submit');
    const closeRegisterForm = $('.close__signUp');
    const signUp = $('.signUp__container__form');
    
    RegisterBtn.addEventListener('click', function(){
        console.log(1);
        signUp.style.display = 'flex';
    });

    closeRegisterForm.addEventListener('click', function(){
        console.log(1);
        signUp.style.display = 'none';
    });
}
RegisterHandle();

function forgetPasswordHandle() {
    const fpBtn = $('.forget_password_container');
    const fpForm = $('.form_fp');
    const closeFpForm = $('.close_form_fp');
    const checkEmail = $('.check_email_container');

    fpBtn.addEventListener('click', function(){
        fpForm.style.display = 'flex';
    })

    closeFpForm.addEventListener('click', function(){
        fpForm.style.display = 'none';
    });

    checkEmail.addEventListener('click', function(){
        fpForm.style.display = 'none';
    });

}
forgetPasswordHandle();

function verifyAnswer() {
    var selectedAnswer = document.querySelector('input[name="verificationAnswer"]:checked');
    if (selectedAnswer && selectedAnswer.value === "9") {
        document.querySelector('.check_email_container').style.display = 'block';
        document.getElementById('searchButton').disabled = false;
    } else {
        alert('Incorrect answer. Please try again.');
    }
}

document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your code to handle the form submission here
});
verifyAnswer();