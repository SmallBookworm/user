var json = [{
	time: '20:54',
	devicename: 'pwj',
	errorname: 'deletuser'
}];

function tline() {
	$('th.fuckEdge')[0].style.border = '1px solid #dddddd';
}
$('#table').bootstrapTable({
	idField: 'time',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '单次故障报表'
	},
	onPostHeader: tline,
	columns: [
		[{
			field: 'time',
			title: '时间',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'errorPosition',
			title: '故障位置',
			align: 'center',
			colspan: 2,
			rowspan: 1
		}, {
			field: 'errorname',
			title: '故障名称',
			align: 'center',
			colspan: 1,
			rowspan: 2
		}, {
			field: 'voltage',
			title: '电压',
			align: 'center',
			colspan: 3,
			rowspan: 1
		}, {
			field: 'current',
			title: '电流',
			align: 'center',
			colspan: 2,
			rowspan: 1
		}, {
			field: 'frequence',
			title: '频率',
			align: 'center',
			colspan: 2,
			rowspan: 1
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
			field: 'powerv',
			title: '功率侧',
			align: 'center',

		}, {
			field: 'operationv',
			title: '控制侧',
			align: 'center',

		}, {
			field: 'mv',
			title: '直流母线',
			align: 'center',

		}, {
			field: 'poweri',
			title: '功率侧',
			align: 'center',

		}, {
			field: 'operationi',
			title: '控制侧',
			align: 'center',

		}, {
			field: 'powerf',
			title: '功率侧',
			align: 'center',

		}, {
			field: 'operationf',
			title: '控制侧',
			align: 'center',

		}]
	],
	data: json
});