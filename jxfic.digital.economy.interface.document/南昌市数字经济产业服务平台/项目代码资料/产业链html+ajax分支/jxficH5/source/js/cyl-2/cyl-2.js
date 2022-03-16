$(function(){
	//物联网大数据切换
	let wrapper = document.querySelectorAll('.ant-radio-button-wrapper');
	let body = document.querySelectorAll('.all-body-left-body');
	$('.ant-radio-button-wrapper').click(function(){
		var index=$(this).index();
		$('.ant-radio-button-wrapper').removeClass('tradeNews');
		$(this).addClass('tradeNews');
		//切换下方四图
		$(".all-body-left-body").hide().eq(index).show();
		//切换两按钮
		$('.all-left-head-four').hide().eq(index).show();
	})
	
	//大数据四图五清单切换
	let wrapperTwo = document.querySelectorAll(".ant-radio-button-wrapperTwo");
	let imgAndinventory = document.querySelectorAll('.imgAndinventory');
	$(".all-left-head-four>label").click(function(){
		var index=$(this).index();
		$(".all-left-head-four>label").removeClass("tradeNumber");
		$(this).addClass("tradeNumber");
		//四图和清单切换
		$("#dom1>.imgAndinventory").hide().eq(index).show();
	})
	
	//物联网四图五清单切换
	let wrapperTwo2 = document.querySelectorAll(".ant-radio-button-wrapperTwo2");
	let imgAndinventory2 = document.querySelectorAll('.imgAndinventory2');
	$(".ant-radio-button-wrapperTwo2").click(function(){
		var index=$(this).index();
		$(".ant-radio-button-wrapperTwo2").removeClass("tradeNumber2");
		$(this).addClass("tradeNumber");
		//四图和清单切换
		$("#dom2>.imgAndinventory2").hide().eq(index).show();
	})
	
	
	
	
	
	//大数据四图切换
	let fourButton = document.querySelectorAll(".all-left-body-title-button");
	let imgs = document.querySelectorAll(".imgs");
	$('.all-left-body-title-button').click(function(){
		var index=$(this).index();
		$('.all-left-body-title-button').removeClass('clickB');
		$(this).addClass('clickB');
		//切换所选中的内容
		$(".all-left-body-tu-scrollTwo>.imgs").hide().eq(index).show();
	})
	//物联网四图切换
	let fourButton2 = document.querySelectorAll(".all-left-body-title-button2");
	let imgs2 = document.querySelectorAll(".imgs2");
	$('.all-left-body-title-button2').click(function(){
		var index=$(this).index();
		$('.all-left-body-title-button2').removeClass('clickB2');
		$(this).addClass('clickB2');
		//切换所选中的内容
		$(".imgs2").hide().eq(index).show();
	})
	
	
	
	
	//物联网-产业链图-感知层-点击显示
	
	$(".wlwrfc1").click(function(){
		var index=$(this).index();
		$(".sensor").addClass("appear");
	})
	
	//物联网-产业链图-网络层-点击显示
	$(".wlwrfc3").click(function(){
		var index=$(this).index();
		$(".network").addClass("appear");
	})
	//物联网-产业链图-平台层-点击显示
	$(".wlwrfc5").click(function(){
		var index=$(this).index();
		$(".podium").addClass("appear");
	})
	//物联网-产业链图-应用层-点击显示
	$(".wlwrfc7").click(function(){
		var index=$(this).index();
		$(".application").addClass("appear");
	})
	
	$("#zdxmqd").on("click",function(){
		layer.open({
			type:2,
			shade: 0.1,
			title: false, //不显示标题
			area: ['90%', '90%'], //宽高
			content: "cyl-2-zdxmqd.html",
			// content:[],
			cancel: function(){
			}
		})
	})

	$("#zcqd").on("click",function(){
		layer.open({
			type:2,
			shade: 0.1,
			title: false, //不显示标题
			area: ['90%', '90%'], //宽高
			content: "cyl-2-zcqd.html",
			// content:[],
			cancel: function(){
			}
		})
	})
	
})

