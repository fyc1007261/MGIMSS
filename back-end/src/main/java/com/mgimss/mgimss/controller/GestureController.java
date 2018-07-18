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
    public String upload(String imageStr){
        String res = "";

        try {
            res = upload.inspect_gesture(imageStr);
            return "";
        } catch (Exception e) {
            e.printStackTrace();
            return "err: illegal gesture";
        }

    }
}
