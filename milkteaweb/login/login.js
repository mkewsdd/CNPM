const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var form = document.querySelector(".login");
function handleForm(event) { 
    event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);

function getUser() {
    const submit = $('.login__submit');
    const login = $('.login');

    submit.onclick = () => {
        var userEmail = login[0].value;    
        var userPassword = login[1].value;

        if(userEmail === '@' && userPassword === '1') {
            console.log(1);
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
getUser();