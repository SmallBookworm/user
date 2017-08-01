
var main = document.getElementById('main');
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
//降雨量
var pcpnData = [22, 0, 12, 42, 12, 25, 35, 12, 32, 15];
// 指定图表的配置项和数据
var option = {
	backgroundColor: 'rgba(255,255,255,0)',
	title: [{
		text: '降雨量',
		left: '30%',
		top: '1%',
		textAlign: 'center'

	}, {
		text: '预测水位',
		left: '77.5%',
		top: '1%',
		textAlign: 'center'
	}, {
		text: '现在水位',
		left: '77.5%',
		top: '51%',
		textAlign: 'center'

	}],
	tooltip: {
		formatter: "{a} <br/>{c} {b}"
	},
	toolbox: {
		show: true,
		feature: {
			restore: {
				show: true
			},
			saveAsImage: {
				show: true
			}
		},
		right: 40
	},
	legend: {
		data: [{
			name: '三天',
			icon: 'circle'
		}, {
			name: '七天',
			icon: 'circle'
		}],
		selectedMode: 'single',
		top: '1%',
		left: '2%'
	},
	xAxis: {
		data: ['1', '2', '3']
	},
	yAxis: {
		type: 'value',
		name: '降雨量/mm',
	},
	grid: {
		left: '5%',
		top: '10%',
		right: '45%',
	},
	series: [{
			type: 'bar',
			name: '三天',
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: 'rgba(14,125,218,0.8)'
						}, {
							offset: 1,
							color: 'rgba(14,125,218,0.3)'
						}],
						globalCoord: false
					}
				}
			},
			data: pcpnData.slice(0, 3)
		},
		{
			type: 'bar',
			name: '七天',
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: 'rgba(14,125,218,0.8)'
						}, {
							offset: 1,
							color: 'rgba(14,125,218,0.3)'
						}],
						globalCoord: false
					}
				}
			},
			data: pcpnData.slice(0, 7)
		},
		{
			name: '预测水位',
			type: 'gauge',
			center: ['77.5%', '25%'], // 默认全局居中
			min: 0,
			max: 8000,
			splitNumber: 8,
			radius: '40%',
			startAngle: 135,
			endAngle: -135,
			axisLine: {
				show: true,
				lineStyle: {
					width: 15,
					shadowBlur: 0
				}
			},
			axisTick: { // 坐标轴小标记
				show: false,
			},
			splitLine: { // 分隔线
				length: 20, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					color: 'auto'
				}
			},
			pointer: {
				width: 5
			},
			title: {
				offsetCenter: [0, '-30%'], // x, y，单位px
			},
			detail: {
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder'
				}
			},
			data: [{
				value: 456,
				name: 'kW·h'
			}]
		},
		{
			name: '现在水位',
			type: 'gauge',
			center: ['77.5%', '75%'], // 默认全局居中
			min: 0,
			max: 8000,
			splitNumber: 8,
			radius: '40%',
			startAngle: 135,
			endAngle: -135,
			axisLine: {
				show: true,
				lineStyle: {
					width: 15,
					shadowBlur: 0
				}
			},
			axisTick: { // 坐标轴小标记
				show: false,
			},
			splitLine: { // 分隔线
				length: 20, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					color: 'auto'
				}
			},
			pointer: {
				width: 5
			},
			title: {
				offsetCenter: [0, '-30%'], // x, y，单位px
			},
			detail: {
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder'
				}
			},
			data: [{
				value: 2800,
				name: 'kW·h'
			}]
		}
	]
};

// 使用刚指定的配置项和数据显示图表。
function initMain() {
	document.getElementById('main').style.width = window.innerWidth + 'px';
	document.getElementById('main').style.height = window.innerHeight + 'px';
	myChart.resize();
}
document.addEventListener('DOMContentLoaded', initMain);
window.onresize = function() {
	initMain();
};
//url='http://tj.nineton.cn/Heart/index/all?city=CHHN000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b';
//$.ajax({
//	url: url,
//	type: 'get',
//	headers:{'Access-Control-Allow-Origin':'*'},
//	dataType: 'json',
//	error: function(result) {
//		console.log(result);
//	},
//	success: function(result) {
//		if(result != null) {console.log(result);
//			myChart.setOption(option, true);
//		}
//	}
//});

myChart.setOption(option, true);
myChart.on('legendselectchanged', function(param) {
	if(param.name == '七天')
		myChart.setOption({
			xAxis: {
				data: ['1', '2', '3', '4', '5', '6', '7']
			},
			series: [{
				name: '预测水位',
				data: [{
					value: 2800,
					name: 'kW·h'
				}]
			}, {
				name: '现在水位',
				data: [{
					value: 1800,
					name: 'kW·h'
				}]
			}]
		});
	else
		myChart.setOption({
			xAxis: {
				data: ['1', '2', '3']
			},
			series: [{
				name: '预测水位',
				data: [{
					value: 234,
					name: 'kW·h'
				}]
			}, {
				name: '现在水位',
				data: [{
					value: 641,
					name: 'kW·h'
				}]
			}]
		});
});