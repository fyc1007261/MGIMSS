package com.mgimss.mgimss.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface ShowAppInfo {
    @RequestMapping("/appliance/get_all_status")
    String get_all_status();

    @RequestMapping("/appliance/get_info_by_id")
    String get_info_by_id(Long id);

    @RequestMapping("/schedule/get_jobs")
    String get_jobs();

    @RequestMapping("/schedule/get_job_by_id")
    String get_job_by_id(Long id);
}
