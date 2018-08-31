//music code
var backMusic  = new Audio('./sounds/Grenade.mp3');

var rocket;
var bg;
var enemy1=[];
var enemy2=[];
var enemy3=[];
var f;
var p =0;
var q =0;
var r =0;
var score =0;

// var shoots=[];
// var myScore;

function startGame() {
    backMusic = new Audio('./sounds/Grenade.mp3');
   
    // backMusic.loop =true;

    shoot = new component(57, 20, "./images/shoot1.png", 154, 292, "image");
    // for(o= 0;o<1000; o+=1){
    //     shoot[o] = new component(57, 20, "./images/shoot1.png", 154, 292, "img");;
    // }

    bg = new component(window.innerWidth + 1300, window.innerHeight, "./images/stars bg.jpg", 0, 0, "background");

    for (var a=0; a<=100; a+=1){ 
        p += 300;
    enemy1[a]=new component (164, 80, "./images/enemy 01.png", 800 + Math.random()*1000 + p,  Math.random()*500, "image");
    }

    for (var b=0; b<=100; b+=1){    
        q += 500;
    enemy2[b] =new component (164, 80, "./images/enemy 02.png", 800 + Math.random()*800 + q, Math.random()*500, "image");
    }

    for (var c=0; c<=100; c++){
        r += 600;
    enemy3[c] =new component (164, 80, "./images/enemy 03.png", 800 + Math.random()*800 + r, Math.random()*500, "image");
    }
    
    rocket = new component(164, 80, "./images/myship.png", 10, 260, "image");
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
    // gameover = new component("30px", "Consolas", "white", window.innerWidth/2, window.innerHeight/2, "text");
    go = new component(200, 200, "./images/enemy 02.png", 400, 300, "image");



    GameArea.start();
    return false;
}

var GameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1300;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        

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

//declaring components------------------------------------------------------------------------------------------------------------------------------
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
        }

        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        //otherwise
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // crashing shoot/bullettcount[] into enemies----------------------------------------------------------------
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x + 50;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
    this.crashWithRocket = function(otherobj) {
        var myleft = this.x  - 80;
        var myright = this.x + (this.width) - 80 ;
        var mytop = this.y + 30;
        var mybottom = this.y + (this.height) - 30;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width) - 80;
        var othertop = otherobj.y ;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft ) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
   

    //giving newpositions to image and background-------------------------------------------
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
    
    //moving rocket- Key Controls--------------change key speed values - easy/difficult.----------------------------------------------
    this.moverocket = function(){
    if (GameArea.key == 38) 
    {rocket.speedY = -2.5; }
    if (GameArea.key == 40) 
    {rocket.speedY = 2.5; }
    }
    this.bound = function(){
        if (this.y < 10) 
        { this.y =10; }
        if (this.y > 520) 
        { this.y =520; }
        
    }

    //moving shoot object - assigning speed and setting up its occurence----------------------    
    this.shooting = function(){
        if (GameArea.key == 32)
        {this.speedX = 12}
    }
    this.occurence = function(){
        this.active = true;
        if (GameArea.key == 32)
        {this.x = rocket.width -10;
        this.y = rocket.y + rocket.height/2 - 10;}
    }

    //moving enemies- speed controls-----------------------------------------------------------
    this.moveenemy1 = function(){
            if(score> 200){
                this.speedX = -2.5;
            }
            else if(score > 500){ this.speedX = -4;}
            else{
            this.speedX = -2;}

           
        }    
    this.moveenemy2 = function(){
        if(score> 200){
            this.speedX = -3.5;
        }else if(score > 500){ this.speedX = -5;}
        else{           
            this.speedX = -2.5;}
           
        }
    this.moveenemy3 =  function(){
        if(score> 200){
            this.speedX = -4.5;
        }else if(score > 500){ this.speedX = -7;}
        else{
            this.speedX = -3;  }         
        }        

    this.update1 = function() {
        ctx = GameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
        } 
    }
    this.newPos1 = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }  

    //shoot control over canvas---------------to prevent from adding extra-----------------------------
    this.newPos2 = function() {
        if(this.x < GameArea.canvas.width)
        {
            this.x += this.speedX;
        }
        else{
            this.y = -100;
        }
    }  

    // this.updateshoot = function() {
    //     ctx = GameArea.context;
    //     // console.log(this.image);
    //     if (type == "img") {
    //         ctx.drawImage(this.image, 
    //             this.x, 
    //             this.y,
    //             this.width, this.height);
    //     } else {
    //         ctx.fillStyle = color;
    //         ctx.fillRect(this.x, this.y, this.width, this.height);
    //     }  
    // }
}



