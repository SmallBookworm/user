var json = [{
	time: '20:54',
	//运行时间
	runtime: '12',
	//总有功电量
	activee: '32',
	//总无功电量
	reactivee: '23',
	//有功功率
	activep: '0',
	//无功功率
	reactivep: '89',
	//功率因数
	powerfactor: '23',
	//电压
	voltage: '21',
	//电流
	current: '43',
	//频率
	frequence: '12',
	//转速
	speed: '21',
	//导叶开度
	opening: '45',
	//流量
	flow: '12',
	//水头高度
	whheight: '12',
	//耗水量
	waterconsumption: '46'

}];

$('.datepicker').datepicker({
	language: 'zh-CN',
	format: "yyyy年mm月dd",
	minViewMode: 0,
	autoclose: true
}).on('changeDate', function(event) {
	console.log(event.date);
});
dateType(document.getElementById('datetype'));

function tLine() {
	$('th.fuckEdge')[0].style.border = '1px solid #dddddd';
}
$('#table').bootstrapTable({
	idField: 'time',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '设备信息报表'
	},
	onPostHeader: tLine,
	columns: [
		[{
			field: 'time',
			title: '时间',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'runtime',
			title: '运行时间',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'deviceposition',
			title: '设备位置',
			align: 'center',
			colspan: 2,
			rowspan: 1
		}, {
			field: 'electricityamount',
			title: '电量',
			align: 'center',
			colspan: 2,
			rowspan: 1
		}, {
			field: 'power',
			title: '功率',
			align: 'center',
			colspan: 2,
			rowspan: 1
		}, {
			field: 'powerfactor',
			title: '功率因数',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'voltage',
			title: '电压',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'current',
			title: '电流',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'frequence',
			title: '频率',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'speed',
			title: '转速',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'opening',
			title: '导叶开度',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'flow',
			title: '流量',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'whheight',
			title: '水头高度',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'waterconsumption',
			title: '耗水量',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}],
		[{
			field: 'station',
			title: '水电站',
			align: 'center',
			class: 'fuckEdge'
		}, {
			field: 'device',
			title: '设备',
			align: 'center',

		}, {
			field: 'activee',
			title: '总有功',
			align: 'center',
		}, {
			field: 'reactivee',
			title: '总无功',
			align: 'center',

		}, {
			field: 'activep',
			title: '有功',
			align: 'center'
		}, {
			field: 'reactivep',
			title: '无功',
			align: 'center',

		}]
	],
	data: json
});