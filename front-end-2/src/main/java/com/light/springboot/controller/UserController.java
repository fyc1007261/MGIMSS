package com.light.springboot.controller;

import com.light.springboot.entity.*;
import com.light.springboot.repository.*;
import com.light.springboot.utils.Base64;
import com.light.springboot.utils.Readfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import java.io.PrintWriter;
import java.util.*;


@Controller
public class UserController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookOrderRepository orderRepository;

    @Autowired
    private BookOrderItemRepository itemRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    protected AuthenticationManager authenticationManager;

    @RequestMapping("/user")
    public ModelAndView user(){

        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();

        System.out.println(user.getId());

        Optional<Image> i = imageRepository.findById(user.getId());
        Image img = null;

        if (i.isPresent()){
            img = i.get();
        }


        ModelAndView mav = new ModelAndView("user");
        mav.addObject("user", user);
        mav.addObject("image", img);
        mav.addObject("message", null);
        mav.addObject("orders", null);
        return mav;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ModelAndView signUp(HttpServletRequest request ){

        String new_name = request.getParameter("username");
        String new_email = request.getParameter("email");
        String new_password = request.getParameter("password");

        User user = userRepository.findByUsername(new_name);
        if (user != null){
            ModelAndView mav = new ModelAndView("signup");
            mav.addObject("result", "Username already used!");
            return mav;
        }

        User new_user = new User();

        new_user.setUsername(new_name);
        new_user.setPassword(new_password);
        new_user.setEmail(new_email);
        Role role = new Role();
        role.setId(Long.valueOf(2));
        role.setName("ROLE_USER");
        List<Role> roles = new LinkedList<>();
        roles.add(role);
        new_user.setRoles(roles);

        userRepository.save(new_user);

        Long new_id = userRepository.findByUsername(new_name).getId();
        new_user.setId(new_id);
        System.out.println("id:" + new_user.getId());

        String base64 = Base64.GetImageStr("E:/课程相关文件/Grade 2-2/软工经济学/java projects/我能跑起来/src/main/resources/static/image/users/default.png");
        System.out.println("64: " + base64);


        String imgPath = new_id + "_image";

        Base64.GenerateImage(base64, "E:/课程相关文件/Grade 2-2/软工经济学/java projects/我能跑起来/src/main/resources/static/image/users/"+imgPath+".png");

        base64 = "data:image/png;base64,"+base64;
        Image img = new Image(new_id, base64);
        imageRepository.save(img);

        UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(new_name,new_password);
        token.setDetails(new WebAuthenticationDetails(request));
        Authentication authenticatedUser=authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
        request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

        ModelAndView mav = new ModelAndView("user");
        mav.addObject("user", new_user);
        mav.addObject("image", img);
        mav.addObject("message", null);
        mav.addObject("orders", null);

        return mav;
    }


    @RequestMapping("/cart")
    @ResponseBody
    public ModelAndView showcart(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        Map<Long, Long> cart = (Map<Long, Long>) session.getAttribute("cart");

        Map<Book, Long> items=new LinkedHashMap<>();
        Optional<Book> b;
        Long id;
        Long count;
        Boolean shownone = false;

        if (cart==null)
            shownone = true;
        else if(cart.size() == 0)
            shownone = true;
        if(shownone){
            ModelAndView mav = new ModelAndView("cart");
            mav.addObject("messages", "Add books RIGHT NOW!");
            mav.addObject("items", null);
            mav.addObject("order", null);
            return mav;
        }
        for (Map.Entry<Long, Long> entry: cart.entrySet()){
            id = entry.getKey();

            count = entry.getValue();
            b = bookRepository.findById(id);
            if (b.isPresent()){
                items.put(b.get(), count);
                System.out.println("cart--"+id+":"+count);
            }
        }
        ModelAndView mav = new ModelAndView("cart");
        mav.addObject("messages", null);
        mav.addObject("items", items);
        mav.addObject("order", null);
        return mav;
    }

    @RequestMapping("cart/order")
    @ResponseBody
    public ModelAndView order(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        Map<Long, Long> cart = (Map<Long, Long>) session.getAttribute("cart");
        Map<Long, Long> left_cart = new HashMap<>(cart);
        Map<Map<String, List<Long>>, Long> order = new HashMap<>();


        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();

        Long uid = user.getId();

        System.out.println("uid: "+uid);

        Optional<Book> b;
        Book book;
        Long id, count, btprice, oid;
        Long tprice = Long.valueOf(0);
        Long old_stock;
        String title;
        List<Long> cplist;
        BookOrderItem item;
        Date date = new Date();
        String deliver_status = "Not Delivered";
        String addr = "Dreamland";
        Set<BookOrderItem> items;

        Map<String, List<Long>> binfo = new HashMap<>();
        Set<BookOrder> userOrders = user.getOrders();

        BookOrder bookOrder = new BookOrder();
        bookOrder.setDate(date);
        bookOrder.setAddr(addr);
        bookOrder.setDeliver_status(deliver_status);

        bookOrder.setUid(uid);


        orderRepository.save(bookOrder);

        List<BookOrder> o  = orderRepository.findByUid(uid);

        oid = Long.valueOf(-1);
        Long newid;

        for (int i = 0; i<o.size();i++){
            newid = o.get(i).getOid();
            oid = (oid > newid)? oid : newid;
        }

        bookOrder.setOid(oid);


        Boolean shownone = false;

        if (cart==null)
            shownone = true;
        else if(cart.size() == 0)
            shownone = true;
        if(shownone){
            ModelAndView mav = new ModelAndView("cart");
            mav.addObject("messages", "Add books RIGHT NOW!");
            mav.addObject("items", null);
            mav.addObject("order", null);
            return mav;
        }
        for(Map.Entry<Long, Long> entry: cart.entrySet()){

            /*id means the book's id*/
            id = entry.getKey();
            count = entry.getValue();
            b = bookRepository.findById(id);
            if (b.isPresent()){
                book = b.get();

                if (book.getStock() < count){
                    continue;
                }
                left_cart.remove(id);

                System.out.println("here");

                item = new BookOrderItem();
                item.setBook(book);
                item.setCount(count);
                item.setOrder(bookOrder);

                itemRepository.save(item);

                items = bookOrder.getItems();
                if (items == null)
                    items = new LinkedHashSet<>();
                items.add(item);
                bookOrder.setItems(items);

                title = book.getTitle();
                btprice = count * (book.getPrice());
                tprice += btprice;
                cplist = new LinkedList<>();
                cplist.add(count);
                cplist.add(btprice);

                old_stock = book.getStock();
                binfo.put(title, cplist);
                book.setStock(old_stock - count);
                bookRepository.save(book);



                System.out.println("o-c: "+(old_stock - count)+"in book: "+ book.getStock());
                System.out.println("order success++"+id+":"+title+", btprice: "+btprice+" count: "+count);

            }
        }

        bookOrder.setTotal_proice(tprice);
        orderRepository.save(bookOrder);
        System.out.println("user: "+user.getId());
        if (userOrders == null){
            userOrders = new LinkedHashSet<>();
        }
        userOrders.add(bookOrder);
        System.out.println("after add");

        user.setOrders(userOrders);
        userRepository.save(user);
        System.out.println(bookOrder.getOid());

        for(BookOrder bOrder: user.getOrders()){
            System.out.println(bOrder.toString());
        }

        List<BookOrder> orders = orderRepository.findAll();

        for(int i = 0; i < orders.size(); ++i){
            orders.get(i).toString();
        }
        order.put(binfo, tprice);
        session.setAttribute("cart", left_cart);
        ModelAndView mav = new ModelAndView("cart");
        mav.addObject("messages", null);
        mav.addObject("items", null);
        mav.addObject("order", order);
        return mav;
    }

    @RequestMapping("/user/uploadImage")
    @ResponseBody
    public String uploadImage(String imgcode, HttpServletRequest request ){

        imgcode = request.getParameter("imgcode");
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();

        System.out.println(imgcode);
        Optional<Image> i = imageRepository.findById(user.getId());
        Image img = null;
        if (i.isPresent()){
            img = i.get();
            img.setImgCode(imgcode);
            imageRepository.save(img);
        }
        String imgstr = imgcode.substring(imgcode.indexOf(",")+1);
        String imgPath = user.getId() + "_image";
        Base64.GenerateImage(imgstr, "E:/课程相关文件/Grade 2-2/软工经济学/java projects/我能跑起来/src/main/resources/static/image/users/"+imgPath+".png");
        return "good";
    }

    @RequestMapping("/user/orders")
    @ResponseBody
    public ModelAndView getOrder(){
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();
        user = userRepository.findByUsername(user.getUsername());

        System.out.println("here?");
        Set<BookOrder> orders = user.getOrders();

        System.out.println("orders个数: "+orders.size() );

        if (orders.size() == 0){
            ModelAndView mav = new ModelAndView("user");
            mav.addObject("user", null);
            mav.addObject("message", "Ops! You have no orders");
            mav.addObject("orders", null);
            return mav;
        }

        Long oid, count;
        String dstate, date, total_price;
        Book book;
        Map<Book,Long> book_and_count;
        List<String> infos;
        Map<Long, List<String>> oid_and_infos;
        Map<Map<Long, List<String>>, Map<Book,Long>> modalOrders = new TreeMap<Map<Long, List<String>>, Map<Book,Long>>(new Comparator<Map<Long, List<String>>>() {

            @Override
            public int compare(Map<Long, List<String>> o1, Map<Long, List<String>> o2) {
                for (Map.Entry<Long, List<String>> entry1 : o1.entrySet()) {
                    for (Map.Entry<Long, List<String>> entry2 : o2.entrySet()) {
                        if (entry1.getKey() > entry2.getKey())
                            return 1;
                        else if (entry1.getKey() < (entry2.getKey()))
                            return -1;
                        else
                            return 0;

                    }
                }
                return 0;
            }

        });

        //Map< Map<oid, (dstate, date, total_price)>,  Map<book, count> >


        for (BookOrder order:orders){
            oid = order.getOid();
            dstate = order.getDeliver_status();
            date = order.getDate().toString();
            total_price = order.getTotal_proice().toString();

            infos = new LinkedList<>();
            infos.add(dstate);
            infos.add(date);
            infos.add(total_price);

            oid_and_infos = new LinkedHashMap<>();
            oid_and_infos.put(oid, infos);

            book_and_count = new LinkedHashMap<>();

            System.out.println("oid "+ oid + " start scanning, state: "+dstate+", date: "+date+", total: "+total_price);

            Set<BookOrderItem> items = order.getItems();

            for(BookOrderItem item:items){
                Book book1 = item.getBook();
                count = item.getCount();
                book_and_count.put(book1, count);
                System.out.println(book1.getTitle() + "--count: "+ count);
            }

            modalOrders.put(oid_and_infos, book_and_count);
        }

        ModelAndView mav = new ModelAndView("user");
        mav.addObject("user", null);
        mav.addObject("message", null);
        mav.addObject("orders", modalOrders);
        return mav;

    }

    @RequestMapping("/user/delefromorder")
    @ResponseBody
    public void deleteFromOrder(Long oid, HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println("1");
        oid = Long.parseLong(request.getParameter("orderId"));
        PrintWriter out = response.getWriter();

        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        User user = (User) auth.getPrincipal();

        Optional<BookOrder> b = orderRepository.findByOid(oid);

        System.out.println("2");
        if (!b.isPresent()) {
            out.println("bad");
            out.close();
        } else {

            System.out.println("3");

            orderRepository.deleteByOid(oid);

            out.println("good");
            out.close();
        }
    }
}














