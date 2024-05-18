function printOutput(stringToPrint = "", elementToPrintAfter="p"){
    let output = document.querySelectorAll(elementToPrintAfter);
    stringToPrint = `<p>${stringToPrint}</p>`;
    output[output.length-1].insertAdjacentHTML("afterend", stringToPrint);
}

function preRunDay(inputs){
    printOutput("Fetch Completed. Processing Input...");
    if(testInput === "true")
        runDay(inputs[0]);
    else
        runDay(inputs[1])
}