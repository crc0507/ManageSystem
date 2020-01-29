package com.bupt.sse.adminManage.controller;

import com.bupt.sse.adminManage.entity.UserEntity;
import com.bupt.sse.adminManage.service.UserService;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by WenFe on 2017/4/10.
 */
@RequestMapping("/user")
@Controller
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public UserEntity login(String name, String password) {
        return userService.login(name, password);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public boolean register(String IDCard, String displayName, String password) {
        return userService.create(displayName, IDCard, password, IDCard, "", "", "", "", "", "", 0, "", 0, "", "admin");
    }

    @RequestMapping(value ="/list", method = RequestMethod.POST)
    @ResponseBody
    public List<UserEntity> list(String companyId) {
        return userService.list(companyId);
    }

    @RequestMapping(value ="/listByDepartment", method = RequestMethod.POST)
    @ResponseBody
    public List<UserEntity> listByDepartment(String companyId, String departmentId) {
        return userService.listByDepartment(companyId, departmentId);
    }

    @RequestMapping(value ="/listByRole", method = RequestMethod.POST)
    @ResponseBody
    public List<UserEntity> listByRole(String companyId, String role) {
        return userService.listByRole(companyId, role);
    }

    @RequestMapping(value ="/detail", method = RequestMethod.POST)
    @ResponseBody
    public UserEntity get(String name) {
        return userService.get(name);
    }

    @RequestMapping(value ="/create", method = RequestMethod.POST)
    @ResponseBody
    public boolean create(String name,
                             String displayName,
                             String departmentId,
                             String workNum,
                             String companyId,
                             String phone,
                             String email,
                             String history,
                             String role) {
        return userService.create(displayName, name, name, name, workNum, departmentId, "", phone, email, "", 0, history, 0, companyId, role);
    }


    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public boolean update(String name,
                          String displayName,
                          String departmentId,
                          String workNum,
                          String phone,
                          String email,
                          String history,
                          String role) {
        return userService.update(name,
                displayName,
                departmentId,
                workNum,
                phone,
                email,
                history,
                role);
    }

    @RequestMapping(value ="/delete", method = RequestMethod.POST)
    @ResponseBody
    public boolean delete(String id) {
        return userService.delete(id);
    }
}
