/*左边数据接口*/
//选择地区
var AREA = "360100";
//选择年度
var myDate = new Date();
var YEAR = myDate.getFullYear()+"";
//铸链等参数
var BQ_JZZS = "";
//产业链ID
var PARENT_DL = "ZK01";
var CONDITION ="a.VENDINC";
$(function () {
    //获取顶层产业链
    etTopIndustrialChains();
    //获取年度列表
    getYears();
	//四图,产业链图获取
	getIndustryChainDatas();
    //监听下拉框选择
    $(document).on("change","#infoType",function(){
        let id = $(this).val();
        PARENT_DL = id;
        //产业链主体数据
        //getDataLayers(YEAR,AREA,PARENT_DL);
        queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);//渲染企业列表
    });

    $("#nc-scroll").scroll(function () {
    });
	
	
	//排他

	let tag = document.querySelectorAll(".tag");
	tag.forEach(function(item){
		item.onclick=function(){
			for(let i = 0; i<tag.length;i++){
				tag[i].classList.remove('active');
			}
			this.classList.add('active');
			if(this.classList[1] == 'a'){
				CONDITION = "a.VENDINC";
			}else if(this.classList[1] == 'b'){
				CONDITION = "a.RATGRO";
			}else if(this.classList[1] == 'd'){
                CONDITION = "a.NETINC";
            }else{
				CONDITION = "a.EMPNUM";
			};
			queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);//渲染企业列表
		}
	});

})


//头部地区切换按钮
function qhArea(obj,area) {
    AREA = area;
    queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);//渲染企业列表
    //根据地区切换产业链数据
    //getDataLayers(YEAR,AREA,PARENT_DL);
	//根据地区切换下拉框
	etTopIndustrialChains(YEAR,AREA);

    // $(".ant-radio-button-wrapper").removeClass("tradeNews");
    // $(obj).addClass("tradeNews");
	
    // var text = $(obj).children("span")[0].innerText;
    getYears();
}
// //头部企业类型切换按钮
// function qylxqh(obj,CHAIN_ID,widthData) {
//     $(".all-left-body-tu").width(widthData);
//     $(".all-left-body-tu-all").hide();
//     $(".all-left-body-title-button").removeClass("clickB");
//     $(obj).addClass("clickB");
//     var CHAIN_NAME = $(obj).children("span").html();
//     $(".all-left-body-wz-span").html(typeof (CHAIN_NAME) == "undefined"? "暂无":CHAIN_NAME +"：暂无。");
//     $(".all-left-body-tu-"+CHAIN_ID).show();
// }
function qhl(obj,name,type) {
    BQ_JZZS=type;
    let labImg = $(".ent-list-info-div-left>label>img")
    for (let i = 0; i < labImg.length; i++) {
        let img = $(labImg[i]).attr("src");
        var imgName = labImg.eq(i).data("name");
        if(imgName != name){
            $(labImg[i]).attr("src","../../source/img/"+imgName+"_wx.png");
        }
    }
    let src = $(obj).children("img").attr("src");
    let srcSplit = src.split("_");
    if(srcSplit.length>1 && srcSplit[1] == "xz.png"){
        $(obj).children("img").attr("src","../../source/img/"+name+"_wx.png");
        queryRank(AREA,YEAR,PARENT_DL,"",CONDITION);//渲染企业列表
    }else if(srcSplit.length>1 && srcSplit[1] != "xz.png"){
        $(obj).children("img").attr("src","../../source/img/"+name+"_xz.png");
        queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);//渲染企业列表
    }
}

