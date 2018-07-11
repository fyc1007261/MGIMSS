package com.mgimss.mgimss.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class PowerUseControllerImpl implements PowerUseController {
    public String getDailyPowerUse() {
        String Power = "{\"power\":[{\"date\":\"2018-07-05\",\"use\":68},{\"date\":\"2018-07-06\",\"use\":83},{\"date\":\"2018-07-07\",\"use\":78},{\"date\":\"2018-07-08\",\"use\":71},{\"date\":\"2018-07-09\",\"use\":79},{\"date\":\"2018-07-10\",\"use\":63},{\"date\":\"2018-07-11\",\"use\":80}]}";
        return Power;
    }
    public String getMonthlyPowerUse() {
        String Power = "{\"power\":[{\"date\":\"2018-01\",\"use\":2100},{\"date\":\"2018-02\",\"use\":2344},{\"date\":\"2018-03\",\"use\":2175},{\"date\":\"2018-04\",\"use\":2258},{\"date\":\"2018-05\",\"use\":2361},{\"date\":\"2018-06\",\"use\":2010},{\"date\":\"2018-07\",\"use\":2653}]}";
        return Power;
    }
}
