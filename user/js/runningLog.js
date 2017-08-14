var json = [];
var loadFlag = false;
(new dateRange($('#start'), $('#end'), function() {
	if(!loadFlag) {
		loadFlag = true;
		document.getElementById('end').disabled = true;
		document.getElementById('start').disabled = true;
		$.ajax({
			type: "POST",
			url: "http://172.20.241.51:8080/Hydropower/logInfoController/getloginfo.do",
			data: {
				session: '',
				ID: 1
			},
			dataType: "json",
			success: function(data) {
				json = data.data;
				$('#table').bootstrapTable('load', json);
				loadFlag = false;
				document.getElementById('end').disabled = false;
				document.getElementById('start').disabled = false;
			},
			error: function(xhr) {
				alert("错误提示： " + xhr.status + " " + xhr.statusText);
				loadFlag = false;
				document.getElementById('end').disabled = false;
				document.getElementById('start').disabled = false;
			}

		});
	}
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
		field: 'ldate',
		title: '时间',
		align: 'center',
		sortable: true
	}, {
		field: 'lname',
		title: '登录名',
		align: 'center',
	}, {
		field: 'ltype',
		title: '操作',
		align: 'center',
	}, {
		field: 'lstat',
		title: '级别',
		align: 'center',
	}, {
		field: 'logname',
		title: '集团',
		align: 'center',
	}],
	data: {}
});