;(function(){
	$.fn.drapload=function(option){
		return new Drapload(this,option);
	}
	var Drapload=function(ele,option){
		//判断是否在执行动画
		this.loading=false;
		//判断是否有动画的盒子
		this.insterDom=false;
		//最外面的大盒子
		this.ele=$(ele);
		//内容盒子
		this.scrollbox=this.ele.find("div");
		this.init(option)
		
	}
	Drapload.prototype.init=function(option){
		var _this=this,
			defaults={
				domUp:{
					domClass:"drapload-up",
					domRefresh:"<div class='drapload-refresh'>↓下拉刷新</div>",
					domUpdate:"<div class='drapload-update'>↑释放更新</div>",
					domLoad:"<div class='drapload-load'>加载中。。。。</div>"
				},
				domDown:{
					domClass:"drapload-down",
					domRefresh:"<div class='drapload-refresh'>↑上拉加载更多</div>",
					domUpdate:"<div class='drapload-update'>↓释放加载</div>",
					domLoad:"<div class='drapload-load'>加载中。。。。</div>"
				},
				distance:50,
				loadUpFn:null,
				loadDownFn:null

			};
		_this.opt=$.extend({},defaults,option);
        //console.log(_this.opt)
		
		//手指触摸
		_this.ele.on("touchstart",function(e){
			//如果没有动画   才执行
			if(!_this.loading){
				startFn(e,_this)
			}
		})
		//手指移动
		_this.ele.on("touchmove",function(e){
			//如果没有动画   才执行
			if(!_this.loading){
				moveFn(e,_this)
			}
		})
		//手指离开
		_this.ele.on("touchend",function(e){
			endFn(e,_this)
		})
	}
	
	var startFn=function(e,_this){
			// 记录按下的位置
			_this._startY=e.touches[0].clientY;
			// 大盒子的高
			_this._loadHeight=_this.ele.height();
			//内容盒子的高
			_this._childrenHeight=_this.ele.children(".scroll").height();
			//大盒子滚动条位置
			_this._scrollTop=_this.ele.scrollTop();
		},
		moveFn=function(e,_this){
			//大盒子滚动条位置
			_this._scrollTop=_this.ele.scrollTop();
			//记录移动位置
			_this._curY=e.touches[0].clientY;
			//计算移动距离
      		_this._moveY=_this._curY-_this._startY;
      		//判断上滑下滑   存在_this.direction里
		  	if(_this._moveY>0){
				_this.direction='down';
			}else{
				_this.direction='up';
			}
			var domup=_this.opt.domUp,
				domdown=_this.opt.domDown,
				upClass=domup.domClass,
				upRefHtml=domup.domRefresh,
				upUpdateHtml=domup.domUpdate,
				upLoadHtml=domup.domLoad,
				downClass=domdown.domClass,
				downRefHtml=domdown.domRefresh,
				downUpdateHtml=domdown.domUpdate,
				downLoadHtml=domdown.domLoad;
			
			//取出移动距离的绝对值
			var _absMoveY=Math.abs(_this._moveY);
			
			//如果滚动条距离等于0  并且  手指往下移动   并且  有往下滑的回调函数    
			if(_this._scrollTop<=0 && _this.direction=='down' && _this.opt.loadUpFn){
				_this.$downdom=$("."+upClass);
				e.preventDefault()
				//如果没有提示的盒子
				if(!_this.insterDom){
					//创建一个盒子   添加到大盒子前面
					$('<div class="'+upClass+'"></div>').prependTo(_this.ele);
					//_this.insterDom 设置为true
					_this.insterDom=true;
				}
				//如果移动距离小于设置的高度
				if(_absMoveY<_this.opt.distance){
					//让_this.offsetY强制等于移动距离
					_this.offsetY=_absMoveY;
					//提示下拉刷新
					_this.$downdom.html(upRefHtml)
				}else if(_absMoveY>_this.opt.distance && _absMoveY<_this.opt.distance*2){
					//如果移动距离大于设置的距离   并且  小于设置距离的2倍
					
					//让_this.offsetY等于后面的值    (后面的值不是绝对的    凭自己的感觉设置)
					_this.offsetY=_this.opt.distance+(_absMoveY-_this.opt.distance)*0.5
					//提示释放更新
					_this.$downdom.html(upUpdateHtml)
				}else{
					//如果移动距离大于设置的距离的2倍
					
					//让_this.offsetY等于后面的值    (后面的值不是绝对的    凭自己的感觉设置)
					_this.offsetY= _this.opt.distance+_this.opt.distance*0.5+(_absMoveY-_this.opt.distance*2)*0.2;
					//里面还是释放更新
					_this.$downdom.html(upUpdateHtml)
				}
				
				//让提示盒子的高等于  _this.offsetY 的高
				_this.$downdom.height(_this.offsetY+"px")
			}
			
			//如果有回调函数  并且  手指往上移动   并且   内容盒子小于等于(滚动条高度+大盒子高度)
			if(_this.opt.loadDownFn && _this.direction=='up' && _this._childrenHeight<=(_this._loadHeight+_this._scrollTop)){
				_this.$updom=$("."+downClass);
				e.preventDefault()
				//如果_this.insterDom为false   说明页面内没有提示盒子
				if(!_this.insterDom){
					//创建一个提示盒子   添加到大盒子后面
					$('<div class="'+downClass+'"></div>').appendTo(_this.ele);
					//_this.insterDom设置为false
					_this.insterDom=true;
				}
				
				//如果移动距离小于设置的高度
				if(_absMoveY<_this.opt.distance){
					//让_this.offsetY强制等于移动距离
					_this.offsetY=_absMoveY;
					//提示上拉更新
					_this.$updom.html(downRefHtml)
				}else if(_absMoveY>_this.opt.distance && _absMoveY<_this.opt.distance*2){
					//如果移动距离大于设置的距离   并且  小于设置距离的2倍
					
					//让_this.offsetY等于后面的值    (后面的值不是绝对的    凭自己的感觉设置)
					_this.offsetY=_this.opt.distance+(_absMoveY-_this.opt.distance)*0.5
					//提示释放更新
					_this.$updom.html(downUpdateHtml)
				}else{
					//如果移动距离大于设置的距离的2倍
					
					//让_this.offsetY等于后面的值    (后面的值不是绝对的    凭自己的感觉设置)
					_this.offsetY= _this.opt.distance+_this.opt.distance*0.5+(_absMoveY-_this.opt.distance*2)*0.2;
					//里面还是释放更新
					_this.$updom.html(downUpdateHtml)
				}
				//让提示盒子的高等于  _this.offsetY 的高
				_this.$updom.height(_this.offsetY+"px");
				//让滚动条高度等于    滚动条高度+_this.offsetY 的高
				_this.ele.scrollTop(_this.offsetY+_this._scrollTop)
			}
		},
		endFn=function(e,_this){
			
			
			//如果_this.insterDom为真   说明页面有提示盒子   执行下面代码
			if(_this.insterDom){
				//取移动距离的绝对值
				var moveY=Math.abs(_this._moveY)
				
				//判断_this.direction
				if(_this.direction=='down'){
					//如果是down  往下拉
					
					//_this.domResult 为下拉的提示盒子
					_this.domResult=_this.$downdom;
					//_this.loadHtml  为下拉的加载动画
					_this.loadHtml=_this.opt.domUp.domLoad;
				}else{
					//往上拉
					
					//_this.domResult 为上拉的提示盒子
					_this.domResult=_this.$updom;
					//_this.loadHtml  为上拉的加载动画
					_this.loadHtml=_this.opt.domDown.domLoad;
				}
				
				fnTransition(_this.domResult,0.3)
				//如果移动距离小于你设置的值    不执行任何代码
				if(moveY<=_this.opt.distance){
					//让提示盒子高等于0    动画结束后  
					_this.domResult.height(0).on("webkitTransitionEnd",function(){
						//删除提示盒子
						_this.domResult.remove()
						//_this.insterDom   说明当前没有动画在执行
						_this.insterDom=false;
					})
				}else{
					//否则移动距离大于设置的值
					_this.loading=true;
					//高等于设置的值
					_this.domResult.height(_this.opt.distance)
					//提示盒子显示加载动画
					_this.domResult.html(_this.loadHtml)
					//执行回调函数
					fnCallback(_this)
				}
			}
			
		}
	
	function fnTransition(dom,num){
		dom.css({
			"-webkit-transition":"all "+num+"s"
		})
	}
	function fnCallback(_this){
		//判断上拉下拉
		if(_this.direction=='down'){
			//执行下拉回调函数
			_this.opt.loadUpFn(_this)
		}else{
			//执行上拉回调函数
			_this.opt.loadDownFn(_this)
		}
	}
})(Zepto)

/*there are two goals the normalization process:eliminate redundant data(for example storing the same data more than one table) and ensure data dependencies make sense (only storing related data table) Both these are worthy goals as they reduce the amount of space database consumes and ensure that data is logically stored 

the database community has developed series guidelines for ensuring that databases are normalized these are referred to as normal forms and are numbered from one (the lowest form normalization referred to as fist normal form 1NF) through five (fifth  normal  form 5NF) practical applications you'll often see 1NF 2NF and 3NF alone with the occasional 4NF fifth normal form very rarely seen and won't be discussed this article

systems continue grow size and complexity becoming increasingly difficult to understand As improvements coding tools allow software developers to produce larger amounts of software meet ever-expanding user requirements method to understand and communicate that size must be used structured technique problem solving function point analysis is a method break systems into smaller components so they can be better understood and analyzed this book describes function point analysis and industry trends using function points*/



