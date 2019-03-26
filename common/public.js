"use strict"


var Interface = require("./interface.js");
var MD5 = require("./md5.js");
import store from '../store/index.js'

export default{
	reg:{
		mobileReg: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-8]|18[0-9]|19[89])\d{8}$/,
		mailReg:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, 
		passwordReg: /^\S{6,20}$/,
	},
	
	API_GET: function(config) {
		var data = config['data'] || {};
		var _this = this;
		config['success'] = config['success'] || function() {};
		
		config['xhr'] = uni.request({			
			url: Interface.default.Model[config['url']],
			method: config['type'],
			timeout: 10000, //超时时间设置，单位毫秒
			contentType: "application/json; charset=utf-8",
			header: {
				Authorization: store.state.token ? "Bearer "+store.state.token : ""
			},
			data: JSON.stringify(data),
			success: function(response, textStatus, request) {
				if(response.statusCode==401){
					var pages = getCurrentPages();
					var page = pages[pages.length - 1];
					uni.reLaunch({
						url: '/pages/mobile/mobile?redirect=/' + page.route
					})
					return false;
                    }
				config['success'](response, request);
				
				// console.log(METHOD)
			},
			error: function(response) {
				//超时会进入error status = 0
				if (typeof(config['error']) == "function") {
					config['error']();
				}
			}
		})
	},
}
