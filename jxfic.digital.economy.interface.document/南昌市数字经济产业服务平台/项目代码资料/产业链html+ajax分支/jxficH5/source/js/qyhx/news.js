var ENTNAME = getUrlValue("ENTNAME");
queryNews();
function queryNews(){
    var datas = {searchKey:ENTNAME};
    $.ajax({
        url:BASE_URL+'/entPanoramicNewController/queryNews',
        type:'post',
        data:{
            param:JSON.stringify(datas)
        },
        dataType:'json',
        success:function (result) {
            if (result.status==10001){
                let data = result.data.Result;
                let str = "";
                for (let x of data){
                    str+='<div class="news_item" onclick="goDetail(\''+x.Url+'\')">' +
                        '   <p class="news_item_title">'+x.Title+'</p>' +
                        '   <p class="news_item_subtitle"><span>来源：'+x.Source+'</span> <span> </span> <span>'+x.PublishTime+'</span></p>' +
                        '</div>';
                }
                $(".news_list").empty().html(str);
            }else {
                layer.msg(result.msg,{icon:2,time:5000});
            }
        }
    })
}