<template>
	<view class="detail" v-if="initData">
		<view class="title">
			<view class="titleLeft">
				<view class="img">
					<image :src="'../../static/img/'+initData.consumptionTypeIcon+'.png'" class="icon"></image>
				</view>
				<text>{{initData.consumptionTypeName}}</text>
			</view>
			<view class="amount">{{initData.amount}}</view>
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
				<view>
					<input type="text" v-model="initData.paymentName">
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.paymentName" @tap="clearModel('paymentName')"></image>
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
			<text @click="modifyDetail()">保存</text>
			<text @click="deleteDetail()">删除</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				initData:"",
				isInCome:true,
			}
		},
		methods: {
			clearModel(params) {
				this.initData[params] = "";
			},
			modifyDetail() {
				let dataName="add";
				if (this.isInCome) {
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
				if (this.isInCome) {
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
			}
		},
		onLoad(e) {
			if(e && e.params){
				this.initData = JSON.parse(e.params);
				this.initData.paymentName = this.$filter.formatPay(this.initData.paymentMethodCode);
				this.isInCome = e.isIncome
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
				font-size: 40upx;
				color: $main;
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
					min-width: 50%;
					border-radius: 2upx;
					padding: 0 12upx;
					border: 1px solid $borderColor;
					display: flex;
					justify-content: space-between;
					align-items: center;
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
