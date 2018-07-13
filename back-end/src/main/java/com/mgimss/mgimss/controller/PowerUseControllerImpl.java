package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.DailyPowerConsume;
import com.mgimss.mgimss.repository.ApplianceRepository;
import com.mgimss.mgimss.repository.PowerUseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class PowerUseControllerImpl implements PowerUseController {
    @Autowired
    PowerUseRepository powerUseRepository;
    @Autowired
    ApplianceRepository applianceRepository;

    public String getDailyPowerUse() {
        Long UserID = 1L;/////////////////////////////////////////////////////////////////////////////userID
        List<Appliance> UserApps = applianceRepository.findByUser(UserID);

        List<DailyPowerConsume> AllUse = powerUseRepository.find7daysUse();
        Map<Date, Long> DailyUse = new HashMap<>();
        List<Date> DateList = new ArrayList<>();

        for(DailyPowerConsume OneUse : AllUse) {
            if(UserApps.contains(OneUse.getAppliance())) {
                Date date = OneUse.getDate();

                if (DailyUse.containsKey(date)) {
                    DailyUse.put(date, OneUse.getConsumption() + DailyUse.get(date));
                } else {
                    DailyUse.put(date, OneUse.getConsumption());
                    DateList.add(date);
                }
            }
        }

        Collections.sort(DateList);
        StringBuffer buf = new StringBuffer();
        buf.append("{\"power\":[");

        for(Integer i = 0; i < DateList.size(); i++) {
            SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
            String date = dateformat.format(DateList.get(i));
            buf.append(
                    "{\"date\":\"" + date +
                            "\",\"use\":" + DailyUse.get(DateList.get(i)) +
                            "},"
            );
        }

        buf.deleteCharAt(buf.length() - 1);
        buf.append("]}");
        return buf.toString();
    }

    public String getMonthlyPowerUse() {
        Long UserID = 1L;/////////////////////////////////////////////////////////////////////////////userID
        List<Appliance> UserApps = applianceRepository.findByUser(UserID);

        List<DailyPowerConsume> AllUse = powerUseRepository.find7monthsUse();
        Map<String, Long> MonthlyUse = new HashMap<>();
        List<String> DateList = new ArrayList<>();

        for(DailyPowerConsume OneUse : AllUse) {
            if(UserApps.contains(OneUse.getAppliance())) {
                Date date = OneUse.getDate();
                SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM");
                String dateString = dateformat.format(date);

                if (MonthlyUse.containsKey(dateString)) {
                    MonthlyUse.put(dateString, OneUse.getConsumption() + MonthlyUse.get(dateString));
                } else {
                    MonthlyUse.put(dateString, OneUse.getConsumption());
                    DateList.add(dateString);
                }
            }
        }

        Collections.sort(DateList);
        StringBuffer buf = new StringBuffer();
        buf.append("{\"power\":[");

        for(Integer i = 0; i < DateList.size(); i++) {
            buf.append(
                    "{\"date\":\"" + DateList.get(i) +
                            "\",\"use\":" + MonthlyUse.get(DateList.get(i)) +
                            "},"
            );
        }

        buf.deleteCharAt(buf.length() - 1);
        buf.append("]}");
        return buf.toString();
    }

    public String getDailyAppsPowerUse(String date) {
        Long UserID = 1L;/////////////////////////////////////////////////////////////////////////////userID
        List<Appliance> UserApps = applianceRepository.findByUser(UserID);

        List<DailyPowerConsume> AllUse = powerUseRepository.findByDate(date);
        Map<String, Long> DailyUse = new HashMap<>();

        for(DailyPowerConsume OneUse : AllUse) {
            if(UserApps.contains(OneUse.getAppliance())) {
                DailyUse.put(OneUse.getAppliance().getName(), OneUse.getConsumption());
            }
        }

        StringBuffer buf = new StringBuffer();
        buf.append("{\"power\":[");

        for(Map.Entry<String, Long> entry : DailyUse.entrySet()) {
            buf.append(
                    "{\"appname\":\"" + entry.getKey() +
                            "\",\"use\":" + entry.getValue() +
                            "},"
            );
        }

        buf.deleteCharAt(buf.length() - 1);
        buf.append("]}");
        return buf.toString();
    }

    public String getMonthlyAppsPowerUse(String month) {
        Long UserID = 1L;/////////////////////////////////////////////////////////////////////////////userID
        List<Appliance> UserApps = applianceRepository.findByUser(UserID);

        List<DailyPowerConsume> AllUse = powerUseRepository.findByMonth(month);
        Map<String, Long> MonthlyUse = new HashMap<>();

        for(DailyPowerConsume OneUse : AllUse) {
            if(UserApps.contains(OneUse.getAppliance())) {
                String name = OneUse.getAppliance().getName();
                if(MonthlyUse.containsKey(name)) {
                    MonthlyUse.put(name, OneUse.getConsumption() + MonthlyUse.get(name));
                }
                else {
                    MonthlyUse.put(name, OneUse.getConsumption());
                }
            }
        }

        StringBuffer buf = new StringBuffer();
        buf.append("{\"power\":[");

        for(Map.Entry<String, Long> entry : MonthlyUse.entrySet()) {
            buf.append(
                    "{\"appname\":\"" + entry.getKey() +
                            "\",\"use\":" + entry.getValue() +
                            "},"
            );
        }

        buf.deleteCharAt(buf.length() - 1);
        buf.append("]}");
        return buf.toString();
    }
}
