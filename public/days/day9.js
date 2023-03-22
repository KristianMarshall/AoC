let tailMoves = new Set();

function runDay(input) {
    input = input.split('\n');

    let rope = [];
    createRope(rope);

    tailMoves.add(`${rope[rope.length-1].x}, ${rope[rope.length-1].y}`);

    printOutput("Simulating Rope, counting unique tail moves...");

    input.forEach(line => {
        line = line.split(" ");
        moveRope(line[0], Number(line[1]), rope);
    });

    printOutput(`The tail moved to a total of <span id="answer">${tailMoves.size}</span> unique locations`);

    printOutput("Resetting the rope and adding knots...", "h3");

    rope = [];
    createRope(rope, 10);

    tailMoves = new Set();
    tailMoves.add(`${rope[rope.length-1].x}, ${rope[rope.length-1].y}`);

    printOutput("Simulating Rope, counting unique tail moves...");

    input.forEach(line => {
        line = line.split(" ");
        moveRope(line[0], Number(line[1]), rope);
    });

    printOutput(`With 10 knots the tail moved to a total of <span id="answer">${tailMoves.size}</span> unique locations`);
    
}

function moveRope(direction, distance, rope) {
    for (let d = 0; d < distance; d++) {
        let ropeStartState = JSON.parse(JSON.stringify(rope));

        switch (direction) {
            case "U":
                rope[0].y++;
                break;
            case "D":
                rope[0].y--;
                break;
            case "L":
                rope[0].x--;
                break;
            case "R":
                rope[0].x++;
                break;
        }
        for(let ropeKnot = 0; ropeKnot < rope.length-1; ropeKnot++)
            moveCheck(rope[ropeKnot], rope[ropeKnot+1], ropeStartState[ropeKnot]);

        //if the tail moved this turn add it to the set of unique tail locations
        if(rope[rope.length-1].x != ropeStartState[rope.length-1].x || rope[rope.length-1].y != ropeStartState[rope.length-1].y)
            tailMoves.add(`${rope[rope.length-1].x}, ${rope[rope.length-1].y}`);
        console.log(rope);
    }
}

function moveCheck(head, tail, startState){
    if (Math.abs(head.y - tail.y) > 1 || Math.abs(head.x - tail.x) > 1) {
        Object.assign(tail, startState);
        
    }
}

function createRope(rope, length = 2){
    for(let i = 0; i < length; i++)
        rope.push({x: 0, y: 0});
}

