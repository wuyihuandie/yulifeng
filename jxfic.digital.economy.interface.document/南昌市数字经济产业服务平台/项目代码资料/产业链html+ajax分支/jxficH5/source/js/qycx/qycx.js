var name = "";
var COUNT = "";
layui.use(['form'], function(){
    var form = layui.form;
});
var CHAIN_NAME='';
var AREA='';
var INDUSTRY='';
var CLSJ='';
var ZCZJ='';
var YYSR='';
var CONDITION = 1;
var orderDes = 'asc';
//点击查询企业
$(function () {
    findSzjjdm();
    queryArea();
    //自定义滚动条样式
    $('.all-body-center-head').niceScroll({
        cursorcolor: "#07afc1",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: true, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "10px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "10px",//以像素为光标边界半径
        autohidemode: false, //是否隐藏滚动条
    });
    if(getCookie("area_value")!=360100){
        AREA=getCookie("area_value");
    }
    var parent_dl=getUrlValue("PARENT_DL");
    if(parent_dl!=null&&parent_dl!=undefined){
        CHAIN_NAME=parent_dl;
    }
    //营业收入时间
    $("#divYsList span").click(function(){
        $("#divYsList span").removeClass("on");
        $(this).addClass("on");
        YYSR=$(this).attr("data-name");
        searchfromgxb(1);
    })
    //注册资金
    $("#divRegcapList span").click(function(){
        $("#divRegcapList span").removeClass("on");
        $(this).addClass("on");
        ZCZJ=$(this).attr("data-name");
        searchfromgxb(1);
    })
    //成立时间
    $("#divEstdateList span").click(function(){
        $("#divEstdateList span").removeClass("on");
        $(this).addClass("on");
        CLSJ=$(this).attr("data-name");
        searchfromgxb(1);
    })

    //是否展示更多地区
    $("#btnAreaShowMore").click(function(){
        $("#divAreaList").toggleClass("more")
    })

    $("#sthree").mouseover(function(){
        $("#three").css("opacity","1");
    })

    $("#three span").click(function(){
        $("#three span").removeClass("on");
        $(this).addClass("on");
        $("#values span").removeClass("on");
        INDUSTRY=$(this).attr("data-name");
        searchfromgxb(1);
    })

    //产业
    $("#values span").click(function(){
        $("#three span").removeClass("on");
        $("#values span").removeClass("on");
        $(this).addClass("on");
        $("#three").css("opacity","0");
        INDUSTRY=$(this).attr("data-name");
        searchfromgxb(1);

    })

    searchfromgxb(1);
})
//企业查询
$(document).on("click",".search_img",function(){
    var value = $(".all-body-center-search-input").val();
    name = value;
    searchfromgxb(1);
});
//标签查询查询
function findSzjjdm() {
    doData(BASE_URL+'/queryEntController/findSzjjdm',{},function(result){
        $.each(result.data, function(index, item) {
            if(item.TYPE == '2'){
                $("#divIndustryList").append('<span data-name="'+item.PARENT_DL+'">'+item.CHAIN_NAME+'</span>');
            }else if(item.TYPE == '3'){
                $("#divTypeList").append('<span data-name="'+item.PARENT_DL+'">'+item.CHAIN_NAME+'</span>');
            }
        });
        var parent_dl=getUrlValue("PARENT_DL");
        if(parent_dl!=null&&parent_dl!=undefined){
            $("#divTypeList span").removeClass("on");
            $("#divTypeList span[data-name='"+CHAIN_NAME+"']").addClass("on");
        }
        //标签
        $("#divTypeList span").click(function(){
            $("#divTypeList span").removeClass("on");
            $(this).addClass("on");
            CHAIN_NAME=$(this).attr("data-name");
            searchfromgxb(1);
        })
    })
}
//区域查询
function queryArea() {
    doData(BASE_URL+'/queryEntController/queryArea',{},function(result){
        $.each(result.data, function(index, item) {
            $("#divAreaList").append('<span data-name="'+item.AREA_VALUE+'">'+item.AREA_NAME+'</span>');
        });
        if(getCookie("area_value")!=360100){
            var param=getCookie("area_value");
            $("#divAreaList span").removeClass("on");
            $("#divAreaList span").css("cursor","text");
            $("#divAreaList span[data-name='"+param+"']").addClass("on");
        }else{
            //地区
            $("#divAreaList span").click(function(){
                $("#divAreaList span").removeClass("on");
                $(this).addClass("on");
                AREA=$(this).attr("data-name");
                searchfromgxb(1);
            })
        }
    })
}
//回车事件
$(document).keyup(function(){
     if(event.keyCode==13){
         var value = $(".all-body-center-search-input").val();
         name = value
         searchfromgxb(1);
    } 
});


