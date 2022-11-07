let promiseCleanRoom = new Promise((resolve, reject) => {
    let isClean = true;
  
    if (isClean) {
      resolve("clean.");
    } else {
      reject("not clean.");
    }
  });
  
  promiseCleanRoom
    .then((fromResolve) => {
      console.log("Room is " + fromResolve);
    })
    .catch((fromReject) => {
      console.log("The room is " + fromReject);
    });
  
  let cleanRoom = function () {
    return new Promise((resolve, reject) => {
      resolve("Room is clean.");
    });
  };
  
  let takeGarbageOut = function (message) {
    return new Promise((resolve, reject) => {
      resolve(message + " Removed garbage.");
    });
  };
  
  let winIceCream = function (message) {
    return new Promise((resolve, reject) => {
      resolve(message + " Won Ice Cream.");
    });
  };
  
  cleanRoom()
    .then((clean) => {
      return takeGarbageOut(clean);
    })
    .then((garbage) => {
      return winIceCream(garbage);
    })
    .catch("Cant clean room.");