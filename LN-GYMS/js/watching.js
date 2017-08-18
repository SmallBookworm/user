var needData = [];
option = {
	tooltip: {
		trigger: 'axis'
	},
	grid: {
		top: '3%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'time',
		boundaryGap: false,
		data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		name: '今日需量',
		itemStyle: {                                      
			normal: {
				color: '#1296db'
			}                                  
		},
		//symbol: 'none', //这句就是去掉点的  
		smooth: true,
		type: 'line',
		data: needData
	}]
};
document.addEventListener('DOMContentLoaded', getData);

function getData() {
	var main = document.getElementById('main');
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	myChart.setOption(option, true);
	myChart.showLoading();
	//需量
	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Amounts/demandController/MaxDemand.do",
		data: {
			"dtionid": parseInt(localStorage.stationID)
		},
		dataType: "json",
		success: function(res) {
			var data = res.data;
			var items = document.querySelectorAll('#need .mui-slider-item');
			for(var i in data) {
				items[i].querySelector('.cardHeader').innerText = data[i].demdate[5] + "月（万元）";
				items[i].querySelector('.ibt').innerText = data[i].Demvalue;
				items[i].querySelectorAll('.ibt')[1].innerText = data[i].Demandplan;
			}
		},
		error: function(xhr) {
			mui.toast("错误提示： " + xhr.status + " " + xhr.statusText);
			console.log(xhr)
		}
	});
	//功率因数
	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Amounts/powerfactorController/MaxPower.do",
		data: {
			"dtionid": parseInt(localStorage.stationID)
		},
		dataType: "json",
		success: function(res) {
			var data = res.data;
			var items = document.querySelectorAll('#need .mui-slider-item');
			for(var i in data) {
				items[i].querySelectorAll('.ibt')[2].innerText = data[i].Povalue;
				items[i].querySelectorAll('.ibt')[3].innerText = data[i].Pstandard;
			}
		},
		error: function(xhr) {
			mui.toast("错误提示： " + xhr.status + " " + xhr.statusText);
			console.log(xhr)
		}
	});
	//负荷
	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Amounts/tloadController/listtload.do",
		data: {
			"lotionid": parseInt(localStorage.stationID)
		},
		dataType: "json",
		success: function(res) {
			var data = res.data;
			var spans = document.querySelectorAll('#load .ibt');
			for(var i in data) {
				spans[i].innerText = data[i].Lovalue;
			}
		},
		error: function(xhr) {
			mui.toast("错误提示： " + xhr.status + " " + xhr.statusText);
			console.log(xhr)
		}
	});
	//今日需量
	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Amounts/demandController/listDemand.do",
		data: {
			"dtionid": parseInt(localStorage.stationID)
		},
		dataType: "json",
		success: function(res) {
			var data = res.data;
			for(var i in data) {
				needData.push({
					name: data[i].dttime.split(' ')[1],
					value: [data[i].dttime.replace(/-/g, '/'), parseInt(data[i].Demvalue)]
				});
			}
			myChart.hideLoading();
			myChart.setOption({                              
				series:  [{                           
					name:   '今日需量',
					data:  needData                              
				}]                          
			});  
		},
		error: function(xhr) {
			mui.toast("错误提示： " + xhr.status + " " + xhr.statusText);
			console.log(xhr)
		}
	});
	//resize
	initMain(myChart, main);
	window.onresize = function() {
		initMain(myChart, main);
	};
}

function initMain(myChart, main) {
	main.style.width = document.getElementsByClassName('mui-card-content-inner')[0].clientWidth - 30 + 'px';
	var h = 0;
	var cards = document.getElementsByClassName('mui-card');
	for(var i = 0; i < cards.length - 1; i++) {
		h += cards[i].clientHeight;
	}
	h += cards.length * 5 + 15 + document.getElementById('mainHeader').clientHeight;
	main.style.height = window.innerHeight - h + 'px';
	myChart.resize();
}