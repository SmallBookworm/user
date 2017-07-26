//$.getJSON('https://free-api.heweather.com/v5/now?city=长沙&key=973947faf2ad4dbca52cd973ed2a1d91', function(data) {
//	console.log(data)
//});
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
	backgroundColor: 'rgba(255,255,255,0)',
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
		}
	},
	series: [{
			name: '今日降雨量',
			type: 'gauge',
			center: [150, '50%'], // 默认全局居中
			z: 3,
			min: 0,
			max: 100,
			splitNumber: 10,
			startAngle: 135,
			endAngle: -135,
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					width: 10
				}
			},
			axisTick: { // 坐标轴小标记
				length: 15, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
			},
			splitLine: { // 分隔线
				length: 20, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					color: 'auto'
				}
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
				value: 40,
				name: 'mm'
			}]
		},
		{
			name: '当前发电量',
			type: 'gauge',
			min: 0,
			max: 8000,
			splitNumber: 8,
			startAngle: 135,
			endAngle: -135,
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					width: 8
				}
			},
			axisTick: { // 坐标轴小标记
				length: 12, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
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
				value: 6458,
				name: 'kW'
			}]
		},
		{
			name: '周预测发电量',
			type: 'gauge',
			center: [document.getElementById('main').offsetWidth-150, '50%'], // 默认全局居中
			min: 0,
			max: 8000,
			splitNumber: 8,
			startAngle: 135,
			endAngle: -135,
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					width: 8
				}
			},
			axisTick: { // 坐标轴小标记
				length: 12, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
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
				value: 2583,
				name: 'kW·h'
			}]
		}
	]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);