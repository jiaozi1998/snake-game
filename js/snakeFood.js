class SnakeFood{
    constructor(obj){
        this.width=obj.width||50;
        this.height=obj.height||50;
        this.img=obj.img||"images/body.png";
        this.snakeMap=obj.snakeMap||{};
        let mapStyle=window.getComputedStyle(this.snakeMap.oMap);
        let mapWidth=parseInt(mapStyle.width);
        let mapHeight=parseInt(mapStyle.height);
        let wRatio=mapWidth/this.width;
        let hRatio=mapHeight/this.height;
        this.x=GetRandomNum(0,wRatio-1);
        this.y=GetRandomNum(0,hRatio-1);
    }
    render(){
        //创建食物div
        let oFood=document.createElement("div");
        //为div设置样式
        oFood.style.width=this.width+"px";
        oFood.style.height=this.height+"px";
        oFood.style.background=`url(${this.img})`;
        oFood.style.position="absolute";
        //设置随机位置
        oFood.style.left=this.x*this.width+"px";
        oFood.style.top=this.y*this.height+"px";
        // //将div添加到地图中
        this.snakeMap.oMap.appendChild(oFood);
        this.oFood=oFood;
    }
    remove(){
        this.oFood.parentNode.removeChild(this.oFood)
    }
}
function GetRandomNum(Min,Max)
{
    let Range = Max - Min;
    let Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}