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
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/** 
* ShowAppInfoImpl Tester. 
* 
* @author Yifan Cai
* @since July 24, 2018
* @version 1.0 
*/

@RunWith(SpringRunner.class)
@SpringBootTest
public class ShowAppInfoImplTest {
    @Autowired
    ApplianceRepository applianceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PendingJobRepository pendingJobRepository;

    @Autowired
    RunningJobRepository runningJobRepository;

    @Autowired
    FinishedJobRepository finishedJobRepository;

    @Autowired
    GestureRepository gestureRepository;

    @Autowired
    GetUserContext getUserContext;

    private static Date date = new Date();
    private List<Appliance> applianceList = new LinkedList<Appliance>();
    private ArrayList<Job> jobList = new ArrayList<Job>();
    private GetUserContext mockGetUser;
    private ApplianceRepository mockAppRepo;
    private GestureRepository mockGestRepo;
    private RunningJobRepository mockRJobRepo;
    private PendingJobRepository mockPDJobRepo;
    private HttpServletResponse httpServletResponse;
    private ShowAppInfoImpl showAppInfo;


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
    job.setStatus(0);
    job.setLastTime(60L);
    job.setJobId(1234L);
    job.setPerPower(100L);
    job.setUser(userRepository.findByUid(1L));
    jobList.add(job);

    //mock autowired classes
    mockGetUser = mock(GetUserContext.class);
    when(mockGetUser.getUser()).thenReturn(userRepository.findByUid(1L));

    mockAppRepo = mock(ApplianceRepository.class);
    when(mockAppRepo.findByUser(1L)).thenReturn(applianceList);
    when(mockAppRepo.findByUserAndAid(1L, 1L)).thenReturn(applianceList.get(0));

    mockGestRepo = mock(GestureRepository.class);
    when(mockGestRepo.findByNameAndUid("app",1L)).thenReturn("none");

    mockPDJobRepo = mock(PendingJobRepository.class);
    when(mockPDJobRepo.findByUid(1L)).thenReturn(jobList);
    when(mockPDJobRepo.findByJobId(1234L)).thenReturn(jobList.get(0));

    mockRJobRepo = mock(RunningJobRepository.class);
    when(mockRJobRepo.findByJobId(1234L)).thenReturn(null);

    httpServletResponse = new MockHttpServletResponse();
    showAppInfo = new ShowAppInfoImpl();

    showAppInfo.getUserContext = mockGetUser;
    showAppInfo.applianceRepository = mockAppRepo;
    showAppInfo.runningJobRepository = mockRJobRepo;
    showAppInfo.pendingJobRepository = mockPDJobRepo;
    showAppInfo.gestureRepository = mockGestRepo;
} 

@After
public void after() throws Exception { 
} 

/** 
* 
* Method: get_all_status(HttpServletResponse response) 
* 
*/ 
@Test
public void testGet_all_status() throws Exception { 
//TODO: Test goes here...
    String ret = "{'data':[{'id' : '1', 'name' : 'app', 'status' : 'Inactive', 'mfrs' : 'some', 'runtime' : '0min', 'power' : '110', 'updated' : 'Thu Jan 01 08:00:00 CST 1970'}]}";
    ret = ret.replace('\'','"');

    assertEquals(ret, showAppInfo.get_all_status(httpServletResponse));
} 

/** 
* 
* Method: get_info_by_id(Long id, HttpServletResponse response) 
* 
*/ 
@Test
public void testGet_info_by_id() throws Exception { 
//TODO: Test goes here...
    String ret2 = "{'id' : '1', 'name' : 'app', 'status' : 'Inactive', 'manufacturer' : 'some', 'power' : '110', 'runtime' : '0min', 'start time' : 'Not scheduled', 'finish time' : 'Not scheduled', 'gesture' : 'none', 'updated' : 'Thu Jan 01 08:00:00 CST 1970'}";
    ret2 = ret2.replace('\'', '"');
    assertEquals(ret2, showAppInfo.get_info_by_id(1L, httpServletResponse));

} 

/** 
* 
* Method: get_jobs(HttpServletResponse response) 
* 
*/ 
@Test
public void testGet_jobs() throws Exception { 
//TODO: Test goes here...
    String ret3 = "{\"data\":[{\"id\" : \"1234\", \"status\" : \"Pending\", \"duration\" : \"1\", \"app_id\" : \"1\", \"app_name\" : \"app\"}]}";
    assertEquals(ret3, showAppInfo.get_jobs(httpServletResponse));
} 

/** 
* 
* Method: get_job_by_id(Long id, HttpServletResponse response) 
* 
*/ 
@Test
public void testGet_job_by_id() throws Exception { 
//TODO: Test goes here...
    String ret4 = "{\"id\" : \"1234\", \"Appliance\" : \"app\", \"Status\" : \"Pending\", \"Start after\" : \"Null\", \"Finish by\" : \"1970-01-01T08:01:00\", \"Duration\" : \"1\", \"Scheduled at\" : \"Null\", \"Power\" : \"100\"}";
    assertEquals(ret4, showAppInfo.get_job_by_id(1234L, httpServletResponse));

} 


} 