function Show(){
	$(".all-body-center-head").empty();
	$(".all-body-center-wz").empty();
	$(".all-body-center-head-qy-table-bq").empty();
}
var exportData = [];
//本地关系表查询
function searchfromgxb(curr) {
    //点击后 groupList 列表隐藏
    $(".groupList").hide();
    var datas = {};
    datas.searchName = name;
    datas.CHAIN_NAME = CHAIN_NAME;
    datas.AREA = AREA;
    datas.INDUSTRY = INDUSTRY;
    datas.CLSJ = CLSJ;
    datas.ZCZJ = ZCZJ;
    datas.YYSR = YYSR;
    datas.CONDITION = CONDITION;
    datas.page=curr+"";
    datas.orderDes=orderDes;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/queryEntController/getEntList',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            var jsonText = JSON.parse(text);

            console.log(jsonText.status);
            let data = typeof (jsonText.data) == "undefined"?{count:0,limit:10,list:[],page:1}:jsonText.data;
            let result = data.list;
            let count = data.count;
            COUNT = data.count;
            let html = "";
            for (let i = 0; i < result.length; i++) {

                let UNISCID = typeof (result[i].UNISCID) == "undefined"?"-":result[i].UNISCID;
                let REGCAP = typeof (result[i].REGCAP) == "undefined"?"-":(result[i].REGCAP+'万元'+result[i].REGCAPCUR_CN);
                let ENTNAME = typeof (result[i].ENTNAME) == "undefined"?"-":result[i].ENTNAME;
                let Name = typeof (result[i].NAME) == "undefined"?"-":result[i].NAME;
                let ESTDATE = typeof (result[i].ESTDATE) == "undefined"?"-":result[i].ESTDATE;
                let DOM = typeof (result[i].DOM) == "undefined"?"-":result[i].DOM;
                let RATGRO = typeof (result[i].RATGRO) == "undefined"?"-":(result[i].RATGRO+'万元');
                let ImageUrl = typeof (result[i].ImageUrl) == "undefined"?"../../source/img/qycx/logo.png":result[i].ImageUrl;
                let INDUSTRY_CN = result[i].INDUSTRY_CN;
                let VENDINC = typeof (result[i].VENDINC) == "undefined"?"-":(result[i].VENDINC+'万元');
                let chain_name = result[i].CHAIN_NAME;
                let CUSTOMIZE = typeof (result[i].CUSTOMIZE) == "undefined"?"-":result[i].CUSTOMIZE;
                let phtml = "";
                if(typeof (INDUSTRY_CN) != "undefined"){
                    phtml+='<p class="all-body-center-head-qy-table-bq">'+INDUSTRY_CN+'</p>';
                }
                if(typeof (chain_name) != "undefined" && chain_name != '' && chain_name != null){
                    let strs= new Array();
                    strs=chain_name.split(",")
                    for(let x=0;x<strs.length;x++){
                        phtml+='<p class="all-body-center-head-qy-table-bq">'+strs[x]+'</p>';
                    }
                }
                var str='';
                if(CUSTOMIZE.indexOf('GSQY')!=-1&&INDUSTRY!='NK01'){
                    str='<a class="yxjc" href="javaScript:void(0)" onclick="tzQyjc(\'' + result[i].PRIPID + '\',\'' + result[i].REGNO + '\',\'' + result[i].ENTNAME + '\',\'' + result[i].KEYNO + '\')"><img src="../../source/img/qycx/icon_qyyxjc.png" style="margin-right: 5px;">&nbsp;运行监测</a>';
                }else{
                    str='';
                }
                html += '<div class="all-body-center-head-qy" id="list_'+i+'" onclick="tzQyhx(\''+result[i].REGNO+'\',\''+ENTNAME+'\')"> ' +
                    '                    <img class="all-body-center-head-qy-img" src="'+ImageUrl+'" height="136" width="131"/> ' +
                    '                    <table class="all-body-center-head-qy-table"> ' +
                    '                        <thead> ' +
                    '                            <tr> ' +
                    '                                <th colspan="3">'+ENTNAME+str+'</th> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <th colspan="3"> ' +
                    phtml+
                    '                                </th> ' +
                    '                            </tr> ' +
                    '                        </thead> ' +
                    '                        <tbody> ' +
                    '                            <tr> ' +
                    '                                <td width="40%"> ' +
                    '                                   <span>&nbsp;统一社会信用代码：<span class="all-body-center-head-qy-table-xq">'+UNISCID+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td width="25%"> ' +
                    '                                    <span>&nbsp;注册资本：<span class="all-body-center-head-qy-table-xq">'+REGCAP+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td width="35%"> ' +
                    '                                    <span>&nbsp;成立日期：<span class="all-body-center-head-qy-table-xq">'+ESTDATE+'</span></span> ' +
                    '                                </td> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <td> ' +
                    '                                    <span>&nbsp;法人代表：<span class="all-body-center-head-qy-table-xq">'+Name+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td> ' +
                    '                                    <span>&nbsp;营业收入：<span class="all-body-center-head-qy-table-xq">'+VENDINC+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td> ' +
                    '                                    <span>&nbsp;纳税额：<span class="all-body-center-head-qy-table-xq">'+RATGRO+'</span></span> ' +
                    '                                </td> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <td colspan="3"> ' +
                    '                                    <span class="dz">'+DOM+'</span> ' +
                    '                                </td> ' +
                    '                            </tr> ' +
                    '                        </tbody> ' +
                    '                    </table> ' +
                    '                </div>';
            }
            $(".all-body-center-head").html(html);
            $("#count").text(count);
            if(curr=="1"){
                layui.use(['laypage', 'layer'], function(){
                    var laypage = layui.laypage,layer = layui.layer;
                    laypage.render({
                        elem: 'fy'
                        ,count: COUNT
                        ,limit:10
                        ,layout: ['prev', 'page', 'next']
                        ,theme: '#0ca0a3'
                        ,jump: function(obj,first){
                            let curr = obj.curr;
                            if(!first){
                                searchfromgxb(curr);
                            }
                        }
                    });
                });
            }
            /*if(count == 0){
                $(".groupList").show();
            }*/
            //选中样式
            $('div[id^="list_"]').hover(
                function(){
                    $(this).css("border","1px #0ca0a3 solid");
                },
                function(){
                    $(this).css("border","1px solid rgba(49, 247, 251, 0.15)");
                }
            );
        }
    })
}

