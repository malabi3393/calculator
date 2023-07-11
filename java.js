var numberArea = document.querySelector('.number-area');
var buttons = document.querySelectorAll('.btn');


numberArea.textContent = '';
var currentNumber = '';
//to track the number of operators in our array
var nOperators = 0;
//using an array kinda like a stack 
var arr = [];
//when this is true, a previously calculated number is showing on the calculator display
var prevNum = false;
// will allow us to change the background color temporarily so that user knows what button they clicked

var opButtonInfo = [
    {button : '+', clicked : false, id : 'add'},
    {button : '-', clicked : false, id: 'sub'},
    {button : '/', clicked : false, id: 'div'},
    {button : '*', clicked : false, id: 'multi'}
];

buttons.forEach(btn =>btn.addEventListener('click', addToString));



function addToString(e) {
    //get the text content of the button that is clicked
    var symbol = e.target.textContent;
    //if there is any whitespace, remove it
    symbol = symbol.trim();
    //what is pressed is a number - do not increase nOperators here 
     if (!isNaN(symbol)) {
        //if there has been an operator button that was previously clicked, we are going to change it back to its original color
        let clickedButton = opButtonInfo.find(item => item.clicked === true);
        //if there is a button that has been clicked, we change it back to the original operator button color
        if (clickedButton !== undefined) {
            clickedButton.clicked = false;
            let theButton = document.getElementById(clickedButton.id);
            theButton.style.backgroundColor = '#efff93';
        }
        //if there is a number currently being displayed on our screen, we want to remove it so what the user adds does not concatenate with it 
        if (prevNum === true) {
            prevNum = false;
            numberArea.textContent = '';
        
        } 
        numberArea.textContent += symbol;
        currentNumber += symbol;
    } 
    //when what has been pressed is not a number
    else {

        if (e.target.id === 'C') {
            //clear both the screen and the currentNumber screen
            currentNumber = '';
            numberArea.textContent = '';
        } else if (e.target.id === '=') {

            //push the number (might need to add number checking) on the array

            arr.push(currentNumber);
            //perform operation on the last three elements in the array
            var calc = operate(arr[0], arr[1], arr[2]);

            //empty the array 
            arr = [];

            //empty currentNumber

            currentNumber = '';

            //display the results on the screen
            numberArea.textContent = calc;


            //set prevNum = true

            prevNum = true;

            //set number of operators = 0

            nOperators = 0;
    

        }
        
        //user clicked an operator symbol
        else {

            //get the id of the symbol
            var id = e.target.id;

            //getelementbyid 
            var opButton = document.getElementById(id);

            //gets the text content and trims it 
            var op = opButton.textContent.trim();

            //find the button in the array
            let clickedButton = opButtonInfo.find(item => item.button === op);

            //set the clicked boolen to true for that button
            clickedButton.clicked = true;
        
            //change background of said symbol 
            opButton.style.backgroundColor = '#b5c26e';


            //add the current number to the 'stack' (aka array)
            arr.push(currentNumber);
            //push the operator symbol to the array
            arr.push(symbol);
            //increase the number of operators
            nOperators++;
            if (performOperation(nOperators)) {

                prevNum = true;
                var num = operate(arr[0], arr[1], arr[2]);
                //adds the currently calculated number to the screen
                numberArea.textContent = num.toString();
                //remove all elements of the array except the last one
                arr = arr.slice(arr.length-1);
                //add the newly calculated number to the front of the array
                arr.splice(0,0, num);
            }
            //push the number and the symbol (this is the case where a operator button is pressed)
            currentNumber = '';
            prevNum = true;
        
        }

    } 
    
}

//this function tells us if we should perform an operation 
function performOperation(n) {
    if (nOperators === 2) {
        nOperators = 1;
        return true;
    } return false;
}


function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    var num;

    if (operator === '+') {num = add(a,b);}
    else if (operator === '-') {num = sub(a,b);}
    else if (operator === '/') {num = div(a,b);}
    else {num = multi(a,b);}


    return num;



}

function add(a, b) {
    return a+b;
}

function sub(a, b) {
    return a-b;
}

function multi(a, b) {
    return a*b;
}

function div(a, b) {
    return a/b;
}