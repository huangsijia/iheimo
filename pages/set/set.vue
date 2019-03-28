<template>
	<view class="set">
		<view class="logout" @click="logoutFun">退出</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		methods:{
			...mapMutations(['logout']),
			logoutFun(){
				uni.removeStorageSync("persion");
				this.logout();
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
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

		.logout {
			height: 80upx;
			line-height: 80upx;
			border-top: 1upx solid $borderColor;
			border-bottom: 1upx solid $borderColor;
			background: $white;
			text-align: center;
			margin-bottom:24upx;
		}
	}
</style>
