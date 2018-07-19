package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.AppStatus;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.entity.Charge;
import com.mgimss.mgimss.repository.AppStatusRepository;
import com.mgimss.mgimss.repository.ChargeRepository;
import com.mgimss.mgimss.repository.UserRepository;
import com.mgimss.mgimss.utils.upload;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class ChargeController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ChargeRepository chargeRepository;

    @RequestMapping("/battery/overflow")
    String post_charge(String time, String charge, String uid, String option)
    {
        Date recordTime;
        Long electricCharge;
        Long opt;
        User user;

        opt = Long.valueOf(option);
        electricCharge = Long.valueOf(charge);
        user = userRepository.findByUid(Long.valueOf(uid));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            recordTime = sdf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
            return "err: no such appliance";
        }

        System.out.println(recordTime);

        if (opt == Long.valueOf(1))
        {
            electricCharge = electricCharge*Long.valueOf(5);
        }
        else
        {
            int hour = recordTime.getHours();
            Long cc;
            if (hour<8)
                cc = Long.valueOf(10);
            else if(hour <16)
                cc = Long.valueOf(20);
            else
                cc = Long.valueOf(10);
            electricCharge = electricCharge * cc;
        }

        Charge newCharge  = new Charge(user,recordTime,opt,electricCharge);

        chargeRepository.save(newCharge);

        return "success";
    }

}
