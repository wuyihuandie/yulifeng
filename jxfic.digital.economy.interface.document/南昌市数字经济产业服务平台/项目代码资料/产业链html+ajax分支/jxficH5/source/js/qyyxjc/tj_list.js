var tday = new Date().getDate();
//初始化年份
var CYEAR;
//当前月份
var tMonth;
if(new Date().getMonth()==0||new Date().getMonth()==1){
    tMonth = 12;
    CYEAR = YEAR-1+'';
}else{
    CYEAR = YEAR;
    if(new Date().getMonth()==2){
        tMonth = new Date().getMonth();
    }else{
        if(tday<19){
            tMonth = new Date().getMonth()-1;
        }else{
            tMonth = new Date().getMonth();
        }
    }

}

let ac_gs=1,ac_sg=1,ac_xg=1,ac_qz=1,ac_ys=1,ac_yszs=1,feedback_zs=1,ac_gxd=1;
let yc_gs=1,yc_sg=1,yc_xg=1,yc_ys=1,yc_yszs=1,yc_gxd=1;
let arrRank=[];//需要排序的数据
let arrRanks=[];
var MODEL_VALUE="1";
var MONTH = tMonth;//当前月份

//排序字段
var pxcoloum="";
//排序规则
var orders="asc";
//展示字段,默认规上企业
var actual_type='actual_gsqy_num';
var yc_type='yg_gsqy_num';
$(function(){
    queryTjList();
    $(".ctitl .ctitle").text(CYEAR);
    $(".mtitl .ctitle").text(MONTH);
    if(new Date().getMonth()==0||new Date().getMonth()==1){
        $(".localmonth").text(YEAR+'年1-2');
    }else{
        $(".localmonth").text('1-'+(MONTH+1));
    }
    $(".lastmonth").text(MONTH);

    //年份点击
    $('.years .cleft').click(function(){
        var year = $(".ctitl .ctitle").text();
        if(year!='2021'){
            year--;
            if(year<YEAR){
                MONTH=12;
                $(".mtitl .ctitle").text(MONTH);
                $(".localmonth").text(YEAR+'年1-2');
                $(".lastmonth").text(MONTH);
            }
            $(".ctitl .ctitle").text(year);
            CYEAR=year+"";
            actual_type='actual_gsqy_num';
            yc_type='yg_gsqy_num';
            queryTjList();
        }
    })
    $('.years .cright').click(function(){
        var year = $(".ctitl .ctitle").text();
        if((year==(YEAR-1)&&new Date().getMonth()>1)||(YEAR!=year&&year!=(YEAR-1))){
            year++;
            if(year==YEAR){
                MONTH=tMonth;
                $(".mtitl .ctitle").text(tMonth);
                if(MONTH==12){
                    $(".localmonth").text(YEAR+'年1-2');
                }else{
                    $(".localmonth").text('1-'+(tMonth+1));
                }
                $(".lastmonth").text(MONTH);
            }
            $(".ctitl .ctitle").text(year);
            CYEAR=year+"";
            actual_type='actual_gsqy_num';
            yc_type='yg_gsqy_num';
            queryTjList();
        }
    })
    //月份点击
    $('.month .mleft').click(function(){
        var month = $(".mtitl .ctitle").text();
        var year = $(".ctitl .ctitle").text();
        if(month!=2){
            month--;
            $(".mtitl .ctitle").text(month);
            MONTH=month+"";
            $(".localmonth").text('1-'+(month+1));
            $(".lastmonth").text(MONTH);
            actual_type='actual_gsqy_num';
            yc_type='yg_gsqy_num';
            queryTjList();
        }else{
            if(year!='2021'){
                month=12;
                year--
                $(".ctitl .ctitle").text(year);
                CYEAR=year+"";
                $(".mtitl .ctitle").text(month);
                MONTH=month+"";
                if((new Date().getMonth()==0||new Date().getMonth()==1)||MONTH==12){
                    $(".localmonth").text(YEAR+'年1-2');
                }else{
                    $(".localmonth").text('1-'+(month+1));
                }
                $(".lastmonth").text(MONTH);
                actual_type='actual_gsqy_num';
                yc_type='yg_gsqy_num';
                queryTjList();
            }
        }

    })
    $('.month .mright').click(function(){
        var month = $(".mtitl .ctitle").text();
        if(month!=12){
            month++;
            $(".mtitl .ctitle").text(month);
            MONTH=month+"";
            if((new Date().getMonth()==0||new Date().getMonth()==1)||MONTH==12){
                $(".localmonth").text(YEAR+'年1-2');
            }else{
                $(".localmonth").text('1-'+(month+1));
            }
            $(".lastmonth").text(MONTH);
            actual_type='actual_gsqy_num';
            yc_type='yg_gsqy_num';
            queryTjList();
        }
    })
    //潜在规上企业
    $('.ac_qz').click(function(){
        pxcoloum="a.actual_qzgsqy_num";
        if(ac_qz == 0) {
            arrRank.sort(compareUp('actual_qzgsqy_num'));
            orders="asc";
            renderRankData();
            ac_qz = 1;
        } else if(ac_qz == 1) {
            arrRank.sort(compareDown('actual_qzgsqy_num'));
            orders="desc";
            renderRankData();
            ac_qz = 0;
        }
    })
    // 实际营收
    $('.ac_ys').click(function(){
        pxcoloum="a.actual_ys_num";
        if(ac_ys == 0) {
            arrRank.sort(compareUp('actual_ys_num'));
            orders="asc";
            renderRankData();
            ac_ys = 1;
        } else if(ac_ys == 1) {
            arrRank.sort(compareDown('actual_ys_num'));
            orders="desc";
            renderRankData();
            ac_ys = 0;
        }
    })
    // 实际营收增速
    $('.ac_yszs').click(function(){
        pxcoloum="a.actual_yszs";
        if(ac_yszs == 0) {
            arrRank.sort(compareUp('actual_yszs'));
            orders="asc";
            renderRankData();
            ac_yszs = 1;
        } else if(ac_yszs == 1) {
            arrRank.sort(compareDown('actual_yszs'));
            orders="desc";
            renderRankData();
            ac_yszs = 0;
        }
    })
    // 反馈增速
    $('.feedback_zs').click(function(){
        pxcoloum="a.feedback_yszs";
        if(feedback_zs == 0) {
            arrRank.sort(compareUp('feedback_yszs'));
            orders="asc";
            renderRankData();
            feedback_zs = 1;
        } else if(feedback_zs == 1) {
            arrRank.sort(compareDown('feedback_yszs'));
            orders="desc";
            renderRankData();
            feedback_zs = 0;
        }
    })
    //实际贡献度
    $('.ac_gxd').click(function(){
        pxcoloum="a.actual_gxd";
        if(ac_gxd == 0) {
            arrRank.sort(compareUp('actual_gxd'));
            orders="asc";
            renderRankData();
            ac_gxd = 1;
        } else if(ac_gxd == 1) {
            arrRank.sort(compareDown('actual_gxd'));
            orders="desc";
            renderRankData();
            ac_gxd = 0;
        }
    })

    // 预测规上企业
    /*$('.yc_gs').click(function(){
        pxcoloum="a.yg_gsqy_num";
        if(yc_gs == 0) {
            arrRank.sort(compareUp('yg_gsqy_num'));
            orders="asc";
            renderRankData();
            yc_gs = 1;
        } else if(yc_gs == 1) {
            arrRank.sort(compareDown('yg_gsqy_num'));
            orders="desc";
            renderRankData();
            yc_gs = 0;
        }
    })*/
    // 预测上规企业
    /*$('.yc_sg').click(function(){
        pxcoloum="a.yg_sgqy_num";
        if(yc_sg == 0) {
            arrRank.sort(compareUp('yg_sgqy_num'));
            orders="asc";
            renderRankData();
            yc_sg = 1;
        } else if(yc_sg == 1) {
            arrRank.sort(compareDown('yg_sgqy_num'));
            orders="desc";
            renderRankData();
            yc_sg = 0;
        }
    })*/
    // 预测下规企业
    /*$('.yc_xg').click(function(){
        pxcoloum="a.yg_xgqy_num";
        if(yc_xg == 0) {
            arrRank.sort(compareUp('yg_xgqy_num'));
            orders="asc";
            renderRankData();
            yc_xg = 1;
        } else if(yc_xg == 1) {
            arrRank.sort(compareDown('yg_xgqy_num'));
            orders="desc";
            renderRankData();
            yc_xg = 0;
        }
    })*/
    // 预测营收
    $('.yc_ys').click(function(){
        pxcoloum="a.yg_ys_num";
        if(yc_ys == 0) {
            arrRank.sort(compareUp('yg_ys_num'));
            orders="asc";
            renderRankData();
            yc_ys = 1;
        } else if(yc_ys == 1) {
            arrRank.sort(compareDown('yg_ys_num'));
            orders="desc";
            renderRankData();
            yc_ys = 0;
        }
    })
    // 预测营收增速
    $('.yc_yszs').click(function(){
        pxcoloum="a.yg_yszs";
        if(yc_yszs == 0) {
            arrRank.sort(compareUp('yg_yszs'));
            orders="asc";
            renderRankData();
            yc_yszs = 1;
        } else if(yc_yszs == 1) {
            arrRank.sort(compareDown('yg_yszs'));
            orders="desc";
            renderRankData();
            yc_yszs = 0;
        }
    })
    //预测贡献度
    $('.yc_gxd').click(function(){
        pxcoloum="a.yc_gxd";
        if(yc_gxd == 0) {
            arrRank.sort(compareUp('yc_gxd'));
            orders="asc";
            renderRankData();
            yc_gxd = 1;
        } else if(yc_gxd == 1) {
            arrRank.sort(compareDown('yc_gxd'));
            orders="desc";
            renderRankData();
            yc_gxd = 0;
        }
    })

})
//数据查询
function queryTjList(){
    var params={CODE_VALUE : MONTH + '',YEAR:CYEAR,model_value:MODEL_VALUE}
    arrRank=[];
    arrRanks=[];
    doData(BASE_URL+"/tjfxController/queryTjList",params,function(result){

        if(result.status == '10001'){
            result.data.forEach(function(item,index){
                if(item.area_code=='360000'||item.area_code=='360100'){
                    arrRanks.push(item);
                }else{
                    arrRank.push(item);
                }

            })
            renderRankData();
        }
    })
}
function changeData(ths){
    MODEL_VALUE=$(ths).val();
    actual_type='actual_gsqy_num';
    yc_type='yg_gsqy_num';
    queryTjList();
}
function changeActualColumn(ths){
    actual_type=$(ths).val();
    renderRankData();
}
function changeYcColumn(ths){
    yc_type=$(ths).val();
    renderRankData();
}
// 点击后对排名数据排序（升序)
function compareUp(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
// 点击后对排名数据排序（降序)
function compareDown(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
//处理数据
function renderRankData(){
    var str = "";
    $("#demo tr:gt(2)").remove();
    arrRanks.forEach(function(item,index){
        var area_name = item.area_name;
        var actual_gsqy_goal = (item.actual_gsqy_goal!=undefined&&item.actual_gsqy_goal!='undefined')?item.actual_gsqy_goal:'-';
        var actual_gsqy_num = (item.actual_gsqy_num!=undefined&&item.actual_gsqy_num!='undefined')?item.actual_gsqy_num:'-';
        var actual_sgqy_num = (item.actual_sgqy_num!=undefined&&item.actual_sgqy_num!='undefined')?item.actual_sgqy_num:'-';
        var actual_xgqy_num = (item.actual_xgqy_num!=undefined&&item.actual_xgqy_num!='undefined')?item.actual_xgqy_num:'-';
        /*var actual_qzgsqy_num = (item.actual_qzgsqy_num!=undefined&&item.actual_qzgsqy_num!='undefined')?item.actual_qzgsqy_num:'-';*/
        var actual_ys_num = (item.actual_ys_num!=undefined&&item.actual_ys_num!='undefined')?item.actual_ys_num:'-';
        var actual_tqys_num = (item.actual_tqys_num!=undefined&&item.actual_tqys_num!='undefined')?item.actual_tqys_num:'-';
        var actual_yszs = (item.actual_yszs!=undefined&&item.actual_yszs!='undefined')?item.actual_yszs:'-';
        var feedback_yszs = (item.feedback_yszs!=undefined&&item.feedback_yszs!='undefined')?item.feedback_yszs:'-';
        var actual_yszs_goal = (item.actual_yszs_goal!=undefined&&item.actual_yszs_goal!='undefined')?item.actual_yszs_goal:'-';
        var actual_gxd = (item.actual_gxd!=undefined&&item.actual_gxd!='undefined')?item.actual_gxd:'-';
        var yg_gsqy_goal = (item.yg_gsqy_goal!=undefined&&item.yg_gsqy_goal!='undefined')?item.yg_gsqy_goal:'-';
        var yg_gsqy_num = (item.yg_gsqy_num!=undefined&&item.yg_gsqy_num!='undefined')?item.yg_gsqy_num:'-';
        var yg_sgqy_num = (item.yg_sgqy_num!=undefined&&item.yg_sgqy_num!='undefined')?item.yg_sgqy_num:'-';
        var yg_xgqy_num = (item.yg_xgqy_num!=undefined&&item.yg_xgqy_num!='undefined')?item.yg_xgqy_num:'-';
        var yg_ys_num = (item.yg_ys_num!=undefined&&item.yg_ys_num!='undefined')?item.yg_ys_num:'-';
        var yg_yszs = (item.yg_yszs!=undefined&&item.yg_yszs!='undefined')?item.yg_yszs:'-';
        var yg_yszs_goal = (item.yg_yszs_goal!=undefined&&item.yg_yszs_goal!='undefined')?item.yg_yszs_goal:'-';
        var yc_gxd = (item.yc_gxd!=undefined&&item.yc_gxd!='undefined')?item.yc_gxd:'-';
        var stt = "";
        var sj = "";
        var yc = "";
        var yczs = "";

        if(actual_yszs_goal=='-'){
            stt='<td>'+actual_yszs+'</td><td>'+feedback_yszs+'</td>';
        }else{
            if(feedback_yszs=='-'){
                if(actual_yszs>=actual_yszs_goal){
                    stt='<td style="color: #ffb800">'+actual_yszs+'</td><td>'+feedback_yszs+'</td>';
                }else{
                    stt='<td style="color: lawngreen">'+actual_yszs+'</td><td>'+feedback_yszs+'</td>';
                }
            }else{
                if(actual_yszs>=actual_yszs_goal&&feedback_yszs>=actual_yszs_goal){
                    stt='<td style="color: #ffb800">'+actual_yszs+'</td><td style="color: #ffb800">'+feedback_yszs+'</td>';
                }else if(actual_yszs<actual_yszs_goal&&feedback_yszs<actual_yszs_goal){
                    stt='<td style="color: lawngreen">'+actual_yszs+'</td><td style="color: lawngreen">'+feedback_yszs+'</td>';
                }else if(actual_yszs>=actual_yszs_goal&&feedback_yszs<actual_yszs_goal){
                    stt='<td style="color: #ffb800">'+actual_yszs+'</td><td style="color: lawngreen">'+feedback_yszs+'</td>';
                }else if(actual_yszs<actual_yszs_goal&&feedback_yszs>=actual_yszs_goal){
                    stt='<td style="color: lawngreen">'+actual_yszs+'</td><td style="color: #ffb800">'+feedback_yszs+'</td>';
                }
            }
        }

        var display_column;
        var display_column2="";
        if(actual_type == 'actual_gsqy_num'){
            display_column=actual_gsqy_num;
            if(actual_gsqy_num>=actual_gsqy_goal){
                display_column2 = '<td onclick="openGsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;color: #ffb800;">'+actual_gsqy_num+'</td>'
                    /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
            }else{
                display_column2 = '<td onclick="openGsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_gsqy_num+'</td>'
                    /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
            }

        }else if(actual_type == 'actual_sgqy_num'){
            display_column = actual_sgqy_num;
            display_column2 = '<td onclick="openSgEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_sgqy_num+'</td>'
                /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
        }else if(actual_type == 'actual_xgqy_num'){
            display_column = actual_xgqy_num;
            display_column2 = '<td onclick="openXgEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_xgqy_num+'</td>'
                /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
        }

        //实际上报点击事件
        if(item.area_code!='360000'){
            if(actual_gsqy_num>=actual_gsqy_goal){
                if(getCookie("area_value")==360100||getCookie("area_value")==item.area_code) {
                    sj = display_column2;
                }else{
                    sj = '<td style="color: #ffb800;">'+display_column+'</td>'/*+'<td>'+actual_qzgsqy_num+'</td>'*/;
                }
            }else{
                if(getCookie("area_value")==360100||getCookie("area_value")==item.area_code) {
                    sj = display_column2;
                }else{
                    sj = '<td>'+display_column+'</td>'/*+'<td>'+actual_qzgsqy_num+'</td>'*/;
                }
            }
        }else{
            sj = '<td>'+display_column+'</td>'/*+'<td>'+actual_qzgsqy_num+'</td>'*/;
        }
        //预测同比增速标红
        if(yg_yszs_goal=='-'){
            yczs='<td>'+yg_yszs+'</td>';
        }else{
            if(yg_yszs>=yg_yszs_goal){
                yczs='<td style="color: #ffb800">'+yg_yszs+'</td>';
            }else{
                yczs='<td style="color: lawngreen">'+yg_yszs+'</td>';
            }
        }

        //预测点击事件判断
        if(item.area_code!='360000'){
            if(getCookie("area_value")==360100||getCookie("area_value")==item.area_code) {
                if(yc_type == 'yg_gsqy_num'){
                    yc = '<td onclick="openGsYcEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+yg_gsqy_num+'</td>';
                }else if(yc_type == 'yg_sgqy_num'){
                    yc = '<td onclick="openSgYcEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+yg_sgqy_num+'</td>';
                }else if(yc_type == 'yg_xgqy_num'){
                    yc = '<td>'+yg_xgqy_num+'</td>';
                }

            }else{
                if(yc_type == 'yg_gsqy_num'){
                    yc = '<td>'+yg_gsqy_num+'</td>';
                }else if(yc_type == 'yg_sgqy_num'){
                    yc = '<td>'+yg_sgqy_num+'</td>';
                }else if(yc_type == 'yg_xgqy_num'){
                    yc = '<td>'+yg_xgqy_num+'</td>';
                }
            }
        }else{
            if(yc_type == 'yg_gsqy_num'){
                yc = '<td>'+yg_gsqy_num+'</td>';
            }else if(yc_type == 'yg_sgqy_num'){
                yc = '<td>'+yg_sgqy_num+'</td>';
            }else if(yc_type == 'yg_xgqy_num'){
                yc = '<td>'+yg_xgqy_num+'</td>';
            }
        }
        str += '<tr class="data_body"><td class="bg3">-</td><td class="bg3">'+area_name+'</td>'
            +'<td class="title_fourth" style="width: 9%;">'+item.modelname+'</td>'
            +'<td>'+actual_gsqy_goal+'</td>'+sj+'<td>'+actual_ys_num+'</td><td>'+actual_tqys_num+'</td>'
            +stt+'<td>'+actual_yszs_goal+'</td><td>'+actual_gxd+'</td><td>'+yg_gsqy_goal+'</td>'+yc
            +'<td>'+yg_ys_num+'</td>'+yczs+'<td>'+yg_yszs_goal+'</td><td>'+yc_gxd+'</td></tr>';
    })
    arrRank.forEach(function(item,index){
        var area_name = (item.area_code=='360121')?(item.area_name+'(含小蓝经济开发区)'):item.area_name;
        var actual_gsqy_goal = (item.actual_gsqy_goal!=undefined&&item.actual_gsqy_goal!='undefined')?item.actual_gsqy_goal:'-';
        var actual_gsqy_num = (item.actual_gsqy_num!=undefined&&item.actual_gsqy_num!='undefined')?item.actual_gsqy_num:'-';
        var actual_sgqy_num = (item.actual_sgqy_num!=undefined&&item.actual_sgqy_num!='undefined')?item.actual_sgqy_num:'-';
        var actual_xgqy_num = (item.actual_xgqy_num!=undefined&&item.actual_xgqy_num!='undefined')?item.actual_xgqy_num:'-';
       /* var actual_qzgsqy_num = (item.actual_qzgsqy_num!=undefined&&item.actual_qzgsqy_num!='undefined')?item.actual_qzgsqy_num:'-';*/
        var actual_ys_num = (item.actual_ys_num!=undefined&&item.actual_ys_num!='undefined')?item.actual_ys_num:'-';
        var actual_tqys_num = (item.actual_tqys_num!=undefined&&item.actual_tqys_num!='undefined')?item.actual_tqys_num:'-';
        var actual_yszs = (item.actual_yszs!=undefined&&item.actual_yszs!='undefined')?item.actual_yszs:'-';
        var feedback_yszs = (item.feedback_yszs!=undefined&&item.feedback_yszs!='undefined')?item.feedback_yszs:'-';
        var actual_yszs_goal = (item.actual_yszs_goal!=undefined&&item.actual_yszs_goal!='undefined')?item.actual_yszs_goal:'-';
        var actual_gxd = (item.actual_gxd!=undefined&&item.actual_gxd!='undefined')?item.actual_gxd:'-';
        var yg_gsqy_goal = (item.yg_gsqy_goal!=undefined&&item.yg_gsqy_goal!='undefined')?item.yg_gsqy_goal:'-';
        var yg_gsqy_num = (item.yg_gsqy_num!=undefined&&item.yg_gsqy_num!='undefined')?item.yg_gsqy_num:'-';
        var yg_sgqy_num = (item.yg_sgqy_num!=undefined&&item.yg_sgqy_num!='undefined')?item.yg_sgqy_num:'-';
        var yg_xgqy_num = (item.yg_xgqy_num!=undefined&&item.yg_xgqy_num!='undefined')?item.yg_xgqy_num:'-';
        var yg_ys_num = (item.yg_ys_num!=undefined&&item.yg_ys_num!='undefined')?item.yg_ys_num:'-';
        var yg_yszs = (item.yg_yszs!=undefined&&item.yg_yszs!='undefined')?item.yg_yszs:'-';
        var yg_yszs_goal = (item.yg_yszs_goal!=undefined&&item.yg_yszs_goal!='undefined')?item.yg_yszs_goal:'-';
        var yc_gxd = (item.yc_gxd!=undefined&&item.yc_gxd!='undefined')?item.yc_gxd:'-';
        var stt = "";
        var sj = "";
        var yc = "";
        var yczs = "";

        if(actual_yszs_goal=='-'){
            stt='<td>'+actual_yszs+'</td><td>'+feedback_yszs+'</td>';
        }else{
            if(feedback_yszs=='-'){
                if(actual_yszs>=actual_yszs_goal){
                    stt='<td style="color: #ffb800">'+actual_yszs+'</td><td>'+feedback_yszs+'</td>';
                }else{
                    stt='<td style="color: lawngreen">'+actual_yszs+'</td><td>'+feedback_yszs+'</td>';
                }
            }else{
                if(actual_yszs>=actual_yszs_goal&&feedback_yszs>=actual_yszs_goal){
                    stt='<td style="color: #ffb800">'+actual_yszs+'</td><td style="color: #ffb800">'+feedback_yszs+'</td>';
                }else if(actual_yszs<actual_yszs_goal&&feedback_yszs<actual_yszs_goal){
                    stt='<td style="color: lawngreen">'+actual_yszs+'</td><td style="color: lawngreen">'+feedback_yszs+'</td>';
                }else if(actual_yszs>=actual_yszs_goal&&feedback_yszs<actual_yszs_goal){
                    stt='<td style="color: #ffb800">'+actual_yszs+'</td><td style="color: lawngreen">'+feedback_yszs+'</td>';
                }else if(actual_yszs<actual_yszs_goal&&feedback_yszs>=actual_yszs_goal){
                    stt='<td style="color: lawngreen">'+actual_yszs+'</td><td style="color: #ffb800">'+feedback_yszs+'</td>';
                }
            }

        }
        var display_column;
        var display_column2="";
        if(actual_type == 'actual_gsqy_num'){
            display_column=actual_gsqy_num;
            if(actual_gsqy_num>=actual_gsqy_goal){
                display_column2 = '<td onclick="openGsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;color: #ffb800;">'+actual_gsqy_num+'</td>'
                    /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
            }else{
                display_column2 = '<td onclick="openGsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_gsqy_num+'</td>'
                    /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
            }

        }else if(actual_type == 'actual_sgqy_num'){
            display_column = actual_sgqy_num;
            display_column2 = '<td onclick="openSgEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_sgqy_num+'</td>'
                /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
        }else if(actual_type == 'actual_xgqy_num'){
            display_column = actual_xgqy_num;
            display_column2 = '<td onclick="openXgEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_xgqy_num+'</td>'
                /*+'<td onclick="openQzgsEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+actual_qzgsqy_num+'</td>'*/;
        }
        //实际上报点击事件判断
        if(actual_gsqy_num>=actual_gsqy_goal){
            if(getCookie("area_value")==360100||getCookie("area_value")==item.area_code) {
                sj = display_column2;
            }else{
                sj = '<td style="color: #ffb800;">'+display_column+'</td>'/*+'<td>'+actual_qzgsqy_num+'</td>'*/;
            }
        }else{
            if(getCookie("area_value")==360100||getCookie("area_value")==item.area_code) {
                sj = display_column2;
            }else{
                sj = '<td>'+display_column+'</td>'/*+'<td>'+actual_qzgsqy_num+'</td>'*/;
            }
        }

        //预测同比增速标红
        if(yg_yszs_goal=='-'){
            yczs='<td>'+yg_yszs+'</td>';
        }else{
            if(yg_yszs>=yg_yszs_goal){
                yczs='<td style="color: #ffb800">'+yg_yszs+'</td>';
            }else{
                yczs='<td style="color: lawngreen">'+yg_yszs+'</td>';
            }
        }

        //预测点击事件判断
        if(getCookie("area_value")==360100||getCookie("area_value")==item.area_code) {
            if(yc_type == 'yg_gsqy_num'){
                yc = '<td onclick="openGsYcEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+yg_gsqy_num+'</td>';
            }else if(yc_type == 'yg_sgqy_num'){
                yc = '<td onclick="openSgYcEnt(\''+item.area_code+'\',\''+item.model_value+'\')" style="cursor: pointer;">'+yg_sgqy_num+'</td>';
            }else if(yc_type == 'yg_xgqy_num'){
                yc = '<td>'+yg_xgqy_num+'</td>';
            }

        }else{
            if(yc_type == 'yg_gsqy_num'){
                yc = '<td>'+yg_gsqy_num+'</td>';
            }else if(yc_type == 'yg_sgqy_num'){
                yc = '<td>'+yg_sgqy_num+'</td>';
            }else if(yc_type == 'yg_xgqy_num'){
                yc = '<td>'+yg_xgqy_num+'</td>';
            }
        }
        str += '<tr class="data_body"><td class="bg3">'+(index+1)+'</td><td class="bg3">'+area_name+'</td>'
            +'<td class="title_fourth" style="width: 9%;">'+item.modelname+'</td>'
            +'<td>'+actual_gsqy_goal+'</td>'+sj+'<td>'+actual_ys_num+'</td><td>'+actual_tqys_num+'</td>'
            +stt+'<td>'+actual_yszs_goal+'</td><td>'+actual_gxd+'</td><td>'+yg_gsqy_goal+'</td>'+yc
            +'<td>'+yg_ys_num+'</td>'+yczs+'<td>'+yg_yszs_goal+'</td><td>'+yc_gxd+'</td></tr>';
    })
    $("#demo").append(str);
}

//列表数据查询
function openGsEnt(area_value,modelvalue){
    var INDUSTRY = "";
    if(modelvalue == '1'){
        INDUSTRY = 'NK05';
    }else if(modelvalue == '2'){
        INDUSTRY = 'NK06';
    }else if(modelvalue == '3'){
        INDUSTRY = 'NK03';
    }else if(modelvalue == '4'){
        INDUSTRY = 'NK04';
    }else{
        INDUSTRY = 'NK02';
    }
    layer.open({
        type: 2,
        shade: 0.1,
        title: false, //不显示标题
        area: ['100%', '100%'], //宽高
        content: realPath + "view/qyyxjc/gsqylist.html?INDUSTRY=" + INDUSTRY + "&YEAR=" + CYEAR + "&AREA_VALUE=" + area_value + "&MONTH="+MONTH
    })
}
//列表数据查询
function openSgEnt(area_value,modelvalue){
    var INDUSTRY = "";
    if(modelvalue == '1'){
        INDUSTRY = 'NK05';
    }else if(modelvalue == '2'){
        INDUSTRY = 'NK06';
    }else if(modelvalue == '3'){
        INDUSTRY = 'NK03';
    }else if(modelvalue == '4'){
        INDUSTRY = 'NK04';
    }else{
        INDUSTRY = 'NK02';
    }
    layer.open({
        type: 2,
        shade: 0.1,
        title: false, //不显示标题
        area: ['100%', '100%'], //宽高
        content: realPath + "view/qyyxjc/sgqylist.html?INDUSTRY=" + INDUSTRY + "&YEAR=" + CYEAR + "&AREA_VALUE=" + area_value + "&MONTH="+MONTH
    })
}
//列表数据查询
function openXgEnt(area_value,modelvalue){
    var INDUSTRY = "";
    if(modelvalue == '1'){
        INDUSTRY = 'NK05';
    }else if(modelvalue == '2'){
        INDUSTRY = 'NK06';
    }else if(modelvalue == '3'){
        INDUSTRY = 'NK03';
    }else if(modelvalue == '4'){
        INDUSTRY = 'NK04';
    }else{
        INDUSTRY = 'NK02';
    }
    layer.open({
        type: 2,
        shade: 0.1,
        title: false, //不显示标题
        area: ['100%', '100%'], //宽高
        content: realPath + "view/qyyxjc/xgqylist.html?INDUSTRY=" + INDUSTRY + "&YEAR=" + CYEAR + "&AREA_VALUE=" + area_value + "&MONTH="+MONTH
    })
}
//列表数据查询
function openGsYcEnt(area_value,modelvalue){
    var INDUSTRY = "";
    if(modelvalue == '1'){
        INDUSTRY = 'NK05';
    }else if(modelvalue == '2'){
        INDUSTRY = 'NK06';
    }else if(modelvalue == '3'){
        INDUSTRY = 'NK03';
    }else if(modelvalue == '4'){
        INDUSTRY = 'NK04';
    }else{
        INDUSTRY = 'NK02';
    }
    layer.open({
        type: 2,
        shade: 0.1,
        title: false, //不显示标题
        area: ['100%', '100%'], //宽高
        content: realPath + "view/qyyxjc/gsqyForcastList.html?INDUSTRY=" + INDUSTRY + "&YEAR=" + CYEAR + "&AREA_VALUE=" + area_value + "&MONTH="+(Number(MONTH)+1+"")
    })
}
//列表数据查询
function openSgYcEnt(area_value,modelvalue){
    var INDUSTRY = "";
    if(modelvalue == '1'){
        INDUSTRY = 'NK05';
    }else if(modelvalue == '2'){
        INDUSTRY = 'NK06';
    }else if(modelvalue == '3'){
        INDUSTRY = 'NK03';
    }else if(modelvalue == '4'){
        INDUSTRY = 'NK04';
    }else{
        INDUSTRY = 'NK02';
    }
    layer.open({
        type: 2,
        shade: 0.1,
        title: false, //不显示标题
        area: ['100%', '100%'], //宽高
        content: realPath + "view/qyyxjc/sgqyForcastList.html?INDUSTRY=" + INDUSTRY + "&YEAR=" + CYEAR + "&AREA_VALUE=" + area_value + "&MONTH="+(Number(MONTH)+1+"")
    })
}
//导出功能
function exportData(){
    layer.msg("正在下载，请稍后");
    window.location.href=LOGIN_ADMIN_URL+'/statisticsController/exportTjList?YEAR='+CYEAR+'&CODE_VALUE='+MONTH+"&pxcoloum="+pxcoloum+"&orders="+orders+"&MODEL_VALUE="+MODEL_VALUE;//调用导出接口
}

function openQzgsEnt(area_value,modelvalue){
    var INDUSTRY = "";
    if(modelvalue == '1'){
        INDUSTRY = 'NK05';
    }else if(modelvalue == '2'){
        INDUSTRY = 'NK06';
    }else if(modelvalue == '3'){
        INDUSTRY = 'NK03';
    }else if(modelvalue == '4'){
        INDUSTRY = 'NK04';
    }else{
        INDUSTRY = 'NK02';
    }
    layer.open({
        type: 2,
        shade: 0.1,
        title: false, //不显示标题
        area: ['100%', '100%'], //宽高
        content: realPath + "view/qyyxjc/qzgsqylist.html?INDUSTRY=" + INDUSTRY + "&YEAR=" + CYEAR + "&AREA_VALUE=" + area_value + "&MONTH="+MONTH
    })
}