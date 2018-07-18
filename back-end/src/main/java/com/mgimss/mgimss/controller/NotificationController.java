package com.mgimss.mgimss.controller;

import io.goeasy.GoEasy;

public class NotificationController {
    public void notification(String message) {
        String appkey = "BC-8971f5f4ebf54ff68393f862c68bf2fc";
        GoEasy goEasy = new GoEasy("rest-hangzhou.goeasy.io",appkey);
        goEasy.publish("MGIMSS", message);
    }
}

//Demo
//
//import com.mgimss.mgimss.controller.NotificationController;
//
//
//NotificationController notificationController = new NotificationController();
//notificationController.notification("Hello world");