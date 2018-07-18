package com.mgimss.mgimss.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface PowerUseController {
    @RequestMapping("/fun/getDailyPowerUse")
    String getDailyPowerUse();

    @RequestMapping("/fun/getMonthlyPowerUse")
    String getMonthlyPowerUse();

    @RequestMapping("/fun/getDailyAppsPowerUse")
    String getDailyAppsPowerUse(String date);

    @RequestMapping("/fun/getMonthlyAppsPowerUse")
    String getMonthlyAppsPowerUse(String month);
}
