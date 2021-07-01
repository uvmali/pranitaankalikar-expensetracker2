const subtn= document.getElementById("subtn");
const signinbtn= document.getElementById("signinbtn");
signinbtn.addEventListener("click",mysigninfunct);
subtn.addEventListener("click",mysignup);

function mysigninfunct(e){
    console.log('this is signin');
    e.preventDefault();
    const signinInfo={
        email: document.getElementById("siemail").value,
        password: document.getElementById("sipassword").value
    };
    console.log(signinInfo);
    axios.post('http://localhost:7000/user/signin',signinInfo)
    .then(result=>{
        console.log(result.data.message);
        console.log(result.data.success);
        //showNotification(result.data.message,!(result.data.success));
        //localStorage.setItem('token', result.data.token);
        if(result.data.success==true){
                console.log('helllo');
                document.location.href="home.html";
        }
        localStorage.setItem('token', result.data.token);
    })
    .catch((err)=>{
        console.log(err);
        showNotification('Fail to login',true);
    });
    document.querySelectorAll('form')[0].reset();

};
function mysignup(e){
    e.preventDefault();
    console.log(document.getElementById("suname").value);
    const signupInfo={
        name: document.getElementById("suname").value,
        email: document.getElementById("suemail").value,
        contact: document.getElementById("sucontact").value,
        password: document.getElementById("supassword").value
    };
    
    console.log(signupInfo);
    axios.post('http://localhost:7000/user/signup',signupInfo)
    .then((result)=>{
        console.log("succesful");
        showNotification("Successfuly registered",false);
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";


    })
    .catch((err)=>{
        console.log(err);
        showNotification("Fail to register",true);


    });
    document.querySelectorAll('form')[1].reset();
    //document.querySelector("mysignup").reset();

}
function showNotification(message, iserror){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.style.backgroundColor = iserror ? 'red' : 'green';
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500);
}