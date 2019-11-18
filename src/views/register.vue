<template>
	<div class="container">
		<div class="top">
			<span class="iconfont icon-back" @click="back"></span>
			<p>手机号注册</p>
		</div>
		<form id="registerForm" action="">
			<input type="tel" name="phone" placeholder="手机号">
			<div class="captcha"> 
				<input type="text" name="captcha" placeholder="验证码">
				<button type="button" onclick="countDown(this)">获取验证码</button>
				<span id="remainTime"></span>
			</div>
			<input type="password" name="password" placeholder="密码">
			<input type="text" name="nickname" placeholder="昵称">
			<button type="submit">注册</button>
		</form>
	</div>
</template>

<script>
	export default {
	  name: 'register',
	  methods:{
		  back:function(){
			  this.$router.go(-1);
		  }
	  }
	}
</script>

<style scoped>
	.container{
		background-color: white;
	}
	.top{
		height: 42px;
		background-color: white;
		text-align: center;
		position: relative;
	}
	.top>span{
		position: absolute;
		left: 15px;
		top:0px;
		font-size: 22px;
	}
	.top>p{
		width: 100%;
		height: 42px;
		font-size: 18px;
		color: black;
		line-height: 42px;
		text-align: center;
	}
	#registerForm {
		width: 100%;
		margin: 50px auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	#registerForm input {
		display: block;
		width: 85%;
		box-sizing: border-box;
		padding: 5px 10px;
		margin: 15px auto;
		outline: none;
		border: none;
		border-bottom: 1px solid #e2e2e2;
	}
	
	#registerForm>button {
		padding: 7px;
		margin: 15px auto;
		width: 85%;
		outline: none;
		border: none;
		background-color: #fc4233;
		color: white;
		font-size: 16px;
		border-radius: 15px;
	}
	.captcha{
		display: flex;
		
		width: 85%;
		margin: 15px auto;
	}
	#registerForm input[name='captcha']{
		display: inline-block;
		flex:3;
	} 
	.captcha button[type="button"]{
		width: 50px;
		height: 40px;
		outline: none;
		border: none;
		background-color: #fc4233;
		color: white;
		border-radius: 15px;
		flex:1;
		font-size: 12px;
	}
</style>
