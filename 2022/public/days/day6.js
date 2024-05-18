let input
function runDay(data) {
    input = data;
    
    let index = findDistinctChar(4);
    
    printOutput(`Found four distinct characters "${input.slice(index-4, index)}" it was found at location <span id="answer">${index}</span>`);

    index = findDistinctChar(14, index-4);

    printOutput(`After the start of packet marker found fourteen distinct characters "${input.slice(index-14, index)}" it was found at location <span id="answer">${index}</span>`, "h3");

}

function findDistinctChar(numChar, startValue=0){
    for(let index = numChar+startValue; index < input.length; index++ ){
        let distLetters = new Set();
        let currCode = input.slice(index-numChar, index);

        currCode.split("").map(letter => distLetters.add(letter));

        if(distLetters.size >= numChar)
            return index;
    }
}