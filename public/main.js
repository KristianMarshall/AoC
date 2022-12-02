function printOutput(stringToPrint = ""){
    let output = document.querySelectorAll("p");
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