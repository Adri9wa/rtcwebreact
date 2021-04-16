import {RTC, Dock, obstacles} from './Generation'
import {fill, clear} from './Auxiliary'
import {map, ctx} from './Room'

var afterDock;
var intervalTime = 500;

function moveRight(afterDock){
    ctx.fillStyle = "#ABF2C8";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.x += RTC.w;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

function moveLeft(afterDock){
    ctx.fillStyle = "#ABF2C8";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.x -= RTC.w;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

function moveUp(afterDock){
    ctx.fillStyle = "#ABF2C8";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.y -= RTC.h;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

function moveDown(afterDock){
    ctx.fillStyle = "#ABF2C8";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.y += RTC.h;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

function EnterDockingStation(callback){
    afterDock = false;
    console.log(RTC, Dock);
    var loop1, loop2;
    
    if(RTC.x < Dock.x) loop1 = setInterval(() => {
    if(RTC.x < Dock.x) moveRight(afterDock);
        else {
            clearInterval(loop1);
            if(RTC.y > Dock.y) loop2 = setInterval(() => {
                if(RTC.y > Dock.y) moveUp(afterDock);
                else {
                clearInterval(loop2);
                callback();
                }
            }, intervalTime)
            else loop2 = setInterval(() => {
                if(RTC.y < Dock.y) moveDown(afterDock);
                else {
                    clearInterval(loop2);
                    callback();
                }
            }, intervalTime)
        }
    }, intervalTime)

    else loop1 = setInterval(() => {
        if(RTC.x > Dock.x) moveLeft(afterDock);
        else {
            clearInterval(loop1);
            if(RTC.y > Dock.y) loop2 = setInterval(() => {
                if(RTC.y > Dock.y) moveUp(afterDock);
                else {
                clearInterval(loop2);
                callback();
                }
            }, intervalTime)
            else loop2 = setInterval(() => {
                if(RTC.y < Dock.y) moveDown(afterDock);
                else {
                    clearInterval(loop2);
                    callback();
                }
            }, intervalTime)
        }
    }, intervalTime)

    
    

}

function checkDistanceToDock(direction, afterDock){
    var margin;
    switch (direction) {
        case "right":
            if(RTC.x + 2*RTC.w < Dock.x) moveRight(afterDock);
            else {
                margin = Dock.x-RTC.x-RTC.w;
                clear(RTC);
                RTC.x += margin;
                ctx.fillStyle = "#0d880d";
                fill(RTC);
            }
            break;
        case "left":
            if(RTC.x - RTC.w > Dock.x+Dock.w) moveLeft(afterDock);
            else {
                margin = RTC.x-Dock.x-Dock.w;
                clear(RTC);
                RTC.x -= margin;
                ctx.fillStyle = "#0d880d";
                fill(RTC);
            }
            break;
        case "up":
            if(RTC.y - RTC.h > Dock.y+Dock.h) moveUp(afterDock);
            else {
                margin = RTC.y-Dock.y-Dock.h;
                clear(RTC);
                RTC.y -= margin;
                ctx.fillStyle = "#0d880d";
                fill(RTC);
            }
            break;
        case "down":
            if(RTC.y + RTC.h < Dock.y) moveDown(afterDock);
            else {
                margin = Dock.y-RTC.y-RTC.h;
                clear(RTC);
                RTC.y += margin;
                ctx.fillStyle = "#0d880d";
                fill(RTC);
            }
            break;
        default:
            break;
    }
}

function StartCleaning(){
    console.log("started")
    afterDock = true;
    var loop1, loop2;

    loop1 = setInterval(() => {
        if(RTC.x > 0) moveLeft(afterDock);
        else {
            clearInterval(loop1);
            loop2 = setInterval(() => {
                if(RTC.y > 0) moveUp(afterDock);
                else clearInterval(loop2);
            }, intervalTime)
        }
    }, intervalTime)

    

}

export default function ClearRoom(){ 
    var roomX = map.width, roomY = map.height;
    console.log(roomX, roomY, RTC, Dock)
    EnterDockingStation(StartCleaning);
    
}