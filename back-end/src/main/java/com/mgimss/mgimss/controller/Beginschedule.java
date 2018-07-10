package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.businessModel.CreateUserThread;
import com.mgimss.mgimss.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Beginschedule
{
    @RequestMapping("/schedule/begin")
    public void begin() {
        User user;
        //当前用户
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        Long uid = user.getUid();
        Thread myThread1 = new CreateUserThread(uid);     // 创建一个新的线程  myThread1  此线程进入新建状态// 创建一个新的线程 myThread2 此线程进入新建状态
        myThread1.start();                     // 调用start()方法使得线程进入就绪状态         // 调用start()方法使得线程进入就绪
//		new Timer().schedule(new test(clientId1),4000);
//		new Timer().schedule(new test(clientId2),24000);
    }
}
