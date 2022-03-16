var PARENT_DL='ZK06';
var CONDITION = 'VENDINC';
var CUSTOMIZE = '';
var QYList=[];
var ProjrctList=[];
YEAR = "2020";
$(function(){

    bindQYList();
    bindProjectList();
    getPolicySumsByType();
    queryPolicylist('');
    getQuestionList();
    getClusterList();
	declaration();
	
	// 切换云计算
	$('#yjs').click(function(){
		window.location.href = '../yjs-cyl/yjs-qyqd.html?menuType=5';
	})
    //按钮点击事件
    $(".fourbutton").click(function(){
        var index=$(this).attr("data-index");
        $(".fourbutton").removeClass("button-exchange");
        $(this).addClass("button-exchange");
        $(".boxContent").hide();
        $(".boxContent:eq("+index+")").css("display","grid");
    })
	//政策清单筛选切换
	$('.booox').click(function(){
		var index=$(this).attr(".booox");
		$('.booox').removeClass('booox-1');
		$(this).addClass('booox-1');
	})
    //切换企业排序
    $(".sortSpan").click(function(){
        var qList=[];
        var sortKey=$(this).attr("data-key");
		// console.log(sortKey)
        var rules=0;
        if($(this).hasClass("up")==false){
            rules=1;
        }
        $(".sortSpan").removeClass("up").removeClass("down");
        $(this).addClass(rules==1?"up":"down");
        qList=arraySort(QYList,sortKey,rules,sortKey);
        var filterKey=$(".menusControls dl").attr("data-select");
        if(!!filterKey){
            qList=qList.filter(function(item){
                return item.AREA_NAME==filterKey;
            })
        }
        renderQYList(qList);
        var pList=[];
        pList=arraySort(ProjrctList,sortKey,rules);
        var filterKey=$(".menusPControls dl").attr("data-select");
        if(!!filterKey){
            pList=pList.filter(function(item){
                return item.AREA_NAME==filterKey;
            })
        }
        renderProjectList(pList);
    })
	
    //根据所选区域过滤企业列表
    $(".menusControls").click(function(){
        $(".menusControls .menuList").show();
    })
    $(".menusPControls").click(function(){
        $(".menusPControls .menuList").show();
    })
    $(".menusControls").on("click","span",function(ev){
        var value=$(this).attr("data-key");
        var qyList=QYList.filter(function(item){
            if(!value){return true;}
            return item.AREA_NAME==value;
        })
        renderQYList(qyList);
        $(".menusControls dl").html(!!value?value:"所属区域").attr("data-select",value);
        if(ev.toElement.tagName=="SPAN"){
            $(".menusControls .menuList").hide();
            return false;
        }
    })
    $(".menusPControls").on("click","span",function(ev){
        var value=$(this).attr("data-key");
        var qyList=ProjrctList.filter(function(item){
            if(!value){return true;}
            return item.AREA_NAME==value;
        })
        renderProjectList(qyList);
        $(".menusPControls dl").html(!!value?value:"所属区域").attr("data-select",value);
        if(ev.toElement.tagName=="SPAN"){
            $(".menusPControls .menuList").hide();
            return false;
        }
    })
    $("body").on("click",function(ev){
        if($(ev.toElement).closest(".menusControls").length==0){
            $(".menusControls .menuList").hide();
        }
        if($(ev.toElement).closest(".menusPControls").length==0){
            $(".menusPControls .menuList").hide();
        }
    })
})
//申报企业数量/已兑现的金额
function declaration(){
		var params = {
			YEAR:YEAR
		}
		$.ajax({
			type: 'POST',
			url: BASE_URL + '/Ent03specialController/get03specialData',
			data: {
				param: JSON.stringify(params) //参数
			},
			cache: false,
			success: function(res) {
				var result = JSON.parse(res);
				if (result.status == 10001) {
					var option1 = {
						startVal: 0,
						decimalPlaces: 2,
						duration: 1.9,
					};
					if (null != result.data) {
						var item = result.data;
						new CountUp('linexxxID',item.NUMS).start();
						new CountUp('linexxx-2ID',item.AMOUNT).start();
					}
				}
			}
		})
}

//申报企业数量列表
function SBQYSL(){
	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath + "view/cyl-3/cyl-qyqd-Table.html"
	})
}



