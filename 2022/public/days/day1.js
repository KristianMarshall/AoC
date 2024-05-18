function runDay(input) {

    let elfFoodArray = input.split('\n');
    let elfArray = [];
    let totalCal = 0;
    elfFoodArray.forEach(elfFood => {
        
        if(elfFood != '')
            totalCal += parseInt(elfFood);
        else{
            elfArray.push(totalCal);
            totalCal = 0;
        }

    });

    printOutput("Elves calories counted. Now finding the largest by sorting array...");
    elfArray.sort(function(a, b){return a - b});
    elfArray.reverse();

    printOutput();
    printOutput(`The elf with the most calories is carrying <span id="answer">${elfArray[0]}</span> calories`);

    document.querySelector("#p2").insertAdjacentHTML("afterend", "<p>Finding the three largest calorie counts...</p>");

    let topThree = 0;
    for (let elf = 0; elf < 3; elf++)
        topThree += elfArray[elf];

    printOutput(`The top three elves are carrying <span id="answer">${topThree}</span> calories`);
}
