package com.mgimss.mgimss;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Hello{
    @RequestMapping("/")
    String hello(){
        return "Hello world.!.";
    }
}