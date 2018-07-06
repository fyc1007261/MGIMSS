import java.util.ArrayList;

public class test {
    public static void main(String[] argv)
    {
        Job job1 = new Job();
        job1.myinit(120000,100000,110000,5000,10,1);
        Job job2 = new Job();
        job2.myinit(120000,100000,110000,5000,10,2);
        Job job3 = new Job();
        job3.myinit(120000,100000,110000,5000,10,3);
        Job job4 = new Job();
        job4.myinit(120000,100000,110000,5000,10,4);
        Job job5 = new Job();
        job5.myinit(120000,100000,110000,5000,10,5);
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
        beginJob = newschedule.doschedule(runJob,sleepJob);

    }

}
