const value = (data) => {
    return new Promise((resolve, reject) => {
        if (isNaN(data)){
            reject("error");
        }

        else if (data % 2 === 0){
            setTimeout((() => {
                reject("even");
            }), 2000);
        } else{
            setTimeout((() => {
                resolve("odd");
            }), 1000);
        }
    })
}

value(4)
    .then((result) => {
        console.log(result);})
    .catch((result) => {
        console.log(result);
    });