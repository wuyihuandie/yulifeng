var companyNum = 0; // 总数
var wCurrent = 0; // 当前页
var wLimit = "10"; // 每页多少条数据
var listNum = 0; // 总页数

var AREA = "360100"; //区域
var PARENT_DL = ''; // 产业代码
var CHAIN_LINK_NAME = ''; // 链条名

var ENTNAME= '';
var UNISCID= '';
$(function () {
    PARENT_DL=GetQueryString('PARENT_DL');
    CHAIN_LINK_NAME=GetQueryString('CHAIN_LINK_NAME');

    queryRank({page: "1", limit: window.wLimit});//渲染企业列表

    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        UNISCID=$('#UNISCID').val();
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
        AREA_CODE: window.AREA,
        YEAR: window.YEAR,
        PARENT_DL: window.PARENT_DL,
        CHAIN_LINK_NAME: window.CHAIN_LINK_NAME,
        ENTNAME: window.ENTNAME,
        UNISCID: window.UNISCID,
    }
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/industrialChainController/getEnterpriseBychainIdList',
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
                    $("#rTbox").append('<tr><td width="1%">' + index + '</td>'
                        + '<td width="15%">' + item.ENTNAME + '</td>'
                        + '<td width="10%">' + item.UNISCID + '</td>'
                        + '<td width="20%">' + item.DOM + '</td>'
                        + '<td width="8%">' + item.VENDINC + '</td>'
                        + '<td width="8%">' + item.RATGRO + '</td>'
                        + '<td width="8%">' + item.NETINC + '</td>'
                        + '<td width="8%">' + item.EMPNUM + '</td>'
                        + '<td width="12%">' + item.CHAIN_NAME + '</td>'
                        + '<td width="10%">' + item.AREA_NAME + '</td></tr>')
                })

                // 显示总数
                $("#comTotal").text(window.companyNum)
                pageObj(window.listNum, window.wCurrent)

            } else if (result.status == 10003) {
                localStorage.clear();
            } else {

            }
        }
    })

}

function pageObj(listNum, wCurrent) {
    var box = new Pagination('#page', {
        total: listNum,//总页数
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