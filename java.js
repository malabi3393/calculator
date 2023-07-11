var numberArea = document.querySelector('.number-area');
var buttons = document.querySelectorAll('.btn');

console.log(numberArea.textContent);

numberArea.textContent = '';

var calculation = '';

var nOperators = 0;
var arr = [];

aNumber = '';

// for (btn in buttons) {

//     buttons[btn].addEventListener('click', addToString);
// }

buttons.forEach(btn =>btn.addEventListener('click', addToString));

// numberArea.textContent = 'this is a test';
console.log(numberArea.textContent);

function addToString(e) {
    //get the id of the button clicked
    console.log(e.target.id);
    if (e.target.id !== 'add' && e.target.id !== 'sub' && e.target.id !== 'multi' && e.target.id !== 'div' 
    && e.target.id !== 'C' && e.target.id !== '=') {
        numberArea.textContent += e.target.id;
        calculation += e.target.id;
        console.log(`the value of calculation is ${calculation}`);
    } else {
        // if (e.target.id === 'add' || e.target.id === 'sub' || e.target.id === 'multi' || e.target.id === 'div') {
            
        // }
        if (e.target.id === 'add') {
            //add the + sign 
            calculation += '+';
            numberArea.textContent = '';
            nOperators ++;
            console.log(calculation);
        } else if (e.target.id === 'sub') {
            //add the - sign 
            calculation += '-';
            numberArea.textContent = '';
            nOperators ++;
            console.log(calculation);
        } else if (e.target.id === 'multi') {
            //add the * sign 
            calculation += '*';
            numberArea.textContent = '';
            nOperators ++;
        } else if (e.target.id === 'div') {
            //add the / sign 
            calculation += '/';
            numberArea.textContent = '';
            nOperators ++;
        } else if (e.target.id === 'C') {
            //clear both the screen and the calculation screen
            calculation = '';
            numberArea.textContent = '';
            console.log(calculation);
        } else {
            //call the function to turn the string into an array
            convertToArray(calculation);
        }
    } if (nOperators == 2) {
        nOperators = 1;
        convertToArray(calculation);
    }
    
}

function convertToArray(calculation) {

    
    arr = calculation.split('');

    var firstNo = '';
    var operator = '';
    var secondNo = '';
    var firstOp = true;

    for (i = 0; i <= arr.length - 2; i++) {
        if (arr[i] !== '+' && arr[i] !== '-' && arr[i] !== '/' && arr[i] !== '*' && firstOp === true) {
            firstNo += arr[i];
        } else if (!firstOp) {
            secondNo += arr[i];
        } else {
            firstOp = false;
            operator += arr[i];
        }
        
    }

    console.log(`the first number is ${firstNo}`);
    console.log(`the operator is ${operator}`);
    console.log(`the second number is ${secondNo}`);

    operate(firstNo, operator, secondNo);

}


function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    var num;

    if (operator === '+') {num = add(a,b);}
    else if (operator === '-') {num = sub(a,b);}
    else if (operator === '/') {num = div(a,b);}
    else {num = multi(a,b);}

    numberArea.textContent = num;

    console.log(num);

    console.log(arr);

    console.log(`the number of operators is ${nOperators}`);

    
    arr = arr.slice(arr.length-1);
    console.log(arr);

    arr.splice(0,0, num);
    console.log(`the array is now ${arr}`);



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