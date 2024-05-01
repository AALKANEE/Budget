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
        console.log(budgetTotal)
        console.log(budgetLeft)
    }

}


// variable
let userBudget;
let budget;
let budgetTotal=document.querySelector('span#total')
let budgetLeft=document.querySelector('span#left')
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
}

