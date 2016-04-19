package com.github.unkindest.entities;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by paul on 18.04.16.
 */
@Entity
public class Pizza {
    public enum Size {small, medium, large};
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pizza_id;
    private BigDecimal price;

    @Enumerated(value = EnumType.STRING)
    private Size size;

    @ManyToOne
    @JoinColumn(name = "pizza_base_id")
    private PizzaBase pizzaBase;
    public Integer getPizza_id() {
        return pizza_id;
    }

    public void setPizza_id(Integer pizza_id) {
        this.pizza_id = pizza_id;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public PizzaBase getPizzaBase() {
        return pizzaBase;
    }

    public void setPizzaBase(PizzaBase pizzaBase) {
        this.pizzaBase = pizzaBase;
    }
}
