<template>
	<div class="container">
		<div class="top">
			<span class="iconfont icon-back" @click="back"></span>
			<p>手机号登录</p>
		</div>
		<div id="loginForm">
			<input type="tel" name="phone" placeholder="手机号" v-model="phone">
			<input type="password" name="password" placeholder="密码" v-model="password">
			<button type="button" @click="login">登录</button>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'login',
	  data(){
		  return {
			  phone:'15999966398',
			  password:'123456'
		  }
	  },
	  methods:{
		  back:function(){
			  this.$router.go(-1);
		  },
		  login(){
			  this.$axios.get(`/login/cellphone?phone=${this.phone}&password=${this.password}`).then(res => {
				  console.log(res);
				  if(res.status==200 && res.statusText=='OK'){
					  localStorage.setItem('user',JSON.stringify(res.data.account))
					  this.$router.push({path:'/index'})
				  }
			  }).catch(err=>{
				  console.log(err);
			  })
		  }
	  }
	}
</script>

<style scoped>
	
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
	#loginForm {
		width: 100%;
		margin: 50px auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	#loginForm input {
		display: block;
		width: 85%;
		box-sizing: border-box;
		padding: 5px 10px;
		margin: 15px auto;
		outline: none;
		border: none;
		border-bottom: 1px solid #e2e2e2;
	}
	#loginForm button {
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
</style>
