var Slide = {
	createNew: function (argument) {//通过调用此方法创建一个新对象并返回该对象从而创建一个类
		var slide = {};
		slide.slide_wrap = "";
		slide.slide_item = "";
		slide.slide_ctrl = "";
		slide.slide_ctrl_wrap = "";
		slide._prev = "";
		slide._next = "";
		slide.wrap_w = "";
		slide.move_w = "";
		slide.active_index = 0;
		slide.ctrl_wrap_move = 0;
		slide.init = function (argument) {
			this.wrap_w = this.slide_item.length*this.slide_item.width();//内容宽度设置
			this.move_w = parseInt(this.slide_wrap.css("margin-left"));//切换一个版面的绝对位移
			this.slide_wrap.width(this.wrap_w);
			$(this.slide_item[this.active_index]).addClass("active_slide");
		};
		slide.addCtrlItem = function (argument) {
			var obj = this;
			var ctrl_item = "";
			for (var i = 0; i < obj.slide_item.length; i++) {
				ctrl_item += '<span class="ctrl_item">'+(i+1)+'</span>';
			};
			obj.slide_ctrl_wrap.html(ctrl_item);
			var item = $(".ctrl_item");
			var item_w = item.width();
			var item_margin = parseInt(item.css("margin-left")) + parseInt(item.css("margin-right"));
			item.each(function (i) {
				if (i == obj.active_index) {
					$(this).addClass("ctrl_item_active").siblings().removeClass("ctrl_item_active");
					$(this).next().addClass("ctrl_item_next").siblings().removeClass("ctrl_item_next");
					$(this).prev().addClass("ctrl_item_prev").siblings().removeClass("ctrl_item_prev");
				};
			})
			var ctrl_w = (item_w + item_margin) * obj.slide_item.length;
			obj.slide_ctrl_wrap.width(ctrl_w);
			if (ctrl_w < obj.slide_ctrl.width()) {
				obj.slide_ctrl_wrap.css("margin","0 auto");
			};
		};
		slide.ctrlItem = function (argument) {
			var obj = this;
			$(".ctrl_item").each(function (i) {
				$(this).css("cursor","pointer");
				$(this).click(function (argument) {
					$(this).addClass("ctrl_item_active").siblings().removeClass("ctrl_item_active");
					$(this).next().addClass("ctrl_item_next").siblings().removeClass("ctrl_item_next");
					$(this).prev().addClass("ctrl_item_prev").siblings().removeClass("ctrl_item_prev");
					obj.slide_item.each(function (j) {
						if ($(this).hasClass("active_slide")) {
							obj.move_w = obj.move_w - 600*(i-j);
							obj.slide_wrap.css("margin-left",obj.move_w+"px");
							$(obj.slide_item[i]).addClass("active_slide").siblings().removeClass("active_slide");
							obj.active_index = i;
						};
					})
				})
			})	
		};
		slide.toPrev = function (argument) {
			var obj = this;
			var item_w = parseInt($(".ctrl_item").width()),
				item_margin = parseInt($(".ctrl_item").css("margin-left")) + parseInt($(".ctrl_item").css("margin-right"));
			var ctrl_item_move = item_w + item_margin;
			var num = 0;
			this._prev.bind('click',function (argument) {
				if (obj.active_index === 0) {
					alert("前面没有了");
				}else{
					obj.active_index --;
					obj.move_w = obj.move_w + 600;
					obj.slide_wrap.css("margin-left",obj.move_w+"px");
					$(obj.slide_item[obj.active_index]).addClass("active_slide").siblings().removeClass("active_slide");
					$(".ctrl_item_prev").addClass("ctrl_item_active").removeClass("ctrl_item_prev").siblings().removeClass("ctrl_item_active");
					$(".ctrl_item_active").next().addClass("ctrl_item_next").siblings().removeClass("ctrl_item_next");
					$(".ctrl_item_active").prev().addClass("ctrl_item_prev").siblings().removeClass("ctrl_item_prev");
					var item_left = $(".ctrl_item_active").position();
					if (item_left.left < ctrl_item_move) {
						obj.ctrl_wrap_move += ctrl_item_move;
						obj.slide_ctrl_wrap.css("margin-left",obj.ctrl_wrap_move +"px");
					};
				}
			})
		};
		slide.toNext = function (argument) {
			var obj = this;
			var item_w = parseInt($(".ctrl_item").width()),
				item_margin = parseInt($(".ctrl_item").css("margin-left")) + parseInt($(".ctrl_item").css("margin-right"));
			var ctrl_item_move = item_w + item_margin;
			var slide_ctrl_w = obj.slide_ctrl.width();
			var num = 0;
			this._next.click(function (argument) {
				if (obj.active_index === obj.slide_item.length-1) {
					alert("后面没有了");
				}else{
					obj.active_index ++;
					obj.move_w = obj.move_w - 600;
					obj.slide_wrap.css("margin-left",obj.move_w+"px");
					$(obj.slide_item[obj.active_index]).addClass("active_slide").siblings().removeClass("active_slide");
					$(".ctrl_item_next").addClass("ctrl_item_active").removeClass("ctrl_item_next").siblings().removeClass("ctrl_item_active");
					$(".ctrl_item_active").next().addClass("ctrl_item_next").siblings().removeClass("ctrl_item_next");
					$(".ctrl_item_active").prev().addClass("ctrl_item_prev").siblings().removeClass("ctrl_item_prev");
					var item_left = $(".ctrl_item_active").position();
					if (item_left.left > (slide_ctrl_w - ctrl_item_move)) {
						obj.ctrl_wrap_move += ctrl_item_move*-1;
						obj.slide_ctrl_wrap.css("margin-left",obj.ctrl_wrap_move +"px");
					};
				}
			})
		};
		return slide;
	}
}