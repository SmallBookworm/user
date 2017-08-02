var json = [{
	date: '2017-7-20',
	starttime: '10:54',
	username: 'pwj',
	endtime: '23:54'
},{
	date: '2017-7-29',
	starttime: '7:54',
	username: 'pwj',
	endtime: '22:54'
},{
	date: '2017-7-12',
	starttime: '10:54',
	username: 'pwj',
	endtime: '20:54'
},{
	date: '2017-6-20',
	starttime: '8:54',
	username: 'pwj',
	endtime: '12:54'
},{
	date: '2017-5-20',
	starttime: '6:54',
	username: 'pwj',
	endtime: '10:54'
},{
	date: '2017-1-20',
	starttime: '7:54',
	username: 'pwj',
	endtime: '10:54'
},{
	date: '2017-11-20',
	starttime: '4:32',
	username: 'pwj',
	endtime: '10:54'
}];

(new dateRange($('#start'), $('#end'), function() {
	$('#table').bootstrapTable('load', json)
})).initRange();

$('#table').bootstrapTable({
	idField: 'date',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '运行日志'
	},
	columns: [{
		field: 'date',
		title: '日期',
		align: 'center',
		sortable: true
	},{
		field: 'username',
		title: '登录名',
		align: 'center',
	},{
		field: 'starttime',
		title: '开机时间',
		align: 'center',
	}, {
		field: 'endtime',
		title: '关机时间',
		align: 'center',
	}],
	data: {}
});