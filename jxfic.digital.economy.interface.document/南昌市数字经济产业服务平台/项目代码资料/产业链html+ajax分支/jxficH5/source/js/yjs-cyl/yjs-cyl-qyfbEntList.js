var YEAR = ""; //年份
var ENTNAME= '';
var AREA_NAME='';
var AREA_VALUE='';
var INDUSTRY= '';
var LEVEL_NAME='';
var PARENT_DL='';
var ORDERBY="";
var ORDERFIELD="";
var tableIns;
$(function () {
    $("#title").text(getUrlValue('qytitle'));
    YEAR = getUrlValue('YEAR');//年份总量
    // AREA_NAME=getUrlValue('AREA_NAME');
    LEVEL_NAME = getUrlValue('LEVEL_NAME');
    PARENT_DL = getUrlValue('PARENT_DL');
    AREA_NAME = getUrlValue('AREA_NAME');
    console.log("AREA_NAME:"+AREA_NAME);
    if(AREA_NAME!=null&&AREA_NAME!=''){
        $("#areadiv").hide();
    }
    //搜索按钮
    $('#query').on('click', function() {
        ENTNAME=$('#ENTNAME').val();
        UNISCID=$('#UNISCID').val();
        //AREA_VALUE=$("#AREA_VALUE").val();
        tableIns.reload({
            where: {
                param:JSON.stringify(
                    {
                        YEAR: YEAR,
                        ENTNAME: ENTNAME,
                        UNISCID:UNISCID,
                        LEVEL_NAME:LEVEL_NAME,
                        PARENT_DL:PARENT_DL,
                        AREA_NAME:AREA_NAME
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
            ,url: BASE_URL + '/industrialChainController/getEntInfoByParan'//数据接口
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
                        YEAR: YEAR,
                        LEVEL_NAME:LEVEL_NAME,
                        PARENT_DL:PARENT_DL,
                        AREA_NAME:AREA_NAME
                    }
                )
            }
            ,limits:[20,30,40,50,60,70,80,90,100,200,500,1000]
            ,limit:20
            ,cols: [[ //表头
                {type: 'numbers', title: '序号'}
                ,{field: 'ENTNAME', title: '企业名称'}
                ,{field: 'UNISCID', title: '统一社会信用代码'}
                ,{field: 'AREA_NAME',width:'10%', title: '所属地区'}
                ,{field: 'REGCAP', width:'11%', title: '注册资金（万元）',sort:'true'}
                ,{field: 'ESTDATE', width:'10%',title: '成立日期',sort:'true'}
                ,{field: 'ENTTYPE_CN', width:'20%',title: '企业类型'}

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
                            YEAR: YEAR,
                            LEVEL_NAME:LEVEL_NAME,
                            PARENT_DL:PARENT_DL,
                            AREA_NAME:AREA_NAME,
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
            var ins1=table.render({
                elem: '#data_export',
                url: BASE_URL + '/industryDistributionController/getCompanyDetailsList2', //数据接口
                method:'post',
                title: '企业清单',
                where: {
                    param:JSON.stringify(
                        {YEAR: YEAR,
                            AREA_NAME: AREA_NAME,
                            INDUSTRY: INDUSTRY,
                            ENTNAME: ENTNAME,
                            UNISCID: UNISCID,
                            ESTDATEMONTH:ESTDATEMONTH,
                            AREA_VALUE:AREA_VALUE,
                            ESTDATEYEAR:ESTDATEYEAR,
                            ORDERBY:ORDERBY,
                            ORDERFIELD:ORDERFIELD
                        }
                    )
                },
                cols: [[
                    {type:'numbers',width:'8%', title: '序号',sort: true}
                    ,{field:'ENTNAME',  title: '企业名称',sort: true}
                    ,{field:'CODE_NAME',  title: '国民经济行业分类',sort: true}
                    ,{field:'AREA_NAME',  title: '所属区域',sort: true}
                    ,{field:'REGCAP',width:'8%', title: '注册资金（万元）',sort: true}
                    ,{field:'ESTDATES',  title: '成立日期',sort: true}
                    ,{field:'ENTTYPE_CN',  title: '企业类型',sort: true}
                    ,{field:'UNISCID',  title: '统一社会信用代码',sort: true}
                ]],
                page: false, //开启分页
                done: function (res, curr, count) {
                    //layer.close(loading);

                    exportData=res.data;
                    table.exportFile(ins1.config.id,exportData, 'xls');
                }
            });
        });
    });

})
