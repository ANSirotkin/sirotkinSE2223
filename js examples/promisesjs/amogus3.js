let cleanRoom = function(user, callback){
    console.log(user + ' cleaning the room.');
    callback('Room Cleaned.');
}

let takeGarbageOut = function(room, callback){
    console.log(room + 'Taking out the garbage.');
    callback('Took out the garbage.');
}

let iceCream = function(garbage, callback){
    console.log(garbage + ' Going to get ice cream.');
    callback('Got the ice cream!');
}

let homework = function(ic, callback){
    console.log(ic + ' Starting homework!');
    callback('Finished homework!');
}

cleanRoom('Chris', (roomCleaned) => {
    takeGarbageOut(roomCleaned, (garbageOut) =>{
        iceCream(garbageOut, (ic) => {
            homework(ic, (hw) => {
                console.log(hw);
            })
        })
    });
});