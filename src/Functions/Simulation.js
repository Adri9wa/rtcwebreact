import {RTC, Dock} from './Generation'
import {map} from './Room'
import {moveLeft, moveDown, moveRight, moveUp, HasDistance} from './Movement'
import {moveRightDock, moveLeftDock, moveDownDock, moveUpDock} from './Movement'


var afterDock;
var intervalTime = 500;



function EnterDockingStation(callback){
    //Enter DS
    afterDock = false;
    var loop;
    
    if(HasDistance("right")) loop = setInterval(() => {
    if(HasDistance("right")) moveRight(afterDock);
        else {
            moveRightDock(afterDock);
            clearInterval(loop);
            if(HasDistance("up")) loop = setInterval(() => {
                if(HasDistance("up")) moveUp(afterDock);
                else {
                moveUpDock(afterDock);
                clearInterval(loop);
                callback();
                }
            }, intervalTime)
            else loop = setInterval(() => {
                if(HasDistance("down")) moveDown(afterDock);
                else {
                    moveDownDock(afterDock);
                    clearInterval(loop);
                    callback();
                }
            }, intervalTime)
        }
    }, intervalTime)

    else loop = setInterval(() => {
        if(HasDistance("left")) moveLeft(afterDock);
        else {
            moveLeftDock(afterDock);
            clearInterval(loop);
            if(HasDistance("up")) loop = setInterval(() => {
                if(HasDistance("up")) moveUp(afterDock);
                else {
                moveUpDock(afterDock);
                clearInterval(loop);
                callback();
                }
            }, intervalTime)
            else loop = setInterval(() => {
                if(HasDistance("down")) moveDown(afterDock);
                else {
                    moveDownDock(afterDock);
                    clearInterval(loop);
                    callback();
                }
            }, intervalTime)
        }
    }, intervalTime)

}

function MoveToStart(callback){
    //Move to starting point(0, 0)
    afterDock = true;
    var loop;

    loop = setInterval(() => {
        if(RTC.x > 0) moveLeft(afterDock);
        else {
            clearInterval(loop);
            loop = setInterval(() => {
                if(RTC.y > 0) moveUp(afterDock);
                else {
                    clearInterval(loop);
                    console.log("On start");
                    callback();
                }
            }, intervalTime)
        }
    }, intervalTime)
}


function CleanRoom(){
    //Clean whole room
    afterDock = true;
    var loop;
    loop = setInterval(() => {
        if(RTC.y < map.height + RTC.h)
        if(RTC.x < map.width-RTC.w) moveRight(afterDock);
        else {
            moveDown(afterDock);
            clearInterval(loop);
            loop = setInterval(() => {
            if(RTC.x > 0) moveLeft(afterDock);
            else{
                moveDown(afterDock);
                clearInterval(loop);
                CleanRoom();
            }
        }, intervalTime)
        }
        else {
            clearInterval(loop);
            console.log("Finished cleaning");
        }
    }, intervalTime)
}

function StartCleaning(){
    //Go to start point(0, 0) after Docking to DS, then clean whole room
    MoveToStart(CleanRoom);
}

export default function ClearRoom(){ 
    //main cleaning function; first enter docking station, then go to start point(0, 0), then clean whole room
    map.style.backgroundColor = "#FEC3C3";
    EnterDockingStation(StartCleaning);
}




// function checkDistanceToDock(direction, afterDock){
//     var margin;
//     switch (direction) {
//         case "right":
//             if(RTC.x + 2*RTC.w < Dock.x) moveRight(afterDock);
//             else {
//                 margin = Dock.x-RTC.x-RTC.w;
//                 clear(RTC);
//                 RTC.x += margin;
//                 ctx.fillStyle = "#0d880d";
//                 fill(RTC);
//             }
//             break;
//         case "left":
//             if(RTC.x - RTC.w > Dock.x+Dock.w) moveLeft(afterDock);
//             else {
//                 margin = RTC.x-Dock.x-Dock.w;
//                 clear(RTC);
//                 RTC.x -= margin;
//                 ctx.fillStyle = "#0d880d";
//                 fill(RTC);
//             }
//             break;
//         case "up":
//             if(RTC.y - RTC.h > Dock.y+Dock.h) moveUp(afterDock);
//             else {
//                 margin = RTC.y-Dock.y-Dock.h;
//                 clear(RTC);
//                 RTC.y -= margin;
//                 ctx.fillStyle = "#0d880d";
//                 fill(RTC);
//             }
//             break;
//         case "down":
//             if(RTC.y + RTC.h < Dock.y) moveDown(afterDock);
//             else {
//                 margin = Dock.y-RTC.y-RTC.h;
//                 clear(RTC);
//                 RTC.y += margin;
//                 ctx.fillStyle = "#0d880d";
//                 fill(RTC);
//             }
//             break;
//         default:
//             break;
//     }
// }