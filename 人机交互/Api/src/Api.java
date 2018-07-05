import java.util.ArrayList;

public class Api {

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
    public class job
    {
        private Time startTime;
        private Time stopTime;
        private int intStopTime;
        private int intStartTime;
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
    }

    public class battery
    {
        private int capacity;
        private int remain;
        private int maxOutputPower;
        public void setCapacity(int capacity)
        {
            this.capacity = capacity;
        }
        public int getCapacity()
        {
            return this.capacity;
        }
        public void setRemain(int remain)
        {
            this.remain = remain;
        }
        public int getRemain()
        {
            return this.remain;
        }
        public void setMaxOutputPower(int maxOutputPower)
        {
            this.maxOutputPower = maxOutputPower;
        }
        public int getMaxOutputPower()
        {
            return this.maxOutputPower;
        }
    }

    public class forecastPower
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

}
