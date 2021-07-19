const token=localStorage.getItem('token');
document.getElementById('addexpencebtn').addEventListener("click",myfuction);


function myfuction(e){
    
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
        //console.log(addExpenseInfo);
        
        axios.post('http://localhost:7000/user/addexpense',addExpenseInfo,{ headers:{"Authorization":token}}).then(result=>{
            console.log('added successfully');
            //console.log(result.data.expense);
            addNewExpenseto(result.data.expense);
            //console.log(document.querySelector('form'))
            document.querySelector('form').reset();

        }).catch(err=>console.log(err));

    }


}
window.addEventListener('load', ()=> {
    axios.get('http://localhost:7000/user/getexpenses', { headers: {"Authorization" : token} }).then(response => {
        if(response.status === 200){
            //console.log(response.data.ispremiumuser);
            if(response.data.ispremiumuser==true){
                document.getElementById('body').style.background='-webkit-linear-gradient(left, #727175, #1f161a)';

            }
           
            response.data.expenses.forEach(element => {
                addNewExpenseto(element);
            });
           
        } else {
            throw new Error();
        }
    })
    
});

function addNewExpenseto(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.amount} - ${expense.category} - ${expense.description}
            <button id='deletebtn' onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li><br>`
}

function deleteExpense(e, expenseid) {
    axios.delete(`http://localhost:7000/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}


document.getElementById('rzp-button1').onclick = async function (e) {
    
    const response  = await axios.get('http://localhost:7000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:7000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now');
             document.getElementById('body').style.background='-webkit-linear-gradient(left, #727175, #1f161a)';
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}

