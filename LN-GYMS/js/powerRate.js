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
		data: ['力调电费', '基本电费']
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
			label: {
				normal: {
					show: true,
					position: 'insideRight'
				}
			},
			data: [320, 302]
		},
		{
			name: '力调电费',
			type: 'bar',
			stack: '总量',
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
document.addEventListener('DOMContentLoaded', initMain);
var main = document.getElementById('main');
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption(option, true);

function initMain() {
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
window.onresize = function() {
	initMain();
};