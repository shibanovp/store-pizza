package com.github.unkindest.services;

import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

/**
 * Created by paul on 19.04.16.
 */
@Service
public class SeedServiceImpl implements Runnable{
    private EntityManagerFactory emf;
    @PersistenceUnit
    public void setEmf(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public void run() {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        PizzaBase pizzaBase = new PizzaBase();
        pizzaBase.setName("marinare");
        Pizza p = new Pizza();
        p.setSize(Pizza.Size.medium);
        pizzaBase.getPizzas().add(p);
        p.setPizzaBase(pizzaBase);
        em.merge(pizzaBase);
        pizzaBase = new PizzaBase();
        pizzaBase.setName("4cheese");
        p = new Pizza();
        p.setPizzaBase(pizzaBase);
        pizzaBase.getPizzas().add(p);
        em.merge(pizzaBase);
        em.getTransaction().commit();
    }
}
