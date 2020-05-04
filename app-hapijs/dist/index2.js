const promise = Promise.all([1, 2, 3]);

promise.then(data => {
    console.log(data);
});
