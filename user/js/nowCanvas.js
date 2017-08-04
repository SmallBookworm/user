var wrMain = {
	水轮机转速: ['25'],
	导叶开度: ['25'],
	轮叶开度: ['25'],
	锁定位置: ['25'],
	涡壳流量: ['25'],
	主配拒动位置: ['25']
};
var wr = {
	大轴摆度: ['25'],
	水轮机振动: ['25'],

	顶盖水位: ['25'],
	'水导（水轮机导轴承）瓦温': ['25'],

	顶盖水压: ['25'],
	调速器油压: ['25'],
	主阀油压: ['25'],
	'主配（主配压阀）行程': ['25'],
	导叶后压力: ['25']
};

var dynamoMain = {
	电网电压: ['25'],
	母线电压: ['25'],

	功率侧电压: ['25'],

	功率侧电流: ['25'],
	机组频率: ['25'],
	电网频率: ['25'],
	有功功率: ['25'],
	无功功率: ['25'],
	机组转速: ['25'],
	功率因数: ['25']
};
var dynamoInfo = {
	定子线圈与铁芯温度: ['25'],
	冷却水压: ['25'],
	发电机振动: ['25'],
	转子温度: ['25'],
	'风闸（水轮发电机制动器）位置': ['25'],
	机组功率: ['25']
};

var cabinetMain = {
	厂用母线电压: ['25'],
	线路电流: ['25'],
	工作水头: ['25'],
	效率: ['25'],
	控制侧电压: ['25'],
	控制侧电流: ['25'],
	总流量: ['25']
};

var otherInfo = {
	进水口闸门状态: ['25'],
	泄洪闸门状态: ['25'],
	上游水位: ['25'],
	下游水位: ['25'],
	主变低压侧电压: ['25'],
	'控制母线（控制、检测、信号等）电压': ['25'],
	'合闸母线、合闸线圈电压': ['25'],
	线路负荷: ['25']

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
		document.getElementById('NO').style.height = '20px';
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight - 20;
		infoCanv.width = canvas.width;
		infoCanv.height = canvas.height;
		objCanv.width = canvas.width;
		objCanv.height = canvas.height;
		reDraw()
	}

	function reDraw() {
		ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
		objCtx.clearRect(0, 0, canvas.width, canvas.height);
		infoCtx.clearRect(0, 0, canvas.width, canvas.height);

		var y = canvas.height / 2;
		var x = canvas.width / 3;
		var waterTurbine = new machine(x * 0.6, y * 0.4, 0, '水轮机', wr, y / 2, y / 2);
		var dynamo = new machine(x * 1.5, y * 0.4, 0, '发电机', dynamoInfo, y / 2, y / 2);
		var cabinet = new machine(x * 2.25, y * 0.4 - x / 4.4, 1, '控制柜', undefined, x / 2, x / 2.2);

		//		machine.setMachis([waterTurbine, dynamo]);
		//		machine.initInfo(canvas, ctx, infoCtx, objCanv, infoCanv);

		objCtx.fillStyle = '#d4e3e5';
		objCtx.fillRect(0, 0, infoCanv.width, infoCanv.height);
		drawTable(ctx, objCtx, objCanv, wrMain, 3, y * 0.6, x * 0.6 - y / 4);
		drawTable(ctx, objCtx, objCanv, dynamoMain, x * 0.9, y * 0.6, x * 0.6 - y / 4);
		drawTable(ctx, objCtx, objCanv, cabinetMain, x * 2.25 - (x * 0.6 - y / 4) - 5, y * 0.6, x * 0.6 - y / 4);
		machine.showMachine(objCtx, waterTurbine);
		machine.showMachine(objCtx, dynamo);
		machine.showMachine(objCtx, cabinet);
		machine.lineMachine(objCtx, waterTurbine, dynamo);
		machine.lineMachine(objCtx, cabinet, dynamo);
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

	objectCtx.font = '40px 宋体';
	objectCtx.textAlign = "center";
	if(machi.type == 0) {

		objectCtx.beginPath();
		objectCtx.moveTo(machi.x, machi.y + machi.width / 2);
		objectCtx.quadraticCurveTo(machi.x - machi.width * 0.7, machi.y + machi.width * 0.4, machi.x - machi.width, machi.y - machi.width / 2);
		objectCtx.lineTo(machi.x - machi.width * 0.7, machi.y - machi.width / 2)
		objectCtx.quadraticCurveTo(machi.x - machi.width / 2, machi.y, machi.x, machi.y + machi.width / 2);
		objectCtx.fillStyle = '#ffffff';
		objectCtx.strokeStyle = '#000000';
		objectCtx.fill();
		objectCtx.stroke();

		objectCtx.beginPath();
		objectCtx.arc(machi.x, machi.y, machi.width / 2, 0, 2 * Math.PI);
		objectCtx.fillStyle = '#ffffff';
		objectCtx.strokeStyle = '#000000';
		objectCtx.fill();
		objectCtx.stroke();

		objectCtx.beginPath();
		objectCtx.moveTo(machi.x, machi.y);
		objectCtx.quadraticCurveTo(machi.x - machi.width * 0.1, machi.y - machi.width / 4, machi.x, machi.y - machi.width / 2);
		objectCtx.closePath();
		objectCtx.moveTo(machi.x, machi.y);
		objectCtx.quadraticCurveTo(machi.x - machi.width / 4, machi.y + machi.width * 0.1, machi.x - machi.width / 2, machi.y);
		objectCtx.closePath();
		objectCtx.strokeStyle = '#000000';
		objectCtx.stroke();

		objectCtx.fillStyle = '#ff0000';
		objectCtx.fillText(machi.name, machi.x, machi.y - machi.height / 2 - 8, machi.width / 2);
	} else if(machi.type == 1) {
		objectCtx.beginPath();
		objectCtx.strokeStyle = '#000000';
		objectCtx.strokeRect(machi.x, machi.y, machi.width, machi.height);

		objectCtx.fillStyle = '#ff0000';
		objectCtx.fillText(machi.name, machi.x + machi.width / 2, machi.y - 8, machi.width / 2);
	}

}

