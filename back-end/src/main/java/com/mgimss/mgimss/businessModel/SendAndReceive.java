package com.mgimss.mgimss.businessModel;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.FinishedJobRepository;
import com.mgimss.mgimss.repository.PendingJobRepository;
import com.mgimss.mgimss.repository.RunningJobRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

import static com.mgimss.mgimss.utils.ConnectHardware.sendMessage;
import static com.mgimss.mgimss.utils.ToJson.MapToJson;

public class SendAndReceive extends Thread{



    private Job job;
    public SendAndReceive(Job job)
    {
        this.job = job;
    }
    @Override
    public  void run()
    {
        User user;
        String host;
        String port;
        Appliance appliance;
        String send_message;
        String recv_message;

        appliance = job.getAppliance();
        user = appliance.getUser();
        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(appliance.getAid()));
        map.put("option", "1");

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        //发送开启指令
        try {
            sleep(this.job.getLastTime()*1000);
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
        map.put("id", String.valueOf(appliance.getAid()));
        map.put("option", "0");

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        //发送关闭的指令
    }
}
