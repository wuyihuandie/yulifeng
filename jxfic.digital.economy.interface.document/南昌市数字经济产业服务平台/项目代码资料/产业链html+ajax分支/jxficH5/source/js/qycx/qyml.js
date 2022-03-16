var AREA='';
//点击查询企业
$(function () {
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
    if(getCookie("area_value")==360100){
        //地区
        AREA='';
    }else{
        AREA=getCookie("area_value");
    }

    queryEntListByCustomize(AREA);
})

//企业名录查询
function queryEntListByCustomize(area) {
    doData(BASE_URL+'/queryEntController/queryEntListByCustomize',{AREA_VALUE:area},function(result){
        $.each(result.data, function(index, item) {
            var str="";
            if(index%4==0){
                str='<div class="left_body"><h3 onclick="to_qycx(\''+item.PARENT_DL+'\')">'+item.CHAIN_NAME+'<span>'+item.SUMS+'家</span></h3>' +
                    '<p>'+item.REMARK+'</p><p class="detail" onclick="to_qycx(\''+item.PARENT_DL+'\')">详情>></p></div>'
            }else if(index%4==3){
                str='<div class="right_body"><h3 onclick="to_qycx(\''+item.PARENT_DL+'\')">'+item.CHAIN_NAME+'<span>'+item.SUMS+'家</span></h3>' +
                    '<p>'+item.REMARK+'</p><p class="detail" onclick="to_qycx(\''+item.PARENT_DL+'\')">详情>></p></div>'
            }else{
                str='<div><h3 onclick="to_qycx(\''+item.PARENT_DL+'\')">'+item.CHAIN_NAME+'<span>'+item.SUMS+'家</span></h3>' +
                    '<p>'+item.REMARK+'</p><p class="detail" onclick="to_qycx(\''+item.PARENT_DL+'\')">详情>></p></div>'
            }

            $(".all-body").append(str);
        });

    })
}

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
    datas.page=curr+"";
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
            console.log("result:"+result);
            let count = data.count;
            COUNT = data.count;
            let html = "";
            for (let i = 0; i < result.length; i++) {
                let UNISCID = typeof (result[i].UNISCID) == "undefined"?"-":result[i].UNISCID;
                let REGCAP = typeof (result[i].REGCAP) == "undefined"?"-":(result[i].REGCAP+result[i].REGCAPCUR_CN);
                let KeyNo = typeof (result[i].KeyNo) == "undefined"?"":result[i].KeyNo;
                let ENTNAME = typeof (result[i].ENTNAME) == "undefined"?"":result[i].ENTNAME;
                let PRIPID = typeof (result[i].PRIPID) == "undefined"?"":result[i].PRIPID;
                let Name = typeof (result[i].NAME) == "undefined"?"":result[i].NAME;
                let ESTDATE = typeof (result[i].ESTDATE) == "undefined"?"":result[i].ESTDATE;
                let DOM = typeof (result[i].DOM) == "undefined"?"-":result[i].DOM;
                let TEL = typeof (result[i].TEL) == "undefined"?"-":result[i].TEL;
                let ImageUrl = typeof (result[i].ImageUrl) == "undefined"?"../../source/img/qycx/logo.png":result[i].ImageUrl;
                let INDUSTRY_CN = result[i].INDUSTRY_CN;
                let ENTTYPE_CN = result[i].ENTTYPE_CN;
                let chain_name = result[i].CHAIN_NAME;
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

                html += '<div class="all-body-center-head-qy" id="list_'+i+'" onclick="tzQyhx(\''+result[i].REGNO+'\',\''+ENTNAME+'\')"> ' +
                    '                    <img class="all-body-center-head-qy-img" src="'+ImageUrl+'" height="136" width="131"/> ' +
                    '                    <table class="all-body-center-head-qy-table"> ' +
                    '                        <thead> ' +
                    '                            <tr> ' +
                    '                                <th colspan="3">'+ENTNAME+'</th> ' +
                    '                            </tr> ' +
                    '                            <tr> ' +
                    '                                <th colspan="3"> ' +
                    phtml+
                    '                                </th> ' +
                    '                            </tr> ' +
                    '                        </thead> ' +
                    '                        <tbody> ' +
                    '                            <tr> ' +
                    '                                <td width="35%"> ' +
                    '                                   <span>&nbsp;统一社会信用代码：<span class="all-body-center-head-qy-table-xq">'+UNISCID+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td width="30%"> ' +
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
                    '                                    <span>&nbsp;电话：<span class="all-body-center-head-qy-table-xq">'+TEL+'</span></span> ' +
                    '                                </td> ' +
                    '                                <td> ' +
                    '                                    <span>&nbsp;企业类型：<span class="all-body-center-head-qy-table-xq">'+ENTTYPE_CN+'</span></span> ' +
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
                                searchfromgxb(name,curr);
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
                    $(this).css("border","1px solid rgba(49, 247, 251, 0.15)");
                }
            );
        }
    })
}

function to_qycx(parent_dl){
    window.location.href=realPath+"view/qycx/qycx.html?menuType=4&PARENT_DL="+parent_dl;
}

