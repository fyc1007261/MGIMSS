public class Job
{
    private Time startTime;
    private Time stopTime;
    private int intStopTime;
    private int intStartTime;
    private int intTrueStopTime;
    private int lastTime;
    private int perPower;
    private int jobId;
    public void setStartTime(Time startTime)
    {
        this.startTime = startTime;
    }
    public Time getStartTime()
    {
        return this.startTime;
    }

    public void setStopTime(Time stopTime)
    {
        this.stopTime = stopTime;
    }
    public Time getStopTime()
    {
        return this.stopTime;
    }

    public void setPerPower(int perPower)
    {
        this.perPower = perPower;
    }
    public int getPerPower()
    {
        return this.perPower;
    }
    public void setJobId(int jobId)
    {
        this.jobId = jobId;
    }
    public int getJobId()
    {
        return this.jobId;
    }
    public void setIntStartTime(int intStartTime)
    {
        this.intStartTime = intStartTime;
    }
    public int getIntStartTime()
    {
        return this.intStartTime;
    }
    public void setIntStopTime(int intStopTime)
    {
        this.intStopTime = intStopTime;
    }
    public int getIntStopTime()
    {
        return this.intStopTime;
    }
    public void setIntTrueStopTime(int intTrueStopTime)
    {
        this.intTrueStopTime = intTrueStopTime;
    }
    public int getIntTrueStopTime()
    {
        return this.intTrueStopTime;
    }
    public void setLastTime(int lastTime)
    {
        this.lastTime = lastTime;
    }
    public int getLastTime()
    {
        return this.lastTime;
    }
    public void myinit(  int intStopTime, int intStartTime, int intTrueStopTime, int lastTime, int perPower, int jobId)
    {
        setIntStartTime(intStartTime);
        setIntStopTime(intStopTime);
        setIntTrueStopTime(intTrueStopTime);
        setJobId(jobId);
        setLastTime(lastTime);
        setPerPower(perPower);
        System.out.println("jobId:"+jobId);
    }
}
