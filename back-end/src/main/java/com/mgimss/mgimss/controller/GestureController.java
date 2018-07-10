package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.utils.upload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class GestureController {
    @RequestMapping("gesture/upload")
    @ResponseBody
    public String upload(String imgcode, String src, HttpServletRequest request){
        imgcode = request.getParameter("imgcode");
        src = request.getParameter("src");
        src =  "E:/课程相关文件/Grade 2-2/软件工程导论/homework/MGIMSS/EMMM/src/main/resources/static/image/person/"+src;
        System.out.println("src: "+ src);
        System.out.println(imgcode);
        String res = "";

        try {
            res = upload.inspect_person(src);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }
}
