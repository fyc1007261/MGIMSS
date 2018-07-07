package com.light.springboot.utils;

import com.light.springboot.entity.Appliance;

import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;

public class AidCreator {
    public static Long getNewAid(Set<Appliance> apps){
        Long max_aid = Long.valueOf(-1);
        Iterator<Appliance> linkedIt = apps.iterator();
        while(linkedIt.hasNext()) {
            max_aid = Math.max(max_aid, (linkedIt.next()).getAid());
        }
        max_aid++;
        return max_aid;
    }
}