/*
    @date:2020-11-03
    @author:renquan.tu
    @desc:数组排序
    @params:(dataList:所要排序的数组,key:需要排序的字段，rules:排序规则 1升序 非1降序）
    @return:返回排序后的数组
    */

function arraySort(dataList,key,rules,sortKey){
    if(!key){return dataList};
    return dataList.sort(function(a,b,index){
        var compare=0;
		// console.log(123);
		if(a[key]=='undefined' || a[key]==undefined || a[key]==null){
			a[key]='0.00';
		}
		if(b[key]=='undefined' || b[key]==undefined || b[key]==null){
			b[key]='0.00';
		}
		if(typeof a[key]=="string"||typeof b[key]=="string"){
			// debugger;
			
		    // console.log("a:"+a[key]);
			// console.log("b:"+b[key]);
			if(a[key].indexOf("-")!=-1 || a[key].indexOf("-")!=-1){
				// debugger;
			}
			if(sortKey === "ESTDATE"){
			
				compare=Number(a[key].replace(/[^.0-9]/g,""))-Number(b[key].replace(/[^.0-9]/g,""));
			}else{
				compare=Number(a[key].replace(/[^.0-9-]/g,""))-Number(b[key].replace(/[^.0-9-]/g,""));
			}
				// console.log('data-key');	
			
			//compare=a[key].replace(/[^.0-9]/g,"")-b[key].replace(/[^.0-9]/g,"");
			// console.log(a[key]==String);
		}
		else if(typeof a[key]=="number"||typeof b[key]=="number"){
			compare=a[key]-b[key];
			// console.log(a[key]==Number);
		}
        return rules==1?compare:-compare;
    })	
}

