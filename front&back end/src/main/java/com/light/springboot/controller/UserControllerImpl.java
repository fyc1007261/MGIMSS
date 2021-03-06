package com.light.springboot.controller;



import com.light.springboot.entity.Role;
import com.light.springboot.entity.User;
import com.light.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Controller
public class UserControllerImpl implements UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    protected AuthenticationManager authenticationManager;

    public ModelAndView getUserInfo()
    {
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();

        System.out.println(user.getUid());

        ModelAndView mav = new ModelAndView("user");
        mav.addObject("user", user);
        return mav;
    }

    public ModelAndView updateUserInfo(String new_username, String new_password,
                                       String new_email, String new_phone,
                                       String new_host, String new_port)
    {
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();

        user.setUsername(new_username);
        user.setPassword(new_password);
        user.setEmail(new_email);
        user.setPhone(new_phone);
        user.setHardwareHost(new_host);
        user.setHardwarePort(new_port);

        userRepository.save(user);

        ModelAndView mav = new ModelAndView("user");
        mav.addObject("user", user);
        return mav;

    }

    public ModelAndView signUp(HttpServletRequest request, String username, String password,
                               String phone, String email, String host, String port)
    {
        //create 'user' role for this user
        Role role = new Role();
        role.setId(Long.valueOf(2));
        role.setName("ROLE_USER");
        List<Role> roles = new LinkedList<>();
        roles.add(role);

        if (host == null) host = "localhost";
        if (port == null) port = "12334";

        User new_user = new User(username, password, phone, email, host, port, roles);

        userRepository.save(new_user);

        UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(username, password);
        token.setDetails(new WebAuthenticationDetails(request));
        Authentication authenticatedUser=authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authenticatedUser);

        request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
        ModelAndView mav = new ModelAndView("app/dashboard");
        return mav;
    }

}
