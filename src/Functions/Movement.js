import {RTC, Dock, obstacles} from './Generation'
import {fill, clear} from './Auxiliary'
import {ctx} from './Room'

//If entered docking, clean the floor, if not - just move
export function moveRight(afterDock){
    ctx.fillStyle = "#D7FCD9";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.x += RTC.w;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveLeft(afterDock){
    ctx.fillStyle = "#D7FCD9";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.x -= RTC.w;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveUp(afterDock){
    ctx.fillStyle = "#D7FCD9";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.y -= RTC.h;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveDown(afterDock){
    ctx.fillStyle = "#D7FCD9";
    afterDock ? fill(RTC) : clear(RTC);
    RTC.y += RTC.h;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveUpDock(){
    clear(RTC);
    RTC.y -= RTC.y-Dock.y-Dock.h;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveDownDock(){
    clear(RTC);
    RTC.y += Dock.y+Dock.h-RTC.y-RTC.h;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveRightDock(){
    clear(RTC);
    RTC.x += Dock.x-RTC.x-RTC.w;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveLeftDock(){
    clear(RTC);
    RTC.x -= RTC.x-Dock.x-Dock.w;
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function HasDistance(direction){
    switch (direction){
    case "right": 
            if(RTC.x + 2*RTC.w < Dock.x) return true;
            else return false;
    case "left": 
            if(RTC.x - RTC.w > Dock.x+Dock.w) return true;
            else return false;
    case "up": 
            if(RTC.y - RTC.h > Dock.y+Dock.h) return true;
            else return false;
    case "down": 
            if(RTC.y + RTC.h < Dock.y) return true;
            else return false;
    default: 
            return true;
    }
}