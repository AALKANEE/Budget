//class




// variable
let userBudget;



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
            
        }
    })
}



