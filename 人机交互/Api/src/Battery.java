public class Battery
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
