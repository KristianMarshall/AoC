let pwd = [];
let dataSizes = {};
let data;
function runDay(input) {
    data = input.split('\n');

    data.forEach((line, index) => {
        if(line[0] === '$')
            runCommand(line.slice(2), index);
    });

    printOutput("Ran all the commands. now summing files sizes less then 100000...");

    let sumSizes = 0;
    Object.values(dataSizes).forEach(value =>{
        if(value <= 100000)
            sumSizes += value;
    });

    printOutput(`Total size of directories under 100000 is <span id="answer">${sumSizes}</span>`);

    printOutput("Calculating disk space needed for update", "h3");

    let remainingSpace = 70000000 - dataSizes["//"];
    let spaceNeeded = 30000000 - remainingSpace;

    printOutput(`Current remaining space is: ${remainingSpace}. so we need ${spaceNeeded} more space for the update.`);
    printOutput("Now finding the smallest file we can delete to make space for the update...");

    let dirToDeleteSize = 999999999;
    let dirToDelete = "";
    for(const dir in dataSizes){
        if(dataSizes[dir] <= dirToDeleteSize && dataSizes[dir] >= spaceNeeded){
            dirToDeleteSize = dataSizes[dir];
            dirToDelete = dir;
        }
    }

    printOutput(`The best directory to delete would be ${dirToDelete.slice(1)} with a size of <span id="answer">${dirToDeleteSize}</span>`);

}

function runCommand(command, index) {
    switch (command.slice(0,2)) {
        case "cd":
            changeDir(command.slice(3));
            break;
        case "ls":
            listDir(index);
            break;
    }
}

function changeDir(dir){
    if(dir !== '..')
        pwd.push(dir+"/");
    else
        pwd.pop();
}

function listDir(index){
    for(let item = index+1; item < data.length; item++ ){
        let line = data[item];
        if(line[0] !== '$'){
            line = line.split(" ");
            if(!isNaN(line[0]))
                addDataToDirs(line[0]);
        } else
            break;

    }
}

function addDataToDirs(dataSize){
    let pwdCopy =[...pwd];
    for(let i = pwdCopy.length-1; i >= 0; i--){
        let wholePwd = pwdCopy.join("");
        if(dataSizes[wholePwd] !== undefined) 
            dataSizes[wholePwd] += Number(dataSize);
        else
            dataSizes[wholePwd] = Number(dataSize);
        pwdCopy.pop();
    }
}
