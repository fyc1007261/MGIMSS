package com.mgimss.mgimss.AI;

import java.util.Date;
import java.util.Base64;
import org.apache.http.protocol.HTTP;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import net.sf.json.JSONObject;
import org.apache.http.util.EntityUtils;
import java.io.FileInputStream;
import org.apache.commons.io.IOUtils;
import org.apache.commons.codec.digest.DigestUtils;
import java.util.ArrayList;
import java.util.List;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



public class Speech {

    public static void main(String[] arg) throws Exception{
        String appid = "5b3979c9";
        String appKey = "05fb4f97940251b20f7c1f43ee875263";
        String curTime = String.valueOf(new Date().getTime()/1000);
        FileInputStream f1 = new FileInputStream("D://大二暑假项目 - 副本/webSpeech/demo.wav");

        String url = "http://api.xfyun.cn/v1/service/v1/iat";

        String xParam = "{\"engine_type\":\"sms16k\",\"aue\":\"raw\"}";
        //JSONObject result1 = new JSONObject();
        //result1.put("engine_type", "sms16k");
        //result1.put("aue", "raw");
        //System.out.println(result1);
        String param = Base64.getEncoder().encodeToString(xParam.getBytes("UTF-8"));
        //System.out.println(param);
        //param = "eyJlbmdpbmVfdHlwZSI6ICJzbXMxNmsiLCJhdWUiOiAicmF3In0=";
        System.out.println(param);
        String body =Base64.getEncoder().encodeToString(IOUtils.toByteArray(f1));
        System.out.println(body);
        String checkSum = DigestUtils.md5Hex(appKey + curTime + param );

        HttpPost httpPost = new HttpPost(url);
        CloseableHttpClient httpClient = HttpClients.createDefault();
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();

        NameValuePair pair1 = new BasicNameValuePair("audio", body);
        pairs.add(pair1);
        httpPost.setEntity(new UrlEncodedFormEntity(pairs, HTTP.UTF_8));
        httpPost.setHeader("X-Appid", appid);
        httpPost.setHeader("X-CurTime", curTime);
        httpPost.setHeader("X-Param", param);
        httpPost.setHeader("X-CheckSum", checkSum);

        HttpResponse response = httpClient.execute(httpPost);
        if(response.getStatusLine().getStatusCode() == 200){
            HttpEntity responseEntity = response.getEntity();
            String resJson = EntityUtils.toString(responseEntity,"utf-8");
            System.out.println(resJson);
            JSONObject jsonObject = JSONObject.fromObject(resJson);
            String code = jsonObject.getString("code");
            if(code.equals("0")) { // 成功
                String dataresult = (String)jsonObject.get("data");
                ;
                System.out.println(dataresult);
            }
            else { // 失败
                String desc = jsonObject.getString("desc");
                throw new Exception("讯飞语音接口调用失败："+desc);
            }
        }
        System.out.println("调用成功");
    }



}