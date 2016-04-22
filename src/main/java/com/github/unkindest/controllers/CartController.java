package com.github.unkindest.controllers;

import org.springframework.session.web.http.HttpSessionManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

/**
 * Created by paul on 19.04.16.
 */
@SessionAttributes(value = "test", types = {})
@Controller
public class CartController {
    @RequestMapping(value = "/cart")
    public String index(HttpSession session, Model model) {
//        ModelAndView m = new ModelAndView();
//        m.addObject()
        session.setAttribute("test", 100);
//        model.addAttribute("testsess", session.getAttribute("test"));
        return "cart";
    }
    @RequestMapping(value = "/carttest")
    public String test(HttpSession session, Model m) {
//        m.addAttribute("testsess", session.getAttribute("test"));
        return "cart";
    }
}
