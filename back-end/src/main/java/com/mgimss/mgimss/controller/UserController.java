package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public interface UserController {

    @RequestMapping("/user")
    ModelAndView getUserInfo();

    @RequestMapping("user/updateInfo")
    ModelAndView updateUserInfo(String new_username, String new_password,
                                String new_email, String new_phone,
                                String new_host, String new_port);

    @RequestMapping("/signup")
    String signUp(HttpServletRequest request, String username, String password,
                        String phone, String email, String host, String port);
}
