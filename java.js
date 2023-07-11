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

    
    var symbol = e.target.textContent;
    symbol = symbol.trim();

    //what is pressed is a number - do not increase nOperators here 
     if (!isNaN(symbol)) {
        //find the button in the array
        let clickedButton = opButtonInfo.find(item => item.clicked === true);
        if (clickedButton !== undefined) {
            clickedButton.clicked = false;
            let theButton = document.getElementById(clickedButton.id);
            theButton.style.backgroundColor = '#efff93';
        }
        if (prevNum === true) {
            prevNum = false;
            numberArea.textContent = '';
            numberArea.textContent += symbol;
        } else {
            numberArea.textContent += symbol;
        }
        currentNumber += symbol;
    } 
    //when what has been pressed is not a number
    else {

        if (e.target.id === 'C') {
            //clear both the screen and the currentNumber screen
            currentNumber = '';
            numberArea.textContent = '';
            //console.log(currentNumber);
        } else if (e.target.id === '=') {

            //console.log(currentNumber);
            //push the number (might need to add number checking) on the array

            arr.push(currentNumber);

            //lets just check the length; at this point it should be 3
            //console.log(arr.length);

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


            arr.push(currentNumber);
            arr.push(symbol);
            numberArea.textContent = '';
            
            //increase the number of operators
            nOperators++;
            if (performOperation(nOperators)) {
                // debugger;
                prevNum = true;
                var num = operate(arr[0], arr[1], arr[2]);
                numberArea.textContent = num.toString();
                //console.log(num);
                //console.log(arr);
                //console.log(`the number of operators is ${nOperators}`);
                arr = arr.slice(arr.length-1);
                //console.log(arr);
                arr.splice(0,0, num);
                

            }
            //push the number and the symbol (this is the case where a operator button is pressed)


            currentNumber = '';
            // //console.log(`the array rn is is ${arr}`);
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