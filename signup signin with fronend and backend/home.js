document.getElementById('addexpencebtn').addEventListener("click",myfuction);
function myfuction(e){
    console.log('helooo');
    const a=Number(document.getElementById("amount").value);
    e.preventDefault();
    if(document.getElementById('amount').value==''){
        alert("Please enter Expence amount");
        return
    }
    else{
        const addExpenseInfo={
            amount: a,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value
        };
        console.log(addExpenseInfo);
        const token=localStorage.getItem('token');
        axios.post('http://localhost:7000/user/addexpense',addExpenseInfo,{ headers:{"Authorization":token}}).then(result=>{
            console.log('added successfully');
        }).catch(err=>console.log(err));

    }

}