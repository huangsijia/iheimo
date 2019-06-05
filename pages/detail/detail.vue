<template>
	<view class="detail" v-if="initData">
		<view class="title">
			<view class="titleLeft">
				<view class="img">
					<image :src="'../../static/img/'+initData.consumptionTypeIcon+'.png'" class="icon"></image>
				</view>
				<text>{{initData.consumptionTypeName}}</text>
			</view>
			<view class="amount">
				<input type="text" v-model="initData.amount">
				<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" @tap="clearModel('amount')"></image>
			</view>
		</view>
		<view class="cont">
			<view>
				<text>时间：</text>
				<view>
					<input type="text" v-model="initData.date">
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.date" @tap="clearModel('date')"></image>
				</view>
			</view>
			<view>
				<text>支付方式：</text>
				<view class="select" @click="payment">
					{{initData.paymentTxt}}
					<image src="../../static/img/icon-xiala.png" class="icon"></image>
				</view>
			</view>
			<view>
				<text>用途：</text>
				<view>
					<input type="text" v-model="initData.name">
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.name" @tap="clearModel('name')"></image>
				</view>
			</view>
			<view>
				<text>作者：</text>
				<view>
					<input type="text" v-model="initData.createBy">
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.createBy" @tap="clearModel('createBy')"></image>
				</view>
			</view>
			<view>
				<text>描述：</text>
				<view>
					<input type="text" v-model="initData.description">
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.description" @tap="clearModel('description')"></image>
				</view>
			</view>
			<view>
				<text>地址：</text>
				<view>
					<input type="text" v-model="initData.location">
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.location" @tap="clearModel('location')"></image>
				</view>
			</view>
		</view>
		<view class="btnBottom">
			<text @click="showModal(0)">保存</text>
			<text @click="showModal(1)">删除</text>
		</view>
		<view class="key" v-if="showKey">
			<key @paymentEmit="payment" @calendarEmit="calendarFun" ></key>
		</view>
		<lvv-popup position="bottom" ref="paymentLvvpopref">
			<view class="lvvpopref paymentLvvpopref">
				<view class="payList">
					<text class="text">选择账户</text>
					<view :class="[{'on':initData.paymentIndex == $index},'payRow']" v-for="(item,$index) in payList" :key="item" @click="selectPay(item,$index)"
					 :code="item&&item.code">
					 	<image :src="'../../static/img/'+item.img+'.png'" class="icon"></image>
						<view class='payLi'>
							<text class="msg">{{item&&item.msg}}</text>
							<image :src="'../../static/img/icon-xuanzhong.png'" :class="[{'icon-xuanzhong':initData.paymentIndex == $index},'icon']"></image>
						</view>

					</view>
				</view>
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
				initData:{
					paymentTxt:"",
					paymentCode:"",
					paymentIndex:"",
				},
				isInCome:true,
				
			}
		},
		methods: {
			clearModel(params) {
				this.initData[params] = "";
			},
			showModal(params){
				let my = this;
				let con = "确定保存此内容？"
				if(params){
					con = "确定删除此内容？"
				}
				uni.showModal({
					title: '提示',
					content: con,
					success: function (res) {
						if (res.confirm) {
							if(params){
								my.deleteDetail();
							}else{
								my.modifyDetail();
							}
						} 
					}
				});
			},
			modifyDetail() {
				let dataName="add";
				if (this.isInCome === "true") {
					dataName = "add"
				}else{
					dataName = "InCome"
				}
				this.$public.API_GET({
					url: dataName,
					type: "PUT",
					data: this.initData,
					success: res => {
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							});
							return false;
						}
						this.$nextTick(function() {
							uni.redirectTo({
								url: '/pages/list/list'
							});
						})
					}
				})
			},
			deleteDetail() {
				let dataName="add";
				if (this.isInCome === "true") {
					dataName = "add"
				}else{
					dataName = "InCome"
				}
				this.$public.API_GET({
					url: dataName,
					type: "DELETE",
					query: this.initData.id,
					success: res => {
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							});
							return false;
						}
						this.$nextTick(function() {
							uni.redirectTo({
								url: '/pages/list/list'
							});
						})
					}
				})
			},
			//li切换class
			selectPay(item, index) {
				this.initData.paymentTxt = item.msg;
				this.initData.paymentIndex = index;
				this.initData.paymentCode = item.code;
				this.initData.paymentMethodCode = item.code;
				this.$refs.paymentLvvpopref.close();
			},
			//支付方式
			payment() {
				this.$refs.paymentLvvpopref.show();
			},
		},
		onLoad(e) {
			if(e && e.params){
				this.initData = JSON.parse(e.params);
				this.isInCome = e.isIncome;
			}
		}
	}
</script>


<style scoped="" lang="scss">
	@import '../../common/skin.scss';
	.detail {
		color: $ft-333;
		.title {
			height: 120upx;
			border: 1px solid $borderColor;
			padding: 0 24upx;
			display: flex;
			justify-content: space-between;
			background: $white;
			align-items: center;
			font-size: 30upx;
			.titleLeft {
				display: flex;
				height: 80upx;
				line-height: 80upx;
			}
			.img {
				width: 80upx;
				height: 80upx;
				line-height: 80upx;
				margin-right: 15upx;
				background: $bg;
				border-radius: 50%;
				text-align: center;
			}
			.amount {
				width: 350upx;
				font-size: 40upx;
				color: $main;
				border-radius: 2upx;
				padding: 0 12upx;
				border: 1px solid $borderColor;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					width: 80%;
				}
			}
		}
		.cont {
			padding: 24upx;
			view {
				display: flex;
				justify-content: space-between;
				padding: 12upx 0;
				text {
					&:first-child {
						color: $ft-999;
					}
				}
				view {
					width: 350upx;
					border-radius: 2upx;
					padding: 0 12upx;
					border: 1px solid $borderColor;
					display: flex;
					justify-content: space-between;
					align-items: top;
					&.select{
						width: 350upx;
						border: 1px solid $borderColor;
						padding:12upx;
						text-align: left;
					}
				}
			}
		}
		.btnBottom {
			width: 100%;
			height: 40upx;
			line-height: 40upx;
			padding: 30upx 0;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1px solid $borderColor;
			text-align: center;
			display: flex;
			color: $main;
			text {
				width: 50%;
				&:first-child {
					border-right: 1px solid $borderColor;
				}
			}
		}
	}
</style>
