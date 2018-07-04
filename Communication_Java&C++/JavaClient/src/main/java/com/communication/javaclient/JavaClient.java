package com.communication.javaclient;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

@RestController
public class JavaClient {
    @RequestMapping("/communication")
    public static String test(String message) throws Exception {
        //connect to C++ server
        String host = "localhost";
        int port = 8085;
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
}
