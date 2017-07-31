var json = [{
	date: '2017-7-20',
	time: '20:54',
	username: 'pwj',
	operation: 'deletuser'
}, {
	date: '2017-7-29',
	time: '20:54',
	username: 'pwj',
	operation: 'deletuser'
}, {
	date: '2017-7-12',
	time: '10:54',
	username: 'pwj',
	operation: 'deletuser'
}, {
	date: '2017-6-20',
	time: '22:54',
	username: 'pwj',
	operation: 'deletuser'
}, {
	date: '2017-5-20',
	time: '23:54',
	username: 'pwj',
	operation: 'deletuser'
}, {
	date: '2017-1-20',
	time: '23:54',
	username: 'pwj',
	operation: 'deletuser'
}, {
	date: '2017-11-20',
	time: '23:54',
	username: 'pwj',
	operation: 'deletuser'
}];


dateRange($('#table'),function(){
	return json;
})

$('#table').bootstrapTable({
	idField: 'date',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '操作记录'
	},
	columns: [{
		field: 'date',
		title: '日期',
		align: 'center',
		sortable: true
	}, {
		field: 'time',
		title: '时间',
		align: 'center',
	}, {
		field: 'username',
		title: '登录名',
		align: 'center',
	}, {
		field: 'operation',
		title: '操作',
		align: 'center',
	}],
	data: {}
});