app.service("contentService",function ($http) {

        this.findByCategoryId=function (categoryId) {
            // alert("测试点1");
      return $http.get("content/findByCategoryId.do?categoryId="+categoryId);
    }

});
