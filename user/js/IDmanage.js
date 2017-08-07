var json = [{
		name: '张三',
		sex: '男',
		club: '3',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '123',
		password: 'as123',
		company: '1',
		state: '启用'
	}, {
		name: '李四',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: 'sdsd32',
		password: 'as123',
		company: '1',
		state: '不启用'
	},
	{
		name: '王五',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '46768',
		password: 'as123',
		company: '1',
		state: '启用'
	},
	{
		name: '王6',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '756',
		password: 'as123',
		company: '1',
		state: '启用'
	},
	{
		name: '王7',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '074',
		password: 'as123',
		company: '1',
		state: '启用'
	},
	{
		name: '王8',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '654678',
		password: 'as123',
		company: '1',
		state: '不启用'
	},
	{
		name: '王9',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '5435',
		password: 'as123',
		company: '1',
		state: '启用'
	},
	{
		name: '王10',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '14234',
		password: 'as123',
		company: '1',
		state: '启用'
	},
	{
		name: '王11',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '24234',
		password: 'as123',
		company: '1',
		state: '不启用'
	},
	{
		name: '王12',
		sex: '男',
		club: '2',
		cellphone: '19864509834',
		telephone: '0731-1234567',
		IDcard: '430145786878086235',
		username: '1234',
		password: 'as123',
		company: '1',
		state: '不启用'
	}
];

var zhCN = {
	'username': '登录名',
	'name': '姓名',
	'club': '部门',
	'state': '状态',
	'operate': '操作',
	sex: '性别',
	cellphone: '手机',
	telephone: '电话',
	IDcard: '身份证号',
	password: '密码',
	company: '所属集团',
	state: '状态'
};

function createModal(data) {
	var form = $('#form-change')[0];
	for(var i in data) {
		form[i].value = data[i];
	}
}

function detailFormatter(index, row) {
	var html = [];
	for(var key in row) {
		html.push('<b>' + zhCN[key] + ':</b>' + row[key] + '&nbsp;&nbsp;&nbsp;');
	}
	return html.join('');
}

function operateFormatter(value, row, index) {
	return [
		'<a class="change option"  title="Change" data-toggle="modal" data-target="#myModal">',
		'<span class="glyphicon glyphicon-pencil"></span>',
		'</a>  ',
		'<a class="remove option"  title="Remove">',
		'<span class="glyphicon glyphicon-remove"></span>',
		'</a>'
	].join('');
}

var operateEvents = {
	'click .change': function(e, value, row, index) {
		createModal(row);
	},
	'click .remove': function(e, value, row, index) {
		$('#table').bootstrapTable('remove', {
			field: 'username',
			values: [row.username]
		});
	}
};
$('#table').bootstrapTable({
	idField: 'username',
	pageSize: 5,
	pageList: [10, 25, 50],
	exportDataType: 'all',
	exportOptions: {
		fileName: '账户',
		ignoreColumn: [0, "operate"]
	},
	detailFormatter: detailFormatter,
	columns: [{
		field: 'username',
		title: '登录名',
		align: 'center',
	}, {
		field: 'name',
		title: '姓名',
		align: 'center',
	}, {
		field: 'club',
		title: '部门',
		align: 'center',
		sortable: true
	}, {
		field: 'state',
		title: '状态',
		align: 'center',
		sortable: true,
		visible: false
	}, {
		field: 'operate',
		title: '操作',
		align: 'center',
		events: operateEvents,
		formatter: operateFormatter
	}],
	data: json
});