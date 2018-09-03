package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public interface UserController {

    @RequestMapping("/user")
    ModelAndView getUserInfo();

    @RequestMapping("user/updateInfo")
    ModelAndView updateUserInfo(String new_username, String new_password,
                                String new_email, String new_phone,
                                String new_host, String new_port);

    @RequestMapping("/signup")
    ModelAndView signUp(HttpServletRequest request, String username, String password,
                        String phone, String email, String host, String port);

    @RequestMapping("/user/get_user_info")
    String get_user_info();

    @RequestMapping("/user/update_user_info")
    String update_user_info(String new_email, String new_phone);

    @RequestMapping("/user/change_avatar")
    String change_avatar(String new_avatarURL);
}
