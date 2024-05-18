

function runDay(input) {
    console.log(input);
    input = input.split('\n');


    //find location of the column numbers as a base for reading in the stacks
    let bottomOfColLocation = 0;
    for (let line = 0; line < input.length; line++) {
        if(input[line][1] == '1'){
            bottomOfColLocation = line;
            break;
        }
    }

    printOutput("Reading in all the crates...");
    
    let stacksArray = [];
    let numColumns = Number(input[bottomOfColLocation].slice(-2,-1)); //grab the last value in the column numbers as that is how many stacks we have

    //Iterate over all the stacks reading in one crate at a time and added it to its stack array. then add that array to our stacksArray.
    for (let columns = 1; columns <= numColumns*4; columns+=4) {
        let newStack = [];
        for (let crate = bottomOfColLocation-1; crate >= 0; crate--) {
            let newCrate = input[crate][columns];
            if(newCrate != ' ')
                newStack.push(newCrate);
            else
                break;
        }
        stacksArray.push(newStack);
    }

    //copy of stacksArray for part2
    var stacksArrayP2 = [];

    for (var i = 0; i < stacksArray.length; i++)
        stacksArrayP2[i] = stacksArray[i].slice();

    let moves = [];
    printOutput("Reading in all the moves...");
    //Read in all the moves
    for (let line = bottomOfColLocation+2; line < input.length; line++) {
        let currLine = input[line];
        moves.push({
            numCrates: Number(input[line].slice(5,input[line].indexOf(" from"))),
            from: Number(input[line].slice(input[line].indexOf("from")+5, input[line].indexOf(" to"))),
            to: Number(input[line].slice(input[line].indexOf("to ")+3, input[line].length))
        });
    }

    printOutput("Running all the moves...");
    //run each move command 
    moves.forEach(move => {
        for (let numCrates = 0; numCrates < move.numCrates; numCrates++) {
            moveCrate(move, stacksArray);
        }
    });

    let topCrates = getTopCrates(stacksArray);

    printOutput(`After all the moves the crates that end up on top are <span id="answer">${topCrates}</span>`);

    printOutput("Using the new cranes method. Running moves on the original stack...", "h3");

    //run each move command 
    moves.forEach(move => {
            moveCrates(move, stacksArrayP2);
    });

    topCrates = getTopCrates(stacksArrayP2);

    printOutput(`After all the moves the the crates that end up on top are <span id="answer">${topCrates}</span>`);
}

function getTopCrates(stacksArray){
    let topCrates = "";
    for (let stack = 0; stack < stacksArray.length; stack++) {
        topCrates += stacksArray[stack][stacksArray[stack].length-1]; //add top crate to the topCrates string
    }
    return topCrates;
}

function moveCrate(move, stacksArray){
    let crateToMove = stacksArray[move.from-1].pop();
    stacksArray[move.to-1].push(crateToMove);
}

function moveCrates(move, stacksArray){
    let cratesToMove = stacksArray[move.from-1].slice(-move.numCrates);
    stacksArray[move.from-1] = stacksArray[move.from-1].slice(0, -move.numCrates);
    stacksArray[move.to-1] = stacksArray[move.to-1].concat(cratesToMove);
} 