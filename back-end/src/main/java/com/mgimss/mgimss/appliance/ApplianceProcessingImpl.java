package com.mgimss.mgimss.appliance;



import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import com.mgimss.mgimss.classes.ApplianceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplianceProcessingImpl implements ApplianceProcessing {
    @Autowired
    ApplianceRepository applianceRepository;

    public String get_current_status(String time, int id, String name,
                                     float voltage, float current, int status)
    {
        return time+"\n"+id+' '+name+' '+voltage+' '+current+' '+status;
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

    public String test(){
        return "hahahhaha";
    }
}
