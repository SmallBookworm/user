var json = [{
	time: '20:54',
	devicename: 'pwj',
	errorname: 'deletuser'
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

function tLine(){
	$('th.fuckEdge')[0].style.border='1px solid #dddddd';
}
$('#table').bootstrapTable({
	idField: 'time',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '效果评估表'
	},
	onPostHeader:tLine,
	columns: [
		[{
			field: 'time',
			title: '时间',
			align: 'center',
			colspan: 1,
			rowspan: 2
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
			field: 'opening',
			title: '导叶开度',
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
			field: 'activep',
			title: '有功',
			align: 'center',
			class:'fuckEdge'
		}, {
			field: 'reactivep',
			title: '无功',
			align: 'center',

		}]
	],
	data: json
});