app.controller("contentController",function ($scope,contentService) {



    //根据分类 ID 查询广告列表
    $scope.contentList=[];//广告集合,将相同类别的广告放在对应类别的集合中

    $scope.findByCategoryId=function (categoryId) {
        //alert("测试点");
        contentService.findByCategoryId(categoryId).success(
            function (data) {
                $scope.contentList[categoryId]=data;
            }
        );
    }

    $scope.search=function () {
        location.href="http://localhost:9104/search.html#?keywords="+$scope.keywords;
    }

});