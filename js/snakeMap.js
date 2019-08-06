class SnakeMap{
    constructor(){
        //创建div
        let oDiv=document.createElement("div");
        //给div添加类名
        oDiv.className="map";
        //将div添加到body中
        document.body.appendChild(oDiv);
        this.oMap=oDiv;
    }
}