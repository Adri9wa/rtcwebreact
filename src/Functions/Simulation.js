import {RTC, Dock} from './Generation'
import {map, ctx} from './Room'
import {fill} from './Auxiliary'
import {moveLeft, moveDown, moveRight, moveUp, HasDistance} from './Movement'
//import {moveRightDock, moveLeftDock, moveDownDock, moveUpDock} from './Movement'

var userTimer;
var afterDock;
var intervalTime = 500;
var loop;
var stadium;

function checkSurroundings(){
    if(HasDistance("right", "dock"))
        if(HasDistance("left", "dock"))
            if(HasDistance("up", "dock"))
                if(HasDistance("down", "dock"))

                    if(HasDistance("right", "wall"))
                        if(HasDistance("left", "wall"))
                            if(HasDistance("up", "wall"))
                                if(HasDistance("down", "wall"))
                                    return "canMove";
                                else return "down", "wall";
                            else return "up", "wall";
                        else return "left", "wall";
                    else return "right", "wall";
                
                else return "down", "dock";
            else return "up", "dock";
        else return "left", "dock";
    else return "right", "dock";   
}


function EnterDockingStation(afterDock, callback){
    //Enter DS   
    if(HasDistance("right", "dock")) loop = setInterval(() => {
    if(HasDistance("right", "dock")) moveRight(afterDock, "simple");
        else {
            moveRight(afterDock, "dock");
            clearInterval(loop);
            if(HasDistance("up", "dock")) loop = setInterval(() => {
                if(HasDistance("up", "dock")) moveUp(afterDock, "simple");
                else {
                moveUp(afterDock, "dock");
                clearInterval(loop);
                if(typeof callback == 'function') callback();
                }
            }, intervalTime)
            else loop = setInterval(() => {
                if(HasDistance("down", "dock")) moveDown(afterDock, "simple");
                else {
                    moveDown(afterDock, "dock");
                    clearInterval(loop);
                    if(typeof callback == 'function') callback();
                }
            }, intervalTime)
        }
    }, intervalTime)

    else loop = setInterval(() => {
        if(HasDistance("left", "dock")) moveLeft(afterDock, "simple");
        else {
            moveLeft(afterDock, "dock");
            clearInterval(loop);
            if(HasDistance("up", "dock")) loop = setInterval(() => {
                if(HasDistance("up", "dock")) moveUp(afterDock, "simple");
                else {
                moveUp(afterDock, "dock");
                clearInterval(loop);
                if(typeof callback == 'function') callback();
                }
            }, intervalTime)
            else loop = setInterval(() => {
                if(HasDistance("down", "dock")) moveDown(afterDock, "simple");
                else {
                    moveDown(afterDock, "dock");
                    clearInterval(loop);
                    if(typeof callback == 'function') callback();
                }
            }, intervalTime)
        }
    }, intervalTime)

}



function MoveToStart(callback){
    //Move to starting point(0, 0)
    afterDock = true;
    stadium = "MoveToStart";
    if(!HasDistance("left", "dock"))
        if(!HasDistance("down","dock") && !HasDistance("right", "dock")){
            console.log("escaped")
        moveUp(afterDock, "simple");
        MoveToStart(CleanRoom);
        }
            else {
            if(HasDistance("left", "wall")) loop = setInterval(() => { 
                if(HasDistance("left", "wall")) moveLeft(afterDock, "simple");
                else {
                    moveLeft(afterDock, "wall");
                    clearInterval(loop);
                    loop = setInterval(() => {
                        if(HasDistance("up", "wall")) moveUp(afterDock, "simple");
                        else {
                            moveUp(afterDock, "wall");
                            clearInterval(loop);
                            console.log("On start");
                            if(typeof callback == 'function') callback();
                        }
                    }, intervalTime)
                }
            }, intervalTime)
            else {
                moveLeft(afterDock, "wall");
                loop = setInterval(() => {
                    if(HasDistance("up", "wall")) moveUp(afterDock, "simple");
                    else {
                        moveUp(afterDock, "wall");
                        clearInterval(loop);
                        console.log("On start");
                        if(typeof callback == 'function') callback();
                    }
                }, intervalTime)
            }

                }
}


