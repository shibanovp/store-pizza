package com.github.unkindest.entities;

import javax.persistence.*;

/**
 * Created by paul on 26.04.16.
 */
@Entity
public class CardPayment {
    @Id
    @GeneratedValue
    private Integer cardPaymentId;
    private String number;
    private String name;
    private String validm;
    private String validy;
    private String ccv;


    @OneToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;
    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getCardPaymentId() {
        return cardPaymentId;
    }

    public void setCardPaymentId(Integer cardPaymentId) {
        this.cardPaymentId = cardPaymentId;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValidm() {
        return validm;
    }

    public void setValidm(String validm) {
        this.validm = validm;
    }

    public String getValidy() {
        return validy;
    }

    public void setValidy(String validy) {
        this.validy = validy;
    }

    public String getCcv() {
        return ccv;
    }

    public void setCcv(String ccv) {
        this.ccv = ccv;
    }
}
