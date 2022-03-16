var companyNum = 0; // 总数
var wCurrent = 0; // 当前页
var wLimit = "10"; // 每页多少条数据
var listNum = 0; // 总页数

var ENTNAME= '';
var PROVINCENAME= '';
var PUBLISHDATE='';
var PROJECTNAME='';
var AREA_VALUE='';
var year='';
var INDUSTRY='';
$(function () {
    AREA_VALUE=getUrlValue("AREA_VALUE");
    year=getUrlValue("YEAR");
    queryRank({page: "1", limit: window.wLimit});//渲染企业列表
    INDUSTRY=getUrlValue("INDUSTRY");
    /*queryDatasBytype(2);*/
    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        PROVINCENAME=$('#PROVINCENAME').val();
        PUBLISHDATE=$('#PUBLISHDATE').val();
        PROJECTNAME=$('#PROJECTNAME').val();
        queryRank({page: "1", limit: window.wLimit})
    });

})


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return '';
}

function queryRank(paramsObj) {
    var params = {
        page: paramsObj.page,
        limit: paramsObj.limit,
        ENTNAME: window.ENTNAME,
        PROJECTNAME: PROJECTNAME,
        PROVINCENAME: PROVINCENAME,
        PUBLISHDATE: PUBLISHDATE,
        AREA_VALUE: AREA_VALUE,
        INDUSTRY: INDUSTRY,
        YEAR: year
    }
    doData(BASE_URL + '/qyyxjcController/getProjectList',params,function(result){
        if (result.status == 10001) {

            $("#rTbox tr").remove();
            // 总数量
            window.companyNum = result.data.count;
            // 第几页
            window.wCurrent = result.data.page;
            // 统计总页数
            window.listNum = companyNum / wLimit < 0 ? 0 : Math.ceil(companyNum / wLimit);
            result.data.list.forEach(function (item, index) {
                var pubdate=(item.PUBLISHDATE==''||item.PUBLISHDATE==null)?'-':item.PUBLISHDATE;
                var name=(item.CHANNELNAME==''||item.CHANNELNAME==null)?'-':item.CHANNELNAME;
                var provincename=(item.PROVINCENAME==''||item.PROVINCENAME==null)?'-':item.PROVINCENAME;
                $("#rTbox").append('<tr><td>' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                    + '<td style="cursor: pointer;color:#2098F8;" onclick="openDetails(\''+item.ID+'\')">' + item.PROJECTNAME + '</td>'
                    + '<td>' + item.ENTNAME + '</td>'
                    + '<td>' + pubdate + '</td>'
                    + '<td>' + provincename + '</td>'
                    + '<td>' + name + '</td></tr>'
                )
            })
            if(window.companyNum==0){
                $("#rTbox").append('<tr><td  colspan="3">暂无数据</td></tr>')
            }
            // 显示总数
            $("#comTotal").text(window.companyNum)
            pageObj(window.listNum, window.wCurrent,result.data.count);
        }
    })
}

function pageObj(listNum, wCurrent,recordCounts) {
    var box = new Pagination('#page', {
        total: listNum,//总页数
        recordCounts:recordCounts,
        current: wCurrent,
        showForwardInput: true,
        count: 5,
        pageChange: function (pageNum) {//切换页码成功回调
            queryRank({
                page: pageNum + "",
                limit: window.wLimit,
            });
        }
    });
}

function queryDatasBytype(type){
    var params = {
        ENTNAME: ENTNAME,
        PROJECTNAME: PROJECTNAME,
        PROVINCENAME: PROVINCENAME,
        PUBLISHDATE: PUBLISHDATE,
        TYPE:type,
        AREA_VALUE: AREA_VALUE,
        YEAR: year
    }
    doData(BASE_URL + '/qyyxjcController/getProjectByType',params,function(result){
        if (result.status == 10001) {
            if(type==2){
                $("#PROVINCENAME option:gt(0)").remove();
                result.data.forEach(function (item, index) {
                    if(item.PROVINCENAME!=''){
                        $("#PROVINCENAME").append('<option value="' + item.PROVINCENAME + '">' + item.PROVINCENAME + '</option>');
                    }
                });
                layui.use(['form'], function(){
                    var form = layui.form
                });
            }


        }
    })
}

layui.use(['laydate'], function(){
    var laydate = layui.laydate
    laydate.render({
        elem: '#PUBLISHDATE',
        type: 'year'
    });
});


function openDetails(id){
    var datas = {};
    datas.ID=id;
    doData(BASE_URL+'/qyyxjcController/getProjectDetails',datas,function(jsonData){
        var url = jsonData.data.httpUrl;
        url = decodeURI(url);//unicode解码
        layer.open({
            type: 2
            ,title:'项目信息'
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