//企业清单查询
function bindQYList(){
    var params = {
        YEAR:YEAR,
        PARENT_DL:PARENT_DL,
        CONDITION:CONDITION,
        CUSTOMIZE:CUSTOMIZE,
        ENTNAME:ENTNAME,
        CLSJ : CLSJ,
        ZCZJ : ZCZJ,
        YYSR : YYSR,
        LSZE : LSZE,
        LEVEL_NAME : LEVEL_NAME
    };
    doData(BASE_URL+'/industrialChainController/getEnterpriseListByCondition',params,function(result){
        if(result.status == '10001'){
            QYList = result.data.EntMsg;
            renderQYList(QYList);
        }
    })
}
function renderQYList(dataList){
    var listHtml='';
    dataList.map(function(item,index){
        var itemHtml=`
                    <tr>
                        <td class="td1">${index<=2?'<i>'+(index+1)+'</i>':(index+1)}</td>
                        <td class="td2">${item.ENTNAME}</td>
                        <td class="td3">${item.AREA_NAME}</td>
                        <td class="td4">${!!item.REGCAP?item.REGCAP:'-'}</td>
                        <td class="td5">${item.ESTDATES}年</td>
                        <td class="td6">${item.LEVEL_NAME}</td>
                        <td class="td7">${item.CHAIN_LINK_NAME}</td>
                        <td class="td8">${!!item.APPLICATION_NAME?item.APPLICATION_NAME:'-'}</td>
                        <td class="td9">${!!item.VENDINC?item.VENDINC:'-'}</td>
                        <td class="td10">${!!item.RATGRO?item.RATGRO:'-'}</td>
                    </tr>`;
        listHtml+=itemHtml;
    })
    $("#tabQYList").html(listHtml);
}
//企业搜索
var ENTNAME="";
var CLSJ = '';//成立时间
var ZCZJ = ''; //注册资金
var YYSR = ''; //营业收入
var LSZE = ''; //利税总额
var LEVEL_NAME = ''; //所属环节
function searchEntname(){
    ENTNAME=$("#ENTNAME").val();
    CLSJ=$("select[name='CLSJ']").val();
    ZCZJ=$("select[name='ZCZJ']").val();
    LSZE=$("select[name='LSZE']").val();
    YYSR=$("select[name='YYSR']").val();
    LEVEL_NAME=$("select[name='LEVEL_NAME']").val();
    bindQYList();
}
//重点项目清单查询
function bindProjectList(){
    var params = {
        YEAR:YEAR,
        PARENT_DL:PARENT_DL,
        PROJECT_NAME:PROJECT_NAME,
        INVESTMENT:INVESTMENT,
        TYPE:TYPE,
        PROJECT_STATUS:PROJECT_STATUS
    };

    doData(BASE_URL+'/industrialChainController/getKeyProjectlist',params,function(result){
        if(result.status == '10001'){
            ProjrctList = result.data;
            renderProjectList(ProjrctList);
        }
    })
}
function renderProjectList(dataList){
    var listHtml='';
    dataList.forEach(function(item,index){
        var itemHtml=`
                    <tr>
                        <td class="td1">`+(index+1)+`</td>
                        <td class="td2" style="width: 20%; text-align: left;">${item.PROJECT_NAME}</td>
                        <td class="td8">${item.CONTRACTOR}</td>
                        <td class="td3">${!!item.AREA_NAME?item.AREA_NAME:'-'}</td>
                        <td class="td4">${!!item.APPLICATION_NAME?item.APPLICATION_NAME:'-'}</td>
                        <td class="td5">${!!item.INVESTMENT?item.INVESTMENT:'-'}</td>
                        <td class="td6">${item.CONSTRUCTION_CIRCLE}</td>
                        <td class="td6">${item.TYPE_NAME}</td>
                        <td class="td7">${item.PRODUCT_STATUS_NAME}</td>
                    </tr>`;
        listHtml+=itemHtml;
    })
    $("#projectList").html(listHtml);
}
//项目搜索
var PROJECT_NAME = '';
var INVESTMENT = ''; //投资额
var TYPE = ''; //项目类型
var PROJECT_STATUS = ''; //项目状态
function searchProjectName(){
    INVESTMENT=$("select[name='INVESTMENT']").val();
    TYPE=$("select[name='TYPE']").val();
    PROJECT_STATUS=$("select[name='PROJECT_STATUS']").val();
    PROJECT_NAME=$("#projectName").val();
    bindProjectList();
}
//政策清单查询
function queryPolicylist(type) {
    var params = {
        PARENT_DL: PARENT_DL,
        TYPE: type
    };
    doData(BASE_URL + '/industrialChainController/getPolicylist', params, function (result) {
        if (result.status == '10001') {
            var listHtml="";
            result.data.forEach(function(item,index){
                listHtml+=`
                    <tr>
                        <td class="td1" style="width: 3%;">`+(index+1)+`</td>
                        <td class="td2" style="width: 7%;text-align: left">${item.POLICY_NAME}</td>
                        <td class="td3" style="width: 3%;">${item.LEVEL_NAME}</td>
                        <td class="td8" style="width: 5%;">${!!item.LICNO?item.LICNO:'-'}</td>
                        <td class="td3" style="width: 5%;">${item.PUBLISH_UNIT}</td>
                        <td class="td6" style="text-align: left">${item.CONTENT}</td>
                    </tr>`;
            })
            $("#policyList").html(listHtml);
        }
    })
}
//分类查询不同政策的数据
function getPolicySumsByType() {
    var params = {
        PARENT_DL: PARENT_DL
    };
    doData(BASE_URL + '/industrialChainController/getPolicySumsByType', params, function (result) {
        if (result.status == '10001') {
            result.data.forEach(function(item,index){
                $('#'+item.TYPE+'').text(item.SUMS);
            })
        }
    })
}
//政策搜索
function queryType(type){
    queryPolicylist(type);
}
//问题清单查询
function getQuestionList() {
    var params = {
        PARENT_DL: PARENT_DL,
        YEAR:YEAR
    };
    var questionType = '';
    doData(BASE_URL + '/industrialChainController/getQuestionList', params, function (result) {
        if (result.status == '10001') {
            var listHtml="";
            result.data.forEach(function(item,index){
                if(item.TYPE == 1){
                    questionType = '产业方面';
                }
                if(item.TYPE == 2){
                    questionType = '政策方面';
                }
                if(item.TYPE == 3){
                    questionType = '人才方面';
                }
                if(item.TYPE == 4){
                    questionType = '金融方面';
                }
                if(item.TYPE == 5){
                    questionType = '技术方面';
                }
                if(item.TYPE == 6){
                    questionType = '其它方面';
                }
                if(item.TYPE == 7){
                    questionType = '网络基础设施方面';
                }
                listHtml+=`
                    <tr>
                        <td class="td1" style="width: 3%;">${index+1}</td>
                        <td class="td2" style="width: 15%;">${questionType}</td>
                        <td class="td3" style="width: 60%; text-align: left">${item.CONTENT}</td>
                    </tr>`;
            })
            $("#questionList").html(listHtml);
        }
    })
}

