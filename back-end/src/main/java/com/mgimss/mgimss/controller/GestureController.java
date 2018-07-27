package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.AI.DataTest;
import com.mgimss.mgimss.AI.Speechgenrate;
import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Gesture;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.ApplianceRepository;
import com.mgimss.mgimss.repository.GestureRepository;
import com.mgimss.mgimss.repository.PendingJobRepository;
import com.mgimss.mgimss.repository.UserRepository;
import com.mgimss.mgimss.utils.upload;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static com.mgimss.mgimss.utils.ConnectHardware.sendMessage;
import static com.mgimss.mgimss.utils.ToJson.MapToJson;

@RestController
public class GestureController {

    @Autowired
    GestureRepository gestureRepository;

    @Autowired
    ApplianceRepository applianceRepository;

    @Autowired
    UserRepository userRepository;

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
                result = "heart_d";
            if (victory >40.0)
                result = "victory";
            if (result == "no gesture")
            {
                Speechgenrate.voice("小微没有识别该手势");
                return "err: no gesture";
            }
            Gesture gest = gestureRepository.findByGname(result);
            Appliance appliance = applianceRepository.findByNameAndUid(gest.getName(),gest.getUser().getUid());
            if (appliance.getRunningState() == 0) {
                String result2 = open_close_appliance(appliance.getAid(), "on");
                if (!result2.contains("err")) {
//                    Speechgenrate.voice("用电器开启成功");

                }
                else
                {
                    Speechgenrate.voice("用电器开启失败");
                }
            }
            else{
                String result2 = open_close_appliance(appliance.getAid(), "off");
                if (!result2.contains("err")) {
//                    Speechgenrate.voice("用电器关闭成功");

                }
                else
                {
                    Speechgenrate.voice("用电器关闭失败");
                }
            }
            System.out.println(result);
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            try {
                Speechgenrate.voice("手势识别失败");
                }
                catch (Exception ee)
                {
                    System.out.println("语音合成失败");
                }
                return "err: illegal gesture";
        }

    }


    public String add_appliance(String name, String mfrs, Long perPower)
    {
        User user;
        Long aid;
        Date addDate;
        String port;
        String host;
        String send_message;
        String recv_message;

        //当前用户
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();
        user = userRepository.findByUid(Long.valueOf(1));
        //获得新电器应分配的aid
        Set<Appliance> present_apps = user.getAppliances();
        if (present_apps.size() == 0) aid = Long.valueOf(1);
        else aid = applianceRepository.findMaxAidByUid(user.getUid()) + 1;

        //添加时间
        addDate = new Date();

        Appliance appliance = new Appliance(user, aid, name, addDate, mfrs,
                perPower, null, 0);

        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("name", name);
        map.put("option", "add");

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);

        System.out.println("get message from server: " + recv_message);
        if (recv_message.contains("err")) return recv_message;

        //当python做完了相应操作没出错时，同步数据库
        applianceRepository.save(appliance);
        return recv_message;
    }

    public String open_close_appliance(Long aid, String option){
        User user;
        String port;
        String host;
        int new_state;
        String send_message;
        String recv_message;

//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();

        user = userRepository.findByUid(Long.valueOf(1));

        System.out.println("APPLIANCE");
        if(option.equals("on")) new_state = 1;
        else if (option.equals("off")) new_state = 0;
        else return "err: wrong option string";

        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);
        if (appliance == null){
            return "err: no appliance";
        }

        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("option", option);

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        return recv_message;

    }
}
