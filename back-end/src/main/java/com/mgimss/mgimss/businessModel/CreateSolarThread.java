package com.mgimss.mgimss.businessModel;

import com.mgimss.mgimss.AI.getForecastData;
import com.mgimss.mgimss.entity.Battery;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.SolarPower;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;

import java.math.BigInteger;
import java.util.*;

import static com.mgimss.mgimss.utils.ConnectHardware.sendMessage;
import static com.mgimss.mgimss.utils.ToJson.MapToJson;

public class CreateSolarThread extends  Thread {


    private PendingJobRepository pendingJobRepository;

    private RunningJobRepository runningJobRepository;

    private FinishedJobRepository finishedJobRepository;

    private UserRepository userRepository;

    private BattetyRepository battetyRepository;

    private SolarPowerRepository solarPowerRepository;

    private Long clientId;
    public int getTime()
    {
        return 100000;
    }
    public CreateSolarThread(Long clientId, PendingJobRepository pendingJobRepository, RunningJobRepository runningJobRepository,
                             FinishedJobRepository finishedJobRepository, UserRepository userRepository, BattetyRepository battetyRepository, SolarPowerRepository solarPowerRepository)
    {
        this.clientId = clientId;
        this.battetyRepository = battetyRepository;
        this.finishedJobRepository = finishedJobRepository;
        this.pendingJobRepository = pendingJobRepository;
        this.runningJobRepository = runningJobRepository;
        this.solarPowerRepository = solarPowerRepository;
        this.userRepository = userRepository;
    }
    @Override
    public void run(){
        while (true) {
            try {
                Date date = new Date();

                int hour = date.getHours()+24;

                Long time;
                Long count = solarPowerRepository.findCount(clientId);
                if (count == Long.valueOf(0))
                {
                    time = Long.valueOf(0);
                }
                else
                {
                    Long sid;
                    sid = solarPowerRepository.findMaxSidByUid(clientId);
                    time = solarPowerRepository.findLastTime(clientId,sid)+Long.valueOf(1);
                }
                if (time > hour)
                {
                    hour = hour + 24;
                }
                while (time < (hour))
                {
                    Long modTime = time % 24;
                    String generation = obtainSolar(modTime,"require_generation");
                    Long gener = Long.parseLong(generation);
                    post_generation(modTime,gener,Long.toString(clientId));
                    time++;
                }
                Date date2 = new Date();
                int minute = date2.getMinutes();
                minute = 60-minute;
                sleep(minute*60 * 1000);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }
    public String post_generation(Long time, Long generation, String uid){
        User user;
        Long new_sid;
        Long count;
        SolarPower solarPower;

        user = userRepository.findByUid(Long.valueOf(uid));


        count = solarPowerRepository.findCount(user.getUid());
        if (count.equals(Long.valueOf(0))){
            new_sid = Long.valueOf(0);
        }
        else
            new_sid = solarPowerRepository.findMaxSidByUid(user.getUid()) + 1;

        System.out.println("complete sid: "+ new_sid + user.getUid());

        solarPower = new SolarPower(new_sid, user, Long.valueOf(3600), generation,time);

        solarPowerRepository.save(solarPower);
        System.out.println("here got it~");
        return "success";
    }
    //java call
    public String obtainSolar(Long time, String option){
        User user;
        String port;
        String host;
        int new_state;
        String send_message;
        String recv_message;

//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();

        user = userRepository.findByUid(1L);

        System.out.println("obtainSolar");




        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("time", String.valueOf(time));
        map.put("option", option);

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        return recv_message;

    }

}
