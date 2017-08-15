var json = [];
(new dateRange($('#start'), $('#end'), function() {
	$.bootstrapLoading.start({
		borderStyle: 'none',
		loadingTips: '<div class="loader-inner square-spin"><div></div></div>'
	});

	$.ajax({
		type: "POST",
		url: "http://172.20.241.51:8080/Hydropower/logInfoController/getloguser.do",
		data: {
			session: '',
			ID: 1
		},
		dataType: "json",
		success: function(data) {
			json = data.data;
			$('#table').bootstrapTable('load', json);
			$.bootstrapLoading.end();
		},
		error: function(xhr) {
			alert("错误提示： " + xhr.status + " " + xhr.statusText);
			$.bootstrapLoading.end();
		}

	});

})).initRange();

$('#table').bootstrapTable({
	idField: 'date',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '操作记录'
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