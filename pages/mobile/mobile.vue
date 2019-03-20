<template>
	<view>
		<view class="loginMobile">
			<form class="form">
				<view class="section mobile">
					<text class="iconfont font">&#xe60c;</text>
					<input focus v-model="info.mobile" type="number" maxlength="11" placeholder="请输入11位手机号码" placeholder-class="placeholder"
					 value="" />
				</view>
				<view class="section password">
					<text class="iconfont font">&#xe769;</text>
					<input focus v-model="info.password" :password="isOpen?false:true" type="text" maxlength="20" placeholder="请输入6-20位密码"
					 placeholder-class="placeholder" value="" />
					<view class="eye" @click="isOpen=!isOpen">
						<text class="iconfont" v-if="isOpen">&#xe681;</text>
						<text class="iconfont" v-else>&#xe663;</text>
					</view>
				</view>
			</form>
			<view class="btn">
				登录
			</view>
			<view class="link">
				<navigator url="../index/index">找回密码</navigator>
			</view>
			<view class="other">
				<view class="p">
					其他登录方式
				</view>
				<view class="link">
					<navigator url="../login/login">微信登录</navigator>
					<navigator url="../index/index">注册</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// 表单数据
				info: {
					mobile: "", // 手机号码
					password: "" // 密码
				},
				isOpen: false // 密码眼睛是不是开着
			};
		},
		methods: {
			...mapMutations(['login']),
			// 检验输入的数据
			chechInfo() {
				if (!this.$config.reg.mobileReg.test(this.info.mobile)) {
					uni.showToast({
						icon: "none",
						title: '请输入正确的手机号码',
						duration: 2000
					})

					return false
				}

				if (!this.$config.reg.passwordReg.test(this.info.password)) {
					uni.showToast({
						icon: "none",
						title: '请输入6-20位密码',
						duration: 2000
					})

					return false
				}
				return true
			},
			// 登录
			login() {
				if (!this.chechInfo()) {
					return false
				}

				this.$public.API_GET({
					url: "loginWithPwd",
					data: {
						mobile: this.info.mobile,
						pwd: this.info.password
					},
					success: (res) => {
						console.log(res)
						if (!res.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							});
							return false;
						}

						this.login(res.data.data);
					}
				});
			},
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';
	.loginMobile {
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
		}

		.link {
			width: 80%;
			margin: 24upx auto 0;
			display: flex;
			justify-content: space-between;
			font-size: 28upx;
		}

		.form {

			.section {
				width: 80%;
				margin: 0 auto;
				position: relative;
				border-bottom: 1px solid $borderColor;
				background-repeat: no-repeat;
				background-position: left center;
				background-size: pxToUpx(48);

				input {
					position: relative;
					z-index: 0;
					width: 100%;
					height: pxToUpx(60);
					padding-left: pxToUpx(68);
					font-size: pxToUpx(30);
					margin: pxToUpx(25) 0;
				}

				&:first-child {
					margin-top: 156upx;
				}
			}

			.font {
				position: absolute;
			}

			.eye {
				position: absolute;
				right: 24upx;
				top: 0;
				z-index: 10;
				width: pxToUpx(60);
				height: 100%;
			}
		}

	}
</style>
