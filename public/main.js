function printOutput(stringToPrint = ""){
    let output = document.querySelectorAll("p");
    stringToPrint = `<p>${stringToPrint}</p>`;
    output[output.length-1].insertAdjacentHTML("afterend", stringToPrint);
}