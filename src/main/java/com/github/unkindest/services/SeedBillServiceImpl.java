package com.github.unkindest.services;

import com.github.unkindest.entities.Bill;
import com.github.unkindest.entities.BillPizza;
import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.math.BigDecimal;

/**
 * Created by paul on 21.04.16.
 */
@Service
public class SeedBillServiceImpl implements CommandLineRunner{
    private EntityManagerFactory emf;
    @PersistenceUnit
    public void setEmf(EntityManagerFactory emf) {
        this.emf = emf;
    }

    @Override
    public void run(String... args) throws Exception {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        PizzaBase pizzaBase = createPizzas("Grilled chicken, artichoke hearts, and arugula pizza","//farm3.staticflickr.com/2101/2529856456_368530c5ab_b.jpg", new BigDecimal("12.35"));
        em.persist(pizzaBase);
        Bill bill = new Bill();
        for(Pizza pizza : pizzaBase.getPizzas()) {
            BillPizza billPizza = new BillPizza();
            billPizza.setPizza(pizza);
            billPizza.setBill(bill);
            billPizza.setQuantity(1);
            bill.getBillPizzas().add(billPizza);
            em.persist(billPizza);
            em.persist(bill);
        }
        em.getTransaction().commit();
    }
    private static PizzaBase createPizzas(String name, String image, BigDecimal smallPrice) {
        PizzaBase pizzaBase = new PizzaBase();
        pizzaBase.setName(name);
        pizzaBase.setImage(image);
        Pizza pizza = new Pizza();
        pizza.setSize(Pizza.Size.small);
        pizza.setPrice(smallPrice);
        pizza.setPizzaBase(pizzaBase);
        pizzaBase.getPizzas().add(pizza);
        pizza = new Pizza();
        pizza.setSize(Pizza.Size.medium);
        pizza.setPrice(smallPrice.multiply(new BigDecimal("1.22")));
        pizza.setPizzaBase(pizzaBase);
        pizzaBase.getPizzas().add(pizza);
        pizza = new Pizza();
        pizza.setSize(Pizza.Size.large);
        pizza.setPrice(smallPrice.multiply(new BigDecimal("1.43")));
        pizza.setPizzaBase(pizzaBase);
        pizzaBase.getPizzas().add(pizza);
        return pizzaBase;
    }
}
