function runDay(input) {
    input = input.split('\n');

    let elfPairArray = [];
    input.forEach(elfPair => {
        let splitPair = elfPair.split(',');
        elfPairArray.push({
            elfA: splitPair[0].split('-').map(Number),
            elfB: splitPair[1].split('-').map(Number)
        });
    });

    printOutput("Elf pairs split into objects in an array. checking for subsets...");

    let totalSubsets = 0;
    let totalOverlaps = 0;

    elfPairArray.forEach(elfPair => {
        if(isEitherSubset(elfPair.elfA, elfPair.elfB))
            totalSubsets++;
        if(overlaps(elfPair.elfA, elfPair.elfB))
            totalOverlaps++;
    });

    printOutput(`Total elf pair subsets is <span id="answer">${totalSubsets}</span>`);

    printOutput(`Total elf pair overlaps is <span id="answer">${totalOverlaps}</span>`, "h3");

}

function isEitherSubset(set1, set2){
    return (set1[0] >= set2[0] && set1[1] <= set2[1]) || (set2[0] >= set1[0] && set2[1] <= set1[1]);
}

function overlaps(set1, set2){
    return (set1[0] <= set2[1] && set1[0] >= set2[0]) || (set2[0] <= set1[1] && set2[0] >= set1[0]);
}