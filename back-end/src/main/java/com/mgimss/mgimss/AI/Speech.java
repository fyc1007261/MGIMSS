package com.mgimss.mgimss.AI;

import java.io.File;
import java.io.FileOutputStream;
import java.util.*;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.AppStatusRepository;
import com.mgimss.mgimss.repository.ApplianceRepository;
import com.mgimss.mgimss.repository.PendingJobRepository;
import com.mgimss.mgimss.repository.UserRepository;
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
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Speech {
    @Autowired
    AppStatusRepository appStatusRepository;

    @Autowired
    ApplianceRepository applianceRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    PendingJobRepository pendingJobRepository;
    @RequestMapping("/webSpeech")
    public  void webSpeech(String sudio) throws Exception{
        Appliance appliance = null;

        User user = userRepository.findByUid(Long.valueOf(1));
        String appid = "5b3979c9";
        String appKey = "05fb4f97940251b20f7c1f43ee875263";
        String curTime = String.valueOf(new Date().getTime()/1000);
//        FileInputStream f1 = new FileInputStream("D://大二暑假项目 - 副本/webSpeech/demo.wav");

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
//        String body =Base64.getEncoder().encodeToString(IOUtils.toByteArray(f1));
        String body = sudio.split(",")[1];
        System.out.println(body);
//        File file = new File("lalala.wav");
//        if(file.exists()==false){
//            file.mkdirs();
//        }
//
//        byte[] buffer = Base64.getDecoder().decode(body);
//        FileOutputStream out = new FileOutputStream("HAHAHA.wav");
//        out.write(buffer);
//        out.close();

        String checkSum = DigestUtils.md5Hex(appKey + curTime + param );
        String dataresult = "";
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
                dataresult = (String)jsonObject.get("data");

                System.out.println(dataresult);
            }
            else { // 失败
                String desc = jsonObject.getString("desc");
                throw new Exception("讯飞语音接口调用失败："+desc);
            }
        }
        if (dataresult.indexOf("添加任务")>=0)
        {
            Speechgenrate.voice("好的，小龙为您添加新任务，请说出用电器名字");
            DataTest.stepA=1;
            DataTest.stepB=1;
        }
        else if (dataresult.indexOf("开启")>=0)
        {
            DataTest.name = dataresult.substring(2,dataresult.length()).split("。")[0];
            DataTest.appliance = applianceRepository.findByNameAndUid(DataTest.name,Long.valueOf(1));

            if (DataTest.appliance == null)
            {
                Speechgenrate.voice("小龙并没有找到该用电器");
            }
            else {
                Speechgenrate.voice("好的，小龙正在为您开启用电器，");
                DataTest.stepA = 0;
                DataTest.stepB = 0;
            }
        }
        else if (dataresult.indexOf("关闭")>=0)
        {
            DataTest.name = dataresult.substring(2,dataresult.length()).split("。")[0];
            DataTest.appliance = applianceRepository.findByNameAndUid(DataTest.name,Long.valueOf(1));

            if (DataTest.appliance == null)
            {
                Speechgenrate.voice("小龙并没有找到该用电器");
            }
            else {
                Speechgenrate.voice("好的，小龙正在为您关闭用电器，");
                DataTest.stepA = 0;
                DataTest.stepB = 0;
            }
        }
        else if (dataresult.indexOf("小龙你好")>=0)
        {
            Speechgenrate.voice("主人您好，小龙很荣幸为您服务");
        }
        else if ((DataTest.stepA ==1) && (DataTest.stepB ==1))
        {
            DataTest.name = dataresult.split("。")[0];
            DataTest.appliance = applianceRepository.findByNameAndUid(DataTest.name,Long.valueOf(1));

            if (DataTest.appliance == null)
            {
                Speechgenrate.voice("小龙并没有找到该用电器");
            }
            else {
                Speechgenrate.voice("请设置允许开启时间");
                DataTest.stepA = 1;
                DataTest.stepB = 2;
            }
        }
        else if ((DataTest.stepA ==1) && (DataTest.stepB ==2))
        {
            DataTest.beginTime = DataTest.change2date(dataresult);
            if (DataTest.beginTime == null)
            {
                Speechgenrate.voice("小龙走神了，请再给小龙念一遍好吗");
            }
            else {
                Speechgenrate.voice("请设置必须完成时间");
                DataTest.stepA = 1;
                DataTest.stepB = 3;
            }
        }
        else if ((DataTest.stepA ==1) && (DataTest.stepB ==3))
        {
            DataTest.endTime = DataTest.change2date(dataresult);
            if (DataTest.endTime == null)
            {
                Speechgenrate.voice("小龙走神了，请再给小龙念一遍好吗");
            }
            else {
                Speechgenrate.voice("请设置持续时间");
                DataTest.stepA = 1;
                DataTest.stepB = 4;
            }
        }
        else if ((DataTest.stepA ==1) && (DataTest.stepB ==4))
        {
            DataTest.lastTime = DataTest.change2int(dataresult);
            if (DataTest.lastTime == null)
            {
                Speechgenrate.voice("小龙走神了，请再给小龙念一遍好吗");
            }
            else {
                System.out.println("appId:"+DataTest.appliance.getAppId());
                Optional<Long> pPower = appStatusRepository.findAvgPowerByAppliance(DataTest.appliance.getAppId());
                Long perPower;
                if (!pPower.isPresent()){
                    perPower = DataTest.appliance.getPower();
                }
                else perPower = pPower.get();
                Job job;
                System.out.println("startTime:"+DataTest.beginTime.getTime()/1000+"stopTime:"+DataTest.endTime.getTime()/1000+"LastTime:"+DataTest.lastTime+"PerPower:"+perPower);
                job = new Job(DataTest.beginTime.getTime()/1000, DataTest.endTime.getTime()/1000, Long.valueOf(0), Long.valueOf(0), DataTest.lastTime,
                        perPower, 0, DataTest.appliance, user);
                pendingJobRepository.save(job);
                Speechgenrate.voice("设置成功，小龙随时听候主人的吩咐");
                DataTest.stepA = 0;
                DataTest.stepB = 0;
            }
        }
        else{
            Speechgenrate.voice("小龙没有听明白您在说什么");
            DataTest.stepA = 0;
            DataTest.stepB = 0;
        }

        System.out.println("调用成功");
    }



}