//获取年度列表
function getYears(){
    var datas = {};
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industrialChainController/getYears',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
			
            var jsonText = JSON.parse(text);
            // console.log(jsonText)
            var yearList = jsonText.data.yearList
            var yearListSort = yearList.sort();
            let max = parseInt(yearListSort[yearListSort.length-1]);
            let min = parseInt(yearListSort[0]);
            let yearArray = yearListSort;
            layui.use('slider', function(){
                var slider = layui.slider;
                //渲染
                slider.render({
                    elem: '#slideTest1',  //绑定元素
                    theme:"#05a9b9",
                    showstep:true,
                    min:min,
                    max:max,
                    value:YEAR,
                    tips:true,
                    change: function(value){
                        YEAR = value.toString();
                        //根据年度切换产业链数据
                        //getDataLayers(YEAR,AREA,PARENT_DL);
                        queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);//渲染企业列表
                        for (let i = value; i >=min ; i--) {
                            $("#slider-"+i).addClass("sliderStyle");
                        }
                        for (let i = max; i >value ; i--) {
                            $("#slider-"+i).removeClass("sliderStyle");
                        }
                    }
                });
                var html = "";
                for (let i = 0; i < yearArray.length; i++) {
                    if(i==0){
                        html += "<div class=\"layui-slider-tips-new sliderStyle\" id='slider-"+yearArray[i]+"' style=\"left: "+(i*25)+"%;display: inline-block;\">"+yearArray[i]+"</div>";
                    }else{
                        html += "<div class=\"layui-slider-tips-new\" id='slider-"+yearArray[i]+"' style=\"left: "+(i*25)+"%;display: inline-block;\">"+yearArray[i]+"</div>";
                    }
                }
                $("#slideTest1>.layui-slider").append(html);
                $("#slider-"+YEAR).addClass("sliderStyle");
            });
        }
    })
}

//获取右上下拉框数据
function etTopIndustrialChains(obj,PARENT_DL) {
    var datas = {};
    datas.YEAR=YEAR;
    datas.AREA=AREA;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industrialChainController/getTopIndustrialChains',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            var jsonText = JSON.parse(text);
            var topIndustrialChains = jsonText.data.topIndustrialChains;
            // let html = "";
            // for (let i = 0; i < topIndustrialChains.length; i++) {
            //     var  CHAIN_NAME = topIndustrialChains[i].CHAIN_NAME;
            //     if(CHAIN_NAME.length>6){
            //         CHAIN_NAME = CHAIN_NAME.substr(0,3)+"..."+CHAIN_NAME.substr(CHAIN_NAME.length-3,CHAIN_NAME.length);
            //     }
            //     if(i == 0){
            //         html += '<option title="'+topIndustrialChains[i].CHAIN_NAME+'" value="'+topIndustrialChains[i].PARENT_DL+'" selected>'+CHAIN_NAME+'</option>';
            //     }else{
            //         html += '<option title="'+topIndustrialChains[i].CHAIN_NAME+'" value="'+topIndustrialChains[i].PARENT_DL+'" >'+CHAIN_NAME+'</option>';
            //     }
            // }
			console.log(topIndustrialChains);
            // $("#infoType").html(html);
			// console.log(jsonText.data.topIndustrialChains[0].CHAIN_NAME);
			$('#dataComputing').html(jsonText.data.topIndustrialChains[0].CHAIN_NAME);
			$('#webThings').html(jsonText.data.topIndustrialChains[5].CHAIN_NAME);
            // PARENT_DL = topIndustrialChains[0].PARENT_DL;
            //产业链主体数据
            // getDataLayers(YEAR,AREA,PARENT_DL);
			queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);
        }
    })
}


