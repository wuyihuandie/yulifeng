var companyNum = 0; // 总数
var wCurrent = 0; // 当前页
var wLimit = "10"; // 每页多少条数据
var listNum = 0; // 总页数
var PARENT_DL= "";
var AREA = "360100";
$(function () {

    queryRank({page: "1", limit: window.wLimit, AREA: window.AREA});//渲染企业列表

    $('#query').on('click', function() {
        var PARENT_DL=$('#PARENT_DL').val();
        queryRank({page: "1", limit: window.wLimit,AREA: window.AREA,PARENT_DL:PARENT_DL})
    });

})

function queryRank(paramsObj) {
    var params = {
        page: paramsObj.page,
        limit: paramsObj.limit,
        PARENT_DL: paramsObj.PARENT_DL,
        AREA: paramsObj.AREA,
    }
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/industrialChainController/getKeyProjectlist',
        data: {
            param: JSON.stringify(params)//参数
        },
        cache: false,
        success: function (res) {
            var result = JSON.parse(res);

            if (result.status == 10001) {

                $("#rTbox tr").remove();

                // 总数量
                window.companyNum = result.data.count;

                // 第几页
                window.wCurrent = result.data.page;


                // 统计总页数
                window.listNum = companyNum / wLimit < 0 ? 0 : Math.ceil(companyNum / wLimit) ;

                result.data.list.forEach(function (item, index) {
                    $("#rTbox").append('<tr><td width="1%">' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                        + '<td width="15%">' + item.RESPONSIBLE_UNIT + '</td>'
                        + '<td width="15%">' + item.CONTRACTOR + '</td>'
                        + '<td width="15%">' + item.PROJECT_NAME + '</td>'
                        + '<td width="5%">' + item.INVESTMENT + '</td>'
                        + '<td width="5%">' + item.CONSTRUCTION_CIRCLE + '</td>'
                        + '<td width="9%">' + item.VENDINC + '</td>'
                        + '<td width="9%">' + item.RATGRO + '</td>'
                        + '<td width="5%">' + item.TYPE_NAME + '</td>'
                        + '<td width="8%">' + item.PRODUCT_STATUS_NAME + '</td>'
                        + '<td width="10%">' + item.CONSTRUCTION_SITE + '</td>'
                        + '<td width="5%">' + item.AREA_CODE + '</td></tr>')
                })

                // 显示总数
                $("#comTotal").text(window.companyNum)
                pageObj(window.listNum, window.wCurrent,result.data.count);

            } else if (result.status == 10003) {
                localStorage.clear();
            } else {

            }
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
                AREA: window.AREA,
            });
        }
    });
}