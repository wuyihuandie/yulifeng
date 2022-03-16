var PARENT_DL='ZK06';
var CONDITION = 'VENDINC';
var YEAR='2020';
var CUSTOMIZE = '';
$(function(){
    //queryEntList();
})
//切换排序条件
function changeOrder(type){
    if(type==1){
        CONDITION='REGCAP';
    }else if(type==2){
        CONDITION='VENDINC';
    }else if(type==3){
        CONDITION='RATGRO';
    }else if(type==5){
        CONDITION='EMPNUM';
    }
    queryEntList();
}
//切换标签
function changeBj(type){
    CUSTOMIZE = '';
    queryEntList();
}
//企业总数统计  规上企业数  高新企业数  领军企业数  上市企业数 营业收入总额  纳税总额  从业人数总额

//查询企业清单列表
function queryEntList(){
    var datas = {};
    datas.YEAR=YEAR;
    datas.PARENT_DL=PARENT_DL;
    datas.CONDITION=CONDITION;
    datas.CUSTOMIZE=CUSTOMIZE;
    doData(BASE_URL+'/industrialChainController/getEnterpriseListByCondition',datas,function(result){
        if(result.status == '10001'){
            var listData = result.data.EntMsg;
            var htmlData = "";
            for(var i = 0;i<listData.length;i++){//循环拼接排名列表内容
                var VENDINC = listData[i].VENDINC;
                if(VENDINC==undefined||VENDINC=='undefined'){
                    VENDINC='';
                }
                var RATGRO = listData[i].RATGRO;
                if(RATGRO==undefined||RATGRO=='undefined'){
                    RATGRO='';
                }
                var EMPNUM = listData[i].EMPNUM;
                if(EMPNUM==undefined||EMPNUM=='undefined') {
                    EMPNUM = '';
                }
                var AREA_NAME = listData[i].AREA_NAME
                if(AREA_NAME==undefined||AREA_NAME=='undefined'){
                    AREA_NAME='';
                }
                var DOM = listData[i].DOM
                if(DOM==undefined||DOM=='undefined'){
                    DOM='';
                }
                if(i<3){

                }
                htmlData +=  '<tr><td><i>'+(i+1)+'</i></td>'+
                    '<td>'+AREA_NAME+'</td><td>'+listData[i].ENTNAME+'</td>'+
                    '<td>'+listData[i].REGCAP+'</td><td>'+listData[i].ESTDATE+'</td>'+
                    '<td>'+DOM+'</td><td>'+VENDINC+'</td><td>'+RATGRO+'</td><td>'+EMPNUM;
            }
            $(".entBody").html(htmlData);
        }
    })

}