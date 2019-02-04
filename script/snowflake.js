function snowflake(){

    var xPos, yPos, zPos, radius, colour;

    var speed = 0.7;
    var swayCounter = 0;
    var swaySpeed = 0.01;
    var swayDistance = 0.2;

    var remove = false;

    this.createPartical = function(){
        radius = Math.floor((Math.random() * 8) + 2);

        xPos = Math.floor((Math.random() * width));
        yPos = 0 - (radius * 2);

        zPos = radius;
        speed = speed * Math.sin(radius/10);

        swaySpeed = (Math.random() / 100) - 0.005;
        swayDistance = (Math.random() / 5) + 0.1;
        swayCounter = Math.random();

        if(radius < 4){
            colour = "#d3faff";
        }else if(radius < 7){
            colour = "#bae6ff";
        }else{
            colour = "#8dd3fc";
        }
    }

    this.setRadius = function(radius){
        this.radius = radius;
    }

    this.draw = function(){

        ctx.beginPath();
        ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
        ctx.fillStyle = colour;
        ctx.fill();
    }

    this.getY = function(){
        return yPos;
    }

    this.getZ = function(){
        return zPos;
    }

    this.move = function(){
        var xa = Math.sin(swayCounter) * swayDistance;
        xPos += xa;
        yPos += speed;
        swayCounter += swaySpeed;
    }

    this.remove = function(){
        remove = true;
    }

    this.toRemove = function(){
        return remove;
    }
}
