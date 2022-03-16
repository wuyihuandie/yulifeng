var companyNum = 0; // 总数
var wCurrent = 0; // 当前页
var wLimit = "10"; // 每页多少条数据
var listNum = 0; // 总页数

var ENTNAME= '';
var REWARD= '';
var REWARDGEDATE='';
var AREA_VALUE='';
var year='';
var INDUSTRY='';
$(function () {
    AREA_VALUE=getUrlValue("AREA_VALUE");
    INDUSTRY=getUrlValue("INDUSTRY");
    year=getUrlValue("YEAR");
    queryRank({page: "1", limit: window.wLimit});//渲染企业列表

    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        REWARD=$('#REWARD').val();
        REWARDGEDATE=$('#REWARDGEDATE').val();
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
        ENTNAME: ENTNAME,
        REWARD: REWARD,
        REWARDGEDATE:REWARDGEDATE,
        AREA_VALUE: AREA_VALUE,
        INDUSTRY: INDUSTRY,
        YEAR: year
    }
    doData(BASE_URL + '/qyyxjcController/getRewardList',params,function(result){
        if (result.status == 10001) {

            $("#rTbox tr").remove();
            // 总数量
            window.companyNum = result.data.count;
            // 第几页
            window.wCurrent = result.data.page;
            // 统计总页数
            window.listNum = companyNum / wLimit < 0 ? 0 : Math.ceil(companyNum / wLimit);
            result.data.list.forEach(function (item, index) {
                var reward=(item.REWARD==''||item.REWARD==null)?'-':item.REWARD;
                var rewarddate=(item.REWARDGEDATE==''||item.REWARDGEDATE==null)?'-':item.REWARDGEDATE;
                var rewardno=(item.REWARDNO==''||item.REWARDNO==null)?'-':item.REWARDNO;
                $("#rTbox").append('<tr><td>' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                    + '<td>' + item.TYPE_NAME + '</td>'
                    + '<td>' + reward + '</td>'
                    + '<td>' + item.ENTNAME + '</td>'
                    + '<td>' + rewardno + '</td>'
                    + '<td>' + rewarddate + '</td></tr>'
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

layui.use(['laydate'], function(){
    var laydate = layui.laydate
    laydate.render({
        elem: '#REWARDGEDATE',
        type: 'year'
    });
});
