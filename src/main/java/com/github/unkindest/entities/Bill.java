package com.github.unkindest.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by paul on 18.04.16.
 */
@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer billId;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private Date desiredDelivery;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public Date getDesiredDelivery() {
        return desiredDelivery;
    }

    public void setDesiredDelivery(Date desiredDelivery) {
        this.desiredDelivery = desiredDelivery;
    }
}
