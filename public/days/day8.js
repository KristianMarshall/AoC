function runDay(input) {
    input = input.split('\n');

    let visibleTrees = 0;

    input.forEach((row, x) => {
        row = row.split(""); 
        row.forEach((tree, y) => {
            if(x == 0 || x == input.length-1 || y == 0 || y == input[0].length-1)
                visibleTrees++;
            else
                if(isVisible(x,y,input))
                    visibleTrees++
        });
    });

    printOutput(`Finished counting visible trees. there are <span id="answer">${visibleTrees}</span>`);

    printOutput("Looking at all the trees and calculating their tree score...", "h3");

    let bestTreeScore = 0;
    input.forEach((row, x) => {
        row = row.split(""); 
        row.forEach((tree, y) => {
            let currTreeScore = calcTreeScore(x, y, input);
            if(currTreeScore > bestTreeScore)
                bestTreeScore = currTreeScore;
        });
    });

    printOutput(`Finished calculating scores. The best one is  <span id="answer">${bestTreeScore}</span>`);

}

function isVisible( treeX, treeY, input){
    let currentTreeHeight = input[treeX][treeY];

    let tallestTree = -1;
    //X negative
    for(let x = 0; x < treeX; x++){
        let tree = Number(input[x][treeY]);
        if( tree > tallestTree){
            tallestTree = tree;
            if(tallestTree >= currentTreeHeight)
                break;
        }
        if(x == treeX-1)
            return true;
    }

    tallestTree = -1;
    //X Positive
    for(let x = input.length-1; x > treeX; x--){
        let tree = Number(input[x][treeY]);
        if(tree > tallestTree){
            tallestTree = tree;
            if(tallestTree >= currentTreeHeight)
                break;
        }
        if(x == treeX+1)
            return true;
    }
    tallestTree = -1;
    //Y negative
    for(let y = 0; y < treeY; y++){
        let tree = Number(input[treeX][y]);
        if(tree > tallestTree){
            tallestTree = tree;
            if(tallestTree >= currentTreeHeight)
                break;
        }
        if(y == treeY-1)
            return true;
    }

    tallestTree = -1;
    //Y Positive
    for(let y = input[0].length-1; y > treeY; y--){
        let tree = Number(input[treeX][y]);
        if(tree > tallestTree){
            tallestTree = tree;
            if(tallestTree >= currentTreeHeight)
                break;
        }
        if(y == treeY+1)
            return true;
    }

    return false;
}

function calcTreeScore( treeX, treeY, input){
    let currentTreeHeight = input[treeX][treeY];
    let treeScore = 1;

    let treeCount = 0;
    //X Positive
    for(let x = treeX+1; x < input.length; x++){
        let tree = Number(input[x][treeY]);
        treeCount++;
        if( tree >= currentTreeHeight)
            break;
    }

    if(treeCount > 0)
        treeScore *= treeCount;
    
    treeCount = 0;

    //X Positive
    for(let x = treeX-1; x >= 0; x--){
        let tree = Number(input[x][treeY]);
        treeCount++;
        if( tree >= currentTreeHeight)
            break;
    }

    if(treeCount > 0)
        treeScore *= treeCount;
    
    treeCount = 0;

    //Y negative
    for(let y = treeY+1; y < input[0].length; y++){
        let tree = Number(input[treeX][y]);
        treeCount++;
        if( tree >= currentTreeHeight)
            break;
    }

    if(treeCount > 0)
        treeScore *= treeCount;
    
    treeCount = 0;

    //Y Positive
    for(let y = treeY-1; y >= 0; y--){
        let tree = Number(input[treeX][y]);
        treeCount++;
        if( tree >= currentTreeHeight)
            break;
    }

    if(treeCount > 0)
        treeScore *= treeCount;

    return treeScore;
}
