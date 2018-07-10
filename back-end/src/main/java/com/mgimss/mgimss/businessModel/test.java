package com.mgimss.mgimss.businessModel;
import java.util.ArrayList;

public class test extends  Thread {

    private int clientId;
    public int getTime()
    {
        return 100000;
    }
    public test(int clientId)
    {
        this.clientId = clientId;
    }
    @Override
    public void run() {
        while (true) {
            try {
                Job job1 = new Job();
                job1.myinit(120000, 100000, 110000, 5000, 10, 1);
                Job job2 = new Job();
                job2.myinit(120000, 100000, 110000, 5000, 10, 2);
                Job job3 = new Job();
                job3.myinit(120000, 100000, 110000, 5000, 10, 3);
                Job job4 = new Job();
                job4.myinit(120000, 100000, 110000, 5000, 10, 4);
                Job job5 = new Job();
                job5.myinit(120000, 100000, 110000, 5000, 10, 5);
                ArrayList<Job> sleepJob = new ArrayList();
                sleepJob.add(job4);
                sleepJob.add(job5);
                ArrayList<Job> runJob = new ArrayList();
                runJob.add(job1);
                runJob.add(job2);
                runJob.add(job3);
                ArrayList<Job> beginJob = new ArrayList();
                Schedule newschedule = new Schedule();
                System.out.println("test begin");
                //接受该clientIdDE1runJob，sleepJob;
                beginJob = newschedule.doschedule(runJob, sleepJob);
                int beginTime = getTime();
                int threadSize = beginJob.size();
                Thread[] threadId;
                threadId = new Thread[threadSize];
                for(int k = 0 ;k<beginJob.size();k++)
                {
                    threadId[k] = new SendAndReceive(this.clientId,beginJob.get(k).getJobId(),beginTime,beginJob.get(k).getLastTime());
                }

                sleep(6 * 100*3);
            }
            catch (InterruptedException e)
            {
                e.printStackTrace();
            }
        }
    }

}
