package com.mgimss.mgimss.AI;
import net.sf.json.JSONObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import sun.audio.AudioPlayer;
import sun.audio.AudioStream;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.applet.AudioClip;

import java.io.*;

import java.applet.Applet;

import java.awt.Frame;

import java.net.MalformedURLException;

import java.net.URL;

import static jdk.nashorn.internal.runtime.regexp.joni.Syntax.Java;
public class Speechgenrate {
    public static void main(String[] arg) throws Exception{
        voice("开机");
    }
    public static void voice(String text) throws Exception{
        String appid = "5b3979c9";
        String appKey = "0f3e7b94362ba00d6618ced9181f5c8d";
        String curTime = String.valueOf(new Date().getTime()/1000);
        //FileInputStream f1 = new FileInputStream("D://大二暑假项目 - 副本/webSpeech/demo.wav");

        String url = "http://api.xfyun.cn/v1/service/v1/tts";

        String xParam = "{\"auf\":\"audio/L16;rate=8000\",\"aue\":\"raw\",\"voice_name\":\"xiaoyan\",\"speed\":\"50\",\"engine_type\":\"aisound\",\"volume\":\"77\",\"pitch\":\"50\"}";
        //JSONObject result1 = new JSONObject();
        //result1.put("engine_type", "sms16k");
        //result1.put("aue", "raw");
        //System.out.println(result1);
        String param = Base64.getEncoder().encodeToString(xParam.getBytes("UTF-8"));
        //System.out.println(param);
        //param = "eyJlbmdpbmVfdHlwZSI6ICJzbXMxNmsiLCJhdWUiOiAicmF3In0=";
        System.out.println(param);
        String body =text;
        System.out.println(body);
        String checkSum = DigestUtils.md5Hex(appKey + curTime + param );

        HttpPost httpPost = new HttpPost(url);
        CloseableHttpClient httpClient = HttpClients.createDefault();
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();

        NameValuePair pair1 = new BasicNameValuePair("text", body);
        pairs.add(pair1);
        httpPost.setEntity(new UrlEncodedFormEntity(pairs, HTTP.UTF_8));
        httpPost.setHeader("X-Appid", appid);
        httpPost.setHeader("X-CurTime", curTime);
        httpPost.setHeader("X-Param", param);
        httpPost.setHeader("X-CheckSum", checkSum);

        HttpResponse response = httpClient.execute(httpPost);
        if(response.getStatusLine().getStatusCode() == 200){
            HttpEntity responseEntity = response.getEntity();
//            BufferedInputStream in=null;
//            BufferedOutputStream out=null;
//            in=new BufferedInputStream(responseEntity.getContent());
//            out=new BufferedOutputStream(new FileOutputStream("genrate.wav"));
//            int len=-1;
//            byte[] b=new byte[1024];
//            while((len=in.read(b))!=-1){
//                out.write(b,0,len);
//            }
//            in.close();
//            out.close();
//            FileInputStream fileau=new FileInputStream("genrate.wav");
            AudioStream as=new AudioStream(responseEntity.getContent());
            AudioPlayer.player.start(as);
        }
        System.out.println("调用成功");
    }
}
