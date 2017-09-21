var clock = document.getElementById('clock');
var ctx = clock.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 300;//比例

function draw(){
	ctx.save();//1、保存当前环境的状态
	ctx.translate(r, r);//改变画布圆点位置到（r，r）（默认左上角即（0， 0））
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;
	ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2*Math.PI, false);//false默认顺时针，可不写
	ctx.stroke();
	//小时数
	var arr = [3, 4, 5,6,7,8,9,10,11,12,1,2];
	ctx.font = 30 * rem+'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	arr.forEach(function(num, i){
		var rad = 2*Math.PI / 12 * i;//弧度
		var x = Math.cos(rad) * (r - 35 * rem);//坐标
		var y = Math.sin(rad) * (r - 35 * rem);
		ctx.fillText(num, x, y);
	})
	//秒针的60个点
	for( var i = 0;i < 60; i++){
		var rad = 2 * Math.PI / 60 * i;//弧度
		var x = Math.cos(rad) * (r - 15 * rem);//坐标
		var y = Math.sin(rad) * (r - 15 * rem);
		ctx.beginPath();
		if( i%5 === 0 ){
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 2 * rem, 0, 2*Math.PI);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 2 * rem, 0, 2*Math.PI);
		}
		ctx.fill();
	}
}
//时针
function drawHour(hour, minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r +80 * rem );
	ctx.stroke();
	ctx.restore();
}
//分针
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 4 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r + 50 * rem );
	ctx.stroke();
	ctx.restore();
}
//秒针
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.fillStyle = 'red';
	ctx.moveTo(-2 * rem, 20 * rem);
	ctx.lineTo(2 * rem, 20 * rem);
	ctx.lineTo(1 * rem, -r + 20 * rem);
	ctx.lineTo(-1 * rem, -r + 20 * rem);
	ctx.fill();
	ctx.restore();
}
//中间圆点
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI);
	ctx.fill();
}
function drawClock(){
	var now = new Date(),
		hour = now.getHours();
		minute = now.getMinutes();
		second = now.getSeconds();
	ctx.clearRect(0, 0, width, height);//清除整个画布，重画
	draw();	
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();//2、返回之前保存过的路径状态和属性（还原圆点）
}
setInterval(drawClock, 1000);
