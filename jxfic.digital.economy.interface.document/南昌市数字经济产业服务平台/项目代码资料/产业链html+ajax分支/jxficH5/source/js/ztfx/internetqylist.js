var YEAR = ""; //年份
var ENTNAME= '';
var UNISCID= '';
var AREA_VALUE='';
var ENTNAME= '';
var TYPE='';
var ORDERBY="";
var ORDERFIELD="";
var tableIns;
var colConf = LAY_EXCEL.makeColConfig({
    'A': 200,
    'G': 150,
    'H': 150,
    'I': 300
}, 70);
$(function () {
    $("#title").text(getUrlValue('qytitle'));
    AREA_VALUE = getUrlValue('area_value');//年份总量
    if(AREA_VALUE!=null&&AREA_VALUE!=''){
        $("#areadiv").hide();
    }
    //搜索按钮
    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        UNISCID=$('#UNISCID').val();
        AREA_VALUE=$("#AREA_VALUE").val();
        TYPE=$('#TYPE').val();

        tableIns.reload({
            where: {
                param:JSON.stringify(
                    {
                        ENTNAME: ENTNAME,
                        UNISCID: UNISCID,
                        AREA_VALUE: AREA_VALUE,
                        TYPE: TYPE,
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
            ,url: BASE_URL + '/ztfxController/getInternetEntList'//数据接口
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
                    {ENTNAME: ENTNAME,
                        UNISCID: UNISCID,
                        AREA_VALUE: AREA_VALUE,
                        TYPE: TYPE}
                )
            }
            ,limits:[20,30,40,50,60,70,80,90,100,200,500,1000]
            ,limit:20
            ,cols: [[ //表头
                {type: 'numbers', width:'5%',title: '序号'}
                ,{field: 'ENTNAME', title: '企业名称'}
                ,{field: 'TYPE', width:'5%', title: '类型'}
                ,{field: 'AREA_NAME',width:'8%', title: '所属地区'}
                ,{field: 'REGCAP', width:'9%', title: '注册资金（万元）',sort:'true'}
                ,{field: 'ESTDATE', width:'8%',title: '成立日期',sort:'true'}
                ,{field: 'NAME',width:'7%', title: '法人姓名'}
                ,{field: 'ENTTYPE_CN', width:'13%',title: '企业类型'}
                ,{field: 'UNISCID', width:'10%',title: '统一社会信用代码'}
                ,{field: 'MAIN_BUSINISS',width:'15%', title: '主营业务'}
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
                        {
                            ENTNAME: ENTNAME,
                            UNISCID: UNISCID,
                            AREA_VALUE: AREA_VALUE,
                            TYPE: TYPE,
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
           var params = {ENTNAME: ENTNAME,
               UNISCID: UNISCID,
               AREA_VALUE: AREA_VALUE,
               TYPE: TYPE,
               ORDERBY:ORDERBY,
               ORDERFIELD:ORDERFIELD
           }
           doData(BASE_URL + '/ztfxController/getInternetEntList2',params,function (result) {
                if(result.status = "10001"){
                    var exportData=result.data;
                    exportData.unshift({ENTNAME: '企业名称',TYPE:'类型',AREA_NAME:'所属区域',REGCAP:'注册资金(万元)',ESTDATE:'成立日期',NAME:'法人姓名',ENTTYPE_CN:'企业类型',UNISCID: '统一社会信用代码',MAIN_BUSINISS: '主营业务'});
                    LAY_EXCEL.exportExcel(exportData,"企业名单.xlsx", "xlsx", {
                        extend: {
                            '!cols': colConf
                        }
                    });
                }
           })
        });
    });

})
