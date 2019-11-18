<template>
	<div id="app">
		<!-- <router-link to="/">login</router-link> | -->
		<audio id="myAudio" @timeupdate="timeProgress" @canplay="play" @ended="end" :src="`https://music.163.com/song/media/outer/url?id=${this.$store.state.songId}.mp3`"
		 autoplay="autoplay" muted></audio>
		<router-view />
	</div>
</template>
<script>
	import {mapState} from 'vuex';
	import {mapMutations} from 'vuex';
	export default {
		name: 'app',
		data() {
			return {
			}
		},
		methods: {
			...mapMutations(['setDuration','addIndex','setCurrentTime','setPlayIndex','playSong','setPlayList']),
			//播放器开始播放时需要执行的方法
			play() {
				this.setDuration(document.getElementById('myAudio').duration)
			},
			//播放器结束播放时需要执行的方法
			end() {
				this.playIndex < this.playList.length-1 ? this.addIndex() : this.setPlayIndex(0);
				this.playSong();
			},
			//播放器监听播放过程需要执行的方法
			timeProgress(){
				if(this.isDrag) return;
				this.setCurrentTime(document.getElementById('myAudio').currentTime);
			}
		},
		mounted() {
			//请求查询登录状态
			this.$axios.get('/login/status').then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
				localStorage.removeItem('user');
				this.$router.push({
					name: 'login'
				});
			})
			
			this.setPlayList(JSON.parse(localStorage.getItem('playList')));
			this.setPlayList(JSON.parse(localStorage.getItem('playIndex')));
		},
		created(){
			// this.setPlayList(JSON.parse(localStorage.getItem('storeState')));
			// this.setPlayIndex(0);
			// localStorage.getItem('stateInfo') && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem('stateInfo'))))
			// window.addEventListener('beforeunload',()=>{
			// 	localStorage.setItem('stateInfo',JSON.stringify(this.$store.state))
			// })
		},
		computed: {
			...mapState(['status','changeCurTime','isDrag','duration','playIndex','playList']),
			switchBtn() {
				return this.status;
			},
			changeCurTimeF(){
				return this.changeCurTime;
			},
			
		},
		watch: {
			//监听播放状态
			switchBtn: function(newVal, oldVal) {
				let src = document.getElementById('myAudio').src;
				let start = src.slice(src.search('='));
				let end = start.search('.');
				//歌曲ID为0时 返回
				console.log(start.slice(0,end));
				if(start.slice(0,end) == 0) return;
				if (newVal) {
					console.log(document.getElementById('myAudio').src);
					document.getElementById('myAudio').play();
				} else {
					console.log('pause');
					document.getElementById('myAudio').pause();
				}
			},
			//监听是否改变了播放进度的当前播放时间
			changeCurTimeF: function(newVal, oldVal){
				if(this.isDrag) return;
				document.getElementById('myAudio').currentTime = (this.changeCurTime / 100) * this.duration;
			}
		},
	}
</script>

<style>
	* {
		padding: 0px;
		margin: 0px;
		font-family: "微软雅黑", 'Microsoft YaHei';
	}
	ul,li {
		list-style: none;
	}

	html,
	body {
		height: 100%;
	}

	body {
		min-width: 320px;
		max-width: 640px;
		margin: 0px auto;
	}
	#app {
		height: 100%;
	}
	.container {
		margin: 0px auto;
		height: 100%;
	}
	/* 顶部搜索 */
	.top {
		height: 42px;
		background-color: white;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0px 5px;
	}

	.top>span {
		height: 42px;
		font-size: 25px;
		color: black;
		line-height: 42px;
	}

	.top>input {
		width: 75%;
		height: 33px;
		padding: 0px 15px;
		background-color: #f7f7f7;
		font-size: 18px;
		color: #c8c8c8;
		line-height: 42px;
		border: none;
		outline: none;
		border-radius: 15px;
	}
	/* 底部导航 */
	.tabBox {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 999;
	}
	.bottomTab {
		height: 60px;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 999;
	}
	.bottomTab ul {
		display: flex;
		justify-content: space-around;
	}

	.bottomTab ul li {
		display: inline-block;
		text-align: center;
	}

	.bottomTab ul li span {
		display: inline-block;
		width: 28px;
		height: 28px;
		font-size: 20px;
		color: #666666;
		line-height: 28px;
	}

	.bottomTab ul li:first-child span {
		border-radius: 50%;
		background-color: #ff4c42;
		color: white;
		text-align: center;
	}

	.bottomTab ul li p {
		font-size: 12px;
		color: #666666;
	}

	@media (max-width: 390px) {
		.tabBox {
			width: 390px;
		}
	}

	@media (min-width: 640px) {
		.tabBox {
			width: 640px;
		}
	}
	
</style>
