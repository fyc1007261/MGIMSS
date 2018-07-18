package com.mgimss.mgimss.businessModel;
import com.mgimss.mgimss.entity.Battery;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.AI.getForecastData;
import java.math.BigInteger;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.ArrayList;
import java.util.List;

public class CreateUserThread extends  Thread {



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
    public CreateUserThread(Long clientId,PendingJobRepository pendingJobRepository,RunningJobRepository runningJobRepository,
                            FinishedJobRepository finishedJobRepository,UserRepository userRepository,BattetyRepository battetyRepository,SolarPowerRepository solarPowerRepository)
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
                ArrayList<Job> beginJob = new ArrayList();
                Schedule newschedule = new Schedule();
                System.out.println("test begin");
                //接受该clientIdDE1runJob，sleepJob;
                List<Job> runJob = runningJobRepository.findByUid(clientId);
                List<Job> pendJob = pendingJobRepository.findByUid(clientId);

                Battery battery = battetyRepository.findByUser(clientId);
                List<BigInteger> predictSourceData = solarPowerRepository.findAllDataByUid(clientId);

                System.out.println("predicSourceData");
                System.out.println(predictSourceData);
                Long[] data = new Long[predictSourceData.size()];
                for (int g = 0 ;g<predictSourceData.size();g++)
                {
                    data[g] = (predictSourceData.get(g)).longValue();
                }

                Long[] predictData =  getForecastData.predicted(data);
                //Long[] predictData ={Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),Long.valueOf(100), Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400), Long.valueOf(100),Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900)};
                beginJob = newschedule.doschedule(runJob, pendJob,battery,predictData,pendingJobRepository);
                System.out.println("beginJob");
                if (beginJob.size()>0)
                {
                    System.out.println(beginJob.get(0).getAppliance().getName());
                }
                else
                {
                    System.out.println("no job to running");
                }
//                int threadSize = beginJob.size();
//                Thread[] threadId;
//                threadId = new Thread[threadSize];
//                for(int k = 0 ;k<beginJob.size();k++)
//                {
//                    threadId[k] = new SendAndReceive(beginJob.get(k));
//                    threadId[k].start();
//
//                }

                sleep(60 * 1000);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

}
