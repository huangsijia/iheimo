<template>
	<view class="add">
		<view class="add_fixed">
			<view class="tab">
				<view class="tab_nav">
					<view :class="[{'on':tabIndex == $index},'li']" v-for="(item,$index) in listTab" :key="$index" @click="selectTab($index)">
						{{item}}
					</view>
				</view>
				<view class="tab_close" @click="tabClose">
					关闭
				</view>
			</view>
			<view class="resultOut">
				<view class="result">
					<view class="resultLeft">
						<view class="img">
							<text class="iconfont">{{record.icon}}</text>
						</view>
						<text>{{record.name}}</text>
					</view>
					<text>{{amount}}</text>
				</view>
				<text class="formula">{{formula}}</text>
			</view>

		</view>
		<view class="list">
			<view :id="item.id" :code="item.code" :class="[{'on':itemIndex == $index},'li']" v-for="(item,$index) in list" :key="$index"
			 @click="selectList(item,$index)" @touchstart="showKeyFun">
				<view class="img">
					<text class="iconfont">{{item.icon}}</text>
				</view>
				<p>{{item.name}}</p>
			</view>
		</view>
		<view class="key" v-if="showKey">
			<key @amountEmit="calculate" @paymentEmit="payment" @remarkEmit="remark" @calendarEmit="calendarFun" @addressEmit="addressFun"></key>
		</view>
		<lvv-popup position="bottom" ref="calendarLvvpopref">
			<view class="lvvpopref calendarLvvpopref">
				<calendar :date="date" :lunar="true" @change="change" @to-click="toClick" />
			</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="paymentLvvpopref">
			<view class="lvvpopref paymentLvvpopref">
				<view class="payList">
					<text class="text">选择账户</text>
					<view :class="[{'on':payIndex == $index},'payRow']" v-for="(item,$index) in payList" :key="item" @click="selectPay(item,$index)"
					 :code="item.code">
						<text :class="['iconfont','iconfontLeft']">{{item.img}}</text>
						<view class='payLi'>
							<text class="msg">{{item.msg}}</text>
							<text class='iconfont icon'>&#xe658;</text>
						</view>

					</view>
				</view>
			</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="remarkLvvpopref">
			<view class="lvvpopref remarkLvvpopref">
				备注：<textarea v-model="remarkTxt" :focus="remarkFocus" />
				</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="addressLvvpopref">
			<view class="lvvpopref addressLvvpopref">
				地址：<textarea v-model="addressTxt" :focus="addressFocus" />
				</view>
		</lvv-popup>
	</view>
</template>

