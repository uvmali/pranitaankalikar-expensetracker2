document.getElementById('addexpencebtn').addEventListener("click",myfuction);
function myfuction(e){
    console.log('helooo');
    e.preventDefault();
    if(document.getElementById('amount').value==''){
        alert("Please enter Expence amount");
        return
       
 
    }
    else{
        const signinInfo={
            amount: document.getElementById("amount").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value
        };
        console.log(signinInfo);
    }

}