//根据企查查 查询
/*function search(name,curr) {
	//点击后 groupList 列表隐藏
	$(".groupList").hide();
    var datas = {};
    datas.searchName = name;
    datas.REGNO='360103210025958';
    datas.page=curr+"";
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/queryEntController/getEntCreditxq',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            var jsonText = JSON.parse(text);
            console.log(jsonText.status);
            let data = typeof (jsonText.data) == "undefined"?{count:0,limit:10,list:[],page:1}:jsonText.data;
            let result = data.list;
            let count = data.count;
            COUNT = data.count;
            let html = "";
            for (let i = 0; i < result.length; i++) {
                let CreditCode = typeof (result[i].CreditCode) == "undefined"?"":result[i].CreditCode;
                let RegistCapi = typeof (result[i].RegistCapi) == "undefined"?"":result[i].RegistCapi;
                let KeyNo = typeof (result[i].KeyNo) == "undefined"?"":result[i].KeyNo;
                let Name = typeof (result[i].Name) == "undefined"?"":result[i].Name;
                let No = typeof (result[i].No) == "undefined"?"":result[i].No;
                let OperName = typeof (result[i].OperName) == "undefined"?"":result[i].OperName;
                let StartDate = typeof (result[i].StartDate) == "undefined"?"":result[i].StartDate;
                let Address = typeof (result[i].Address) == "undefined"?"":result[i].Address;
                let OrgNo = typeof (result[i].OrgNo) == "undefined"?"":result[i].OrgNo;
                let ImageUrl = typeof (result[i].ImageUrl) == "undefined"?"../../source/img/qycx/logo.png":result[i].ImageUrl;
                let IsOnStock = typeof (result[i].IsOnStock) == "1"?"上市":"未上市";
                StartDate = StartDate.substr(0,StartDate.indexOf(" "));
                let Status = result[i].Status;
                let EconKind = result[i].EconKind;
                let chain_name = result[i].CHAIN_NAME;
                let phtml = "";
                if(typeof (Status) != "undefined"){
                    phtml+='<p class="all-body-center-head-qy-table-bq">'+Status+'</p>';
                }
                if(typeof (EconKind) != "undefined"){
                    phtml+='<p class="all-body-center-head-qy-table-bq">'+EconKind+'</p>';
                }
                if(typeof (chain_name) != "undefined"){
                    phtml+='<p class="all-body-center-head-qy-table-bq">'+chain_name+'</p>';
                }
                html += '<div class="all-body-center-head-qy" id="list_'+i+'" onclick="tzQyhx(\''+No+'\',\''+Name+'\')"> ' +
                    '                    <img class="all-body-center-head-qy-img" src="'+ImageUrl+'" height="136" width="131"/> ' +
                    '                    <table class="all-body-center-head-qy-table"> ' +
                    '                        <thead> ' +
                    '                            <tr> ' +
                    '                                <th>'+Name+'</th> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <th colspan="3"> ' +
                    phtml+
                    '                                </th> ' +
                    '                            </tr> ' +
                    '                        </thead> ' +
                    '                        <tbody> ' +
                    '                            <tr> ' +
                    '                                <td width="39%"> ' +
                    '                                    <img src="../../source/img/qycx/icon.png" height="10" width="10"/><span>&nbsp;法人代表　<span class="all-body-center-head-qy-table-xq">'+OperName+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td width="30%"> ' +
                    '                                    <img src="../../source/img/qycx/icon.png" height="10" width="10"/><span>&nbsp;注册资金　<span class="all-body-center-head-qy-table-xq">'+RegistCapi+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td width="30%"> ' +
                    '                                    <img src="../../source/img/qycx/icon.png" height="10" width="10"/><span>&nbsp;成立日期　<span class="all-body-center-head-qy-table-xq">'+StartDate+'</span></span> ' +
                    '                                </td> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <td> ' +
                    '                                    <img src="../../source/img/qycx/icon.png" height="10" width="10"/><span>&nbsp;社会统一信用代码　<span class="all-body-center-head-qy-table-xq">'+CreditCode+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td> ' +
                    '                                    <img src="../../source/img/qycx/icon.png" height="10" width="10"/><span>&nbsp;组织机构代码　<span class="all-body-center-head-qy-table-xq">'+OrgNo+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td> ' +
                    '                                    <img src="../../source/img/qycx/icon.png" height="10" width="10"/><span>&nbsp;是否上市　<span class="all-body-center-head-qy-table-xq">'+IsOnStock+'</span></span> ' +
                    '                                </td> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <td colspan="3"> ' +
                    '                                    <span class="dz">'+Address+'</span> ' +
                    '                                </td> ' +
                    '                            </tr> ' +
                    '                        </tbody> ' +
                    '                    </table> ' +
                    '                </div>';
            }
            $(".all-body-center-head").html(html);
            $(".all-body-center-wz").html("<span>查询结果：共为您找到&nbsp;<span style=\"color: #0ca0a3\" id=\"count\">"+count+"</span>&nbsp;家公司</span>");
            if(curr=="1"){
                layui.use(['laypage', 'layer'], function(){
                    var laypage = layui.laypage
                        ,layer = layui.layer;
                    laypage.render({
                        elem: 'fy'
                        ,count: COUNT
                        ,layout: ['prev', 'page', 'next']
                        ,theme: '#0ca0a3'
                        ,jump: function(obj,first){
                            let curr = obj.curr;
                            if(!first){
                                search(name,curr);
                            }
                        }
                    });
                });
            }
			if(count == 0){
				$(".groupList").show();
			}
            //选中样式
            $('div[id^="list_"]').hover(
                function(){
                    $(this).css("border","1px #0ca0a3 solid");
                },
                function(){
                    $(this).css("border","0");
                }
            );
        }
    })
}*/
//打开企查查
function openQcc(){
    doData(BASE_URL+'/queryEntController/to_search', {},function(jsonData){
        var url = jsonData.data.httpUrl;
        url = decodeURI(url);//unicode解码
        layer.open({
            type: 2
            ,title:'企业查询'
            ,area: ['100%', '100%']
            ,content: url
            ,btn: '关闭'
            ,btnAlign: 'c' //按钮居中
            ,shade: 0 //不显示遮罩
            ,yes: function(){
                layer.closeAll();
            }
        });
    })
}