function CleanRoom(){
    //Clean whole room
    afterDock = true;
    stadium = "CleaningRight";
    switch (checkSurroundings()){
            




    }
    loop = setInterval(() => {
        if(RTC.y+RTC.h < map.height) 
        if(HasDistance("right", "wall")) moveRight(afterDock, "simple");
        else {
            moveRight(afterDock, "wall"); 
            clearInterval(loop);
            if(HasDistance("down", "wall")) moveDown(afterDock, "simple"); else moveDown(afterDock, "wall");  
            stadium = "CleaningLeft";
            loop = setInterval(() => {
            if(HasDistance("left", "wall")) moveLeft(afterDock, "simple");
            else{
                moveLeft(afterDock, "wall");
                if(HasDistance("down", "wall")) moveDown(afterDock, "simple"); else moveDown(afterDock, "wall");
                clearInterval(loop);
                CleanRoom();
            }
        }, intervalTime)
        }
        else {
            clearInterval(loop);
            loop = setInterval(() => {
                if(HasDistance("right", "wall")) moveRight(afterDock, "simple");
                else{
                    moveRight(afterDock, "wall");
                    console.log("Finished cleaning");
                    ctx.fillStyle = "#00c600";
                    fill(Dock);
                    clearInterval(loop);
                    EnterDockingStation(true);
                }
            }, intervalTime);
            
        }
    }, intervalTime)
}

function CleanRoomLeft(){
    //Clean whole room
    afterDock = true;
    stadium = "CleaningLeft";
    loop = setInterval(() => {
        if(RTC.y+RTC.h < map.height) 
        if(HasDistance("left", "wall")) moveLeft(afterDock, "simple");
        else {
            moveLeft(afterDock, "wall"); 
            if(HasDistance("down", "wall")) moveDown(afterDock, "simple"); else moveDown(afterDock, "wall");  
            stadium = "CleaningRight";
            clearInterval(loop);            
            loop = setInterval(() => {
            if(HasDistance("right", "wall")) moveRight(afterDock, "simple");
            else{
                moveRight(afterDock, "wall");
                if(HasDistance("down", "wall")) moveDown(afterDock, "simple"); else moveDown(afterDock, "wall");
                clearInterval(loop);
                CleanRoomLeft();
            }
        }, intervalTime)
        }
        else {
            clearInterval(loop);
            ctx.fillStyle = "#00c600";
            fill(Dock);
            console.log("Finished cleaning");
            EnterDockingStation(true);
        }
    }, intervalTime)
}

function StartCleaning(){
    //Go to start point(0, 0) after Docking to DS, then clean whole room
    MoveToStart(CleanRoom);
}


export function ResumeCleaning(){
    console.log(stadium);
    var clearBut = document.getElementById("controlBut");
    userTimer = parseInt(document.getElementById("intervalInput").value);
    if(!isNaN(userTimer)) intervalTime = userTimer;
    clearBut.style.backgroundColor = "#FC6767";
    clearBut.style.borderColor = "red";
    clearBut.textContent = "■ Stop Cleaning";
    switch (stadium){
        case "EnterDock":
            EnterDockingStation(StartCleaning);
            break;
        case "MoveToStart":
            StartCleaning();
            break;
        case "CleaningRight":
            CleanRoom();
            break;
        case "CleaningLeft":
            CleanRoomLeft();
            break;
        default:
            EnterDockingStation(StartCleaning);
            break;
    }

    
}

export function StopCleaning(){
    console.log(stadium);
    var clearBut = document.getElementById("controlBut");
    clearInterval(loop);
    clearBut.style.backgroundColor = "#FFAE57";
    clearBut.style.borderColor = "#FF8400";
    clearBut.textContent = "▶ Resume Cleaning";
}

export default function ClearRoom(){ 
    var clearBut = document.getElementById("controlBut");
    userTimer = parseInt(document.getElementById("intervalInput").value);
    if(!isNaN(userTimer)) intervalTime = userTimer;

    //main cleaning function; first enter docking station, then go to start point(0, 0), then clean whole room
    map.style.backgroundColor = "#FEC3C3";
    EnterDockingStation(false, StartCleaning);
    clearBut.style.backgroundColor = "#FC6767";
    clearBut.style.borderColor = "red";
    clearBut.textContent = "■ Stop Cleaning";
}
