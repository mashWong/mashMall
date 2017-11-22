package com.mash.controller;

import com.mash.model.user;
import com.mash.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2017/11/21.
 */
@RestController
public class textController extends UserService {
    @Autowired
    private UserService userService;

    @Value("${server.port}")
    private String num;

    @RequestMapping(value = "/getPort", method = RequestMethod.GET)
    public String index(){
        return num;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<user> user() throws Exception {
        List<user> users = userService.getUsers();
        return users;
    }
}
