var YEAR = '';
var ENTNAME= '';
//var UNISCID= '';
var AREA_VALUE='';
var INDUSTRY= '';
var ORDERBY="";
var ORDERFIELD="";
var tableIns;
var MONTH="";
var colConf = LAY_EXCEL.makeColConfig({
    'A': 200,
    'B': 80,
    'C': 150
}, 70);
$(function () {
    YEAR = getUrlValue('YEAR');
    MONTH=(!getUrlValue('MONTH'))?"":getUrlValue('MONTH');
    if(getUrlValue('AREA_VALUE')){
        AREA_VALUE = getUrlValue('AREA_VALUE');
        if(AREA_VALUE!='360100'){
            $("#AREA_VALUE").val(AREA_VALUE);
            $("#areadiv").hide();
        }else{
            AREA_VALUE="";
        }
    }
    INDUSTRY=(!getUrlValue('INDUSTRY'))?"":getUrlValue('INDUSTRY');//所属国民经济行业分类
    $("#INDUSTRY").val(INDUSTRY);
    if(INDUSTRY!="NK05"){
        if(INDUSTRY=="NK06"){
            $(".hide_icon").hide();
        }else{
            $("#industrydiv").hide();
        }
    }
    //搜索按钮
    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        /*UNISCID=$('#UNISCID').val();*/
        INDUSTRY=$('#INDUSTRY').val();
        AREA_VALUE=$("#AREA_VALUE").val();

        tableIns.reload({
            where: {
                param:JSON.stringify(
                    {
                        YEAR: YEAR,
                        INDUSTRY: INDUSTRY,
                        ENTNAME: ENTNAME,
                        /*UNISCID: UNISCID,*/
                        AREA_VALUE:AREA_VALUE,
                        MONTH: MONTH,
                        ORDERBY:ORDERBY,
                        ORDERFIELD:ORDERFIELD
                    }
                )
            }
            , page: {
                curr: 1 //从当前页码开始
            }
        });
    });

    layui.use('table', function(){
        var table = layui.table;

        //第一个实例
        tableIns = table.render({
            elem: '#demo'
            ,url: BASE_URL + '/entHomePage/getQzgqyList'//数据接口
            ,method: 'post'//默认：get请求
            ,page: true //开启分页
            ,request: {
                pageName: 'page', //页码的参数名称，默认：pageNum
                limitName: 'limit' //每页数据量的参数名，默认：pageSize
            }
            ,response:{
                statusName: 'code', //数据状态的字段名称，默认：code
                statusCode: 200, //成功的状态码，默认：0
                countName: 'count', //数据总数的字段名称，默认：count
                dataName: 'list' //数据列表的字段名称，默认：data
            }
            ,where:{
                param:JSON.stringify(
                    {YEAR: YEAR,
                        INDUSTRY: INDUSTRY,
                        ENTNAME: ENTNAME,
                        /*UNISCID: UNISCID,*/
                        MONTH: MONTH,
                        AREA_VALUE:AREA_VALUE}
                )
            }
            ,limits:[20,30,40,50,60,70,80,90,100,200,500,1000]
            ,limit:20
            ,cols: [[ //表头
                {type: 'numbers',width:'5%', title: '序号'}
                ,{field: 'ENTNAME', title: '企业名称',templet: function(res) {
                    if(res.IS_XSG=='1'){
                        return "<span style='color: #ff7700'>"+res.ENTNAME+"</span>";
                    }else{
                        return res.ENTNAME;
                    }
                }}
                ,{field: 'CODE_NAME', title: '国民经济行业分类'}
                ,{field: 'AREA_NAME', width:'8%', title: '所属地区'}
                ,{field: 'UNISCID', title: '统一社会信用代码'}
            ]]
            ,autoSort: false
            ,done: function(res, curr, count){

            }
        });
        //监听排序事件
        table.on('sort(test)', function (obj){
            ORDERBY=obj.type;
            ORDERFIELD=obj.field;
            tableIns.reload({
                initSort: obj////记录初始排序，如果不设的话，将无法标记表头的排序状态。
                ,where: {
                    param:JSON.stringify(
                        {YEAR: YEAR,
                            INDUSTRY: INDUSTRY,
                            ENTNAME: ENTNAME,
                            /*UNISCID: UNISCID,*/
                            AREA_VALUE:AREA_VALUE,
                            MONTH: MONTH,
                            ORDERBY:obj.type,
                            ORDERFIELD:obj.field
                        }
                    )
                }
                , page: {
                    curr: 1 //从当前页码开始
                }
            });
        })

        //定义点击事件
        table.on('row(test)', function(obj){
            var datas = {};
            datas.REGNO=obj.data.ENTNAME;
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
        });

        $("#exports").click(function () {
            layer.msg("正在下载，请稍后")
            var params = {
                YEAR: YEAR,
                INDUSTRY: INDUSTRY,
                ENTNAME: ENTNAME,
                /*UNISCID: UNISCID,*/
                AREA_VALUE:AREA_VALUE,
                MONTH: MONTH,
                ORDERBY:ORDERBY,
                ORDERFIELD:ORDERFIELD
            }
            doData(BASE_URL + '/entHomePage/getQzgqyList2',params,function (result) {
                if(result.status = "10001"){
                    var exportData=result.data;
                    exportData.unshift({ENTNAME: '企业名称',AREA_NAME:'所属区域',CODE_NAME:'国民经济行业分类'});
                    LAY_EXCEL.exportExcel(exportData,"潜在规上企业名单.xlsx", "xlsx", {
                        extend: {
                            '!cols': colConf
                        }
                    });
                }
            })
        });
    });

})
