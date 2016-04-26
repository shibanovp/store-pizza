package com.github.unkindest.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by paul on 19.04.16.
 */
@Controller
public class CartController {
    @RequestMapping(value = "/cart")
    public String getCart() {
        return "cart";
    }
}
