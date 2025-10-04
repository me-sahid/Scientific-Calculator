let eqlPressed = false;
let screen = document.getElementById("input-screen");
let input_buttons = document.querySelectorAll(".input-button");
let equal = document.getElementById("equal");
let erase = document.getElementById("erase");
let clear = document.getElementById("ac");
let percentage = document.getElementById("percentage");
let ifSciCalClicked = false;
let base = null;
let ifpowerMode = false;

input_buttons.forEach((button_clicked) =>{
    button_clicked.addEventListener("click", () =>{
        if(eqlPressed === 1){
            screen.value = "";
            eqlPressed = false;
        }else{
            screen.value += button_clicked.value;
        }
    });
});

clear.addEventListener("click", () =>{screen.value = ""});
erase.addEventListener("click", () =>{
    let num = screen.value;
    screen.value = num.slice(0,-1);
});

equal.addEventListener("click", () => {
    if(!ifSciCalClicked){
        let input_val = screen.value
        try{
            let solution = eval(input_val);
            if(Number.isInteger){
                screen.value = solution;
            }else{
                screen.value = solution.toFixed(2);
            }
            eqlPressed = true;
        }
        catch(err){
            alert("Error")
            eqlPressed = false;
        }
    }
    else{
        let res = screen.value.match(/^([a-z]+)\((.+)\)$/)?.slice(1);
        const [method,value] = res;
        calculateSciFunction(method,value);
    }
    ifSciCalClicked = false;

    if(ifpowerMode && base !== null){
        const expo = parseFloat(screen.value);
        screen.value = Math.pow(base,expo);
        base = null;
        ifpowerMode = false;
    }
});
percentage.addEventListener("click",()=>{
    let value = screen.value;
    try{
        let calc = eval(value);
        let percentage = calc/100;
        screen.value = percentage;
    }
    catch(err){
        alert("Error!")
    }
});

function calculateSciFunction(sci, value){
    let result;
    let expression = value.split("+").map(parseFloat);
    const currentInputVal = expression.reduce(
        (acc,currentVal) => acc+currentVal,
        0
    );

    switch(sci){
        case "sin":
            result = Math.sin(currentInputVal);
            break;
        case "cos":
            result = Math.cos(currentInputVal);
            break;
        case "tan":
            result = Math.tan(currentInputVal);
            break;
        case "e":
            result = Math.exp(currentInputVal);
            break;
        case "log":
            result = Math.log(currentInputVal);
            break;
        case "x^y":
            result = Math.pow(currentInputVal);
        default:
            break;
    }
    if(result !== undefined)screen.value = result.toFixed(11);
    else alert("Error"); 
}

document.getElementById("sin").addEventListener("click",()=>{
    ifSciCalClicked =true;
    screen.value = (`sin(${screen.value})`)
});
document.getElementById("cos").addEventListener("click",()=>{
    ifSciCalClicked =true;
    screen.value = (`cos(${screen.value})`)
});
document.getElementById("tan").addEventListener("click",()=>{
    ifSciCalClicked =true;
    screen.value = (`tan(${screen.value})`)
});
document.getElementById("log").addEventListener("click",()=>{
    ifSciCalClicked =true;
    screen.value = (`log(${screen.value})`)
});
document.getElementById("e").addEventListener("click",()=>{
    ifSciCalClicked =true;
    screen.value = (`e(${screen.value})`)
});
document.getElementById("pie").addEventListener("click",()=>{
    ifSciCalClicked =true;
    screen.value = 3.14;
});
document.getElementById("pow").addEventListener("click",()=>{
    base = parseFloat(screen.value);
    ifpowerMode =true;
    screen.value = "";
});
