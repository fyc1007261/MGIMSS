package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.utils.upload;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
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
            String body = imageStr.split(",")[1].replaceAll(" ", "+");
            res = upload.inspect_gesture(body);
            JSONObject jsonObject = JSONObject.fromObject(res);
            JSONArray hands= jsonObject.getJSONArray("hands");
            JSONObject gesture = JSONObject.fromObject(hands.get(0));
            JSONObject gestureDetail = gesture.getJSONObject("gesture");
            double thumb_up = gestureDetail.getDouble("thumb_up");
            double heart_d = gestureDetail.getDouble("heart_d");
            double victory = gestureDetail.getDouble("victory");
            String result = "no gesture";
            if (thumb_up >40.0)
                result = "thumb_up";
            if (heart_d >40.0)
                result = "heartd";
            if (victory >40.0)
                result = "victory";
            System.out.println(result);
            return "";
        } catch (Exception e) {
            e.printStackTrace();
            return "err: illegal gesture";
        }

    }
}
