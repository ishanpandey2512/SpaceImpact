
var rocket;
var bg;

function startGame() {
    shoot = new component(57, 20, "./images/shoot1.png", 154, 292, "image");
    rocket = new component(164, 80, "./images/myship.png", 10, 260, "image");
    bg = new component(1300, 600, "./images/stars bg.jpg", 0, 0, "background");
    GameArea.start();
}

var GameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1300;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.interval = setInterval(upu, 20);

        window.addEventListener('keydown', function (e) {
            GameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = GameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }    
    this.moverocket = function(){
    if (GameArea.key == 38) 
    {rocket.speedY = -2; }
    if (GameArea.key == 40) 
    {rocket.speedY = 2; }
    }
    
    this.shooting = function(){
        if (GameArea.key == 32)
        {shoot.speedX = 12}
    }
    this.occurence = function(){
        this.active = true;
        if (GameArea.key == 32)
        {this.x = rocket.width -10;
        this.y = rocket.y + rocket.height/2 - 10}
    }

    this.bound = function(){
        if (this.y < 10) 
        { rocket.speedY = 0; }
        if (this.y + this.height > 590) 
        { rocket.speedY = 0; }
        
        }



}




function updateGameArea() {
    GameArea.clear();
    bg.speedX = -1;
    bg.newPos();    
    bg.update();
    rocket.moverocket();
    rocket.newPos();    
    rocket.update();
    shoot.newPos();    
    shoot.update();
    rocket.bound();
    

}

function upu(){
    console.log("hi")
    shoot.shooting();
    shoot.occurence();
}

