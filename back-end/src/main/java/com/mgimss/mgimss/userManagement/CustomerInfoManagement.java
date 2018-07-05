package com.mgimss.mgimss.userManagement;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

public interface CustomerInfoManagement {

    @RequestMapping("/login/check_session")
    String checkSession(HttpSession httpSession);

    @RequestMapping("/login/logout")
    void logout(HttpSession httpSession);

    @RequestMapping(value = "/login/check", method = RequestMethod.POST)
    String checkLogin(String usn, String psw, HttpSession httpSession);

    @RequestMapping("/profile/getinfo")
    String getInfo(HttpSession httpSession);

    @RequestMapping("/profile/update")
    String updateProfile(HttpSession httpSession, String phone,
                         String email, String name, String address);

    @RequestMapping("/signup/process")
    String signUp(HttpSession httpSession, String username, String password,
                  String phone, String email, String address, String realname);
}
