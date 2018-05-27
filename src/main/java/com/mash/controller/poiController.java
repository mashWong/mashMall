/**
 * Created by Administrator on 2017/11/21.
 */
package com.mash.controller;

import com.mash.model.user;
import com.mash.service.UserService;
import com.mash.utils.ExportBeanExcel;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class poiController{

    @RequestMapping(value = "/exportExcel", method = RequestMethod.GET)
    public void index(HttpServletRequest request, HttpServletResponse response) {
        List<String> listName = new ArrayList<>();
        listName.add("id");
        listName.add("名字");
        listName.add("性别");
        List<String> listId = new ArrayList<>();
        listId.add("id");
        listId.add("name");
        listId.add("sex");
        List<user> list = new ArrayList<>();
        list.add(new user(111,"张三asdf","男"));
        list.add(new user(111,"李四asd","男"));
        list.add(new user(111,"王五","女"));

        ExportBeanExcel<user> exportBeanExcel = new ExportBeanExcel();
        HSSFWorkbook wb = exportBeanExcel.exportExcel("测试POI导出EXCEL文档",listName,listId,list);


        OutputStream output= null;
        try {
            output = response.getOutputStream();
            response.reset();
            response.setHeader("Content-disposition", "attachment; filename="+ URLEncoder.encode("sdfsdf.xls", "utf-8"));
            response.setContentType("application/xls");
            wb.write(output);
            output.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
