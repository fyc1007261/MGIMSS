package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    @RequestMapping("/welcome.html")
    public String jump1() {
        return "welcome.html";
    }
    @RequestMapping("/login")
    public String login(){
        return "login.html";
    }
    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String jump2() {
        return "index.html";
    }
    @RequestMapping(value = "/main/{any}", method = RequestMethod.GET)
    public String jump3(@PathVariable(value = "any") String any) {
        return "index.html";
    }
    @RequestMapping(value = "/main/{any1}/{any2}", method = RequestMethod.GET)
    public String jump4(@PathVariable(value = "any1") String any1, @PathVariable(value = "any2") String any2) {
        return "index.html";
    }

}







