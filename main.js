const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');


//dataset is data-key in index.html
let input = "";
for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);
        } else if (value == "=") {
            let result = eval(input);

            display_output.innerHTML = CleanOutput(result);
        } else if (value == "brackets") {
            if (input.indexOf("(") == -1 || 
            input.indexOf("(") != -1 && 
            input.indexOf(")") != -1 && 
            input.lastIndexOf("(") < input.lastIndexOf(")")) {
                input += "(";
            } else if (input.indexOf("(") != -1 && 
            input.indexOf(")") == -1 ||
            input.indexOf("(") != -1 &&
            input.indexOf(")") != -1 &&
            input.lastIndexOf("(") > input.lastIndexOf(")")) {
                input += ")";
                display_input.innerHTML = input;
            }
            
            display_input.innerHTML = CleanInput(input);
        } else {
            if (validation(value)) {
                input += value;
                display_input.innerHTML = CleanInput(input);
            }   
        }
    })
}
function CleanInput(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">×</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">÷</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `; 
        } else if (input_array[i] == "(") {
            input_array[i] = `<span class="brackets">(</span>`; 
        } else if (input_array[i] == ")") {
            input_array[i] = `<span class="brackets">)</span>`; 
        } else if (input_array[i] == "%") {
            input_array[i] = ` <span class="percent">%</span> `; 
        }
    }   
        return input_array.join("");
}

function CleanOutput(output) {
    let outputString = output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];

    let outputArr = outputString.split("");
    
    if (outputArr.length > 3) {
        for (let i = outputArr.length - 3; i > 0; i -= 3) {
            outputArr.splice(i, 0, ",");
        }
    }
    if (decimal) {
        outputArr.push(".");
        outputArr.push(decimal);
    }
    return outputArr.join("");
}

function validation (value) {
    let lastInput = input.slice(-1);
    if (value == "*" && lastInput == "*") {
        return false
    }
    if (value == "-" && lastInput == "-") {
        return false
    }
    if (value == "+" && lastInput == "+") {
        return false
    }
    if (value == "/" && lastInput == "/") {
        return false
    }
    if (value == "." && lastInput == ".") {
        return false
    }
    return true;
}
