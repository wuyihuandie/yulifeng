let ENTNAME = getUrlValue("ENTNAME");
$(function(){
    getBrandInfo(1);
    getPatentInfo(1);
    getCopyrightInfo(1);
});
//商标
function getBrandInfo(PageIndex){
    let url =  BASE_URL + '/entPanoramicNewController/queryBrand',
        data = {searchKey:ENTNAME};
    doData(url,data, function(result) {
        if (result.status==10001){
            //获取数据结果集
            let data = result.data.Result;
            let Paging = result.data.Paging;
            let GroupItems = result.data.GroupItems;
            let statusList = new Array();
            let intclsList = new Array();
            for(let i = 0 ; i < GroupItems.length ; i++){
                if(GroupItems[i].Key == "status"){
                    statusList = GroupItems[i].Items;
                }
                if(GroupItems[i].Key == "intcls"){
                    intclsList = GroupItems[i].Items;
                }
            }
            let str="";
            //拼接标签，显示结果集内容
            for (let i = 0; i < data.length; i++) {
                str+='<tr><td>' + (i+1) + '</td>'
                    +'<td><img style="height: 80px;" src="' + (data[i].ImageUrl==undefined?''+BASE_URL+'/source/img/qyhx/nullpic.png':data[i].ImageUrl) + '" onclick="show_img(\''+data[i].ImageUrl+'\')"></td>'
                    +'<td>' + data[i].Name + '</td>'
                    +'<td>' + getInfo(statusList,data[i].Status) + '</td>'
                    +'<td>' + data[i].RegNo + '</td>'
                    +'<td>' + getInfo(intclsList,data[i].CategoryId) + '</td>'
                    +'<td>' + data[i].AppDate + '</td>'
                    +'</tr>'
            }
            if(str==''){
                str+='<tr><td colspan="7">暂时没有相关数据</td></tr>'
            }
            $("#brandInfo tbody").html(str);
        }else {
            layer.msg(result.msg,{icon:2,time:5000});
        }
    });
}
//专利信息
function getPatentInfo(PageIndex){
    let url =  BASE_URL + '/entPanoramicNewController/queryPatent',
        data = {searchKey:ENTNAME};
    doData(url,data,function(result){
        if (result.status==10001){
            //获取数据结果集
            let data = result.data.Result;
            let Paging = result.data.Paging;
            let str="";
            //拼接标签，显示结果集内容
            for (let i = 0; i < data.length; i++) {
                str+='<tr><td>' + (Paging!=undefined?((Paging.PageIndex-1)*5+i+1):(i+1)) + '</td>'
                    +'<td>' + data[i].Title + '</td>'
                    +'<td>' + data[i].KindCodeDesc + '</td>'
                    +'<td>' + data[i].InventorStringList.toString() + '</td>'
                    +'<td>' + data[i].PublicationNumber + '</td>'
                    +'<td>' + data[i].PublicationDate + '</td>'
                    +'<td>' + data[i].LegalStatusDesc + '</td></tr>';
            }
            if(str==''){
                str+='<tr><td colspan="7">暂时没有相关数据</td></tr>'
            }
            $("#patentInfo tbody").html(str);
        }else {
            layer.msg(result.msg,{icon:2,time:5000});
        }
    })
}
//软件著作权信息
function getCopyrightInfo(PageIndex){
    let url =  BASE_URL + '/entPanoramicNewController/queryCopyright',
        data = {searchKey:ENTNAME};
    doData(url,data,function(result){
        if (result.status==200){
            //获取数据结果集
            let data = result.data.Result.SoftwareCopyrights.Result;
            let Paging = result.data.Result.SoftwareCopyrights.Paging;
            let str="";
            //拼接标签，显示结果集内容
            for (let i = 0; i < data.length; i++) {
                str+='<tr><td>' + (i+1) + '</td>'
                    +'<td>' + data[i].Name + '</td>'
                    +'<td>' + data[i].ShortName + '</td>'
                    +'<td>' + data[i].Owner + '</td>'
                    +'<td>' + data[i].Category + '</td>'
                    +'<td>' + data[i].RegisterNo + '</td>'
                    +'<td>' + data[i].RegisterAperDate + '</td>'
                    +'<td>' + data[i].PublishDate + '</td>'
                    +'<td>' + data[i].VersionNo + '</td></tr>'
            }
            if(str==''){
                str+='<tr><td colspan="9">暂时没有相关数据</td></tr>'
            }
            $("#CopyrightInfo tbody").html(str);
        }else {
            layer.msg(result.msg,{icon:2,time:5000});
        }
    });
}
//显示大图片
function show_img(t) {
    if (t == "undefined"||t==undefined){
        return;
    }
    //页面层
    layer.open({
        type: 1,
        area: ['40%', '50%'],
        shadeClose: true, //开启遮罩关闭
        title:false,
        content: '<div style="text-align:center;width: 100%;height: 100%"><img style="width: 100%;height: 100%;" src="' + t + '" /></div>'
    });
}

function getInfo(items,params){
    for(let i = 0 ; i < items.length; i++){
        if(items[i].Value == params){
            return items[i].Desc;
        }
    }
}