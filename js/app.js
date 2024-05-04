//class
class Budget{
    constructor(budget){
        this.budget=budget;
        this.budgetLeft=this.budget
    }

    subtractFromBudget(amount){
        return this.budgetLeft -= amount;

       
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
    div.appendChild(document.createTextNode(message)) 
    
    const primary=document.querySelector('.primary')
    primary.insertBefore(div,addExpenseForm)
   
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

    // subtract expense from the budget
    trackBudget(amount){
        const budgetLeftTomans=budget.subtractFromBudget(amount);
        budgetLeft.innerHTML=`${budgetLeftTomans}`

        
        if((budget.budget /4) > budgetLeftTomans){
            //if less than 25% budgt left change color to the warning
            budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning')
            budgetLeft.parentElement.parentElement.classList.add('alert-danger')

        }else if((budget.budget /2) > budgetLeftTomans){
            //if less than 25% budgt left change color to the warning
            budgetLeft.parentElement.parentElement.classList.remove('alert-success')
            budgetLeft.parentElement.parentElement.classList.add('alert-warning')
        }
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
            html.trackBudget(amount)
        }
    });
}

