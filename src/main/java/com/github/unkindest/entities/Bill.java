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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer billId;
    @OneToMany(mappedBy = "bill")
    private Set<BillPizza> billPizzas = new HashSet<BillPizza>();

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Set<BillPizza> getBillPizzas() {
        return billPizzas;
    }

    public void setBillPizzas(Set<BillPizza> billPizzas) {
        this.billPizzas = billPizzas;
    }
}