//调转企查查
function tzQyhx(REGNO,ENTNAME){
    var datas = {};
    datas.REGNO=ENTNAME;
    doData(BASE_URL+'/entPanoramicNewController/getEntCreditxq',datas,function(jsonData){
        var url = jsonData.data.httpUrl;
        url = decodeURI(url);//unicode解码
        layer.open({
            type: 2
            ,title:'企业信用详情'
            ,area: ['95%', '95%']
            ,content: url
            ,btn: '关闭'
            ,btnAlign: 'c' //按钮居中
            ,shade: 0 //不显示遮罩
            ,yes: function(){
                layer.closeAll();
            }
        });
    })
}

//跳转企业监测
function tzQyjc(PRIPID,REGNO,ENTNAME,KEYNO){
    window.location.href=realPath+"view/qyyxjc/yxjc-2.html?menuType=2&PRIPID="+encodeStr(PRIPID)+"&KEYNO="+encodeStr(KEYNO);
}

function queryEntList(ths){
    CONDITION = $(ths).val();
    if((CONDITION%2) == 0 ){
        orderDes = 'desc';
        CONDITION = CONDITION - 1;
    }else if(CONDITION == 2){
        orderDes = 'asc';
    }
    searchfromgxb(1);
}

//导出数据
function exportDatas(){
    var datas = {};
    datas.searchName = name;
    datas.CHAIN_NAME = CHAIN_NAME;
    datas.AREA = AREA;
    datas.INDUSTRY = INDUSTRY;
    datas.CLSJ = CLSJ;
    datas.ZCZJ = ZCZJ;
    doData(BASE_URL + '/queryEntController/exportToExcel',datas,function(result){
        var datas = result.list;
        for (let i = 0; i < datas.length; i++) {
            var obj = {'企业名称':datas[i].ENTNAME,'统一社会信用代码':datas[i].UNISCID,'注册资金':datas[i].REGCAP,'成立日期':datas[i].ESTDATE,'法人代表':datas[i].Name,'所属行业':datas[i].INDUSTRY_CN,'标签':datas[i].CHAIN_NAME,'所属区域':datas[i].AREA_NAME,'地址':datas[i].DOM};
            exportData.push(obj);
        }
        downloadExl(exportData);
    })
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    function saveAs(obj, fileName) {//自定义下载文件方式
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        tmpa.href = URL.createObjectURL(obj); //绑定a标签
        tmpa.click(); //模拟点击实现下载
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    }
    function downloadExl(data) {
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
        saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), "企业名录" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
    }

}




