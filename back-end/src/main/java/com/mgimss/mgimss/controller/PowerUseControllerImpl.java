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

    private String getMax(Map<String, Long> map) {
        List<Map.Entry<String, Long>> list = new ArrayList(map.entrySet());
        Collections.sort(list, (o1, o2) -> (o1.getValue().intValue() - o2.getValue().intValue()));
        return list.get(list.size()-1).getKey();
    }

    public String getHighestPowerUse() {
        Long UserID = 1L;/////////////////////////////////////////////////////////////////////////////userID
        List<Appliance> UserApps = applianceRepository.findByUser(UserID);

        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM");
        Date Today = new Date();

        Map<String, Long> H_day = new HashMap<>();
        Map<String, Long> H_month = new HashMap<>();
        Map<String, Long> H_app_month = new HashMap<>();
        Map<String, Long> H_app_year = new HashMap<>();
        List<DailyPowerConsume> AllUse = powerUseRepository.findByYear(sdf1.format(Today));
        List<DailyPowerConsume> MonthUse = powerUseRepository.findByMonth(sdf2.format(Today));

        for(DailyPowerConsume OneUse : AllUse) {
            if(UserApps.contains(OneUse.getAppliance())) {
                Date date = OneUse.getDate();
                SimpleDateFormat dateformat1 = new SimpleDateFormat("yyyy-MM-dd");
                SimpleDateFormat dateformat2 = new SimpleDateFormat("yyyy-MM");
                String dateString = dateformat1.format(date);
                String monthString = dateformat2.format(date);
                String name = OneUse.getAppliance().getName();
                Long consumption = OneUse.getConsumption();

                H_day.put(dateString, consumption);
                if(H_month.containsKey(monthString)) {
                    H_month.put(monthString, consumption + H_month.get(monthString));
                }
                else {
                    H_month.put(monthString, consumption);
                }
                if(H_app_year.containsKey(name)) {
                    H_app_year.put(name, consumption + H_app_year.get(name));
                }
                else {
                    H_app_year.put(name, consumption);
                }
            }
        }

        for(DailyPowerConsume OneUse : MonthUse) {
            if(UserApps.contains(OneUse.getAppliance())) {
                String name = OneUse.getAppliance().getName();
                Long consumption = OneUse.getConsumption();

                if(H_app_month.containsKey(name)) {
                    H_app_month.put(name, consumption + H_app_month.get(name));
                }
                else {
                    H_app_month.put(name, consumption);
                }
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
