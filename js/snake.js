class Snake {
    constructor(obj) {
        this.width = obj.width || 50;
        this.height = obj.height || 50;
        this.snakeMap = obj.snakeMap || {};
        // this.snakeFood=obj.snakeFood||{};
        this.headImg = obj.headImg || "images/head.png";
        this.bodyImg = obj.bodyImg || "images/body.png";
        this.bodies = [
            {x: 2, y: 1, type: 1},
            {x: 1, y: 1, type: 0},
            {x: 0, y: 1, type: 0},
        ];
        this.head = this.bodies[0];
        document.onkeydown = () => {
            this.key = event.key;
        };
        let mapStyle = window.getComputedStyle(this.snakeMap.oMap);
        let mapWidth = parseInt(mapStyle.width);
        let mapHeight = parseInt(mapStyle.height);
        let wRatio = mapWidth / this.width;
        let hRatio = mapHeight / this.height;
        this.x = wRatio - 1;
        this.y = hRatio - 1;
    }

    render() {
        //清空上一步的元素
        let oBodies = document.querySelectorAll(".snake");
        for (let i = oBodies.length - 1; i >= 0; i--) {
            let oBody = oBodies[i];
            oBody.parentNode.removeChild(oBody);
        }
        //设置下一步的位置
        for (let body of this.bodies) {
            let oDiv = document.createElement("div");
            oDiv.className = "snake";
            oDiv.style.width = this.width + "px";
            oDiv.style.height = this.height + "px";
            oDiv.style.position = "absolute";
            if (body.type === 1) {
                oDiv.style.background = `url(${this.headImg})`;
            } else {
                oDiv.style.background = `url(${this.bodyImg})`;
            }
            oDiv.style.left = body.x * this.width + "px";
            oDiv.style.top = body.y * this.width + "px";
            this.snakeMap.oMap.appendChild(oDiv);
        }
    }

    move() {
        //身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i].x = this.bodies[i - 1].x;
            this.bodies[i].y = this.bodies[i - 1].y;
        }
        //头部
        switch (this.key) {
            case "a":
                this.head.x = this.head.x - 1;
                break;
            case "d":
                this.head.x = this.head.x + 1;
                break;
            case "w":
                this.head.y = this.head.y - 1;
                break;
            case "s":
                this.head.y = this.head.y + 1;
                break;
            default:
                this.head.x = this.head.x + 1;
                break;
        }
        this.inspection()
    }

    inspection(snakeFood) {
        //判断是否超出边界
        if (this.head.x < 0 || this.head.y < 0 || this.head.x > this.x || this.head.y > this.y) {
            alert("GAME OVER");
            clearInterval(this.timer);
            return false;
        }
        //判断是否吃到食物
        if (this.head.x === snakeFood.x && this.head.y === snakeFood.y) {
            // alert("sdf");
            snakeFood.remove();
            snakeFood.render();
            let lastBody = this.bodies[this.bodies.length - 1];
            let newBody = {x: lastBody.x, y: lastBody.y, type: lastBody.type};
            let penultBody = this.bodies[this.bodies.length - 2];
            if (lastBody.x > penultBody.x) {
                newBody.x++;
            } else if (lastBody.x < penultBody.x) {
                newBody.x--;
            } else if (lastBody.y > penultBody.y) {
                newBody.y++;
            } else {
                newBody.y--;
            }
            this.bodies.push(newBody);
        }
        return true;
        this.render();
    }

    update(snakeFood) {
        this.timer = setInterval(() => {
            this.move();
            let flag=this.inspection();
            if(!flag){
                return ;
            }
            this.render();
        }, 500)
    }

    // touch(){
    //     if (this.head.x<0||this.head.y<0||this.head.x>this.x||this.head.y>this.y){
    //         alert("GAME OVER");
    //         clearInterval(this.timer);
    //     } else {
    //         this.render()
    //     }
    // }
    // eat(){
    //     if (this.head.x===this.snakeFood.x&&this.head.y===this.snakeFood.y){
    //         // alert("sdf");
    //         console.log(this.snakeFood);
    //         this.snakeFood.remove();
    //         this.snakeFood.render();
    //         // let lastBody=this.bodies[this.bodies.length-1];
    //         // let newBody= {x:lastBody.x, y:lastBody.y, type:lastBody.type};
    //         // let penultBody=this.bodies[this.bodies.length-2];
    //         // if (lastBody.x>penultBody.x){
    //         //     newBody.x++;
    //         // } else if(lastBody.x<penultBody.x){
    //         //     newBody.x--;
    //         // }else if(lastBody.y>penultBody.y){
    //         //     newBody.y++;
    //         // }else {
    //         //     newBody.y--;
    //         // }
    //         // this.bodies.push(newBody);
    //     }
    // }
}