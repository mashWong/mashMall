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

        ExportBeanExcel<user> exportBeanExcel = new ExportBeanExcel();
        exportBeanExcel.ex(response);
    }
}
