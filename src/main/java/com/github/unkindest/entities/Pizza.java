package com.github.unkindest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by paul on 18.04.16.
 */
@Entity
public class Pizza {
    public enum Size {small, medium, large};
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pizzaId;
    private BigDecimal price;

    @Enumerated(value = EnumType.STRING)
    private Size size;

    @ManyToOne
    @JoinColumn(name = "pizza_base_id")
    private PizzaBase pizzaBase;
    public Integer getPizzaId() {
        return pizzaId;
    }

    public void setPizzaId(Integer pizzaId) {
        this.pizzaId = pizzaId;
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
