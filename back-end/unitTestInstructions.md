## How to write unit test with Junit and Mockito



#### 1. Before initializing.

 -  Autowired repositories might be null during the test, which causes exceptions. Make them public so that we can set them during the tests.

 -  Replace the following code 

    ```java
    SecurityContext ctx = SecurityContextHolder.getContext();
    Authentication auth = ctx.getAuthentication();
    user = (User) auth.getPrincipal();
    ```

    with

    ```java
    @Autowired GetUserContext getUserContext;
    user = getUserContext.getUser();
    ```

    ​

#### 2. Initialize the test code.

 -   Move your mouse onto the name of the class to be tested in the main text editor (not the left category), right click-> generate-> Junit test-> Junit 4

 -   The skeleton of the test code is now automatically generated, but not in the proper place. Move it into the right folder.

 -   The code may not work correctly. Add annotations in front of the test class.

     `@RunWith(SpringRunner.class)	@SpringBootTest`

-  Add useful autowired repositories to the test class

#### 3. Mock repositories and their interfaces.

- Mock `GetUserContext` and other autowired repositories using 

  ```java
  mockGetUser = mock(GetUserContext.class);
  mockAppRepo = mock(ApplianceRepository.class)
  // etc.
  ```

  - The mock repositories implement nothing. 

  - Find all the methods used by the repositories in the origin class.

  - Generate "fake" data

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

  -  Generate "fake" methods

     ```java
     when(mockAppRepo.findByUser(1L)).thenReturn(applianceList);
     when(mockAppRepo.findByUserAndAid(1L, 1L)).thenReturn(applianceList.get(0));

     when(mockGetUser.getUser()).thenReturn(userRepository.findByUid(1L));
     // etc.
     ```

- Use mocked classes and methods to replace the original ones during the test

  ```java
  private OperateApplianceImpl operateAppliance = new OperateApplianceImpl();
  operateAppliance.getUserContext = mockGetUser;
  operateAppliance.applianceRepository = mockAppRepo;	
  // etc.
  ```

#### 4.  Compare the expected results and actual ones.

```java
assertEquals("success", operateAppliance.notify_status_change("1","0","1"));
```