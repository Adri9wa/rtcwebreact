import {map, ctx} from './Room'

export function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function fill(a){
    ctx.fillRect(a.x, a.y, a.w, a.h);   
}

export function clear(a){
    ctx.clearRect(a.x, a.y, a.w, a.h);   
}

//Clear Canvas Button
export function ClearCanvas() {
    ctx.clearRect(0, 0, map.width, map.height);
}

function overlaps(a, b) {
	if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;
	if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;
	return true;
}

export function GenerateWithoutOverlap(w, h, x, y, trials, obstacles) {
    var flag = true;
    while (flag) {
                trials++;
                if (trials>20) break;
                for(var j = 0; j<obstacles.length; j++){

                    var a = {};
                    a.x1 = obstacles[j].x;
                    a.y1 = obstacles[j].y;
                    a.x2 = obstacles[j].x+obstacles[j].w;
                    a.y2 = obstacles[j].y+obstacles[j].h;

                    var b = {};
                    b.x1 = x;
                    b.y1 = y;
                    b.x2 = x+w;
                    b.y2 = y+h;

                        if(overlaps(a, b)){
                            x = GetRandomInt(0, map.width - w);
                            y = GetRandomInt(0, map.height - h);
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
    return [b, trials];
}