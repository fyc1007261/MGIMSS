package com.mgimss.mgimss.businessModel;
import com.mgimss.mgimss.entity.Battery;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.SolarPower;
import com.mgimss.mgimss.repository.PendingJobRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Schedule {

    private Long[] solarPredictData;
    private Long cloud = 10L;
    private Long nTime;
    private Long ntimeSlice;
    public Long getTime()
    {
        nTime = new Date().getTime()/1000;
        return new Date().getTime()/1000;
    }
    public Long getCharge(Long time)
    {
        Date date = new Date(time*1000);
        int hour = date.getHours();
        //System.out.println("hour:"+hour);
        if (hour<8)
            return Long.valueOf(10);
        else if(hour <16)
            return Long.valueOf(20);
        else
            return Long.valueOf(10);
    }
    public Long getSolarCharge(Long time)
    {
        Long divTime = time - nTime/ntimeSlice*ntimeSlice;
        long i = (divTime / ntimeSlice);
        int j = (int) i;
        if (j>=20)
        {
            j = 19;
        }
        Long charge = solarPredictData[j] * cloud / 10;
        if (charge < 0L)
            charge = 0L;
        return charge/60;
    }
    public Long getSolarBackCharge(Long time)
    {
        return Long.valueOf(5);
    }

    public ArrayList<Job> doschedule(List<Job> runJob, List<Job> pendJob, Battery battery, Long[] predictData,PendingJobRepository pendingJobRepository) {
        System.out.println("schedule begin");
        solarPredictData = predictData;

        Long nowTime = getTime();
        //---------------------//////////////////////////////////////


        Long capacity = battery.getCapacity();
        Long remain = battery.getRemain();
        Long timeSlice = 100L;
        ntimeSlice = 3600L;
        ArrayList<Job> beginJob = new ArrayList();
        for (int i = 0; i < pendJob.size(); i++) //对每一个 pendJob做预测
        {

            Long doit = Long.valueOf(0);
            System.out.println("appliance Id:"+pendJob.get(i).getAppliance().getAid());
            Long startTime = pendJob.get(i).getIntStartTime();
            Long stopTime = pendJob.get(i).getIntStopTime();
            if (nowTime >= startTime)//该job可以开始
            {
                if ((nowTime + pendJob.get(i).getLastTime() + timeSlice) > stopTime)//该job必须开始工作
                {
                    doit = Long.valueOf(1);
                    beginJob.add(pendJob.get(i));
                    Job job = pendingJobRepository.findByAppliance(pendJob.get(i).getAppliance().getAppId());
                    job.setIntTrueStartTime(nowTime);
                    job.setIntTrueStopTime(nowTime+pendJob.get(i).getLastTime());
                    pendingJobRepository.save(job);
                }
                if (doit == Long.valueOf(0))//该job还可以延后执行
                {
                    Long doTime = nowTime;//为该job在何时开始
                    Long maxcost = Long.MAX_VALUE;
                    Long maxTime = doTime;//对于给定的一个job它的最有开始时间
                    ArrayList<Long> simulation1data = new ArrayList();
                    ArrayList<Long> simulation2data = new ArrayList();
                    while ((doTime + pendJob.get(i).getLastTime()) <= stopTime) //对每一个合理的时间开始JOB
                    {
                        Long simulateTime = nowTime;
                        Long beginTime = doTime;
                        Long endTime = beginTime + pendJob.get(i).getLastTime();
                        Long simulateRemain = remain;//一次模拟期间的电池容量
                        Long simulateCapacity = capacity;

                        Long cost = Long.valueOf(0);
                        ArrayList<Long> showdata1 = new ArrayList();
                        while (simulateTime < stopTime)//开始模拟从nowtime一直到stopTime进行模拟
                        {
                            //System.out.println("simulateTime:"+simulateTime);

                            Long endSimulateTime;
                            if ((simulateTime + timeSlice) < stopTime) {
                                endSimulateTime = simulateTime + timeSlice;
                            } else {
                                endSimulateTime = stopTime;
                            }
                            Long solarPower;
                            if ((endSimulateTime/ntimeSlice) == (simulateTime/ntimeSlice)) {
                                solarPower = (endSimulateTime - simulateTime) * getSolarCharge(simulateTime);
                            }
                            else
                            {
                                solarPower = (endSimulateTime - endSimulateTime/ntimeSlice*ntimeSlice)*getSolarCharge(endSimulateTime) +
                                        (endSimulateTime/ntimeSlice*ntimeSlice - simulateTime)*getSolarCharge(simulateTime);
                            }
                            //--------------------------------------------
                            if ((simulateRemain + solarPower) > simulateCapacity)
                            {
                                cost =cost - (simulateRemain + solarPower-simulateCapacity) * getSolarBackCharge(simulateTime);
                                simulateRemain = simulateCapacity;
                            }else{
                                simulateRemain = simulateRemain + solarPower;
                            }
                            //==================================================
                            for (int j = 0; j < runJob.size(); j++) //便利每个用job
                            {
                                if (runJob.get(j).getIntTrueStopTime() <= simulateTime) {

                                } else {
                                    Long runTime;
                                    if (runJob.get(j).getIntTrueStopTime() < endSimulateTime) {
                                        runTime = runJob.get(j).getIntTrueStopTime() - simulateTime;
                                    } else {
                                        runTime = endSimulateTime - simulateTime;
                                    }
                                    Long runPower = runTime * runJob.get(j).getPerPower();
                                    if (runPower <= simulateRemain) {
                                        simulateRemain = simulateRemain - runPower;
                                    } else {
                                        Long costPower = runPower - simulateRemain;
                                        simulateRemain = Long.valueOf(0);
                                        cost = cost + costPower * getCharge(simulateTime);
                                    }

                                }
                            }



                            for (int jj = 0; jj < i; jj++) //便利每个用job
                            {
                                if(pendJob.get(jj).getIntTrueStartTime() <= simulateTime)
                                {
                                    if (pendJob.get(jj).getIntTrueStopTime() <= simulateTime) {

                                    } else {
                                        Long runTime;
                                        if (pendJob.get(jj).getIntTrueStopTime() < endSimulateTime) {
                                            runTime = pendJob.get(jj).getIntTrueStopTime() - simulateTime;
                                        } else {
                                            runTime = endSimulateTime - simulateTime;
                                        }
                                        Long runPower = runTime * pendJob.get(jj).getPerPower();
                                        if (runPower <= simulateRemain) {
                                            simulateRemain = simulateRemain - runPower;
                                        } else {
                                            Long costPower = runPower - simulateRemain;
                                            simulateRemain = Long.valueOf(0);
                                            cost = cost + costPower * getCharge(simulateTime);
                                        }

                                    }
                                }
                            }



                            if (beginTime <= simulateTime)
                            {
                                if (endTime <= simulateTime)
                                {

                                } else {
                                    Long runTime;
                                    if (endTime < endSimulateTime)
                                    {
                                        runTime = endTime - simulateTime;
                                    } else {
                                        runTime = endSimulateTime - simulateTime;
                                    }
                                    Long runPower = runTime * pendJob.get(i).getPerPower();
                                    if (runPower <= simulateRemain) {
                                        simulateRemain = simulateRemain - runPower;
                                    } else {
                                        Long costPower = runPower - simulateRemain;
                                        simulateRemain = Long.valueOf(0);
                                        cost = cost + costPower * getCharge(simulateTime);
                                    }

                                }
                            }
                            showdata1.add(cost / 10000);
                            simulateTime+= timeSlice;
                            //System.out.println("simulateTime:"+simulateTime);
                        }//结束模拟阶段
                        System.out.println("applianceId:"+pendJob.get(i).getAppliance().getAid()+"doTime:"+doTime+"cost:"+cost);
                        if ((maxcost > cost) && ((doTime + pendJob.get(i).getLastTime()+timeSlice) <= stopTime))
                        {
                            maxcost = cost;
                            maxTime = doTime;
                            simulation2data = showdata1;
                        }
                        if (doTime == nowTime)
                        {
                            simulation1data = showdata1;
                        }
                        doTime += timeSlice;
                    }
                    Job job = pendingJobRepository.findByAppliance(pendJob.get(i).getAppliance().getAppId());
                    job.setIntTrueStartTime(maxTime);
                    job.setIntTrueStopTime(maxTime+pendJob.get(i).getLastTime());
                    job.setSimulatio1data(simulation1data.toString());
                    job.setSimulatio2data(simulation2data.toString());
                    pendingJobRepository.save(job);
                    if (maxTime == nowTime)
                    {
                        beginJob.add(pendJob.get(i));
                    }
                    System.out.println("Final applianceID:"+pendJob.get(i).getAppliance().getAid()+"doTime:"+maxTime+"cost"+maxcost);
                }
            }
            else
            {
                if (doit == Long.valueOf(0))//该job还可以延后执行
                {
                    Long tmod = nowTime % timeSlice;

                    Long doTime = (startTime/timeSlice*timeSlice)+timeSlice+tmod;//为该job在何时开始
                    Long maxcost = Long.MAX_VALUE;
                    Long maxTime = doTime;//对于给定的一个job它的最有开始时间
                    ArrayList<Long> simulation1data = new ArrayList();
                    ArrayList<Long> simulation2data = new ArrayList();
                    while ((doTime + pendJob.get(i).getLastTime()) <= stopTime) //对每一个合理的时间开始JOB
                    {
                        Long simulateTime = nowTime;
                        Long beginTime = doTime;
                        Long endTime = beginTime + pendJob.get(i).getLastTime();
                        Long simulateRemain = remain;//一次模拟期间的电池容量
                        Long simulateCapacity = capacity;

                        Long cost = Long.valueOf(0);
                        ArrayList<Long> showdata1 = new ArrayList();

                        while (simulateTime < stopTime)//开始模拟从nowtime一直到stopTime进行模拟
                        {
                            //System.out.println("simulateTime:"+simulateTime);

                            Long endSimulateTime;
                            if ((simulateTime + timeSlice) < stopTime) {
                                endSimulateTime = simulateTime + timeSlice;
                            } else {
                                endSimulateTime = stopTime;
                            }
                            Long solarPower;
                            if ((endSimulateTime/ntimeSlice) == (simulateTime/ntimeSlice)) {
                                solarPower = (endSimulateTime - simulateTime) * getSolarCharge(simulateTime);
                            }
                            else
                            {
                                solarPower = (endSimulateTime - endSimulateTime/ntimeSlice*ntimeSlice)*getSolarCharge(endSimulateTime) +
                                        (endSimulateTime/ntimeSlice*ntimeSlice - simulateTime)*getSolarCharge(simulateTime);
                            }
                            //--------------------------------------------
                            if ((simulateRemain + solarPower) > simulateCapacity)
                            {
                                cost =cost - (simulateRemain + solarPower-simulateCapacity) * getSolarBackCharge(simulateTime);
                                simulateRemain = simulateCapacity;
                            }else{
                                simulateRemain = simulateRemain + solarPower;
                            }
                            //==================================================
                            for (int j = 0; j < runJob.size(); j++) //便利每个用job
                            {
                                if (runJob.get(j).getIntTrueStopTime() <= simulateTime) {

                                } else {
                                    Long runTime;
                                    if (runJob.get(j).getIntTrueStopTime() < endSimulateTime) {
                                        runTime = runJob.get(j).getIntTrueStopTime() - simulateTime;
                                    } else {
                                        runTime = endSimulateTime - simulateTime;
                                    }
                                    Long runPower = runTime * runJob.get(j).getPerPower();
                                    if (runPower <= simulateRemain) {
                                        simulateRemain = simulateRemain - runPower;
                                    } else {
                                        Long costPower = runPower - simulateRemain;
                                        simulateRemain = Long.valueOf(0);
                                        cost = cost + costPower * getCharge(simulateTime);
                                    }

                                }
                            }
                            Long status1 = 0L;
                            Long status2 = 0L;
                            Long status3 = 0L;
                            Long status4 = 0L;
                            for (int jj = 0; jj < i; jj++) //便利每个用job
                            {
                                //System.out.println("lllllllllllllllllllllllllllllllllllll");
                                status1 = pendJob.get(jj).getIntTrueStartTime();
                                status2 = simulateTime;
                                if(pendJob.get(jj).getIntTrueStartTime() <= simulateTime)
                                {
                                    status3 = pendJob.get(jj).getIntTrueStopTime();
                                    status4 = simulateTime;
                                    if (pendJob.get(jj).getIntTrueStopTime() <= simulateTime) {

                                    } else {
                                        Long runTime;
                                        if (pendJob.get(jj).getIntTrueStopTime() < endSimulateTime) {
                                            runTime = pendJob.get(jj).getIntTrueStopTime() - simulateTime;
                                        } else {
                                            runTime = endSimulateTime - simulateTime;
                                        }
                                        Long runPower = runTime * pendJob.get(jj).getPerPower();
                                        if (runPower <= simulateRemain) {
                                            simulateRemain = simulateRemain - runPower;
                                        } else {
                                            Long costPower = runPower - simulateRemain;
                                            simulateRemain = Long.valueOf(0);
                                            cost = cost + costPower * getCharge(simulateTime);
                                        }

                                    }
                                }
                            }
                            if (beginTime <= simulateTime)
                            {
                                if (endTime <= simulateTime)
                                {

                                } else {
                                    Long runTime;
                                    if (endTime < endSimulateTime)
                                    {
                                        runTime = endTime - simulateTime;
                                    } else {
                                        runTime = endSimulateTime - simulateTime;
                                    }
                                    Long runPower = runTime * pendJob.get(i).getPerPower();
                                    if (runPower <= simulateRemain) {
                                        simulateRemain = simulateRemain - runPower;
                                    } else {
                                        Long costPower = runPower - simulateRemain;
                                        System.out.println("cost: "+costPower+"runPower:"+runPower+"simulateRemain:"+simulateRemain+"status1:"+status1+"status2:"+status2+"status3:"+status3);
                                        simulateRemain = Long.valueOf(0);
                                        cost = cost + costPower * getCharge(simulateTime);
                                    }

                                }
                            }
                            showdata1.add(cost / 10000);
                            simulateTime+= timeSlice;
                            //System.out.println("simulateTime:"+simulateTime);
                        }//结束模拟阶段
                        Date date5 = new Date(doTime*1000);
                        System.out.println(date5.toString());
                        System.out.println(getSolarCharge(doTime));
                        System.out.println("applianceId:"+pendJob.get(i).getAppliance().getAid()+"doTime:"+doTime+"cost:"+cost);
                        if ((maxcost > cost) && ((doTime + pendJob.get(i).getLastTime()+timeSlice) <= stopTime))
                        {
                            System.out.println("MAXTIME:"+maxcost+"cost"+cost);
                            maxcost = cost;
                            maxTime = doTime;
                            simulation2data = showdata1;
                        }
                        if (doTime == (startTime/timeSlice*timeSlice)+timeSlice+tmod)
                        {
                            simulation1data = showdata1;
                        }
                        doTime += timeSlice;
                    }
                    Job job = pendingJobRepository.findByAppliance(pendJob.get(i).getAppliance().getAppId());
                    job.setIntTrueStartTime(maxTime);
                    job.setIntTrueStopTime(maxTime+pendJob.get(i).getLastTime());
                    job.setSimulatio1data(simulation1data.toString());
                    job.setSimulatio2data(simulation2data.toString());
                    pendingJobRepository.save(job);
                    Date date6 = new Date(maxTime*1000);
                    System.out.println(date6.toString());
                    System.out.println("Final applianceID:"+pendJob.get(i).getAppliance().getAid()+"doTime:"+maxTime+"cost"+maxcost);
                }
            }
        }
        return beginJob;
    }
}
