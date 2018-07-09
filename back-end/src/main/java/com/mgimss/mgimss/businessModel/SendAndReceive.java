package com.mgimss.mgimss.businessModel;

public class SendAndReceive extends Thread{
    private int clientId,jobId,beginTime,lastTime;
    public SendAndReceive(int clientId,int jobId,int beginTime,int lastTime)
    {
        this.clientId = clientId;
        this.jobId = jobId;
        this.beginTime = beginTime;
        this.lastTime = lastTime;
    }
    @Override
    public  void run()
    {
        //发送开启指令
        try {
            sleep(this.lastTime);
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
        //发送关闭的指令
    }
}
