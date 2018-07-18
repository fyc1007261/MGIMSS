package com.mgimss.mgimss.utils;

import javax.net.ssl.SSLException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static java.lang.Integer.parseInt;

public class upload {
    private final static int CONNECT_TIME_OUT = 30000;

    private final static int READ_OUT_TIME = 50000;

    public static String inspect_person(String imageStr) throws Exception {
        String url = "https://api-cn.faceplusplus.com/humanbodypp/v1/detect";
        HashMap<String, String> map = new HashMap<>();
        map.put("api_key", "Wtiu2i2x46N1Bw16nzpW8pGF-EgV3O7b");
        map.put("api_secret", "mIa9WP9jv3_89xAPtI9Z85qBwjTvjzxf");
        map.put("image_base64", imageStr);
        byte[] bacd = post(url, map);
        String str = new String(bacd);
        System.out.println(str);
        return str;
    }

    public static String inspect_gesture(String imageStr) throws Exception {
        String url = "https://api-cn.faceplusplus.com/humanbodypp/beta/gesture";
        HashMap<String, String> map = new HashMap<>();
        map.put("api_key", "Wtiu2i2x46N1Bw16nzpW8pGF-EgV3O7b");
        map.put("api_secret", "mIa9WP9jv3_89xAPtI9Z85qBwjTvjzxf");
        map.put("image_base64", imageStr);
        byte[] bacd = post(url, map);
        String str = new String(bacd);
        System.out.println(str);
        return str;
    }


    @SuppressWarnings("unchecked")
    protected static byte[] post(String url, HashMap<String, String> map) throws Exception {
        HttpURLConnection conne;
        URL url1 = new URL(url);
        conne = (HttpURLConnection) url1.openConnection();
        conne.setDoOutput(true);
        conne.setUseCaches(false);
        conne.setRequestMethod("POST");
        conne.setConnectTimeout(CONNECT_TIME_OUT);
        conne.setReadTimeout(READ_OUT_TIME);
        conne.setRequestProperty("accept", "*/*");
        conne.setRequestProperty("connection", "Keep-Alive");
        DataOutputStream obos = new DataOutputStream(conne.getOutputStream());
        Iterator iter = map.entrySet().iterator();
        String requestbody = "";
        while (iter.hasNext()) {
            Map.Entry<String, String> entry = (Map.Entry) iter.next();
            String key = entry.getKey();
            String value = entry.getValue();
            requestbody = requestbody + key + "=" + encode(value) + "&";
        }
        System.out.println("requestbody:" + requestbody);
        obos.writeBytes(requestbody);
        obos.flush();
        obos.close();
        InputStream ins = null;
        int code = conne.getResponseCode();
        try {
            if (code == 200) {
                ins = conne.getInputStream();
            } else {
                ins = conne.getErrorStream();
            }
        } catch (SSLException e) {
            e.printStackTrace();
            return new byte[0];
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buff = new byte[4096];
        int len;
        while ((len = ins.read(buff)) != -1) {
            baos.write(buff, 0, len);
        }
        byte[] bytes = baos.toByteArray();
        ins.close();
        return bytes;
    }
    private static String encode(String value) throws Exception {
        return URLEncoder.encode(value, "UTF-8");
    }
}
