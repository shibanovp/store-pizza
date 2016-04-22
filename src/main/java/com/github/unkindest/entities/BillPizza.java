package com.github.unkindest.entities;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

/**
 * Created by paul on 22.04.16.
 */
@Entity
public class BillPizza {
    @Id
    @GeneratedValue
    private Integer billPizzaId;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bill_id")
    private Bill bill;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pizza_id")
    private Pizza pizza;


    private Integer quantity;
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getBillPizzaId() {
        return billPizzaId;
    }

    public void setBillPizzaId(Integer billPizzaId) {
        this.billPizzaId = billPizzaId;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Pizza getPizza() {
        return pizza;
    }

    public void setPizza(Pizza pizza) {
        this.pizza = pizza;
    }
}
