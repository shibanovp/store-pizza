package com.github.unkindest.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by paul on 19.04.16.
 */
@Entity
public class PizzaBase {
    @Transient
    private static ObjectMapper objectMapper = new ObjectMapper();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pizzaBaseId;
    private String name;
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    @JsonIgnore
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
    @JsonIgnore
    @Transient
    public String getPizzasJson() throws JsonProcessingException {
        String json = null;
        try {
            json = objectMapper.writeValueAsString(getPizzas());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }
}
