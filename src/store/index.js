import Vue from 'vue'
import Vuex from 'vuex'
import formatTime from '../assets/js/formatTime.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		playList: [],   //歌单列表
		songId:0,       //播放的歌曲ID
		playIndex:0,    //播放的歌曲索引
		status:false,   //播放状态
		currentTime:0,  //当前歌曲已播时长
		duration:0,     //当前歌曲总时长
		changeCurTime:0,//改变后的当前歌曲已播时长
		isDrag:false,   //滑块是否在拖动
	},
	getters:{
		formatDurationTime(state){
			return formatTime(state.duration);
		},
		formatCurrentTime(state){
			return formatTime(state.currentTime);
		}
	},
	mutations: {
		//设置歌曲下标索引
		setPlayIndex(state,curIndex){
			state.playIndex = curIndex;
			// state.songId=state.playList[state.playIndex].id;
		},
		//歌曲下标索引++
		addIndex(state){
			state.playIndex++;
			// state.songId=state.playList[state.playIndex].id;
		},
		//歌曲下标索引--
		reduceIndex(state){
			state.playIndex--;
			// state.songId=state.playList[state.playIndex].id;
		},
		//设置当前歌单
		setPlayList(state,list){
			state.playList=list;
			// localStorage.setItem('playList',JSON.stringify(state.playList));
			// localStorage.setItem('playIndex',JSON.stringify(state.playIndex));
		},
		//播放歌曲
		playSong(state) {
			state.songId=state.playList[state.playIndex].id;
			state.status=true;
		},
		//设置当前播放状态
		setStatus(state,flag){
			state.status = flag;
		},
		//设置当前歌曲已播放时长
		setCurrentTime(state,curTime){
			state.currentTime = curTime;
		},
		//设置当前歌曲总时长
		setDuration(state,duration){
			state.duration = duration;
		},
		//通过点击进度条改变当前歌曲已播放时长
		setChangeCurTime(state,changeCurTime){
			state.changeCurTime = changeCurTime;
		},
		//设置滑块是否在拖动状态
		setIsDrag(state,flag){
			state.isDrag = flag;
		}
	},
	actions: {},
	modules: {}
})
