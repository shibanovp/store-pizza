package com.github.unkindest.services;

import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;

import java.util.List;

/**
 * Created by paul on 18.04.16.
 */
public interface PizzaService {
    List<PizzaBase> listAll();
}
