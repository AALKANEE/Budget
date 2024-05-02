//class
class Budget{
    constructor(budget){
        this.budget=budget;
    }
}

// every thing Related to the Html
class HTML{
    //insert user budget to the html
    insertBudget(amount){
        budgetTotal.innerHTML=amount
        budgetLeft.innerHTML=amount
    }

    // print all message for user in html
    printMessage(message,className){
        const div=document.createElement('div')
    div.classList.add('alert', 'text-center',className)
    const primary=document.querySelector('.primary')
    primary.insertBefore(div,addExpenseForm)
    div.appendChild(document.createTextNode(message)) 
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 3000);
    addExpenseForm.reset()
    }
    //display expenses to the list
    insertExpense(name,amount){
        const expenses=document.querySelector('#expenses ul')

        let li=document.createElement( "li" )
        li.className='list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML=`
        ${name}
          <span class="badge badge-primary badge-pill">${amount}</span>
        `

        expenses.appendChild(li)
    }
}


// variable
let userBudget;
let budget;
let budgetTotal=document.querySelector('span#total')
let budgetLeft=document.querySelector('span#left')
const addExpenseForm=document.querySelector('#add-expense')
const html=new HTML()



//eventListeners
eventListeners()
function eventListeners(){
    //take alert fot getting 
    document.addEventListener('DOMContentLoaded',function(){
        userBudget=prompt('please enter your weekly budget')
        console.log(userBudget)

        //validate user budget 
        if (userBudget===null || userBudget==='' || userBudget==='0') {
            window.location.reload()
        }else{
            // instanciate Budget class
            budget =new Budget(userBudget)
            console.log(budget)
            html.insertBudget(budget.budget)
        }
    })

    //get value from the form when submited
    addExpenseForm.addEventListener('submit',function(e){
        e.preventDefault()

        //access to the value of input
        const expense=document.querySelector('#expense').value
        const amount=document.querySelector('#amount').value
       
        if(expense==='' || amount===''){
            html.printMessage('همه موارد الزامی است','alert-danger')
        }else{
            html.insertExpense(expense,amount)
        }
    });
}

