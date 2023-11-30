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
    const fpForm = $('.form_fp');
    const fpBtn = $('.forget_password_container');
    const closeFpForm = $('.close_form_fp');
    const checkEmail = $('.check_email_container');
    const emailInput = $('#emailInput');
    const verificationAnswers = $$('input[name="verificationAnswer"]');
    const searchButton = $('#searchButton');
    const verifyButton = $('#verifyButton');
    const notification = $('.password_reset_notification');
    const closeNotification = $('.password_reset_notification_close_btn');

    fpBtn.addEventListener('click', function(){
        fpForm.style.display = 'flex';
    });

    closeFpForm.addEventListener('click', function(){
        clearForm();
        fpForm.style.display = 'none';
    });

    verifyButton.addEventListener('click', verifyAnswer);

    function clearForm() {
        emailInput.value = ''; // Clear the email input

        verificationAnswers.forEach(answer => {
            answer.checked = false; // Uncheck all radio buttons
        });

        checkEmail.style.display = 'none';
        searchButton.disabled = true;
    }

    function verifyAnswer() {
        var selectedAnswer = document.querySelector('input[name="verificationAnswer"]:checked');
        var emailInputValue = emailInput.value;

        if (selectedAnswer && selectedAnswer.value === "9" && emailInputValue) {
            checkEmail.style.display = 'block';
            searchButton.disabled = false;
        } else if (selectedAnswer && !emailInputValue) {
            alert('Please enter your email address.');
        } else if (!selectedAnswer && emailInputValue) {
            alert('Please answer the verification question.');
        } else {
            alert('Your verification answer is wrong please answer again.');
        }
    }

    function notificationFormHandle() {
        checkEmail.addEventListener('click', function(e) {
            e.preventDefault();
            if(notification.style.display = 'none'){
                clearForm();
                notification.style.display = 'flex';
                fpForm.style.display = 'none';
            }
        })

        closeNotification.addEventListener('click', function(e) {
            if(notification.style.display = 'flex'){
                notification.style.display = 'none';
            }
        })
    }
    notificationFormHandle();

}
forgetPasswordHandle();