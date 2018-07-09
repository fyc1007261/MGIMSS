package com.mgimss.mgimss.businessModel;
import java.util.ArrayList;

public class ForecastPower
{
    private Time startTime;
    private Time stopTime;
    private int intStopTime;
    private int intStartTime;
    private int interval;
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
    public void setInterval(int interval)
    {
        this.interval = interval;
    }
    public int getInterval()
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

}