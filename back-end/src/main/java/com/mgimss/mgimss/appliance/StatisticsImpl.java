package com.mgimss.mgimss.appliance;

import org.springframework.beans.factory.annotation.Autowired;
import com.mgimss.mgimss.classes.Appliance;
import com.mgimss.mgimss.classes.ApplianceRepository;

import java.util.List;

public class StatisticsImpl implements Statistics
{
    @Autowired ApplianceRepository applianceRepository;

    public float consumption_of_period(String username, int app_id,
                                String from, String to)
    {
        List<Appliance> applianceList = applianceRepository.

        return 0;
    }
}
