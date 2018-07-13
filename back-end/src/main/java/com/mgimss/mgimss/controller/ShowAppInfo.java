package com.mgimss.mgimss.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface ShowAppInfo {
    @RequestMapping("/appliance/get_all_status")
    String get_all_status();

    @RequestMapping("/appliance/get_info_by_id")
    String get_info_by_id(Long id);
}
