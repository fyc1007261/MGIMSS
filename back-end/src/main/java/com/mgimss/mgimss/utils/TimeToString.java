package com.mgimss.mgimss.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeToString {
    public String LongToString(Long time, char split){
        if (time>92233720368547758L || time==0){
            return "Null";
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(time*1000);
        return sdf.format(date).replace(' ', split);
    }
}