machine.lineMachine = function(ctx, m1, m2) {
	var xl = m2.x - m1.x;
	var yl = m2.y - m1.y;
	var l = Math.sqrt(xl * xl + yl * yl);
	ctx.strokeStyle = '#000000';
	ctx.beginPath();
	if(m1.type == 0)
		ctx.moveTo(m1.x + m1.width / 2 * xl / l, m1.y + m1.width / 2 * yl / l);
	else if(m1.type == 1)
		ctx.moveTo(m1.x, m1.y);
	if(m2.type == 0)
		ctx.lineTo(m2.x - m2.width / 2 * xl / l, m2.y - m2.width / 2 * yl / l);
	else if(m2.type == 1)
		ctx.lineTo(m2.x, m2.y);

	ctx.stroke();
}

function  getLocation(x,  y, canvas)  {              
	var  bbox  =  canvas.getBoundingClientRect();              
	return  {                  
		x:  (x  -  bbox.left)  *  (canvas.width  /  bbox.width),
		y:  (y  -  bbox.top)  *  (canvas.height  /  bbox.height)                    
	};          
}  
function drawTable(mainCtx, ctx, infoCanv, info, x, y, width) {

	var th = ['参数名', '参数值'];
	var keys = Object.keys(info);
	var hAmount = (keys.length);
	var ow = width / th.length;
	var oh = machine._infoMachi.oh;
	var height = oh * hAmount;
	ctx.strokeStyle = '#000000';
	ctx.fillStyle = '#000000';
	ctx.font = machine._infoMachi.font;
	ctx.textAlign = "center";

	for(var s = 0; s <= th.length; s++) {
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

	for(h = 1; h <= hAmount; h++) {
		var hy = y + oh * h - 3;
		for(s = 0; s < th.length; s++) {
			if(!s)
				ctx.fillText(keys[h - 1], x + ow * (s + 0.5), hy, ow);
			else
				ctx.fillText(info[keys[h - 1]][s - 1], x + ow * (s + 0.5), hy, ow);
		}
	}
	if((x + width + 1) < infoCanv.Width && (y + height + 1) < infoCanv.height)
		mainCtx.drawImage(infoCanv, x - 1, y - 1, width + 2, height + 2, x, y, width + 2, height + 2);
	else
		mainCtx.drawImage(infoCanv, x, y, infoCanv.Width - x, infoCanv.height - y, x, y, infoCanv.Width - x, infoCanv.height - y);
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
		var tableShow = -1;
		mainCanvas.addEventListener('mousemove', function(e) {
			var location =  getLocation(e.clientX,  e.clientY, mainCanvas);  
			for(var i in machine._infoMachi.machis) {
				var machi = machine._infoMachi.machis[i];
				if(machi.isSelected(location.x, location.y)) {
					ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
					ctx.drawImage(objCanv, 0, 0);
					drawTable(ctx, infoCtx, infoCanv, machi.info, location.x, location.y, mainCanvas.width / 5 + 10);
					if(tableShow == -1)
						tableShow = i;
				} else if(tableShow == i) {
					ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
					ctx.drawImage(objCanv, 0, 0);
					tableShow = -1;
				}
			}

		});

	}
	this._init = true;

}

machine.prototype.isSelected = function(x, y) {
	if(this.type == 0) {
		if((Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2)) <= Math.pow(this.width / 2, 2))
			return true;
		else
			return false;
	} else if(this.type == 1) {
		if(Math.abs(x - this.x) < this.width / 2 && Math.abs(y - this.y) <= this.height / 2)
			return true;
		else
			return false;
	}
}