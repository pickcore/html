$(function() {

	// slideBox部分的相关JS代码
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	$("#focus .btn span").css("opacity",0.4).mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
		
	}).eq(0).trigger("mouseenter");

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},3000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	function showPics(index) { //普通切换
		var p =  $("#focus ul li").eq(index);
		p.siblings().hide();
		p.show();
		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300)
		.eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}

	$(".boxRight-1").click(function(){
		$(this)			//为当前元素增加highlight类
			.children("a").show().end()			//将子节点的a元素显示出来并重新定位到上次操作的元素
		.siblings()		//获取元素的兄弟元素，并去掉他们的highlight类
			.children("a").hide();				//将兄弟元素下的a元素隐藏
	});


})