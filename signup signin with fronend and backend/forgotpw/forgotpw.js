document.getElementById('forgotpwbtn').addEventListener("click",forgotpwbtnfunct);
function forgotpwbtnfunct(e){
    e.preventDefault();
    console.log('helooo');
    const forgotpwInfo={
        email:document.getElementById('email').value
    }
    console.log(forgotpwInfo);
    axios.post('http://localhost:7000/password/forgot',forgotpwInfo);

    

}