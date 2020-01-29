/**
 * Created by WenFe on 2017/5/11.
 */
var app = angular.module('MaterialCApp', []);
app.controller('MaterialCCtrl', function($scope) {
    $(document).ready(function () {
        init();
    });
    function init() {
        $("#startTime").datetimepicker();
        $("#endTime").datetimepicker();
        $scope.userInfo = getLocalJson("userInfo");
        setSideActive("material-li", "material-create-li");
        getProjects();
        getUsers();
    }

    function getProjects() {
        var callBackFun = function(data) {
            if (data) {
                $scope.projects = data;
            }
        };
        httpSyncPost(api.project.list, {companyId: $scope.userInfo.companyId}, callBackFun);
    }

    function getUsers() {
        var callBackFun = function(data) {
            if (data) {
                $scope.users = data;
            }
        };
        httpSyncPost(api.user.listByRole, {companyId: $scope.userInfo.companyId, role: "materialadmin"}, callBackFun);
    }

    $scope.create = function() {
        var name = $('#name').val();
        var num = $('#num').val();
        var startTime = $('#startTime');
        var endTime = $('#endTime');
        var spInfo = $('#spInfo');
        var flag = true;
        if($.isEmptyObject(name)){
            alert("名称不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(num)){
            alert("数目不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(startTime)){
            alert("开始时间不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(endTime)){
            alert("结束时间不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(spInfo)){
            alert("特殊说明不能为空！");
            flag = false;
            return false;
        }
        if(flag == true) {
            var callBackFun = function(data) {
                if (data) {
                    alert("发起成功！");
                } else {
                    alert("发起失败！");
                }
            };
            var args = {
                companyId: $scope.userInfo.companyId,
                name: $scope.material.name ,
                num : $scope.material.num,
                projectId: $scope.material.project.id,
                time: $("#startTime").val() + "至" + $("#endTime").val() ,
                spInfo: $scope.material.spInfo,
                spUserId: $scope.userInfo.name,
                exUserId: $scope.material.exUser.name
            }
            httpSyncPost(api.material.create, args, callBackFun);
        }
    }
});