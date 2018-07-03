import javax.net.ssl.SSLException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static java.lang.Integer.parseInt;

public class upload {
        private final static int CONNECT_TIME_OUT = 30000;

        private final static int READ_OUT_TIME = 50000;

        public static void main(String []args) throws IOException {
            String url;
            int mode = parseInt(args[0]);

            File file=new File(args[1]);
            long l=file.length();
            byte [] bytes=new byte[(int)l];
            FileInputStream fis=new FileInputStream(file);
            int r;
            while((r=fis.read(bytes))!=-1)
            {
            }
            fis.close();
            Base64.Encoder encoder = Base64.getEncoder();
            String imagestr=encoder.encodeToString(bytes);
            HashMap<String, String> map;
            HashMap<String, byte[]> byteMap;
            map = new HashMap<String,String>();
            byteMap = new HashMap<String,byte[]>();
            map.put("api_key", "Wtiu2i2x46N1Bw16nzpW8pGF-EgV3O7b");
            map.put("api_secret", "mIa9WP9jv3_89xAPtI9Z85qBwjTvjzxf");
            //map.put("return_landmark", "1");
            //map.put("return_attributes", "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus");
            map.put("image_base64",imagestr);

            if (mode == 0){
                //识别是否有人
                url = "https://api-cn.faceplusplus.com/humanbodypp/v1/detect";
            }
            else{
                //识别手势
                url = "https://api-cn.faceplusplus.com/humanbodypp/beta/gesture";
                map.put("return_landmark", "1");
                map.put("return_attributes", "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus");
                map.put("return_gesture", "1");
            }



            try{
                byte[] bacd = post(url, map, byteMap);
                String str = new String(bacd);
                System.out.println(str);
            }catch (Exception e) {
                e.printStackTrace();
            }
        }

    @SuppressWarnings("unchecked")
    protected static byte[] post(String url, HashMap<String,String> map, HashMap<String, byte[]> fileMap) throws Exception {

        HttpURLConnection conne;

        URL url1 = new URL(url);

        conne = (HttpURLConnection) url1.openConnection();

        conne.setDoOutput(true);

        conne.setUseCaches(false);

        conne.setRequestMethod("POST");

        conne.setConnectTimeout(CONNECT_TIME_OUT);

        conne.setReadTimeout(READ_OUT_TIME);

        conne.setRequestProperty("accept", "*/*");

        conne.setRequestProperty("connection", "Keep-Alive");

        DataOutputStream obos = new DataOutputStream(conne.getOutputStream());

        Iterator iter = map.entrySet().iterator();

        String requestbody="";

        while(iter.hasNext()){

            Map.Entry<String, String> entry = (Map.Entry) iter.next();

            String key = entry.getKey();

            String value = entry.getValue();

            requestbody=requestbody+key+"="+encode(value)+"&";

        }

        System.out.println("requestbody:"+requestbody);

        obos.writeBytes(requestbody);

        obos.flush();

        obos.close();

        InputStream ins = null;

        int code = conne.getResponseCode();

        try{

            if(code == 200){

                ins = conne.getInputStream();

            }else{

                ins = conne.getErrorStream();

            }

        }catch (SSLException e){

            e.printStackTrace();

            return new byte[0];

        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        byte[] buff = new byte[4096];

        int len;

        while((len = ins.read(buff)) != -1){

            baos.write(buff, 0, len);

        }

        byte[] bytes = baos.toByteArray();

        ins.close();

        return bytes;

    }

    private static String encode(String value) throws Exception{

        return URLEncoder.encode(value, "UTF-8");

    }
}
