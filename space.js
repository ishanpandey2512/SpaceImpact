var rocket;
var bg;
var enemy1=[];
var enemy2=[];
var enemy3=[];
var f;
var p =0;
var q =0;
var r =0;


function startGame() {
    shoot = new component(57, 20, "./images/shoot1.png", 154, 292, "image");
    
    bg = new component(1300, 600, "./images/stars bg.jpg", 0, 0, "background");
    for (var a=0; a<=30; a+=1){ 
        p += 500;
    enemy1[a]=new component (164, 80, "./images/enemy 01.png", 600 + Math.random()*1000 + p,  Math.random()*500, "image");
    }
    for (var b=0; b<=20; b+=1){    
        q += 400;
    enemy2[b] =new component (164, 80, "./images/enemy 02.png", 900 + Math.random()*800 + q, Math.random()*500, "image");
    }
    for (var c=0; c<=20; c++){
        r += 300;
    enemy3[c] =new component (164, 80, "./images/enemy 03.png", 1500 + Math.random()*700 + r, Math.random()*500, "image");
    }
    rocket = new component(164, 80, "./images/myship.png", 10, 260, "image");
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
        console.log(this.image);
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
        { this.y = 10; }
        if (this.y > 510) 
        { this.y = 510; }
        
        }
    this.moveenemy1 = function(){
            
            this.speedX = -2.1;
           
        }    
    this.moveenemy2 = function(){
            
            this.speedX = -2.1;
           
        }
    this.moveenemy3 =  function(){
            
            this.speedX = -2.1;           
        }        

    this.update1 = function() {
    ctx = GameArea.context;
    console.log(this.image);
    if (type == "image") {
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
    } 

    this.newPos1 = function() {
        
        this.x += this.speedX;
        this.y += this.speedY;
    }    
}
}

function updateGameArea() {
    GameArea.clear();
    bg.speedX = -1;
    bg.newPos();    
    bg.update();
    
    shoot.newPos();    
    shoot.update();
    rocket.bound();
    for(var d=0;d<30;d+=1){
    enemy1[d].update1();
    enemy1[d].newPos1();
    enemy1[d].moveenemy1();}
    for(var e=0;e<20;e+=1){
    enemy2[e].update1();
    enemy2[e].newPos1();
    enemy2[e].moveenemy2();}
    for( var f=0;f<20; f+=1){
    enemy3[f].update1();
    enemy3[f].newPos1();
    enemy3[f].moveenemy3();
    console.log("hi")
    }
    
    rocket.moverocket();
    rocket.newPos();    
    rocket.update();
    rocket.speedY=0;
    
}

function upu(){
    console.log("hi")
    shoot.shooting();
    shoot.occurence();
}