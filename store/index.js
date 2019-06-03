import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		token: "",
		userInfo: {},
		hasLogin: false,
		// 支出分类
		out:[],
		// 收入分类
		come:[],
		keyList: ['1', '2', '3','icon-dengluye-shanchu','4','5','6','+','7','8','9','-','C','0','.','完成'],
		payList:[
			{ "img":"icon-zhifubao","msg":'支付宝',"code":"Alipay"},
			{ "img":"icon-weixin","msg":'微信',"code":"WePay"},
			{ "img":"icon-xinyongqia2","msg":'银行卡',"code":"BankCard"},
			{ "img":"icon-xianjin","msg":'现金',"code":"Cash"},
			{ "img":"icon-xinyongqia","msg":'信用卡',"code":"CreditCard"},
		],
		indexList:[
			"2019/06/29前,星杰艺校缴费，1200元20节舞蹈，1200元20节英语",
			"爱乐梵目前剩余39节课时，因为搬家补偿6节课时",
			"2019年6月21日，思嘉生产日,弟弟or妹妹?",
			"2019年5月14日，去了康桥路1710号报案，打印了各种证件",
			"2019年5月12日，思嘉准备修产假，如果顺产128天，修到2019年10月18日，如果剖143天，修到2019年11月2日",
		],
		categoryList:[
			{ "img": "icon-richeng", "msg": "计划", "code": 0 },
			{ "img": "icon-qingdan1", "msg": "备忘录", "code": 1 },
			{ "img": "icon-jihua2", "msg": "总结", "code": 2},
		],
		completedList: [
			{ "img": "icon-yiwancheng", "msg": "已完成", "code": true },
			{ "img": "icon-weiwancheng", "msg": "未完成", "code": false },
		]
	},
	getters:{
	},
	mutations: {
		login: (state,params) => {
			state.userInfo = params.user;
			state.token = params.token;
			state.hasLogin = true;
		},
		logout: (state) => {
			state.userInfo = {};
			state.token = "";
            state.hasLogin = false;
		},
		outMutations:(state,params)=>{
			state.out=params;
		},
		comeMutations:(state,params)=>{
			state.come=params;
		}
	}
})
export default store
