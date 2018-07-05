package com.mgimss.mgimss.appliance;



import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.List;

import com.mgimss.mgimss.classes.Appliance;
import com.mgimss.mgimss.classes.ApplianceRepository;
import com.mgimss.mgimss.classes.LatestTime;
import com.mgimss.mgimss.classes.LatestTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplianceProcessingImpl implements ApplianceProcessing {
    @Autowired
    ApplianceRepository applianceRepository;
    @Autowired
    LatestTimeRepository latestTimeRepository;

    public String receive_current_status(String time, int id, String name, String username,
                                     float voltage, float current, int status)
    {
        Appliance appliance = new Appliance();
        appliance.setTime(time);
        appliance.setCurrent(current);
        appliance.setName(name);
        appliance.setStatus(status);
        appliance.setVoltage(voltage);
        appliance.setId(id);
        appliance.setUsername(username);
        applianceRepository.save(appliance);
        applianceRepository.flush();

        // set the latest time
        LatestTime latestTime =  latestTimeRepository.getLatestTime();
        latestTime.setTime(time);
        latestTimeRepository.save(latestTime);
        latestTimeRepository.flush();

        // return time for client to check for validity
        return time;
    }

    public String request_status(String message){
        try{
        //connect to C++ server
        String host = "localhost";
        int port = 12334;
        Socket socket = new Socket(host, port);

        //send message to server
        OutputStream outputStream = socket.getOutputStream();
        byte[] sendBytes = message.getBytes("UTF-8");
        outputStream.write(sendBytes);
        socket.shutdownOutput();

        //get message from server
        InputStream inputStream = socket.getInputStream();
        byte[] bytes = new byte[1024];
        int len;
        StringBuilder sb = new StringBuilder();
        while ((len = inputStream.read(bytes)) != -1) {
            sb.append(new String(bytes, 0, len,"UTF-8"));
        }
        String recv_message = "get message from server: " + sb;

        outputStream.close();
        inputStream.close();
        socket.close();
        return recv_message;
        }
        catch (Exception ex){
            return ex.toString();
        }
    }

    public List<Appliance> get_latest_status(){
        LatestTime latestTime = latestTimeRepository.getLatestTime();
        String time = latestTime.getTime();
        return applianceRepository.getAppliancesByTime(time);
    }
}
