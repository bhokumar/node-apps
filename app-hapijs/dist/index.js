"use strict";

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!');
    }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!');
    }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!');
    }, 3000);
});

const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!');
    }, 3000);
});

const allPromise = Promise.race([promise1, promise2, promise3, promise4]);

allPromise.then(data => {
    console.log(data, 'At line 30');
}).catch(error => {
    console.log(error, 'At line 32');
})

console.log('Hello world');

promise1.then(data => {
    console.log(data, 'fullFill Section');
}).catch(error => {
    console.log(error, 'Error Section line 40');
})

function sum(a1, a2) {
    return a1 + a2;
}

console.log(sum.apply(null, [20, 30]));
console.log(sum.call(null, 40, 60));