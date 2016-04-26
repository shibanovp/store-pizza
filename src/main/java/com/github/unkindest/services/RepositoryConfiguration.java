package com.github.unkindest.services;
import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Pizza.class);
        config.exposeIdsFor(PizzaBase.class);
    }
}