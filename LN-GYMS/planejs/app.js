var sessionx;
var user_id;
function denglu(){
	var account1 = document.getElementById('account').value;
	alert("account1"+account1);
	var password1 = document.getElementById('password').value;
	if (account1.length < 1) {
		alert('账号不能为空');
		 return false;
		}
	else{
		if (password1.length < 1) {
		alert('密码不能为空');
		 return false;
		}
	}
	$.ajax({type:"post",
	        url:"http://172.20.241.51:8080/Amounts/userInfoController/login.do",
	        //data:"{\"userName\":\""+ account1+"\""+",\"password\":"+"\"" + password1+"\""+",\"userType\":\"0\"}",
            data:{"username":account1,"password":password1},
            //contentType:"application/json;charset=utf-8",
            dataType:"json",
            async:false,
			success:function(res){
				alert(res.userid);
				sessionx=res.session;
				user_id=res.userid;
				localStorage.setItem("session",sessionx);
				localStorage.setItem("userid",user_id);
	         	if(res.code==0) {
	         		alert(res.msg);
	         		document.getElementById('password').value="";
	         		 return false;
	         	}
	          	else{
	          		window.location.href="plane0/choice.html";
	          		//window.location.href="plane/tab-webview-main.html";
	         	}
		}
	});
}

(function($, owner) {
	/**
	 * 用户登录
	 **/
	

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 1) {
			return callback('用户名不能为空');
		}
		if (regInfo.password.length < 1) {
			return callback('密码不能为空');
		}
		//if (!checkEmail(regInfo.email)) {
		//	return callback('邮箱地址不合法');
		//}
		//var users = JSON.parse(localStorage.getItem('$users') || '[]');
		//users.push(regInfo);
		//localStorage.setItem('$users', JSON.stringify(users));
		//return callback();
		$.ajax({method:'post',
	        url:"http://47.91.152.207:10000/api/users/userRegister",
            data:{"userName":regInfo.account,"password":regInfo.password,"userType":'0'},
			success:function(res){
            if(res.equals(null)) {
            	return callback('密码修改失败');
            }
            else{
            	return callback('密码修改成功');
            }
          }
		});
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));