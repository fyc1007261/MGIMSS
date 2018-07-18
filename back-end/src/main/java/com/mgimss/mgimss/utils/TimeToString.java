package com.mgimss.mgimss.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeToString {
    public String LongToString(Long time){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                 Date date = new Date(time/1000);
                 return sdf.format(date).replace(' ', 'T');
    }
}
