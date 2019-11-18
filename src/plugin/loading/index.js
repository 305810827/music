import loadingCompnent from './loading.vue';
let $load;
export default { 
	install(Vue,options){
		if(!$load){
			let loadPlugin = Vue.extend(loadingCompnent);
			$load = new loadPlugin({
				
			}).$mount();
		}
		
		let loadingFun = {
			show(){
				$load.isShow = true;
				document.body.appendChild($load.$el)
			},
			hide(){
				$load.isShow = false;
			}
		}
		
		if(!Vue.$loading){
		    Vue.$loading = loadingFun
		}
		Vue.mixin({
		    created(){
		        this.$loading = Vue.$loading;
		    }
		})
		
		//2
		// Vue.prototype.$loading = loadingFun;
	}
}