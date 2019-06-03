<template>
	<view class="detail" v-if="initData">
		<view class="cont">
			<view>
				<text>作者：</text>
				<view>
					{{initData.createBy}}
				</view>
			</view>
			<view>
				<text>描述：</text>
				<view class="textarea">
					<textarea  v-model="initData.note"></textarea>
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="initData.note" @tap="clearModel('note')"></image>
				</view>
			</view>
			<view>
				<text>分类：</text>
				<view class="select" @click="categoryFun">
					{{initData.categoryTxt}}
					<image src="../../static/img/icon-xiala.png" class="icon"></image>
				</view>
			</view>
			<view>
				<text>是否完成：</text>
				<view class="select" @click="completedFun">
					{{initData.completedTxt}}
					<image src="../../static/img/icon-xiala.png" class="icon"></image>
				</view>
			</view>
		</view>
		<view class="btnBottom">
			<text @click="modifyDetail()">保存</text>
			<text @click="deleteDetail()">删除</text>
		</view>
		<view class="key" v-if="showKey">
			<index-key @categoryEmit="categoryFun" @completedEmit="completedFun"></index-key>
		</view>
		<lvv-popup position="bottom" ref="categoryLvvpopref">
			<view class="lvvpopref categoryLvvpopref">
				<view class="payList">
					<text class="text">选择分类</text>
					<view :class="[{'on':initData.categoryIndex == $index},'payRow']" v-for="(item,$index) in categoryList" :key="item" @click="selectCategory(item,$index)" :code="item&&item.code">
						<image :src="'../../static/img/'+item.img+'.png'" class="icon"></image>
						<view class='payLi'>
							<text class="msg">{{item&&item.msg}}</text>
							<image :src="'../../static/img/icon-xuanzhong.png'" :class="[{'icon-xuanzhong':initData.categoryIndex == $index},'icon']"></image>
						</view>
					</view>
				</view>
			</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="completedLvvpopref">
			<view class="lvvpopref completedLvvpopref">
				<view class="payList">
					<text class="text">是否完成</text>
					<view :class="[{'on':initData.completedIndex == $index},'payRow']" v-for="(item,$index) in completedList" :key="item" @click="selectCompleted(item,$index)" :code="item&&item.code">
						<image :src="'../../static/img/'+item.img+'.png'" class="icon"></image>
						<view class='payLi'>
							<text class="msg">{{item&&item.msg}}</text>
							<image :src="'../../static/img/icon-xuanzhong.png'" :class="[{'icon-xuanzhong':initData.completedIndex == $index},'icon']"></image>
						</view>
					</view>
				</view>
			</view>
		</lvv-popup>
	</view>
</template>

<script>
	import indexKey from '../../component/indexKey.vue';
	import lvvPopup from '../../components/lvv-popup/lvv-popup.vue';
	export default {
		computed: {
			categoryList() {
				return this.$store.state.categoryList;
			},
			completedList() {
				return this.$store.state.completedList;
			},
		},
		components: {
			indexKey,
			lvvPopup
		},
		data() {
			return {
				showKey:false,
				initData:{
					categoryTxt: "",
					categoryCode: "",
					categoryIndex: "",
					completedTxt: "",
					completedCode: "",
					completedIndex: "",
				},
			}
		},
		methods: {
			clearModel(params) {
				this.initData[params] = "";
			},
			modifyDetail() {
				this.$public.API_GET({
					url: "noteBook",
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
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				})
			},
			deleteDetail() {
				this.$public.API_GET({
					url: "noteBook",
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
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				})
			},
			categoryFun() {
				this.$refs.categoryLvvpopref.show();
			},
			//li切换class
			selectCategory(item, index) {
				this.initData.categoryTxt = item.msg;
				this.initData.categoryIndex = index;
				this.initData.categoryCode = item.code;
				this.initData.type = item.code;
				this.$refs.categoryLvvpopref.close();
			},
			completedFun() {
				this.$refs.completedLvvpopref.show();
			},
			//li切换class
			selectCompleted(item, index) {
				this.initData.completedTxt = item.msg;
				this.initData.completedIndex = index;
				this.initData.completedCode = item.code;
				this.initData.isComplete = item.code;
				this.$refs.completedLvvpopref.close();
			},
		},
		onLoad(e) {
			if(e && e.params){
				this.initData = JSON.parse(e.params);
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
					width: 250upx;
					&:first-child {
						color: $ft-999;
					}
				}
				view {
					line-height: 1.6;
					border-radius: 2upx;
					padding: 0 12upx;
					display: flex;
					justify-content: space-between;
					align-items: top;
					&.textarea,&.select{
						width: 500upx;
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
