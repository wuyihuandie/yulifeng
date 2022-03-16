var companyNum = 0; // 总数
var wCurrent = 0; // 当前页
var wLimit = "10"; // 每页多少条数据
var listNum = 0; // 总页数
var PARENT_DL= "";
$(function () {

    queryRank({page: "1", limit: window.wLimit});//渲染企业列表

    $('#query').on('click', function() {
        var POLICY_NAME=$('#POLICY_NAME').val();
        var PARENT_DL=$('#PARENT_DL').val();
        queryRank({page: "1", limit: window.wLimit,POLICY_NAME: POLICY_NAME,PARENT_DL:PARENT_DL})
    });

})

function queryRank(paramsObj) {
    var params = {
        page: paramsObj.page,
        limit: paramsObj.limit,
        PARENT_DL: paramsObj.PARENT_DL,
        POLICY_NAME: paramsObj.POLICY_NAME,
    }
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/industrialChainController/getPolicylist',
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
                window.listNum = companyNum / wLimit < 0 ? 0 : Math.ceil(companyNum / wLimit);

                result.data.list.forEach(function (item, index) {
                    $("#rTbox").append('<tr><td width="1%">' + (wLimit*(result.data.page-1)+index+1) + '</td>'
                        + '<td width="5%">' + item.LEVEL_NAME + '</td>'
                        + '<td width="20%">' + item.POLICY_NAME + '</td>'
                        + '<td width="10%">' + item.LICNO + '</td>'
                        + '<td width="10%">' + item.PUBLISH_UNIT + '</td>'
                        + '<td width="54%">' + item.CONTENT + '</td></tr>')
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
            });
        }
    });
}