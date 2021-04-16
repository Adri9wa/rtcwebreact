import React from 'react'
import {GetRandomInt} from './Auxiliary'

var map;
var ctx;
var obstacles = [];

export default function Room(){
    return(
    <div className="WorkTable">  
        <canvas id="map" height="200" width="200"></canvas>
    </div>
    )
}


export function SwitchMode() {
    if (document.body.style.backgroundColor === "black") document.body.style.backgroundColor = "white";
        else document.body.style.backgroundColor = "black";  
}

export function GenerateRoom() {
    map = document.getElementById("map");
    ctx = map.getContext("2d");
    obstacles = [];
    var minMapX = 300, minMapY = 300, maxMapX = 1200, maxMapY = 1200;
    ctx.font = "20px Arial";
    if (obstacles.length > 0) { if (window.confirm("Are you sure you want to regenerate the room?")) {
        var X = GetRandomInt(minMapX, maxMapX), Y = GetRandomInt(minMapY, maxMapY);
        console.log(X, Y);
        map.width = X;
        map.height = Y;
        obstacles = [];
    } }
    else {
        X = GetRandomInt(minMapX, maxMapX);
        Y = GetRandomInt(minMapY, maxMapY);
        map.width = X;
        map.height = Y;
    }
    
}

export function ResetRoom() {
    obstacles = [];
    if (window.confirm("Are you sure you want to reset?")) {
        ctx.clearRect(0, 0, map.width, map.height);
        map.width = 200;
        map.height = 200;
        obstacles.length = 0;
    }
}

export {map};
export {ctx};
