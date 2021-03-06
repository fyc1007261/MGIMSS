package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.DailyPowerConsume;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.DailyRepository;
import com.mgimss.mgimss.repository.PowerUseRepository;
import com.mgimss.mgimss.repository.UserRepository;
import com.mgimss.mgimss.utils.GetUserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class PowerUseControllerImpl implements PowerUseController {
    @Autowired
    DailyRepository dailyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public GetUserContext getUserContext;

    public String getDailyPowerUse() {
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        User user = (User) auth.getPrincipal();
        User user = getUserContext.getUser();
        List<DailyPowerConsume> AllUse = dailyRepository.find7daysUse(user.getUid());
        Map<Date, Long> DailyUse = new HashMap<>();
        List<Date> DateList = new ArrayList<>();

        for(DailyPowerConsume OneUse : AllUse) {
            Date date = OneUse.getDate();

            if (DailyUse.containsKey(date)) {
                DailyUse.put(date, OneUse.getConsumption() + DailyUse.get(date));
            } else {
                DailyUse.put(date, OneUse.getConsumption());
                DateList.add(date);
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

        if (buf.charAt(buf.length()-1) == ','){
            buf.deleteCharAt(buf.length()-1);
        }
        buf.append("]}");

        return buf.toString();
    }

    public String getMonthlyPowerUse() {
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        User user = (User) auth.getPrincipal();
        User user = getUserContext.getUser();
        List<DailyPowerConsume> AllUse = dailyRepository.find7monthsUse(user.getUid());
        Map<String, Long> MonthlyUse = new HashMap<>();
        List<String> DateList = new ArrayList<>();

        for(DailyPowerConsume OneUse : AllUse) {
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
        if (buf.charAt(buf.length()-1) == ','){
            buf.deleteCharAt(buf.length()-1);
        }
        buf.append("]}");
        return buf.toString();
    }

    public String getDailyAppsPowerUse(String date) {
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        User user = (User) auth.getPrincipal();
        User user = getUserContext.getUser();
        List<DailyPowerConsume> AllUse = dailyRepository.findByDate(date, user.getUid());
        Map<String, Long> DailyUse = new HashMap<>();

        for(DailyPowerConsume OneUse : AllUse) {
            DailyUse.put(OneUse.getAppliance().getName(), OneUse.getConsumption());
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
        if (buf.charAt(buf.length()-1) == ','){
            buf.deleteCharAt(buf.length()-1);
        }

        buf.append("]}");
        return buf.toString();
    }

    public String getMonthlyAppsPowerUse(String month) {
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        User user = (User) auth.getPrincipal();
        User user = getUserContext.getUser();
        List<DailyPowerConsume> AllUse = dailyRepository.findByMonth(month, user.getUid());
        Map<String, Long> MonthlyUse = new HashMap<>();

        for(DailyPowerConsume OneUse : AllUse) {
            String name = OneUse.getAppliance().getName();
            if (MonthlyUse.containsKey(name)) {
                MonthlyUse.put(name, OneUse.getConsumption() + MonthlyUse.get(name));
            } else {
                MonthlyUse.put(name, OneUse.getConsumption());
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
        if (buf.charAt(buf.length()-1) == ','){
            buf.deleteCharAt(buf.length()-1);
        }
        buf.append("]}");
        return buf.toString();
    }

    private String getMax(Map<String, Long> map) {
        List<Map.Entry<String, Long>> list = new ArrayList(map.entrySet());
        Collections.sort(list, (o1, o2) -> (o1.getValue().intValue() - o2.getValue().intValue()));
        return list.get(list.size()-1).getKey();
    }

    public String getHighestPowerUse() {
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        User user = (User) auth.getPrincipal();
        User user = getUserContext.getUser();
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM");
        Date Today = new Date();

        Map<String, Long> H_day = new HashMap<>();
        Map<String, Long> H_month = new HashMap<>();
        Map<String, Long> H_app_month = new HashMap<>();
        Map<String, Long> H_app_year = new HashMap<>();
        List<DailyPowerConsume> AllUse = dailyRepository.findByYear(sdf1.format(Today), user.getUid());
        List<DailyPowerConsume> MonthUse = dailyRepository.findByMonth(sdf2.format(Today), user.getUid());

        for(DailyPowerConsume OneUse : AllUse) {
            Date date = OneUse.getDate();
            SimpleDateFormat dateformat1 = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat dateformat2 = new SimpleDateFormat("yyyy-MM");
            String dateString = dateformat1.format(date);
            String monthString = dateformat2.format(date);
            String name = OneUse.getAppliance().getName();
            Long consumption = OneUse.getConsumption();

            H_day.put(dateString, consumption);
            if (H_month.containsKey(monthString)) {
                H_month.put(monthString, consumption + H_month.get(monthString));
            } else {
                H_month.put(monthString, consumption);
            }
            if (H_app_year.containsKey(name)) {
                H_app_year.put(name, consumption + H_app_year.get(name));
            } else {
                H_app_year.put(name, consumption);
            }
        }

        for(DailyPowerConsume OneUse : MonthUse) {
            String name = OneUse.getAppliance().getName();
            Long consumption = OneUse.getConsumption();

            if (H_app_month.containsKey(name)) {
                H_app_month.put(name, consumption + H_app_month.get(name));
            } else {
                H_app_month.put(name, consumption);
            }
        }

        String MaxDay = getMax(H_day);
        String MaxMonth = getMax(H_month);
        String MaxApp = getMax(H_app_month);
        String MaxAppYear = getMax(H_app_year);
        Long MaxDayUse = H_day.get(MaxDay);
        Long MaxMonthUse = H_month.get(MaxMonth);
        Long MaxAppUse = H_app_month.get(MaxApp);
        Long MaxAppYearUse = H_app_year.get(MaxAppYear);

        StringBuffer buf = new StringBuffer();
        buf.append("{\"power\":[");
        buf.append(
                "{\"label\":\"" + MaxDay +
                        "\",\"use\":" + MaxDayUse +
                        "}," +
                        "{\"label\":\"" + MaxMonth +
                        "\",\"use\":" + MaxMonthUse +
                        "}," +
                        "{\"label\":\"" + MaxApp +
                        "\",\"use\":" + MaxAppUse +
                        "}," +
                        "{\"label\":\"" + MaxAppYear +
                        "\",\"use\":" + MaxAppYearUse +
                        "}"
        );
        buf.append("]}");

        return buf.toString();
    }
}