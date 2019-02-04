var width = document.getElementById("myCanvas").getAttribute("width");
var height = document.getElementById("myCanvas").getAttribute("height");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var particalArray = new Array();

var backgroundColour = "#e8e8e8";
var maxParticals = 200;
var spawnRate = 30;

var timer = 0;

canvasLoop();

function render(){
    clear();

    for(i = 0; i < particalArray.length; i ++){
        particalArray[i].draw();
    }
}

function update(){
    if(particalArray.length < maxParticals){
        timer++;
        if(timer % spawnRate == 0){
            addPartical();
            console.log("Added");
        }
    }

    for(i = 0; i < particalArray.length; i ++){
        particalArray[i].move();
        if(particalArray[i].getY() >= height + 50){
            particalArray[i].remove();
        }
    }

    for(i = 0; i < particalArray.length; i++){
        if(particalArray[i].toRemove()){
            particalArray.splice(i, 1);
        }
    }

    sortParticals();
    document.getElementById("particalNum").innerHTML = "Number of Particals: " + particalArray.length;
}

function sortParticals(){
    if(particalArray.length == 0) return;
    var swapped;

    do{
        swapped = false;
        for(var i = 0; i < particalArray.length-1; i++){
            if(particalArray[i].getZ() > particalArray[i + 1].getZ()){
                var temp = particalArray[i];
                particalArray[i] = particalArray[i+1];
                particalArray[i+1] = temp;
                swapped = true;
            }
        }
    }while(swapped);
}

function clear(){
    ctx.fillStyle = backgroundColour;
    ctx.fillRect(0, 0, width, height);
}

function addPartical(){
    var newPartical = new snowflake();
    newPartical.createPartical();
    particalArray.push(newPartical);
}

function canvasLoop(){
    update();
    render();

    requestAnimationFrame(canvasLoop);
}
