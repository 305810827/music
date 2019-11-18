<template>
	<div class="container">
		<div class="top">
			<span class="iconfont icon-back" @click="back"></span>
			<input placeholder="点击我搜索" v-model="message" />
			<span class="iconfont icon-sousuo" @click="search(message)"></span>
		</div>
		<div class="history">
			<div class="history-top">
				<h3>历史记录</h3>
				<span class="iconfont icon-lajitong"></span>
			</div>
			<div class="history-content">
				<span>野狼</span>
			</div>
		</div>
		<div class="hot-search-list">
			<h3 class="hot-search-top">
				热搜榜
			</h3>
			<ul class="hot-search-content">
				<li v-for="(item,index) in hotList" :key="index" @click="search(item.searchWord)">
					<div class="hot-search-song">
						<span class="song-id">{{index+1}}</span>
						<div class="song-dec">
							<p>{{item.searchWord}} <img v-if="item.iconType" :src="item.iconUrl"></p>
							<span>{{item.content}}</span>
						</div>
					</div>
					<div class="play-count"><span>{{item.score}}</span></div>
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
				hotList:[],
				message:'',
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			search(searchWord){
				this.$router.push({name:'search',params:{ message:searchWord }})
			}
		},
		computed: {
			
		},
		mounted() {
			this.$axios.get('/search/hot/detail').then(res=>{
				console.log(res);
				this.hotList = res.data.data
			}).catch(err=>{
				console.log(err);
			})
		},

	}
</script>

<style scoped>
	
	.history{
		padding:15px 20px;
	}
	.history-top{
		display: flex;
		justify-content: space-between;
	}
	.history-top span{
		font-size: 22px;
		color: #adacac;
	}
	.history-content{
		margin-top: 15px;
	}
	.history-content span{
		display: inline-block;
		width: 50px;
		height: 22px;
		background-color: #ccc;
		border-radius: 20px;
		line-height: 22px;
		text-align: center;
		color: #343331;
		padding: 3px;
	}
	
	.hot-search-list{
		margin-top: 5px;
		padding: 10px 20px;
	}
	.hot-search-top{
		height:30px;
		line-height: 30px;
	}
			
	.hot-search-content{
		margin-top: 10px;
	}
	
	.hot-search-content li{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.hot-search-song{
		display: flex;
		align-items: center;
	}
	.hot-search-list li:nth-child(-n+3) .song-id{
		color:red;
	}
	.song-id{
		color:#adacac;
	}
	
	.song-dec{
		margin-left: 15px;
	}
	.song-dec p{
		font-size:18px ;
	}
	.song-dec span{
		font-size: 12px;
		color: #adacac;
	}
	.song-dec img{
		width: 25px;
		
	}
	.play-count span{
		vertical-align: top;
		color: #adacac;
		font-size: 12px;
		margin-right: 10px;
	}
</style>
