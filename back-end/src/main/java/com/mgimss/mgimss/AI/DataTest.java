package com.mgimss.mgimss.AI;

import com.mgimss.mgimss.entity.Appliance;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DataTest {
    public static int stepA = 0;
    public static int stepB = 0;
    public static String name = "";
    public static Date beginTime;
    public static Date endTime ;
    public static Long lastTime = Long.valueOf(0);
    public static Appliance appliance;

    public static  void main(String[] arg)
    {
        change2int("0小时0分20秒。");
    }
    public static Date  change2date(String arg) {
        try {
            java.text.SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日，HH:mm:ss");
            String s = arg;
            Date date = formatter.parse(s);
            System.out.println(date);
            return date;
        }
        catch (Exception e)
        {
            System.out.println("error");
            return null;
        }
    }
    public static Long  change2int(String arg) {
        try {
//            java.text.SimpleDateFormat formatter = new SimpleDateFormat("HH小时mm分ss秒");
//            String s = arg;
//            Date date = formatter.parse(s);
//            System.out.println(date);
//            return date.getTime()/1000;
            int hour = arg.indexOf("小时");
            int minute = arg.indexOf("分");
            int second = arg.indexOf("秒");
            System.out.println("hour:"+hour+"minute:"+minute+"second:"+second);
            Long Lhour = Long.parseLong(arg.substring(0,hour))*Long.valueOf(3600);
            Long Lminute = Long.parseLong(arg.substring(hour+2,minute))*Long.valueOf(60);
            Long Lsecond = Long.parseLong(arg.substring(minute+1,second))*Long.valueOf(1);
            System.out.println(arg);
            System.out.println("hour:"+Lhour+"minute:"+Lminute+"second:"+Lsecond);
            return Lhour+Lminute+Lsecond;

        }
        catch (Exception e)
        {
            System.out.println("error");
            return null;
        }
    }
}
