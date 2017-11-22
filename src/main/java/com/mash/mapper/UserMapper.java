/**
 * Created by mash on 2017/11/22.
 */
package com.mash.mapper;

import org.apache.ibatis.annotations.*;
import com.mash.model.user;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    @Select("SELECT * FROM t_user")
//    @Results({
//            @Result(property = "userName", column = "userName")
//    })
    List<user> getAllUsers();

    @Select("SELECT * FROM t_user WHERE id = #{id}")
    @Results({
            @Result(property = "userName", column = "userName")
    })
    user getUserById(String id);

//    @Insert("INSERT INTO users(userName,passWord,user_sex) VALUES(#{userName}, #{passWord}, #{userSex})")
//    void insert(user user);
//
//    @Update("UPDATE users SET userName=#{userName},nick_name=#{nickName} WHERE id =#{id}")
//    void update(user user);
//
//    @Delete("DELETE FROM users WHERE id =#{id}")
//    void delete(Long id);
}
