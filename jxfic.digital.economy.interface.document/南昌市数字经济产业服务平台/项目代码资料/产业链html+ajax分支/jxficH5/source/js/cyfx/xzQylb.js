var ENTNAME= '';
var UNISCID= '';
var AREA_NAME='';
var AREA_VALUE='';
var INDUSTRY= '';
var ESTDATEMONTH='';
var ESTDATEYEAR='';
var time_date='';
var ZCZJ='';
var NLJG = '';
var ORDERBY="";
var ORDERFIELD="";
var tableIns;
var TYPE = '';
var colConf = LAY_EXCEL.makeColConfig({
    'A': 200,
    'B': 140,
    'D': 80,
    'G': 150,
    'H': 180,
}, 70);
$(function () {
    $("#title").text(getUrlValue('qytitle'));
    AREA_NAME=getUrlValue('AREA_NAME');
    ESTDATEMONTH=(!getUrlValue('ESTDATEMONTH'))?'':getUrlValue('ESTDATEMONTH');//月份新增
    ESTDATEYEAR=(!getUrlValue('ESTDATEYEAR'))?'':getUrlValue('ESTDATEYEAR');//年份新增
    time_date=(!getUrlValue('time_date'))?'':getUrlValue('time_date');//年份新增
    ZCZJ=(!getUrlValue('ZCZJ'))?'':getUrlValue('ZCZJ');
    NLJG = (!getUrlValue('NLJG'))?'':getUrlValue('NLJG');
    TYPE = (!getUrlValue('TYPE'))?'':getUrlValue('TYPE');
    if(AREA_NAME!=null&&AREA_NAME!=''){
        $("#areadiv").hide();
    }
    INDUSTRY=getUrlValue('INDUSTRY');//所属国民经济行业分类
    if(INDUSTRY!=null&&INDUSTRY!=''){
        $("#industrydiv").hide();
        $("#INDUSTRY").val(INDUSTRY);
    }
    //搜索按钮
    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        UNISCID=$('#UNISCID').val();
        INDUSTRY=$('#INDUSTRY').val();
        AREA_VALUE=$("#AREA_VALUE").val();
        time_date=$("#time_date").val();
        tableIns.reload({
            where: {
                param:JSON.stringify(
                    {
                        AREA_NAME: AREA_NAME,
                        INDUSTRY: INDUSTRY,
                        ENTNAME: ENTNAME,
                        UNISCID: UNISCID,
                        ESTDATEMONTH:ESTDATEMONTH,
                        AREA_VALUE:AREA_VALUE,
                        ESTDATEYEAR:ESTDATEYEAR,
                        time_date:time_date,
                        ZCZJ:ZCZJ,
                        NLJG:NLJG,
                        TYPE:TYPE,
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

    layui.use(['table','laydate'], function(){
        var table = layui.table;
        var laydate = layui.laydate;
        laydate.render({
            elem: '#time_date',
            type: 'month',
            value: time_date
        })
        //第一个实例
        tableIns = table.render({
            elem: '#demo'
            ,url: BASE_URL + '/entHomePage/getXzCompanyDetailsList'//数据接口
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
                    {
                    AREA_NAME: AREA_NAME,
                    INDUSTRY: INDUSTRY,
                    ENTNAME: ENTNAME,
                    UNISCID: UNISCID,
                    ESTDATEMONTH:ESTDATEMONTH,
                    ESTDATEYEAR:ESTDATEYEAR,
                    time_date:time_date,
                    ZCZJ:ZCZJ,
                    NLJG:NLJG,
                    TYPE:TYPE
                    }
                )
            }
            ,limits:[20,30,40,50,60,70,80,90,100,200,500,1000]
            ,limit:20
            ,cols: [[ //表头
                {type: 'numbers', width:'5%',title: '序号'}
                ,{field: 'ENTNAME', title: '企业名称',edit:'entname'}
                ,{field: 'CODE_NAME', title: '国民经济行业分类'}
                ,{field: 'AREA_NAME',width:'8%', title: '所属地区'}
                ,{field: 'REGCAP', width:'9%', title: '注册资金（万元）',sort:'true'}
                ,{field: 'ESTDATES', width:'8%',title: '成立日期',sort:'true'}
                ,{field: 'ratgro',width:'7%', title: '纳税额',sort:'true'}
                ,{field: 'ENTTYPE_CN', width:'13%',title: '企业类型'}
                ,{field: 'UNISCID', width:'10%',title: '统一社会信用代码'}
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
                            AREA_NAME: AREA_NAME,
                            INDUSTRY: INDUSTRY,
                            ENTNAME: ENTNAME,
                            UNISCID: UNISCID,
                            ESTDATEMONTH:ESTDATEMONTH,
                            AREA_VALUE:AREA_VALUE,
                            ESTDATEYEAR:ESTDATEYEAR,
                            time_date:time_date,
                            ZCZJ:ZCZJ,
                            NLJG:NLJG,
                            TYPE:TYPE,
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
               AREA_NAME: AREA_NAME,
               INDUSTRY: INDUSTRY,
               ENTNAME: ENTNAME,
               UNISCID: UNISCID,
               ESTDATEMONTH:ESTDATEMONTH,
               AREA_VALUE:AREA_VALUE,
               ESTDATEYEAR:ESTDATEYEAR,
               time_date:time_date,
               ZCZJ:ZCZJ,
               NLJG:NLJG,
               TYPE:TYPE,
               ORDERBY:ORDERBY,
               ORDERFIELD:ORDERFIELD
           }
           doData(BASE_URL + '/entHomePage/exportXzEntlist',params,function (result) {
               if(result.status = "10001"){
                   var exportData=result.data;
                   exportData.unshift({ENTNAME: '企业名称',CODE_NAME:'国民经济行业分类',AREA_NAME:'所属区域',REGCAP:'注册资金(万元)',ESTDATES:'成立日期',ratgro:'纳税额',ENTTYPE_CN:'企业类型',UNISCID: '统一社会信用代码'});
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
