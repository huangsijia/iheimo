import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		token: "",
		userInfo: {},
		hasLogin: false,
		// 支出分类
		expenses:[
			{"img":"\ue602","msg":"居家"},
			{"img":"\ue610","msg":"交通"},
			{"img":"\ue607","msg":"娱乐"},
			{"img":"\ue640","msg":"餐饮"},
			{"img":"\ue624","msg":"购物"},
			{"img":"\ue7fc","msg":"子女"},
			{"img":"\ue616","msg":"人情"},
			{"img":"\ue6a6","msg":"水电费"},
			{"img":"\ue6a9","msg":"医疗"},
			{"img":"\ue683","msg":"其他"},
		],
		// 收入分类
		income:[
			{"img":"\ue61c","msg":"工资"},
			{"img":"\ue674","msg":"奖金"},
			{"img":"\uea2d","msg":"红包"},
			{"img":"\ue683","msg":"其他"},
		],
		keyList:['1','2','3','\ue6ac','4','5','6','+','7','8','9','-','C','0','.','完成'],
		payList:[
			{"img":"\ue6c5","msg":'支付宝',"code":"Alipay"},
			{"img":"\ue6ff","msg":'微信',"code":"WePay"},
			{"img":"\ue608","msg":'银行卡',"code":"BankCard"},
			{"img":"\ue6b9","msg":'现金',"code":"Cash"},
			{"img":"\ue605","msg":'信用卡',"code":"CreditCard"},
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
		
	}
})
export default store
