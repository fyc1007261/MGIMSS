package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.controller.PowerUseController;
import com.mgimss.mgimss.controller.PowerUseControllerImpl;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After;

import com.mgimss.mgimss.entity.AppStatus;
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
* PowerUseControllerImpl Tester. 
* 
* @author <Authors name> 
* @since <pre>���� 6, 2018</pre> 
* @version 1.0 
*/
@RunWith(SpringRunner.class)
@SpringBootTest
public class PowerUseControllerImplTest {

    PowerUseControllerImpl powerUseController = new PowerUseControllerImpl();
    @Autowired GetUserContext getUserContext;
    @Autowired UserRepository userRepository;
    @Autowired DailyRepository dailyRepository;

    private GetUserContext mockGetUser;


@Before
public void before() throws Exception {

    mockGetUser = mock(GetUserContext.class);
    when(mockGetUser.getUser()).thenReturn(userRepository.findByUid(1L));

    powerUseController.getUserContext = mockGetUser;
    powerUseController.dailyRepository = dailyRepository;
} 

@After
public void after() throws Exception { 
} 

/** 
* 
* Method: getDailyPowerUse() 
* 
*/ 
@Test
public void testGetDailyPowerUse() throws Exception { 
//TODO: Test goes here...

    String ret = powerUseController.getDailyAppsPowerUse("1971-01-01");
    assertEquals(ret, "{\"power\":[]}");
} 

/** 
* 
* Method: getMonthlyPowerUse() 
* 
*/ 
@Test
public void testGetMonthlyPowerUse() throws Exception { 
//TODO: Test goes here...
    String ret = powerUseController.getMonthlyPowerUse();
    assertEquals(ret.charAt(0), '{');
} 

/** 
* 
* Method: getDailyAppsPowerUse(String date) 
* 
*/ 
@Test
public void testGetDailyAppsPowerUse() throws Exception { 
//TODO: Test goes here...
    String ret = powerUseController.getDailyAppsPowerUse("1970-01-01");
    assertEquals(ret, "{\"power\":[]}");
} 

/** 
* 
* Method: getMonthlyAppsPowerUse(String month) 
* 
*/ 
@Test
public void testGetMonthlyAppsPowerUse() throws Exception { 
//TODO: Test goes here...
    String ret = powerUseController.getMonthlyAppsPowerUse("1970-01");
    assertEquals(ret, "{\"power\":[]}");
} 

/** 
* 
* Method: getHighestPowerUse() 
* 
*/ 
@Test
public void testGetHighestPowerUse() throws Exception { 
//TODO: Test goes here... 
} 


/** 
* 
* Method: getMax(Map<String, Long> map) 
* 
*/ 
@Test
public void testGetMax() throws Exception { 
//TODO: Test goes here... 
/* 
try { 
   Method method = PowerUseControllerImpl.getClass().getMethod("getMax", Map<String,.class); 
   method.setAccessible(true); 
   method.invoke(<Object>, <Parameters>); 
} catch(NoSuchMethodException e) { 
} catch(IllegalAccessException e) { 
} catch(InvocationTargetException e) { 
} 
*/ 
} 

} 
