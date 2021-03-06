window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var cellSeize = 25;
    var fps = 60;

    var map = new Array(3000);
    for (var y = 0; y < map.length; y++) {
        map[y] = new Array(3000);
        for (var x = 0; x < map[y].length; x++) {
            var val = Math.random()<0.5?1:0;
            map[y][x] = val;
        }
    }

    function getAroundCount(xd,yd)
    {
        var count = 0;
        for (var y = yd-1; y <= yd+1; y++) {
            for (var x = xd-1; x <= xd+1; x++) {
                if(y>0 && y<map.length)
                {
                    if(x>0 && x<map[0].length)
                    {
                        count+=map[y][x];
                    }
                }
            }
        }
        return count;
    }
    function smoothMap(){
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                if(getAroundCount(x,y)>4)
                {
                    map[y][x] = 1;
                }
                else
                {
                    map[y][x] = 0;
                }
            }
        }
    }

    smoothMap();
    smoothMap();
    smoothMap();
    smoothMap();

    var hero ={
        position: new coordinate(20,14)
    }

    function coordinate(x,y)
    {
        this.x = x;
        this.y = y;
    }

    var camera = {
        position: new coordinate(parseInt(map[0].length/2),parseInt(map.length/2)),
        size: new coordinate(parseInt(canvas.width/cellSeize),parseInt(canvas.height/cellSeize))
    };

    function draw() {
        for(var i = 1499; i < 1501; i++) {
            for(var j = 1499; j < 1501; j++) {
                map[i][j] = 0;
            }
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#eedc82";
        context.fillRect(0, 0, canvas.width, canvas.height);
        for (var y = camera.position.y-parseInt(camera.size.y/2); y < camera.position.y+parseInt(camera.size.y/2); y++) {
            for (var x = camera.position.x-parseInt(camera.size.x/2); x < camera.position.x+parseInt(camera.size.x/2); x++) {
                var mapX = x-camera.position.x+parseInt(camera.size.x/2);
                var mapY = y-camera.position.y+parseInt(camera.size.y/2);
                if(map[y][x]==1)
                {
                    context.fillStyle = "#FF0000";
                }
                else 
                {
                    context.fillStyle = "#00FF00";
                }
                context.fillRect((mapX)*cellSeize, (mapY)*cellSeize, cellSeize, cellSeize);
            }
        }
        setTimeout(draw,1000/fps);
    }
    draw();

    var vert=0;
    var gorz=0;

    var digit1 = true;
    var digit2 = false;
    window.onkeydown = function(event)
    {
        if(event.code == 'Digit1') {
            digit1 = true;
            digit2 = false;
        }
        else if (event.code == 'Digit2') {
            digit2 = true;
            digit1 = false;
        }

        if(event.code == "KeyA") {
            w = false;
            s = false;
            d = false;
            a = true;
        }

        if(event.code == "KeyA" && map[camera.position.y][camera.position.x-1]==0)
        {
            camera.position.x--;
            gorz--;
            console.log(camera.position.x + " " + camera.position.y);
        }

        if(event.code == "KeyD") {
            w = false;
            s = false;
            d = true;
            a = false;
        }

        if(event.code == "KeyD" && map[camera.position.y][camera.position.x+1]==0)
        {
            camera.position.x++;
            gorz++;
            console.log(camera.position.x + " " + camera.position.y);
        }

        if(event.code == "KeyW") {
            w = true;
            s = false;
            d = false;
            a = false;
        }

        if(event.code == "KeyW" && map[camera.position.y-1][camera.position.x]==0)
        {
            camera.position.y--;
            vert--;
            console.log(camera.position.x + " " + camera.position.y);
        }

        if(event.code == "KeyS") {
            w = false;
            s = true;
            d = false;
            a = false;
        }

        if(event.code == "KeyS" && map[camera.position.y+1][camera.position.x]==0)
        {
            camera.position.y++;
            vert++;
            console.log(camera.position.x + " " + camera.position.y);
        }

        if(event.code == "KeyQ")
        {
            map[camera.position.y][camera.position.x-1] = 0;
            map[camera.position.y-1][camera.position.x] = 0;
            map[camera.position.y][camera.position.x+1] = 0;
            map[camera.position.y+1][camera.position.x] = 0;
        }

        if(event.code == "KeyP")
        {
            map[camera.position.y-1][camera.position.x] = 1;
        }

        if(event.code == "Semicolon")
        {
            map[camera.position.y+1][camera.position.x] = 1;
        }

        if(event.code == "KeyL")
        {
            map[camera.position.y][camera.position.x-1] = 1;
        }

        if(event.code == "Quote")
        {
            map[camera.position.y][camera.position.x+1] = 1;
        }

        if(event.code == "Space")
        {
            var x = camera.position.x;
            var y = camera.position.y;

            var i = 0;
            var j = 0;
            var p = 0;

            if(w)
                var interval = setInterval(fun_w, 15);
            if(a)
                var interval = setInterval(fun_a, 15);
            if(s)
                var interval = setInterval(fun_s, 15);
            if(d)
                var interval = setInterval(fun_d, 15);

            function fun_w() {
                if(map[y + (--p)][x] == 0) {
                    map[y + (--i)][x] = 1;
                    map[y + j--][x] = 0;
                    map[y][x] = 0;
                }
                else {
                    clearInterval(interval);
                    if(digit1) {
                        map[y + j--][x] = 0;
                        map[y + j--][x] = 0;
                    }
                }
            }
            function fun_a() {
                if(map[y][x + (--p)] == 0) {
                    map[y][x + (--i)] = 1;
                    map[y][x + j--] = 0;
                    map[y][x] = 0;
                    }
                else {
                    clearInterval(interval);
                    if(digit1) {
                        map[y][x + j--] = 0;
                        map[y][x + j--] = 0;
                    }
                }
            }
            function fun_s() {
                if(map[y + (++p)][x] == 0) {
                    map[y + (++i)][x] = 1;
                    map[y + j++][x] = 0;
                    map[y][x] = 0;
                }
                else {
                    clearInterval(interval);
                    if(digit1) {
                        map[y + j++][x] = 0;
                        map[y + j++][x] = 0;
                    }
                }
            }
            function fun_d() {
                if( map[y][x + (++p)] == 0) {
                    map[y][x + (++i)] = 1;
                    map[y][x + j++] = 0;
                    map[y][x] = 0;
                }
                else {
                    clearInterval(interval);
                    if(digit1) {
                        map[y][x + j++] = 0;
                        map[y][x + j++] = 0;
                    }
                }
            }
        }
    }

    function update()
    {
                var mapX = hero.position.x
                var mapY = hero.position.y
                    context.fillStyle = "#0000ff";  
                context.fillRect((mapX)*cellSeize, (mapY)*cellSeize, cellSeize, cellSeize);
        setTimeout(update,1000/fps);
    }
    update();
}