package com.mgimss.mgimss.utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ToJson {
    public static String MapToJson(Map<String, String> map){
        Iterator iter = map.entrySet().iterator();
        String requestbody = "{";
        while (iter.hasNext()) {
            Map.Entry<String, String> entry = (Map.Entry) iter.next();
            String key = entry.getKey();
            String value = entry.getValue();
            requestbody = requestbody + '"' + key + '"' +":" + '"' + value + '"';
            if (iter.hasNext()) requestbody += ',';
        }
        requestbody += "}";
        return requestbody;
    }
}
