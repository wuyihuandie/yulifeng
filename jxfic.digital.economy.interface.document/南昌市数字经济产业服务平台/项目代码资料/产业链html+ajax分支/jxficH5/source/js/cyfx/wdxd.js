$(function(){

    var myChart;
    /*渲染产业分析区域元素*/
    function renderFZFXDom(){

        var domWidth=$(".svgpanel").width();
        var domHeight=$(".svgpanel").height();
        var svgWidth=$("#svgfzfx").width();
        var svgHeight=$("#svgfzfx").height();
        var zoom=domWidth/svgWidth<domHeight/svgHeight?domWidth/svgWidth:domHeight/svgHeight;
        var tranX=(domWidth-svgWidth)/2;
        var tranY=(domHeight-svgHeight)/2;
        $("#svgfzfx").css("transform",`translate(${tranX}px,${tranY}px) scale(${zoom})`);
    }

    /*绑定产业分析区域元素事件*/
    function bindEvents(){

        $("#svgfzfx .svgItem").on("mouseenter",function(){
            //$(this).find("image").hide().eq(1).show();

            document.getElementById("svgfzfx").pauseAnimations();
        })

        $("#svgfzfx .svgItem").on("mouseleave",function(){
            //$(this).find("image").hide().eq(0).show();
            document.getElementById("svgfzfx").unpauseAnimations();
        })

        $("#svgfzfx .svgItem").on("click",function(){
            var xdId=$(this).attr("data-id");
            bindWDXDInfo(xdId);
            bindChartsData(xdId);
            bindQYList(xdId);
        })
        $(".btnback").click(function(){
            history.back();
        })
        window.onresize=function(){
            renderFZFXDom();
        }


    }


    function bindWDXDInfo(xdId){



        $("#svgfzfx .svgItem").attr("class","svgItem");
        $(".svgItem[data-id='"+xdId+"']").attr("class","svgItem on");
        var title=$(".svgItem[data-id='"+xdId+"']").find("text").eq(1).html();
        $("#divCenterTitle").html(title+"");

        var iconUrl=$(".svgItem[data-id='"+xdId+"']").attr("data-bg");

        $("#cvsBackground").css("backgroundImage","url(../../source/img/qyfxpng/"+iconUrl+")");


        var target=$(".svgItem[data-id='"+xdId+"']").find(".spnTarget").html();
        var complete=$(".svgItem[data-id='"+xdId+"']").find(".spnComplete").html();

       // console.log(target);

        var percent=complete/target;
        renderCircleDom({
            target:target,
            complete:complete,
            percent:percent
        });
        
        
    }



    function renderCircleDom(param){
        runCircle(
           { 
                obj:'cvsCompletePercent', 
                percent:param.percent,
                width:200
           }
        );
        $("#spnTarget").html(param.target);
        $("#spnComplete").html(param.complete);
    }




    function renderCharts(){
        
        runCircle(
           { 
                obj:'cvsCompletePercent', 
                percent:0.8,
                width:200
           }
        );

    }



    //绑定五大行动元素
    function renderWDXD(callback){

        $.ajax({
            type: 'POST',
            url: BASE_URL +  "/enterpriseAnalysis/getFiveOverview",
            data: {
                param:JSON.stringify({
                    TYPE:"1",
                    YEAR:YEAR
                })
            },
            cache: false,
            success: function(resp) {
                var result=JSON.parse(resp);
                if (result.status == 10001) {
                    result.data.map(function(item){
                    $(".svgItem[data-id='"+item.ID+"']").find(".svgseTitle").html(item.NAME);
                    $(".svgItem[data-id='"+item.ID+"']").find(".spnTarget").html(item.GOAL);
                    $(".svgItem[data-id='"+item.ID+"']").find(".spnComplete").html(item.SUMS);
                    
                    var percent= (item.SUMS*100/item.GOAL);
                    $(".svgItem[data-id='"+item.ID+"']").find(".percent").html(percent.toFixed(2)+"%");
                    //完成百分比
                    var circleAll=Math.PI*60;
                    var circleComplete=parseInt(Math.PI*60*percent/100);
                    $(".svgItem[data-id='"+item.ID+"']").find("circle").attr("stroke-dasharray",circleComplete+" "+circleAll);
                     callback();
                })
                } else {
                    this.$message.error(result.data.msg);
                }
            }
        })

    }

    

    function bindChartsData(ID){

        $.post(BASE_URL + "/enterpriseAnalysis/getfiveActionsOverviewByType",{
            param:JSON.stringify({
                ID:ID,
            })
        },function(resp){
            var result=JSON.parse(resp);
            if (result.status == 10001) {
                $("#ENTNUMS").html(result.data.QYSUMS);
                $("#GSQY").html(result.data.GSQYSUMS);
                $("#VENDINC").html(result.data.VENDINC);
                $("#RATGRO").html(result.data.RATGRO);
                $("#EMPNUM").html(result.data.EMPNUM);
                $("#dw_qyzs").html(result.QYCPY);
                $("#dw_gsqy").html(result.QYCPY);
                $("#dw_yysr").html(result.VENDINCCPY);
                $("#dw_nsje").html(result.JRCPY);
                $("#dw_cyry").html(result.CYRYCPY);
            }
            else {
                this.$message.error(result.data.msg);
            }
        })
    }



    function bindQYList(Type){
        $.post(BASE_URL + "/enterpriseAnalysis/getfiveActionsByType",{
            param:JSON.stringify({
                ID:Type,
            })
        },function(resp){
            var result=JSON.parse(resp);
            if (result.status == 10001) {
                var listHtml='';
                result.data.list.map(function(item,index){
                    var itemHtml=`<tr>
                                    <td><i>${index+1}</i></td>
                                    <td>${item.AREA_NAME}</td>
                                    <td>${item.ENTNAME}</td>
                                    <td>${item.REGCAP}</td>
                                    <td>${item.ESTDATE}</td>
                                    <td>${item.ADDRESS}</td>
                                    <td>${item.VENDINC}</td>
                                    <td>${item.NETINC}</td>
                                    <td>${item.RATGRO}</td>
                                    <td>${item.EMPNUM}</td>
                                </tr>`;
                    listHtml+=itemHtml;
                })
                $(".qylist tbody").html(listHtml);
            }
            else {
                this.$message.error(result.data.msg);
            }
        })
    }




    
    //



    renderFZFXDom();
    bindEvents();
  
    
    var wdxdIndex=location.hash.replace('#',"");
    if(!!wdxdIndex){
        renderWDXD(function(){
            bindWDXDInfo(wdxdIndex);
        });
        
        
        bindChartsData(wdxdIndex);
        bindQYList(wdxdIndex);
    }
  

    

})