//四图产业链图获取
function getIndustryChainDatas(){
	let hardOne = document.getElementById('#hardOne');
	var datas = {};
	datas.YEAR=YEAR;
	datas.AREA=AREA;
	datas.PARENT_DL=PARENT_DL;
	$.ajax({
		type: 'POST',
		url : BASE_URL+'/industrialChainController/getIndustryChainDatas',
		data:{
		    param:JSON.stringify(datas)//参数
		},
		success:function(text){
			let jsonText = JSON.parse(text); 
			let data = jsonText.data;
			// console.log(jsonText);
			// console.log(jsonText.data);
			$('#hardOne').append(jsonText.data[0].CHAIN_LINK_NAME+"("+jsonText.data[0].SUMS+")");
			setClick('#hardOne',jsonText.data[0].CHAIN_LINK_NAME);
			$('#hardTwo').append(jsonText.data[1].CHAIN_LINK_NAME+"("+jsonText.data[1].SUMS+")");
			setClick('#hardTwo',jsonText.data[1].CHAIN_LINK_NAME);
			$('#hardThree').append(jsonText.data[2].CHAIN_LINK_NAME+"("+jsonText.data[2].SUMS+")");
			setClick('#hardThree',jsonText.data[2].CHAIN_LINK_NAME);
			$('#hard1One').append(jsonText.data[3].CHAIN_LINK_NAME+"("+jsonText.data[3].SUMS+")");
			setClick('#hard1One',jsonText.data[3].CHAIN_LINK_NAME);
			$('#hard1Two').append(jsonText.data[4].CHAIN_LINK_NAME+"("+jsonText.data[4].SUMS+")");
			setClick('#hard1Two',jsonText.data[4].CHAIN_LINK_NAME);
			$('#hard1Three').append(jsonText.data[5].CHAIN_LINK_NAME+"("+jsonText.data[5].SUMS+")");
			setClick('#hard1Three',jsonText.data[5].CHAIN_LINK_NAME);
			$('#hard1Four').append(jsonText.data[6].CHAIN_LINK_NAME+"("+jsonText.data[6].SUMS+")");
			setClick('#hard1Four',jsonText.data[6].CHAIN_LINK_NAME);
			$('#hard2One').append(jsonText.data[7].CHAIN_LINK_NAME+"("+jsonText.data[7].SUMS+")");
			setClick('#hard2One',jsonText.data[7].CHAIN_LINK_NAME);
			
			var htmlData0 = '';
			var some0 = jsonText.data[0].entList;
			for(let a=0;a<some0.length;a++){
				var bbb = some0[a];
				htmlData0 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#bodyOne').html(htmlData0);
			
			var htmlData1 = '';
			var some1 = jsonText.data[1].entList;
			for(let a=0;a<some1.length;a++){
				var bbb = some1[a];
				htmlData1 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#bodyTwo').html(htmlData1);
			
			var htmlData2 = '';
			var some2 = jsonText.data[2].entList;
			for(let a=0;a<some2.length;a++){
				var bbb = some2[a];
				htmlData2 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#bodyThree').html(htmlData2);
			//数量暂时为0；
			var htmlData3 = '';
			var some3 = jsonText.data[3].entList;
			for(let a=0;a<some3.length;a++){
				var bbb = some3[a];
				htmlData3 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#body1One').html(htmlData3);
			
			var htmlData4 = '';
			var some4 = jsonText.data[4].entList;
			for(let a=0;a<some4.length;a++){
				var bbb = some4[a];
				htmlData4 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#body1Two').html(htmlData4);
			
			var htmlData5 = '';
			var some5 = jsonText.data[5].entList;
			for(let a=0;a<some5.length;a++){
				var bbb = some5[a];
				htmlData5 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#body1Three').html(htmlData5);
			
			var htmlData6 = '';
			var some6 = jsonText.data[6].entList;
			for(let a=0;a<some6.length;a++){
				var bbb = some6[a];
				htmlData6 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#body1Four').html(htmlData6);
			
			var htmlData7 = '';
			var some7 = jsonText.data[7].entList;
			// console.log(some7)
			for(let a=0;a<some7.length;a++){
				var bbb = some7[a];
				htmlData7 += '<p onclick="tzQyhx(\''+bbb.PRIPID+'\',\''+bbb.REGNO+'\',\''+bbb.ENTNAME+'\')">'+bbb.ENTNAME+'</p>'
			}
			$('#imgsThreeBody').html(htmlData7);
		}
	})
	
}

//四图分页：具体产业环节下的企业获取（分页）
function setClick(id,obj){
	$(id).on("click",function(){
		getEnterpriseByChainIdList(obj);
	})
}

function getEnterpriseByChainIdList(obj){
	layer.open({
		type:2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['90%', '90%'], //宽高
		content: 'qylb2.html?PARENT_DL='+PARENT_DL+'&CHAIN_LINK_NAME='+obj,
		// content:[],
		cancel: function(){
		}
	})
}

//产业链主体数据
/*function getDataLayers(YEAR,AREA,PARENT_DL){
    var titleHtml = "";
    let lowerdataHtml = "";
    var datas = {};
    datas.YEAR=YEAR;
    datas.AREA=AREA;
    datas.PARENT_DL=PARENT_DL;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industrialChainController/getDataLayers',
        data:{
            param:JSON.stringify(datas)//参数
        },
        success : function(text) {
            let jsonText = JSON.parse(text);
            let data = jsonText.data;
            // console.log(data);
            // console.log(jsonText.status);
            for (let i = 0; i < data.length; i++) {
                //产业链名称
                let CHAIN_NAME = data[i].CHAIN_NAME;
                //企业总数
                let dataSum = data[i].dataSum;
                // 产业链编号
                let CHAIN_ID = data[i].CHAIN_ID;
                // 下一等级产业链信息
                let LOWERDATA = data[i].LOWERDATA;
                //图标名称
                let TBMC = data[i].TBMC;
                //宽度
                let width = parseInt(LOWERDATA.length*389);
                /!********************产业链第二层开始*******************!/
                if(i == 0){
                    titleHtml +="<div class=\"all-left-body-title-button clickB\" onclick=\"qylxqh(this,'"+CHAIN_ID+"',"+width+")\">" +
                        "       <img src=\"../../source/img/"+TBMC+".png\" class=\"img-align\"/><span>"+CHAIN_NAME+"</span>（"+dataSum+"家）" +
                        "   </div>";
                }else{
                    titleHtml +="<div class=\"all-left-body-title-button\" onclick=\"qylxqh(this,'"+CHAIN_ID+"',"+width+")\">" +
                        "       <img src=\"../../source/img/"+TBMC+".png\" class=\"img-align\"/><span>"+CHAIN_NAME+"</span>（"+dataSum+"家）" +
                        "   </div>";
                }
                /!********************产业链第二层结束*******************!/
                /!********************产业链第三层结束*******************!/
                for (let j = 0; j < LOWERDATA.length; j++) {
                    //产业链名称
                    let CHAIN_NAME = LOWERDATA[j].CHAIN_NAME;
                    //产业链编号
                    let CHAIN_ID = LOWERDATA[j].CHAIN_ID;
                    //父产业链编号
                    let PARENT_ID = LOWERDATA[j].PARENT_ID;
                    //图标名称
                    let TBMC = LOWERDATA[j].TBMC;
                    if(i==0){
                        lowerdataHtml +=" <div style=\"background: url('../../source/img/"+TBMC+".png');background-repeat: no-repeat;\" class=\" all-left-body-tu-all all-left-body-tu-"+PARENT_ID+"\" >" +
                            "<table class=\"all-left-body-tu-all-table all-left-body-tu-"+CHAIN_ID+" \" >" +
                            " <thead>" +
                            "<tr>" +
                            "<td colspan='2' onclick=\"showOne(this,'"+CHAIN_ID+"')\">"+CHAIN_NAME+"</td>" +
                            "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                            "<tr>" +
                            "</tr>" +
                            "</tbody>" +
                            "</table>" +
                            "</div>";
                    }else{
                        lowerdataHtml +=" <div style=\"background: url('../../source/img/"+TBMC+".png');background-repeat: no-repeat;display: none;\" class=\" all-left-body-tu-all all-left-body-tu-"+PARENT_ID+"\" >" +
                            "<table class=\"all-left-body-tu-all-table all-left-body-tu-"+CHAIN_ID+" \" >" +
                            " <thead>" +
                            "<tr>" +
                            "<td colspan='2' onclick=\"showOne(this,'"+CHAIN_ID+"')\">"+CHAIN_NAME+"</td>" +
                            "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                            "<tr>" +
                            "</tr>" +
                            "</tbody>" +
                            "</table>" +
                            "</div>";
                    }
                    /!*****************第三层list结束******************!/
                }
            }

            if(data.length>0){
                $(".all-left-body-tu").width(parseInt(data[0].LOWERDATA.length*389));
            }
            $(".all-left-body-tu").html(lowerdataHtml);
            $(".all-left-body-title").html(titleHtml);
            for (let i = 0; i < data.length; i++) {
                // 下一等级产业链信息
                let LOWERDATA = data[i].LOWERDATA;
                for (let j = 0; j < LOWERDATA.length; j++) {

                    var CHAIN_ID = LOWERDATA[j].CHAIN_ID;//产业链ID
                    var lists = LOWERDATA[j].LOWERDATA;//第四层list
                    var lowerdataHtmlTwo = "";
                    /!*****************第四层list开始******************!/
                    for(var aa = 0;aa<lists.length;aa=aa+2){
                        lowerdataHtmlTwo += '<tr>';
                        if(aa+1<lists.length){
                            lowerdataHtmlTwo +="<td class='cyl-four-"+lists[aa].CHAIN_ID+"' onclick=\"showTwo(this,'"+lists[aa].CHAIN_ID+"')\"><ul class='cyl-four-ul'><li style=\"list-style:url('../../source/img/"+lists[aa].TBMC+".png')\"><span>"+lists[aa].CHAIN_NAME+"</span></li></ul></td>";
                            lowerdataHtmlTwo +="<td class='cyl-four-"+lists[aa+1].CHAIN_ID+"' onclick=\"showTwo(this,'"+lists[aa+1].CHAIN_ID+"')\"><ul class='cyl-four-ul-1'><li style=\"list-style:url('../../source/img/"+lists[aa+1].TBMC+".png')\"><span>"+lists[aa+1].CHAIN_NAME+"</span></li></ul></td>";
                        }
                        if(aa+1>=lists.length){//最后一次循环只赋值一次
                            lowerdataHtmlTwo +="<td class='cyl-four-"+lists[aa].CHAIN_ID+"' onclick=\"showTwo(this,'"+lists[aa].CHAIN_ID+"')\"><ul class='cyl-four-ul'><li style=\"list-style:url('../../source/img/"+lists[aa].TBMC+".png')\"><span>"+lists[aa].CHAIN_NAME+"</span></li></ul></td>";
                            lowerdataHtmlTwo +="<td></td>"
                        }
                        lowerdataHtmlTwo += '</tr>';
                    }
                    /!*****************第四层list结束******************!/
                    $(".all-left-body-tu-"+CHAIN_ID+" tbody").html(lowerdataHtmlTwo);//把第四层赋给对应的第三层产业链

                    for(var x = 0;x<lists.length;x++){
                        /!*****************第五层list开始******************!/
                        var listFive = lists[x].LOWERDATA;//第五层list
                        var clyFiveHtml = "<ul class='cyl-five-ul' style='display: none;'>";
                       /!* for(var c = 0;c<lists.length;c++){ //测试第五层数据
                            clyFiveHtml+='<li><span>'+lists[c].CHAIN_NAME+'</span></li>\n';
                        }*!/
                        for(var c = 0;c<listFive.length;c++){
                            clyFiveHtml+='<li>●　'+listFive[c].CHAIN_NAME+'</li>\n';
                        }
                        clyFiveHtml+='</ul>';
                        $(".cyl-four-"+lists[x].CHAIN_ID).append(clyFiveHtml);
                        /!*****************第五层list结束******************!/
                    }
                }
            }

        }
    })
}


function showOne(obj,CHAIN_ID) {
    let tbody = $(obj).parent("tr").parent("thead").next("tbody");
    if(tbody.is(':hidden')){
        tbody.show();
    }else{
        tbody.hide();
    }
    queryRank(AREA,YEAR,CHAIN_ID,BQ_JZZS,CONDITION);//渲染企业列表
}


function showTwo(obj,CHAIN_ID) {
    let ul = $(obj).children(".cyl-five-ul");
    if(ul.is(':hidden')){
        ul.show();
    }else{
        ul.hide();
    }
    queryRank(AREA,YEAR,CHAIN_ID,BQ_JZZS,CONDITION);//渲染企业列表
}*/



