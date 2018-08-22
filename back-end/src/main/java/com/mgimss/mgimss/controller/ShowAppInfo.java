package com.mgimss.mgimss.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public interface ShowAppInfo {
    @RequestMapping("/appliance/get_all_status")
    String get_all_status(HttpServletResponse response);

    @RequestMapping("/appliance/get_info_by_id")
    String get_info_by_id(Long id, HttpServletResponse response);

    @RequestMapping("/schedule/get_jobs")
    String get_jobs(HttpServletResponse response);

    @RequestMapping("/schedule/get_job_by_id")
    String get_job_by_id(Long id, HttpServletResponse response);

    @RequestMapping("/schedule/get_jobs1_by_id")
    String get_jobs1_by_id(Long id);

    @RequestMapping("/schedule/get_jobs2_by_id")
    String get_jobs2_by_id(Long id);
}
