package com.mgimss.mgimss.controller;



import com.mgimss.mgimss.entity.Role;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.ApplianceRepository;
import com.mgimss.mgimss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.mgimss.mgimss.utils.GetUserContext;
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

@RestController
public class UserControllerImpl implements UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    protected AuthenticationManager authenticationManager;

    @Autowired
    private ApplianceRepository applianceRepository;

    @Autowired
    public GetUserContext getUserContext;

    public ModelAndView signUp(HttpServletRequest request, String username, String password,
                               String phone, String email, String host, String port)
    {
        //create 'user' role for this user
        Role role = new Role();
        role.setId(Long.valueOf(2));
        role.setName("ROLE_USER");
        List<Role> roles = new LinkedList<>();
        roles.add(role);
        String defaultURL = "https://res.cloudinary.com/breezeeee/image/upload/v1535940487/mgimss/Avatar/orcueeusckscoymqyiyj.png";

        if (host == null) host = "localhost";
        if (port == null) port = "12334";

        User new_user = new User(username, password, email, phone, host, port, defaultURL, roles);

        userRepository.save(new_user);

        UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(username, password);
        token.setDetails(new WebAuthenticationDetails(request));
        Authentication authenticatedUser=authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authenticatedUser);

        request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

        return  new ModelAndView("redirect:/main/user");
    }

    public String get_user_info() {

        User user = getUserContext.getUser();

        Long app_num = applianceRepository.findNumByUser(user.getUid());

        StringBuffer buf = new StringBuffer();
        buf.append(
                "{\"username\":\"" + user.getUsername() +
                        "\",\"email\":\"" + user.getEmail() +
                        "\",\"phone\":\"" + user.getPhone() +
                        "\",\"num\":" + app_num +
                        ",\"avatarURL\":\"" + user.getAvatarURL() +
                        "\"}");

        System.out.println(buf.toString());
        return buf.toString();
    }

    public String update_user_info(String new_email, String new_phone) {
        User user = getUserContext.getUser();

        user.setEmail(new_email);
        user.setPhone(new_phone);
        userRepository.save(user);

        return "success";

    }

    public String change_avatar(String new_avatarURL) {
        User user = getUserContext.getUser();

        user.setAvatarURL(new_avatarURL);
        userRepository.save(user);

        return "success";
    }
}
