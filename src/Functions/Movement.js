import {RTC, Dock, obstacles} from './Generation'
import {fill, clear} from './Auxiliary'
import {ctx, map} from './Room'

//If entered docking, clean the floor, if not - just move
export function moveRight(afterDock, mode){
    switch (mode){
        case "simple":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.x += RTC.w;
            ctx.fillStyle = "#0d880d";
            fill(RTC);
            break;
        case "dock":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            console.log("right")
            RTC.x += Dock.x-RTC.x-RTC.w;
            ctx.fillStyle = "#0d880d";
            fill(RTC);
            break;
        case "wall":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.x += map.width-RTC.x-RTC.w;
            break;
        default:
            break;
    }
}

function makeMove(){
    ctx.fillStyle = "#0d880d";
    fill(RTC);
}

export function moveLeft(afterDock, mode){
    switch (mode){
        case "simple":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.x -= RTC.w;
            makeMove();
            break;
        case "dock":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            console.log("left")
            RTC.x -= RTC.x-Dock.x-Dock.w;
            makeMove();
            break;
        case "wall":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.x -= RTC.x;
            makeMove();
            break;
        default:
            break;
    }
}

export function moveUp(afterDock, mode){
    switch (mode){
        case "simple":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.y -= RTC.h;
            makeMove();
            break;
        case "dock":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.y -= RTC.y-Dock.y;
            makeMove();
            break;
        case "wall":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.y -= RTC.y;
            makeMove();
            break;
        default:
            break;
    }
}

export function moveDown(afterDock, mode){
    switch (mode){
        case "simple":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.y += RTC.h;
            makeMove();
            break;
        case "dock":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.y += Dock.y+Dock.h-RTC.y-RTC.h;
            makeMove();
            break;
        case "wall":
            ctx.fillStyle = "#D7FCD9";
            afterDock ? fill(RTC) : clear(RTC);
            RTC.y += map.height - RTC.y-RTC.h;
            makeMove();
            break;
        default:
            break;
    }
}


export function HasDistance(direction, obj){
    switch (obj){
        case "dock":
            switch (direction){
                case "right": 
                        if(RTC.x + RTC.w <= Dock.x) return true;
                        else return false;
                case "left": 
                        if(RTC.x - RTC.w > Dock.x+Dock.w) return true;
                        else return false;
                case "up": 
                        if(RTC.y - RTC.h > Dock.y+Dock.h) return true;
                        else return false;
                case "down": 
                        if(RTC.y + RTC.h <= Dock.y) return true;
                        else return false;
                default: 
                        return true;
                }
        case "wall":
            switch (direction){
                case "right":
                        if(RTC.x + 2*RTC.w < map.width) return true;
                        else return false;
                case "left":
                        if(RTC.x - RTC.w > 0) return true;
                        else return false;
                case "up": 
                        if(RTC.y - RTC.h > 0) return true;
                        else return false;
                case "down": 
                        if(RTC.y + RTC.h < map.height) return true;
                        else return false;
                default: 
                        return true;
                }
        }

}