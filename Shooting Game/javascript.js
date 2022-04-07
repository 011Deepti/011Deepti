'use strict';
var x = 1860;
var y = 600;
var x2 = 0;
var y2 = 100;
var rect;
var rect2;
var counter;
var counter2;
var objectiles = [];
var facing = "left";
var facing2 = "right";
var shooting = 0;
var shooting2 = 0;
var up;
var down;
var right;
var left;
var pew;
var up2;
var down2;
var right2;
var left2;
var pew2;
var cooldown = 0;
var cooldown2 = 0;
var score = 0;
var score2 = 0;
var mazelist = [[0, 0]];
var walls = [];
var kisfalx;
var nagyfalx;
var kisfaly;
var nagyfaly;
var lovx = 0;
var lovy = 0;
var lovi;
var powerup = false;
var powerup1 = false;
var powerup2 = false;
var shield = false;
var laser = false;
var speed = false;
var powerupx = false;
var powerupy = false;
var powerupcooldown = 0;
var cc;
var melee = false;
var reverse = false;
var shuffle2 = false;
var swap = false;
var swapcord = [];
var portalkek = [];
var portalnarancs = [];
var portalcooldown = 0;
var portalcooldown2 = 0;
function component(width, height, color, x, y, type, facing) {
    this.facing = facing;
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(x, y, facing) {
        let ctx = myGameArea.context;
        this.facing = facing;
        this.x = x;
        this.y = y;
        if (this.type == "text") {
            ctx.font = "100px Arial";
            ctx.fillStyle = color;
            ctx.fillText(facing, this.x, this.y);
        }else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
function updateGameArea() {
    myGameArea.clear();
    for (let i = 0; i < objectiles.length; i++) {
        let ctx = myGameArea.context;
        ctx.fillStyle = "gray";
        switch (objectiles[i][6]) {
            case "left":
                objectiles[i][3] -= 30
                ctx.fillRect(objectiles[i][3], objectiles[i][4], 5, 5);
                break;
            case "right":
                objectiles[i][3] += 30
                ctx.fillRect(objectiles[i][3], objectiles[i][4], 5, 5);
                break;
            case "up":
                objectiles[i][4] -= 30
                ctx.fillRect(objectiles[i][3], objectiles[i][4], 5, 5);
                break;
            case "down":
                objectiles[i][4] += 30
                ctx.fillStyle = "gray";
                ctx.fillRect(objectiles[i][3], objectiles[i][4], 5, 5);
                break;
            default:
                break;
        }
        if (objectiles[i][7] == 1) {
            if (objectiles[i][3] < x2 + 50 && objectiles[i][3] > x2 && objectiles[i][4] > y2 && objectiles[i][4] < y2 + 50) {
                if (!(shield && powerup2)) {
                    score2++;
                    x = 1860;
                    y = 600;
                    x2 = 0;
                    y2 = 100;
                    objectiles = [];
                    mazelist = [0, 0];
                    maze(17, 5)
                    portalkek = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
                    portalnarancs = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
                }
            }
        } else if (objectiles[i][7] == 2) {
            if (objectiles[i][3] < x + 50 && objectiles[i][3] > x && objectiles[i][4] > y && objectiles[i][4] < y + 50) {
                if (!(shield && powerup1)) {
                    score++;
                    x = 1860;
                    y = 600;
                    x2 = 0;
                    y2 = 100;
                    objectiles = [];
                    mazelist = [0, 0];
                    maze(17, 5)
                    portalkek = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
                    portalnarancs = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
                }
            }
        }
        lovx = objectiles[i][3];
        lovy = objectiles[i][4];
        lovi = objectiles[i][6];
        if (portalcooldown == 4) {
            portalcooldown = 0;
            if (portalkek[0] <= lovx + 50 && portalkek[0] + 100 >= lovx && portalkek[1] + 100 >= lovy && portalkek[1] <= lovy + 50) {
                objectiles[i][3] = lovx - portalkek[0] + portalnarancs[0]
                objectiles[i][4] = lovy - portalkek[1] + portalnarancs[1]
            } else if (portalnarancs[0] <= lovx + 50 && portalnarancs[0] + 100 >= lovx && portalnarancs[1] + 100 >= lovy && portalnarancs[1] <= lovy + 50) {
                objectiles[i][3] = lovx - portalnarancs[0] + portalkek[0]
                objectiles[i][4] = lovy - portalnarancs[1] + portalkek[1]
            }
        }
        if (portalcooldown < 5) {
            portalcooldown++;
        }
        for (let j = 0; j < walls.length; j++) {
            if (walls[j][0] <= walls[j][2]) {
                kisfalx = walls[j][0];
                nagyfalx = walls[j][2];
            } else {
                kisfalx = walls[j][2];
                nagyfalx = walls[j][0];
            }
            if (walls[j][1] <= walls[j][3]) {
                kisfaly = walls[j][1];
                nagyfaly = walls[j][3];
            } else {
                kisfaly = walls[j][3];
                nagyfaly = walls[j][1];
            }
            if (!(laser && powerup2 || laser && powerup1)) {
                if (kisfaly < lovy && lovy < nagyfaly) {
                    if (lovi == "left" || lovi == "right") {
                        if (lovx <= kisfalx && kisfalx < lovx + 50) {
                            objectiles.splice(i, 1)
                            break;
                        }
                    }
                }
                if (kisfalx < lovx && lovx < nagyfalx) {
                    if (lovi == "up" || lovi == "down") {
                        if (lovy <= kisfaly && kisfaly < lovy + 50) {
                            objectiles.splice(i, 1)
                            break;
                        }
                    }
                }
            } else if (laser && powerup1) {
                if (objectiles[i][7] == 2) {
                    if (kisfaly < lovy && lovy < nagyfaly) {
                        if (lovi == "left" || lovi == "right") {
                            if (lovx <= kisfalx && kisfalx < lovx + 50) {
                                objectiles.splice(i, 1)
                                break;
                            }
                        }
                    }
                    if (kisfalx < lovx && lovx < nagyfalx) {
                        if (lovi == "up" || lovi == "down") {
                            if (lovy <= kisfaly && kisfaly < lovy + 50) {
                                objectiles.splice(i, 1)
                                break;
                            }
                        }
                    }
                }
            } else if (laser && powerup2) {
                if (objectiles[i][7] == 1) {
                    if (kisfaly < lovy && lovy < nagyfaly) {
                        if (lovi == "left" || lovi == "right") {
                            if (lovx <= kisfalx && kisfalx < lovx + 50) {
                                objectiles.splice(i, 1)
                                break;
                            }
                        }
                    }
                    if (kisfalx < lovx && lovx < nagyfalx) {
                        if (lovi == "up" || lovi == "down") {
                            if (lovy <= kisfaly && kisfaly < lovy + 50) {
                                objectiles.splice(i, 1)
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (lovx <= 0 || lovx >= 1900 || lovy <= 0 || lovy >= 700) {
            objectiles.splice(i, 1)
        }
}
    document.addEventListener('keydown', function(event) {
        if (reverse && powerup2) {
            if(event.keyCode == 37 && x <= 1850) {
                right = true;
            }
            if(event.keyCode == 39 && x >= 0) {
                left = true;
            }
            if(event.keyCode == 38 && y <= 650) {
                down = true;
            }
            if(event.keyCode == 40 && y >= 0) {
                up = true;            }
        } else {
            if(event.keyCode == 37 && x >= 0) {
                left = true;
            }
            if(event.keyCode == 39 && x <= 1850) {
                right = true;
            }
            if(event.keyCode == 38 && y >= 0) {
                up = true;
            }
            if(event.keyCode == 40 && y <= 650) {
                down = true;
            }
        }
        if(event.keyCode == 76) {
            pew = true;
        }
        if (reverse && powerup1) {
            if(event.keyCode == 65 && x2 <= 1870) {
                right2 = true;
            }
            if(event.keyCode == 68 && x2 >= 0) {
                left2 = true;
            }
            if(event.keyCode == 87 && y2 <= 650) {
                down2 = true;
            }
            if(event.keyCode == 83 && y2 >= 0) {
                up2 = true;
            }
        } else {
            if(event.keyCode == 65 && x2 >= 0) {
                left2 = true;
            }
            if(event.keyCode == 68 && x2 <= 1870) {
                right2 = true;
            }
            if(event.keyCode == 87 && y2 >= 0) {
                up2 = true;
            }
            if(event.keyCode == 83 && y2 <= 650) {
                down2 = true;
            }
        }
        if(event.keyCode == 84) {
            pew2 = true;
        }
    });
    document.addEventListener('keyup', function(event) {
        if (reverse && powerup2) {
            if(event.keyCode == 37) {
                right = false;
            }
            if(event.keyCode == 39) {
                left = false;
            }
            if(event.keyCode == 38) {
                down = false;
            }
            if(event.keyCode == 40) {
                up = false;
            }
        } else{
            if(event.keyCode == 37) {
                left = false;
            }
            if(event.keyCode == 39) {
                right = false;
            }
            if(event.keyCode == 38) {
                up = false;
            }
            if(event.keyCode == 40) {
                down = false;
            }
        }
        if(event.keyCode == 76) {
            pew = false;
        }
        if (reverse && powerup1) {
            if(event.keyCode == 65) {
                right2 = false;
            }
            if(event.keyCode == 68) {
                left2 = false;
            }
            if(event.keyCode == 87) {
                down2 = false;
            }
            if(event.keyCode == 83) {
                up2 = false;
            }
        } else {
            if(event.keyCode == 65) {
                left2 = false;
            }
            if(event.keyCode == 68) {
                right2 = false;
            }
            if(event.keyCode == 87) {
                up2 = false;
            }
            if(event.keyCode == 83) {
                down2 = false;
            }
        }
        if(event.keyCode == 84) {
            pew2 = false;
        }
    });
    for (let i = 0; i < walls.length; i++) {
        if (walls[i][0] <= walls[i][2]) {
            kisfalx = walls[i][0];
            nagyfalx = walls[i][2];
        } else {
            kisfalx = walls[i][2];
            nagyfalx = walls[i][0];
        }
        if (walls[i][1] <= walls[i][3]) {
            kisfaly = walls[i][1];
            nagyfaly = walls[i][3];
        } else {
            kisfaly = walls[i][3];
            nagyfaly = walls[i][1];
        }
        if (!(speed && powerup2)) {  
            if (y2 == walls[i][1] && x2 < nagyfalx && x2 + 50 > kisfalx || y2 == walls[i][3] && x2 < nagyfalx && x2 + 50 > kisfalx) {
                up2 = false;
            }
            if (y2 + 50 == walls[i][1] && x2 < nagyfalx && x2 + 50 > kisfalx || y2 + 50 == walls[i][3] && x2 < nagyfalx && x2 + 50 > kisfalx) {
                down2 = false;
            }
            if (y2 + 50 > kisfaly && y2 < nagyfaly && x2 + 50 == walls[i][0] || y2 + 50 > kisfaly && y2 < nagyfaly && x2 + 50 == walls[i][2]) {
                right2 = false;
            }
            if (y2 + 50 > kisfaly && y2 < nagyfaly && x2 == walls[i][0] || y2 + 50 > kisfaly && y2 < nagyfaly && x2 == walls[i][2]) {
                left2 = false;
            }
        }
        if (!(speed && powerup1)) {  
            if (y == walls[i][1] && x < nagyfalx && x + 50 > kisfalx || y == walls[i][3] && x < nagyfalx && x + 50 > kisfalx) {
                up = false;
            }
            if (y + 50 == walls[i][1] && x < nagyfalx && x + 50 > kisfalx || y + 50 == walls[i][3] && x < nagyfalx && x + 50 > kisfalx) {
                down = false;
            }
            if (y + 50 > kisfaly && y < nagyfaly && x + 50 == walls[i][0] || y + 50 > kisfaly && y < nagyfaly && x + 50 == walls[i][2]) {
                right = false;
            }
            if (y + 50 > kisfaly && y < nagyfaly && x == walls[i][0] || y + 50 > kisfaly && y < nagyfaly && x == walls[i][2]) {
                left = false;
            }
        }
    }
    if (speed && powerup1) {

        if (up  && y != 0) {
            y -= 20;
            facing = "up"
        }
        if (down  && y != 660) {
            y += 20;
            facing = "down"
        }
        if (left && x != 0) {
            x -= 20;
            facing = "left"
        }
        if (right && x != 1860) {
            x += 20;
            facing = "right"
        }
    } else {
        if (up  && y != 0) {
            y -= 10;
            facing = "up"
        }
        if (down  && y != 660) {
            y += 10;
            facing = "down"
        }
        if (left && x != 0) {
            x -= 10;
            facing = "left"
        }
        if (right && x != 1860) {
            x += 10;
            facing = "right"
        }
    }
    if (pew && cooldown == 15) {
        cooldown = 0;
        myGameArea.clear();
        objectiles.push([5 ,5, "gray", x + 20, y + 20, "bullet", facing, 1]);
        rect.update(x, y);
    } else {
        if (cooldown < 15) {
            cooldown++;
        }
    }
    if (speed && powerup2) {
        if (up2  && y2 != 0) {
            y2 -= 20;
            facing2 = "up"
        }
        if (down2  && y2 != 660) {
            y2 += 20;
            facing2 = "down"
        }
        if (left2 && x2 != 0) {
            x2 -= 20;
            facing2 = "left"
        }
        if (right2 && x2 != 1860) {
            x2 += 20;
            facing2 = "right"
        }
    } else {
        if (up2  && y2 != 0) {
            y2 -= 10;
            facing2 = "up"
        }
        if (down2  && y2 != 660) {
            y2 += 10;
            facing2 = "down"
        }
        if (left2 && x2 != 0) {
            x2 -= 10;
            facing2 = "left"
        }
        if (right2 && x2 != 1860) {
            x2 += 10;
            facing2 = "right"
        }
    }
    if (pew2 && cooldown2 == 15) {
        cooldown2 = 0;
        myGameArea.clear();
        objectiles.push([5 ,5, "gray", x2 + 20, y2 + 20, "bullet", facing2, 2]);
        rect.update(x, y);
    } else {
        if (cooldown2 < 15) {
            cooldown2++;
        }
    }
    let ctx = myGameArea.context;
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(portalkek[0] + 90, portalkek[1] + 45);
    ctx.arc(portalkek[0] + 45, portalkek[1] + 45, 45, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.moveTo(portalnarancs[0] + 90, portalnarancs[1] + 45);
    ctx.arc(portalnarancs[0] + 45, portalnarancs[1] + 45, 45, 0, 2 * Math.PI);
    ctx.stroke();
    if (!powerup) {
        switch (Math.floor(Math.random() * 7)+ 1) {
            case 1:
                shield = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            case 2: 
                laser = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            case 3: 
                speed = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            case 4:
                melee = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            case 5:
                reverse = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            case 6:
                shuffle2 = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            case 7:
                swap = true;
                powerupx = Math.floor(Math.random() * 17) * 100 + 137
                powerupy = Math.floor(Math.random() * 5) * 100 + 137
                break;
            default:
                break;
        }
        powerup = true;
    }
    if (shield && powerup2) {
        let ctx = myGameArea.context;
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.moveTo(x2 + 75, y2 + 25);
        ctx.arc(x2 + 25, y2 + 25, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
    if (shield && powerup1) {
        let ctx = myGameArea.context;
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(x + 75, y + 25);
        ctx.arc(x + 25, y + 25, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
    if (shield && !powerup1 && !powerup2) {
        console.log("shield")
        let ctx = myGameArea.context;
        ctx.fillStyle = "green";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (laser && !powerup1 && !powerup2) {
        console.log("laser")
        let ctx = myGameArea.context;
        ctx.fillStyle = "#34BFCA";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (speed && !powerup1 && !powerup2) {
        console.log("speed")
        let ctx = myGameArea.context;
        ctx.fillStyle = "yellow";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (melee && !powerup1 && !powerup2) {
        console.log("melee")
        let ctx = myGameArea.context;
        ctx.fillStyle = "purple";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (reverse && !powerup1 && !powerup2) {
        console.log("reverse")
        let ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (shuffle2 && !powerup1 && !powerup2) {
        console.log("shuffle")
        let ctx = myGameArea.context;
        ctx.fillStyle = "orange";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (swap && !powerup1 && !powerup2) {
        console.log("swap")
        let ctx = myGameArea.context;
        ctx.fillStyle = "gray";
        ctx.fillRect(powerupx, powerupy, 25, 25);
    }
    if (x<= x2 + 50 && x + 25 >= x2 && y + 25 >= y2 && y <= y2 + 50 && melee && powerup2) {
        score++;
        x = 1860;
        y = 600;
        x2 = 0;
        y2 = 100;
        objectiles = [0, 0];
        mazelist = [0, 0];
        maze(17, 5)
    }
    if (x2<= x + 50 && x2 + 25 >= x && y2 + 25 >= y && y2 <= y + 50 && melee && powerup1) {
        score2++;
        x = 1860;
        y = 600;
        x2 = 0;
        y2 = 100;
        objectiles = [];
        mazelist = [0, 0];
        maze(17, 5)
    }
    if (powerupx <= x2 + 50 && powerupx + 25 >= x2 && powerupy + 25 >= y2 && powerupy <= y2 + 50) {
        powerup2 = true;
        if (speed && powerup2) {
            y2 = Math.round(y2 / 20) * 20
            x2 = Math.round(x2 / 20) * 20
        }
    }
    if (powerupx <= x + 50 && powerupx + 25 >= x && powerupy + 25 >= y && powerupy <= y + 50) {
        powerup1 = true;
        if (speed && powerup1) {
            y = Math.round(y / 20) * 20
            x = Math.round(x / 20) * 20
        }
    }
    if (powerup1 || powerup2) {
        powerupcooldown++;
        if (powerupcooldown == 150) {
            if (speed && powerup2) {
                y2 = Math.round(y2 / 10) * 10
                x2 = Math.round(x2 / 10) * 10
                speed = false;
            }
            if (speed && powerup1) {
                y = Math.round(y / 10) * 10
                x = Math.round(x / 10) * 10
                speed = false;
            }
            powerup = false;
            powerup1 = false;
            powerup2 = false;
            shield = false;
            laser = false;
            melee = false;
            reverse = false;
            powerupcooldown = 0;
        }
    }
    if (shuffle2 && powerup1 || shuffle2 && powerup2) {
        powerup1 = false;
        powerup2 = false;
        shuffle2 = false;
        mazelist = [[0, 0]];
        walls = [];
        maze(17, 5);
        portalkek = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
        portalnarancs = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
    }
    if (swap && powerup1 || swap && powerup2) {
        powerup1 = false;
        powerup2 = false;
        swap = false;
        swapcord = [x2, y2]
        x2 = x
        y2 = y
        y = swapcord[1]
        x = swapcord[0]
    }
    if (portalcooldown2 == 30) {
        portalcooldown2 = 0;
        if (portalkek[0] <= x + 50 && portalkek[0] + 90 >= x && portalkek[1] + 90 >= y && portalkek[1] <= y + 50) {
            x = portalnarancs[0] + 25
            y = portalnarancs[1] + 25
            console.log("portal")
        } else if (portalnarancs[0] <= x + 50 && portalnarancs[0] + 90 >= x && portalnarancs[1] + 90 >= y && portalnarancs[1] <= y + 50) {
            x = portalkek[0] + 25
            y = portalkek[1] + 25
            console.log("portal")
        }
        if (portalkek[0] <= x2 + 50 && portalkek[0] + 90 >= x2 && portalkek[1] + 100 >= y2 && portalkek[1] <= y2 + 50) {
            x2 = portalnarancs[0] + 25
            y2 = portalnarancs[1] + 25
            console.log("portal")
        }else if (portalnarancs[0] <= x2 + 50 && portalnarancs[0] + 90 >= x2 && portalnarancs[1] + 90 >= y2 && portalnarancs[1] <= y2 + 50) {
            x2 = portalkek[0] + 25
            y2 = portalkek[1] + 25
            console.log("portal")
        }
    }
    if (portalcooldown2 < 30) {
        portalcooldown2++;
    }
    rect.update(x, y);
    rect2.update(x2, y2)
    if (powerup1) {
        let ctx = myGameArea.context;
        if (shield) {
            ctx.fillStyle = "green";
            ctx.fillRect(x + 12, y + 12, 25, 25);
        }
        if (laser) {
            ctx.fillStyle = "#34BFCA";
            ctx.fillRect(x + 12, y + 12, 25, 25);
        }
        if (speed) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(x + 12, y + 12, 25, 25);
        }
        if (melee) {
            ctx.fillStyle = "purple";
            ctx.fillRect(x + 12, y + 12, 25, 25);
        }
        if (reverse) {
            ctx.fillStyle = "white";
            ctx.fillRect(x2 + 12, y2 + 12, 25, 25);
        }
    }
    if (powerup2) {
        let ctx = myGameArea.context;
        if (shield) {
            ctx.fillStyle = "green";
            ctx.fillRect(x2 + 12, y2 + 12, 25, 25);
        }
        if (laser) {
            ctx.fillStyle = "#34BFCA";
            ctx.fillRect(x2 + 12, y2 + 12, 25, 25);
        }
        if (speed) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(x2 + 12, y2 + 12, 25, 25);
        }
        if (melee) {
            ctx.fillStyle = "purple";
            ctx.fillRect(x2 + 12, y2 + 12, 25, 25);
        }
        if (reverse) {
            ctx.fillStyle = "white";
            ctx.fillRect(x + 12, y + 12, 25, 25);
        }
    }
    counter.update(0, 80, score)
    counter2.update(1750, 80, score2)
    if (powerup1 || powerup2) {
        cc.update(950, 80, Math.round(5 - (powerupcooldown / 30)))
    }
    draw_maze(mazelist);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1910;
        this.canvas.height = 710;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 30);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    myGameArea.start();
    rect = new component(50, 50, "red", x, y);
    rect2 = new component(50, 50, "blue", x2, y2);
    counter = new component(score, 0, "blue", 0, 80, "text");
    counter2 = new component(score2, 0, "red", 1750, 80, "text");
    cc = new component(Math.round(5 - (powerupcooldown / 30)), 0, "red", 950, 80, "text");
    maze(17, 5);
    portalkek = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
    portalnarancs = [(Math.floor(Math.random() * 17)+ 1) * 100 + 5, (Math.floor(Math.random() * 5)+ 1) * 100 + 5]
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x; 
    }
    return a;
}
function Searchlist(list, list2) {
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i][0] == list2[0]) {
            if (list[i][1] == list2[1]) {
                return true;
            }
        }
    }
    return false;
}
function draw_maze(mazelist) {
    walls = [];
    for (let i = 0; i < mazelist.length - 1; i++) {
        if (mazelist[i].length == 2 && mazelist[i + 1].length == 2) {
            let ctx = myGameArea.context;
            ctx.beginPath();
            ctx.moveTo(mazelist[i][0] * 100 + 100, mazelist[i][1] * 100 + 100);
            ctx.lineTo(mazelist[i + 1][0] * 100 + 100, mazelist[i + 1][1] * 100 + 100);
            ctx.strokeStyle = 'red';
            ctx.stroke();
            walls.push([mazelist[i][0] * 100 + 100, mazelist[i][1] * 100 + 100, mazelist[i + 1][0] * 100 + 100, mazelist[i + 1][1] * 100 + 100]);
        }
    }
}
function maze(mazewidth, mazeheight) {
    let currentpos = [0, 0];
    let directions = 0;
    let breaking;
    let directions2 = [];
    while(true) {
        directions2 = [];
        directions = 0;
        if (currentpos[0] > 0) {
            if (!Searchlist(mazelist,[currentpos[0] - 1, currentpos[1]])) {
                directions2.push("1")
            }
        }
        if (currentpos[0] < mazewidth) {
            if (!Searchlist(mazelist, [currentpos[0] + 1, currentpos[1]])) {
                directions2.push("2")
            }
        }
        if (currentpos[1] > 0) {
            if (!Searchlist(mazelist, [currentpos[0], currentpos[1] - 1])) {
                directions2.push("3")
            }
        }
        if (currentpos[1] < mazeheight) {
            if (!Searchlist(mazelist, [currentpos[0], currentpos[1]  + 1])) {
                directions2.push("4")
            }
        }
        if (directions2.length != 0) {
            shuffle(directions2);
            switch (directions2[0]) {
                case "1":
                    mazelist.push([currentpos[0] - 1, currentpos[1]]);
                    currentpos = [currentpos[0] - 1, currentpos[1]];
                    break;
                case "2":
                    mazelist.push([currentpos[0] + 1, currentpos[1]]);
                    currentpos = [currentpos[0] + 1, currentpos[1]];
                    break;
                case "3":
                    mazelist.push([currentpos[0], currentpos[1] - 1]);
                    currentpos = [currentpos[0], currentpos[1] - 1];
                    break;
                case "4":
                    mazelist.push([currentpos[0], currentpos[1] + 1]);
                    currentpos = [currentpos[0], currentpos[1] + 1];
                    break;
                default:
                    break;
            }
        } else {
            for (let i = mazelist.length - 1; i >= 0; i--) {
                if (mazelist[i][0] > 0) {
                    if (!Searchlist(mazelist,[mazelist[i][0] - 1, mazelist[i][1]])) {
                        directions++;
                    }
                }
                if (mazelist[i][0] < mazewidth) {
                    if (!Searchlist(mazelist, [mazelist[i][0] + 1, mazelist[i][1]])) {
                        directions++;
                    }
                }
                if (mazelist[i][1] > 0) {
                    if (!Searchlist(mazelist, [mazelist[i][0], mazelist[i][1] - 1])) {
                        directions++;
                    }
                }
                if (mazelist[i][1] < mazeheight) {
                    if (!Searchlist(mazelist, [mazelist[i][0], mazelist[i][1]  + 1])) {
                        directions++;
                    }
                }
                if (directions >= 1) {
                    mazelist.push([mazelist[i][0], mazelist[i][1], "UGRAS"])
                    currentpos = mazelist[i]
                    break;
                }
                if (i == 0) {
                    breaking = true;
                }
            }
        }
        if (breaking) {
            break;
        }
    }
}