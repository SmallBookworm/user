var json = [{
	time: '20:54',
	//有功电量
	active: '12',
	//无功电量
	reactive: '23',
	//平均功率因数
	apowerfactor: '67',
	//流量
	flow: '89',
	//水头高度
	whheight: '90',
	//耗水量
	waterconsumption: '89',
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
		fileName: '发电量报表'
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
			field: 'electricityamount',
			title: '电量',
			align: 'center',
			colspan: 2,
			rowspan: 1
		}, {
			field: 'apowerfactor',
			title: '平均功率因数',
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
			field: 'active',
			title: '有功',
			align: 'center',
			class: 'fuckEdge'
		}, {
			field: 'reactive',
			title: '无功',
			align: 'center',

		}]
	],
	data: json
});