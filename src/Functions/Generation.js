import { GetRandomInt, ClearCanvas, GenerateWithoutOverlap, fill } from './Auxiliary'

var obstacles = [];
var RTC = {}, Dock = {};



export function GenerateObstacles() {
    var map = document.getElementById("map");
    var ctx = map.getContext("2d");
    obstacles = [];
    ctx.fillStyle = "red";
    ctx.clearRect(0, 0, map.width, map.height);
    ctx.lineWidth = 2;
    var roomX = map.width, roomY = map.height,
    amount = GetRandomInt(4, 10); //Obstacles amount

    //Obstacle placement
    for (var i=0; i < amount; i++) {
        var obstW = GetRandomInt(30, 80),
        obstH = GetRandomInt(30, 80), //Desired obstacle
        obstX = GetRandomInt(0, roomX - obstW),
        obstY = GetRandomInt(0, roomY - obstH);
        var trials = 0;
        if(obstacles.length>0){
            //While there is overlap, generate new coords
            var Gen = GenerateWithoutOverlap(obstW, obstH, obstX, obstY, trials, obstacles);
            var b = Gen[0];
            
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

    }
   // console.log(obstacles);
}

export function GenerateRTC() {
    var map = document.getElementById("map"), ctx = map.getContext("2d"), trials = 0, roomX = map.width, roomY = map.height;
    //--map
       
    var minW = 25, minH = 25, maxW = 70, maxH = 70;
    RTC.w = GetRandomInt(minW, maxW); RTC.h = GetRandomInt(minH, maxH);
    RTC.x = GetRandomInt(0, roomX-RTC.w); RTC.y = GetRandomInt(0, roomY-RTC.h);
    //--robot
    
    var Gen = GenerateWithoutOverlap(RTC.w, RTC.h, RTC.x, RTC.y, trials, obstacles);
    var b = Gen[0];

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
        ClearCanvas();
        obstacles = [];
    }
    minW = 25;
    minH = 25;
    maxW = RTC.w;
    maxH = RTC.h;
    
    Dock.w = GetRandomInt(minW, maxW); Dock.h = GetRandomInt(minH, maxH);
    Dock.x = GetRandomInt(0, roomX-Dock.w); Dock.y = GetRandomInt(0, roomY-Dock.h);
    
    trials = 0;
    Gen = GenerateWithoutOverlap(RTC.w, RTC.h, RTC.x, RTC.y, trials, obstacles);
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
        ClearCanvas();
        obstacles = [];
    }

}
export {RTC};
export {Dock};
export {obstacles}