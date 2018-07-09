public class Time
{
    private int year;
    private int month;
    private int day;
    private int hour;
    private int miniute;
    private int second;
    public void init()
    {
        this.day = 0;
        this.hour = 0;
        this.miniute = 0;
        this.month = 0;
        this.second = 0;
        this.year = 0;
    }
    public void setYear(int year)
    {
        this.year = year;
    }
    public int getYear()
    {
        return this.year;
    }
    public void setMonth(int month)
    {
        this.month = month;
    }
    public int getMonth()
    {
        return this.month;
    }
    public void setDay(int day)
    {
        this.day = day;
    }
    public int getDay()
    {
        return this.day;
    }
    public void setHour(int hour)
    {
        this.hour = hour;
    }
    public int getHour()
    {
        return this.hour;
    }
    public void setMiniute(int miniute)
    {
        this.miniute = miniute;
    }
    public int getMiniute()
    {
        return this.miniute;
    }
    public void setSecond(int second)
    {
        this.second = second;
    }
    public int getSecond()
    {
        return this.second;
    }
}
