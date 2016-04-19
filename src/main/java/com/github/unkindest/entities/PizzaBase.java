package com.github.unkindest.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by paul on 19.04.16.
 */
@Entity
public class PizzaBase {
    @Id
    @GeneratedValue
    private Integer pizzaBaseId;
    private String name;
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pizzaBase")
    private List<Pizza> pizzas = new ArrayList<>();
    public Integer getPizzaBaseId() {
        return pizzaBaseId;
    }

    public void setPizzaBaseId(Integer pizzaBaseId) {
        this.pizzaBaseId = pizzaBaseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Pizza> getPizzas() {
        return pizzas;
    }

    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
    }
}
