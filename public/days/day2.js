function runDay(input) {
    let scoreValues = {
        X:  1, //Rock
        Y:  2, //Paper
        Z:  3  //Scissors
    };
    let letterConvert = {
        A: 'X',
        B: 'Y',
        C: 'Z'
    }
    let whoBeatsWho = {
        "B X": 0,
        "B Z": 6,
        "C X": 6,
        "C Y": 0,
        "A Y": 6,
        "A Z": 0
    }

    let moveStrats = input.split('\n');
    let score = 0;
    moveStrats.forEach(move =>{
        if(letterConvert[move[0]] == move[2]) //Draw
            score += 3;
        else 
            score += whoBeatsWho[move];
        
        score += scoreValues[move[2]];
    });

    printOutput(`Score with strategy guide: <span id="answer">${score}<span>`);

    document.querySelector("#p2").insertAdjacentHTML("afterend", "<p>Calculating new strategy...</p>");
    score = 0;
    whoBeatsWho = {
        "B X": {score: 0, play: "X"},
        "B Y": {score: 3, play: "Y"},
        "B Z": {score: 6, play: "Z"},
        "C X": {score: 0, play: "Y"},
        "C Z": {score: 6, play: "X"},
        "C Y": {score: 3, play: "Z"},
        "A Y": {score: 3, play: "X"},
        "A X": {score: 0, play: "Z"},
        "A Z": {score: 6, play: "Y"}
    }

    moveStrats.forEach(move =>{
        score += whoBeatsWho[move].score;
        score += scoreValues[whoBeatsWho[move].play];
    });

    printOutput(`Score with strategy guide: <span id="answer">${score}<span>`);

}

