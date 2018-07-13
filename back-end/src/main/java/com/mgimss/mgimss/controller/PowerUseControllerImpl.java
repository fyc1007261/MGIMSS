package com.mgimss.mgimss.controller;

import org.springframework.web.bind.annotation.RestController;
////////////////////////////////////////////////////////////////////test data
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

    public String getDailyAppsPowerUse(String date) {
        String Power;
        if(date.equals("2018-07-11")) {
            Power = "{\"power\":[{\"appname\":\"light1\",\"use\":8},{\"appname\":\"light2\",\"use\":12},{\"appname\":\"light3\",\"use\":4},{\"appname\":\"light4\",\"use\":7}]}";
        }
        else {
            Power = "{\"power\":[{\"appname\":\"light1\",\"use\":6},{\"appname\":\"light2\",\"use\":3},{\"appname\":\"light3\",\"use\":9},{\"appname\":\"light4\",\"use\":10}]}";
        }
        return Power;
    }

    public String getMonthlyAppsPowerUse(String month) {
        String Power;
        if(month.equals("2018-07")) {
            Power = "{\"power\":[{\"appname\":\"light1\",\"use\":198},{\"appname\":\"light2\",\"use\":224},{\"appname\":\"light3\",\"use\":137},{\"appname\":\"light4\",\"use\":127}]}";
        }
        else {
            Power = "{\"power\":[{\"appname\":\"light1\",\"use\":151},{\"appname\":\"light2\",\"use\":170},{\"appname\":\"light3\",\"use\":199},{\"appname\":\"light4\",\"use\":135}]}";
        }
        return Power;
    }
}
