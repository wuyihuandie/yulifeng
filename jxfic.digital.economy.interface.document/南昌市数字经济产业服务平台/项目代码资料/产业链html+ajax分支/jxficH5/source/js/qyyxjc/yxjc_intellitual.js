var companyNum = 0; // 总数
var wCurrent = 0; // 当前页
var wLimit = "10"; // 每页多少条数据
var listNum = 0; // 总页数

var ENTNAME= '';
var Name= '';
var AppDate='';
var TYPE='';
var AREA_VALUE='';
var year='';
var INDUSTRY='';
$(function () {
    TYPE=getUrlValue("TYPE");
    AREA_VALUE=getUrlValue("AREA_VALUE");
    INDUSTRY=getUrlValue("INDUSTRY");
    year=getUrlValue("YEAR");
    queryRank({page: "1", limit: window.wLimit});//渲染企业列表

    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        Name=$('#Name').val();
        AppDate=$('#AppDate').val();
        queryRank({page: "1", limit: window.wLimit})
    });

})

function queryRank(paramsObj) {
    var params = {
        page: paramsObj.page,
        limit: paramsObj.limit,
        ENTNAME: ENTNAME,
        Name: Name,
        AppDate:AppDate,
        TYPE:TYPE,
        AREA_VALUE: AREA_VALUE,
        INDUSTRY: INDUSTRY,
        YEAR: year
    }
    doData(BASE_URL + '/qyyxjcController/getIntellectualListpage',params,function(result){
        if (result.status == 10001) {

            $("#rTbox tr").remove();
            // 总数量
            window.companyNum = result.data.count;
            // 第几页
            window.wCurrent = result.data.page;
            // 统计总页数
            window.listNum = companyNum / wLimit < 0 ? 0 : Math.ceil(companyNum / wLimit);
            result.data.list.forEach(function (item, index) {
                if(TYPE=='1'){
                    var appdate=(item.AppDate==''||item.AppDate==null)?'-':item.AppDate;
                    $("#rTbox").append('<tr><td>' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                        + '<td style="cursor: pointer;color:#2098F8;" onclick="openBrandDetails(\''+item.ID+'\')">' + item.Name + '</td>'
                        + '<td>' + appdate + '</td>'
                        + '<td>' + item.ENTNAME + '</td></tr>'
                    )
                }else if(TYPE=='2'){
                    var shortname=(item.ShortName==''||item.ShortName==null)?'-':item.ShortName;
                    $("#rTbox").append('<tr><td>' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                        + '<td>' + item.ENTNAME + '</td>'
                        + '<td>' + item.Name + '</td>'
                        + '<td>' + item.VersionNo + '</td>'
                        + '<td>' + item.AppDate + '</td>'
                        + '<td>' + shortname + '</td>'
                        + '<td>' + item.RegisterNo + '</td>'
                        + '<td>' + item.RegisterAperDate + '</td></tr>'
                    )
                }else{
                    var appdate=(item.AppDate==''||item.AppDate==null)?'-':item.AppDate;
                    $("#rTbox").append('<tr><td>' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                        + '<td style="cursor: pointer;color:#2098F8;" onclick="openPatentDetails(\''+item.ID+'\')">' + item.Name + '</td>'
                        + '<td>' + appdate + '</td>'
                        + '<td>' + item.ENTNAME + '</td></tr>'
                    )
                }

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

layui.use(['laydate'], function(){
    var laydate = layui.laydate
    laydate.render({
        elem: '#AppDate',
        type: 'year'
    });
});

//商标详情
function openBrandDetails(id){
    var datas = {};
    datas.ID=id;
    doData(BASE_URL+'/qyyxjcController/getBrandDetails',datas,function(jsonData){
        var url = jsonData.data.httpUrl;
        url = decodeURI(url);//unicode解码
        layer.open({
            type: 2
            ,title:'商标信息'
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
//专利详情
function openPatentDetails(id){
    var datas = {};
    datas.ID=id;
    doData(BASE_URL+'/qyyxjcController/getPatentDetails',datas,function(jsonData){
        var url = jsonData.data.httpUrl;
        url = decodeURI(url);//unicode解码
        layer.open({
            type: 2
            ,title:'专利信息'
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