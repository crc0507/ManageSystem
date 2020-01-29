/**
 * Created by WenFe on 2017/4/17.
 */
var app = angular.module('projectCEApp', []);
app.controller('projectCECtrl', function($scope) {
    $(document).ready(function () {
        init();
    });

    function init() {
        setSideActive("project_li", "project_create_li");
        $scope.userInfo = getLocalJson("userInfo");
        $scope.initArgs = getRequest();
        $scope.project = {
            id: "",
            budget:"",
            companyId: $scope.userInfo.companyId,
            owner: {},
            persons: []
        };
        initPersons();
        initOwner();
        initDepartment();
        if ($.isEmptyObject($scope.initArgs)) {
            $scope.isCreate = true;
        } else {
            $scope.isEdit = true;
            getProjectInfo($scope.initArgs.companyId, $scope.initArgs.id);
        }
        $("#startDate").datepicker({
            inline: true
        });
        $("#endDate").datepicker({
            inline: true
        });

        $scope.$apply();
    }

    function initDepartment() {
        var callBackFuc = function(data) {
            if (data) {
                $scope.departments = data;
            } else {
            }
        }
        httpSyncPost(api.department.list, {"companyId": $scope.userInfo["companyId"]}, callBackFuc);
    }
    function initPersons() {
        var personsSelect = $("#persons");
        $.post(api.user.list,{"companyId":$scope.userInfo["companyId"]},
            function(data) {
                if (data) {
                    for (var index in data) {
                        personsSelect.multiSelect('addOption', {
                            value: data[index]["name"],
                            text: data[index]["displayName"]
                        });
                    }
                } else {
                }
            });
        //添加监听事件
        personsSelect.multiSelect({
            afterSelect: function (options) {
                for (var index in $scope.users) {
                    if ($scope.users[index].name == options.value) {
                        $scope.project.persons.push($scope.users[index]);
                    }
                }
            },
            afterDeselect: function (options) {
                for (var i in $scope.project.persons) {
                    var id = $scope.project.persons[i].name;
                    if (id == options.value) {
                        $scope.project.persons.splice(i, 1);
                    }
                }
            }
        });
    }

    function initOwner() {
        var callBackFuc = function(data) {
            if (data) {
                $scope.users = data;
            }
        };
        httpSyncPost(api.user.list, {"companyId": $scope.userInfo["companyId"]}, callBackFuc);

    }

    function getProjectInfo(companyId, id) {

        var callBackFun = function (data) {
            if (data) {
                $scope.project = data;
                //初始化已选择人员
                var personsSelect = $("#persons");
                if (!$.isEmptyObject($scope.project)) {
                    var personsId = [];
                    for (var index in $scope.project.persons) {
                        personsId.push($scope.project.persons[index].name);
                    }
                    personsSelect.multiSelect('select', personsId);
                }
                //for (var index in $scope.users) {
                //    if ($scope.project.owner.name == $scope.users[index].name) {
                //        $scope.project.owner = $scope.users[index];
                //        $scope.ownerIndex = index;
                //    }
                //}
            }
            $scope.$apply();
        };
        httpSyncPost(api.project.get, {companyId: companyId, id: id}, callBackFun);
    }
    $scope.projectCreate = function() {
        var name = $('#name').val();
        var department = $('#department').val();
        var owner = $('#owner').val();
        var persons = $('#persons').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var status = $('#status').val();
        var flag = true;
        if($.isEmptyObject(name)){
            alert("名称不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(department)){
            alert("上级部门不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(owner)){
            alert("主管不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(persons)){
            alert("人员不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(startDate)){
            alert("开始日期不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(endDate)){
            alert("结束日期不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(status)){
            alert("状态不能为空！");
            flag = false;
            return false;
        }
        if(flag == true){
            //ng-model无法取到该值
            $scope.project.startDate = $("#startDate").val();
            $scope.project.endDate = $("#endDate").val();
            $scope.project.status = "run";
            var projectInfo  = JSON.stringify($scope.project);
            httpSyncPost(api.project.create, {"projectInfo": projectInfo}, function(data){
                if (data) {
                    alert("suc");
                }
            });
        }
    };

    $scope.projectUpdate = function() {
        var name = $('#name').val();
        var department = $('#department').val();
        var owner = $('#owner').val();
        var persons = $('#persons').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var status = $('#status').val();
        var flag = true;
        if($.isEmptyObject(name)){
            alert("名称不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(department)){
            alert("上级部门不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(owner)){
            alert("主管不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(persons)){
            alert("人员不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(startDate)){
            alert("开始日期不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(endDate)){
            alert("结束日期不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(status)){
            alert("状态不能为空！");
            flag = false;
            return false;
        }
        if(flag == true){
            //ng-model无法取到该值
            $scope.project.startDate = $("#startDate").val();
            $scope.project.endDate = $("#endDate").val();
            var projectInfo  = JSON.stringify($scope.project);
            httpSyncPost(api.project.update, {"projectInfo": projectInfo}, function(data){
                if (data) {
                    alert("创建项目成功！");
                } else {
                    alert("创建项目失败！");
                }
            });
            return false;
        }
    };
});