<template>
	<view>
		<view class="login">
			{{user}}
			<view class="box">
				iheimo
			</view>
			<text class="p">懂自己，懂生活</text>
			<view class="btn" @click="loginFun">
				微信登录
			</view>
			<view class="other">
				<view class="p">
					其他登录方式
				</view>
				<view class="link">
					<navigator url="../mobile/mobile" hover-class="none">手机登录</navigator>
					<navigator url="../index/index" hover-class="none">注册</navigator>
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
				redirect: ""
			};
		},
		methods: {
			...mapMutations(['login']),
			loginFun() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(loginRes));
									this.info = JSON.stringify(loginRes)
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log('-------获取微信用户所有-----');
											console.log(JSON.stringify(infoRes));
											this.login(JSON.stringify(infoRes));
											uni.setStorageSync("persion", JSON.stringify(infoRes));
											if (this.redirect) {
												uni.reLaunch({
													url: this.redirect
												});
											} else {
												uni.reLaunch({
													url: '/pages/index/index'
												});
											}
										}
									});
								}
							});
						}
					}
				});
			}

		},
		mounted() {

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
