package com.github.unkindest;

import com.github.unkindest.services.PizzaService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class StorePizzaApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(StorePizzaApplication.class, args);
	}
}
