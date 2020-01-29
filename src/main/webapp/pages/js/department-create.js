/**
 * Created by WenFe on 2017/4/12.
 */
var app = angular.module('DepartmentCApp', []);
app.controller('DepartmentCCtrl', function($scope) {
    $(document).ready(function () {
        init();
    });
    function init() {
        setSideActive("department_li", "department_create_li");
        $.ajaxSetup({
            async: false
        });
        var userInfo = getLocalJson("userInfo");
        $.post(api.department.list, {"companyId": userInfo["companyId"]},
            function (data) {
                if (data) {
                    var dpmSelect = $("#dpmSelect");
                    var varItem = new Option("[空]", "");
                    dpmSelect.append(varItem);
                    for (var index in data) {
                        var varItem = new Option(data[index]["name"], data[index]["id"]);
                        dpmSelect.append(varItem);
                    }
                } else {
                }
            });
        // $.post(api.user.list, {"companyId": userInfo["companyId"]},
        //     function (data) {
        //         if (data) {
        //             var ownerSelect = $("#ownerSelect");
        //             var varItem = new Option("[空]", "");
        //             ownerSelect.append(varItem);
        //             for (var index in data) {
        //                 var varItem = new Option(data[index]["displayName"], data[index]["name"]);
        //                 ownerSelect.append(varItem);
        //             }
        //         } else {
        //         }
        //     });
    }
    $scope.sureBtn = function() {
        var userInfo = getLocalJson("userInfo");
        var name = $('#dpmName').val();
        var parentId = $('#dpmSelect').val();
        //废弃部长选择
        var ownerId = "0";//$('#ownerSelect').val();
        var introduce = $('#introduce').val();
        var flag = true;
        if ($.isEmptyObject(name)) {
            alert("部门名称不能为空！");
            flag = fasle;
            return false;
        }
        if($.isEmptyObject(parentId)){
            alert("上级部门不能为空！");
            flag = false;
            return false;
        }
        if($.isEmptyObject(introduce)){
            alert("简介不能为空！");
            flag = false;
            return false;
        }
        if(flag == true) {
            $.post("/adminManage/department/create", {
                    "name": name,
                    "description": introduce,
                    "parentId": parentId,
                    "ownerId": ownerId,
                    "companyId": userInfo["companyId"]
                },
                function (data) {
                    if (data) {
                        alert("创建部门成功！");
                        return false;
                    } else {
                        alert("创建部门失败！");
                        return false;
                    }
                });
        }
    }
});
