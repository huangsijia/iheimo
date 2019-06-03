var host = "http://47.96.7.232:5000"
export default{	
	Model:{
		//登录
		login:host+"/api/Login",
		//新增流水账
		add:host+"/api/Consumption",
		//获取所有流水账分类
		getconsumptiontype:host+"/api/Consumption/getconsumptiontype",
		//获取所有收入流水账分类
		getInCometype:host+"/api/InCome/getInCometype",
		//新增收入流水账
		InCome:host+"/api/InCome",
		//支出流水账查询
		list:host+'/api/Consumption/list',
		//收入流水账查询
		inComeList:host+'/api/InCome/list',
		//记事本查询 POST /api/NoteBook/list
		noteBookList: host + '/api/NoteBook/list',
		//修改记事本 PUT /api/NoteBook
		//新增记事本 POST /api/NoteBook
		//记事本删除 DELETE /api/NoteBook/{id}
		noteBook: host + '/api/NoteBook',
	}
}