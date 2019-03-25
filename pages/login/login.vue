<template>
	<view>
		<view class="login">
			<view class="box">
				iheimo
			</view>
			<text class="p">懂自己，懂生活</text>
			<view class="btn">
				微信登录
			</view>
			<view class="other">
				<view class="p">
					其他登录方式
				</view>
				<view class="link">
					<navigator url="../mobile/mobile">手机登录</navigator>
					<navigator url="../index/index">注册</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {

			};
		},
		methods:{
			// ...mapMutations(['logout']),
		},
		mounted() {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes.authResult);
				}
			})
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.login {
		.box {
			width: 194upx;
			height: 194upx;
			line-height: 194upx;
			background: $main;
			margin: 156upx auto 40upx;
			border-radius: 15upx;
			text-align: center;
			color: $white;
		}

		.p {
			text-align: center;
			display: block;
			color: $ft-666;
			font-size: 32upx;
		}

		.btn {
			margin-top: 380upx;
		}

		.other {
			.p {
				position: relative;
				color: $ft-cf;
				font-size: 24upx;
				text-align: center;
				margin-top: 100upx;

				&:before,
				&:after {
					content: " ";
					width: 200upx;
					height: 1upx;
					background: $ft-cf;
					display: block;
					position: absolute;
					top: 50%;
				}

				&:before {
					left: 10%;
				}

				&:after {
					right: 10%;
				}
			}

			.link {
				width: 80%;
				margin: 24upx auto 0;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
			}
		}
	}
</style>
