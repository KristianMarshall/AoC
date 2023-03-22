let register = 1;
let cycles = 0;

function runDay(input) {
    input = input.split('\n').map(a => a.split(' '));

    let signalStrength = 0;
    let cycleTrigger = 20;

    input.forEach(instruction => {

        switch (instruction[0]) {
            case "noop":
                cycles++;
                if(cycles >= cycleTrigger){
                    signalStrength += cycles * register;
                    cycleTrigger += 40;
                }
                break;
            case "addx":
                cycles += 2;
                if(cycles >= cycleTrigger){
                    signalStrength += (cycles % 2 ? (cycles-1) : cycles) * register;
                    cycleTrigger += 40;
                }
                register += parseInt(instruction[1]);
                break;
        }
        
    });

    printOutput(`Finished simulating cpu. The signal strength  <span id="answer">${signalStrength}</span>`);
    

    register = 1;
    cycles = 0;
    cycleTrigger = 40;
    let crtOutput = "";

    input.forEach(instruction => {
        switch (instruction[0]) {
            case "noop":
                crtOutput += outputCrt();
                cycles ++;
                break;
            case "addx":
                
                crtOutput += outputCrt();
                cycles ++;
                crtOutput += outputCrt();
                cycles ++;
                register += parseInt(instruction[1]);
                break;
        }
    });
    for(let i = 0; i < 240; i+=40){
        printCode(crtOutput.substring(i,i+40), i==0? "h3":"br");
    }
}

function outputCrt(){
    let output = ".";
    let crtLine = cycles%40;
    if(crtLine <= register+1 && crtLine >= register-1)
        output = "#";
    return output;
}

function printCode(stringToPrint = "", elementToPrintAfter="br"){
    let output = document.querySelectorAll(elementToPrintAfter);
    stringToPrint = `<code>${stringToPrint}</code><br>`;
    output[output.length-1].insertAdjacentHTML("afterend", stringToPrint);
}