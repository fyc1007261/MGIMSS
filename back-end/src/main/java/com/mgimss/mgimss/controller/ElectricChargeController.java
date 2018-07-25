package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.AI.getForecastData;
import com.mgimss.mgimss.entity.Charge;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.ChargeRepository;
import com.mgimss.mgimss.repository.UserRepository;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
public class ElectricChargeController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ChargeRepository chargeRepository;

    @RequestMapping("/electric/charge")
    String post_charge(String time, String charge, String uid, String option)
    {
        Date date = new Date();
        Long Ldata = date.getTime()/(1000*60*60*24)*(1000*60*60*24);
        Date date2 = new Date(Ldata);
        Long ans = chargeRepository.sumSellByTime(date2,date,1L);
        System.out.println(ans);
        Long Ldata2;
        Long Ldata1;
        ArrayList<Long> forecastdata = new ArrayList<Long>();
        for  (int ii = 0;ii<10;ii++) {
            Ldata1 = Ldata - (9-ii) * (1000*60*60*24);
            Ldata2 = Ldata1 +(1000*60*60*24);
            Date date3 = new Date(Ldata1);
            Date date4 = new Date(Ldata2);
            ans = chargeRepository.sumSellByTime(date3,date4,1L);
            if (ans ==null)
                ans = 0L;
            forecastdata.add(ans);
        }
        JSONArray forecast = JSONArray.fromArray(forecastdata.toArray());
        return forecast.toString();

    }
    @RequestMapping("/electric/charge2")
    String post_charge2(String time, String charge, String uid, String option)
    {
        Date date = new Date();
        Long Ldata = date.getTime()/(1000*60*60*24)*(1000*60*60*24);
        Date date2 = new Date(Ldata);
        Long ans = chargeRepository.sumSellByTime(date2,date,1L);
        System.out.println(ans);
        Long Ldata2;
        Long Ldata1;
        ArrayList<Long> forecastdata = new ArrayList<Long>();
        for  (int ii = 0;ii<10;ii++) {
            Ldata1 = Ldata - (9-ii) * (1000*60*60*24);
            Ldata2 = Ldata1 +(1000*60*60*24);
            Date date3 = new Date(Ldata1);
            Date date4 = new Date(Ldata2);
            ans = chargeRepository.sumBuyByTime(date3,date4,1L);
            if (ans ==null)
                ans = 0L;
            forecastdata.add(ans);
        }
        JSONArray forecast = JSONArray.fromArray(forecastdata.toArray());
        return forecast.toString();

    }

}
