package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.utils.GetUserContext;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/** 
* OperateApplianceImpl Tester.
*
 * @author Cai Yifan
 * @since July 24, 2018
 * @version 1.0
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class OperateApplianceImplTest {
    @Autowired AppStatusRepository appStatusRepository;
    @Autowired ApplianceRepository applianceRepository;
    @Autowired UserRepository userRepository;
    @Autowired PendingJobRepository pendingJobRepository;
    @Autowired RunningJobRepository runningJobRepository;
    @Autowired FinishedJobRepository finishedJobRepository;
    @Autowired GestureRepository gestureRepository;
    @Autowired GetUserContext getUserContext;

    private Date date = new Date();
    private List<Appliance> applianceList = new ArrayList<>();
    private ArrayList<Job> jobList = new ArrayList<>();
    private GetUserContext mockGetUser;
    private ApplianceRepository mockAppRepo;
    private GestureRepository mockGestRepo;
    private RunningJobRepository mockRJobRepo;
    private PendingJobRepository mockPDJobRepo;
    private AppStatusRepository mockAppStatusRepo;
    private FinishedJobRepository mockFNJobRepo;
    private HttpServletResponse httpServletResponse;
    private OperateApplianceImpl operateAppliance = new OperateApplianceImpl();

@Before
public void before() throws Exception {
    date.setTime(0);
    // create entities
    Appliance appliance = new Appliance();
    appliance.setPower(110L);
    appliance.setMfrs("some");
    appliance.setLastSendDataTime(date);
    appliance.setRunningState(0);
    appliance.setAddDate(date);
    appliance.setAid(1L);
    appliance.setAppId(2L);
    appliance.setName("app");
    appliance.setUser(userRepository.findByUid(1L));
    applianceList.add(appliance);

    Job job = new Job();
    job.setIntTrueStopTime(60L);
    job.setIntTrueStartTime(0L);
    job.setIntStopTime(60L);
    job.setIntStartTime(0L);
    job.setAppliance(appliance);
    job.setStatus(1);
    job.setLastTime(60L);
    job.setJobId(1234L);
    job.setPerPower(100L);
    job.setUser(userRepository.findByUid(1L));
    jobList.add(job);

    mockGetUser = mock(GetUserContext.class);
    when(mockGetUser.getUser()).thenReturn(userRepository.findByUid(1L));

    mockAppRepo = mock(ApplianceRepository.class);
    when(mockAppRepo.findByUser(1L)).thenReturn(applianceList);
    when(mockAppRepo.findByUserAndAid(1L, 1L)).thenReturn(applianceList.get(0));

    mockPDJobRepo = mock(PendingJobRepository.class);
    when(mockPDJobRepo.findByAppliance(2L)).thenReturn(null);

    mockFNJobRepo = mock(FinishedJobRepository.class);
    when(mockFNJobRepo.save(jobList.get(0))).thenReturn(null);

    mockRJobRepo = mock(RunningJobRepository.class);
    when(mockRJobRepo.findByAppliance(2L)).thenReturn(jobList.get(0));

    mockAppStatusRepo = mock(AppStatusRepository.class);
    when(mockAppStatusRepo.findAvgPowerByAppliance(2L)).thenReturn(null);

    operateAppliance.getUserContext = mockGetUser;
    operateAppliance.applianceRepository = mockAppRepo;
    operateAppliance.pendingJobRepository = mockPDJobRepo;
    operateAppliance.appStatusRepository = mockAppStatusRepo;
    operateAppliance.runningJobRepository = mockRJobRepo;
    operateAppliance.finishedJobRepository = mockFNJobRepo;


} 

@After
public void after() throws Exception { 
} 

/** 
* 
* Method: post_remaining(String time, Long remaining, String uid) 
* 
*/ 
@Test
public void testNotify() throws Exception {
    assertEquals("err: no such appliance", operateAppliance.notify_status_change("0","1","1"));
    assertEquals("success", operateAppliance.notify_status_change("1","0","1"));
} 



} 
