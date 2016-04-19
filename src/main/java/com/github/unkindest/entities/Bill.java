package com.github.unkindest.entities;

import javax.persistence.*;

/**
 * Created by paul on 18.04.16.
 */
@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer billId;


    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }
}