<script>
	import key from '../../component/key.vue';
	import lvvPopup from '../../components/lvv-popup/lvv-popup.vue'
	import calendar from '../../components/uni-calendar/uni-calendar'
	export default {
		computed: {
			payList() {
				return this.$store.state.payList;
			}
		},
		components: {
			key,
			lvvPopup,
			calendar
		},
		data() {
			return {
				payIndex: 0,
				tabIndex: 0,
				listTab: ["支出", "收入"],
				itemIndex: 0,
				list: [],
				showKey: true,
				record: "",
				formula: "",
				amountArr: [],
				amountStr: "",
				amount: 0,
				first: "",
				payMentTxt:"支付宝",
				paymentMethodCode:"alipay",
				remarkTxt:"",
				remarkFocus:false,
				date:"2019-03-22",
				addressFocus:false,
				addressTxt:""
			};
		},
		methods: {
			//计算
			calculate(data) {
				// 不允许直接输入+-.0C完成
				if(this.amount == "0"){
					if(data.index == "3" || data.index == "7" || data.index == "11" || data.index == "12" || data.index == "13"  || data.index == "14"){
						this.formula = " ";
						return;
					}
				}
				// 点击C
				if(data.index == "12"){
					this.amountStr = "";
					this.formula = " ";
					this.amountArr = [];
					this.amount = 0;
					return;
				}
				// 点击删除
				if (data.index == "3") {
					var deleteArr = []
					var oldArr = this.amountStr.split("");
					deleteArr = oldArr.pop();
					this.amountStr = oldArr.join("");
				}else{
					//不能连续输入+-.
					if((data.index == "7" && this.amountStr.substr(-1,1).includes("+")) || data.index == "11" && this.amountStr.substr(-1,1).includes("-") || data.index == "14" && this.amountStr.substr(-1,1).includes(".")){
						return;
					}else{
						this.amountStr += data.item;
					}
				}
				
				var result = 0;
				var reg = new RegExp("(\\+|\\-|\\*|\\/)");
				this.amountArr = this.amountStr.split(reg);
				
				//点击完成
				if(data.index == "15"){
					this.submitFun();
					return;
				}
				//俩位小数
				if (this.amountStr.includes(".")) {
					var numIndexOf = this.amountStr.indexOf(".");
					if (numIndexOf != -1) {
						var numSub = this.amountStr.substring(numIndexOf + 1, this.amountStr.length)
						if (numSub.length > 2) {
							this.amountStr = this.amountStr.substring(0, numIndexOf + 3);
						}
					}
					this.amount = this.amountStr;
					return;
				}
				//加减计算
				if(this.amountStr.includes("+") || this.amountStr.includes("-")){
					this.formula = this.amountStr;
					for (var i = 0; i < this.amountArr.length; i++) {
						var item = this.amountArr[i];
						if (item == '+' || item == '-') {
							var nextNum = i + 1 >= this.amountArr.length ? 0 : Number(this.amountArr[i + 1]);
							result = item == '+' ? result + nextNum : result - nextNum;
						} else if (i == 0) {
							result += Number(item);
						}
						this.amount = result;
					}
				}else{
					this.amount = this.amountStr?this.amountStr:0;
				}
			},
			//日历
			calendarFun(){
				this.$refs.calendarLvvpopref.show();
			},
			change(e) {
				this.date = e.year+"-"+e.month+"-"+e.date;
			},
			toClick(e) {
				this.date = e.year+"-"+e.month+"-"+e.date;
			},
			//li切换class
			selectPay(item, index) {
				this.payMentTxt = item.msg;
				this.payIndex = index;
				this.$refs.paymentLvvpopref.close();
			},
			//支付方式
			payment() {
				this.$refs.paymentLvvpopref.show();
			},
			// 备注
			remark(){
				this.$refs.remarkLvvpopref.show();
				this.remarkFocus = true;
			},
			//地址
			addressFun(){
				this.$refs.addressLvvpopref.show();
				this.addressFocus = true;
			},
			submitFun(){
				var sendData = {
					name:this.record.name,
					consumptionTypeCode:this.record.code,
					paymentMethodCode:this.paymentMethodCode,
					description:this.remarkTxt,
					location:this.addressTxt,
					amount:this.amount,
					date:this.date
				}
				var link = "add"
				if(this.tabIndex){
					link ="InCome"
				}
				this.$public.API_GET({
					url:link,
					type:"POST",
					data:sendData,
					success:res=>{
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
								duration: 2000
							});
							return false;
						}
						uni.navigateTo({
							url: "/pages/list/list"
						})
					}
				})
			},
			//关闭添加，显示流水列表
			tabClose() {
				uni.navigateTo({
					url: "/pages/list/list"
				})
			},
			//切换tab
			selectTab(index) {
				this.tabIndex = index;
				if(index){
					this.getInCometypeFun();
				}else{
					this.listFun();
				}
			},
			//li切换class
			selectList(item, index) {
				this.itemIndex = index;
				this.record = item;
				this.showKey = true;
			},
			showKeyFun(){				
				this.showKey = false;
			},
			//分类列表
			listFun(){
				this.$public.API_GET({
					url:"list",
					type:"GET",
					success:res=>{
						this.list = res.data;
						console.log(res.data)
						this.record = this.list[0];
					}
				})
				
			},
			getInCometypeFun(){
				this.$public.API_GET({
					url:"getInCometype",
					type:"GET",
					success:res=>{
						this.list = res.data;
						this.record = this.list[0];
					}
				})
			}
		},
		mounted() {
			this.listFun();
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.add {
		.add_fixed {
			width: 100%;
			position: fixed;
			top: 0;
		}

		.tab {
			position: relative;

			.tab_nav {
				display: flex;
				justify-content: center;
				background: $bg;

				view {
					width: 138upx;
					height: 49upx;
					line-height: 49upx;
					border: 1px solid $main;
					color: $main;
					text-align: center;
					margin: 10upx 0 20upx;

					&.on {
						background: $main;
						color: $white;
					}
				}
			}

			.tab_close {
				position: absolute;
				right: 48upx;
				top: 20%;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 230upx;

			.li {
				text-align: center;
				margin-bottom: 30upx;

				&.on {
					.img {
						background: $main;
						color: $white;
					}
				}
			}
		}

		.img {
			width: 80upx;
			height: 80upx;
			line-height: 80upx;
			margin: 0 35upx;
			background: $bg;
			border-radius: 50%;
		}

		.result {
			height: 120upx;
			line-height: 120upx;
			border: 1px solid $borderColor;
			font-size: 50upx;
			padding-right: 24upx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			background: $white;

			.resultLeft {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				font-size: 30upx;

				.img {
					background: $main;
					color: $white;
				}
			}
		}

		.resultOut {
			position: relative;

			.formula {
				position: absolute;
				bottom: 2upx;
				right: 24upx;
				color: $ft-999;
				font-size: 24upx;
			}
		}

		.key {
			width: 100%;
			position: fixed;
			bottom: 0;
		}

		.payList {
			.text {
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1upx solid $borderColor;
				display: block;
				text-align: center;
				font-size: 34upx;
			}

			.payRow {
				display: flex;
				justify-content: space-between;
				height: 90upx;
				line-height: 90upx;
				font-size: 28upx;
				&:nth-child(2){
					.iconfontLeft {
						color: #56abe4;
					}
				}
				&:nth-child(3){
					.iconfontLeft {
						color: #3eb135;
					}
				}
				&:nth-child(4){
					.iconfontLeft {
						color: #1296db;
					}
				}
				&:nth-child(5){
					.iconfontLeft {
						color:#ffbb00;
					}
				}
				&:nth-child(6){
					.iconfontLeft {
						color: #58bfbc;
					}
				}
				&.on{
					.payLi{
						.icon{
							display: block;
						}
					}
				}
				.iconfontLeft {
					padding: 0 24upx;
					font-size: 44upx;
					color:$main;
				}

				.payLi {
					width: 100%;
					padding-right: 24upx;
					border-bottom: 1upx solid $borderColor;
					display: flex;
					justify-content: space-between;
					.iconfont {
						color: $main;
						display: none;
					}
					
				}
			}
		}
		.lvvpopref{
			width: 750upx;
			background: #FFFFFF;
			position: absolute;
			bottom:0;
			font-size: 30upx;
			&.paymentLvvpopref{				
				height:600upx;
			}
			&.remarkLvvpopref,&.addressLvvpopref{				
				height:120upx;
				padding:24upx;
				color: $ft-999;
				display: flex;
				line-height: 1.6;
				textarea{
					color: $ft-333;					
				}
			}
			&.calendarLvvpopref{
				height:80%;
			}
		}
	}
</style>
