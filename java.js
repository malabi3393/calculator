var numberArea = document.querySelector('.number-area');
var buttons = document.querySelectorAll('.btn');


numberArea.textContent = '';
var calculation = '';
var nOperators = 0;
var arr = [];
var prevNum = false;

buttons.forEach(btn =>btn.addEventListener('click', addToString));



function addToString(e) {
    var symbol = e.target.textContent;
    symbol = symbol.trim();

    //what is pressed is a number - do not increase nOperators here 
     if (!isNaN(symbol)) {
        if (prevNum === true) {
            prevNum = false;
            numberArea.textContent = '';
            numberArea.textContent += e.target.id;
        } else {
            numberArea.textContent += e.target.id;
        }

        calculation += e.target.id;
        console.log(`the value of calculation is ${calculation}`);
    } else {

        if (e.target.id === 'C') {
            //clear both the screen and the calculation screen
            calculation = '';
            numberArea.textContent = '';
            console.log(calculation);
        } else {
            arr.push(calculation);
            arr.push(symbol);
            numberArea.textContent = '';
            
            //increase the number of operators
            nOperators++;
            if (performOperation(nOperators)) {
                // debugger;
                prevNum = true;
                var num = operate(arr[0], arr[1], arr[2]);
                numberArea.textContent = num.toString();
                console.log(num);
                console.log(arr);
                console.log(`the number of operators is ${nOperators}`);
                arr = arr.slice(arr.length-1);
                console.log(arr);
                arr.splice(0,0, num);
                console.log(`the array is now ${arr}`);

            }
            //push the number and the symbol (this is the case where a operator button is pressed)


            calculation = '';
            console.log(`the array rn is is ${arr}`);
        }

    } 
    
}

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