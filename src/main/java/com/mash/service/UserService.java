package com.mash.service;

import com.mash.mapper.UserMapper;
import com.mash.model.user;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by mash on 2017/11/22.
 */
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<user> getUsers() throws Exception {
        List<user> users = userMapper.getAllUsers();
        return users;
    }
}
