package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    @CrossOrigin
    @RequestMapping(path = {"/", "/index", "/home"}, method = RequestMethod.GET)
    public String root(){
        return "index";
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/main")
    public String main(){
        return "/main/main";
    }

}







