const fetchData = () => {
    const promise = new Promise((resolve, rejcet) => {
        setTimeout(() => {
            resolve('Done');
        }, 1500);
    });
    return promise;
}

setTimeout(() => {
    console.log('Timer is done');
    const fetchDataPromise = fetchData();
    fetchDataPromise.then(data => console.log(data))
}, 2000);



console.log('Hello');
console.log('World!');