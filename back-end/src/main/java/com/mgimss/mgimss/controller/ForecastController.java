package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.AI.UserMapping;
import com.mgimss.mgimss.AI.getForecastData;
import com.mgimss.mgimss.businessModel.CreateSolarThread;
import com.mgimss.mgimss.businessModel.CreateUserThread;
import com.mgimss.mgimss.repository.*;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ForecastController
{
    @Autowired
    PendingJobRepository pendingJobRepository;

    @Autowired
    RunningJobRepository runningJobRepository;

    @Autowired
    FinishedJobRepository finishedJobRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BattetyRepository battetyRepository;

    @Autowired
    SolarPowerRepository solarPowerRepository;
    private Long cloud = 10L;
    @RequestMapping("/forecast/predict")
    public String predictdata() {
        try {
            Long uid = 1L;
            List<BigInteger> predictSourceData = solarPowerRepository.findAllDataByUid(uid);

            System.out.println("predicSourceData");
            System.out.println(predictSourceData);
            Long[] data = new Long[predictSourceData.size() - 10];
            for (int g = 0; g < predictSourceData.size() - 10; g++) {
                data[g] = (predictSourceData.get(g)).longValue();
            }

            Long[] predictData = getForecastData.predicted(data);
            ArrayList<Long> forecastdata = new ArrayList<Long>();
            for  (int ii = 0;ii<predictData.length;ii++) {
                if (predictData[ii] >= 0L)
                    forecastdata.add(predictData[ii] * cloud / 10);
                else
                    forecastdata.add(0L);
            }
            JSONArray forecast = JSONArray.fromArray(forecastdata.toArray());
            return forecast.toString();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }

    }

    @RequestMapping("/forecast/true")
    public String truedata() {
        try {
            Long uid = 1L;
            List<BigInteger> predictSourceData = solarPowerRepository.findAllDataByUid(uid);

            System.out.println("predicSourceData");
            System.out.println(predictSourceData);
            Long[] data = new Long[10];
            int gg = 0;
            for (int g = predictSourceData.size() - 10; g < predictSourceData.size(); g++) {

                data[gg] = (predictSourceData.get(g)).longValue();
                gg++;
            }

            ArrayList<Long> forecastdata = new ArrayList<Long>();
            for  (int ii = 0;ii<data.length;ii++) {
                if (data[ii] >= 0L)
                    forecastdata.add(data[ii]);
                else
                    forecastdata.add(0L);
            }
            JSONArray forecast = JSONArray.fromArray(forecastdata.toArray());
            return forecast.toString();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }

    }

}
