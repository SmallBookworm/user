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
		type: 'category',
		boundaryGap: false,
		data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		name: '今日需量',
		type: 'line',
		data: [320, 302, 21, 123, 412, 321, 125, 123, 412, 321, 125, 123, 412]
	}]
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