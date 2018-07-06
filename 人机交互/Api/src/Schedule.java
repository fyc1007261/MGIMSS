import java.awt.*;
import java.util.ArrayList;

public class Schedule {
    public int getTime()
    {
        return 100000;
    }
    public int getCharge(int time)
    {
        return 10;
    }
    public int getSolarCharge(int time)
    {
        return 10;
    }
    public int getSolarBackCharge(int time)
    {
        return 10;
    }

    public ArrayList<Job> doschedule(ArrayList<Job> runJob,ArrayList<Job> sleepJob) {
        System.out.println("schedule begin");
        int doit = 0;

        int nowTime = getTime();
        Battery battery = new Battery();
        ForecastPower forecastPower = new ForecastPower();
        battery.setCapacity(100000);
        battery.setRemain(50000);
        forecastPower.setInterval(1000);
        int capacity = battery.getCapacity();
        int remain = battery.getRemain();
        int timeSlice = forecastPower.getInterval();
        ArrayList<Job> beginJob = new ArrayList();
        for (int i = 0; i < sleepJob.size(); i++) //对每一个 sleepJob做预测
        {
            System.out.println("jobId:"+sleepJob.get(i).getJobId());
            int startTime = sleepJob.get(i).getIntStartTime();
            int stopTime = sleepJob.get(i).getIntStopTime();
            if (nowTime >= startTime)//该job可以开始
            {
                if ((nowTime + sleepJob.get(i).getLastTime() + timeSlice) > stopTime)//该job必须开始工作
                {
                    doit = 1;
                    beginJob.add(sleepJob.get(i));
                }
                if (doit == 0)//该job还可以延后执行
                {
                    int doTime = nowTime;//为该job在何时开始
                    int maxcost = 1000000000;
                    int maxTime = doTime;//对于给定的一个job它的最有开始时间
                    while ((doTime + sleepJob.get(i).getLastTime()) <= stopTime) //对每一个合理的时间开始JOB
                    {
                        int simulateTime = nowTime;
                        int beginTime = doTime;
                        int endTime = beginTime + sleepJob.get(i).getLastTime();
                        int simulateRemain = remain;//一次模拟期间的电池容量
                        int simulateCapacity = capacity;

                        int cost = 0;
                        while (simulateTime < stopTime)//开始模拟从nowtime一直到stopTime进行模拟
                        {
                            //System.out.println("simulateTime:"+simulateTime);

                            int endSimulateTime;
                            if ((simulateTime + timeSlice) < stopTime) {
                                endSimulateTime = simulateTime + timeSlice;
                            } else {
                                endSimulateTime = stopTime;
                            }
                            for (int j = 0; j < runJob.size(); j++) //便利每个用job
                            {
                                if (runJob.get(j).getIntTrueStopTime() <= simulateTime) {

                                } else {
                                    int runTime;
                                    if (runJob.get(j).getIntTrueStopTime() < endSimulateTime) {
                                        runTime = runJob.get(j).getIntTrueStopTime() - simulateTime;
                                    } else {
                                        runTime = endSimulateTime - simulateTime;
                                    }
                                    int runPower = runTime * runJob.get(j).getPerPower();
                                    if (runPower <= simulateRemain) {
                                        simulateRemain = simulateRemain - runPower;
                                    } else {
                                        int costPower = runPower - simulateRemain;
                                        simulateRemain = 0;
                                        cost = cost + costPower * getCharge(simulateTime);
                                    }

                                }
                            }
                            if (beginTime <= simulateTime)
                            {
                                if (endTime <= simulateTime)
                                {

                                } else {
                                    int runTime;
                                    if (endTime < endSimulateTime)
                                    {
                                        runTime = endTime - simulateTime;
                                    } else {
                                        runTime = endSimulateTime - simulateTime;
                                    }
                                    int runPower = runTime * sleepJob.get(i).getPerPower();
                                    if (runPower <= simulateRemain) {
                                        simulateRemain = simulateRemain - runPower;
                                    } else {
                                        int costPower = runPower - simulateRemain;
                                        simulateRemain = 0;
                                        cost = cost + costPower * getCharge(simulateTime);
                                    }

                                }
                            }
                            int solarPower = (endSimulateTime - simulateTime) * getSolarCharge(simulateTime);
                            if ((simulateRemain + solarPower) > simulateCapacity)
                            {
                                cost =cost - (simulateRemain + solarPower-simulateCapacity) * getSolarCharge(simulateTime);
                                simulateRemain = simulateCapacity;
                            }else{
                                simulateRemain = simulateRemain + solarPower;
                            }
                            simulateTime+= timeSlice;
                            System.out.println("simulateTime:"+simulateTime);
                        }//结束模拟阶段
                        System.out.println("job:"+sleepJob.get(i).getJobId()+"doTime:"+doTime+"cost:"+cost);
                        if (maxcost > cost )
                        {
                            maxcost = cost;
                            maxTime = doTime;
                        }
                        doTime += timeSlice;
                    }
                    if (maxTime == nowTime)
                    {
                        beginJob.add(sleepJob.get(i));
                    }
                    System.out.println("Final jobID:"+sleepJob.get(i).getJobId()+"doTime:"+maxTime+"cost"+maxcost);
                }
            }
        }
        return beginJob;
    }
}
