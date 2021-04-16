var map = document.getElementById("map"),
    ctx = map.getContext("2d"),
    obstacles = [],
    trials,
    minMapX = 300, minMapY = 300, maxMapX = 1200, maxMapY = 1200;
ctx.font = "20px Arial";
var RTC = new Object(), Dock = new Object();


//Light/Dark mode
function switchMode() {
    if (document.body.style.backgroundColor == "black") {
            document.body.style.backgroundColor = "white";
    }
    else {
    document.body.style.backgroundColor = "black";
    }
    
}


//Get Random Int in range
function getRandomInt(min, max) {
    var min = Math.ceil(min), max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Generate Room Button
function generateRoom() {
    if (obstacles.length > 0) { if (confirm("Are you sure you want to regenerate the room?")) {
        var X = getRandomInt(minMapX, maxMapX), Y = getRandomInt(minMapY, maxMapY);
        console.log(X, Y);
        map.width = X;
        map.height = Y;
        obstacles = [];
    } }
    else {
        var X = getRandomInt(minMapX, maxMapX), Y = getRandomInt(minMapY, maxMapY);
        console.log(X, Y);
        map.width = X;
        map.height = Y;
    }
    
}


function fill(a){
    ctx.fillRect(a.x, a.y, a.w, a.h);   
}


//Reset Room Button
function resetRoom() {
    if (confirm("Are you sure you want to reset?")) {
        ctx.clearRect(0, 0, map.width, map.height);
        map.width = 200;
        map.height = 200;
        obstacles = [];
    }
}


//Generate Objects without overlapping each other
function generateWithoutOverlap(w, h, x, y, trials) {
    flag = true;
    while (flag) {
                trials++;
                if (trials>20) break;
                for(j = 0; j<obstacles.length; j++){

                    var a = new Object();
                    a.x1 = obstacles[j].x;
                    a.y1 = obstacles[j].y;
                    a.x2 = obstacles[j].x+obstacles[j].w;
                    a.y2 = obstacles[j].y+obstacles[j].h;

                    var b = new Object();
                    b.x1 = x;
                    b.y1 = y;
                    b.x2 = x+w;
                    b.y2 = y+h;

                        if(overlaps(a, b)){
                            x = getRandomInt(0, map.width - w);
                            y = getRandomInt(0, map.height - h);
                            b.x1 = x;
                            b.y1 = y;
                            b.x2 = x+w;
                            b.y2 = y+h;
                            flag = true;
                            break;
                        }
                    flag = false;
                }
            }
    console.log(trials);
    
    return [b, trials];
    
}



//Check rectangles overlap
function overlaps(a, b) {
	if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;
	if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;
	return true;
}

//Generate Obstacles Button
function generateObstacles() {
    obstacles = [];
    ctx.fillStyle = "red";
    ctx.clearRect(0, 0, map.width, map.height);
    ctx.lineWidth = 2;
    var roomX = map.width, roomY = map.height,
    amount = getRandomInt(4, 10); //Obstacles amount
    //Obstacle placement
    for (i=0; i < amount; i++) {
        
        var flag = true,
        obstW = getRandomInt(30, 80),
        obstH = getRandomInt(30, 80), //Desired obstacle
        obstX = getRandomInt(0, roomX - obstW),
        obstY = getRandomInt(0, roomY - obstH);
        trials = 0;
        if(obstacles.length>0){
            
            //While there is overlap, generate new coords
            Gen = generateWithoutOverlap(obstW, obstH, obstX, obstY, trials);
            b = Gen[0];
            
            if(Gen[1]<=20){
                obstacles.push({
                    w: b.x2-b.x1,
                    h: b.y2-b.y1,
                    x: b.x1,
                    y: b.y1
                });
            }
            else break;
        }
        else {
            obstacles.push({
                w: obstW,
                h: obstH,
                x: obstX,
                y: obstY
            });    
        }    
        ctx.fillStyle = "red";
        fill(obstacles[i]);   
//        ctx.fillStyle = "black";
//        ctx.fillText(i, obstacles[i].x+obstacles[i].w/2-3, obstacles[i].y+obstacles[i].h/2+3);   
    }
}




//Generate Robot and Docking Station Button
function generateRTC() {
    trials = 0;
    roomX = map.width;
    roomY = map.height;
    //--map
       
    var minW = 25, minH = 25, maxW = 70, maxH = 70;
    RTC.w = getRandomInt(minW, maxW); RTC.h = getRandomInt(minH, maxH);
    RTC.x = getRandomInt(0, roomX-RTC.w); RTC.y = getRandomInt(0, roomY-RTC.h);
    //--robot
    
    Gen = generateWithoutOverlap(RTC.w, RTC.h, RTC.x, RTC.y, trials);
    b = Gen[0];

    if(Gen[1]<=20){
        obstacles.push(RTC);
        RTC.w = b.x2-b.x1; RTC.h = b.y2-b.y1; RTC.x = b.x1; RTC.y = b.y1;
        ctx.fillStyle = "#0d880d";
        fill(RTC);
        ctx.fillStyle = "black";
        ctx.fillText("R", RTC.x+RTC.w/2-3, RTC.y+RTC.h/2+3); 
    //--robot fill
    }
    else {
        alert("Can't place robot! Clearing canvas..");
        clearCanvas();
    }

    minW = 25;
    minH = 25;
    maxW = RTC.w;
    maxH = RTC.h;
    
    Dock.w = getRandomInt(minW, maxW); Dock.h = getRandomInt(minH, maxH);
    Dock.x = getRandomInt(0, roomX-Dock.w); Dock.y = getRandomInt(0, roomY-Dock.h);
    
    trials = 0;
    Gen = generateWithoutOverlap(RTC.w, RTC.h, RTC.x, RTC.y, trials);
    b = Gen[0];
    //--docking st
    
    if(Gen[1]<=20){
        Dock.w = b.x2-b.x1; Dock.h = b.y2-b.y1; Dock.x = b.x1; Dock.y = b.y1;
        ctx.fillStyle = "#00c600";
        fill(Dock);
        ctx.fillStyle = "black";
        ctx.fillText("D", Dock.x+Dock.w/2-3, Dock.y+Dock.h/2+3);   
        obstacles.pop();
    //--docking st fill
    }
    else {
        alert("Can't place docking station! Clearing canvas..");
        clearCanvas();
    }

}



//Clear Canvas Button
function clearCanvas() {
    obstacles = [];
    ctx.clearRect(0, 0, map.width, map.height);
}



/////////////////////////////////
////////main functionality///////
/////////////////////////////////


//Main Cleaning protocol
function roomCleaning(){
    enterDockStation();
    setTimeout(cleanRoom(), 3000);
    
    enterDockStation();
}


function enterDockStation(){
    
}












