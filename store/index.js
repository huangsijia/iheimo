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
		outMutations:(state,params)=>{
			state.out=params;
		},
		comeMutations:(state,params)=>{
			state.come=params;
		}
	}
})
export default store
