package com.github.unkindest.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by paul on 17.04.16.
 */
@Controller
public class IndexController {
    @RequestMapping("/")
    public String getStore() {
        return "index";
    }
}
