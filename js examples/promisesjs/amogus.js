// function sum(num1, num2){
//     return num1 + num2;
// }

// let total = `The sum is ${sum(12, 9)}.`;
// console.log(total);

// let x = 4;
// let y = 8;

// let newTotal = "The sum of " + x + " and " + y + " is " + (x + y) + ".";
// console.log(newTotal);

// newTotal = `The sum of ${x} and ${y} is ${x + y}.`;
// console.log(newTotal);

function getUserName(callback) {
    const userName = prompt("enter your username dumbass");
    callback(userName);
}

function greeting(name) {
    document.getElementById("demo").innerHTML = 
    `<h1>Yo ${name}</h1>`;
}

getUserName(greeting);