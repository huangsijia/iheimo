"use strict"


var Interface = require("./interface.js");
var MD5 = require("./md5.js");


export default{
	myHost:"",
	Auth: {
		get: function() {
			var result = {};
			try {
				result = JSON.parse(localStorage['persion']);
				//添加时间戳 超过一天调用接口时 自动登出
				if (result && new Date().getTime() - result.timeStamp > 86400000) {
					this.remove()
					return 0
				}
			} catch (r) {
				result = sessionStorage['persion'] && JSON.parse(sessionStorage['persion']);
				if (result && new Date().getTime() - result.timeStamp > 86400000) {
					this.remove()
					return 0
				}
			}
			if ("object" === typeof result) {
				return result['token'];
			}
			return 0;
		},
		set: function(_user) {
			window.setTokenFlag = true;
			//添加时间戳 超过一天调用接口时 自动登出
			_user.timeStamp = new Date().getTime()
			if (_user.accessToken && _user.accessToken == "app") {
				this.remove()
			} else {
				try {
					window.setTokenFlag = true
					localStorage['persion'] = JSON.stringify(_user);
				} catch (r) {
					sessionStorage['persion'] = JSON.stringify(_user);
				}
			}
		},
		remove: function() {
			try {
				localStorage.removeItem('persion');
			} catch (r) {
				sessionStorage.removeItem('persion');
			}
		}
	},
	API_GET: function(config) {
		var data = config['data'] || {};
		var _this = this;

		config['success'] = config['success'] || function() {};
		//新加密方式
		var POST = "POST";
		var SIGNATURE_METHOD = "HmacSHA1";
		var SIGNATURE_VERSION = "2016-12-20";
		var ACCESS_TOKEN = "f8e3dbe9-f171-4fa3-975d-2b27f8e5bc7e";
		var ACCESS_SECRET =
			"rk64uXc6L1tgk548XwX7VvIdyf1uZMlBqg0PAIzXCLXbaGT9s783feEWwHz9p4TISUm5kqHXqcSPZsfR0DgzRiMGGlq3aM6zD2LEDwMUrI188yh2zfI0A7m1PF4Cjb1M";
		//
		// data.channel=ACCESS_TOKEN

		var timeStamp = new Date().getTime() + "";
		//签名数据
		var sigData = {
			accessToken: ACCESS_TOKEN,
			signatureMethod: SIGNATURE_METHOD,
			timestamp: timeStamp,
			signatureVersion: SIGNATURE_VERSION,
			appVersion: "appVersion",
			parameter: encodeURIComponent(JSON.stringify(data)) 
		}
		//传送数据
		var sendData = {
			"device-model": "",
			"device-maker": "",
			"device-uuid": "",
			"device-screen": "",
			"device-network": "",
			"device-gps": "",
			"user-token": ""
		}

		config['xhr'] = uni.request({
			url: Interface.Model[url],
			type: "post",
			dataType: "json",
			timeout: 10000, //超时时间设置，单位毫秒
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(Object.assign(sendData, data)),
			success: function(response, textStatus, request) {
				if (response.data == null) {
					response.data = [];
				}
				if (response.isSuccess == false) {
					if (response.status == "301") {
						if (myConfig.isApp()) {
							_this.Auth.remove();
							location.href = "cashloan://AppLogin"
						} else {
							window.Hub.$emit("loginOut", response.message)
							_this.Auth.remove();
						}
						if (typeof(config['error']) == "function") {
							config['error']();
						}
						return
					}
					if (response.status == "500") {
						//系统异常
						window.Hub.$emit('toast', "服务器正忙，请稍后再试")
						// window.Hub.$emit("networkError", true);
						if (typeof(config['error']) == "function") {
							config['error']();
						}
						return
					}
					if (response.status == "501" || response.status == "401") {
						window.Hub.$emit("networkError", true);
						if (typeof(config['error']) == "function") {
							config['error']();
						}
						return
					}
				}
				response.isSuccess = response.status;
				response.message = response.msg;
				//publicArr[cache['url']][cache['data']] = JSON.stringify(response);
				config['success'](response, request);
			},
			error: function(response) {
				//超时会进入error status = 0
				if (typeof(config['error']) == "function") {
					config['error']();
				}
				if (response.status == "301") {
					if (myConfig.isApp()) {
						_this.Auth.remove();
						location.href = "cashloan://AppLogin"
					} else {
						window.Hub.$emit("loginOut", response.responseJSON.message)
						_this.Auth.remove();
					}

					return
				}

				window.Hub.$emit('toast', "服务器正忙，请稍后再试")
			}
		})
	},
}
