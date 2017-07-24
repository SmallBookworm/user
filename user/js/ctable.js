var json = [{
		姓名: '张三',
		部门: '管理',
		手机: '19864509834',
		电话: '0731-1234567',
		状态: '在线'
	}, {
		姓名: '李四',
		部门: '能源',
		手机: '19864509834',
		电话: '0731-1234567',
		状态: '离线'
	},
	{
		姓名: '王五',
		部门: '能源',
		手机: '19864509834',
		电话: '0731-1234567',
		状态: '在线'
	}
];

function createTable(json) {
	var ctable = document.getElementById('ctable');
	ctable.innerHTML = '';
	init(json, ctable);

	for(var i in json) {
		var tr = document.createElement('tr');
		for(var j in json[i]) {
			var td = document.createElement('td');
			td.textContent = json[i][j];
			//			td.style.width = '100px';
			tr.appendChild(td);
		}
		ctable.appendChild(tr);
	}
}

function init(json, ctable) {
	var thr = document.createElement('tr');
	for(var i in json[0]) {
		var th = document.createElement('th');
		th.textContent = i;
		thr.appendChild(th);
	}
	ctable.appendChild(thr);
}

function createExcel(table,  name) {
	var blob = new Blob(['<html><head><meta charset="UTF-8"></head><body><table>' + document.getElementById(table).innerHTML + '</table></body></html>'], {
		type: "text/plain;charset=utf-8"
	});
	saveAs(blob, name + ".xls");
}