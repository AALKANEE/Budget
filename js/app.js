//class
class Budget{
    constructor(budget){
        this.budget=budget;
    }
}



// variable
let userBudget;
let budget;




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
        }
    })
}

