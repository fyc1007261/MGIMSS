package com.light.springboot.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Readfile {
    public static String readFileByBytes(String fileName) {
        File file = new File(fileName);
        InputStream in = null;
        String char_string;
        StringBuilder sb = new StringBuilder("");
        try {

            System.out.println("以字节为单位读取文件内容，一次读多个字节：");
            // 一次读多个字节
            byte[] tempbytes = new byte[200];
            int byteread = 0;
            in = new FileInputStream(fileName);
            // 读入多个字节到字节数组中，byteread为一次读入的字节数
            while ((byteread = in.read(tempbytes)) > 0) {
                char_string = new String(tempbytes);
                sb.append(char_string);
                tempbytes = new byte[200];
            }

            return sb.toString();

        } catch (Exception e1) {
            e1.printStackTrace();
            return "error";
        } finally {
            if (in != null) {
                try {
                    in.close();

                } catch (IOException e1) {

                }
            }
        }

    }
}
