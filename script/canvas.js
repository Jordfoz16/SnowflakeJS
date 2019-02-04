var width = document.getElementById("myCanvas").getAttribute("width");
var height = document.getElementById("myCanvas").getAttribute("height");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var particalArray = new Array();

var backgroundColour = "#e8e8e8";
var maxParticals = 50;
var spawnRate = 30;
var fallSpeed = 0.7;

var timer = 0;

document.getElementById("spawnRate").innerHTML = "Spawn Rate: " + 60/spawnRate + "/s"


function snowflake(){
    var x, y, z, r;
    var colour = "black";

    var swayCounter = 0;
    var swaySpeed = 0.01;
    var swayDistance = 0.2;
    var remove = false;

    this.createPartical = function(){
        this.r = Math.floor((Math.random() * 8) + 2);

        this.x = Math.floor((Math.random() * parseInt(width)));
        this.y = 0 - (this.r * 2);
        this.z = this.r;

        this.fallSpeed = fallSpeed * Math.sin(this.r / 10);

        swaySpeed = (Math.random() / 100) - 0.005;
        swayDistance = (Math.random() / 5) + 0.1;
        swayCounter = Math.random();

        if(this.r < 4){ this.colour = "#d3faff";
        }else if(this.r < 7){ this.colour = "#bae6ff";
        }else{ this.colour = "#8dd3fc"; }
    },

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
    },

    this.move = function(){
        var xa = Math.sin(swayCounter) * swayDistance;
        this.x += xa;
        this.y += this.fallSpeed;
    }
};


canvasLoop();

function canvasLoop(){
    update();
    render();

    requestAnimationFrame(canvasLoop);
}

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
        }
    }

    for(i = 0; i < particalArray.length; i ++){
        particalArray[i].move();
        if(particalArray[i].y >= parseInt(height) + 50){
            particalArray[i].remove = true;
        }
    }

    for(i = 0; i < particalArray.length; i++){
        if(particalArray[i].remove){
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
            if(particalArray[i].z > particalArray[i + 1].z){
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

function updateSpeed(){
    var value = document.getElementById("speed").value;
    
    fallSpeed = value;
}

function updateMax(){
    var value = document.getElementById("max").value;

    maxParticals = value;
}

function updateSpawnRate(){
    var value = document.getElementById("rate").value;
    document.getElementById("spawnRate").innerHTML = "Spawn Rate: " + 60/value + "/s"
    spawnRate = value;
}