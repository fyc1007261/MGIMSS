package com.mgimss.mgimss.businessModel;

public class Beginschedule
{
    public void begin() {
        int clientId1 = 1;
        int clientId2 = 2;
        Thread myThread1 = new test(clientId1);     // 创建一个新的线程  myThread1  此线程进入新建状态
        Thread myThread2 = new test(clientId2);     // 创建一个新的线程 myThread2 此线程进入新建状态
        myThread1.start();                     // 调用start()方法使得线程进入就绪状态
        myThread2.start();                     // 调用start()方法使得线程进入就绪
//		new Timer().schedule(new test(clientId1),4000);
//		new Timer().schedule(new test(clientId2),24000);
    }
}
