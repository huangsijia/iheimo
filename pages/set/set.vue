<template>
	<view class="set">
		<view class="white">
			<view class="li border" @click="changePwd">
				<navigator url="" hover-class="none">
					<text class="txt">修改密码</text>
					<text class="iconfont">&#xe6aa;</text>
				</navigator>
			</view>
		</view>

		<view class="txt border" @click="logoutFun">退出</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {};
		},
		methods: {
			...mapMutations(['logout']),
			//退出
			logoutFun() {
				uni.removeStorageSync("persion");
				this.logout();
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			//修改密码
			changePwd() {}
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.set {
		width: 100%;
		min-height: 100vh;
		background-color: $bg;
		overflow: hidden;

		.white {
			background: $white;
			margin-bottom: 24upx;
		}

		.li {
			width: 100%;

			navigator {
				display: flex;
				justify-content: space-between;
				padding-left: 24upx;
			}

			&:last-child {
				navigator {
					border-bottom: 0;
				}
			}

			.iconfont {
				font-size: 60upx;
				padding-right: 12upx;
				color: $borderColor;
			}
		}

		.txt {
			height: 80upx;
			line-height: 80upx;
			background: $white;
			text-align: center;
		}
		.border{			
			border-top: 1upx solid $borderColor;
			border-bottom: 1upx solid $borderColor;
		}
	}
</style>