var k;
var l;
var m;
var g;
var h;
// adding count for score
var count = 0;
function updateGameArea() {
    for(k =0; k<enemy1.length; k++){
        if (shoot.crashWith(enemy1[k])) {
            score+=10;
           
        // enemy1 = enemy1.splice(k, 1);
        // k--;
        // document.location.reload();
        enemy1[k].width = 0;
        enemy1[k].height =0;
        enemy1[k].y =-100;
        shoot.y = -200;
       
        
        }
    }
    for(l =0 , count=0; l<enemy2.length; l++){
        
        if (shoot.crashWith(enemy2[l])) {
            count+=1;
        }
        if (shoot.crashWith(enemy2[l])){
            // console.log(count)
            // if(count == 2){
                score +=20;
                console.log('hi')
       
            enemy2[l].width = 0;
            enemy2[l].height =0;
            enemy2[l].y =-100;
            shoot.y = -200;}
        count = 0;
        
        
    }
    for( m =0; m<enemy3.length; m++){
        if (shoot.crashWith(enemy3[m])) {
        score +=30;
       
        enemy3[m].width = 0;
        enemy3[m].height =0;
        enemy3[m].y =-100;
        shoot.y = -200;   
        }
    }

    //when enemy hits rocket
   
    for ( h=0; h<enemy1.length; h++){
        if(rocket.crashWithRocket(enemy1[h])){
            // gameover.text="gameover";
            // console.log("sj")
            // gameover.update();
            go.update();
            startGame.stop();
          
           
        }
    }
    for ( h=0; h<enemy2.length; h++){
        if(rocket.crashWithRocket(enemy2[h])){
            // gameover.text="gameover";
            // gameover.update();
            go.update();
            startGame.stop();
            //reference to game over page.
        }
    }
    for ( h=0; h<enemy3.length; h++){
        if(rocket.crashWithRocket(enemy3[h])){
            // gameover.text="gameover";
            // gameover.update();
            go.update();
            startGame.stop();
            //reference to game over page.
        }
    }


    GameArea.clear();

    bg.speedX = -1;
    bg.newPos();    
    bg.update();

    // backMusic.play();
    backMusic.loop =true;   


    rocket.bound();

    for(var d=0;d<100;d+=1){
    enemy1[d].update1();
    enemy1[d].newPos1();
    enemy1[d].moveenemy1();}

    for(var e=0;e<100;e+=1){
    enemy2[e].update1();
    enemy2[e].newPos1();
    enemy2[e].moveenemy2();}

    for( var f=0;f<100; f+=1){
    enemy3[f].update1();
    enemy3[f].newPos1();
    enemy3[f].moveenemy3();}
    
    rocket.moverocket();
    rocket.newPos();    
    rocket.update();

    // rocket.speedY = 0;

    shoot.update1();
    shoot.newPos2();
    shoot.shooting();
    shoot.occurence();
   
    //  for(var g= 0;g<1000; g+=1){
    //     shoot[g].newPos();    
    //     shoot[g].updateshoot();
    //     shoot[g].shooting();
    //     shoot[g].occurence();}
    
    myScore.text="SCORE: " + score;
    myScore.update();
}   

