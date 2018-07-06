package com.mgimss.mgimss.appliance;

public interface Statistics {
    float consumption_of_period(String username, int app_id,
                                String from, String to);
}
