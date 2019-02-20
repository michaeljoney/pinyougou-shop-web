//控制层
app.controller('itemCatController', function ($scope, $controller, itemCatService) {

    $controller('baseController', {$scope: $scope});//继承

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        itemCatService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        itemCatService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    //查询实体
    $scope.findOne = function (id) {
        itemCatService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //保存
    $scope.save = function () {
        var serviceObject;//服务层对象
        if ($scope.entity.id != null) {//如果有ID
            serviceObject = itemCatService.update($scope.entity); //修改
        } else {
            $scope.entity.parentId=$scope.parentId;//赋予上级ID
            serviceObject = itemCatService.add($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    //重新查询
                    $scope.findByParentId($scope.parentId);//重新加载//重新加载
                } else {
                    alert(response.message);
                }
            }
        );
    }


    //单选或多选删除
    $scope.selectIds = []; //定义一个数组 存入id或者想要用来交互的参数...

    $scope.selectAll = function () {
        if ($scope.select_all==false) { //判断是全选
            $scope.selectIds = [];//先清空，防止在操作了一个轮回之后，重复添加了...
            angular.forEach($scope.list, function (i) {  //list这是循环从后台获取的数组，并添加到刚刚定义的数组里
                i.checked = true; //全选即将所有的复选框变为选中
                $scope.selectIds.push(i.id);//将选中的内容放到数组里
            })
            $scope.select_all=true;
        } else {//判断全不选
            angular.forEach($scope.list, function (i) {
                i.checked = false; //所有复选框为不选中
                $scope.selectIds = [];//将数组清空33
            })
            $scope.select_all=false;
        }
    };

    $scope.selectOne = function () {//下面的复选框单独点击
        angular.forEach($scope.list, function (i) {//依旧是循环......
            var index = $scope.selectIds.indexOf(i.id);//检索checked中是否有i.Id 如果没有则会返回-1
            if (i.checked && index === -1) {
                $scope.selectIds.push(i.id);
            } else if (!i.checked && index !== -1) {
                $scope.selectIds.splice(index, 1);
            }
        })

        if ($scope.list.length === $scope.selectIds.length) {//判断checked数组的长度是否与原来请求的后台数组的长度是否相等 即是否给全选框加上选中
            $scope.select_all = true;
        } else {
            $scope.select_all = false;
        }
    }


    //批量删除
    $scope.dele = function () {
        //获取选中的复选框
        itemCatService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    //$scope.reloadList();//刷新列表
                    $scope.findByParentId($scope.parentId);
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        itemCatService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    $scope.parentId=0;//上级ID

    //根据上级ID显示下级列表
    $scope.findByParentId = function (parentId) {
        $scope.parentId=parentId;//记住上级ID
        itemCatService.findByParentId(parentId).success(
            function (response) {
                $scope.list = response;
            }
        );
    }


    //面包屑导航
    $scope.grade = 1;//默认为1级
    //设置级别
    $scope.setGrade = function (value) {
        $scope.grade = value;
    }
    //读取列表
    $scope.selectList = function (p_entity) {
        if ($scope.grade == 1) {//如果为1级
            $scope.entity_1 = null;
            $scope.entity_2 = null;
        }
        if ($scope.grade == 2) {//如果为2级
            $scope.entity_1 = p_entity;
            $scope.entity_2 = null;
        }
        if ($scope.grade == 3) {//如果为3级
            $scope.entity_2 = p_entity;
        }
        $scope.findByParentId(p_entity.id);	//查询此级下级列表
    }


});
