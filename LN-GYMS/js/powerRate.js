var json = {};
option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		top: '10%',
		bottom: '0%',
		containLabel: true
	},
	legend: {
		data: ['总电费', '基本电费']
	},

	xAxis: {
		type: 'category',
		data: ['6月', '7月']

	},
	yAxis: {
		type: 'value'
	},
	series: [{
			name: '基本电费',
			type: 'bar',
			stack: '总量',
			 itemStyle: {                                      
				normal: {
					color: '#1296db'
				}                                  
			},
			label: {
				normal: {
					show: true,
					position: 'insideRight'
				}
			},
			data: [320, 302]
		},
		{
			name: '总电费',
			type: 'bar',
			stack: '总量',
			itemStyle: {                                      
				normal: {
					color: '#FEBD2C'
				}                                  
			},
			label: {
				normal: {
					show: true,
					position: 'insideRight'
				}
			},
			data: [120, 132]
		}
	]
};
document.addEventListener('DOMContentLoaded', getData);

function getData() {
	var main = document.getElementById('main');
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	myChart.setOption(option, true);
	myChart.showLoading();
	//查询每月监测点电费
	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Amounts/electricfeeController/listElectricfee.do",
		data: {
			"dtionid": parseInt(localStorage.stationID)
		},
		dataType: "json",
		success: function(res) {
			var data = res.data;
			var items = document.querySelectorAll('#need .mui-slider-item');
			for(var i in data) {
				items[i].querySelector('.cardHeader').innerText = data[i].edate[5] + "月（万元）";
				items[i].querySelector('.ibt').innerText = data[i].elvalue1;
				items[i].querySelectorAll('.ibt')[1].innerText = data[i].elvalue2;
				items[i].querySelectorAll('.ibt')[2].innerText = data[i].elforce;
			}
			json.basic = [data[2].elvalue2, data[1].elvalue2];
			json.sum = [data[2].elvalue1, data[1].elvalue1];
			myChart.hideLoading();
			myChart.setOption({                              
				series:  [{                           
					name:   '基本电费',
					data:  json.basic                              
				}, {                           
					name:   '总电费',
					data:  json.sum                              
				}]                          
			});  
		},
		error: function(xhr) {
			mui.toast("错误提示： " + xhr.status + " " + xhr.statusText);
			console.log(xhr)
		}
	});
	//查询每年监测点电费
	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Amounts/electricfeeController/getsumElfee.do",
		data: {
			"dtionid": parseInt(localStorage.stationID)
		},
		dataType: "json",
		success: function(res) {
			var data = res.data[0];
			if(res.code == '0') {
				mui.toast(res.msg);
				return;
			}
			document.querySelectorAll('#save .ibt')[0].innerText = data.savesum;
			document.querySelectorAll('#save .ibt')[1].innerText = data.sumco2;
			document.querySelectorAll('#sumel .ibt')[0].innerText = data.sumel;
			document.querySelectorAll('#sumel .ibt')[1].innerText = data.than;
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