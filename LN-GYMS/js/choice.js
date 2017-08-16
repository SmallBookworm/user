mui.init({
	swipeBack: true //启用右滑关闭功能
});
var sessionx = localStorage.getItem("session");
var user_id = localStorage.getItem("userid");
console.log(sessionx);
console.log(user_id);
$.ajax({
	type: "POST",
	url: "http://172.20.241.51:8080/Amounts/detectionController/listDetection.do",
	data: {
		//user_id
		"dtuserid": 1
	},
	dataType: "json",
	success: function(res) {
		createTable(res.data)
	},
	error: function(xhr) {
		alert("错误提示： " + xhr.status + " " + xhr.statusText);
		console.log(xhr)
	}
});

function createTable(data) {
	var table = document.getElementsByClassName('mui-table-view')[0];
	for(var i in data) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell';
		li.id = data[i].id;
		li.addEventListener('tap', function() {
			localStorage.setItem("stationID", this.id);
			//跳转
		});
		var a = document.createElement('a');
		a.className = 'mui-navigate-right';
		a.innerText = data[i].name;
		li.appendChild(a);
		table.appendChild(li);
	}
	var addRow = document.getElementById('addRow')
	addRow.addEventListener('touchstart', function() {
		this.style.backgroundColor = '#c8c7cc';
	});
	addRow.addEventListener('touchend', function(e) {
		this.style.backgroundColor = '#ffffff';
		var btnArray = ['取消', '确定'];
		mui.prompt('添加监测点：', '请输入设备名 ', ' ', btnArray, function(e) {
			if(e.index == 1) {
				var input = document.getElementsByTagName('input');
				if(input[0].value != '' && input[1].value != '') {
					$.ajax({
						type: "POST",
						url: "http://172.20.241.51:8080/Amounts/detectionController/addDetection.do",
						data: {
							"dtname": input[0].value,
							"dtno": input[1].value,
							//user_id
							"dtuserid": 1
						},
						dataType: "json",
						success: function(res) {
							console.log(res)
							mui.toast("添加成功！");
						},
						error: function(xhr) {
							mui.toast("错误提示： " + xhr.status + " " + xhr.statusText);
							console.log(xhr)
						}
					});
				}

			}

		});
		var div = document.createElement('div');
		div.className = 'mui-popup-input';
		div.innerHTML = '<input type="text"  placeholder="请输入设备号">';
		document.getElementsByClassName('mui-popup-inner')[0].appendChild(div);

	});
}