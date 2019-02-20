//登陆服务层
app.service('shopLoginService',function($http){
    //读取登录人名称
    this.shoploginName=function(){
        return $http.get('../shoplogin/name.do');
    }
});
