package com.github.unkindest.controllers;

import com.github.unkindest.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by paul on 17.04.16.
 */
@Controller
public class IndexController {

    private PizzaService pizzaService;
    @Autowired
    public void setPizzaService(PizzaService pizzaService) {
        this.pizzaService = pizzaService;
    }

    @RequestMapping("/")
    public String getStore(Model model) {
        model.addAttribute("pizzas", pizzaService.listAll());
        return "index";
    }
}
