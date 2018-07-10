package com.mgimss.mgimss.businessModel;
import java.util.ArrayList;

public class ForecastPower
{
    private Time startTime;
    private Time stopTime;
    private Long intStopTime;
    private Long intStartTime;
    private Long interval;
    private ArrayList forecastList;
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
    public void setInterval(Long interval)
    {
        this.interval = interval;
    }
    public Long getInterval()
    {
        return this.interval;
    }
    public void setForecastList(ArrayList forecastList)
    {
        this.forecastList = forecastList;
    }
    public ArrayList getForecastList()
    {
        return this.forecastList;
    }
    public void setIntStartTime(Long intStartTime)
    {
        this.intStartTime = intStartTime;
    }
    public Long getIntStartTime()
    {
        return this.intStartTime;
    }
    public void setIntStopTime(Long intStopTime)
    {
        this.intStopTime = intStopTime;
    }
    public Long getIntStopTime()
    {
        return this.intStopTime;
    }

}