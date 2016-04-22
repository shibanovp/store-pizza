package com.github.unkindest.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by paul on 22.04.16.
 */
@Controller
public class ConfirmController {
    @RequestMapping("/checkout")
    public String checkout() {
        return "checkout";
    }
}
