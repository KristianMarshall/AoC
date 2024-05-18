function runDay(input) {

    input = input.split("\n");

    let rucksacks = [...input];

    //go though all bags and split them into their compartments
    for (let bag = 0; bag < rucksacks.length; bag++) {
        let slicePoint = rucksacks[bag].length/2;
        rucksacks[bag] = [rucksacks[bag].slice(0, slicePoint), rucksacks[bag].slice(slicePoint)];
    }

    let misplacedItems = [];


    for (let bag = 0; bag < rucksacks.length; bag++) {
        //take each item in the first compartment and see if its in the second compartment. could be sped up if you removed duplicate items
        for (const item of rucksacks[bag][0]) {
            if(rucksacks[bag][1].indexOf(item) !== -1){
                misplacedItems.push(item);
                break;
            }
        }
    }

    printOutput("Finished looking though all the bags. Adding up the priorities...");

    let prioritySum = 0;
    misplacedItems.forEach(letter => {
        prioritySum += calcPriority(letter);
    });

    printOutput(`Sum of the item priorities is <span id="answer">${prioritySum}</span>`);

    printOutput("Searching through the bags for badges...", "h3");

    let badgeItem = [];

    for (let bagGroup = 0; bagGroup < input.length; bagGroup+=3) {
        
        for (const letter of input[bagGroup]) {
            let itemOccurrences = [0,0,0];

            itemOccurrences[0] = countLetters(letter, input[bagGroup]); //should keep a dict of letters searched to not waste time researching them

            if(itemOccurrences[0] >= 1) {

                for (let bag = 1; bag < 3; bag++) {
                    itemOccurrences[bag] = countLetters(letter, input[bagGroup+bag]);
                }
            }

            if(itemOccurrences[0] >= 1 && itemOccurrences[1] >= 1 && itemOccurrences[2] >= 1 ){
                badgeItem.push(letter);
                break;
            }
        }
    }

    printOutput(`Calculating the sum of the badge priorities...`);

    prioritySum = 0;
    badgeItem.forEach(letter => {
        prioritySum += calcPriority(letter);
    });

    printOutput(`Sum of the badge priorities is <span id="answer">${prioritySum}</span>`);


}

//converts ascii number to item priority
function calcPriority(letter){
    let asciiNum = letter.charCodeAt(0);

    if(asciiNum >= 97)
        asciiNum -= 96;
    else
        asciiNum -= 38;

    return asciiNum;
}

function countLetters(letter, stringToCount){
    let foundPos = stringToCount.indexOf(letter);
    let count = 0;
    while(foundPos !== -1){
        count ++;
        foundPos = stringToCount.indexOf(letter, foundPos+1);
    }
    return count;
}