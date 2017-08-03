var wr = {
	大轴摆度: [20170725, 20],
	水轮机振动: [20170725, 20],
	水轮机转速: [20170725, 20],
	导叶开度: [20170725, 20],
	轮叶开度: [20170725, 20],
	顶盖水位: [20170725, 20],
	'水导（水轮机导轴承）瓦温': [20170725, 20],
	锁定位置: [20170725, 20],
	涡壳流量: [20170725, 20],
	顶盖水压: [20170725, 20],
	调速器油压: [20170725, 20],
	主阀油压: [20170725, 20],
	'主配（主配压阀）行程': [20170725, 20],
	导叶后压力: [20170725, 20]
};
var dynamo = {
	定子线圈与铁芯温度: [20170725, 20],
	冷却水压: [20170725, 20],
	发电机有功功率: [20170725, 20],
	发电机无功功率: [20170725, 20],
	发电机振动: [20170725, 20],
	机组转速: [20170725, 20],
	母线电压: [20170725, 20],
	控制侧电流: [20170725, 20],
	转子温度: [20170725, 20],
	电网电压: [20170725, 20],
	功率侧电流: [20170725, 20],
	'风闸（水轮发电机制动器）位置': [20170725, 20],
	机组频率: [20170725, 20],
	电网频率: [20170725, 20],
	控制侧电压: [20170725, 20],
	功率侧电压: [20170725, 20],
	机组功率: [20170725, 20]
};
var other = {
	进水口闸门状态: [20170725, 20],
	泄洪闸门状态: [20170725, 20],
	工作水头: [20170725, 20],
	上游水位: [20170725, 20],
	下游水位: [20170725, 20],
	厂用母线电压: [20170725, 20],
	主变低压侧电压: [20170725, 20],
	'控制母线（控制、检测、信号等）电压': [20170725, 20],
	'合闸母线、合闸线圈电压': [20170725, 20],
	线路负荷: [20170725, 20],
	线路电流: [20170725, 20]
};

function init() {
	var canvas = document.getElementById('main');
	var ctx = canvas.getContext('2d');

	var infoCanv = document.createElement('canvas');
	var infoCtx = infoCanv.getContext('2d');

	var objCanv = document.createElement('canvas');
	var objCtx = objCanv.getContext('2d');

	resizeCanvas();

	window.addEventListener("resize", resizeCanvas, false);

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		infoCanv.width = canvas.width;
		infoCanv.height = canvas.height;
		objCanv.width = canvas.width;
		objCanv.height = canvas.height;
		reDraw()
	}

	function reDraw() {
		ctx.fillStyle = 'rgba(255,255,255,1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		objCtx.fillStyle = 'rgba(255,255,255,0)'
		objCtx.fillRect(0, 0, canvas.width, canvas.height);
		infoCtx.fillStyle = 'rgba(255,255,255,0)'
		infoCtx.fillRect(0, 0, canvas.width, canvas.height);

		var y = canvas.height / 2;
		var x = canvas.width / 3;
		var waterTurbine = new machine(x, y, 0, '水轮机', wr, y, y);
		machine.setMachis([waterTurbine]);
		machine.initInfo(canvas, ctx, infoCtx, objCanv, infoCanv);

		machine.showMachine(objCtx, waterTurbine);
		ctx.fillStyle = 'rgba(255,255,255,1)';
		ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
		ctx.drawImage(objCanv, 0, 0);
	}
}

function machine(x, y, type, name, info, width, height) {
	this.x = x;
	this.y = y;
	//0圆，1矩形
	this.type = type;
	this.name = name;
	this.info = info;
	this.width = width;
	this.height = height;
}
machine.showMachine = function(objectCtx, machi) {
	if(machi.type == 0) {
		objectCtx.beginPath();
		objectCtx.strokeStyle = '#000000';
		objectCtx.arc(machi.x, machi.y, machi.width / 2, 0, 2 * Math.PI);
		objectCtx.stroke();
		objectCtx.beginPath();
		objectCtx.strokeStyle = '#000000';
		objectCtx.arc(machi.x, machi.y, 2, 0, 2 * Math.PI);
		objectCtx.stroke();
	} else if(machi.type == 1) {
		objectCtx.beginPath();
		objectCtx.strokeStyle = '#000000';
		objectCtx.strokeRect(machi.x, machi.y, machi.width, machi.height);
	}
	objectCtx.fillStyle = '#ff0000';
	objectCtx.font = '40px 宋体';
	objectCtx.textAlign = "center";
	objectCtx.fillText(machi.name, machi.x, machi.y - machi.height / 2 - 8, machi.width / 2);
}

function  getLocation(x,  y, canvas)  {              
	var  bbox  =  canvas.getBoundingClientRect();              
	return  {                  
		x:  (x  -  bbox.left)  *  (canvas.width  /  bbox.width),
		y:  (y  -  bbox.top)  *  (canvas.height  /  bbox.height)                    
	};          
}  
function drawTable(mainCtx, ctx, infoCanv, info, x, y, width) {

	var th = ['参数名', '更新时间', '参数值'];
	var hAmount = (Object.keys(info).length + 1);
	var ow = width / th.length;
	var oh = machine._infoMachi.oh;
	var height = oh * hAmount;
	ctx.strokeStyle = '#000000';
	ctx.font = machine._infoMachi.font;
	for(var s = 0; s < th.length; s++) {
		ctx.beginPath();
		ctx.moveTo(x + ow * s, y);
		ctx.lineTo(x + ow * s, y + height);
		ctx.stroke();
	}
	for(var h = 0; h <= hAmount; h++) {
		ctx.beginPath();
		ctx.moveTo(x, y + oh * h);
		ctx.lineTo(x + width, y + oh * h);
		ctx.stroke();
	}
	mainCtx.drawImage(infoCanv, x, y, width, height, x, y, width, height);
}
machine._init = false;
machine._infoMachi = {
	machis: [],
	oh: 25,
	font: '20px 宋体'
};
machine.setMachis = function(machis) {
	this._infoMachi.machis = machis;
}
machine.initInfo = function(mainCanvas, ctx, infoCtx, objCanv, infoCanv) {
	if(!this._init) {
		mainCanvas.addEventListener('mousemove', function(e) {
			var location =  getLocation(e.clientX,  e.clientY, mainCanvas);  
			for(var i in machine._infoMachi.machis) {
				var machi = machine._infoMachi.machis[i];
				if(machi.isSelected(location.x, location.y)) {
					ctx.fillStyle = 'rgba(255,255,255,1)';
					ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
					ctx.drawImage(objCanv, 0, 0);
					drawTable(ctx, infoCtx, infoCanv, machi.info, location.x, location.y, mainCanvas.width / 5)

				}
			}
		});
	}
	this._init = true;

}

machine.prototype.isSelected = function(x, y) {
	if(this.type == 0) {
		if((Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2)) < Math.pow(this.width / 2, 2))
			return true;
		else
			return false;
	} else if(this.type == 1) {
		if(Math.abs(x - this.x) < this.width / 2 && Math.abs(y - this.y) < this.height / 2)
			return true;
		else
			return false;
	}
}