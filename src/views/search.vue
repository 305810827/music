<template>
	<div class="container">
		<div class="top">
			<span class="iconfont icon-back" @click="back"></span>
			<input placeholder="点击我搜索" v-model="message" />
			<span class="iconfont icon-sousuo" @click="search"></span>
		</div>
		<div class="song-sheet">
			<div class="sheet-top">
				<div>
					<span>单曲</span>
					<span>搜索共{{songCount}}首</span>
				</div>
				<div>
					<span>播放全部</span>
				</div>
			</div>
			<ul class="sheet">
				<li v-for="(item,index) in songList" :key="index" @click="toPlay(item.id)">
					<div class="song-box">
						<div class="song-dec">
							<p>{{item.name}}</p>
							<span class="iconfont icon-dagou1"></span>
							<span v-for="(songer,songerIndex) in item.artists" :key="songerIndex">
								{{songer.name}}
								<span v-if="songerIndex !== (item.artists.length-1)">/</span>
							</span>
							<span>&nbsp;-&nbsp;{{item.album.name}}</span>
						</div>
					</div>
					<div class="song-icon"><span class="iconfont icon-shipin"></span><span class="iconfont icon-sandianshuzhuode"></span></div>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				songList: [],
				message: this.$route.params.message ? this.$route.params.message : 'yell',
				songCount: 0,
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			search() {
				// if(this.message)
				// {
					this.$axios.get('/search', {
						params: {
							keywords: this.message
						}
					}).then(res => {
						console.log(res);
						this.songList = res.data.result.songs;
						this.songCount = res.data.result.songCount;
						this.$loading.hide();
					}).catch(err => {
						console.log(err);
					})
				// }else{
				// 	this.$axios.get('/search/default')
				// 	.then(res => {
				// 		console.log(res);
				// 		// this.songList = res.data.result.songs;
				// 		// this.songCount = res.data.result.songCount;
				// 		this.$loading.hide();
				// 	}).catch(err => {
				// 		console.log(err);
				// 	})
				// }
				
			}
		},
		mounted() {
			console.log(this.$route.params.message);
			this.search()
			// this.$axios.get('/search', {
			// 	params: {
			// 		keywords: this.$route.params.message
			// 	}
			// }).then(res => {
			// 	console.log(res);
			// 	this.songList = res.data.result.songs;
			// 	this.songCount = res.data.result.songCount;
			// 	this.$loading.hide();
			// }).catch(err => {
			// 	console.log(err);
			// })
		},
		created() {
			this.$loading.show();
		}
	}
</script>

<style scoped>
	.song-sheet {
		margin-top: 10px;
		padding: 15px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: white;

	}

	.sheet-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		line-height: 30px;
	}

	.sheet-top div:first-child span {
		margin-right: 20px;
	}

	.sheet-top div:last-child span {
		margin-right: 20px;
		font-size: 20px;
	}

	.sheet {
		margin-top: 15px;
	}

	.sheet li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.song-box {
		display: flex;
		align-items: center;
	}

	.song-id {
		display: inline-block;
		color: #adacac;
		width: 30px;
	}

	.song-dec {
		display: inline-block;
	}

	.song-dec p {
		font-size: 22px;
	}

	.song-dec span {
		font-size: 16px;
		color: #adacac;
	}

	.icon-dagou1 {
		margin-right: 4px;
	}

	.song-icon span {
		color: #adacac;
		font-size: 22px;
		margin-left: 8px;
	}

	.icon-socre_active {
		color: red;
	}
</style>
