//class
class Budget{
    constructor(budget){
        this.budget=budget;
        this.budgetLeft=this.budget
    }

    subtractFromBudget(amount){
        return this.budgetLeft -= amount;
    }

    addBackToBudget(amount){
        return this.budgetLeft += amount;
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
        this.removeBtn(li,amount);

        expenses.appendChild(li)
    }

    // subtract expense from the budget
    trackBudget(amount){
        const budgetLeftTomans=budget.subtractFromBudget(amount);
        budgetLeft.innerHTML=`${budgetLeftTomans}`

        
        if((budget.budget /4) >= budgetLeftTomans){
            //if less than 25% budgt left change color to the warning
            budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning')
            budgetLeft.parentElement.parentElement.classList.add('alert-danger')

        }else if((budget.budget /2) > budgetLeftTomans){
            //if less than 25% budgt left change color to the warning
            budgetLeft.parentElement.parentElement.classList.remove('alert-danger')
            budgetLeft.parentElement.parentElement.classList.add('alert-warning')
        }else{
            budgetLeft.parentElement.parentElement.classList.remove('alert-danger','alert-warning')
            budgetLeft.parentElement.parentElement.classList.add('alert-success');
        }
     
    }
    
    // remove wrong expense
    removeBtn(expense,amount){
        const removeBtn=document.createElement('button')
        removeBtn.textContent= 'X'
        removeBtn.classList='remove-expense'
        removeBtn.classList.add('btn','btn-danger','btn-sm','float-right','remove-btn')
        expense.appendChild(removeBtn)

        //Add event for remove button
    removeBtn.addEventListener('click',()=>{
        expense.remove();// remove expense from the dom
        budget.addBackToBudget(parseFloat(amount)); //add back the removed amount to the budget
        html.updateBudgetDisplay();
        html.removeExpenseInLocalStorage(name);
    });
    }
    updateBudgetDisplay(){
        budgetLeft.innerHTML=budget.budgetLeft;
    }
    // add to local storage
    addExpenseToLocalStorage(expense,amount){
        const expenses=JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push({expense,amount});
        localStorage.setItem('expenses',JSON.stringify(expenses));
    }
    // recovery from local storage
    getExpensesFromLocalStorage(){
        const expenses=JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => {
            html.insertExpense(expense.name,expense.amount);
            html.trackBudget(expense.amount)});
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
        if (!userBudget || isNaN(userBudget) ||userBudget.trim()===''  || parseFloat(userBudget) <=0) {
            window.location.reload()
        }else{
            // instanciate Budget class
            budget =new Budget(userBudget)
            console.log(budget)
            html.insertBudget(budget.budget)

            //get expenses from localStorage and display them
            html.getExpensesFromLocalStorage();
        }
    })

    //get value from the form when submited
    addExpenseForm.addEventListener('submit',function(e){
        e.preventDefault()

        //access to the value of input
        const expense=document.querySelector('#expense').value
        const amount=document.querySelector('#amount').value
       
        if(isFinite(expense) || expense.trim()==='' || amount.trim()==='' || parseFloat(amount) <=0 || isNaN(amount)){
            html.printMessage('همه موارد الزامی است','alert-danger')
        }else{
            html.insertExpense(expense,amount)
            html.trackBudget(amount);
            html.addExpenseToLocalStorage(expense,amount);// add expense to local Storage
        }
    });
    

}

