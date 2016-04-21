package com.github.unkindest.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by paul on 18.04.16.
 */
@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer billId;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "bill_pizza", joinColumns = @JoinColumn(name = "bill_id"),
            inverseJoinColumns = @JoinColumn(name = "pizza_id"))
    private Set<Pizza> pizzas = new HashSet<>();


    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Set<Pizza> getPizzas() {
        return pizzas;
    }

    public void setPizzas(Set<Pizza> pizzas) {
        this.pizzas = pizzas;
    }
}
