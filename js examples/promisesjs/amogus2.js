let cleanRoom = function(user, callback){
    console.log(user + ' cleaning the room.');
    callback('Room Cleaned.');
}

let takeGarbageOut = function(room, callback){
    console.log(room + 'Taking out the garbage.');
    callback('Took out the garbage.');
}

cleanRoom('Chris', (roomCleaned) => {
    takeGarbageOut(roomCleaned, (garbageOut) =>{
        console.log(garbageOut);
    });
});