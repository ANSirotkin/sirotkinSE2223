const greeting = () => {
    return new Promise((resolve, reject) => {
    setTimeout((() => {
        resolve("Hello world");
    }), 2000);
    });
}

greeting().then((resolve) => {
    console.log(resolve);
});