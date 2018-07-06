package com.mgimss.mgimss.appliance;

import com.mgimss.mgimss.classes.Appliance;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplianceProcessingTests {
    @Autowired
    private ApplianceProcessing applianceProcessing;

    @Test
    public void contextLoads(){
        List<Appliance> list = applianceProcessing.get_latest_status("admin");
        Assert.assertEquals(6, list.size());
        Assert.assertEquals("jiangfanxu", list.get(0).getName());
    }
}
