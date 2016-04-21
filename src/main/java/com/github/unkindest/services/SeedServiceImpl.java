package com.github.unkindest.services;

import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.math.BigDecimal;

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
        em.persist(createPizzas("Jalapeño Popper Pizza", "//c8.staticflickr.com/2/1592/26362353815_c14f44d2f1_k.jpg", new BigDecimal("10.99")));
        em.persist(createPizzas("Punch Neapolitan Pizza", "//c6.staticflickr.com/2/1488/26288856525_7faa66b578_b.jpg", new BigDecimal("13.99")));
        em.persist(createPizzas("Chicken, Garlic and Tomato Pizza", "//c1.staticflickr.com/2/1711/25788674200_f606886e34_c.jpg", new BigDecimal("9.99")));
        em.persist(createPizzas("Quattro Stagioni", "//c4.staticflickr.com/2/1580/24831405411_cdec7ce613_c.jpg", new BigDecimal("13.55")));
        em.persist(createPizzas("Pepperoni Pizza", "//c2.staticflickr.com/6/5552/15050613457_d63b0675c4.jpg", new BigDecimal("11.22")));
        em.persist(createPizzas("Chicken pizza", "//c5.staticflickr.com/1/677/22759485212_e16a8fffdd_z.jpg", new BigDecimal("10.45")));
        em.persist(createPizzas("Margherita pizza", "//c8.staticflickr.com/6/5737/22151897983_a98a666b6d_k.jpg", new BigDecimal("8.99")));
        em.persist(createPizzas("Napoletana Pizza", "//farm1.staticflickr.com/342/18317863720_827e722cb2_h.jpg", new BigDecimal("13.12")));
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