//集群清单查询
function getClusterList() {
    var params = {
        PARENT_DL: PARENT_DL,
        YEAR:YEAR
    };
    var questionType = '';
    doData(BASE_URL + '/industrialChainController/getClusterList', params, function (result) {
        if (result.status == '10001') {

            var listHtml="";
            result.data.forEach(function(item,index){
                if(index == 0){
                    listHtml+=` 
                     <tr>
                        <td width="49" valign="center" nowrap="nowrap" rowspan="2" ><p align="center" ><strong>序号</strong><strong> </strong></p></td>
                        <td width="182" valign="center" nowrap="nowrap" rowspan="2" ><p align="center" ><strong>产业集群名称</strong><strong> </strong></p></td>
                        <td width="68" valign="center" rowspan="2" ><p align="center" ><strong>从业人员</strong><strong> </strong></p></td>
                        <td width="54" valign="center" rowspan="2" ><p align="center" ><strong>相关企业数</strong><strong> </strong></p></td>
                        <td width="45" valign="center" rowspan="2" ><p align="center" ><strong>投产企业数</strong><strong> </strong></p></td>
                        <td width="123" valign="center" colspan="2" ><p align="center" ><strong>2019年度主营业务收入</strong><strong> </strong></p></td>
                        <td width="174" valign="center" colspan="2" ><p align="center" ><strong>2020年上半年度（1至6月份）主营业务收入</strong><strong> </strong></p></td>
                        <td width="131" valign="center" colspan="2" ><p align="center" ><strong>2019年度利税</strong><strong> </strong></p></td>
                        <td width="149" valign="center" colspan="2" ><p align="center" ><strong>2020年上半年度利税（1至6月）</strong><strong> </strong></p></td>
                        </tr>
                        <tr >
                        <td width="69" valign="center" ><p align="center" ><strong>累计(亿元)</strong><strong> </strong></p></td>
                        <td width="54" valign="center" ><p align="center" ><strong>同比增长（%）</strong><strong> </strong></p></td>
                        <td width="116" valign="center" ><p align="center" ><strong>累计(亿元)</strong><strong> </strong></p></td>
                        <td width="58" valign="center" ><p align="center" ><strong>同比增长（%）</strong><strong> </strong></p></td>
                        <td width="63" valign="center" ><p align="center" ><strong>累计(亿元)</strong><strong> </strong></p></td>
                        <td width="68" valign="center" ><p align="center" ><strong>同比增长（%）</strong><strong> </strong></p></td>
                        <td width="80" valign="center" ><p align="center" ><strong>累计(亿元)</strong><strong> </strong></p></td>
                        <td width="69" valign="center" ><p align="center" ><strong>同比增长（%）</strong><strong> </strong></p></td>
                     </tr>
                   `
                }
                listHtml+=` 
                    <tr>
                        <td width="49" height="80" valign="center" ><p align="center" >${index+1} </p></td>
                            <td width="182" valign="center" ><p align="center" >${item.CLUSTER_NAME} </p></td>
                            <td width="68" valign="center" ><p align="center" >${item.EMPLOYEENUMS} </p></td>
                            <td width="54" valign="center" ><p align="center" >${item.RELATEDENTNUMS} </p></td>
                            <td width="45" valign="center" ><p align="center" >${item.PRODUCTENTNUMS} </p></td>
                            <td width="69" valign="center" ><p align="center" >${item.VENDINC}</p></td>
                            <td width="54" valign="center" ><p align="center" >${item.VENDINCZS}</p></td>
                            <td width="116" valign="center" ><p align="center" >${item.VENDINCHALF}</p></td>
                            <td width="58" valign="center" ><p align="center" >${item.VENDINCHALFZS}</p></td>
                            <td width="63" valign="center" ><p align="center" >${item.RATGRO}</p></td>
                            <td width="68" valign="center" ><p align="center" >${item.RATGROZS}</p></td>
                            <td width="80" valign="center" ><p align="center" >${item.RATGROHALF}</p></td>
                            <td width="69" valign="center" ><p align="center" >${item.RATGROHALFZS}</p></td>
                      </tr>  
                   `
            });
            $("#clusterList").html(listHtml);
        }
    })
}
