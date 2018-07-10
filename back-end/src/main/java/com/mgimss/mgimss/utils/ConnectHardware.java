package com.mgimss.mgimss.utils;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.HashMap;

public class ConnectHardware {

    public static String sendMessage(String host,  String port, String message){
        try{
            //connect to C++ serve
            Socket socket = new Socket(host, Integer.valueOf(port));

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
            String recv_message = "" + sb;

            outputStream.close();
            inputStream.close();
            socket.close();
            return recv_message;
        }
        catch (Exception ex){
            return "err: connection corrupts";
        }
    }

}
