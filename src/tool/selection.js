export default class Selection{
  constructor(ctx,type,start,end,color){
    this.ctx = ctx;
    this.type = type;
    this.start = start;
    this.end = end;
    this.color = color;
  }
  draw(){
    let colorArr = [];
    for(let i=1; i<7; i+=2){
      colorArr.push(parseInt("0x"+this.color.slice(i,i+2)));
    }
    this.ctx.fillStyle = `rgba(${colorArr.join(",")},0.3)`;
    let width = this.end.x - this.start.x;
    let height = this.end.y - this.start.y;
    switch (this.type){
      case 'square':
        let length = width > height ? height : width;
        this.ctx.fillRect(this.start.x,this.start.y,length,length);
        break;
      case 'rectangle':
        this.ctx.fillRect(this.start.x,this.start.y,width,height);
        break;
      case 'circular':
        let center = {
          x: (this.end.x + this.start.x) / 2 ,
          y: (this.end.y + this.start.y) / 2
        };
        let a = Math.abs(this.end.x - this.start.x) / 2;
        let b = Math.abs(this.end.y - this.start.y) / 2;
        let ox = 0.5 * a,
          oy = 0.6 * b;
        this.ctx.save();
        this.ctx.translate(center.x, center.y);
        this.ctx.beginPath();
        //从椭圆纵轴下端开始逆时针方向绘制
        this.ctx.moveTo(0, b);
        this.ctx.bezierCurveTo(ox, b, a, oy, a, 0);
        this.ctx.bezierCurveTo(a, -oy, ox, -b, 0, -b);
        this.ctx.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
        this.ctx.bezierCurveTo(-a, oy, -ox, b, 0, b);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
        break;
    }
  }

}
